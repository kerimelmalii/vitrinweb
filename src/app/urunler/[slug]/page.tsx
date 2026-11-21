import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/product-page";
import { breadcrumbLd, faqLd } from "@/components/ui";
import { CATEGORIES, PRODUCTS, getProduct } from "@/data/products";
import { safeJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/page-meta";
import { serviceLd } from "@/lib/schema";
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
  const ld = [
    breadcrumbLd(SITE_URL, [
      { name: "Ürünler", path: "/urunler" },
      { name: p.name, path: `/urunler/${p.slug}` },
    ]),
    serviceLd({
      name: p.name,
      description: p.description,
      path: `/urunler/${p.slug}`,
      image: `${SITE_URL}/og/${p.slug}.png`,
      category: CATEGORIES.find((c) => c.id === p.category)?.label,
    }),
    faqLd(p.faqs),
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      <ProductPage p={p} />
    </>
  );
}
