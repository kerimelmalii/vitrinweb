import { BLOG } from "@/data/blog";
import { LEGAL_LINKS } from "@/data/legal";
import { ALL_PRODUCTS } from "@/data/products";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/* llmstxt.org kuralına göre: LLM tabanlı araçların siteyi hızlıca anlaması için
   basit, elle okunabilir bir Markdown haritası. sitemap.xml'in aksine bu bir resmi
   web standardı değil, topluluk kuralı; arama motorları değil LLM tabanlı araçlar
   tüketir. İçerik data/blog.ts ve data/legal.ts'ten üretilir, elle kopyalanmaz —
   böylece yeni bir blog yazısı veya yasal sayfa eklenince otomatik güncel kalır. */
function build(): string {
  const lines: string[] = [
    "# Vitrinweb",
    "",
    "> Türkiye'deki işletmelere dijital çözümler sunan bir ajans: Meta reklam paneli, depo ve stok takibi, ürün görsel stüdyosu, müşteri bulma aracı, web sitesi ve işletmeye özel çözümler.",
    "",
    "## Sayfalar",
    "",
    `- [Anasayfa](${SITE_URL}/): Ürünler, çalışma şekli ve sık sorulan sorular.`,
    `- [Ürünler](${SITE_URL}/urunler): Tüm ürünler ve işletmeye özel çözümler.`,
    `- [Neden web sitesi?](${SITE_URL}/neden): Bir web sitesinin işletmelere sağladığı faydalar, verilerle.`,
    `- [Web sitesi fiyatları](${SITE_URL}/ucretlendirme): Web sitesi paketi ve ek özellik fiyatları.`,
    `- [Blog](${SITE_URL}/blog): Web sitesi, SEO ve dijital görünürlük üzerine yazılar.`,
    `- [İletişim](${SITE_URL}/iletisim): İletişim formu, e-posta ve Instagram.`,
    `- [Girişim Destek Programı](${SITE_URL}/girisim-programi): Yeni girişimlere nakit yerine %2 hisse karşılığında web sitesi, bakım ve SEO desteği.`,
    `- [İşgale Hayır!](${SITE_URL}/isgale-hayir): Filistin ve Doğu Türkistan için farkındalık sayfası.`,
    `- [Hakkımızda](${SITE_URL}/hakkimizda): Vitrinweb'in misyonu, vizyonu, değerleri ve şirket bilgileri.`,
    `- [İçerik Politikası](${SITE_URL}/icerik-politikasi): Blog yazılarının nasıl hazırlandığı, yapay zekâ kullanımı ve kaynak seçimi.`,
    "",
    "## Ürünler",
    "",
    ...ALL_PRODUCTS.map((p) => `- [${p.name}](${SITE_URL}/urunler/${p.slug}): ${p.description}`),
    "",
    "## Blog yazıları",
    "",
    ...BLOG.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`),
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
