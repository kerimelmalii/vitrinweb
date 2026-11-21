import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { PHONE_DIGITS } from "@/data/company";

/* Sayfalar arasında ortak, sunucuda çizilebilen küçük yapı taşları. */

export const waLink = (text: string): string =>
  PHONE_DIGITS ? `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(text)}` : "";

export const DEFAULT_WA_TEXT = "Merhaba, Vitrinweb’in çözümleri hakkında bilgi almak istiyorum.";

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Konum">
      <Link href="/">Ana Sayfa</Link>
      {items.map((it) => (
        <span key={it.label} className="crumbs-i">
          <span aria-hidden="true">/</span>
          {it.href ? <Link href={it.href}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function WhatsAppButton({ text = DEFAULT_WA_TEXT, label = "WhatsApp’tan Yazın", cls = "btn btn-line btn-lg" }: { text?: string; label?: string; cls?: string }) {
  const href = waLink(text);
  if (!href) return null;
  return (
    <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
      <Icon n="whatsapp" size={18} />
      {label}
    </a>
  );
}

export function SecHead({ title, sub, right, id, as = "h2" }: { title: ReactNode; sub?: ReactNode; right?: ReactNode; id?: string; as?: "h2" | "h3" }) {
  const H = as;
  return (
    <div className="sec-head">
      <div>
        <H className="h-2" id={id}>
          {title}
        </H>
        {sub && <p className="lead">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function Steps({ steps, cols = 3 }: { steps: { t: string; d: string }[]; cols?: 3 | 4 }) {
  return (
    <ol className={`steps steps-${cols}`}>
      {steps.map((s, i) => (
        <li key={s.t}>
          <span className="steps-n" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="h-3">{s.t}</h3>
          <p>{s.d}</p>
        </li>
      ))}
    </ol>
  );
}

export function FaqList({ items, idPrefix = "s" }: { items: { q: string; a: string }[]; idPrefix?: string }) {
  return (
    <div className="qa">
      {items.map((f, i) => (
        <details key={f.q} className="qa-i" id={`${idPrefix}-${i + 1}`} open={i === 0}>
          <summary>
            <span>{f.q}</span>
            <Icon n="chev" />
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

/** Sayfa sonu kapanış bandı. */
export function Closing({
  title,
  text,
  primary,
  secondary,
  whatsapp,
  note,
}: {
  title: string;
  text?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  whatsapp?: string;
  note?: string;
}) {
  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="container-x">
        <div className="closing">
          <div>
            <h2 className="h-1">{title}</h2>
            {text && <p className="lead">{text}</p>}
          </div>
          <div className="closing-act">
            <Link className="btn btn-primary btn-lg" href={primary.href}>
              {primary.label}
            </Link>
            {secondary && (
              <Link className="btn btn-line btn-lg" href={secondary.href}>
                {secondary.label}
              </Link>
            )}
            {whatsapp && <WhatsAppButton text={whatsapp} />}
            {note && <p className="fine">{note}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Checklist({ items, cls = "" }: { items: string[]; cls?: string }) {
  return (
    <ul className={`chk ${cls}`}>
      {items.map((t) => (
        <li key={t}>
          <Icon n="check" size={16} sw={2.4} />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function breadcrumbLd(siteUrl: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Ana Sayfa", path: "" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.path}`,
    })),
  };
}
