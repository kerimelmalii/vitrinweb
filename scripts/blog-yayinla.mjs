/* Zamanlanmış blog yayını: content/blog-planli/ içindeki, "yayin" tarihi bugün (Türkiye saati) ya da
   daha önce olan yazıları content/blog/'a taşır.
   - Yeni yazı: "date" o günün tarihi olur.
   - Yeniden yazım (aynı adla content/blog'da eski sürümü var): ilk yayın tarihi korunur, "updated" o gün olur.
   Kullanım: node scripts/blog-yayinla.mjs   (deneme için: BUGUN=2026-10-12 node scripts/blog-yayinla.mjs) */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const planned = path.join(root, "content/blog-planli");
const live = path.join(root, "content/blog");
const today = process.env.BUGUN || new Date(Date.now() + 3 * 3600_000).toISOString().slice(0, 10);

if (!fs.existsSync(planned)) process.exit(0);
const setField = (src, key, value) =>
  new RegExp(`^${key}: .*$`, "m").test(src)
    ? src.replace(new RegExp(`^${key}: .*$`, "m"), `${key}: ${value}`)
    : src.replace(/^---\n/, `---\n${key}: ${value}\n`);

const due = fs
  .readdirSync(planned)
  .filter((f) => f.endsWith(".md"))
  .map((f) => ({ f, src: fs.readFileSync(path.join(planned, f), "utf8") }))
  .map((x) => ({ ...x, yayin: (/^yayin: (\d{4}-\d{2}-\d{2})$/m.exec(x.src) || [])[1] }))
  .filter((x) => x.yayin && x.yayin <= today)
  .sort((a, b) => a.yayin.localeCompare(b.yayin));

for (const { f, src } of due) {
  let out = src.replace(/^yayin: .*\n/m, "");
  const target = path.join(live, f);
  out = fs.existsSync(target) ? setField(out, "updated", today) : setField(out, "date", today);
  fs.writeFileSync(target, out);
  fs.rmSync(path.join(planned, f));
  console.log(`yayınlandı: ${f} (${today})`);
}
if (!due.length) console.log(`bugün (${today}) yayınlanacak yazı yok`);
