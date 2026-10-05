import { NextRequest, NextResponse } from "next/server";

import { getIyzicoServerConfig } from "@/lib/iyzico";
import { RX } from "@/lib/security";
import { calculateServerPrice } from "@/lib/server-pricing";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { Consents, Invoice } from "@/lib/types";

interface InitializeBody {
  orderId?: unknown;
}

interface PaymentOrderRow {
  id: string;
  order_no: string;
  customer: { name?: unknown; email?: unknown; phone?: unknown } | null;
  business: { brand?: unknown } | null;
  invoice: Invoice | null;
  consents: Consents | null;
  addons: unknown;
  payment_status: string | null;
}

/**
 * iyzico Checkout Form oturumu bu endpoint üzerinden başlatılacak.
 *
 * Ödeme oluşturulmadan önce sipariş kimliği doğrulanır. Ek özellikler, müşteri,
 * işletme, fatura ve onay bilgileri tarayıcıdan tekrar alınmaz; Supabase'teki
 * sipariş kaydı güvenilir kaynak olarak okunur. Tutar da kayıtlı ek özelliklere
 * göre yalnızca sunucudaki
 * fiyat listesinden yeniden hesaplanır.
 */
export async function POST(request: NextRequest) {
  try {
    const config = getIyzicoServerConfig();
    const body = (await request.json()) as InitializeBody;

    if (
      typeof body.orderId !== "string" ||
      !RX.orderId.test(body.orderId.trim())
    ) {
      return NextResponse.json(
        { ok: false, error: "Geçerli bir sipariş kimliği gerekli." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      throw new Error("Supabase sunucu yapılandırması eksik.");
    }

    const orderId = body.orderId.trim();
    const { data, error: orderError } = await supabase
      .from("orders")
      .select(
        "id, order_no, customer, business, invoice, consents, addons, payment_status",
      )
      .eq("id", orderId)
      .maybeSingle();

    if (orderError) {
      throw new Error("Sipariş veritabanından okunamadı.");
    }

    const order = data as PaymentOrderRow | null;

    if (!order) {
      return NextResponse.json(
        { ok: false, error: "Sipariş bulunamadı." },
        { status: 404 },
      );
    }

    if (order.payment_status === "paid") {
      return NextResponse.json(
        { ok: false, error: "Bu sipariş zaten ödenmiş." },
        { status: 409 },
      );
    }

    const customerName =
      typeof order.customer?.name === "string" ? order.customer.name.trim() : "";
    const customerEmail =
      typeof order.customer?.email === "string" ? order.customer.email.trim() : "";
    const customerPhone =
      typeof order.customer?.phone === "string" ? order.customer.phone.trim() : "";
    const businessName =
      typeof order.business?.brand === "string" ? order.business.brand.trim() : "";

    if (
      !customerName ||
      !RX.email.test(customerEmail) ||
      !customerPhone ||
      !businessName ||
      !order.invoice?.title?.trim() ||
      !order.invoice?.address?.trim()
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Ödeme için gerekli sipariş veya fatura bilgileri eksik.",
        },
        { status: 422 },
      );
    }

    if (
      !order.consents?.kvkk ||
      !order.consents?.distance ||
      !order.consents?.terms ||
      !order.consents?.at
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Ödeme için gerekli zorunlu onaylar tamamlanmamış.",
        },
        { status: 422 },
      );
    }

    if (
      !Array.isArray(order.addons) ||
      !order.addons.every(
        (addon) =>
          typeof addon === "object" &&
          addon !== null &&
          "id" in addon &&
          typeof addon.id === "string",
      )
    ) {
      throw new Error("Siparişin kayıtlı ek özellikleri geçersiz.");
    }

    const price = calculateServerPrice(order.addons.map((addon) => addon.id));

    return NextResponse.json({
      ok: true,
      provider: "iyzico",
      environment: config.environment,
      orderId,
      pricingVersion: price.pricingVersion,
      amount: price.total,
      currency: "TRY",
      addons: price.addons,
      readyForCheckoutForm: true,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    if (message === "Geçersiz ek özellik seçimi.") {
      return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }

    console.error(
      "iyzico ödeme hazırlığı başarısız:",
      message || "Bilinmeyen hata",
    );

    return NextResponse.json(
      {
        ok: false,
        provider: "iyzico",
        error: "Ödeme altyapısı şu anda kullanılamıyor.",
      },
      { status: 503 },
    );
  }
}
