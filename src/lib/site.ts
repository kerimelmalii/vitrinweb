/** Alan adı bağlandığında ortam değişkeni olarak ayarlanmalı (ör. https://vitrin.com).
    Ayarlanmazsa site haritası ve robots.txt yer tutucu bir adres kullanır. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, "");

/** GitHub Pages alt yolu (next.config.ts, yalnızca GITHUB_PAGES=true derlemesinde dolu).
    public/ klasöründeki bir görseli elle <img src> ile referanslarken bu önek eklenmeli;
    aksi hâlde alt yol modunda görsel 404 verir (bkz. CLAUDE.md'deki #11/#12 notu). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
