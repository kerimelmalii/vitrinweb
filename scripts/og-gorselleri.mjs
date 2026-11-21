/* Ürün paylaşım görsellerini üretir: public/og/<slug>.png (1200x630).
   Önce kart sayfasını açacak bir sunucu başlatın:  OG_KART=1 npx next start -p 3123
   Sonra:  node scripts/og-gorselleri.mjs [http://localhost:3123]
   Ürün listesi src/data/products.ts içindeki slug alanlarından okunur. */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

/* Playwright projenin bağımlılığı değil; geliştirme makinesinde genel kurulu olanı kullanır. */
const { chromium } = createRequire(import.meta.url)("playwright");

const base = process.argv[2] || "http://localhost:3123";
const src = fs.readFileSync(path.join(process.cwd(), "src/data/products.ts"), "utf8");
const block = src.slice(src.indexOf("export const PRODUCTS"), src.indexOf("export const MENU_ORDER"));
const slugs = [...block.matchAll(/^    slug: "([a-z0-9-]+)"/gm)].map((m) => m[1]);
const out = path.join(process.cwd(), "public/og");
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const slug of slugs) {
  const res = await page.goto(`${base}/og-kart/${slug}`, { waitUntil: "networkidle" });
  if (!res || !res.ok()) throw new Error(`${slug}: kart sayfası açılamadı (OG_KART=1 ile mi başlattınız?)`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(out, `${slug}.png`), clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log("✓", slug);
}
await browser.close();
