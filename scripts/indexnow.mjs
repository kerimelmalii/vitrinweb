/* Canlı sitemap'teki adresleri IndexNow'a bildirir (Bing, Yandex, Seznam, Naver ve diğerleri).
   ChatGPT arama sonuçları büyük ölçüde Bing dizinine dayandığı için yeni ve değişen sayfaların
   oraya hızlı ulaşması yapay zekâ aramalarında da görünürlüğü hızlandırır.
   Anahtar dosyası: public/<anahtar>.txt (içinde yalnızca anahtar yazar).
   Kullanım: node scripts/indexnow.mjs [https://www.vitrinweb.com.tr] */
import fs from "node:fs";
import path from "node:path";

const site = (process.argv[2] || "https://www.vitrinweb.com.tr").replace(/\/$/, "");
const keyFile = fs.readdirSync(path.join(process.cwd(), "public")).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) throw new Error("public/ altında IndexNow anahtar dosyası bulunamadı.");
const key = keyFile.replace(".txt", "");

const xml = await (await fetch(`${site}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error("Sitemap'te adres bulunamadı.");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${keyFile}`, urlList }),
});
console.log(`IndexNow: ${urlList.length} adres gönderildi, yanıt ${res.status} ${res.statusText}`);
if (res.status >= 400) process.exit(1);
