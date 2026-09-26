import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal";
import { LEGAL_DOCS, LEGAL_LINKS } from "@/data/legal";
import { safeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return LEGAL_LINKS.map(([id]) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const doc = LEGAL_DOCS[id];
  return doc ? { title: doc.t, alternates: { canonical: `/yasal/${id}` } } : {};
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = LEGAL_DOCS[id];
  if (!doc) notFound();
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Anasayfa", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: doc.t, item: `${SITE_URL}/yasal/${id}` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbLd) }} />
      <LegalPage id={id} />
    </>
  );
}
