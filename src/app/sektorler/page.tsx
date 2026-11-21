import { SectorsPage } from "@/components/pages";
import { breadcrumbLd } from "@/components/ui";
import { safeJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/page-meta";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMeta(
  "/sektorler",
  "Sektörlere Göre Dijital Çözümler | Vitrinweb",
  "Kuaför ve güzellik salonu, kafe-restoran, perakende, e-ticaret, toptan satış ve klinikler için iş akışına özel dijital çözümleri inceleyin.",
);

const ld = breadcrumbLd(SITE_URL, [{ name: "Sektörler", path: "/sektorler" }]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      <SectorsPage />
    </>
  );
}
