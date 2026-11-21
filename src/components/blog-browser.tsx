"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/icons";

export interface PostLite {
  slug: string;
  title: string;
  description: string;
  coverAlt: string;
  category: string;
  group: string;
  date: string;
  dateText: string;
  mins: number;
}

const GROUPS = ["Tümü", "Görsel ve İçerik", "Reklam", "Stok ve Operasyon", "Web ve Görünürlük"];
const cover = (slug: string) => `/blog/${slug}/kapak.webp`;

export function PostCard({ p, eager = false, level = "h2" }: { p: PostLite; eager?: boolean; level?: "h2" | "h3" }) {
  const H = level;
  return (
    <Link className="bcard" href={`/blog/${p.slug}`}>
      <span className="bcover">
        <Image src={cover(p.slug)} alt={p.coverAlt} width={1600} height={900} sizes="(min-width: 1024px) 380px, (min-width: 700px) 50vw, 100vw" priority={eager} />
      </span>
      <span className="bbody">
        <span className="bmeta">
          <span>{p.category}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={p.date}>{p.dateText}</time>
          <span aria-hidden="true">·</span>
          {p.mins} dk
        </span>
        <H>{p.title}</H>
        <p>{p.description}</p>
        <span className="bmore">Rehberi Okuyun</span>
      </span>
    </Link>
  );
}

const norm = (s: string) => s.toLocaleLowerCase("tr").normalize("NFD").replace(/[̀-ͯ]/g, "");

export function BlogBrowser({ posts }: { posts: PostLite[] }) {
  const [group, setGroup] = useState("Tümü");
  const [q, setQ] = useState("");
  const terms = norm(q).split(/\s+/).filter(Boolean);
  const list = posts.filter(
    (p) => (group === "Tümü" || p.group === group) && terms.every((t) => norm(`${p.title} ${p.description} ${p.category}`).includes(t)),
  );
  return (
    <>
      <div className="blog-tools">
        <div className="filters" role="group" aria-label="Kategoriler">
          {GROUPS.map((g) => (
            <button key={g} type="button" className={"fchip" + (group === g ? " on" : "")} aria-pressed={group === g} onClick={() => setGroup(g)}>
              {g}
            </button>
          ))}
        </div>
        <label className="bsearch">
          <Icon n="search" size={18} />
          <span className="sr-only">Rehberlerde Ara</span>
          <input type="search" placeholder="Rehberlerde Ara" value={q} onChange={(e) => setQ(e.target.value)} maxLength={80} />
        </label>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {list.length} yazı gösteriliyor.
      </p>
      {list.length === 0 ? (
        <div className="empty">
          <p>Aramanızla eşleşen içerik bulunamadı. Farklı bir anahtar kelime deneyebilirsiniz.</p>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => {
              setQ("");
              setGroup("Tümü");
            }}
          >
            Tüm Yazılara Dönün
          </button>
        </div>
      ) : (
        <div className="bgrid">
          {list.map((p, i) => (
            <PostCard key={p.slug} p={p} eager={i < 3} />
          ))}
        </div>
      )}
    </>
  );
}

export function CopyLink() {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="btn btn-line btn-sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setDone(true);
          window.setTimeout(() => setDone(false), 2500);
        } catch {
          setDone(false);
        }
      }}
    >
      <Icon n="copy" size={15} /> {done ? "Bağlantı kopyalandı." : "Bağlantıyı Kopyalayın"}
    </button>
  );
}
