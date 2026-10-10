#!/usr/bin/env node
/* Vitrinweb SEO denetimi — derlenmiş HTML üzerinde çalışır (bağımlılık yok).
   Kullanım:
     node .claude/skills/seo-denetim/denetle.mjs <klasör> --site https://www.ornek.com.tr [--json cikti.json] [--md rapor.md]
   <klasör>: Next.js için ".next/server/app", statik siteler için çıktı klasörü (out/, dist/).
   Kontrol kodları (K01…) referans/kontrol-listesi.md ile birebir eşleşir. */
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
};
const root = args.find((a, i) => !a.startsWith("--") && !(i > 0 && args[i - 1].startsWith("--")));
const SITE = (opt("--site") || "").replace(/\/$/, "");
if (!root || !SITE) {
  console.error("Kullanım: node denetle.mjs <klasör> --site https://www.ornek.com.tr [--json f.json] [--md f.md]");
  process.exit(2);
}

/* ---------- küçük HTML yardımcıları ---------- */
const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", "#39": "'" };
const decode = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (m, e) =>
    e[0] === "#" ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : ENT[e] ?? m,
  );
const attrs = (tag) => {
  const out = {};
  for (const m of tag.matchAll(/([a-zA-Z_:][-\w:.]*)\s*(?:=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) {
    if (m.index === 0) continue;
    out[m[1].toLowerCase()] = decode(m[3] ?? m[4] ?? m[5] ?? "");
  }
  return out;
};
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((m) => attrs(m[0]));
const stripTags = (s) => decode(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const visibleHtml = (html) =>
  html.replace(/<(script|style|noscript|template|svg)\b[\s\S]*?<\/\1>/gi, " ").replace(/<!--[\s\S]*?-->/g, " ");

/* ---------- sayfaları bul ---------- */
const SKIP = /(^|\/)(_not-found|_global-error|404|500)(\.html|\/index\.html)$/;
function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}
const toRoute = (file) => {
  let r = "/" + path.relative(root, file).split(path.sep).join("/").replace(/\.html$/, "");
  r = r.replace(/\/index$/, "") || "/";
  return r === "/index" ? "/" : r;
};
const files = walk(root).filter((f) => !SKIP.test(path.relative(root, f).split(path.sep).join("/")));
const pages = files.map((file) => ({ file, route: toRoute(file), html: fs.readFileSync(file, "utf8") }));
const routes = new Set(pages.map((p) => p.route));

/* ---------- bulgular ---------- */
const findings = [];
const add = (code, level, route, msg) => findings.push({ code, level, route, msg });
const GENERIC_ANCHORS = /^(buraya tıklayın|tıklayın|buraya|devamı|devamını oku(yun)?|daha fazla|detaylar|click here|read more|here)$/i;
const RISKY = [
  [/(ilk|birinci|1\.)\s*sıra(da|ya)?\s*(garanti|garantisi|garantili)/i, "sıralama garantisi"],
  [/garanti(li)?\s*(ilk|birinci|1\.)\s*sıra/i, "sıralama garantisi"],
  [/google['’]?(da|de)?\s*(ilk|birinci)\s*sayfa(da|ya)?\s*garanti/i, "Google ilk sayfa garantisi"],
  [/%\s*100\s*(satış|müşteri)\s*artış/i, "kesin sonuç vaadi"],
];

const titles = new Map();
const descs = new Map();
const pageInfo = [];

for (const p of pages) {
  const { route, html } = p;
  const head = (/<head\b[\s\S]*?<\/head>/i.exec(html) || [""])[0];
  const metas = tags(head, "meta");
  const meta = (k, v) => metas.find((m) => (m[k] || "").toLowerCase() === v);
  const robots = (meta("name", "robots")?.content || "").toLowerCase();
  const noindex = robots.includes("noindex");
  const titleRaw = (/<title[^>]*>([\s\S]*?)<\/title>/i.exec(head) || [])[1];
  const title = titleRaw ? stripTags(titleRaw) : "";
  const desc = meta("name", "description")?.content?.trim() || "";
  const canon = tags(head, "link").filter((l) => (l.rel || "").toLowerCase() === "canonical");
  const body = visibleHtml(html.replace(/<head\b[\s\S]*?<\/head>/i, " "));
  const text = stripTags(body);
  const words = text ? text.split(" ").length : 0;
  pageInfo.push({ route, title, noindex, words });

  if (noindex) add("K04", "bilgi", route, "Sayfa noindex — arama sonuçlarına girmez (bilerek mi yapıldı?)");

  // Başlık ve açıklama
  if (!title) add("K01", "kritik", route, "<title> yok");
  else {
    if (title.length > 70) add("K01", "iyilestirme", route, `Başlık uzun (${title.length} karakter), sonuçlarda kesilebilir: "${title}"`);
    if (title.length < 15) add("K01", "iyilestirme", route, `Başlık çok kısa/genel: "${title}"`);
    if (!noindex) titles.set(title, [...(titles.get(title) || []), route]);
  }
  if (!desc) add("K02", noindex ? "bilgi" : "onemli", route, "Meta açıklama yok");
  else {
    if (desc.length > 165) add("K02", "iyilestirme", route, `Açıklama uzun (${desc.length} karakter)`);
    if (desc.length < 70) add("K02", "iyilestirme", route, `Açıklama kısa (${desc.length} karakter)`);
    if (!noindex) descs.set(desc, [...(descs.get(desc) || []), route]);
  }

  // Canonical
  if (!noindex) {
    if (canon.length === 0) add("K03", "onemli", route, "Canonical bağlantısı yok");
    if (canon.length > 1) add("K03", "kritik", route, `${canon.length} canonical bağlantısı var (tek olmalı)`);
    if (canon.length === 1) {
      const href = canon[0].href || "";
      if (!/^https:\/\//.test(href)) add("K03", "onemli", route, `Canonical mutlak https adresi değil: ${href}`);
      else if (href.replace(/\/$/, "") !== (SITE + route).replace(/\/$/, ""))
        add("K03", "onemli", route, `Canonical başka bir adresi gösteriyor: ${href}`);
    }
  }

  // Dil ve görüntü alanı
  const htmlTag = attrs((/<html\b[^>]*>/i.exec(html) || ["<html>"])[0]);
  if (!htmlTag.lang) add("K05", "onemli", route, "<html lang> yok");
  else if (!/^tr/i.test(htmlTag.lang)) add("K05", "bilgi", route, `Sayfa dili: ${htmlTag.lang}`);
  if (!meta("name", "viewport")) add("K06", "kritik", route, "viewport meta etiketi yok (mobil uyum)");

  // Başlık yapısı
  const heads = [...body.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({ lvl: +m[1], text: stripTags(m[2]) }));
  const h1 = heads.filter((h) => h.lvl === 1);
  if (!noindex && h1.length === 0) add("K07", "onemli", route, "H1 yok");
  if (h1.length > 1) add("K07", "iyilestirme", route, `${h1.length} adet H1 var: ${h1.map((h) => `"${h.text}"`).join(", ")}`);
  for (let i = 1; i < heads.length; i++)
    if (heads[i].lvl > heads[i - 1].lvl + 1) {
      add("K07", "iyilestirme", route, `Başlık seviyesi atlanıyor: H${heads[i - 1].lvl} → H${heads[i].lvl} ("${heads[i].text}")`);
      break;
    }

  // Görseller
  const imgs = tags(body, "img");
  const noAlt = imgs.filter((i) => !("alt" in i));
  if (noAlt.length) add("K08", "onemli", route, `${noAlt.length} görselde alt özniteliği yok (${noAlt.slice(0, 3).map((i) => i.src).join(", ")})`);
  const noSize = imgs.filter((i) => !i.width || !i.height);
  if (noSize.length) add("K09", "iyilestirme", route, `${noSize.length} görselde width/height yok (sayfa kayması riski)`);

  // Bağlantılar
  const anchors = [...body.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)].map((m) => ({ a: attrs(m[0].slice(0, m[0].indexOf(">") + 1)), inner: m[1] }));
  const broken = new Set();
  let httpLinks = 0;
  let utm = 0;
  const generic = new Set();
  for (const { a, inner } of anchors) {
    const href = a.href;
    if (href === undefined) continue;
    const label = stripTags(inner) || a["aria-label"] || (tags(inner, "img")[0] || {}).alt || "";
    if (!label.trim()) add("K11", "iyilestirme", route, `Metni olmayan bağlantı: ${href}`);
    else if (GENERIC_ANCHORS.test(label.trim())) generic.add(label.trim());
    if (href.startsWith("/") && !href.startsWith("//")) {
      const target = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
      if (/^\/(_next|api)\//.test(target) || /\.[a-z0-9]{2,5}$/i.test(target)) continue;
      if (!routes.has(target)) broken.add(target);
    } else if (href.startsWith("http://")) httpLinks++;
    if (/[?&]utm_/i.test(href) && !href.startsWith("/")) utm++;
  }
  if (broken.size) add("K10", "kritik", route, `Site içinde karşılığı olmayan bağlantılar: ${[...broken].join(", ")}`);
  if (httpLinks) add("K12", "iyilestirme", route, `${httpLinks} dış bağlantı http (https değil)`);
  if (utm) add("K12", "iyilestirme", route, `${utm} dış bağlantıda utm_ takip parametresi var`);
  if (generic.size) add("K11", "iyilestirme", route, `Genel bağlantı metni: ${[...generic].join(", ")}`);

  // Yapısal veri
  const ld = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const types = [];
  for (const m of ld) {
    try {
      const j = JSON.parse(m[1]);
      const collect = (o) => {
        if (Array.isArray(o)) o.forEach(collect);
        else if (o && typeof o === "object") {
          if (o["@type"]) types.push(...[].concat(o["@type"]));
          if (o["@graph"]) collect(o["@graph"]);
        }
      };
      collect(j);
    } catch {
      add("K13", "kritik", route, "Geçersiz JSON-LD (ayrıştırılamıyor)");
    }
  }
  if (route.startsWith("/blog/") && !types.some((t) => /Article|BlogPosting|NewsArticle/.test(t)))
    add("K13", "onemli", route, "Blog yazısında Article/BlogPosting yapısal verisi yok");
  if (route !== "/" && !noindex && !types.includes("BreadcrumbList")) add("K13", "iyilestirme", route, "BreadcrumbList yapısal verisi yok");
  if (route === "/" && !types.includes("Organization") && !types.some((t) => /Business|Store|Restaurant|Salon/.test(t)))
    add("K14", "onemli", route, "Ana sayfada Organization/LocalBusiness yapısal verisi yok");
  if (route === "/" && !types.includes("WebSite")) add("K14", "iyilestirme", route, "Ana sayfada WebSite yapısal verisi yok (site adı için)");
  if (route === "/" && !tags(head, "link").some((l) => /\bicon\b/i.test(l.rel || ""))) add("K14", "iyilestirme", route, "Favicon (<link rel=icon>) bulunamadı");

  // Sosyal paylaşım
  if (!noindex) {
    const og = ["og:title", "og:description", "og:image"].filter((k) => !meta("property", k));
    if (og.length) add("K15", "iyilestirme", route, `Open Graph eksik: ${og.join(", ")}`);
  }

  // İçerik
  if (!noindex && words < 150 && !route.startsWith("/yasal/")) add("K16", "bilgi", route, `Az metin (${words} kelime) — sayfa amacını karşılıyor mu?`);
  for (const [re, label] of RISKY) {
    const m = re.exec(text);
    if (m) add("K17", "kritik", route, `Riskli ifade (${label}): "…${text.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40)}…"`);
  }
}

// Site geneli: tekrar eden başlık/açıklama
for (const [t, rs] of titles) if (rs.length > 1) add("K01", "onemli", rs.join(", "), `Aynı başlık ${rs.length} sayfada: "${t}"`);
for (const [d, rs] of descs) if (rs.length > 1) add("K02", "iyilestirme", rs.join(", "), `Aynı açıklama ${rs.length} sayfada: "${d.slice(0, 80)}…"`);

// Site geneli: robots.txt ve site haritası (Next.js çıktısı: *.body)
const readIf = (...cands) => cands.map((c) => path.join(root, c)).find((c) => fs.existsSync(c));
const robotsFile = readIf("robots.txt.body", "robots.txt");
const sitemapFile = readIf("sitemap.xml.body", "sitemap.xml");
if (!robotsFile) add("K18", "onemli", "(site)", "robots.txt derleme çıktısında bulunamadı (canlıda ayrıca kontrol edin)");
else {
  const r = fs.readFileSync(robotsFile, "utf8");
  if (/^\s*disallow:\s*\/\s*$/im.test(r)) add("K18", "kritik", "(site)", "robots.txt tüm siteyi engelliyor (Disallow: /)");
  if (!/^\s*sitemap:/im.test(r)) add("K18", "iyilestirme", "(site)", "robots.txt'de Sitemap satırı yok");
}
if (!sitemapFile) add("K19", "onemli", "(site)", "sitemap.xml derleme çıktısında bulunamadı");
else {
  const locs = [...fs.readFileSync(sitemapFile, "utf8").matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => decode(m[1]));
  const bad = locs.filter((l) => !l.startsWith(SITE));
  if (bad.length) add("K19", "kritik", "(site)", `Site haritasında başka alan adı/yer tutucu adresler: ${bad.slice(0, 3).join(", ")}`);
  const inMap = new Set(locs.map((l) => l.slice(SITE.length).replace(/\/$/, "") || "/"));
  const indexable = pageInfo.filter((p) => !p.noindex).map((p) => p.route);
  const missing = indexable.filter((r) => !inMap.has(r));
  if (missing.length) add("K19", "iyilestirme", "(site)", `Dizine eklenebilir ama site haritasında olmayan sayfalar: ${missing.join(", ")}`);
  const noidx = pageInfo.filter((p) => p.noindex && inMap.has(p.route)).map((p) => p.route);
  if (noidx.length) add("K19", "onemli", "(site)", `Site haritasında noindex sayfalar: ${noidx.join(", ")}`);
}

/* ---------- rapor ---------- */
const ORDER = ["kritik", "onemli", "iyilestirme", "bilgi"];
const LABEL = { kritik: "Kritik", onemli: "Önemli", iyilestirme: "İyileştirme", bilgi: "Bilgi" };
findings.sort((a, b) => ORDER.indexOf(a.level) - ORDER.indexOf(b.level) || a.code.localeCompare(b.code) || a.route.localeCompare(b.route));
const count = Object.fromEntries(ORDER.map((l) => [l, findings.filter((f) => f.level === l).length]));
const summary = { site: SITE, pages: pages.length, indexable: pageInfo.filter((p) => !p.noindex).length, count };

if (opt("--json")) fs.writeFileSync(opt("--json"), JSON.stringify({ summary, findings, pages: pageInfo }, null, 2));
const lines = [
  `# Otomatik SEO denetimi — ${SITE}`,
  "",
  `Denetlenen sayfa: ${summary.pages} (dizine eklenebilir: ${summary.indexable}) · Kritik: ${count.kritik} · Önemli: ${count.onemli} · İyileştirme: ${count.iyilestirme} · Bilgi: ${count.bilgi}`,
  "",
];
for (const l of ORDER) {
  const fs_ = findings.filter((f) => f.level === l);
  if (!fs_.length) continue;
  lines.push(`## ${LABEL[l]} (${fs_.length})`, "", "| Kod | Sayfa | Bulgu |", "|---|---|---|");
  for (const f of fs_) lines.push(`| ${f.code} | ${f.route} | ${f.msg.replace(/\|/g, "\\|")} |`);
  lines.push("");
}
const md = lines.join("\n");
if (opt("--md")) fs.writeFileSync(opt("--md"), md);
console.log(md);
process.exitCode = count.kritik ? 1 : 0;
