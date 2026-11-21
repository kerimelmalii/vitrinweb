/* ================= FORM GÖNDERİMİ (istemci) =================
   Bilgi talebi, keşif görüşmesi, proje başlangıcı, iptal/iade ve ileti tercihi formları
   /api/contact'a `kind` alanıyla POST eder. Aynı içerik aynı oturumda ikinci kez
   gönderilirse istek atılmaz; ziyaretçiye "bu talebi zaten aldık" denir. */

export type SendResult = "ok" | "invalid" | "unavailable" | "offline" | "duplicate";

const KEY = "vitrin:sent-forms";
const WINDOW = 30 * 60 * 1000;

function signature(payload: Record<string, unknown>): string {
  const s = JSON.stringify(payload, Object.keys(payload).sort());
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return String(h >>> 0);
}

function readSent(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "{}") as Record<string, number>;
  } catch {
    return {};
  }
}

function markSent(sig: string) {
  try {
    const now = Date.now();
    const all = Object.fromEntries(Object.entries(readSent()).filter(([, t]) => now - t < WINDOW));
    all[sig] = now;
    sessionStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    /* depolama kapalıysa yinelenen gönderim kontrolü atlanır */
  }
}

export async function sendForm(kind: string, payload: Record<string, unknown>): Promise<SendResult> {
  const body = { kind, ...payload };
  const sig = signature(body);
  const prev = readSent()[sig];
  if (prev && Date.now() - prev < WINDOW) return "duplicate";
  if (typeof navigator !== "undefined" && navigator.onLine === false) return "offline";
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(body),
    });
    const json = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (res.ok && json?.ok) {
      markSent(sig);
      return "ok";
    }
    return res.status === 400 || res.status === 413 ? "invalid" : "unavailable";
  } catch {
    return typeof navigator !== "undefined" && navigator.onLine === false ? "offline" : "unavailable";
  }
}

export const contactOk = (v: string): boolean => {
  const t = v.trim();
  if (/^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/.test(t)) return true;
  const d = t.replace(/\D/g, "");
  return (d.length === 10 && d[0] !== "0") || (d.length === 11 && d[0] === "0") || (d.length === 12 && d.startsWith("90"));
};

export const MESSAGE_MAX = 1000;
