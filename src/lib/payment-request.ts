import "server-only";

import { NextRequest } from "next/server";

const DEFAULT_ORIGIN = "https://vitrinweb.com.tr";
const CALLBACK_PATH = "/api/payments/iyzico/callback";

function normalizeOrigin(value: string): string {
  const url = new URL(value);
  if (url.protocol !== "https:" && url.hostname !== "localhost") {
    throw new Error("Ödeme callback origin'i HTTPS olmalıdır.");
  }
  return url.origin;
}

/**
 * iyzico callback adresi için tek güvenilir kaynak.
 *
 * Canlıda IYZICO_CALLBACK_ORIGIN tanımlanması tercih edilir. Değişken yoksa
 * Vitrin'in kanonik domain'i kullanılır. Host/X-Forwarded-Host gibi istemci
 * tarafından etkilenebilen başlıklardan callback URL üretilmez.
 */
export function getIyzicoCallbackUrl(): string {
  const origin = normalizeOrigin(
    process.env.IYZICO_CALLBACK_ORIGIN?.trim() || DEFAULT_ORIGIN,
  );
  return new URL(CALLBACK_PATH, origin).toString();
}

/**
 * Vercel/proxy arkasındaki gerçek istemci IP'sini ödeme isteğine taşır.
 * x-forwarded-for zincirinin yalnızca ilk değerini kullanır; yoksa Vercel'in
 * x-real-ip başlığına düşer. IP yalnızca iyzico buyer isteği için kullanılır.
 */
export function getPaymentClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const firstForwarded = forwarded?.split(",")[0]?.trim();

  if (firstForwarded) return firstForwarded;

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  throw new Error("Ödeme için istemci IP adresi belirlenemedi.");
}
