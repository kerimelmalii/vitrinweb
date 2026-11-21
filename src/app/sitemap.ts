import type { MetadataRoute } from "next";
import { BLOG } from "@/data/blog";
import { LEGAL_LINKS } from "@/data/legal";
import { PRODUCTS } from "@/data/products";
import { SECTORS } from "@/data/sectors";
import { SERVICES } from "@/data/services";
import { CASES } from "@/data/cases";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/* Derleme zamanı: statik ve yasal sayfaların içeriği ayrı bir "son güncelleme" tarihi
   tutmadığından, bu sayfalar için en anlamlı değer sitenin en son yayınlandığı andır. */
const buildDate = new Date();

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
    lastModified: buildDate,
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
    lastModified: buildDate,
    changeFrequency: "yearly" as const,
    priority: 0.2,
  }));
  return [...staticRoutes, ...blogRoutes, ...legalRoutes];
}
