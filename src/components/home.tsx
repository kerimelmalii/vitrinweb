"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { BrowserFrame, MockPhone, MockSite } from "@/components/mock-site";
import { OfferPanel } from "@/components/offer-panel";
import { SectionHead } from "@/components/section-head";
import { FAQS, HERO_DEMOS, PROCESS, REFERENCES, TRUST, WHY } from "@/data/content";
import { BASE_PRICE, TL, VAT_NOTE, YEARLY, money } from "@/lib/config";
import { useApp } from "@/lib/order-context";
import type { Reference } from "@/lib/types";

/* ================= ANA SAYFA ================= */
export function PackageSection() {
  const { startCheckout } = useApp();
  return (
    <section id="paket" className="sec">
      <div className="container-x">
        <SectionHead
          title="Tek paket, net fiyat."
          sub="İşletmenizi internette tanıtmak için gereken her şey pakete dahil. Ek özellikleri sipariş sırasında seçersiniz."
        />
        <OfferPanel
          heading="Profesyonel Web Sitesi"
          cta={
            <>
              <button
                className="btn btn-primary btn-lg btn-block"
                style={{ maxWidth: "520px" }}
                onClick={() => startCheckout()}
              >
                Web Sitesi Edinin
              </button>
              <p className="flow">Bilgilerinizi girin, ödemenizi yapın, tasarım sürecini birlikte başlatalım.</p>
              <div className="trustrow">
                {TRUST.map((t) => (
                  <span key={t}>
                    <Icon n="check" size={14} sw={2.5} />
                    {t}
                  </span>
                ))}
              </div>
              <Link className="plink" href="/ucretlendirme">
                Ek özellik fiyatlarını görün
              </Link>
            </>
          }
        />
      </div>
    </section>
  );
}

/* Mobilde ilk ekran geçildiğinde görünen, alt bilgiye gelince gizlenen başlatma çubuğu. */
export function StickyCTA() {
  const { startCheckout } = useApp();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => {
      const ft = document.querySelector(".ftr");
      const nearEnd = ft && ft.getBoundingClientRect().top < window.innerHeight;
      setShow(window.scrollY > window.innerHeight * 0.9 && !nearEnd);
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    window.addEventListener("resize", f);
    return () => {
      window.removeEventListener("scroll", f);
      window.removeEventListener("resize", f);
    };
  }, []);
  return (
    <div className={"sticky-cta " + (show ? "on" : "")} aria-hidden={!show}>
      <div>
        <b>{TL(BASE_PRICE)}</b>
        <small>İlk yıl servis ücretsiz</small>
      </div>
      <button className="btn btn-primary" tabIndex={show ? 0 : -1} onClick={() => startCheckout()}>
        Web Sitesi Edinin
      </button>
    </div>
  );
}

export function Hero() {
  const { startCheckout, goSection } = useApp();
  const d0 = HERO_DEMOS[0];
  const d1 = HERO_DEMOS[1];
  return (
    <section id="top" className="hero">
      <div className="container-x hero-grid">
        <div className="hero-copy">
          <h1 className="h-display rise">
            <span className="soft">İşletmenizin dijital vitrini.</span>
            <br />
            {money(BASE_PRICE)} TL&apos;ye profesyonel web sitesi.
          </h1>
          <p className="lead rise" style={{ animationDelay: "90ms" }}>
            Modern, hızlı ve mobil uyumlu web sitenizi sizin için hazırlıyoruz. İlk yıl servis ve bakım ücreti yok.
          </p>
          <div className="hero-cta rise" style={{ animationDelay: "170ms" }}>
            <button className="btn btn-primary btn-lg" onClick={() => startCheckout()}>
              Web Sitesi Edinin
            </button>
            <button className="btn btn-line btn-lg" onClick={() => goSection("paket")}>
              Paket Detaylarını İnceleyin
            </button>
          </div>
          <ul className="trust rise" style={{ animationDelay: "240ms" }}>
            {TRUST.map((t) => (
              <li key={t}>
                <Icon n="check" size={16} sw={2.5} />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="hero-visual rise" style={{ animationDelay: "200ms" }} aria-hidden="true">
          <div className="hv-price">
            <small>Profesyonel web sitesi</small>
            <b>{TL(BASE_PRICE)}</b>
            <small className="vat">{VAT_NOTE}</small>
            <span>
              <i></i>İlk yıl servis ve bakım: 0 TL
            </span>
          </div>
          <BrowserFrame url={d0.url}>
            <MockSite d={d0} />
          </BrowserFrame>
          <div className="hv-phone">
            <MockPhone d={d1} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyWebsite() {
  return (
    <section id="neden" className="sec">
      <div className="container-x">
        <SectionHead
          title="Web sitesi, işletmenizin 7/24 açık vitrinidir."
          sub="Müşteri sizi bulmadan önce aramaya başlar. Karşısına çıkan şey, işletmeniz hakkındaki ilk izlenimdir."
          right={
            <Link className="btn btn-line" href="/neden">
              Araştırmaları İnceleyin
            </Link>
          }
        />
        <div className="why">
          {WHY.map((w, i) => (
            <div key={w.t} className={"why-t " + (i === 0 ? "tint" : "")}>
              <Icon n={w.icon} size={30} sw={1.4} />
              <h3 className="h-3">{w.t}</h3>
              <p>{w.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="surec" className="sec" style={{ paddingTop: "0" }}>
      <div className="container-x">
        <SectionHead title="Süreç nasıl işliyor?" sub="Dört adım. Her adımda ne olacağını önceden bilirsiniz." />
        <ol className="proc">
          {PROCESS.map((s) => (
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

export function AnnualService() {
  return (
    <section id="servis" className="sec" style={{ paddingTop: "0" }}>
      <div className="container-x">
        <SectionHead title="Yıllık servis ve bakım" sub="İlk yıl ücretsiz. Sonrasında öngörülebilir." />
        <div className="yr">
          <div className="free">
            <h3 className="h-3">1. yıl</h3>
            <div className="big">0 TL</div>
            <p style={{ margin: 0 }}>Servis ve bakım dahil.</p>
          </div>
          <div>
            <h3 className="h-3">2. yıl ve sonrası</h3>
            <div className="big">
              {money(YEARLY)} TL<small> / yıl</small>
            </div>
            <p style={{ margin: 0 }} className="mute">
              2. yıl ücreti {TL(YEARLY)}. Sonraki yıllarda ücret, TÜİK&apos;in açıkladığı yıllık enflasyon (TÜFE)
              oranında güncellenir ve yenilemeden önce size bildirilir.
            </p>
          </div>
        </div>
        <div className="cancel">
          <Icon n="shield" size={22} />
          <div>
            <b>Taahhüt yok, iptal ücretsiz.</b>
            <p>
              İlk yılın sonunda memnun kalmazsanız servisi yenilemezsiniz; iptal için hiçbir ücret ödemezsiniz.
              Sonraki yıllarda da her yenilemeden önce aynı hakkınız var.
            </p>
          </div>
        </div>
        <div className="yr-note">
          <span>
            <Icon n="check" size={16} sw={2.5} />
            Teknik bakım
          </span>
          <span>
            <Icon n="check" size={16} sw={2.5} />
            Güvenlik güncellemeleri
          </span>
          <span>
            <Icon n="check" size={16} sw={2.5} />
            Destek
          </span>
        </div>
      </div>
    </section>
  );
}

function References({ items }: { items: Reference[] }) {
  if (!items || !items.length) return null;
  return (
    <div style={{ marginTop: "40px" }}>
      {items.map((r) => (
        <blockquote key={r.name} style={{ margin: "0 0 18px", borderLeft: "2px solid var(--ink)", paddingLeft: "16px" }}>
          <p style={{ margin: 0 }}>{r.text}</p>
          <footer className="fine">
            {r.name}, {r.business}
          </footer>
        </blockquote>
      ))}
    </div>
  );
}

export function About() {
  const P: [string, string][] = [
    ["Net fiyat", `Temel paket ${TL(BASE_PRICE)}. Ek özellikler ayrı ve açık fiyatlarla listelenir.`],
    ["Sade tasarım", "Sektörünüze uygun, hızlı açılan ve kolay anlaşılan siteler tasarlarız."],
    ["Açık süreç", "Sipariş numaranız, proje durumunuz ve sıradaki adım her zaman belli."],
  ];
  return (
    <section id="hakkimizda" className="sec" style={{ paddingTop: "0" }}>
      <div className="container-x about">
        <div>
          <h2 className="h-2">Gösterişsiz, net ve şeffaf.</h2>
          <p className="lead" style={{ marginTop: "16px" }}>
            Bir web sitesi pahalı ya da belirsiz olmak zorunda değil. Neyin dahil olduğunu, ne kadar ödeyeceğinizi ve
            sürecin nasıl ilerleyeceğini baştan söylüyoruz.
          </p>
          <References items={REFERENCES} />
        </div>
        <div>
          {P.map((p) => (
            <div className="pr" key={p[0]}>
              <h3 className="h-3">{p[0]}</h3>
              <p>{p[1]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="sss" className="sec" style={{ paddingTop: "0" }}>
      <div className="container-x">
        <SectionHead title="Sık sorulan sorular" />
        <div className="faq">
          {FAQS.map((f, i) => (
            <div key={f.q} className={"faq-i " + (open === i ? "open" : "")}>
              <button
                className="faq-q"
                aria-expanded={open === i}
                aria-controls={"fa" + i}
                id={"fq" + i}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <span>{f.q}</span>
                <Icon n="chev" />
              </button>
              <div className="faq-a" id={"fa" + i} role="region" aria-labelledby={"fq" + i}>
                <div>
                  <p>{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const { startCheckout } = useApp();
  return (
    <section className="sec" style={{ paddingTop: "0" }}>
      <div className="container-x">
        <div className="final">
          <div>
            <h2 className="h-1">İşletmenizin web sitesini bugün başlatalım.</h2>
          </div>
          <div className="box">
            <div className="fprice">
              <small>İlk yıl servis ücreti yok, taahhüt yok</small>
              <b>
                {money(BASE_PRICE)}
                <span>TL</span>
              </b>
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => startCheckout()}>
              Web Sitesi Edinin
            </button>
            <p className="fine">Dakikalar içinde siparişinizi oluşturun.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <main id="main">
      <Hero />
      <WhyWebsite />
      <PackageSection />
      <Process />
      <AnnualService />
      <About />
      <FAQ />
      <FinalCTA />
      <StickyCTA />
    </main>
  );
}
