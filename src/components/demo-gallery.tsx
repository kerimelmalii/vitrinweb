"use client";

import { useState } from "react";
import { ProductArt } from "@/components/art";
import { DemoFrame } from "@/components/demos";
import { Icon } from "@/components/icons";
import { Modal } from "@/components/modal";
import { DEMO_CARDS } from "@/data/agency";
import type { ArtKind } from "@/data/products";

export function DemoGallery() {
  const [open, setOpen] = useState<number | null>(null);
  const card = open !== null ? DEMO_CARDS[open] : null;
  return (
    <>
      <ul className="dgrid">
        {DEMO_CARDS.map((d, i) => (
          <li key={d.kind} className="dcard">
            <span className="dcard-shot" aria-hidden="true">
              <ProductArt kind={d.kind as ArtKind} uid={`demo-${d.kind}`} />
            </span>
            <span className="tag tag-sample">Örnek veri</span>
            <h2 className="h-3">{d.title}</h2>
            <p>{d.text}</p>
            <button type="button" className="btn btn-primary" onClick={() => setOpen(i)}>
              {d.action}
            </button>
            <a className="linkb" href={`/urunler/${d.slug}`}>
              Ürün Sayfasına Geçin <Icon n="arrow" size={14} sw={2.2} />
            </a>
          </li>
        ))}
      </ul>
      {card && (
        <Modal title={card.title} onClose={() => setOpen(null)} size="xl">
          <DemoFrame kind={card.kind as ArtKind} title={card.title} intro={card.text} productHref={`/urunler/${card.slug}`} />
        </Modal>
      )}
    </>
  );
}
