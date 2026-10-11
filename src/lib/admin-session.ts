/* ================= ADMIN OTURUMU =================
   /admin paneli, siteye hiç bağlı olmayan tek bir ADMIN_PASSWORD ile korunur (bkz.
   ADMIN-PANELI-KURULUMU.md). Oturum, imzalı ve son kullanma tarihi taşıyan bir çerez
   olarak tutulur (HMAC-SHA256, ADMIN_SESSION_SECRET ile). Bu dosya hem src/proxy.ts
   (Edge runtime) hem de /api/admin/* route'larından (Node runtime) kullanıldığı için
   yalnızca her iki ortamda da bulunan Web Crypto (crypto.subtle) ve base64 API'lerini
   kullanır — Node'a özel `Buffer` burada yok. */

export const ADMIN_COOKIE_NAME = "vitrinweb_admin";
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

function toBase64Url(buf: ArrayBuffer): string {
  let binary = "";
  for (const b of new Uint8Array(buf)) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256Hex(value: string): Promise<string> {
  return toHex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
}

async function hmacSha256(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return toBase64Url(sig);
}

/** Zamanlama saldırılarına karşı sabit zamanlı karşılaştırma — Edge/Node ayrımı olmadan
    çalışması için node:crypto.timingSafeEqual yerine elle XOR biriktirme kullanır. */
function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !password) return false;
  const [a, b] = await Promise.all([sha256Hex(password), sha256Hex(expected)]);
  return timingSafeEqualStr(a, b);
}

export async function createSessionToken(): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET tanımlı değil.");
  const expiresAt = Date.now() + SESSION_MS;
  const sig = await hmacSha256(secret, String(expiresAt));
  return `${expiresAt}.${sig}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || !token) return false;
  const [expiresAtStr, sig] = token.split(".");
  if (!expiresAtStr || !sig) return false;
  const expiresAt = Number(expiresAtStr);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;
  const expected = await hmacSha256(secret, expiresAtStr);
  return timingSafeEqualStr(expected, sig);
}
