import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

import { getIyzicoServerConfig } from "@/lib/iyzico";

const RESULT_TOKEN_TTL_SECONDS = 15 * 60;

function signature(orderId: string, expiresAt: number): string {
  const { secretKey } = getIyzicoServerConfig();
  return createHmac("sha256", secretKey)
    .update(`payment-result:${orderId}:${expiresAt}`)
    .digest("base64url");
}

export function createPaymentResultToken(orderId: string): string {
  const expiresAt = Math.floor(Date.now() / 1000) + RESULT_TOKEN_TTL_SECONDS;
  return `${expiresAt}.${signature(orderId, expiresAt)}`;
}

export function verifyPaymentResultToken(
  orderId: string,
  token: string,
): boolean {
  const [expiresRaw, supplied, extra] = token.split(".");
  if (!expiresRaw || !supplied || extra) return false;

  const expiresAt = Number(expiresRaw);
  if (!Number.isSafeInteger(expiresAt)) return false;

  const now = Math.floor(Date.now() / 1000);
  if (expiresAt <= now || expiresAt > now + RESULT_TOKEN_TTL_SECONDS) {
    return false;
  }

  const expected = signature(orderId, expiresAt);
  const left = Buffer.from(supplied);
  const right = Buffer.from(expected);

  return left.length === right.length && timingSafeEqual(left, right);
}
