"use client";

import Link from "next/link";
import { Stepper } from "@/components/checkout/stepper";
import { QuoteNote } from "@/components/addons";
import { Icon } from "@/components/icons";
import { useApp } from "@/lib/order-context";

export function SuccessStep() {
  const { order } = useApp();
  const items: [string, string, "done" | "cur" | "up"][] = [
    ["Bilgilerinizi aldık", "Sipariş ve ödeme kaydedildi.", "done"],
    ["İçeriklerinizi bekliyoruz", "Logo, metin ve görselleri proje formundan gönderin.", "cur"],
    ["Tasarım süreci başlıyor", "İçerikleriniz bize ulaşınca tasarıma başlarız.", "up"],
    ["Web siteniz yayına hazırlanıyor", "Onayınızla yayına alırız.", "up"],
  ];
  return (
    <main id="main" className="container-x co">
      <Stepper step={4} />
      <div className="ok-wrap">
        <svg className="ok-ring" viewBox="0 0 96 96" aria-hidden="true">
          <circle cx="48" cy="48" r="46" />
          <path d="M28 50l14 14 27-30" />
        </svg>
        <h1 className="h-1">Teşekkürler, siparişiniz alındı.</h1>
        <p className="lead" style={{ marginTop: "12px" }}>
          Ödemeniz onaylandı. Sipariş onayınız ve sözleşmenizin bir örneği e-posta adresinize gönderilir. Sıradaki
          adım, web siteniz için içeriklerinizi iletmek.
        </p>
        <div className="ordno">
          Sipariş No: <b>#{order.orderNo}</b>
        </div>
        <div style={{ maxWidth: "560px" }}>
          <QuoteNote quotes={order.quotes} after />
        </div>
        <ol className="tl" aria-label="Sonraki aşamalar">
          {items.map((s, i) => (
            <li key={i} className={s[2]}>
              <span className="n">{s[2] === "done" ? <Icon n="check" size={18} sw={3} /> : "0" + (i + 1)}</span>
              <div>
                <b>{s[0]}</b>
                <span>{s[1]}</span>
              </div>
            </li>
          ))}
        </ol>
        <Link
          className="btn btn-primary btn-lg"
          href={order.accessToken ? "/icerik-formu?t=" + order.accessToken : "/icerik-formu"}
        >
          İçerik Formuna Geçin
        </Link>
      </div>
    </main>
  );
}
