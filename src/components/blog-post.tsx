import Image from "next/image";
import Link from "next/link";
import { BlogCta } from "@/components/blog-cta";
import { PostCard } from "@/components/blog";
import { Md } from "@/components/markdown";
import { coverSrc, formatDate, readMin, relatedPosts, type BlogPost as Post } from "@/data/blog";

export const AUTHOR = { name: "Vitrinweb İçerik Ekibi", href: "/hakkimizda" };
const TOC_MIN_WORDS = 1500;

export function BlogPost({ p }: { p: Post }) {
  const others = relatedPosts(p);
  return (
    <main id="main" className="container-x doc-wrap">
      <nav className="crumbs" aria-label="Konum">
        <Link className="linkb" href="/">
          Anasayfa
        </Link>
        <span aria-hidden="true">/</span>
        <Link className="linkb" href="/blog">
          Blog
        </Link>
        <span aria-hidden="true">/</span>
        <span>{p.category}</span>
      </nav>
      <article className="post">
        <h1 className="h-2">{p.title}</h1>
        <p className="bmeta">
          <Link href={AUTHOR.href}>{AUTHOR.name}</Link>
          <span aria-hidden="true">·</span>
          <span>
            Yayın: <time dateTime={p.date}>{formatDate(p.date)}</time>
          </span>
          {p.updated && (
            <>
              <span aria-hidden="true">·</span>
              <span>
                Güncelleme: <time dateTime={p.updated}>{formatDate(p.updated)}</time>
              </span>
            </>
          )}
          <span aria-hidden="true">·</span>
          <span>{readMin(p)} dakikalık okuma</span>
        </p>
        <div className="pcover">
          <Image src={coverSrc(p.slug)} alt={p.coverAlt} width={1600} height={900} priority sizes="(min-width: 860px) 780px, 100vw" />
        </div>
        {p.words >= TOC_MIN_WORDS && p.toc.length > 2 && (
          <nav className="toc" aria-labelledby="toc-h">
            <p id="toc-h" className="toc-h">
              İçindekiler
            </p>
            <ol>
              {p.toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`}>{t.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Md blocks={p.body} cta={<BlogCta slug={p.slug} title={p.title} variant="inline" />} />
      </article>
      <BlogCta slug={p.slug} title={p.title} variant="end" />
      <section className="post-foot" aria-label="Yazı hakkında">
        <div className="post-author">
          <p className="post-foot-h">Yazar hakkında</p>
          <p>
            <b>{AUTHOR.name}</b>, işletmeler için web sitesi tasarlayan ve yayına alan Vitrinweb&apos;in içerik ekibidir. Yazılarımızda kendi
            çalışmalarımızdan edindiğimiz deneyimi ve güvenilir kaynakları bir araya getiriyoruz. <Link href={AUTHOR.href}>Bizi tanıyın</Link>
          </p>
        </div>
        {p.sources.length > 0 && (
          <div className="post-sources">
            <p className="post-foot-h">Kaynaklar</p>
            <Md blocks={p.sources} />
          </div>
        )}
        <p className="post-note">
          Bu yazı {AUTHOR.name} tarafından hazırlanmış ve kontrol edilmiştir.{" "}
          <Link href="/icerik-politikasi">İçeriklerimizi nasıl hazırlıyoruz?</Link>
        </p>
      </section>
      {others.length > 0 && (
        <nav className="post-related" aria-labelledby="related-h">
          <h2 id="related-h" className="h-3">
            İlgili yazılar
          </h2>
          <div className="bgrid">
            {others.map((o) => (
              <PostCard key={o.slug} p={o} level="h3" />
            ))}
          </div>
        </nav>
      )}
    </main>
  );
}
