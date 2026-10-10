import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Block, CalloutKind, Inline } from "@/lib/markdown";

const CALLOUT_LABEL: Record<CalloutKind, string> = {
  vitrin: "Vitrinweb Deneyimi",
  ozet: "Kısaca",
  not: "Not",
};

export function InlineMd({ c }: { c: Inline[] }): ReactNode {
  return c.map((x, i) => {
    if (x.t === "text") return x.v;
    if (x.t === "strong")
      return (
        <strong key={i}>
          <InlineMd c={x.c} />
        </strong>
      );
    if (x.href.startsWith("/") || x.href.startsWith("#"))
      return (
        <Link key={i} href={x.href}>
          <InlineMd c={x.c} />
        </Link>
      );
    return (
      <a key={i} href={x.href} target="_blank" rel="noopener">
        <InlineMd c={x.c} />
      </a>
    );
  });
}

export function Md({ blocks, cta }: { blocks: Block[]; cta?: ReactNode }): ReactNode {
  return blocks.map((b, i) => {
    switch (b.t) {
      case "h2":
        return (
          <h2 key={i} id={b.id}>
            <InlineMd c={b.c} />
          </h2>
        );
      case "h3":
        return (
          <h3 key={i} id={b.id}>
            <InlineMd c={b.c} />
          </h3>
        );
      case "p":
        return (
          <p key={i}>
            <InlineMd c={b.c} />
          </p>
        );
      case "ul":
      case "ol": {
        const Tag = b.t;
        return (
          <Tag key={i}>
            {b.items.map((it, j) => (
              <li key={j}>
                <InlineMd c={it} />
              </li>
            ))}
          </Tag>
        );
      }
      case "table":
        return (
          <div key={i} className="md-table" role="region" aria-label="Tablo" tabIndex={0}>
            <table>
              <thead>
                <tr>
                  {b.head.map((c, j) => (
                    <th key={j} scope="col">
                      <InlineMd c={c} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r, j) => (
                  <tr key={j}>
                    {r.map((c, k) => (
                      <td key={k}>
                        <InlineMd c={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "callout":
        return (
          <aside key={i} className={`callout callout-${b.kind}`}>
            <p className="callout-k">{CALLOUT_LABEL[b.kind]}</p>
            {b.title && <p className="callout-t">{b.title}</p>}
            <Md blocks={b.blocks} />
          </aside>
        );
      case "img":
        return (
          <figure key={i} className="md-fig">
            <Image src={b.src} alt={b.alt} width={b.w} height={b.h} sizes="(min-width: 860px) 780px, 100vw" />
            {b.caption && <figcaption>{b.caption}</figcaption>}
          </figure>
        );
      case "cta":
        return cta ? <div key={i}>{cta}</div> : null;
      case "hr":
        return <hr key={i} />;
    }
  });
}
