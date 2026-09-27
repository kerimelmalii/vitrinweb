import type { Metadata } from "next";
import { IsgaleHayirPage } from "@/components/isgale-hayir-page";
import { safeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";

const TITLE = "İşgale Hayır!";
const DESCRIPTION =
  "Vitrin olarak Filistin ve Doğu Türkistan halklarının özgürlük ve onurlu yaşam hakkının yanındayız; insani yardım için çalışan dernek ve kuruluşlara ücretsiz web sitesi ve dijital destek sunuyoruz.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/isgale-hayir" },
  robots: { index: true, follow: true },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Anasayfa", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: TITLE, item: `${SITE_URL}/isgale-hayir` },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbLd) }} />
      <IsgaleHayirPage />
    </>
  );
}
