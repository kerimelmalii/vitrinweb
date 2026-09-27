import type { Metadata } from "next";
import { BlogList } from "@/components/blog";
import { safeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Web siteleri, arama motorlarında görünürlük ve işletmenizi internette büyütmek üzerine pratik yazılar.",
  alternates: { canonical: "/blog" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Anasayfa", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbLd) }} />
      <BlogList />
    </>
  );
}
