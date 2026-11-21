import { CustomPage } from "@/components/pages";
import { breadcrumbLd, faqLd } from "@/components/ui";
import { CUSTOM_FAQS } from "@/data/agency";
import { safeJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/page-meta";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMeta(
  "/isletmeye-ozel",
  "İşletmeye Özel Yazılım ve Süreç Otomasyonu | Vitrinweb",
  "Tekrarlanan operasyonlarınızı analiz edelim; işletmenizin çalışma biçimine özel yönetim paneli, otomasyon veya sistem entegrasyonu tasarlayalım.",
);

const ld = [breadcrumbLd(SITE_URL, [{ name: "İşletmeye Özel Çözümler", path: "/isletmeye-ozel" }]), faqLd(CUSTOM_FAQS)];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      <CustomPage />
    </>
  );
}
