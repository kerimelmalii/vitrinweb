import { ProcessPage } from "@/components/pages";
import { breadcrumbLd } from "@/components/ui";
import { safeJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/page-meta";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMeta(
  "/nasil-calisiyoruz",
  "Vitrinweb Nasıl Çalışır? | Keşif, Pilot ve Teslim Süreci",
  "İlk keşif görüşmesinden yazılı kapsam, prototip, pilot uygulama, teslim ve destek adımlarına kadar şeffaf çalışma sürecimizi inceleyin.",
);

const ld = breadcrumbLd(SITE_URL, [{ name: "Nasıl Çalışıyoruz?", path: "/nasil-calisiyoruz" }]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      <ProcessPage />
    </>
  );
}
