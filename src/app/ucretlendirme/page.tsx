import type { Metadata } from "next";
import { PricingPage } from "@/components/pricing-page";
import { safeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ücretlendirme",
  description: "Temel web sitesi 10.000 TL. Ek özellik fiyatları ve yıllık servis ücretleri.",
  alternates: { canonical: "/ucretlendirme" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Anasayfa", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Ücretlendirme", item: `${SITE_URL}/ucretlendirme` },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbLd) }} />
      <PricingPage />
    </>
  );
}
