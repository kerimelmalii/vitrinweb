import Image from "next/image";
import Link from "next/link";
import { HeroAdsCard, HeroStockCard, HeroStudioCard, WebArt } from "@/components/art";
import { ProductCard } from "@/components/catalog";
import { StudioDemo } from "@/components/demos";
import { Icon } from "@/components/icons";
import { LeadForm } from "@/components/lead-form";
import { FaqList, SecHead, Steps, WhatsAppButton } from "@/components/ui";
import { HOME_FAQS, HOME_GUIDES, HOME_PRIORITIES, HOME_PROCESS, PRINCIPLES } from "@/data/agency";
import { BLOG, coverSrc, type BlogPost } from "@/data/blog";
import { CASES } from "@/data/cases";
import { HOME_PRODUCTS, getProduct, type Product } from "@/data/products";

function Hero() {
  return (
    <section className="hero hero-a">
      <div className="container-x hero-grid">
        <div className="hero-copy rise">
          <h1 className="h-display">İşletmeniz için tasarlanan dijital ürünler ve özel yazılımlar.</h1>
          <p className="lead">
            Marka değerinizi yansıtan web siteleri, görsel üretimden reklam ve stok takibine kadar kritik işleri hızlandıran hazır dijital ürünler ve
            operasyonunuza özel yazılımlar geliştiriyoruz.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-primary btn-lg" href="/bilgi-al">
              Bilgi Alın
            </Link>
            <Link className="btn btn-line btn-lg" href="/urunler">
              Ürünleri Keşfedin
            </Link>
          </div>
          <p className="fine hero-note">
            İhtiyacınızı kısaca paylaşın veya <Link href="/kesif-gorusmesi">15 dakikalık bir keşif görüşmesi</Link> planlayın.
          </p>
        </div>
        <figure className="hero-comp">
          <div
            className="hc-stage"
            role="img"
            aria-label="Stüdyo kalitesinde düzenlenmiş ürün fotoğrafı, sade reklam performans özeti ve mobil stok hareketleri ekranı."
          >
            <div className="hc-a" aria-hidden="true">
              <HeroStudioCard />
            </div>
            <div className="hc-b" aria-hidden="true">
              <HeroAdsCard />
            </div>
            <div className="hc-c" aria-hidden="true">
              <HeroStockCard />
            </div>
          </div>
          <figcaption className="hc-cap">
            <span>Ürün Görsel Stüdyosu</span>
            <span>Reklam Performansı</span>
            <span>Stok Hareketleri</span>
            <span className="tag">Örnek ekranlar</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Priorities() {
  const items = HOME_PRIORITIES.filter((it) => !it.onlyWhenLive || getProduct(it.slug)?.status === "hazir");
  return (
    <section className="sec" aria-labelledby="oncelik">
      <div className="container-x">
        <SecHead id="oncelik" title="İşletmenizin bugün önceliği ne?" />
        <ul className="prio">
          {items.map((it) => {
            const p = getProduct(it.slug);
            if (!p) return null;
            return (
              <li key={it.slug}>
                <Link href={`/urunler/${p.slug}`}>
                  <q>{it.quote}</q>
                  <span className="prio-to">
                    <Icon n={p.icon} size={16} sw={1.9} />
                    {p.name}
                    <Icon n="arrow" size={15} sw={2.2} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Products() {
  const ps = HOME_PRODUCTS.map((s) => getProduct(s)).filter((p): p is Product => !!p);
  return (
    <section className="sec sec-tint" id="urunler" aria-labelledby="urunler-h">
      <div className="container-x">
        <SecHead
          id="urunler-h"
          title="Ürünler"
          sub="Satışa hazır ürün görselleri üretin, reklam bütçenizin getirisini net biçimde okuyun ve depo hareketlerinizi anlık yönetin."
        />
        <div className="pgrid">
          {ps.map((p) => (
            <ProductCard key={p.slug} p={p} text={p.homeText} />
          ))}
        </div>
        <div className="more-row">
          <p>Görüşme Özeti, Belge Okuma, Müşteri Asistanı, Müşteri Bulma ve diğer dijital çözümlerimizi katalogda inceleyin.</p>
          <Link className="btn btn-line" href="/urunler">
            Tüm Ürünleri İnceleyin
          </Link>
        </div>
      </div>
    </section>
  );
}

function Compare() {
  return (
    <section className="sec" aria-labelledby="vitrin">
      <div className="container-x split">
        <div>
          <h2 className="h-2" id="vitrin">
            Tek fotoğraf, her kanal için tutarlı vitrin
          </h2>
          <p className="lead">
            Telefonla çekilmiş ham ürün fotoğrafı ile satış kanallarına hazır işlenmiş görseli karşılaştırın. Kaydırıcıyı hareket ettirerek ışık, kadraj
            ve arka plan düzenlemesinin ürün algısını nasıl yükselttiğini görün.
          </p>
          <div className="chips static" style={{ marginTop: 22 }}>
            <span className="chip">Orijinal</span>
            <span className="chip">İşlenmiş</span>
            <span className="chip ghost">Örnek çalışma</span>
          </div>
          <Link className="btn btn-line" style={{ marginTop: 26 }} href="/urunler/urun-gorsel-studyosu#demo">
            Daha Fazla Örnek İnceleyin
          </Link>
        </div>
        <div className="compare-card">
          <StudioDemo compact />
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="surec">
      <div className="container-x">
        <SecHead
          id="surec"
          title="Nasıl çalışıyoruz?"
          right={
            <Link className="btn btn-line" href="/nasil-calisiyoruz">
              Çalışma Sürecimizi İnceleyin
            </Link>
          }
        />
        <Steps steps={HOME_PROCESS} cols={4} />
      </div>
    </section>
  );
}

function ReadyOrCustom() {
  return (
    <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="hazir">
      <div className="container-x">
        <SecHead id="hazir" title="Hazır dijital ürünler ve işletmeye özel yazılım" />
        <div className="roc">
          <div className="roc-i">
            <Icon n="box" size={28} sw={1.5} />
            <h3 className="h-3">Hazır çözümler</h3>
            <p>
              Ürün görselleri, reklam raporlama ve stok takibi gibi kanıtlanmış ihtiyaçlar için hızla devreye alınabilen ürünlerimizi seçin.
            </p>
            <Link className="btn btn-line" href="/urunler">
              Hazır Ürünleri İnceleyin
            </Link>
          </div>
          <div className="roc-i dark">
            <Icon n="tool" size={28} sw={1.5} />
            <h3 className="h-3">İşletmenize özel</h3>
            <p>
              Kullandığınız sistemleri birbirine bağlamak veya tekrar eden operasyonları otomatikleştirmek için ekibinizin çalışma modeline özel
              yazılım tasarlayalım.
            </p>
            <Link className="btn btn-primary" href="/isletmeye-ozel">
              İhtiyacınızı Anlatın
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className="sec sec-tint" aria-labelledby="ilke">
      <div className="container-x">
        <SecHead id="ilke" title="Çalışma ilkelerimiz" />
        <div className="principles">
          {PRINCIPLES.map((p) => (
            <div key={p.t}>
              <Icon n={p.icon} size={26} sw={1.5} />
              <h3 className="h-3">{p.t}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Examples() {
  const own = CASES.find((c) => c.internal);
  return (
    <section className="sec" aria-labelledby="ornek">
      <div className="container-x">
        <div className="demo-band">
          <div>
            <h2 className="h-2" id="ornek">
              Uygulamadan örnekler
            </h2>
            <p className="lead">
              Bir ürün görselinin dönüşümünü, haftalık reklam performansının okunmasını ve mobil stok çıkış kaydını etkileşimli örnek senaryolarla
              inceleyin.
            </p>
            <Link className="btn btn-primary btn-lg" href="/demolar">
              Demoları İnceleyin
            </Link>
          </div>
          <ul className="demo-mini" aria-hidden="true">
            <li>
              <Icon n="image" size={18} /> Bir ürünün iki hâli
            </li>
            <li>
              <Icon n="trend" size={18} /> Haftalık reklam raporu
            </li>
            <li>
              <Icon n="scan" size={18} /> Depodan üç kutu çıkışı
            </li>
            <li>
              <Icon n="chat" size={18} /> Müşteri asistanı sohbeti
            </li>
          </ul>
        </div>
        {own && (
          <div className="own-case">
            <h3 className="h-2">Kendi operasyonumuzda nasıl kullanıyoruz?</h3>
            <p className="lead">{own.result}</p>
            <Link className="linkb" href={`/uygulamalar/${own.slug}`}>
              Uygulamayı İnceleyin
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function WebsiteBand() {
  return (
    <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="web">
      <div className="container-x">
        <div className="webband">
          <div>
            <h2 className="h-2" id="web">
              Markanızı dijitalde güçlü temsil eden bir web siteniz olsun.
            </h2>
            <p className="lead">
              Hizmetlerinizi, kurumsal kimliğinizi ve iletişim kanallarınızı modern, mobil uyumlu bir web sitesinde sunun. Müşterileriniz aradığı
              bilgiye saniyeler içinde ulaşsın.
            </p>
            <Link className="btn btn-primary btn-lg" href="/urunler/web-sitesi-paketi">
              Web Sitesi Paketini İnceleyin
            </Link>
          </div>
          <div className="webband-art" aria-hidden="true">
            <WebArt />
          </div>
        </div>
        <div className="home-gp" style={{ marginTop: 14 }}>
          <div>
            <h3 className="h-3">Yeni bir girişim mi kuruyorsunuz?</h3>
            <p>Seçtiğimiz girişimlere web sitesi, 12 ay bakım ve SEO desteğini nakit yerine kademeli hak edilen küçük bir pay karşılığında sunuyoruz.</p>
          </div>
          <Link className="btn btn-line" href="/girisim-programi">
            Girişim Programını İnceleyin
          </Link>
        </div>
      </div>
    </section>
  );
}

export function GuideCard({ p }: { p: BlogPost }) {
  return (
    <Link className="gcard" href={`/blog/${p.slug}`}>
      <span className="gcard-img">
        <Image src={coverSrc(p.slug, "-4x3")} alt="" width={800} height={600} sizes="(max-width: 768px) 100vw, 33vw" />
      </span>
      <span className="gcard-cat">{p.category}</span>
      <span className="gcard-t">{p.title}</span>
      <span className="gcard-d">{p.description}</span>
      <span className="pcard-more">
        Rehberi Okuyun <Icon n="arrow" size={15} sw={2.2} />
      </span>
    </Link>
  );
}

function Guides() {
  const posts = HOME_GUIDES.map((s) => BLOG.find((b) => b.slug === s)).filter((x): x is BlogPost => !!x);
  const list = posts.length === 3 ? posts : BLOG.slice(0, 3);
  return (
    <section className="sec sec-tint" aria-labelledby="blog-h">
      <div className="container-x">
        <SecHead
          id="blog-h"
          title="İşletmeler için pratik dijital rehberler"
          right={
            <Link className="btn btn-line" href="/blog">
              Tüm Yazıları Görün
            </Link>
          }
        />
        <div className="ggrid">
          {list.map((p) => (
            <GuideCard key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="sec" id="sss" aria-labelledby="sss-h">
      <div className="container-x narrow">
        <SecHead id="sss-h" title="Sık sorulan sorular" />
        <FaqList items={HOME_FAQS} idPrefix="sss" />
      </div>
    </section>
  );
}

function FinalForm() {
  return (
    <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="son">
      <div className="container-x">
        <div className="final-form">
          <div>
            <h2 className="h-1" id="son">
              İşletmeniz için doğru dijital çözümü birlikte kurgulayalım.
            </h2>
            <p className="lead">
              Dönüştürmek istediğiniz süreci veya öncelikli ihtiyacınızı paylaşın. İlk görüşmede işletmenize en uygun yol haritasını netleştirelim.
            </p>
            <WhatsAppButton cls="btn btn-line" />
          </div>
          <LeadForm compact />
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <main id="main">
      <Hero />
      <Priorities />
      <Products />
      <Compare />
      <Process />
      <ReadyOrCustom />
      <Principles />
      <Examples />
      <WebsiteBand />
      <Guides />
      <Faq />
      <FinalForm />
    </main>
  );
}
