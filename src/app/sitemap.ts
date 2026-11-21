import type { MetadataRoute } from "next";
import { BLOG } from "@/data/blog";
import { LEGAL_DOCS, LEGAL_LINKS } from "@/data/legal";
import { PRODUCTS } from "@/data/products";
import { SECTORS } from "@/data/sectors";
import { SERVICES } from "@/data/services";
import { CASES } from "@/data/cases";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/* Her yayında "şimdi" yazmak Google'ın lastmod'a güvenmemesine yol açar; bu yüzden sayfalar
   içeriklerinin gerçekten değiştiği günü taşır. Bir sayfanın metni değişince PAGE_UPDATED'deki
   tarihi (yoksa SITE_UPDATED'i) o güne çekin. Blog yazıları kendi tarihlerini kullanır. */
const SITE_UPDATED = "2026-11-21";
const LEGAL_UPDATED_ISO = "2026-09-28";
const PAGE_UPDATED: Record<string, string> = {
  "/icerik-politikasi": "2026-10-10",
};
const newestPost = BLOG.map((p) => p.updated ?? p.date).sort().at(-1) ?? SITE_UPDATED;
const pageDate = (path: string) => (path === "/blog" ? newestPost : PAGE_UPDATED[path] ?? SITE_UPDATED);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/urunler",
    ...PRODUCTS.map((p) => `/urunler/${p.slug}`),
    "/isletmeye-ozel",
    "/hizmetler",
    ...SERVICES.map((s) => `/hizmetler/${s.slug}`),
    "/demolar",
    "/sektorler",
    ...SECTORS.map((s) => `/sektorler/${s.slug}`),
    ...CASES.map((c) => `/uygulamalar/${c.slug}`),
    "/nasil-calisiyoruz",
    "/neden-web-sitesi",
    "/bilgi-al",
    "/kesif-gorusmesi",
    "/blog",
    "/hakkimizda",
    "/iletisim",
    "/icerik-politikasi",
    "/girisim-programi",
    "/isgale-hayir",
  ].map((path) => ({
    url: SITE_URL + path,
    lastModified: pageDate(path),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : path.startsWith("/urunler") ? 0.8 : 0.7,
  }));
  const blogRoutes = BLOG.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.updated ?? p.date,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));
  const legalRoutes = LEGAL_LINKS.map(([id]) => ({
    url: `${SITE_URL}/yasal/${id}`,
    lastModified: LEGAL_DOCS[id]?.u ? SITE_UPDATED : LEGAL_UPDATED_ISO,
    changeFrequency: "yearly" as const,
    priority: 0.2,
  }));
  return [...staticRoutes, ...blogRoutes, ...legalRoutes];
}
