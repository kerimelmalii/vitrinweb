"use client";

import { useEffect, useState } from "react";
import { COMPANY, isPlaceholder } from "@/data/company";

/* Sayfanın ana içeriğinin önüne geçmemesi için ikincil, kapalı başlayan bir
   açılır/kapanır bölüm. MERSİS ve KEP hâlâ köşeli parantezli yer tutucuysa
   (yani henüz doğrulanmış bir değer girilmediyse) o satırlar hiç gösterilmez;
   gerçek değer company.ts'e girilince otomatik görünür hale gelir. Telefon
   numarası, vergi bilgileri ve kişisel bilgiler bilerek burada yer almaz. */
export function LegalCompanyInfo() {
  const [open, setOpen] = useState(false);
  /* Sunucuda üretilen HTML her zaman kapalı başlar (hydration uyuşmazlığı
     olmasın diye); #sirket-bilgileri bağlantısıyla gelindiyse mount sonrası
     (Next.js'in istemci tarafı yönlendirmesi URL'i güncelledikten sonra) açılır. */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- #sirket-bilgileri ile gelince açık başlasın
    if (window.location.hash === "#sirket-bilgileri") setOpen(true);
  }, []);
  const rows: [string, string][] = [
    ["Ticaret Unvanı", COMPANY.title],
    ["Marka", COMPANY.brand],
    ["Merkez Adresi", COMPANY.address],
    ["Ticaret Sicil No", COMPANY.tradeRegistryNo],
    ["Kayıtlı Olunan Oda", COMPANY.registryOffice],
  ];
  if (!isPlaceholder(COMPANY.mersis)) rows.push(["MERSİS No", COMPANY.mersis]);
  if (!isPlaceholder(COMPANY.kep)) rows.push(["KEP Adresi", COMPANY.kep]);

  return (
    <div className={"acc-item " + (open ? "open" : "")} id="sirket-bilgileri">
      <button className="acc-h" aria-expanded={open} aria-controls="sirket-bilgileri-body" onClick={() => setOpen((o) => !o)}>
        <span>Yasal ve Şirket Bilgileri</span>
        <span className="acc-plus" aria-hidden="true">
          <i></i>
          <i></i>
        </span>
      </button>
      <div className="acc-body" id="sirket-bilgileri-body">
        <div>
          <dl className="acc-rows">
            {rows.map(([label, value]) => (
              <div className="acc-row" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
            <div className="acc-row">
              <dt>E-posta</dt>
              <dd>
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
