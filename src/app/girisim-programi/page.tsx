import type { Metadata } from "next";
import { GirisimProgramiPage } from "@/components/girisim-programi-page";
import { safeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";
import { openGraph } from "@/lib/open-graph";

const TITLE = "Girişim Destek Programı";
const DESCRIPTION =
  "Yeni kurulan girişimlere profesyonel web sitesi, 12 ay bakım ve SEO desteği; karşılığında nakit değil %2 hisse.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/girisim-programi" },
  openGraph: openGraph("/girisim-programi", { title: TITLE, description: DESCRIPTION }, true),
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
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
