import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";
import { safeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Sorularınız için e-posta veya Instagram'dan doğrudan bize ulaşın.",
  alternates: { canonical: "/iletisim" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Anasayfa", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "İletişim", item: `${SITE_URL}/iletisim` },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbLd) }} />
      <ContactPage />
    </>
  );
}
