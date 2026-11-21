import { DemosPage } from "@/components/pages";
import { breadcrumbLd } from "@/components/ui";
import { safeJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/page-meta";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMeta(
  "/demolar",
  "Etkileşimli Demolar ve Örnek Uygulamalar | Vitrinweb",
  "Ürün görsel dönüşümünü karşılaştırın, örnek Meta reklam raporunu inceleyin ve barkodlu stok çıkışını canlı olarak deneyimleyin.",
);

const ld = breadcrumbLd(SITE_URL, [{ name: "Demolar", path: "/demolar" }]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      <DemosPage />
    </>
  );
}
