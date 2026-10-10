"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { COOKIE_CONSENT_KEY, GA_MEASUREMENT_ID, type CookieConsent } from "@/lib/analytics";
import { LS } from "@/lib/storage";

function GoogleAnalytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}

export function CookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    /* localStorage sunucuda yok; ilk render sunucuyla eşleşsin diye tercih yalnızca
       bağlanma sonrası bir efektte okunur (bkz. order-context.tsx'teki aynı desen). */
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(LS.get<CookieConsent>(COOKIE_CONSENT_KEY));
    setReady(true);
  }, []);

  if (!GA_MEASUREMENT_ID) return null;
  if (!ready) return null; /* ilk render sunucuyla eşleşsin, hydration uyuşmazlığı olmasın */
  if (consent === "accepted") return <GoogleAnalytics />;
  if (consent === "rejected") return null;

  const choose = (c: CookieConsent) => {
    LS.set(COOKIE_CONSENT_KEY, c);
    setConsent(c);
  };

  return (
    <div className="cookie-bar" role="dialog" aria-label="Çerez onayı">
      <p>
        Deneyiminizi anlamamıza yardımcı olacak analiz çerezleri kullanmak istiyoruz. Reddederseniz hiçbir analiz
        çerezi çalışmaz.{" "}
        <a href="/yasal/cerez" target="_blank" rel="noopener noreferrer">
          Çerez Politikası
        </a>
      </p>
      <div className="cookie-bar-btns">
        <button className="btn btn-line" onClick={() => choose("rejected")}>
          Reddet
        </button>
        <button className="btn btn-primary" onClick={() => choose("accepted")}>
          Kabul Et
        </button>
      </div>
    </div>
  );
}
