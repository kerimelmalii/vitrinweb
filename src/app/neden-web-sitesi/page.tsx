import { WhyWebPage } from "@/components/pages";
import { breadcrumbLd } from "@/components/ui";
import { safeJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/page-meta";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMeta(
  "/neden-web-sitesi",
  "İşletmeler İçin Kurumsal Web Sitesi Neden Önemli? | Vitrinweb",
  "Kurumsal bir web sitesinin marka güvenilirliğine, hizmet sunumuna ve müşteri iletişimine sağladığı somut katkıları inceleyin.",
);

const ld = breadcrumbLd(SITE_URL, [{ name: "Neden web sitesi?", path: "/neden-web-sitesi" }]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      <WhyWebPage />
    </>
  );
}
