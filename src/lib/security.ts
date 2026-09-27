/* ================= GÜVENLİK: GİRDİ SINIRLARI VE DOĞRULAMA =================
   İstemci doğrulaması yalnızca kullanıcıya yardımdır. Sunucu aynı kuralları
   (LIMITS, RX) kendisi uygulamalıdır (bkz. DEVIR-BELGESI.md bölüm 7b). */

export const LIMITS = {
  name: 80,
  brand: 100,
  phone: 20,
  email: 120,
  url: 200,
  handle: 31,
  wishes: 1000,
  custom: 1000,
  invTitle: 150,
  taxOffice: 80,
  address: 300,
  text: 3000,
  short: 150,
} as const;

export const FILE_RULES = {
  maxSize: 10 * 1024 * 1024,
  maxFiles: 20,
  logo: ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "application/pdf"],
  image: ["image/png", "image/jpeg", "image/webp", "image/heic", "image/heif"],
  pitch: [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-powerpoint",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/png",
    "image/jpeg",
  ],
  /* E-posta ekine dönüştüğü için genel maxSize'dan daha düşük: base64'e çevrilince ~%33 büyüyor,
     alıcı kutusunun (Gmail ~25 MB) toplam e-posta boyutu sınırının altında kalmalı. */
  pitchMaxSize: 8 * 1024 * 1024,
} as const;

/** Kontrol karakterlerini atar ve uzunluğu keser. React çıktıyı zaten kaçışlar (XSS'e karşı); bu, veriyi temiz tutmak içindir. */
export const clean = (v: unknown, max?: number): string =>
  String(v == null ? "" : v)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .slice(0, max || LIMITS.text);

export const RX = {
  email: /^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/,
  url: /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i,
  ig: /^@?[A-Za-z0-9._]{1,30}$/,
  token: /^[a-z2-9]{24}$/,
  orderId: /^ord_[a-z2-9]{16}$/,
};

export const phoneOk = (v: string): boolean => {
  const d = String(v).replace(/\D/g, "");
  return (d.length === 10 && d[0] !== "0") || (d.length === 11 && d[0] === "0") || (d.length === 12 && d.startsWith("90"));
};

/** T.C. kimlik no algoritma kontrolü (10. ve 11. hane). Gerçek kişi doğrulaması değildir. */
export const validTCKN = (t: string): boolean => {
  if (!/^[1-9]\d{10}$/.test(t)) return false;
  const d = t.split("").map(Number);
  const d10 = ((d[0] + d[2] + d[4] + d[6] + d[8]) * 7 - (d[1] + d[3] + d[5] + d[7])) % 10;
  const d11 = d.slice(0, 10).reduce((a, b) => a + b, 0) % 10;
  return (d10 + 10) % 10 === d[9] && d11 === d[10];
};

/** Tahmin edilemez kimlik ve erişim anahtarları için kriptografik rastgelelik.
    Reddetmeli örnekleme: modulo yanlılığı yok. crypto yoksa güvensiz yedeğe düşmek yerine hata verir. */
export const rand = (n: number): number => {
  const a = new Uint32Array(1);
  const lim = Math.floor(4294967296 / n) * n;
  let x: number;
  do {
    crypto.getRandomValues(a);
    x = a[0];
  } while (x >= lim);
  return x % n;
};

export const token = (len = 24): string => {
  const c = "abcdefghijkmnpqrstuvwxyz23456789";
  let t = "";
  for (let i = 0; i < len; i++) t += c[rand(c.length)];
  return t;
};
