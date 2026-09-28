import type { Metadata } from "next";
import { AboutPage } from "@/components/about-page";
import { safeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";

const TITLE = "Hakkımızda";
const DESCRIPTION =
  "Vitrin'in misyonu, vizyonu ve değerleri: işletmelere sade, şeffaf ve uygun fiyatlı web sitesi hizmeti sunuyoruz.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/hakkimizda" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Anasayfa", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: TITLE, item: `${SITE_URL}/hakkimizda` },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbLd) }} />
      <AboutPage />
    </>
  );
}
