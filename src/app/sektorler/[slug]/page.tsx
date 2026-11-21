import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectorPage } from "@/components/pages";
import { breadcrumbLd } from "@/components/ui";
import { SECTORS, getSector } from "@/data/sectors";
import { safeJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/page-meta";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return SECTORS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getSector(slug);
  return s ? pageMeta(`/sektorler/${s.slug}`, s.seoTitle, s.description) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSector(slug);
  if (!s) notFound();
  const ld = breadcrumbLd(SITE_URL, [
    { name: "Sektörler", path: "/sektorler" },
    { name: s.name, path: `/sektorler/${s.slug}` },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      <SectorPage s={s} />
    </>
  );
}
