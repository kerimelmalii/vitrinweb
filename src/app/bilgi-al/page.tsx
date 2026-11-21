import { BilgiAlPage } from "@/components/lead-pages";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "/bilgi-al",
  "Vitrinweb Çözümleri Hakkında Bilgi Alın",
  "İlgilendiğiniz ürünü ve işletmenizin öncelikli ihtiyacını paylaşın; size en uygun kapsam ve başlangıç adımlarıyla dönüş yapalım.",
);

export default function Page() {
  return <BilgiAlPage />;
}
