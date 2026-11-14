import Link from "next/link";
import { Icon } from "@/components/icons";
import { LegalCompanyInfo } from "@/components/legal-company-info";
import { SectionHead } from "@/components/section-head";
import { COMPANY } from "@/data/company";
import { AGENCY_PROCESS } from "@/data/content";

function Wordmark({ className }: { className: string }) {
  return (
    <div className={"wordmark " + className}>
      vitrin<span className="logo-web">web</span>
      <i></i>
    </div>
  );
}

const WHY_VITRIN: { icon: "card" | "shield" | "trend" | "check"; title: string; body: string }[] = [
  {
    icon: "card",
    title: "Net kapsam ve fiyat",
    body: "Neyin yapılacağı, ne kadar süreceği ve kaça mal olacağı işe başlamadan yazılı olarak bellidir. Sürpriz ücret yok.",
  },
  {
    icon: "shield",
    title: "Taahhüt yok",
    body: "Aylık hizmetlerimizi istediğiniz zaman bırakabilirsiniz; verileriniz size teslim edilir.",
  },
  {
    icon: "trend",
    title: "Önce sorun, sonra araç",
    body: "Teknolojiyi değil, işinizdeki sorunu konuşuruz. İşinize yaramayacak bir şeyi önermeyiz.",
  },
  {
    icon: "check",
    title: "Şeffaf süreç",
    body: "Her adımda ne yapıldığı ve sıradaki adımın ne olduğu her zaman bellidir.",
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
  { icon: "globe", title: "Erişilebilirlik", body: "İyi dijital araçlar yalnızca büyük işletmelerin ayrıcalığı olmamalı." },
];

export function AboutPage() {
  return (
    <main id="main">
      <section className="sec about-hero">
        <div className="container-x">
          <h1 className="h-1">
            Vitrinweb, işletmelerin dijital dünyadaki ilk adımı için var.
          </h1>
          <p className="lead" style={{ marginTop: "16px" }}>
            Karmaşık olmayan, dürüst fiyatlandıran ve gerçekten kullanılan dijital araçlar kuruyoruz.
          </p>
        </div>
      </section>

      <section className="sec-s">
        <div className="container-x">
          <SectionHead title="Vitrinweb nedir?" />
          <p className="lead" style={{ maxWidth: "68ch" }}>
            Vitrinweb, işletmelere dijital çözümler sunan bir ajanstır. Reklam takibi, stok takibi, ürün görselleri, müşteri
            bulma ve web sitesi gibi işleri; işletmenin ihtiyacına uygun, sade ve anlaşılır araçlarla çözer. Hazır
            ürünlerimizin karşılamadığı işler için işletmeye özel çözümler geliştirir.
          </p>
        </div>
      </section>

      <section className="sec-s">
        <div className="container-x">
          <SectionHead title="Marka Kimliğimiz" sub="Her yerde aynı dil: sade, modern, güvenilir." />
          <div className="about-brand">
            <Wordmark className="about-brand-logo" />
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
          <SectionHead title="Neden Vitrinweb?" />
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
                Türkiye&apos;deki her işletmenin, büyüklüğü fark etmeksizin, işini kolaylaştıran ve kendisine ait dijital
                araçlara sahip olduğu bir gelecek.
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

      <section className="sec-s" id="icerik-ekibi">
        <div className="container-x">
          <SectionHead title="İçerik ekibimiz" />
          <p className="lead about-content-team">
            Blog yazılarımız Vitrinweb İçerik Ekibi imzasıyla yayınlanır. Yazılarda web siteleri, Google görünürlüğü ve dijital müşteri
            kazanımı üzerine kendi çalışmalarımızdan edindiğimiz deneyimi güvenilir kaynaklarla birleştiriyoruz; yayından önce her
            bilgiyi kontrol ediyoruz. <Link href="/icerik-politikasi">İçeriklerimizi nasıl hazırladığımızı okuyun</Link>.
          </p>
        </div>
      </section>

      <section className="sec-s">
        <div className="container-x">
          <div className="about-sig">
            <Wordmark className="about-sig-logo" />
            <p>İşletmenizin dijital vitrini.</p>
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </div>
        </div>
      </section>

      <section className="sec-s" style={{ paddingTop: "0" }}>
        <div className="container-x">
          <div className="about-owner">
            <p>
              {COMPANY.brand}, {COMPANY.title} tarafından işletmelerin dijital dünyadaki ihtiyaçlarına yönelik sunulan bir
              hizmettir.
            </p>
          </div>
          <LegalCompanyInfo />
        </div>
      </section>
    </main>
  );
}
