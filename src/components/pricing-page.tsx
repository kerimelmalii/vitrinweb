"use client";

import { AnnualService, FAQ, FinalCTA, PaymentTrust } from "@/components/home";
import { OfferPanel } from "@/components/offer-panel";
import { SectionHead } from "@/components/section-head";
import { ADDONS, QUOTE_ADDONS } from "@/data/content";
import { BASE_PRICE, TL } from "@/lib/config";
import { useApp } from "@/lib/order-context";

function AddonPriceList() {
  return (
    <div className="plist">
      {ADDONS.map((a) => (
        <div className="plist-r" key={a.id}>
          <b>{a.name}</b>
          <span className="p">+{TL(a.price)}</span>
          <small>{a.d}</small>
        </div>
      ))}
      {QUOTE_ADDONS.map((a) => (
        <div className="plist-r" key={a.id}>
          <b>{a.name}</b>
          <span className="p q">Teklif ile</span>
          <small>{a.d}</small>
        </div>
      ))}
    </div>
  );
}

export function PricingPage() {
  const { startCheckout } = useApp();
  return (
    <main id="main">
      <section className="sec" style={{ paddingBottom: "30px" }}>
        <div className="container-x">
          <h1 className="h-1" style={{ maxWidth: "18ch" }}>
            Net fiyat. Şeffaf süreç.
          </h1>
          <p className="lead" style={{ marginTop: "16px" }}>
            Temel web sitesi {TL(BASE_PRICE)}. İhtiyacınıza göre ek özellikler ekleyin.
          </p>
          <div style={{ marginTop: "40px" }}>
            <OfferPanel
              heading="Temel paket"
              cta={
                <button
                  className="btn btn-primary btn-lg btn-block"
                  style={{ maxWidth: "520px" }}
                  onClick={() => startCheckout()}
                >
                  Web Sitesi Edinin
                </button>
              }
            />
          </div>
        </div>
      </section>
      <PaymentTrust />
      <section className="sec" style={{ paddingTop: "50px" }}>
        <div className="container-x">
          <SectionHead
            title="Ek özellik fiyatları"
            sub="İhtiyacınız olanları sipariş sırasında seçersiniz; toplam, seçtikçe güncellenir."
            right={
              <button className="btn btn-primary" onClick={() => startCheckout()}>
                Paketinizi Oluşturun
              </button>
            }
          />
          <AddonPriceList />
          <p className="fine" style={{ marginTop: "16px" }}>
            Teklif ile fiyatlanan özellikler sipariş tutarına eklenmez. Size teklif ilettiğimizde onaylarsanız ayrıca
            ödersiniz.
          </p>
        </div>
      </section>
      <AnnualService />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
