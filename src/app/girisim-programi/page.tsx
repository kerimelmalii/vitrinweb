import type { Metadata } from "next";
import { GirisimProgramiPage } from "@/components/girisim-programi-page";
import { breadcrumbLd } from "@/components/ui";
import { safeJsonLd } from "@/lib/json-ld";
import { openGraph } from "@/lib/open-graph";
import { SITE_URL } from "@/lib/site";

const TITLE = "Girişimlere Özel Dijital Destek Programı | Vitrinweb";
const DESCRIPTION =
  "Yeni kurulan girişimlere profesyonel web sitesi, 12 ay bakım ve SEO desteği; karşılığında nakit değil, kademeli hak edilen %2 pay.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/girisim-programi" },
  openGraph: openGraph("/girisim-programi", { title: TITLE, description: DESCRIPTION }, true),
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const ld = breadcrumbLd(SITE_URL, [{ name: "Girişimlere Destek", path: "/girisim-programi" }]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      <GirisimProgramiPage />
    </>
  );
}
