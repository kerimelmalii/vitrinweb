import { NextRequest, NextResponse } from "next/server";

import { getIyzicoServerConfig } from "@/lib/iyzico";
import { calculateServerPrice } from "@/lib/server-pricing";

interface InitializeBody {
  orderId?: unknown;
  addons?: unknown;
}

/**
 * iyzico Checkout Form oturumu bu endpoint üzerinden başlatılacak.
 *
 * Bu aşamada dış ödeme isteği göndermeden önce istemciden gelen minimum veriyi
 * doğruluyor ve ödeme tutarını yalnızca sunucudaki fiyat listesinden hesaplıyoruz.
 */
export async function POST(request: NextRequest) {
  try {
    const config = getIyzicoServerConfig();
    const body = (await request.json()) as InitializeBody;

    if (typeof body.orderId !== "string" || !body.orderId.trim()) {
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

    const price = calculateServerPrice(body.addons);

    return NextResponse.json({
      ok: true,
      provider: "iyzico",
      environment: config.environment,
      orderId: body.orderId.trim(),
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
