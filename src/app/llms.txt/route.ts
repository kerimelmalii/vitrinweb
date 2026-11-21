import { BLOG } from "@/data/blog";
import { LEGAL_LINKS } from "@/data/legal";
import { PRODUCTS } from "@/data/products";
import { SECTORS } from "@/data/sectors";
import { SERVICES } from "@/data/services";
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
    "> Vitrinweb; işletmeler için yüksek standartlı web siteleri, operasyonları hızlandıran hazır dijital ürünler ve iş süreçlerine özel yazılımlar geliştirir.",
    "",
    "## Sayfalar",
    "",
    `- [Ana Sayfa](${SITE_URL}/): Ürünler, çalışma şekli ve sık sorulan sorular.`,
    `- [Ürünler](${SITE_URL}/urunler): Dokuz dijital ürünün kataloğu.`,
    `- [İşletmeye Özel Çözümler](${SITE_URL}/isletmeye-ozel): Yönetim paneli, süreç otomasyonu ve sistem entegrasyonu.`,
    `- [Tamamlayıcı Hizmetler](${SITE_URL}/hizmetler): Google profil, WhatsApp karşılama, online randevu ve diğer hizmetler.`,
    `- [Demolar](${SITE_URL}/demolar): Örnek veriyle çalışan etkileşimli demolar.`,
    `- [Sektörler](${SITE_URL}/sektorler): Sektöre göre önerilen çözümler.`,
    `- [Nasıl Çalışıyoruz?](${SITE_URL}/nasil-calisiyoruz): Keşif, kapsam, pilot ve teslim süreci.`,
    `- [Neden web sitesi?](${SITE_URL}/neden-web-sitesi): Kurumsal web sitesinin işletmeye katkıları.`,
    `- [Bilgi Alın](${SITE_URL}/bilgi-al): Ürün veya hizmet için bilgi talebi formu.`,
    `- [Blog](${SITE_URL}/blog): Ürün fotoğrafı, reklam raporlama, stok düzeni, web sitesi ve yerel görünürlük rehberleri.`,
    `- [Hakkımızda](${SITE_URL}/hakkimizda): Vitrinweb'in hikâyesi, kurucusu ve şirket bilgileri.`,
    `- [İletişim](${SITE_URL}/iletisim): Yeni proje, destek ve iş birliği kanalları.`,
    `- [İçerik Politikası](${SITE_URL}/icerik-politikasi): Blog yazılarının nasıl hazırlandığı, yapay zekâ kullanımı ve kaynak seçimi.`,
    "",
    "## Ürünler",
    "",
    ...PRODUCTS.map((p) => `- [${p.name}](${SITE_URL}/urunler/${p.slug}): ${p.description}`),
    "",
    "## Tamamlayıcı hizmetler",
    "",
    ...SERVICES.map((s) => `- [${s.name}](${SITE_URL}/hizmetler/${s.slug}): ${s.description}`),
    "",
    "## Sektörler",
    "",
    ...SECTORS.map((s) => `- [${s.name}](${SITE_URL}/sektorler/${s.slug}): ${s.description}`),
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
