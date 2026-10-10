import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { Md } from "@/components/markdown";
import { formatDate } from "@/data/blog";
import { parseBlocks, parseFrontMatter } from "@/lib/markdown";

const { data, body } = parseFrontMatter(fs.readFileSync(path.join(process.cwd(), "content/sayfalar/icerik-politikasi.md"), "utf8"));
const blocks = parseBlocks(body);

export const metadata: Metadata = {
  title: data.seoTitle,
  description: data.description,
  alternates: { canonical: "/icerik-politikasi" },
};

export default function Page() {
  return (
    <main id="main" className="container-x doc-wrap">
      <nav className="crumbs" aria-label="Konum">
        <Link className="linkb" href="/">
          Anasayfa
        </Link>
        <span aria-hidden="true">/</span>
        <span>İçerik Politikası</span>
      </nav>
      <article className="post">
        <h1 className="h-2">{data.title}</h1>
        <p className="bmeta">
          Son güncelleme: <time dateTime={data.updated}>{formatDate(data.updated)}</time>
        </p>
        <Md blocks={blocks} />
      </article>
    </main>
  );
}
