import { KesifPage } from "@/components/lead-pages";
import { breadcrumbLd } from "@/components/ui";
import { safeJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/page-meta";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMeta(
  "/kesif-gorusmesi",
  "Keşif Görüşmesi Planlayın | Vitrinweb",
  "İşletmenizde en çok zaman alan süreci Vitrinweb ekibiyle değerlendirin, doğru dijital yol haritasını birlikte belirleyin.",
);

const ld = breadcrumbLd(SITE_URL, [{ name: "Keşif Görüşmesi", path: "/kesif-gorusmesi" }]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      <KesifPage />
    </>
  );
}
