import { AboutPage } from "@/components/pages";
import { breadcrumbLd } from "@/components/ui";
import { safeJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/page-meta";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMeta(
  "/hakkimizda",
  "Vitrinweb Hakkında | İşletmeler İçin Dijital Çözümler Ajansı",
  "Web tasarımıyla başlayan Vitrinweb’in, işletmeler için hazır dijital ürünler ve özel yazılımlar geliştiren bir çözümler ajansına dönüşüm hikâyesini okuyun.",
);

const ld = breadcrumbLd(SITE_URL, [{ name: "Hakkımızda", path: "/hakkimizda" }]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      <AboutPage />
    </>
  );
}
