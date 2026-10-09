/** Vercel Production ortamında `NEXT_PUBLIC_SITE_URL` henüz hiç ayarlanmamıştı; bu yüzden
    sitemap.xml, robots.txt, canonical link ve JSON-LD (Organization "logo" alanı dahil)
    yayında hâlâ yer tutucu "https://example.com" üretiyordu — Google'ın marka logosunu
    gösterememesinin kök nedeni buydu (schema "logo" ulaşılamaz bir adrese işaret ediyordu).
    Gerçek domain (apex değil, apex www'ye 308 yönlendiriyor — doğrulandı 2026-10-09) burada
    varsayılan yapıldı ki env var hiç ayarlanmasa bile doğru adres üretilsin. Yine de en doğrusu
    `NEXT_PUBLIC_SITE_URL`'i Vercel Production ortam değişkeni olarak da ayarlamak. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.vitrinweb.com.tr").replace(/\/$/, "");

/** GitHub Pages alt yolu (next.config.ts, yalnızca GITHUB_PAGES=true derlemesinde dolu).
    public/ klasöründeki bir görseli elle <img src> ile referanslarken bu önek eklenmeli;
    aksi hâlde alt yol modunda görsel 404 verir (bkz. CLAUDE.md'deki #11/#12 notu). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
