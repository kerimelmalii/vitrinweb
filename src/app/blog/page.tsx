import type { Metadata } from "next";
import { BlogList } from "@/components/blog";
import { safeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";
import { pageMeta } from "@/lib/page-meta";

export const metadata: Metadata = pageMeta(
  "/blog",
  "İşletmeler İçin Dijital Rehberler | Vitrinweb Blog",
  "Ürün fotoğrafçılığı, reklam raporlama ve stok düzeni hakkında sahada doğrudan uygulayabileceğiniz Vitrinweb rehberleri.",
);

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
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
