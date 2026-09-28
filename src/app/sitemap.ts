import type { MetadataRoute } from "next";
import { BLOG, dateToISO } from "@/data/blog";
import { LEGAL_LINKS } from "@/data/legal";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/* Derleme zamanı: statik ve yasal sayfaların içeriği ayrı bir "son güncelleme" tarihi
   tutmadığından, bu sayfalar için en anlamlı değer sitenin en son yayınlandığı andır. */
const buildDate = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/neden", "/ucretlendirme", "/blog", "/iletisim", "/girisim-programi", "/isgale-hayir", "/hakkimizda"].map((path) => ({
    url: SITE_URL + path,
    lastModified: buildDate,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
  const blogRoutes = BLOG.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: dateToISO(p.date) ?? buildDate,
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
