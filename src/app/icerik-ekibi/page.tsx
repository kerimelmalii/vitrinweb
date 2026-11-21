import Link from "next/link";
import { breadcrumbLd } from "@/components/ui";
import { lite, PostCard } from "@/components/blog";
import { AUTHOR, AUTHOR_ID } from "@/components/blog-post";
import { BLOG } from "@/data/blog";
import { safeJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/page-meta";
import { ORG_ID } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const DESCRIPTION =
  "Vitrinweb blogundaki rehberleri hazırlayan içerik ekibi: hangi konularda yazdığımız, yazıları nasıl araştırıp kontrol ettiğimiz ve yayınladığımız tüm rehberler.";

export const metadata = pageMeta("/icerik-ekibi", "Vitrinweb İçerik Ekibi | Yazar Sayfası", DESCRIPTION);

const TOPICS = [
  { t: "Web siteleri ve Google görünürlüğü", d: "Kurumsal web sitesi, temel SEO, yerel arama, Google İşletme Profili ve sayfa hızı." },
  { t: "Ürün görselleri ve içerik", d: "Ürün fotoğrafı, katalog düzeni, içerik pazarlaması ve müşteri yorumları." },
  { t: "Reklam ve raporlama", d: "Meta reklam raporlarında doğru metrikler ve bütçenin gerçek karşılığını okumak." },
  { t: "Stok ve operasyon", d: "Stok tablosu düzeni, barkodlu kayıt, belge işleri ve günlük operasyonun dijitalleşmesi." },
];

const ld = [
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE_URL}/icerik-ekibi`,
    inLanguage: "tr-TR",
    mainEntity: {
      "@type": "Organization",
      "@id": AUTHOR_ID,
      name: AUTHOR.name,
      url: `${SITE_URL}/icerik-ekibi`,
      description: DESCRIPTION,
      parentOrganization: { "@id": ORG_ID },
      knowsAbout: TOPICS.map((x) => x.t),
    },
  },
  breadcrumbLd(SITE_URL, [
    { name: "Blog", path: "/blog" },
    { name: AUTHOR.name, path: "/icerik-ekibi" },
  ]),
];

export default function Page() {
  const posts = [...BLOG].sort((a, b) => (b.updated ?? b.date).localeCompare(a.updated ?? a.date)).map(lite);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      <main id="main">
        <section className="sec page-top">
          <div className="container-x">
            <nav className="crumbs" aria-label="Konum">
              <Link className="linkb" href="/">
                Anasayfa
              </Link>
              <span aria-hidden="true">/</span>
              <Link className="linkb" href="/blog">
                Blog
              </Link>
              <span aria-hidden="true">/</span>
              <span>{AUTHOR.name}</span>
            </nav>
            <h1 className="h-1 page-h">{AUTHOR.name}</h1>
            <p className="lead what-is">
              Vitrinweb İçerik Ekibi, işletmelere web siteleri, hazır dijital ürünler ve özel yazılımlar geliştiren Vitrinweb&apos;in blogunu hazırlar. Yazılarımız
              işletme sahiplerinin sık sorduğu sorulardan yola çıkar; kendi çalışmalarımızdan edindiğimiz deneyimi resmi ve birincil kaynaklarla birleştirir.
            </p>
          </div>
        </section>
        <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="konular">
          <div className="container-x">
            <h2 className="h-3" id="konular">
              Hangi konularda yazıyoruz?
            </h2>
            <ul className="team-topics">
              {TOPICS.map((x) => (
                <li key={x.t}>
                  <b>{x.t}</b>
                  <span>{x.d}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="nasil">
          <div className="container-x story">
            <h2 className="h-3" id="nasil">
              Yazılarımızı nasıl hazırlıyoruz?
            </h2>
            <p className="what-is">
              Her yazı konu seçimi, birincil kaynaklarla araştırma, taslak ve yayından önce tek tek bilgi kontrolü adımlarından geçer. Rakamları kaynağı ve yılıyla
              veririz, kaynağını gösteremediğimiz bir bilgiyi kullanmayız. Yapay zekâ araçlarını yalnızca araştırma ve taslakta yardımcı olarak kullanırız; yayındaki
              her cümlenin sorumluluğu Vitrinweb&apos;e aittir. Google&apos;da belirli bir sıralamayı kimse garanti edemez, biz de yazılarımızda böyle bir vaatte
              bulunmayız. Ayrıntılar için <Link href="/icerik-politikasi">İçerik Politikası</Link> sayfamızı okuyun. Bir yazıda hata görürseniz{" "}
              <Link href="/iletisim">bize yazın</Link>, inceleyip düzeltelim.
            </p>
          </div>
        </section>
        <section className="sec sec-tint" aria-labelledby="yazilar">
          <div className="container-x">
            <h2 className="h-2" id="yazilar">
              Ekibimizin yazdığı rehberler
            </h2>
            <div className="bgrid" style={{ marginTop: 24 }}>
              {posts.map((p) => (
                <PostCard key={p.slug} p={p} level="h3" />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
