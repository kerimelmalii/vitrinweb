import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const PRIVATE = ["/api/", "/admin", "/siparis", "/baslangic", "/icerik-formu", "/proje-baslangic", "/bakim", "/og-kart"];

/* Arama ve yapay zekâ tarayıcıları açıkça izinli: site ChatGPT, Gemini, Perplexity ve Claude gibi
   asistanların arama sonuçlarında kaynak olarak görünebilsin. Özel sayfalar herkese kapalı. */
const AI_BOTS = [
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "YandexBot",
  "DuckDuckBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: AI_BOTS, allow: "/", disallow: PRIVATE },
      { userAgent: "*", allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
