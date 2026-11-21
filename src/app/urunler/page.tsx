import { CatalogPage } from "@/components/pages";
import { breadcrumbLd } from "@/components/ui";
import { PRODUCTS } from "@/data/products";
import { safeJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/page-meta";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMeta(
  "/urunler",
  "İşletmeler İçin Dijital Ürünler Kataloğu | Vitrinweb",
  "Ürün görsel stüdyosu, Meta reklam paneli, barkodlu depo takibi, kurumsal web sitesi ve operasyonel dijital ürünleri karşılaştırın.",
);

const ld = [
  breadcrumbLd(SITE_URL, [{ name: "Ürünler", path: "/urunler" }]),
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: PRODUCTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${SITE_URL}/urunler/${p.slug}` })),
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      <CatalogPage />
    </>
  );
}
