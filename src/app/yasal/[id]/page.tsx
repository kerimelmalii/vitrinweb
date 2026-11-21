import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal";
import { LEGAL_DOCS } from "@/data/legal";
import { safeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";
import { openGraph } from "@/lib/open-graph";

export function generateStaticParams() {
  return Object.keys(LEGAL_DOCS).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const doc = LEGAL_DOCS[id];
  return doc
    ? {
        title: { absolute: `${doc.t} | Vitrinweb` },
        description: doc.lead || doc.archive,
        alternates: { canonical: `/yasal/${id}` },
        openGraph: openGraph(`/yasal/${id}`, { title: `${doc.t} | Vitrinweb` }),
        ...(doc.archive && { robots: { index: false, follow: true } }),
      }
    : {};
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = LEGAL_DOCS[id];
  if (!doc) notFound();
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
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
