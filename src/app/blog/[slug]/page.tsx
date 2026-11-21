import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AUTHOR, AUTHOR_ID, BlogPost } from "@/components/blog-post";
import { BLOG, coverSrc, getPost, isoWithZone } from "@/data/blog";
import { COMPANY } from "@/data/company";
import { safeJsonLd } from "@/lib/json-ld";
import { ORG_ID, SITE_ID } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { openGraph } from "@/lib/open-graph";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    /* Google ~60 karakterden sonra kırpar; marka eki sığmıyorsa başlık eksiz kullanılır. */
    title: post.seoTitle.includes("Vitrinweb") || post.seoTitle.length > 48 ? { absolute: post.seoTitle } : post.seoTitle,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: openGraph(
      `/blog/${post.slug}`,
      {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: isoWithZone(post.date),
        modifiedTime: isoWithZone(post.updated ?? post.date),
      },
      true,
    ),
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const url = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    headline: post.title,
    description: post.description,
    image: [coverSrc(post.slug), coverSrc(post.slug, "-4x3"), coverSrc(post.slug, "-1x1")].map((s) => SITE_URL + s),
    datePublished: isoWithZone(post.date),
    dateModified: isoWithZone(post.updated ?? post.date),
    inLanguage: "tr-TR",
    articleSection: post.category,
    wordCount: post.words,
    author: [{ "@type": "Organization", "@id": AUTHOR_ID, name: AUTHOR.name, url: SITE_URL + AUTHOR.href, parentOrganization: { "@id": ORG_ID } }],
    publisher: { "@type": "Organization", "@id": ORG_ID, name: COMPANY.brand, url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } },
    isPartOf: { "@id": SITE_ID },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbLd) }} />
      <BlogPost p={post} />
    </>
  );
}
