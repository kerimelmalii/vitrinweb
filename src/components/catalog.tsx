"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductArt } from "@/components/art";
import { Icon } from "@/components/icons";
import { CATEGORIES, NEEDS, PRODUCTS, type Product, type ProductCategory } from "@/data/products";

export function ProductCard({ p, text, link }: { p: Product; text?: string; link?: string }) {
  return (
    <Link className="pcard" href={`/urunler/${p.slug}`}>
      <span className="pcard-shot" aria-hidden="true">
        <ProductArt kind={p.art} uid={`card-${p.slug}`} />
      </span>
      <span className="pcard-body">
        <span className="pcard-name">
          <Icon n={p.icon} size={18} sw={1.8} />
          {p.name}
        </span>
        <span className="pcard-short">{text ?? p.listText}</span>
        <span className="pcard-more">
          {link ?? p.linkLabel} <Icon n="arrow" size={15} sw={2.2} />
        </span>
      </span>
    </Link>
  );
}

export function CatalogGrid() {
  const [cat, setCat] = useState<ProductCategory | "tumu">("tumu");
  const [need, setNeed] = useState<number | null>(null);
  const list = PRODUCTS.filter((p) => (need !== null ? NEEDS[need].slugs.includes(p.slug) : cat === "tumu" || p.category === cat));
  const reset = () => {
    setCat("tumu");
    setNeed(null);
  };
  return (
    <>
      <div className="needs">
        <h2 className="h-3">İhtiyacınıza göre başlayın</h2>
        <div className="chips" role="group" aria-label="İhtiyaca göre gezinme">
          {NEEDS.map((n, i) => (
            <button
              key={n.label}
              type="button"
              className={"chip" + (need === i ? " on" : "")}
              aria-pressed={need === i}
              onClick={() => setNeed(need === i ? null : i)}
            >
              {n.label}
            </button>
          ))}
        </div>
      </div>
      <div className="filters" role="group" aria-label="Kategoriye göre filtrele">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className={"fchip" + (need === null && cat === c.id ? " on" : "")}
            aria-pressed={need === null && cat === c.id}
            onClick={() => {
              setNeed(null);
              setCat(c.id);
            }}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {list.length} ürün gösteriliyor.
      </p>
      {list.length === 0 ? (
        <div className="empty">
          <p>Bu kategoride görüntülenecek ürün bulunmuyor. Tüm ürünlere dönebilirsiniz.</p>
          <button type="button" className="btn btn-line" onClick={reset}>
            Tüm Ürünleri Görün
          </button>
        </div>
      ) : (
        <div className="pgrid">
          {list.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      )}
      {need !== null && (
        <p className="fine" style={{ marginTop: 16 }}>
          <button type="button" className="linkb" onClick={reset}>
            Tüm Ürünleri Görün
          </button>
        </p>
      )}
    </>
  );
}

/** Ana sayfadaki sağdan sola kayan ürün şeridi. Fareyle üzerine gelince, klavyeyle odaklanınca
    veya "Durdurun" ile durur; hareket azaltma tercihinde kaydırılabilir bir liste olur. */
export function ProductMarquee({ items }: { items: { p: Product; text?: string }[] }) {
  const [paused, setPaused] = useState(false);
  /* Kesintisiz döngü için gereken ikinci kopya yalnızca tarayıcıda eklenir; sunucu HTML'inde ve
     botların okuduğu metinde her ürün bir kez yer alır. */
  const [ready, setReady] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setReady(true), []);
  const cards = (hidden: boolean) => (
    <ul className="marq-set" aria-hidden={hidden || undefined} inert={hidden || undefined}>
      {items.map(({ p, text }) => (
        <li key={p.slug}>
          <ProductCard p={p} text={text} />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={"marq" + (ready ? " ready" : "") + (paused ? " paused" : "")}>
      <div className="marq-view" role="region" aria-label="Ürünler" tabIndex={-1}>
        <div className="marq-track">
          {cards(false)}
          {ready && cards(true)}
        </div>
      </div>
      <button type="button" className="marq-btn" onClick={() => setPaused(!paused)} aria-pressed={paused}>
        <Icon n={paused ? "arrow" : "x"} size={14} sw={2.2} />
        {paused ? "Kaydırmayı Başlatın" : "Kaydırmayı Durdurun"}
      </button>
    </div>
  );
}
