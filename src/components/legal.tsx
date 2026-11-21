import Link from "next/link";
import { CookieTable } from "@/components/cookie-consent";
import { CancelForm, PreferenceForm } from "@/components/legal-forms";
import { Modal } from "@/components/modal";
import { LEGAL_UPDATED } from "@/data/company";
import { LEGAL_ALIASES, LEGAL_ARCHIVE, LEGAL_DOCS, LEGAL_LINKS } from "@/data/legal";
import { OrderBoxClient } from "@/components/order-box";
import type { LegalBlock } from "@/lib/types";

/* Sipariş ve içerik formundaki "mesafeli" bağlantısı, o siparişlerin kurulduğu (arşivdeki) sözleşmeyi açar. */
const MODAL_ALIASES: Record<string, string> = { ...LEGAL_ALIASES, mesafeli: "mesafeli-satis-sozlesmesi" };

export const resolveLegal = (id: string): string => (LEGAL_DOCS[id] ? id : LEGAL_ALIASES[id] || id);

export function LegalBody({ id }: { id: string }) {
  const D = LEGAL_DOCS[id];
  if (!D) return null;
  return (
    <div className="legal">
      <p className="lg-meta">Son güncelleme: {D.u || LEGAL_UPDATED}</p>
      {D.archive && <p className="lg-archive">{D.archive}</p>}
      {D.b().map((x: LegalBlock, i: number) => {
        if (x[0] === "h") return <h2 key={i}>{x[1]}</h2>;
        if (x[0] === "ul")
          return (
            <ul key={i}>
              {x[1].map((t, j) => (
                <li key={j}>{t}</li>
              ))}
            </ul>
          );
        if (x[0] === "order") return <OrderBoxClient key={i} />;
        if (x[0] === "a")
          return (
            <p key={i}>
              <a className="btn btn-line" href={x[2]}>
                {x[1]}
              </a>
            </p>
          );
        if (x[0] === "widget") {
          if (x[1] === "cerez") return <CookieTable key={i} />;
          if (x[1] === "iptal") return <CancelForm key={i} />;
          return <PreferenceForm key={i} />;
        }
        return <p key={i}>{x[1]}</p>;
      })}
    </div>
  );
}

export function LegalModal({ kind, onClose }: { kind: string; onClose: () => void }) {
  const id = LEGAL_DOCS[MODAL_ALIASES[kind]] ? MODAL_ALIASES[kind] : LEGAL_DOCS[kind] ? kind : "kullanim-kosullari";
  const D = LEGAL_DOCS[id];
  return (
    <Modal title={D.t} onClose={onClose} wide>
      <LegalBody id={id} />
      <button className="btn btn-primary" style={{ marginTop: "20px" }} onClick={onClose}>
        Kapat
      </button>
    </Modal>
  );
}

export function LegalPage({ id }: { id: string }) {
  const D = LEGAL_DOCS[id];
  if (!D) return null;
  return (
    <main id="main" className="container-x doc-wrap">
      <nav className="crumbs" aria-label="Konum">
        <Link href="/">Ana Sayfa</Link>
        <span aria-hidden="true">/</span>
        <span>Yasal</span>
      </nav>
      <h1 className="h-2">{D.t}</h1>
      {D.lead && <p className="lead lg-lead">{D.lead}</p>}
      <LegalBody id={id} />
      <nav className="lg-others" aria-label="Diğer yasal metinler">
        <h2 className="h-3">Diğer metinler</h2>
        <ul>
          {LEGAL_LINKS.filter((l) => l[0] !== id).map((l) => (
            <li key={l[0]}>
              <Link href={`/yasal/${l[0]}`}>{l[1]}</Link>
            </li>
          ))}
        </ul>
        <h2 className="h-3" style={{ marginTop: 28 }}>
          Önceki sürümler
        </h2>
        <ul>
          {LEGAL_ARCHIVE.filter((l) => l[0] !== id).map((l) => (
            <li key={l[0]}>
              <Link href={`/yasal/${l[0]}`}>{l[1]}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}

export function NotFound() {
  return (
    <main id="main" className="container-x doc-wrap nf">
      <p className="eyebrow">404</p>
      <h1 className="h-2">Aradığınız sayfaya ulaşılamıyor.</h1>
      <p className="lead" style={{ margin: "14px 0 26px" }}>
        Bağlantı değişmiş veya kaldırılmış olabilir. Ana sayfaya dönebilir ya da işletmenize uygun çözümleri inceleyebilirsiniz.
      </p>
      <div className="hero-cta" style={{ marginTop: 0 }}>
        <Link className="btn btn-primary" href="/">
          Ana Sayfaya Dönün
        </Link>
        <Link className="btn btn-line" href="/urunler">
          Ürünleri İnceleyin
        </Link>
      </div>
    </main>
  );
}
