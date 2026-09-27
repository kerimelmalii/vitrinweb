import type { Metadata } from "next";
import { GirisimProgramiPage } from "@/components/girisim-programi-page";
import { safeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Girişim Destek Programı",
  description:
    "Yeni kurulan girişimlere profesyonel web sitesi, 12 ay bakım ve SEO desteği; karşılığında nakit değil %2 hisse.",
  alternates: { canonical: "/girisim-programi" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Anasayfa", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Girişim Destek Programı", item: `${SITE_URL}/girisim-programi` },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbLd) }} />
      <GirisimProgramiPage />
    </>
  );
}
