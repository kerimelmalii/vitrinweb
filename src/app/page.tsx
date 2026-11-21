import { Home } from "@/components/home";
import { faqLd } from "@/components/ui";
import { HOME_FAQS } from "@/data/agency";
import { safeJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "/",
  "Vitrinweb | İşletmeler İçin Dijital Ürünler ve Özel Yazılım",
  "Markanızı güçlendiren web siteleri, ürün görsel stüdyosu, reklam raporlama ve stok takibi araçları ile işletmenize özel yazılım çözümlerini keşfedin.",
);

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqLd(HOME_FAQS)) }} />
      <Home />
    </>
  );
}
