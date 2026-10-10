import Image from "next/image";
import Link from "next/link";
import { BLOG, coverSrc, formatDate, readMin, type BlogPost } from "@/data/blog";

export function PostCard({ p, eager = false, level = "h2" }: { p: BlogPost; eager?: boolean; level?: "h2" | "h3" }) {
  const H = level;
  return (
    <Link className="bcard" href={`/blog/${p.slug}`}>
      <span className="bcover">
        <Image
          src={coverSrc(p.slug)}
          alt=""
          width={1600}
          height={900}
          sizes="(min-width: 1024px) 380px, (min-width: 700px) 50vw, 100vw"
          priority={eager}
        />
      </span>
      <span className="bbody">
        <span className="bmeta">
          <span>{p.category}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={p.updated ?? p.date}>{formatDate(p.updated ?? p.date)}</time>
          <span aria-hidden="true">·</span>
          {readMin(p)} dk
        </span>
        <H>{p.title}</H>
        <p>{p.description}</p>
        <span className="bmore">Yazıyı okuyun</span>
      </span>
    </Link>
  );
}

export function BlogList() {
  return (
    <main id="main">
      <section className="sec" style={{ paddingBottom: "96px" }}>
        <div className="container-x">
          <h1 className="h-1">Blog</h1>
          <p className="lead" style={{ marginTop: "16px" }}>
            Web siteleri, arama motorlarında görünürlük ve işletmenizi internette büyütmek üzerine pratik yazılar.
          </p>
          <div className="bgrid">
            {BLOG.map((p, i) => (
              <PostCard key={p.slug} p={p} eager={i < 3} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
