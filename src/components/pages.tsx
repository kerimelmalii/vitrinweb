import Link from "next/link";
import { OzelArt, SectorArt, ServiceArt } from "@/components/art";
import { CatalogGrid, ProductCard } from "@/components/catalog";
import { CustomWizard } from "@/components/custom-wizard";
import { DemoGallery } from "@/components/demo-gallery";
import { Icon } from "@/components/icons";
import { LegalCompanyInfo } from "@/components/legal-company-info";
import { Checklist, Closing, Crumbs, FaqList, SecHead, Steps, waLink, WhatsAppButton } from "@/components/ui";
import {
  ABOUT_STORY,
  CUSTOM_FAQS,
  CUSTOM_STEPS,
  CUSTOM_WORK_TYPES,
  FOUNDER,
  WHY_WEB,
  WHAT_IS,
  WHY_WEB_CHECKLIST,
  WORK_HOURS,
  WORK_STEPS,
} from "@/data/agency";
import type { CaseStudy } from "@/data/cases";
import { COMPANY, INSTAGRAM_URL, PHONE_DIGITS } from "@/data/company";
import { getProduct, infoHref } from "@/data/products";
import { SECTORS, type Sector } from "@/data/sectors";
import { SERVICES, type Service } from "@/data/services";

/* ================= ÜRÜNLER (KATALOG) ================= */
export function CatalogPage() {
  return (
    <main id="main">
      <section className="sec page-top">
        <div className="container-x">
          <Crumbs items={[{ label: "Ürünler" }]} />
          <h1 className="h-1 page-h">İşletmenizin günlük operasyonları için hazır dijital ürünler.</h1>
          <p className="lead">
            Satış görsellerinden stok yönetimine, belge okumadan müşteri iletişimine kadar ihtiyacınıza odaklanan ürünü seçin. Çalışma yapısını ve
            işletmenize uyarlanma biçimini detay sayfasında inceleyin.
          </p>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <CatalogGrid />
          <p className="fine" style={{ marginTop: 18 }}>
            Ekranlar örnek veridir; adlar ve rakamlar gösterim amaçlıdır.
          </p>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <div className="roc">
            <div className="roc-i">
              <Icon n="layout" size={28} sw={1.5} />
              <h2 className="h-3">Tamamlayıcı hizmetler</h2>
              <p>Google profil düzenlemesi, WhatsApp karşılama, online randevu ve aylık performans raporu gibi hizmetlerle ürünlerinizi destekleyin.</p>
              <Link className="btn btn-line" href="/hizmetler">
                Tamamlayıcı Hizmetleri İnceleyin
              </Link>
            </div>
            <div className="roc-i dark">
              <Icon n="tool" size={28} sw={1.5} />
              <h2 className="h-3">İşletmenize özgü bir iş akışı mı var?</h2>
              <p>Ekibinizin çalışma yapısına uygun özel panel, otomasyon veya entegrasyon tasarlayalım.</p>
              <Link className="btn btn-primary" href="/isletmeye-ozel">
                Özel Çözümleri İnceleyin
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Closing
        title="Birden fazla alanda dönüşüm mü planlıyorsunuz?"
        text="Öncelikli adımları birlikte sıralayalım. Hazır ürünlerimizle hızlı kazanım sağlayabileceğiniz alanları ve özel geliştirme gerektiren süreçleri tek görüşmede değerlendirelim."
        primary={{ label: "Keşif Görüşmesi Planlayın", href: "/kesif-gorusmesi" }}
      />
    </main>
  );
}

/* ================= İŞLETMEYE ÖZEL ================= */
export function CustomPage() {
  return (
    <main id="main">
      <section className="phero">
        <div className="container-x phero-grid">
          <div className="phero-copy">
            <Crumbs items={[{ label: "İşletmeye Özel Çözümler" }]} />
            <p className="pname">
              <Icon n="tool" size={20} sw={1.8} />
              İşletmeye Özel Çözümler
            </p>
            <h1 className="h-1">Yazılımı işletmenizin gerçek çalışma biçimine uyarlayalım.</h1>
            <p className="lead">
              Aynı sipariş bilgilerini birden fazla tabloya giriyor, gün sonu raporlarını manuel hazırlıyor veya müşteri taleplerini dağınık kanallardan
              yönetiyorsanız darboğazı birlikte ortadan kaldıralım.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary btn-lg" href="#ihtiyac">
                İhtiyacınızı Anlatın
              </a>
              <Link className="btn btn-line btn-lg" href="/nasil-calisiyoruz">
                Çalışma Sürecimizi İnceleyin
              </Link>
            </div>
          </div>
          <figure className="phero-shot">
            <OzelArt uid="ozel-hero" />
            <figcaption className="fine">Örnek senaryo · Süreç şeması</figcaption>
          </figure>
        </div>
      </section>
      <section className="sec" aria-labelledby="oz-adim">
        <div className="container-x">
          <SecHead id="oz-adim" title="Özel çözüm nasıl geliştirilir?" />
          <Steps steps={CUSTOM_STEPS} />
        </div>
      </section>
      <section className="sec sec-tint" aria-labelledby="oz-tur">
        <div className="container-x">
          <SecHead id="oz-tur" title="Çalışma türleri" />
          <div className="principles four">
            {CUSTOM_WORK_TYPES.map((w) => (
              <div key={w.t}>
                <Icon n={w.icon} size={26} sw={1.5} />
                <h3 className="h-3">{w.t}</h3>
                <p>{w.d}</p>
              </div>
            ))}
          </div>
          <div className="scenario">
            <span className="tag tag-sample">Örnek senaryo</span>
            <p>
              Bir mağaza ekibi günlük sipariş durumlarını iki ayrı tabloda günceller. Özel çözümde sipariş tek panelde açılır, durum değişiklikleri anlık
              kaydedilir ve gün sonu özeti aynı veri üzerinden otomatik hazırlanır.
            </p>
          </div>
        </div>
      </section>
      <section className="sec" id="ihtiyac" aria-labelledby="oz-wiz">
        <div className="container-x split">
          <div>
            <h2 className="h-2" id="oz-wiz">
              İhtiyacınızı üç soruda anlatın.
            </h2>
            <p className="lead">Cevaplarınız keşif formuna not olarak taşınır; görüşmeye hazırlıklı başlarız.</p>
            <div className="fitw single">
              <div>
                <h3 className="h-3">Kimler için?</h3>
                <p>
                  İyileştirmek istediği süreci tarif edebilen, kullandığı araçları ve sorumlu rolleri bilen işletmeler için. Görüşmede hazır bir
                  ürünümüzün ihtiyacınızı daha hızlı karşıladığını görürsek öncelikle onu öneririz.
                </p>
              </div>
              <div>
                <h3 className="h-3">Proje kapsamı</h3>
                <p>Yazılı teklifte tüm teslimatlar, tahmini takvim, test kriterleri ve yayın sonrası bakım koşulları açıkça yer alır.</p>
              </div>
            </div>
          </div>
          <CustomWizard />
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="oz-sss">
        <div className="container-x narrow">
          <SecHead id="oz-sss" title="Sık sorulan sorular" />
          <FaqList items={CUSTOM_FAQS} idPrefix="sss-ozel" />
        </div>
      </section>
      <Closing
        title="Öncelikli bir iş sürecinizi seçin."
        text="Bugün nasıl işlediğini paylaşın, en doğru ilk adımı birlikte tasarlayalım."
        primary={{ label: "Keşif Görüşmesi Planlayın", href: "/kesif-gorusmesi?urun=isletmeye-ozel" }}
      />
    </main>
  );
}

/* ================= DEMOLAR ================= */
export function DemosPage() {
  return (
    <main id="main">
      <section className="sec page-top">
        <div className="container-x">
          <Crumbs items={[{ label: "Demolar" }]} />
          <h1 className="h-1 page-h">Çözümlerin çalışma yapısını doğrudan deneyimleyin.</h1>
          <p className="lead">
            Bir ürün fotoğrafının dönüşümünü karşılaştırın, örnek reklam performans raporunu inceleyin veya depo çıkışında stok uyarılarının nasıl
            çalıştığını canlı görün.
          </p>
          <p className="fine demo-help">
            <Icon n="info" size={14} /> Bu ekrandaki tüm kayıtlar gösterim amaçlıdır. Demo sırasında yaptığınız değişiklikler oturum sonunda sıfırlanır.
          </p>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <DemoGallery />
        </div>
      </section>
      <Closing
        title="Bu deneyimi kendi işletmenize nasıl uyarlayacağımızı konuşalım."
        primary={{ label: "Keşif Görüşmesi Planlayın", href: "/kesif-gorusmesi" }}
      />
    </main>
  );
}

/* ================= SEKTÖRLER ================= */
export function SectorsPage() {
  return (
    <main id="main">
      <section className="sec page-top">
        <div className="container-x">
          <Crumbs items={[{ label: "Sektörler" }]} />
          <h1 className="h-1 page-h">Sizin sektörünüzde dönüşüme nereden başlayalım?</h1>
          <p className="lead">
            Bir güzellik salonunun randevu akışıyla bir deponun stok operasyonu aynı önceliklere sahip değildir. İş modelinize yakın sektörü seçerek uygun
            çözümleri inceleyin.
          </p>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <ul className="sgrid">
            {SECTORS.map((s) => (
              <li key={s.slug}>
                <Link className="scard" href={`/sektorler/${s.slug}`}>
                  <span className="scard-art" aria-hidden="true">
                    <SectorArt slug={s.slug} />
                  </span>
                  <span className="scard-name">
                    <Icon n={s.icon} size={18} sw={1.8} />
                    {s.name}
                  </span>
                  <span className="pcard-short">{s.description}</span>
                  <span className="pcard-more">
                    Sektörü İnceleyin <Icon n="arrow" size={15} sw={2.2} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Closing
        title="Sektörünüz bu listede yer almıyor mu?"
        text="Mevcut iş akışınızı anlatın, size uygun kurguyu birlikte planlayalım."
        primary={{ label: "İhtiyacınızı Anlatın", href: "/isletmeye-ozel#ihtiyac" }}
      />
    </main>
  );
}

export function SectorPage({ s }: { s: Sector }) {
  const products = s.links.map((l) => getProduct(l.href.replace("/urunler/", ""))).filter((p) => !!p);
  return (
    <main id="main">
      <section className="phero">
        <div className="container-x phero-grid">
          <div className="phero-copy">
            <Crumbs items={[{ label: "Sektörler", href: "/sektorler" }, { label: s.name }]} />
            <p className="pname">
              <Icon n={s.icon} size={20} sw={1.8} />
              {s.name}
            </p>
            <h1 className="h-1">{s.title}</h1>
            <p className="lead">{s.text}</p>
            <div className="hero-cta">
              <Link className="btn btn-primary btn-lg" href={`/bilgi-al?sektor=${s.slug}`}>
                {s.button}
              </Link>
            </div>
            {s.formNote && (
              <p className="note-warn">
                <Icon n="info" size={15} /> {s.formNote}
              </p>
            )}
          </div>
          <figure className="phero-shot sector-shot" aria-hidden="true">
            <SectorArt slug={s.slug} />
          </figure>
        </div>
      </section>
      <section className="sec" aria-labelledby="ilk">
        <div className="container-x">
          <SecHead id="ilk" title="İlk adımlar" />
          <ol className="firststeps">
            {s.steps.map((t, i) => (
              <li key={t}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {t}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="sec sec-tint" aria-labelledby="ilgili">
        <div className="container-x">
          <SecHead id="ilgili" title="Uygun çözümler" />
          <ul className="links-row">
            {s.links.map((l) => (
              <li key={l.href}>
                <Link className="chip-link" href={l.href}>
                  {l.label} <Icon n="arrow" size={14} sw={2.2} />
                </Link>
              </li>
            ))}
          </ul>
          {products.length > 1 && (
            <div className="pgrid" style={{ marginTop: 28 }}>
              {products.map((p) => p && <ProductCard key={p.slug} p={p} />)}
            </div>
          )}
        </div>
      </section>
      <Closing
        title={`${s.name} için doğru ilk adımı birlikte belirleyelim.`}
        text="Bugünkü iş akışınızı ve öncelikli ihtiyacınızı paylaşın; size uygun kurguyu birlikte planlayalım."
        primary={{ label: s.button, href: `/bilgi-al?sektor=${s.slug}` }}
        note={s.formNote}
      />
    </main>
  );
}

/* ================= HİZMETLER ================= */
export function ServicesPage() {
  return (
    <main id="main">
      <section className="sec page-top">
        <div className="container-x">
          <Crumbs items={[{ label: "Tamamlayıcı Hizmetler" }]} />
          <h1 className="h-1 page-h">Dijital operasyonunuza ihtiyaç duyduğunuz noktadan profesyonel destek.</h1>
          <p className="lead">
            Çekirdek ürünlerimizin yanında veya tek başına devreye alabileceğiniz tamamlayıcı hizmetlerimizi inceleyin. Mevcut araçlarınızı ve iş
            akışınızı değerlendirerek size uygun kapsamı planlayalım.
          </p>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <ul className="svgrid">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link className="svcard" href={`/hizmetler/${s.slug}`}>
                  <span className="svcard-ic" aria-hidden="true">
                    <Icon n={s.icon} size={22} sw={1.7} />
                  </span>
                  <span className="pcard-name">{s.name}</span>
                  <span className="pcard-short">{s.card}</span>
                  <span className="pcard-more">
                    Hizmeti İnceleyin <Icon n="arrow" size={15} sw={2.2} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Closing
        title="Öncelikli bir alanı seçin."
        text="Hızlı ve ölçülebilir ilk adımı birlikte belirleyelim."
        primary={{ label: "Bilgi Alın", href: infoHref("hizmetler") }}
      />
    </main>
  );
}

export function ServicePage({ s }: { s: Service }) {
  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);
  const cta = { label: "Bilgi Alın", href: `/bilgi-al?urun=hizmetler&hizmet=${s.slug}` };
  return (
    <main id="main">
      <section className="phero">
        <div className="container-x phero-grid">
          <div className="phero-copy">
            <Crumbs items={[{ label: "Hizmetler", href: "/hizmetler" }, { label: s.name }]} />
            <p className="pname">
              <Icon n={s.icon} size={20} sw={1.8} />
              {s.name}
            </p>
            <h1 className="h-1">{s.title}</h1>
            <p className="lead">{s.text}</p>
            <div className="hero-cta">
              <Link className="btn btn-primary btn-lg" href={cta.href}>
                Bilgi Alın
              </Link>
              {s.link && (
                <Link className="btn btn-line btn-lg" href={s.link.href}>
                  {s.link.label}
                </Link>
              )}
            </div>
          </div>
          <div className="phero-shot">
            <ServiceArt icon={<Icon n={s.icon} size={22} sw={1.7} />} title="Kapsam" items={s.scope} />
          </div>
        </div>
      </section>
      <section className="sec" aria-labelledby="kapsam">
        <div className="container-x split">
          <div>
            <h2 className="h-2" id="kapsam">
              Kapsam
            </h2>
            <Checklist items={s.scope} />
          </div>
          <div className="svc-side">
            {s.example && (
              <div className="sample">
                <span className="tag tag-sample">{s.example.label}</span>
                <p>{s.example.text}</p>
                <p className="fine">İşletme adı ve tarih örnektir.</p>
              </div>
            )}
            {s.faq && (
              <div className="qa-static">
                <h3 className="h-3">{s.faq.q}</h3>
                <p>{s.faq.a}</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Closing
        title="Bu hizmeti işletmenize nasıl uyarlayacağımızı konuşalım."
        primary={cta}
        whatsapp={`Merhaba, Vitrinweb’in ${s.name} hizmeti hakkında bilgi almak istiyorum. İşletmem: . Destek aradığım konu: .`}
      />
      <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="dh">
        <div className="container-x">
          <SecHead
            id="dh"
            title="Diğer hizmetler"
            right={
              <Link className="btn btn-line" href="/hizmetler">
                Tüm Hizmetler
              </Link>
            }
          />
          <ul className="svgrid">
            {others.map((o) => (
              <li key={o.slug}>
                <Link className="svcard" href={`/hizmetler/${o.slug}`}>
                  <span className="svcard-ic" aria-hidden="true">
                    <Icon n={o.icon} size={22} sw={1.7} />
                  </span>
                  <span className="pcard-name">{o.name}</span>
                  <span className="pcard-short">{o.card}</span>
                  <span className="pcard-more">
                    Hizmeti İnceleyin <Icon n="arrow" size={15} sw={2.2} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

/* ================= NASIL ÇALIŞIYORUZ ================= */
export function ProcessPage() {
  return (
    <main id="main">
      <section className="sec page-top">
        <div className="container-x">
          <Crumbs items={[{ label: "Nasıl Çalışıyoruz?" }]} />
          <h1 className="h-1 page-h">İlk görüşmeden teslim gününe kadar şeffaf ve öngörülebilir bir süreç.</h1>
          <p className="lead">
            Önce işinizin gerçek akışını dinliyor, ardından nelerin değişeceğini, teslimatları ve takvimi yazılı olarak netleştiriyoruz. Sürprizsiz, adım
            adım ilerleyen bir çalışma modeli sunuyoruz.
          </p>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }} aria-label="Çalışma adımları">
        <div className="container-x">
          <ol className="timeline">
            {WORK_STEPS.map((s, i) => (
              <li key={s.t}>
                <span className="tl-n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="h-3">{s.t}</h2>
                  <p>{s.d}</p>
                </div>
                <span className="tl-ic" aria-hidden="true">
                  <Icon n={["message", "file", "layout", "shield"][i]} size={22} sw={1.6} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="sec sec-tint">
        <div className="container-x">
          <div className="fitw">
            <div>
              <h2 className="h-3">İlk görüşmeye nasıl hazırlanmalısınız?</h2>
              <p>
                Mevcut bir iş akışının kısa özeti, kullandığınız araçların listesi, örnek bir tablo yapısı veya ekranda görmek istediğiniz üç temel bilgi
                yeterlidir. Paylaştığınız örneklerden kişisel verileri ve erişim şifrelerini çıkarın.
              </p>
            </div>
            <div>
              <h2 className="h-3">Teklif ve kapsam belgesinde neler yer alır?</h2>
              <Checklist items={["Tüm teslimatlar", "Teknik kapsam", "Revizyon koşulları", "Erişim yetkileri", "Veri devir/dışa aktarım esasları"]} />
            </div>
          </div>
        </div>
      </section>
      <Closing
        title="İlk görüşmede en çok zaman alan tek bir sürece odaklanalım."
        primary={{ label: "Keşif Görüşmesi Planlayın", href: "/kesif-gorusmesi" }}
      />
    </main>
  );
}

/* ================= NEDEN WEB SİTESİ ================= */
export function WhyWebPage() {
  return (
    <main id="main">
      <section className="sec page-top">
        <div className="container-x">
          <Crumbs items={[{ label: "Web Sitesi Paketi", href: "/urunler/web-sitesi-paketi" }, { label: "Neden web sitesi?" }]} />
          <h1 className="h-1 page-h">Müşterilerinizin aradığı tüm kurumsal bilgileri güvenilir tek adreste toplayın.</h1>
          <p className="lead">
            Potansiyel bir müşteri sizi bir tavsiye, harita kaydı veya sosyal medya paylaşımı aracılığıyla tanımış olabilir. Kurumsal web siteniz, o
            müşteriye hizmetlerinizi ve profesyonelliğinizi ilk bakışta anlatabileceğiniz kalıcı adresinizdir.
          </p>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <div className="principles">
            {WHY_WEB.map((w) => (
              <div key={w.t}>
                <Icon n={w.icon} size={26} sw={1.5} />
                <h2 className="h-3">{w.t}</h2>
                <p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="sec sec-tint" aria-labelledby="kontrol">
        <div className="container-x split">
          <div>
            <h2 className="h-2" id="kontrol">
              Başlangıç kontrol listesi
            </h2>
            <p className="lead">Bu beş bilgi hazırsa web sitenizin ilk taslağına hızla başlayabiliriz.</p>
            <div className="hero-cta">
              <Link className="btn btn-primary btn-lg" href="/urunler/web-sitesi-paketi">
                Web Sitesi Paketini İnceleyin
              </Link>
              <Link className="btn btn-line btn-lg" href={infoHref("web-sitesi-paketi")}>
                Bilgi Alın
              </Link>
            </div>
          </div>
          <Checklist items={WHY_WEB_CHECKLIST} cls="chk-card" />
        </div>
      </section>
    </main>
  );
}

/* ================= HAKKIMIZDA ================= */
export function AboutPage() {
  const initials = FOUNDER.name
    .split(" ")
    .map((w) => w[0])
    .join("");
  return (
    <main id="main">
      <section className="sec page-top">
        <div className="container-x">
          <Crumbs items={[{ label: "Hakkımızda" }]} />
          <h1 className="h-1 page-h">İşinizin gerçek işleyişini anlayarak kalıcı dijital çözümler geliştiriyoruz.</h1>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="nedir">
        <div className="container-x story">
          <h2 className="h-3" id="nedir">
            Vitrinweb nedir?
          </h2>
          <p className="lead what-is">{WHAT_IS}</p>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container-x story">
          <p className="story-lead">{ABOUT_STORY}</p>
        </div>
      </section>
      <section className="sec sec-tint" aria-labelledby="kurucu">
        <div className="container-x founder">
          <figure className="founder-ph">
            {FOUNDER.photo ? (
              // eslint-disable-next-line @next/next/no-img-element -- yol company verisinden gelir, boyut CSS ile sabit
              <img src={FOUNDER.photo} alt={FOUNDER.photoAlt} width={480} height={560} />
            ) : (
              <span className="founder-mono" aria-hidden="true">
                {initials}
              </span>
            )}
          </figure>
          <div>
            <h2 className="h-2" id="kurucu">
              {FOUNDER.name}
            </h2>
            <p className="founder-role">{FOUNDER.role}</p>
            <blockquote className="founder-q">{FOUNDER.text}</blockquote>
            <div className="hero-cta">
              <Link className="btn btn-line" href="/nasil-calisiyoruz">
                Nasıl Çalışıyoruz?
              </Link>
              <Link className="btn btn-primary" href="/iletisim">
                İletişime Geçin
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="sec-s" id="icerik-ekibi">
        <div className="container-x">
          <h2 className="h-3">İçerik ekibimiz</h2>
          <p className="lead about-content-team">
            Blog yazılarımız Vitrinweb İçerik Ekibi imzasıyla yayınlanır. Yazılarda ürün görselleri, reklam raporlama, stok düzeni, web siteleri ve Google
            görünürlüğü üzerine kendi çalışmalarımızdan edindiğimiz deneyimi güvenilir kaynaklarla birleştiriyoruz; yayından önce her bilgiyi kontrol
            ediyoruz. <Link href="/icerik-politikasi">İçeriklerimizi nasıl hazırladığımızı okuyun</Link>.
          </p>
        </div>
      </section>
      <section className="sec-s" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <div className="about-owner">
            <p>
              {COMPANY.brand}, {COMPANY.title} tarafından işletmelere sunulan dijital çözümler markasıdır.
            </p>
          </div>
          <LegalCompanyInfo />
        </div>
      </section>
    </main>
  );
}

/* ================= İLETİŞİM ================= */
export function ContactPage() {
  const supportSubject = "Vitrinweb destek talebi – ";
  const supportBody = "Sipariş veya proje numarası: \nTalebiniz: \n";
  const wa = waLink("Merhaba, Vitrinweb’in  çözümü hakkında bilgi almak istiyorum. İşletmem: . Destek aradığım konu: .");
  return (
    <main id="main">
      <section className="sec page-top">
        <div className="container-x">
          <Crumbs items={[{ label: "İletişim" }]} />
          <h1 className="h-1 page-h">Size nasıl yardımcı olabiliriz?</h1>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <div className="cgrid">
            <div className="ccard">
              <Icon n="spark" size={26} sw={1.5} />
              <h2 className="h-3">Yeni proje</h2>
              <p>Öncelikli ihtiyacınızı veya geliştirmek istediğiniz süreci paylaşın.</p>
              <Link className="btn btn-primary" href="/kesif-gorusmesi">
                Keşif Görüşmesi Planlayın
              </Link>
            </div>
            <div className="ccard">
              <Icon n="tool" size={26} sw={1.5} />
              <h2 className="h-3">Mevcut sipariş veya destek</h2>
              <p>Proje veya sipariş numaranızla birlikte talebinizi kısaca iletin.</p>
              <a
                className="btn btn-line"
                href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(supportSubject)}&body=${encodeURIComponent(supportBody)}`}
              >
                Destek İçin Yazın
              </a>
            </div>
            <div className="ccard">
              <Icon n="users" size={26} sw={1.5} />
              <h2 className="h-3">İş birliği</h2>
              <p>İş birliği fikrinizi ve çalışma modelinizi birkaç cümleyle paylaşın.</p>
              <a className="btn btn-line" href={`mailto:${COMPANY.email}?subject=${encodeURIComponent("Vitrinweb iş birliği")}`}>
                E-posta Gönderin
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="sec sec-tint" aria-labelledby="kanallar">
        <div className="container-x split">
          <div>
            <h2 className="h-2" id="kanallar">
              İletişim kanalları
            </h2>
            <dl className="crows">
              <div>
                <dt>E-posta</dt>
                <dd>
                  <a className="contact-email" href={`mailto:${COMPANY.email}`}>
                    {COMPANY.email}
                  </a>
                </dd>
              </div>
              {PHONE_DIGITS && wa && (
                <div>
                  <dt>WhatsApp</dt>
                  <dd>
                    <a href={wa} target="_blank" rel="noopener noreferrer">
                      {COMPANY.phone}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt>Instagram</dt>
                <dd>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                    @vitrinweb.com.tr
                  </a>
                </dd>
              </div>
              {WORK_HOURS && (
                <div>
                  <dt>Çalışma saatleri</dt>
                  <dd>{WORK_HOURS}</dd>
                </div>
              )}
              <div>
                <dt>Adres</dt>
                <dd>
                  {COMPANY.title}
                  <br />
                  {COMPANY.address}
                </dd>
              </div>
            </dl>
          </div>
          <div className="wa-tpl">
            <span className="tag">WhatsApp hazır mesajı</span>
            <p>
              Merhaba, Vitrinweb’in <b>[hizmet adı]</b> çözümü hakkında bilgi almak istiyorum. İşletmem: <b>[işletme adı]</b>. Destek aradığım konu:{" "}
              <b>[kısa açıklama]</b>.
            </p>
            <p className="fine">Köşeli parantezli yerleri kendi bilgilerinizle doldurun.</p>
            <WhatsAppButton cls="btn btn-primary" />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= UYGULAMA ÖRNEĞİ ================= */
export function CasePage({ c }: { c: CaseStudy }) {
  const p = getProduct(c.productSlug);
  return (
    <main id="main">
      <section className="sec page-top">
        <div className="container-x narrow">
          <Crumbs items={[{ label: "Demolar", href: "/demolar" }, { label: c.title }]} />
          <h1 className="h-1 page-h">{c.title}</h1>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container-x narrow case">
          <h2 className="h-3">Sorun</h2>
          <p>{c.problem}</p>
          <h2 className="h-3">Uygulama</h2>
          <p>{c.solution}</p>
          <h2 className="h-3">Sonuç</h2>
          <p>{c.result}</p>
          <p className="fine">{c.measurement}</p>
          <div className="case-imgs">
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element -- izinli vaka görselleri public/ altından */}
              <img src={c.before.src} alt={c.before.alt} />
              <figcaption>Önce</figcaption>
            </figure>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element -- izinli vaka görselleri public/ altından */}
              <img src={c.after.src} alt={c.after.alt} />
              <figcaption>Sonra</figcaption>
            </figure>
          </div>
          {c.quote && (
            <blockquote className="founder-q">
              “{c.quote.text}” <cite>{c.quote.title}</cite>
            </blockquote>
          )}
          <div className="hero-cta">
            {p && (
              <Link className="btn btn-line" href={`/urunler/${p.slug}`}>
                İlgili Çözümü İnceleyin
              </Link>
            )}
            <Link className="btn btn-primary" href="/kesif-gorusmesi">
              Benzer Bir Projeyi Planlayalım
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
