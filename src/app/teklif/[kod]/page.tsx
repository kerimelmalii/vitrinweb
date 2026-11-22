import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { COMPANY, WHATSAPP_URL } from "@/data/company";
import { gecerlilikMetni, getTeklif } from "@/data/teklifler";

/* Her istekte geçerlilik kontrol edilir; süresi dolan teklif önbellekten sunulmasın. */
export const dynamic = "force-dynamic";

const ROBOTS: Metadata["robots"] = { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } };

export async function generateMetadata({ params }: { params: Promise<{ kod: string }> }): Promise<Metadata> {
  const t = getTeklif((await params).kod);
  if (!t) return { title: { absolute: "Teklif bulunamadı | Vitrinweb" }, robots: ROBOTS };
  return { title: { absolute: `${t.musteri} · ${t.baslik} | Vitrinweb` }, description: t.ozet, robots: ROBOTS, referrer: "no-referrer" };
}

export default async function Page({ params }: { params: Promise<{ kod: string }> }) {
  const t = getTeklif((await params).kod);
  if (!t) notFound();
  const wa = WHATSAPP_URL
    ? WHATSAPP_URL.replace(/text=[^&]*/, `text=${encodeURIComponent(`Merhaba, ${t.musteri} için hazırladığınız teklif hakkında görüşmek istiyorum.`)}`)
    : "";
  return (
    <main id="main" className="tk">
      <section className="sec page-top">
        <div className="container-x">
          <p className="tk-eyebrow">
            {t.musteri} · Proje teklifi
          </p>
          <h1 className="h-1 page-h">{t.baslik}</h1>
          <p className="lead what-is">{t.ozet}</p>
          {t.hitap && (
            <div className="tk-letter">
              <b>{t.hitap.ad}</b>
              <p>{t.hitap.metin}</p>
              <p className="tk-sign">Saygılarımızla, Vitrinweb</p>
            </div>
          )}
          <dl className="tk-meta">
            <div>
              <dt>Hazırlanan</dt>
              <dd>
                {t.musteri} {t.musteriAlt}
              </dd>
            </div>
            <div>
              <dt>Teklif tarihi</dt>
              <dd>{t.tarih}</dd>
            </div>
            <div>
              <dt>Geçerlilik</dt>
              <dd>{gecerlilikMetni(t.gecerlilik)}</dd>
            </div>
            <div>
              <dt>Hazırlayan</dt>
              <dd>Vitrinweb</dd>
            </div>
          </dl>
          <div className="tk-total">
            <span>Toplam proje bedeli</span>
            <b>{t.toplam}</b>
            {t.haricNotu && <small className="tk-excl">{t.haricNotu}</small>}
            <a className="btn btn-lg tk-pay" href="#odeme">
              Ödeme Planını Görün
            </a>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="tk-yaklasim">
        <div className="container-x story">
          <h2 className="h-2" id="tk-yaklasim">
            Projeye yaklaşımımız
          </h2>
          <p className="what-is">{t.yaklasim}</p>
        </div>
      </section>

      <section className="sec sec-tint" aria-labelledby="tk-kapsam">
        <div className="container-x">
          <h2 className="h-2" id="tk-kapsam">
            Proje kapsamı
          </h2>
          <p className="lead what-is">{t.kapsamGiris}</p>
          <ol className="steps steps-3" style={{ marginTop: 24 }}>
            {t.kapsam.map((k, i) => (
              <li key={k.t}>
                <span className="steps-n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="h-3">{k.t}</h3>
                <p>{k.d}</p>
              </li>
            ))}
          </ol>
          {t.incelenenSite && (
            <p className="fine" style={{ marginTop: 18 }}>
              İncelenen mevcut site:{" "}
              <a href={t.incelenenSite.url} target="_blank" rel="noopener noreferrer">
                {t.incelenenSite.ad}
              </a>
            </p>
          )}
        </div>
      </section>

      <section className="sec" aria-labelledby="tk-takvim">
        <div className="container-x">
          <h2 className="h-2" id="tk-takvim">
            Takvim
          </h2>
          <p className="lead what-is">{t.sure}</p>
          <ol className="tk-plan">
            {t.takvim.map((x) => (
              <li key={x.hafta}>
                <span className="tk-week">{x.hafta}</span>
                <b>{x.is}</b>
                <span>{x.d}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }} id="odeme" aria-labelledby="tk-odeme">
        <div className="container-x">
          <div className="tk-paybox">
            <div className="tk-paybox-h">
              <h2 className="h-2" id="tk-odeme">
                Proje bedeli ve ödeme planı
              </h2>
              <b className="tk-chip">{t.toplam}</b>
            </div>
            <ol className="tk-installments">
              {t.odemeler.map((o) => (
                <li key={o.ne}>
                  <span>{o.ne}</span>
                  <b>
                    {o.oran} / {o.tutar}
                  </b>
                </li>
              ))}
            </ol>
            <p className="tk-note">
              {t.odemeNotu}
              {t.haricNotu && ` ${t.haricNotu}`}
            </p>
            <div className="tk-paycta">
              <div>
                <b>{t.odeme.aciklama}</b>
                <p>
                  {t.onay} İlk ödemeyi aşağıdaki bağlantıdan iyzico güvenli ödeme sayfasında yapabilirsiniz; kart bilgileriniz Vitrinweb&apos;e
                  ulaşmaz.
                </p>
              </div>
              <a className="btn btn-lg tk-pay" href={t.odeme.url} target="_blank" rel="noopener noreferrer">
                <Icon n="lock" size={18} /> {t.odeme.etiket}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec-tint" aria-labelledby="tk-kosul">
        <div className="container-x">
          <h2 className="h-2" id="tk-kosul">
            Teslim ve kapsam koşulları
          </h2>
          <dl className="tk-terms">
            {t.kosullar.map((k) => (
              <div key={k.t}>
                <dt>{k.t}</dt>
                <dd>{k.d}</dd>
              </div>
            ))}
            <div>
              <dt>Teklif geçerliliği</dt>
              <dd>{gecerlilikMetni(t.gecerlilik)}</dd>
            </div>
            <div>
              <dt>Proje onayı</dt>
              <dd>{t.onay}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="sec" aria-labelledby="tk-soru">
        <div className="container-x story">
          <h2 className="h-2" id="tk-soru">
            Sorunuz mu var?
          </h2>
          <p className="what-is">
            Kapsam, takvim ya da ödeme planıyla ilgili her sorunuzu bize iletebilirsiniz.
          </p>
          <div className="hero-cta">
            {wa && (
              <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer">
                <Icon n="whatsapp" size={18} /> WhatsApp&apos;tan Yazın
              </a>
            )}
            <a className="btn btn-line" href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(`${t.musteri} teklifi`)}`}>
              <Icon n="mail" size={18} /> E-posta Gönderin
            </a>
            <Link className="btn btn-line" href="/hakkimizda">
              Vitrinweb Hakkında
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
