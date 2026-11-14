"use client";

import Link from "next/link";
import { useState } from "react";
import { PaymentTrust } from "@/components/home";
import { Icon } from "@/components/icons";
import { OfferPanel } from "@/components/offer-panel";
import { ProductScreen } from "@/components/product-screen";
import { SectionHead } from "@/components/section-head";
import { PHONE_DIGITS } from "@/data/company";
import { AGENCY_PROCESS } from "@/data/content";
import {
  ALL_PRODUCTS,
  CUSTOM_SOLUTION,
  contactHref,
  productWhatsAppText,
  type Product,
} from "@/data/products";
import { useApp } from "@/lib/order-context";

const waHref = (p: Product) =>
  PHONE_DIGITS ? `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(productWhatsAppText(p))}` : "";

/* ================= KARTLAR ================= */
export function ProductCard({ p }: { p: Product }) {
  return (
    <Link className="pcard" href={`/urunler/${p.slug}`}>
      <span className="pcard-shot" aria-hidden="true">
        <ProductScreen kind={p.screen} />
      </span>
      <span className="pcard-body">
        <span className="pcard-name">
          <Icon n={p.icon} size={18} sw={1.8} />
          {p.name}
        </span>
        <span className="pcard-short">{p.short}</span>
        <span className="pcard-more">
          İnceleyin <Icon n="arrow" size={15} sw={2.2} />
        </span>
      </span>
    </Link>
  );
}

export function ProductGrid() {
  return (
    <>
      <div className="pgrid">
        {ALL_PRODUCTS.map((p) => (
          <ProductCard key={p.slug} p={p} />
        ))}
      </div>
    </>
  );
}

/* ================= ORTAK BÖLÜMLER ================= */
export function AgencyProcess({ id }: { id?: string }) {
  return (
    <section id={id} className="sec" style={{ paddingTop: 0 }}>
      <div className="container-x">
        <SectionHead title="Nasıl çalışıyoruz?" sub="Dört adım. Her adımda ne olacağını önceden bilirsiniz." />
        <ol className="proc">
          {AGENCY_PROCESS.map((s) => (
            <li key={s.n}>
              <div className="n">{s.n}</div>
              <h3 className="h-3">{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ReadyOrCustom() {
  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="container-x">
        <SectionHead title="Hazır mı, size özel mi?" sub="İkisi de aynı ekipten, aynı özenle. Hangisinin uygun olduğuna birlikte karar veririz." />
        <div className="roc">
          <div className="roc-i">
            <h3 className="h-3">Hazır ürün</h3>
            <p>Kurulumu hızlı, fiyatı net. Birçok işletmenin ortak sorununu çözen, denenmiş araçlar.</p>
            <ul className="checks-s">
              <li>
                <Icon n="check" size={15} sw={2.5} />
                Günler içinde kullanımda
              </li>
              <li>
                <Icon n="check" size={15} sw={2.5} />
                İşletmenize göre ayarlanır
              </li>
              <li>
                <Icon n="check" size={15} sw={2.5} />
                Aylık, taahhütsüz
              </li>
            </ul>
            <Link className="plink" href="/urunler">
              Ürünleri inceleyin
            </Link>
          </div>
          <div className="roc-i dark">
            <h3 className="h-3">Size özel çözüm</h3>
            <p>Hazır yazılımın işinize uymadığı yerde, sizin işleyişinize göre geliştirilen panel ve otomasyonlar.</p>
            <ul className="checks-s">
              <li>
                <Icon n="check" size={15} sw={2.5} />
                Ücretsiz keşif görüşmesi
              </li>
              <li>
                <Icon n="check" size={15} sw={2.5} />
                Yazılı kapsam ve fiyat
              </li>
              <li>
                <Icon n="check" size={15} sw={2.5} />
                Küçük bir pilotla başlar
              </li>
            </ul>
            <Link className="plink" href={`/urunler/${CUSTOM_SOLUTION.slug}`}>
              Özel çözümleri inceleyin
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactBand({ title, sub }: { title: string; sub: string }) {
  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="container-x">
        <div className="final">
          <div>
            <h2 className="h-1">{title}</h2>
            <p className="lead" style={{ marginTop: "16px" }}>
              {sub}
            </p>
          </div>
          <div className="box">
            <Link className="btn btn-primary btn-lg" href="/iletisim">
              Bilgi Alın
            </Link>
            {PHONE_DIGITS && (
              <a
                className="btn btn-line btn-lg"
                href={`https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent("Merhaba, Vitrinweb'in ürünleri hakkında bilgi almak istiyorum.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon n="whatsapp" size={18} />
                WhatsApp&apos;tan Yazın
              </a>
            )}
            <p className="fine">Ücretsiz ön görüşme, hiçbir taahhüt doğurmaz.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= ÜRÜNLER SAYFASI ================= */
export function ProductsPage() {
  return (
    <main id="main">
      <section className="sec" style={{ paddingBottom: "56px" }}>
        <div className="container-x">
          <h1 className="h-1" style={{ maxWidth: "20ch" }}>
            İşletmenizin dijital işlerini kolaylaştıran ürünler.
          </h1>
          <p className="lead" style={{ marginTop: "18px" }}>
            Her ürün belirli bir sorunu çözer ve işletmenize göre kurulur. Hangisinin size uygun olduğundan emin değilseniz
            kısa bir görüşmede birlikte bakalım.
          </p>
          <div className="pjump" aria-label="Ürünler">
            {ALL_PRODUCTS.map((p) => (
              <Link key={p.slug} href={`/urunler/${p.slug}`} className="chip-l">
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <ProductGrid />
          <p className="fine" style={{ marginTop: "18px" }}>
            Ekran görüntüleri temsilîdir; adlar ve rakamlar örnek veridir.
          </p>
        </div>
      </section>
      <ReadyOrCustom />
      <AgencyProcess />
      <ContactBand
        title="Hangi ürün size uygun, birlikte bakalım."
        sub="İşinizi kısaca anlatın; size gerçekten fayda sağlayacak olanı önerelim."
      />
    </main>
  );
}

/* ================= ÜRÜN SAYFASI ================= */
function ProductFaq({ p }: { p: Product }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq">
      {p.faqs.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q} className={"faq-i " + (on ? "open" : "")}>
            <button
              className="faq-q"
              aria-expanded={on}
              aria-controls={`pfa${i}`}
              id={`pfq${i}`}
              onClick={() => setOpen(on ? null : i)}
            >
              <span>{f.q}</span>
              <Icon n="chev" />
            </button>
            <div className="faq-a" id={`pfa${i}`} role="region" aria-labelledby={`pfq${i}`}>
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PrimaryActions({ p, size = "lg" }: { p: Product; size?: "lg" | "md" }) {
  const { startCheckout } = useApp();
  const cls = size === "lg" ? " btn-lg" : "";
  const wa = waHref(p);
  if (p.checkout) {
    return (
      <>
        <button className={"btn btn-primary" + cls} onClick={() => startCheckout()}>
          Web Sitesi Edinin
        </button>
        <Link className={"btn btn-line" + cls} href="/ucretlendirme">
          Fiyatları İnceleyin
        </Link>
      </>
    );
  }
  return (
    <>
      <Link className={"btn btn-primary" + cls} href={contactHref(p)}>
        Bilgi Alın
      </Link>
      {wa && (
        <a className={"btn btn-line" + cls} href={wa} target="_blank" rel="noopener noreferrer">
          <Icon n="whatsapp" size={18} />
          WhatsApp&apos;tan Yazın
        </a>
      )}
    </>
  );
}

function WebsiteOffer() {
  const { startCheckout } = useApp();
  return (
    <OfferPanel
      heading="Profesyonel Web Sitesi"
      cta={
        <>
          <button className="btn btn-primary btn-lg btn-block" style={{ maxWidth: "520px" }} onClick={() => startCheckout()}>
            Web Sitesi Edinin
          </button>
          <p className="flow">Bilgilerinizi girin, ödemenizi yapın, tasarım sürecini birlikte başlatalım.</p>
          <Link className="plink" href="/ucretlendirme">
            Ek özellik fiyatlarını görün
          </Link>
        </>
      }
    />
  );
}

export function ProductPage({ p }: { p: Product }) {
  const others = ALL_PRODUCTS.filter((o) => o.slug !== p.slug).slice(0, 3);
  return (
    <main id="main">
      <section className="phero">
        <div className="container-x phero-grid">
          <div className="phero-copy">
            <nav className="crumbs" aria-label="Konum">
              <Link href="/urunler">Ürünler</Link>
              <span aria-hidden="true">/</span>
              <span>{p.name}</span>
            </nav>
            <p className="pname">
              <Icon n={p.icon} size={20} sw={1.8} />
              {p.name}
            </p>
            <h1 className="h-1">{p.title}</h1>
            <p className="lead" style={{ marginTop: "20px" }}>
              {p.lead}
            </p>
            <div className="hero-cta">
              <PrimaryActions p={p} />
            </div>
          </div>
          <figure className="phero-shot">
            <ProductScreen kind={p.screen} interactive />
            <figcaption className="fine">
              {p.screen === "gorsel"
                ? "Kaydırarak karşılaştırın. Temsilî görseldir."
                : "Temsilî ekran; adlar ve rakamlar örnek veridir."}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="sec-s">
        <div className="container-x">
          <h2 className="h-3 pains-h">Tanıdık geliyor mu?</h2>
          <ul className="pains">
            {p.pains.map((t) => (
              <li key={t}>&ldquo;{t}&rdquo;</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec">
        <div className="container-x">
          <SectionHead title="Nasıl çalışır?" sub="Üç adımda kullanıma hazır." />
          <ol className="proc proc-3">
            {p.steps.map((s, i) => (
              <li key={s.t}>
                <div className="n">0{i + 1}</div>
                <h3 className="h-3">{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <SectionHead title="Neler var?" />
          <div className="why">
            {p.features.map((f) => (
              <div key={f.t} className="why-t why-s">
                <Icon n={f.icon} size={26} sw={1.5} />
                <h3 className="h-3">{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <div className="fitw">
            <div>
              <h2 className="h-3">Kimler için?</h2>
              <ul className="checks-s">
                {p.forWho.map((t) => (
                  <li key={t}>
                    <Icon n="check" size={15} sw={2.5} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="h-3">Kimler için değil?</h2>
              <ul className="checks-s no">
                {p.notFor.map((t) => (
                  <li key={t}>
                    <Icon n="x" size={15} sw={2.5} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {p.checkout ? (
        <>
          <section className="sec" style={{ paddingTop: 0 }}>
            <div className="container-x">
              <SectionHead
                title="Tek paket, net fiyat."
                sub="Ek özellikleri (blog, online randevu, çoklu dil) sipariş sırasında seçersiniz."
                right={
                  <Link className="btn btn-line" href="/neden">
                    Neden web sitesi?
                  </Link>
                }
              />
              <WebsiteOffer />
            </div>
          </section>
          <PaymentTrust />
        </>
      ) : (
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <div className="pprice">
            <div>
              <p className="fine">Fiyatlandırma</p>
              <p className="pprice-l">{p.pricing.label}</p>
              <p className="pprice-d">{p.pricing.d}</p>
            </div>
            <div className="hero-cta" style={{ marginTop: 0 }}>
              <PrimaryActions p={p} size="md" />
            </div>
          </div>
        </div>
      </section>
      )}

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <SectionHead title="Sık sorulan sorular" />
          <ProductFaq p={p} />
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <SectionHead
            title="Diğer ürünler"
            right={
              <Link className="btn btn-line" href="/urunler">
                Tüm ürünler
              </Link>
            }
          />
          <div className="pgrid">
            {others.map((o) => (
              <ProductCard key={o.slug} p={o} />
            ))}
          </div>
        </div>
      </section>

      {!p.checkout && (
        <ContactBand
          title={`${p.name} işletmenize uygun mu?`}
          sub="Kısa bir görüşmede işinizi dinleyelim; uygunsa kapsam ve fiyatı yazılı olarak iletelim."
        />
      )}
    </main>
  );
}
