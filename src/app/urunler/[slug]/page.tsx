import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/product-page";
import { breadcrumbLd, faqLd } from "@/components/ui";
import { COMPANY } from "@/data/company";
import { PRODUCTS, getProduct } from "@/data/products";
import { safeJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/page-meta";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return pageMeta(`/urunler/${p.slug}`, p.seoTitle, p.description, `/og/${p.slug}.png`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const url = `${SITE_URL}/urunler/${p.slug}`;
  const ld = [
    breadcrumbLd(SITE_URL, [
      { name: "Ürünler", path: "/urunler" },
      { name: p.name, path: `/urunler/${p.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: p.name,
      description: p.description,
      url,
      image: `${SITE_URL}/og/${p.slug}.png`,
      provider: { "@type": "Organization", name: COMPANY.brand, url: SITE_URL },
      areaServed: "TR",
    },
    faqLd(p.faqs),
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      <ProductPage p={p} />
    </>
  );
}
