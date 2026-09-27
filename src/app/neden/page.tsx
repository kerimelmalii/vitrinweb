import type { Metadata } from "next";
import { WhyPage } from "@/components/why-page";
import { safeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Neden web sitesi?",
  description: "İşletmeniz için bir web sitesinin neden önemli olduğunu araştırmalarla anlatıyoruz.",
  alternates: { canonical: "/neden" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Anasayfa", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Neden web sitesi?", item: `${SITE_URL}/neden` },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbLd) }} />
      <WhyPage />
    </>
  );
}
