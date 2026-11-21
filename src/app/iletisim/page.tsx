import { ContactPage } from "@/components/pages";
import { breadcrumbLd } from "@/components/ui";
import { safeJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/page-meta";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMeta(
  "/iletisim",
  "İletişim | Vitrinweb",
  "Yeni projeler, mevcut sipariş ve teknik destek talepleri ile iş birliği konuları için Vitrinweb ekibine ulaşın.",
);

const ld = breadcrumbLd(SITE_URL, [{ name: "İletişim", path: "/iletisim" }]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      <ContactPage />
    </>
  );
}
