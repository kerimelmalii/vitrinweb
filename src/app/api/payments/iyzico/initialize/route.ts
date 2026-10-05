import { NextRequest, NextResponse } from "next/server";

import { buildIyzicoCheckoutContext } from "@/lib/iyzico-checkout";
import { getIyzicoClient, getIyzicoServerConfig } from "@/lib/iyzico";
import {
  getIyzicoCallbackUrl,
  getPaymentClientIp,
} from "@/lib/payment-request";
import { RX } from "@/lib/security";
import { calculateServerPrice, parseStoredAddonIds } from "@/lib/server-pricing";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { Consents, Invoice } from "@/lib/types";

export const runtime = "nodejs";

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

interface IyzicoInitializeResult {
  status?: string;
  errorCode?: string;
  errorMessage?: string;
  conversationId?: string;
  token?: string;
  checkoutFormContent?: string;
  paymentPageUrl?: string;
  signature?: string;
}

function initializeCheckoutForm(
  request: Record<string, unknown>,
): Promise<IyzicoInitializeResult> {
  const iyzico = getIyzicoClient();

  return new Promise((resolve, reject) => {
    iyzico.checkoutFormInitialize.create<IyzicoInitializeResult>(
      request,
      (error: unknown, result: IyzicoInitializeResult) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      },
    );
  });
}

/**
 * iyzico Checkout Form oturumunu başlatır.
 *
 * Tarayıcı yalnızca orderId gönderir. Müşteri, işletme, fatura, onaylar ve ek
 * özellikler Supabase'teki kayıtlı siparişten okunur; fiyat sunucuda yeniden
 * hesaplanır. Kart bilgileri bu endpoint'ten geçmez.
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

    const addonIds = parseStoredAddonIds(order.addons);
    const pricing = calculateServerPrice(addonIds);
    const checkout = buildIyzicoCheckoutContext(
      {
        id: order.id,
        orderNo: order.order_no,
        customer: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
        },
        business: { brand: businessName },
        invoice: order.invoice,
        consents: order.consents,
      },
      pricing,
      getPaymentClientIp(request),
    );

    const amount = pricing.total.toFixed(2);
    const iyzicoResult = await initializeCheckoutForm({
      locale: "tr",
      conversationId: order.id,
      price: amount,
      paidPrice: amount,
      currency: "TRY",
      basketId: order.order_no,
      paymentGroup: "PRODUCT",
      callbackUrl: getIyzicoCallbackUrl(),
      buyer: checkout.buyer,
      shippingAddress: checkout.shippingAddress,
      billingAddress: checkout.billingAddress,
      basketItems: checkout.basketItems,
    });

    if (
      iyzicoResult.status !== "success" ||
      !iyzicoResult.token ||
      (!iyzicoResult.checkoutFormContent && !iyzicoResult.paymentPageUrl)
    ) {
      console.error("iyzico Checkout Form başlatılamadı:", {
        orderId,
        environment: config.environment,
        errorCode: iyzicoResult.errorCode,
      });

      return NextResponse.json(
        {
          ok: false,
          provider: "iyzico",
          error: "Güvenli ödeme ekranı başlatılamadı.",
        },
        { status: 502 },
      );
    }

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        payment_status: "payment_started",
        payment_ref: iyzicoResult.token,
      })
      .eq("id", orderId)
      .neq("payment_status", "paid");

    if (updateError) {
      throw new Error("Ödeme oturumu siparişe kaydedilemedi.");
    }

    return NextResponse.json({
      ok: true,
      provider: "iyzico",
      environment: config.environment,
      orderId,
      pricingVersion: pricing.pricingVersion,
      amount: pricing.total,
      currency: "TRY",
      token: iyzicoResult.token,
      checkoutFormContent: iyzicoResult.checkoutFormContent ?? null,
      paymentPageUrl: iyzicoResult.paymentPageUrl ?? null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    if (
      message === "Geçersiz ek özellik seçimi." ||
      message === "Ödeme için fatura şehri eksik."
    ) {
      return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }

    console.error(
      "iyzico ödeme başlatma başarısız:",
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
