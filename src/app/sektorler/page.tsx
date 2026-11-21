import { SectorsPage } from "@/components/pages";
import { breadcrumbLd } from "@/components/ui";
import { SECTORS } from "@/data/sectors";
import { safeJsonLd } from "@/lib/json-ld";
import { itemListLd } from "@/lib/schema";
import { pageMeta } from "@/lib/page-meta";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMeta(
  "/sektorler",
  "Sektörlere Göre Dijital Çözümler | Vitrinweb",
  "Kuaför ve güzellik salonu, kafe-restoran, perakende, e-ticaret, toptan satış ve klinikler için iş akışına özel dijital çözümleri inceleyin.",
);

const ld = [
  itemListLd("Sektörler", SECTORS.map((s) => ({ name: s.name, path: `/sektorler/${s.slug}` }))),
  breadcrumbLd(SITE_URL, [{ name: "Sektörler", path: "/sektorler" }]),
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      <SectorsPage />
    </>
  );
}
