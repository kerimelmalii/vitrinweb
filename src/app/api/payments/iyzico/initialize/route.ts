import { NextResponse } from "next/server";

import { getIyzicoServerConfig } from "@/lib/iyzico";

/**
 * iyzico Checkout Form oturumu bu endpoint üzerinden başlatılacak.
 *
 * Bu ilk iskelet özellikle ödeme isteği göndermiyor. Önce server-only
 * yapılandırmasının Vercel üzerinde doğru okunabildiğini doğruluyoruz.
 * Sonraki adımda sipariş verisini sunucuda doğrulayıp fiyatı güvenilir
 * kaynaklardan yeniden hesaplayarak iyzico isteğini burada oluşturacağız.
 */
export async function POST() {
  try {
    const config = getIyzicoServerConfig();

    return NextResponse.json({
      ok: true,
      provider: "iyzico",
      environment: config.environment,
      configured: true,
    });
  } catch (error) {
    console.error(
      "iyzico yapılandırması okunamadı:",
      error instanceof Error ? error.message : "Bilinmeyen hata",
    );

    return NextResponse.json(
      {
        ok: false,
        provider: "iyzico",
        configured: false,
        error: "Ödeme altyapısı şu anda kullanılamıyor.",
      },
      { status: 503 },
    );
  }
}
