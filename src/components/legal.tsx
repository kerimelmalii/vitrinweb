import Link from "next/link";
import { Modal } from "@/components/modal";
import { LEGAL_UPDATED } from "@/data/company";
import { LEGAL_DOCS, LEGAL_LINKS } from "@/data/legal";
import { OrderBoxClient } from "@/components/order-box";
import type { LegalBlock } from "@/lib/types";

export function LegalBody({ id }: { id: string }) {
  const D = LEGAL_DOCS[id];
  if (!D) return null;
  return (
    <div className="legal">
      <p className="lg-meta">Son güncelleme: {LEGAL_UPDATED}</p>
      <p className="lg-draft">
        Taslak metindir. Yayından önce bir hukukçu tarafından gözden geçirilmeli ve köşeli parantez içindeki alanlar
        doldurulmalıdır.
      </p>
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
        return <p key={i}>{x[1]}</p>;
      })}
    </div>
  );
}

export function LegalModal({ kind, onClose }: { kind: string; onClose: () => void }) {
  const D = LEGAL_DOCS[kind] || LEGAL_DOCS.kosullar;
  return (
    <Modal title={D.t} onClose={onClose} wide>
      <LegalBody id={LEGAL_DOCS[kind] ? kind : "kosullar"} />
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
        <Link className="linkb" href="/">
          Ana Sayfa
        </Link>
        <span aria-hidden="true">/</span>
        <span>Yasal</span>
      </nav>
      <h1 className="h-2">{D.t}</h1>
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
      </nav>
    </main>
  );
}

export function NotFound() {
  return (
    <main id="main" className="container-x doc-wrap">
      <h1 className="h-2">Aradığınız sayfa bulunamadı.</h1>
      <p className="lead" style={{ margin: "14px 0 26px" }}>
        Bağlantı değişmiş veya kaldırılmış olabilir.
      </p>
      <Link className="btn btn-primary" href="/">
        Ana Sayfaya Dönün
      </Link>
    </main>
  );
}
