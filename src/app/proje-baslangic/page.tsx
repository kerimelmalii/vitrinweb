import { redirect } from "next/navigation";
import { ProjectStart } from "@/components/project-start";
import { Crumbs } from "@/components/ui";
import { pageMeta } from "@/lib/page-meta";
import { RX } from "@/lib/security";

export const metadata = pageMeta(
  "/proje-baslangic",
  "Proje Başlangıç Formu | Vitrinweb",
  "Üzerinde anlaştığımız web sitesi çalışması için işletme bilgilerinizi, içeriklerinizi ve dosyalarınızı paylaşın.",
  undefined,
  { index: false },
);

/* Ödemesi sitede alınmış eski siparişlerin bağlantıları (?t=) mevcut içerik formuna taşınır. */
export default async function Page({ searchParams }: { searchParams: Promise<{ t?: string | string[] }> }) {
  const { t } = await searchParams;
  const token = typeof t === "string" ? t : "";
  if (token && RX.token.test(token)) redirect(`/icerik-formu?t=${encodeURIComponent(token)}`);
  return (
    <main id="main" className="container-x lead-page">
      <div className="lead-head">
        <Crumbs items={[{ label: "Proje Başlangıç Formu" }]} />
        <h1 className="h-1">Web siteniz için içerik ve materyalleri paylaşın.</h1>
        <p className="lead">
          Üzerinde anlaştığımız çalışmaya hızla başlamak için işletme bilgilerinizi, hizmet detaylarınızı ve kullanım hakkına sahip olduğunuz görselleri
          iletin. Henüz hazır olmayan içerikleri formda belirtebilirsiniz.
        </p>
      </div>
      {token ? (
        <div className="form-msg bad" role="alert">
          Bu bağlantının süresi dolmuş olabilir. Yeni bağlantı talep etmek için proje numaranızla bize yazın.
        </div>
      ) : (
        <ProjectStart />
      )}
    </main>
  );
}
