import { COMPANY } from "@/data/company";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta("/bakim", "Bakım | Vitrinweb", "Sistemlerimizi güncelliyoruz.", undefined, { index: false });

/** Bakım sırasında yönlendirme hedefi olarak kullanılır (ör. Vercel'de geçici bir yönlendirme kuralıyla). */
export default function Page() {
  return (
    <main id="main" className="container-x doc-wrap nf">
      <p className="eyebrow">Bakım</p>
      <h1 className="h-2">Sistemlerimizi güncelliyoruz.</h1>
      <p className="lead" style={{ margin: "14px 0 26px" }}>
        Kısa bir süre sonra tekrar deneyebilir veya bize doğrudan e-posta gönderebilirsiniz.
      </p>
      <a className="btn btn-primary" href={`mailto:${COMPANY.email}`}>
        E-posta Gönderin
      </a>
    </main>
  );
}
