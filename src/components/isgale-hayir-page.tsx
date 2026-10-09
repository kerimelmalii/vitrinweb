import Link from "next/link";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";

const PALESTINE_SOURCES: [string, string][] = [
  ["UAD danışma görüşü", "#"],
  ["BM İnsani İşler Koordinasyon Ofisi (OCHA) raporları", "#"],
];

const EAST_TURKISTAN_SOURCES: [string, string][] = [
  ["BM İnsan Hakları Yüksek Komiserliği 2022 raporu", "#"],
  ["Uluslararası Af Örgütü raporları", "#"],
];

const ACTION_CARDS: { icon: "search" | "shield" | "pin"; title: string; body: string }[] = [
  {
    icon: "search",
    title: "Bilgilen",
    body: "Yaşananlara karşı en önemli adımlardan biri yaşanan zulme ve sürece hakim olmak. Güvendiğiniz kaynaklardan süreci öğrenin.",
  },
  {
    icon: "shield",
    title: "Güvendiğiniz Kuruluşlar Vasıtası ile Destek olun",
    body: "Filistin ve Doğu Türkistan için çalışan, güvendiğiniz insani yardım kuruluşları aracılığıyla destek olun. Önemli olan yardımın ihtiyaç sahibine ulaşmasıdır.",
  },
  {
    icon: "pin",
    title: "Gündemde Tut",
    body: "Bu yaşananları gündeminizde tutun, insanlığın unutulmasına izin vermeyin.",
  },
];

function SourceList({ items }: { items: [string, string][] }) {
  return (
    <>
      <span className="isg-src-label">Kaynaklar</span>
      <ul className="isg-src">
        {items.map(([label, href]) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noopener noreferrer">
              <Icon n="arrow" size={13} sw={2.2} />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export function IsgaleHayirPage() {
  return (
    <main id="main">
      <section className="sec isg-hero">
        <svg className="isg-hero-bg" viewBox="0 0 1200 500" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <circle cx="220" cy="120" r="180" fill="none" stroke="#fff" strokeWidth="1" />
          <circle cx="260" cy="160" r="260" fill="none" stroke="#fff" strokeWidth="1" />
          <path d="M20 320 C 260 260, 420 380, 640 300" fill="none" stroke="#fff" strokeWidth="1" />
          <circle cx="980" cy="360" r="160" fill="none" stroke="#fff" strokeWidth="1" />
          <circle cx="940" cy="320" r="230" fill="none" stroke="#fff" strokeWidth="1" />
          <path d="M760 60 C 900 110, 1020 40, 1180 100" fill="none" stroke="#fff" strokeWidth="1" />
        </svg>
        <div className="container-x">
          <h1 className="h-1">İşgale Hayır!</h1>
          <p className="lead isg-hero-lead">
            Vitrinweb olarak her gün markaların sesini duyurmak için çalışıyoruz. Sesi bastırılan halklar için de
            susmayacağız.
          </p>
        </div>
      </section>

      <Reveal className="sec-s">
        <div className="container-x">
          <div className="isg-dual">
            <div className="isg-block">
              <h2 className="h-3">Filistin</h2>
              <p>
                1967&apos;den bu yana Batı Şeria, Doğu Kudüs ve Gazze İsrail işgali altında. Uluslararası Adalet
                Divanı 2024&apos;te verdiği danışma görüşünde bu işgalin uluslararası hukuka aykırı olduğunu ve sona
                ermesi gerektiğini belirtti. Gazze&apos;de on binlerce sivil hayatını kaybetti, milyonlarca insan
                ağır bir insani kriz içinde yaşıyor. Filistin halkının özgürlük ve onurlu yaşam hakkının yanındayız.
              </p>
              <SourceList items={PALESTINE_SOURCES} />
            </div>
            <div className="isg-block">
              <h2 className="h-3">Doğu Türkistan</h2>
              <p>
                Doğu Türkistan&apos;da Uygur Türkleri ve diğer Müslüman topluluklar; toplu gözaltı kampları, dini ve
                kültürel baskı, zorla çalıştırma ve ailelerin parçalanmasıyla karşı karşıya. BM İnsan Hakları Yüksek
                Komiserliği 2022 raporunda bölgedeki uygulamaların ciddi insan hakları ihlalleri içerdiğini ve
                insanlığa karşı suç teşkil edebileceğini açıkladı. Doğu Türkistan halkının kimliğini, inancını ve
                dilini özgürce yaşama hakkının yanındayız.
              </p>
              <SourceList items={EAST_TURKISTAN_SOURCES} />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="sec-s">
        <div className="container-x">
          <div className="panel isg-do">
            <p className="lead" style={{ maxWidth: "68ch" }}>
              Sözden fazlası: Filistin ve Doğu Türkistan için insani yardım yapan dernek ve kuruluşlara web sitesi,
              bakım ve dijital destek hizmetlerimizi ücretsiz sunuyoruz.
            </p>
            <Link href="/iletisim" className="btn btn-primary btn-lg">
              Derneğiniz için destek alın
            </Link>
          </div>
        </div>
      </Reveal>

      <Reveal className="sec-s">
        <div className="container-x">
          <SectionHead title="Siz ne yapabilirsiniz?" />
          <div className="gp-cards">
            {ACTION_CARDS.map((c) => (
              <div className="gp-card" key={c.title}>
                <Icon n={c.icon} size={28} sw={1.4} />
                <h3 className="h-3">{c.title}</h3>
                <p className="isg-card-p">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="sec-s" style={{ paddingTop: "0" }}>
        <div className="container-x">
          <p className="isg-closing">Zulüm karşısında tarafsız kalınmaz.</p>
        </div>
      </Reveal>
    </main>
  );
}
