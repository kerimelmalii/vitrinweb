import fs from "node:fs";
import path from "node:path";
import { blocksText, collectLinks, parseBlocks, parseFrontMatter, unlinkBlocks, type Block } from "@/lib/markdown";

/* ================= BLOG =================
   Her yazı content/blog/<slug>.md dosyasıdır; yazım kuralları için SEO Makale Standardı'na bakın.
   Kapak görselleri public/blog/<slug>/kapak.webp (+ kapak-4x3.webp, kapak-1x1.webp) olarak
   scripts/blog-kapaklari.mjs ile üretilir. Bu dosya yalnızca sunucuda/derlemede çalışır (fs).

   Zamanlanmış yayın: content/blog-planli/<slug>.md dosyaları "yayin: YYYY-AA-GG" taşır ve sitede
   görünmez. .github/workflows/blog-yayin.yml her sabah scripts/blog-yayinla.mjs'i çalıştırır; günü gelen
   yazı content/blog'a taşınır (yeni yazıda date, yeniden yazımda updated o günün tarihi olur). Yayında
   olmayan bir yazıya verilen bağlantılar o gün gelene kadar düz metin olarak gösterilir. */

export interface BlogPost {
  slug: string;
  title: string;
  /** <title> için, verilmezse title kullanılır (marka eki şablondan gelir). */
  seoTitle: string;
  description: string;
  /** ISO tarih (YYYY-AA-GG). */
  date: string;
  updated?: string;
  category: string;
  coverAlt: string;
  related: string[];
  body: Block[];
  sources: Block[];
  toc: { id: string; text: string }[];
  words: number;
}

const DIR = path.join(process.cwd(), "content/blog");
const PLANNED_DIR = path.join(process.cwd(), "content/blog-planli");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;
const PAGE_ROUTES = new Set(["/", "/neden", "/ucretlendirme", "/blog", "/iletisim", "/girisim-programi", "/hakkimizda", "/icerik-politikasi", "/isgale-hayir"]);
const SOURCES_HEADING = "Kaynaklar";

function load(file: string): BlogPost {
  const slug = file.replace(/\.md$/, "");
  const fail = (msg: string): never => {
    throw new Error(`content/blog/${file}: ${msg}`);
  };
  if (!SLUG_RE.test(slug)) fail("dosya adı yalnızca küçük harf, rakam ve tire içermeli");
  const { data, body } = parseFrontMatter(fs.readFileSync(path.join(DIR, file), "utf8"));
  for (const key of ["title", "description", "date", "category", "coverAlt"]) if (!data[key]) fail(`"${key}" alanı zorunlu`);
  for (const key of ["date", "updated"]) if (data[key] && !ISO_RE.test(data[key])) fail(`"${key}" YYYY-AA-GG biçiminde olmalı`);

  const blocks = parseBlocks(body);
  const cut = blocks.findIndex((b) => b.t === "h2" && b.text === SOURCES_HEADING);
  const main = cut === -1 ? blocks : blocks.slice(0, cut);
  const sources = cut === -1 ? [] : blocks.slice(cut + 1);
  const words = blocksText(blocks).split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: data.title,
    seoTitle: data.seoTitle || data.title,
    description: data.description,
    date: data.date,
    updated: data.updated && data.updated !== data.date ? data.updated : undefined,
    category: data.category,
    coverAlt: data.coverAlt,
    related: data.related ? data.related.split(",").map((s) => s.trim()).filter(Boolean) : [],
    body: main,
    sources,
    toc: main.flatMap((b) => (b.t === "h2" ? [{ id: b.id, text: b.text }] : [])),
    words,
  };
}

/** Derlemede yakalanması gereken hatalar: kırık iç bağlantı, eksik kapak, ileri tarih. */
function validate(posts: BlogPost[]) {
  const slugs = new Set(posts.map((p) => p.slug));
  const today = new Date(Date.now() + 3 * 3600_000).toISOString().slice(0, 10); // Türkiye saati
  for (const p of posts) {
    const where = `content/blog/${p.slug}.md`;
    if (p.date > today) throw new Error(`${where}: tarih (${p.date}) bugünden ileri olamaz`);
    if (p.updated && p.updated < p.date) throw new Error(`${where}: güncelleme tarihi yayın tarihinden önce olamaz`);
    if (!fs.existsSync(path.join(PUBLIC_DIR, "blog", p.slug, "kapak.webp")))
      throw new Error(`${where}: kapak görseli yok (public/blog/${p.slug}/kapak.webp) — scripts/blog-kapaklari.mjs çalıştırın`);
    for (const r of p.related) if (!slugs.has(r)) throw new Error(`${where}: ilgili yazı bulunamadı: ${r}`);
    for (const href of collectLinks([...p.body, ...p.sources])) {
      if (href.startsWith("/blog/")) {
        const target = href.slice(6).split("#")[0];
        if (!slugs.has(target)) throw new Error(`${where}: kırık iç bağlantı ${href}`);
      } else if (href.startsWith("/")) {
        const route = href.split("#")[0];
        if (!PAGE_ROUTES.has(route) && !route.startsWith("/yasal/")) throw new Error(`${where}: bilinmeyen sayfa ${href}`);
      } else if (href.startsWith("#")) {
        continue;
      } else if (!href.startsWith("https://")) {
        throw new Error(`${where}: dış bağlantı https ile başlamalı: ${href}`);
      } else if (/[?&]utm_/.test(href)) {
        throw new Error(`${where}: dış bağlantıda takip parametresi var: ${href}`);
      }
    }
  }
}

/** Planlanmış yazıların ön bilgisini denetler: yayın akışı günü geldiğinde derlemeyi bozmasın. */
function plannedSlugs(): Set<string> {
  if (!fs.existsSync(PLANNED_DIR)) return new Set();
  const slugs = new Set<string>();
  for (const file of fs.readdirSync(PLANNED_DIR).filter((f) => f.endsWith(".md"))) {
    const slug = file.replace(/\.md$/, "");
    const where = `content/blog-planli/${file}`;
    const { data } = parseFrontMatter(fs.readFileSync(path.join(PLANNED_DIR, file), "utf8"));
    if (!SLUG_RE.test(slug)) throw new Error(`${where}: dosya adı geçersiz`);
    if (!ISO_RE.test(data.yayin ?? "")) throw new Error(`${where}: "yayin: YYYY-AA-GG" alanı zorunlu`);
    if (!fs.existsSync(path.join(PUBLIC_DIR, "blog", slug, "kapak.webp"))) throw new Error(`${where}: kapak görseli yok`);
    slugs.add(slug);
  }
  return slugs;
}

export const BLOG: BlogPost[] = (() => {
  const loaded = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(load)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "tr"));
  const published = new Set(loaded.map((p) => p.slug));
  const pending = new Set([...plannedSlugs()].filter((s) => !published.has(s)));
  const isPending = (href: string) => href.startsWith("/blog/") && pending.has(href.slice(6).split("#")[0]);
  const posts = loaded.map((p) => ({
    ...p,
    body: unlinkBlocks(p.body, isPending),
    sources: unlinkBlocks(p.sources, isPending),
    related: p.related.filter((r) => !pending.has(r)),
  }));
  validate(posts);
  return posts;
})();

export const getPost = (slug: string): BlogPost | undefined => BLOG.find((p) => p.slug === slug);

export const readMin = (p: BlogPost): number => Math.max(2, Math.round(p.words / 200));

const TR_MONTHS = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

/** "2026-09-25" -> "25 Eylül 2026" */
export const formatDate = (iso: string): string => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${TR_MONTHS[m - 1]} ${y}`;
};

/** Yapısal veri için saat dilimli tarih (Türkiye, UTC+3). */
export const isoWithZone = (iso: string): string => `${iso}T09:00:00+03:00`;

/** İlgili yazılar: önce ön bilgide seçilenler, sonra aynı kategoriden, sonra en yeniler. */
export function relatedPosts(p: BlogPost, n = 3): BlogPost[] {
  const picked = p.related.map((s) => getPost(s)).filter((x): x is BlogPost => !!x);
  const rest = BLOG.filter((x) => x.slug !== p.slug && !picked.includes(x));
  const sameCat = rest.filter((x) => x.category === p.category);
  const others = rest.filter((x) => x.category !== p.category);
  return [...picked, ...sameCat, ...others].slice(0, n);
}

export const coverSrc = (slug: string, ratio: "" | "-4x3" | "-1x1" = ""): string => `/blog/${slug}/kapak${ratio}.webp`;
