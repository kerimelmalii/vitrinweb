import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/siparis", "/baslangic", "/admin", "/icerik-formu", "/proje-baslangic", "/bakim", "/og-kart"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
