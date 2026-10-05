import Image from "next/image";
import { Logo } from "@/components/header";
import { Icon } from "@/components/icons";
import { LegalCompanyInfo } from "@/components/legal-company-info";
import { SectionHead } from "@/components/section-head";
import { COMPANY } from "@/data/company";
import { PROCESS } from "@/data/content";
import { BASE_PRICE, TL } from "@/lib/config";
import { BASE_PATH } from "@/lib/site";

const WHY_VITRIN: { icon: "card" | "shield" | "trend" | "check"; title: string; body: string }[] = [
  {
    icon: "card",
    title: "Net ve sabit fiyat",
    body: `Temel paket ${TL(BASE_PRICE)}, ek özellikler ayrı ve açık fiyatlarla listelenir. Sürpriz ücret yok.`,
  },
  {
    icon: "shield",
    title: "Taahhüt yok",
    body: "İlk yılın sonunda memnun kalmazsanız hiçbir ücret ödemeden ayrılabilirsiniz.",
  },
  {
    icon: "trend",
    title: "Temel SEO dahil",
    body: "Her sitede sayfa başlıkları, açıklamalar ve site haritası gibi temel SEO altyapısı standart olarak kurulur.",
  },
  {
    icon: "check",
    title: "Şeffaf süreç",
    body: "Sipariş numaranız, proje durumunuz ve sıradaki adım her zaman bellidir.",
  },
];

const BRAND_COLORS: { varName: string; hex: string; label: string }[] = [
  { varName: "--logo", hex: "#1F2F6B", label: "Logo rengi" },
  { varName: "--ink", hex: "#111114", label: "Ana metin" },
  { varName: "--ink-2", hex: "#46464D", label: "Gövde metni" },
  { varName: "--line", hex: "#E4E4E9", label: "Çizgi" },
];

const VALUES: { icon: "layout" | "check" | "shield" | "globe"; title: string; body: string }[] = [
  { icon: "layout", title: "Sadelik", body: "Karmaşık değil, anlaşılır. Hem sitelerimizde hem süreçlerimizde." },
  { icon: "check", title: "Şeffaflık", body: "Fiyat, süreç ve sözleşme koşulları baştan nettir." },
  { icon: "shield", title: "Güven", body: "Taahhüt yok, gizli ücret yok. Karar her zaman sizde kalır." },
  { icon: "globe", title: "Erişilebilirlik", body: "Profesyonel bir web sitesi yalnızca büyük işletmelerin ayrıcalığı olmamalı." },
];

export function AboutPage() {
  return (
    <main id="main">
      <section className="sec about-hero">
        <div className="container-x">
          <Logo />
          <h1 className="h-1" style={{ marginTop: "22px" }}>
            Vitrin, işletmelerin dijital dünyadaki ilk adımı için var.
          </h1>
          <p className="lead" style={{ marginTop: "16px" }}>
            Karmaşık olmayan, dürüst fiyatlandıran ve gerçekten kullanılan web siteleri tasarlıyoruz.
          </p>
        </div>
      </section>

      <section className="sec-s">
        <div className="container-x">
          <SectionHead title="Vitrin nedir?" />
          <p className="lead" style={{ maxWidth: "68ch" }}>
            Vitrin, işletmelerin profesyonel bir web sitesine sade, anlaşılır ve şeffaf bir süreçle sahip olmasını
            sağlayan bir web tasarım hizmetidir.
          </p>
        </div>
      </section>

      <section className="sec-s">
        <div className="container-x">
          <SectionHead title="Marka Kimliğimiz" sub="Her yerde aynı dil: sade, modern, güvenilir." />
          <div className="about-brand">
            <Image className="about-brand-logo" src={`${BASE_PATH}/vitrin-wordmark.png`} alt="Vitrin" width={1225} height={357} />
            <div className="about-brand-palette">
              {BRAND_COLORS.map((c) => (
                <div className="about-brand-swatch" key={c.hex}>
                  <span style={{ background: `var(${c.varName})` }} aria-hidden="true"></span>
                  <b>{c.hex}</b>
                  <small>{c.label}</small>
                </div>
              ))}
            </div>
            <p className="about-brand-type">
              <strong>Manrope</strong> — Sade. Modern. Güvenilir.
            </p>
          </div>
        </div>
      </section>

      <section className="sec-s">
        <div className="container-x">
          <SectionHead title="Neden Vitrin?" />
          <div className="gp-cards">
            {WHY_VITRIN.map((w) => (
              <div className="gp-card" key={w.title}>
                <Icon n={w.icon} size={28} sw={1.4} />
                <h3 className="h-3">{w.title}</h3>
                <p className="isg-card-p">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-s">
        <div className="container-x">
          <div className="about-mv">
            <div>
              <h2 className="h-3">Misyon</h2>
              <p>
                Küçük ve orta ölçekli işletmelerin, karmaşık ve pahalı süreçlere girmeden profesyonel bir dijital
                varlığa sahip olmasını sağlamak.
              </p>
            </div>
            <div>
              <h2 className="h-3">Vizyon</h2>
              <p>
                Türkiye&apos;deki her işletmenin, büyüklüğü fark etmeksizin, kendine ait güvenilir bir web adresine
                sahip olduğu bir gelecek.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-s">
        <div className="container-x">
          <SectionHead title="Değerlerimiz" />
          <div className="gp-cards">
            {VALUES.map((v) => (
              <div className="gp-card" key={v.title}>
                <Icon n={v.icon} size={28} sw={1.4} />
                <h3 className="h-3">{v.title}</h3>
                <p className="isg-card-p">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-s">
        <div className="container-x">
          <SectionHead title="Yaklaşımımız" sub="Dört adım. Her adımda ne olacağını önceden bilirsiniz." />
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

      <section className="sec-s">
        <div className="container-x">
          <div className="about-sig">
            <Image className="about-sig-logo" src={`${BASE_PATH}/vitrin-wordmark.png`} alt="Vitrin" width={1225} height={357} />
            <p>İşletmenizin dijital vitrini.</p>
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </div>
        </div>
      </section>

      <section className="sec-s" style={{ paddingTop: "0" }}>
        <div className="container-x">
          <div className="about-owner">
            <p>
              Vitrin, {COMPANY.title} tarafından işletmelerin dijital dünyadaki ihtiyaçlarına yönelik sunulan bir
              hizmettir.
            </p>
          </div>
          <LegalCompanyInfo />
        </div>
      </section>
    </main>
  );
}
