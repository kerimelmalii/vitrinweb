import { Suspense } from "react";
import { KesifPage } from "@/components/lead-pages";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "/kesif-gorusmesi",
  "Keşif Görüşmesi Planlayın | Vitrinweb",
  "İşletmenizde en çok zaman alan süreci Vitrinweb ekibiyle değerlendirin, doğru dijital yol haritasını birlikte belirleyin.",
);

export default function Page() {
  return (
    <Suspense fallback={<main id="main" className="container-x lead-page" aria-busy="true"><p className="fine">Yükleniyor…</p></main>}>
      <KesifPage />
    </Suspense>
  );
}
