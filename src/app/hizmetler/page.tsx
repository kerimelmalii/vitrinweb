import { ServicesPage } from "@/components/pages";
import { breadcrumbLd } from "@/components/ui";
import { SERVICES } from "@/data/services";
import { safeJsonLd } from "@/lib/json-ld";
import { itemListLd } from "@/lib/schema";
import { pageMeta } from "@/lib/page-meta";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMeta(
  "/hizmetler",
  "İşletmeler İçin Tamamlayıcı Dijital Hizmetler | Vitrinweb",
  "Google profil optimizasyonu, WhatsApp karşılama, online randevu, aylık performans raporu ve dijital içerik hizmetlerimizi inceleyin.",
);

const ld = [
  itemListLd("Tamamlayıcı hizmetler", SERVICES.map((s) => ({ name: s.name, path: `/hizmetler/${s.slug}` }))),
  breadcrumbLd(SITE_URL, [{ name: "Tamamlayıcı Hizmetler", path: "/hizmetler" }]),
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      <ServicesPage />
    </>
  );
}
