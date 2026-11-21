"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { COOKIE_CONSENT_KEY, GA_MEASUREMENT_ID, type CookieConsent } from "@/lib/analytics";
import { LS } from "@/lib/storage";

/* Çerez tercih paneli. Yalnızca sitede fiilen kullanılan kategoriler gösterilir: "Gerekli" her
   zaman, "Analitik" yalnızca GA4 kimliği tanımlıysa. Pazarlama çerezi kullanılmadığı için yer almaz.
   Alt bilgideki "Çerez Tercihleri" bağlantısı OPEN_EVENT olayıyla paneli yeniden açar. */
export const OPEN_EVENT = "vitrin:cookie-prefs";

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

export function openCookiePrefs() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function CookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    /* localStorage sunucuda yok; ilk render sunucuyla eşleşsin diye tercih yalnızca bağlanma sonrası okunur. */
    const c = LS.get<CookieConsent>(COOKIE_CONSENT_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(c);
    setAnalytics(c === "accepted");
    setOpen(!!GA_MEASUREMENT_ID && !c);
    setReady(true);
    const reopen = () => {
      setOpen(true);
      setEdit(true);
      setSaved(false);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  if (!ready) return null;

  const choose = (c: CookieConsent) => {
    LS.set(COOKIE_CONSENT_KEY, c);
    setConsent(c);
    setAnalytics(c === "accepted");
    setSaved(true);
    setEdit(false);
    window.setTimeout(() => {
      setOpen(false);
      setSaved(false);
    }, 1600);
  };

  return (
    <>
      {consent === "accepted" && GA_MEASUREMENT_ID && <GoogleAnalytics />}
      {open && (
        <div className="cookie-bar" role="dialog" aria-modal="false" aria-labelledby="ck-title">
          <div className="cookie-in">
            <p className="cookie-t" id="ck-title">
              Çerez tercihlerinizi yönetin.
            </p>
            {saved ? (
              <p className="cookie-ok" role="status">
                Çerez tercihleriniz kaydedildi.
              </p>
            ) : (
              <>
                <p>
                  Sitenin temel işleyişi için zorunlu çerezler kullanılır. Diğer çerez kategorilerine ilişkin tercihlerinizi bu panel üzerinden dilediğiniz
                  zaman güncelleyebilirsiniz. <Link href="/yasal/cerez">Çerez Politikası</Link>
                </p>
                {edit && (
                  <ul className="cookie-cats">
                    <li>
                      <label>
                        <input type="checkbox" checked disabled />
                        <span>
                          <b>Gerekli</b> Sitenin çalışması ve tercihlerinizin hatırlanması için. Kapatılamaz.
                        </span>
                      </label>
                    </li>
                    {GA_MEASUREMENT_ID && (
                      <li>
                        <label>
                          <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
                          <span>
                            <b>Analitik</b> Ziyaret istatistiklerini anonim olarak ölçmek için (Google Analytics).
                          </span>
                        </label>
                      </li>
                    )}
                  </ul>
                )}
                <div className="cookie-bar-btns">
                  {GA_MEASUREMENT_ID ? (
                    <>
                      <button className="btn btn-line btn-sm" onClick={() => choose("rejected")}>
                        Yalnızca Gerekli Çerezler
                      </button>
                      {edit ? (
                        <button className="btn btn-line btn-sm" onClick={() => choose(analytics ? "accepted" : "rejected")}>
                          Tercihlerimi Kaydet
                        </button>
                      ) : (
                        <button className="btn btn-line btn-sm" onClick={() => setEdit(true)}>
                          Tercihlerimi Düzenle
                        </button>
                      )}
                      <button className="btn btn-primary btn-sm" onClick={() => choose("accepted")}>
                        Tümüne İzin Ver
                      </button>
                    </>
                  ) : (
                    <button className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>
                      Kapat
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const ROWS_REQUIRED: string[][] = [
  [
    "vitrin:cookie-consent",
    "Vitrinweb",
    "Çerez tercihinizi hatırlar.",
    "Siz silene kadar",
    "Yerel depolama · Gerekli",
    "Meşru menfaat (KVKK m. 5/2-f)",
    "Aktarım yok",
  ],
  [
    "vitrin:sent-forms",
    "Vitrinweb",
    "Aynı formun yanlışlıkla iki kez gönderilmesini önler; yalnızca özet kodu içerir.",
    "Sekme kapanana kadar (en çok 30 dk)",
    "Oturum depolaması · Gerekli",
    "Meşru menfaat (KVKK m. 5/2-f)",
    "Aktarım yok",
  ],
  [
    "vitrin:draft, vitrin:active",
    "Vitrinweb",
    "Önceki dönemde başlatılmış bir siparişe dönebilmenizi sağlar.",
    "En çok 7 gün",
    "Yerel depolama · Gerekli",
    "Sözleşmenin kurulması veya ifası (KVKK m. 5/2-c)",
    "Aktarım yok",
  ],
];
const ROWS_ANALYTICS: string[][] = [
  [
    "_ga, _ga_*",
    "Google LLC",
    "Ziyaretçi sayısı ve sayfa kullanımını anonim olarak ölçer.",
    "2 yıla kadar",
    "Çerez · Analitik",
    "Açık rıza (KVKK m. 5/1)",
    "Yurt dışına aktarım (ABD), KVKK m. 9 kapsamında",
  ],
];

export function CookieTable() {
  const rows = [...ROWS_REQUIRED, ...(GA_MEASUREMENT_ID ? ROWS_ANALYTICS : [])];
  return (
    <div className="ck-table">
      <div className="ck-table-w">
        <table>
          <thead>
            <tr>
              {["Ad", "Sağlayıcı", "Amaç", "Süre", "Tür", "Hukuki sebep", "Uygulanabilir aktarım bilgisi"].map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>
                {r.map((c, i) => (i === 0 ? <th key={i} scope="row"><code>{c}</code></th> : <td key={i}>{c}</td>))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!GA_MEASUREMENT_ID && <p className="fine">Sitede şu anda analitik veya pazarlama çerezi kullanılmamaktadır.</p>}
      <button type="button" className="btn btn-line" onClick={openCookiePrefs}>
        Çerez Tercihlerimi Değiştir
      </button>
    </div>
  );
}
