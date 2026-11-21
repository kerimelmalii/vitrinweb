"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Icon } from "@/components/icons";
import { LeadForm } from "@/components/lead-form";
import { WhatsAppButton } from "@/components/ui";
import { COMPANY } from "@/data/company";
import { getProduct, interestLabel } from "@/data/products";

function useInit() {
  const sp = useSearchParams();
  const product = sp.get("urun") || "";
  const sector = sp.get("sektor") || "";
  const service = sp.get("hizmet") || "";
  const message = (sp.get("not") || "").slice(0, 1000);
  return useMemo(() => ({ product, sector, service, message }), [product, sector, service, message]);
}

function Aside({ kesif }: { kesif?: boolean }) {
  return (
    <aside className="lead-aside">
      <div>
        <h2 className="h-3">Başka bir kanal mı tercih edersiniz?</h2>
        <p>Formu doldurmak yerine bize doğrudan yazabilirsiniz.</p>
        <WhatsAppButton cls="btn btn-line btn-block" />
        <a className="btn btn-line btn-block" href={`mailto:${COMPANY.email}`}>
          <Icon n="mail" size={18} /> E-posta Gönderin
        </a>
      </div>
      <div>
        <h2 className="h-3">{kesif ? "Görüşmeye nasıl hazırlanmalı?" : "Kısa bir görüşme ister misiniz?"}</h2>
        {kesif ? (
          <p>
            Mevcut bir iş akışının kısa özeti, kullandığınız araçların listesi, örnek bir tablo yapısı veya ekranda görmek istediğiniz üç temel bilgi
            yeterlidir. Paylaştığınız örneklerden kişisel verileri ve erişim şifrelerini çıkarın.
          </p>
        ) : (
          <>
            <p>İşletmenizde en çok zaman alan süreci 15 dakikalık bir keşif görüşmesinde birlikte değerlendirelim.</p>
            <Link className="linkb" href="/kesif-gorusmesi">
              Keşif Görüşmesi Planlayın
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}

export function BilgiAlPage() {
  const init = useInit();
  const [picked, setPicked] = useState<string | null>(null);
  const slug = picked ?? init.product;
  const p = getProduct(init.product);
  const label = interestLabel(slug);
  return (
    <main id="main" className="container-x lead-page">
      <div className="lead-head">
        <p className="eyebrow">Bilgi Alın</p>
        <h1 className="h-1">{p ? `${p.name} hakkında bilgi ve kapsam alın.` : "Hangi çözümümüz hakkında bilgi almak istersiniz?"}</h1>
        <p className="lead">
          İlgilendiğiniz ürünü seçin ve çözmek istediğiniz ihtiyacı kısaca paylaşın. Tercih ettiğiniz iletişim kanalından size dönüş yapalım.
        </p>
        {label && picked !== null && picked !== init.product && <p className="fine">Seçiminiz: {label}</p>}
      </div>
      <div className="lead-wrap">
        <LeadForm init={init} onProduct={setPicked} />
        <Aside />
      </div>
    </main>
  );
}

export function KesifPage() {
  const init = useInit();
  return (
    <main id="main" className="container-x lead-page">
      <div className="lead-head">
        <p className="eyebrow">Keşif Görüşmesi</p>
        <h1 className="h-1">İlk görüşmede hangi sürecinize odaklanalım?</h1>
        <p className="lead">
          Mevcut iş akışınızı, kullandığınız araçları ve hedeflediğiniz sonucu kısaca paylaşın. Aklınızda belirli bir ürün varsa seçebilir, henüz karar
          vermediyseniz ihtiyacınızı tarif edebilirsiniz.
        </p>
      </div>
      <div className="lead-wrap">
        <LeadForm mode="kesif" init={init} />
        <Aside kesif />
      </div>
    </main>
  );
}
