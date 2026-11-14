import type { Metadata } from "next";
import { ProductsPage } from "@/components/products";
import { ALL_PRODUCTS } from "@/data/products";
import { safeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";
import { openGraph } from "@/lib/open-graph";

const TITLE = "Ürünler";
const DESCRIPTION =
  "Meta reklam paneli, depo ve stok takibi, ürün görsel stüdyosu, müşteri bulma aracı, web sitesi ve işletmeye özel çözümler.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/urunler" },
  openGraph: openGraph("/urunler", { title: `${TITLE} | Vitrinweb`, description: DESCRIPTION }),
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Anasayfa", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: TITLE, item: `${SITE_URL}/urunler` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: ALL_PRODUCTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${SITE_URL}/urunler/${p.slug}`,
    })),
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <ProductsPage />
    </>
  );
}
