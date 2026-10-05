import { NextRequest, NextResponse } from "next/server";

import { getIyzicoServerConfig } from "@/lib/iyzico";
import { RX } from "@/lib/security";
import { calculateServerPrice } from "@/lib/server-pricing";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

interface InitializeBody {
  orderId?: unknown;
  addons?: unknown;
}

/**
 * iyzico Checkout Form oturumu bu endpoint üzerinden başlatılacak.
 *
 * Ödeme oluşturulmadan önce sipariş kimliği ve ek özellikler doğrulanır, sipariş
 * Supabase'ten sunucu tarafında bulunur ve tutar yalnızca güvenilir fiyat
 * listesinden yeniden hesaplanır.
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

    if (
      !Array.isArray(body.addons) ||
      !body.addons.every((id): id is string => typeof id === "string")
    ) {
      return NextResponse.json(
        { ok: false, error: "Ek özellik listesi geçersiz." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      throw new Error("Supabase sunucu yapılandırması eksik.");
    }

    const orderId = body.orderId.trim();
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, payment_status")
      .eq("id", orderId)
      .maybeSingle();

    if (orderError) {
      throw new Error("Sipariş veritabanından okunamadı.");
    }

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

    const price = calculateServerPrice(body.addons);

    return NextResponse.json({
      ok: true,
      provider: "iyzico",
      environment: config.environment,
      orderId,
      pricingVersion: price.pricingVersion,
      amount: price.total,
      currency: "TRY",
      addons: price.addons,
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
