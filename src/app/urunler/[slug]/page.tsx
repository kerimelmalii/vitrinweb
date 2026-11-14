import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/products";
import { COMPANY } from "@/data/company";
import { ALL_PRODUCTS, getProduct } from "@/data/products";
import { BASE_PRICE } from "@/lib/config";
import { safeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";
import { openGraph } from "@/lib/open-graph";

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const path = `/urunler/${p.slug}`;
  return {
    title: p.name,
    description: p.description,
    alternates: { canonical: path },
    openGraph: openGraph(path, { title: `${p.name} | Vitrinweb`, description: p.description }),
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const url = `${SITE_URL}/urunler/${p.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Anasayfa", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Ürünler", item: `${SITE_URL}/urunler` },
        { "@type": "ListItem", position: 3, name: p.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: p.name,
      description: p.description,
      url,
      provider: { "@type": "Organization", name: COMPANY.brand, url: SITE_URL },
      areaServed: "TR",
      ...(p.checkout && {
        offers: { "@type": "Offer", price: String(BASE_PRICE), priceCurrency: "TRY", url },
      }),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: p.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <ProductPage p={p} />
    </>
  );
}
