import { BLOG } from "@/data/blog";
import { LEGAL_LINKS } from "@/data/legal";
import { BASE_PRICE, money } from "@/lib/config";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/* llmstxt.org kuralına göre: LLM tabanlı araçların siteyi hızlıca anlaması için
   basit, elle okunabilir bir Markdown haritası. sitemap.xml'in aksine bu bir resmi
   web standardı değil, topluluk kuralı; arama motorları değil LLM tabanlı araçlar
   tüketir. İçerik data/blog.ts ve data/legal.ts'ten üretilir, elle kopyalanmaz —
   böylece yeni bir blog yazısı veya yasal sayfa eklenince otomatik güncel kalır. */
function build(): string {
  const lines: string[] = [
    "# Vitrin",
    "",
    `> Türkiye'deki işletmeler için ${money(BASE_PRICE)} TL'ye profesyonel, mobil uyumlu web sitesi kuran bir ajans. İlk yıl servis ve bakım ücretsiz, taahhüt yok.`,
    "",
    "## Sayfalar",
    "",
    `- [Anasayfa](${SITE_URL}/): Fiyat, süreç, yıllık servis, sık sorulan sorular ve sipariş başlangıcı.`,
    `- [Neden web sitesi?](${SITE_URL}/neden): Bir web sitesinin işletmelere sağladığı faydalar, verilerle.`,
    `- [Ücretlendirme](${SITE_URL}/ucretlendirme): Temel paket ve ek özellik fiyatları.`,
    `- [Blog](${SITE_URL}/blog): Web sitesi, SEO ve dijital görünürlük üzerine yazılar.`,
    `- [İletişim](${SITE_URL}/iletisim): İletişim formu, e-posta ve Instagram.`,
    `- [Girişim Destek Programı](${SITE_URL}/girisim-programi): Yeni girişimlere nakit yerine %2 hisse karşılığında web sitesi, bakım ve SEO desteği.`,
    `- [İşgale Hayır!](${SITE_URL}/isgale-hayir): Filistin ve Doğu Türkistan için farkındalık sayfası.`,
    `- [Hakkımızda](${SITE_URL}/hakkimizda): Vitrin'in misyonu, vizyonu, değerleri ve şirket bilgileri.`,
    "",
    "## Blog yazıları",
    "",
    ...BLOG.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.excerpt}`),
    "",
    "## Yasal",
    "",
    ...LEGAL_LINKS.map(([id, title]) => `- [${title}](${SITE_URL}/yasal/${id})`),
    "",
  ];
  return lines.join("\n");
}

export function GET() {
  return new Response(build(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
