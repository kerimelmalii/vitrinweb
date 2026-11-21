import { BilgiAlPage } from "@/components/lead-pages";
import { breadcrumbLd } from "@/components/ui";
import { safeJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/page-meta";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMeta(
  "/bilgi-al",
  "Vitrinweb Çözümleri Hakkında Bilgi Alın",
  "İlgilendiğiniz ürünü ve işletmenizin öncelikli ihtiyacını paylaşın; size en uygun kapsam ve başlangıç adımlarıyla dönüş yapalım.",
);

const ld = breadcrumbLd(SITE_URL, [{ name: "Bilgi Alın", path: "/bilgi-al" }]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      <BilgiAlPage />
    </>
  );
}
