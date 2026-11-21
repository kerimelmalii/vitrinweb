import Link from "next/link";
import { ProductCard } from "@/components/catalog";
import { Checklist, Closing, Crumbs, FaqList, SecHead, Steps, breadcrumbLd, faqLd } from "@/components/ui";
import { WORK_STEPS } from "@/data/agency";
import { COMPANY } from "@/data/company";
import { PRODUCTS } from "@/data/products";
import { SECTORS } from "@/data/sectors";
import { safeJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/page-meta";
import { ORG_ID } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const TITLE = "Bursa'da Kurumsal Web Sitesi ve Dijital Çözümler | Vitrinweb";
const DESCRIPTION =
  "Merkezi Bursa Nilüfer'de olan Vitrinweb; Bursa'daki işletmelere kurumsal web sitesi, ürün görseli, stok takibi, reklam raporlama ve özel yazılım çözümleri sunar.";

export const metadata = pageMeta("/bursa", TITLE, DESCRIPTION);

const LOCAL_CHECKLIST = [
  "Google İşletme Profilinizde adres, telefon ve çalışma saatleri web sitenizle birebir aynı olsun.",
  "Web sitenizde hangi ilçelere (Nilüfer, Osmangazi, Yıldırım, İnegöl, Mudanya…) hizmet verdiğinizi açıkça yazın.",
  "Her hizmet için ayrı ve açıklayıcı bir sayfa olsun; aranan ifade başlıkta geçsin.",
  "Telefonla arama, WhatsApp ve yol tarifi tek dokunuşla ulaşılabilir olsun.",
  "Müşteri yorumlarını düzenli isteyin ve her yoruma yanıt verin.",
  "Ürün ve mekân fotoğraflarınız güncel, tutarlı ve hızlı açılan boyutlarda olsun.",
];

const FAQS = [
  {
    q: "Vitrinweb Bursa'da mı?",
    a: `Evet. Vitrinweb'in merkezi Bursa'dadır: ${COMPANY.address}. Bilgi almak veya keşif görüşmesi planlamak için formumuzu doldurabilir, telefon ya da WhatsApp üzerinden yazabilirsiniz.`,
  },
  {
    q: "Yalnızca Bursa'daki işletmelerle mi çalışıyorsunuz?",
    a: "Hayır. Keşif görüşmesinden teslime kadar süreç telefon, WhatsApp ve e-posta üzerinden yürüyebildiği için farklı şehirlerdeki işletmelerle de çalışabiliriz. Bursa'daki işletmeler için aynı süreç geçerlidir.",
  },
  {
    q: "Bursa'da bir web sitesi kaça mal olur?",
    a: "Ücret; sayfa sayısına, ek özelliklere, içeriği kimin hazırladığına ve yayından sonraki bakım koşullarına göre değişir. Vitrinweb'de ücret kısa bir görüşmeden sonra yazılı teklifte belirlenir; teslimatlar, takvim ve bakım koşulları aynı belgede yer alır.",
  },
  {
    q: "Web sitesi dışında hangi işlerde yardımcı oluyorsunuz?",
    a: "Ürün görseli üretimi, Meta reklam raporlama, barkodlu stok takibi, belge okuma, müşteri asistanı, futbol kulübü yönetimi gibi hazır dijital ürünlerin yanında işletmeye özel yönetim paneli, otomasyon ve entegrasyon yazılımları geliştiriyoruz.",
  },
  {
    q: "Google'da Bursa aramalarında üst sıraya çıkmayı garanti ediyor musunuz?",
    a: "Hayır. Google'da belirli bir sırayı kimse dürüstçe garanti edemez. Bizim işimiz sitenin teknik altyapısını, yerel bilgilerini ve içeriğini Google'ın kurallarına uygun ve eksiksiz kurmaktır; sıralama zamanla içerik, yorumlar ve rekabete göre oluşur.",
  },
];

const ld = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/bursa#hizmet`,
    name: "Bursa'da kurumsal web sitesi ve dijital çözümler",
    description: DESCRIPTION,
    url: `${SITE_URL}/bursa`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: "Bursa", containedInPlace: { "@type": "Country", name: "Türkiye" } },
    inLanguage: "tr-TR",
  },
  faqLd(FAQS),
  breadcrumbLd(SITE_URL, [{ name: "Bursa", path: "/bursa" }]),
];

const FEATURED = ["web-sitesi-paketi", "urun-gorsel-studyosu", "depo-takibi", "meta-reklam-paneli", "google-haritalar-karnesi", "musteri-asistani"];

export default function Page() {
  const products = FEATURED.map((s) => PRODUCTS.find((p) => p.slug === s)).filter((p) => p !== undefined);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      <main id="main">
        <section className="sec page-top">
          <div className="container-x">
            <Crumbs items={[{ label: "Bursa" }]} />
            <h1 className="h-1 page-h">Bursa&apos;daki işletmeler için web sitesi, dijital ürünler ve özel yazılım.</h1>
            <p className="lead what-is">
              Vitrinweb&apos;in merkezi Bursa Nilüfer&apos;dedir. Bursa&apos;daki işletmelere kurumsal web sitesi tasarlıyor; ürün görseli, stok takibi, reklam raporlama ve
              müşteri iletişimi için hazır dijital ürünler sunuyor, kendi süreçlerine özel yapı isteyenlere yönetim paneli ve otomasyon yazılımı geliştiriyoruz.
            </p>
            <div className="hero-cta">
              <Link className="btn btn-primary btn-lg" href="/bilgi-al?not=Bursa">
                Bilgi Alın
              </Link>
              <Link className="btn btn-line btn-lg" href="/kesif-gorusmesi">
                Keşif Görüşmesi Planlayın
              </Link>
            </div>
          </div>
        </section>

        <section className="sec sec-tint" aria-labelledby="bursa-cozumler">
          <div className="container-x">
            <SecHead id="bursa-cozumler" title="Bursa'daki işletmelerin en sık başladığı çözümler" />
            <div className="pgrid">
              {products.map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </div>
            <p className="fine" style={{ marginTop: 18 }}>
              <Link className="linkb" href="/urunler">
                Tüm ürünleri inceleyin
              </Link>{" "}
              ·{" "}
              <Link className="linkb" href="/isletmeye-ozel">
                İşletmeye özel çözümler
              </Link>
            </p>
          </div>
        </section>

        <section className="sec" aria-labelledby="bursa-sektor">
          <div className="container-x story">
            <SecHead id="bursa-sektor" title="Sektörünüze göre başlayın" />
            <p className="what-is">
              Bursa; tekstil, otomotiv yan sanayi, mobilya ve gıda üretiminin yanında canlı bir perakende, yeme-içme ve hizmet sektörüne sahip bir şehir. Her sektörün
              dijitalde önceliği farklıdır: Bir kafe için menü ve konum, bir toptancı için stok hareketi, bir e-ticaret markası için ürün görseli ve reklam verisi öne çıkar.
            </p>
            <ul className="team-topics">
              {SECTORS.map((s) => (
                <li key={s.slug}>
                  <Link href={`/sektorler/${s.slug}`}>
                    <b>{s.name}</b>
                  </Link>
                  <span>{s.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="bursa-google">
          <div className="container-x story">
            <SecHead id="bursa-google" title="Bursa aramalarında görünmek için temel kontrol listesi" />
            <p className="what-is">
              &quot;Nilüfer kuaför&quot; ya da &quot;Bursa toptan tekstil&quot; gibi yerel aramalarda Google, işletmeyi hem web sitesinden hem de Google İşletme
              Profili&apos;nden tanır. İki kaynağın aynı bilgiyi vermesi ve sitenin hızlı, eksiksiz olması temeldir.
            </p>
            <Checklist items={LOCAL_CHECKLIST} cls="chk-card" />
            <p className="fine" style={{ marginTop: 16 }}>
              Ayrıntılı rehberler: <Link href="/blog/yerel-seo-rehberi">Yerel SEO rehberi</Link> ·{" "}
              <Link href="/blog/google-isletme-profili-rehberi">Google İşletme Profili rehberi</Link>
            </p>
          </div>
        </section>

        <section className="sec sec-tint" aria-labelledby="bursa-surec">
          <div className="container-x">
            <SecHead id="bursa-surec" title="Nasıl çalışıyoruz?" />
            <Steps steps={WORK_STEPS} cols={4} />
          </div>
        </section>

        <section className="sec" aria-labelledby="bursa-sss">
          <div className="container-x">
            <SecHead id="bursa-sss" title="Bursa'daki işletmelerden sık gelen sorular" />
            <FaqList items={FAQS} idPrefix="bursa" />
          </div>
        </section>

        <Closing
          title="İşletmenizin dijitalde ilk adımını birlikte belirleyelim."
          text="İhtiyacınızı kısaca paylaşın; size uygun çözümü, kapsamı ve takvimi yazılı olarak iletelim."
          primary={{ label: "Bilgi Alın", href: "/bilgi-al?not=Bursa" }}
          secondary={{ label: "Keşif Görüşmesi Planlayın", href: "/kesif-gorusmesi" }}
          whatsapp="Merhaba, Bursa'dayız ve Vitrinweb'in çözümleri hakkında bilgi almak istiyoruz."
        />
      </main>
    </>
  );
}
