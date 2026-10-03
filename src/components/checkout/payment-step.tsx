"use client";

import Image from "next/image";
import { useState } from "react";
import { Field, Inp } from "@/components/checkout/fields";
import { Shell } from "@/components/checkout/stepper";
import { Icon } from "@/components/icons";
import { OrderSummary } from "@/components/order-summary";
import { TL, VAT_NOTE } from "@/lib/config";
import { useApp } from "@/lib/order-context";
import { Backend, buildRecord } from "@/lib/backend";
import { LS } from "@/lib/storage";
import { sendOrderToWebhook } from "@/lib/order-webhook";
import { sendOrderToSupabase } from "@/lib/supabase-order";
import { PaymentProvider } from "@/lib/payment";
import { pricing } from "@/lib/pricing";
import { LIMITS, token, validTCKN } from "@/lib/security";
import { BASE_PATH } from "@/lib/site";
import type { Invoice } from "@/lib/types";

const fmtCard = (v: string) =>
  v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
const fmtExp = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
};

interface Card {
  name: string;
  number: string;
  exp: string;
  cvv: string;
}

/* Üretimde bu bileşen sağlayıcının barındırılan ödeme formuyla (iframe / yönlendirme) değişir. */
function DemoCardForm({
  card,
  setCard,
  err,
  fix,
}: {
  card: Card;
  setCard: (c: Card) => void;
  err: Record<string, string | undefined>;
  fix: (k: string) => void;
}) {
  return (
    <>
      <Field id="c-name" label="Kart üzerindeki isim" error={err.cname}>
        <Inp
          id="c-name"
          value={card.name}
          maxLength={60}
          onValue={(v) => {
            setCard({ ...card, name: v });
            fix("cname");
          }}
          error={err.cname}
          autoComplete="cc-name"
        />
      </Field>
      <Field id="c-num" label="Kart numarası" error={err.cnum}>
        <Inp
          id="c-num"
          inputMode="numeric"
          value={card.number}
          onValue={(v) => {
            setCard({ ...card, number: fmtCard(v) });
            fix("cnum");
          }}
          error={err.cnum}
          autoComplete="cc-number"
          placeholder="0000 0000 0000 0000"
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field id="c-exp" label="Son kullanma tarihi" error={err.cexp}>
          <Inp
            id="c-exp"
            inputMode="numeric"
            value={card.exp}
            onValue={(v) => {
              setCard({ ...card, exp: fmtExp(v) });
              fix("cexp");
            }}
            error={err.cexp}
            autoComplete="cc-exp"
            placeholder="AA/YY"
          />
        </Field>
        <Field id="c-cvv" label="CVV" error={err.ccvv}>
          <Inp
            id="c-cvv"
            inputMode="numeric"
            value={card.cvv}
            type="password"
            onValue={(v) => {
              setCard({ ...card, cvv: v.replace(/\D/g, "").slice(0, 4) });
              fix("ccvv");
            }}
            error={err.ccvv}
            autoComplete="cc-csc"
            placeholder="123"
          />
        </Field>
      </div>
    </>
  );
}

export function PaymentStep() {
  const { order, patch, openLegal } = useApp();
  const p = pricing(order.addons);
  const inv = order.invoice;
  const [err, setErr] = useState<Record<string, string | undefined>>({});
  const fix = (k: string) => setErr((e) => (e[k] ? { ...e, [k]: undefined } : e));
  const errKey: Record<string, string> = { title: "ititle", taxId: "itax", taxOffice: "ioffice", address: "iaddr" };
  const setInv = (k: keyof Invoice, v: string) => {
    patch((o) => ({ invoice: { ...o.invoice, [k]: v } }));
    if (errKey[k]) fix(errKey[k]);
  };
  /* Ardışık reddedilen denemelerden sonra kısa bekleme (sunucu tarafında da hız sınırı uygulanır). */
  const [fails, setFails] = useState(0);
  const [lock, setLock] = useState(0);
  const [card, setCard] = useState<Card>({ name: "", number: "", exp: "", cvv: "" });
  const [ok, setOk] = useState({ kvkk: false, distance: false, terms: false, marketing: false });
  const corp = inv.type === "kurumsal";
  const [busy, setBusy] = useState(false);
  const [payErr, setPayErr] = useState("");

  const validate = (): Record<string, string | undefined> => {
    const e: Record<string, string | undefined> = {};
    if (card.name.trim().length < 3) e.cname = "Kart üzerindeki ismi girin.";
    if (card.number.replace(/\s/g, "").length !== 16) e.cnum = "16 haneli kart numarasını girin.";
    const m = /^(\d{2})\/(\d{2})$/.exec(card.exp);
    const now = new Date();
    if (!m || +m[1] < 1 || +m[1] > 12 || (2000 + +m[2]) * 12 + +m[1] < now.getFullYear() * 12 + now.getMonth() + 1)
      e.cexp = "Geçerli bir tarih girin.";
    if (card.cvv.length < 3) e.ccvv = "CVV 3 veya 4 haneli olmalı.";
    if (inv.title.trim().length < 2) e.ititle = corp ? "Şirket ünvanını girin." : "Fatura için ad soyad girin.";
    const t = inv.taxId.replace(/\D/g, "");
    if (corp) {
      if (t.length !== 10) e.itax = "10 haneli vergi numarasını girin.";
      if (inv.taxOffice.trim().length < 2) e.ioffice = "Vergi dairesini girin.";
    } else if (!validTCKN(t)) e.itax = "Geçerli bir 11 haneli T.C. kimlik numarası girin.";
    if (inv.address.trim().length < 8) e.iaddr = "Fatura adresinizi girin.";
    if (!ok.kvkk || !ok.distance || !ok.terms) e.consent = "Devam etmek için zorunlu onay kutularını işaretleyin.";
    return e;
  };

  const pay = async () => {
    if (busy || lock) return;
    const e = validate();
    setErr(e);
    if (Object.keys(e).length) {
      const f = document.querySelector('[aria-invalid="true"]') as HTMLElement | null;
      if (f && f.focus) f.focus();
      return;
    }
    setBusy(true);
    setPayErr("");
    const consents = { kvkk: true, distance: true, terms: true, marketing: !!ok.marketing, at: new Date().toISOString() };
    try {
      await Backend.upsert(buildRecord({ ...order, consents, status: "payment_started" }));
      patch({ status: "payment_started" });
      const session = await PaymentProvider.createSession({ id: order.id, amount: p.total });
      const res = await PaymentProvider.confirm(session, card);
      if (!res.ok) {
        await Backend.upsert(buildRecord({ ...order, consents, status: "pending" }));
        const n = fails + 1;
        setFails(n);
        patch({ status: "pending" });
        setBusy(false);
        if (n >= 3) {
          setLock(1);
          setPayErr("Üst üste 3 deneme reddedildi. Güvenliğiniz için 30 saniye sonra tekrar deneyin.");
          setTimeout(() => {
            setLock(0);
            setFails(0);
          }, 30000);
        } else setPayErr(res.reason);
        return;
      }
      /* Proje formuna erişim anahtarı. Üretimde sunucu üretir, özetini saklar ve e-postayla gönderir. */
      const accessToken = token(24);
      const paid = { ...order, consents, accessToken, status: "paid" as const, project: "Bilgiler Bekleniyor" as const, paymentRef: res.ref };
      const record = buildRecord(paid);
      await Backend.upsert(record);
      LS.del("vitrin:draft");
      sendOrderToWebhook(record);
      sendOrderToSupabase(record);
      patch({ consents, accessToken, status: "paid", project: "Bilgiler Bekleniyor", paymentRef: res.ref, step: 4 });
      setCard({ name: "", number: "", exp: "", cvv: "" });
      window.scrollTo({ top: 0 });
    } catch {
      setPayErr("Bir sorun oluştu. Ödeme alınmadı, lütfen tekrar deneyin.");
      patch({ status: "pending" });
    }
    setBusy(false);
  };

  const summary = (
    <>
      <OrderSummary title="Sipariş Özeti" />
      <div className="panel" style={{ marginTop: "14px", fontSize: ".92rem" }}>
        <b>{order.info.name}</b>
        <br />
        {order.info.brand}
        <br />
        <span className="mute">{order.info.email}</span>
        <br />
        <button
          className="linkb"
          style={{ background: "none", border: 0, padding: 0, marginTop: "8px", color: "var(--brand)", fontWeight: 600, cursor: "pointer" }}
          onClick={() => {
            patch({ step: 1 });
            window.scrollTo({ top: 0 });
          }}
        >
          Bilgileri düzenle
        </button>
        <span className="mute"> · </span>
        <button
          style={{ background: "none", border: 0, padding: 0, color: "var(--brand)", fontWeight: 600, cursor: "pointer" }}
          onClick={() => {
            patch({ step: 2 });
            window.scrollTo({ top: 0 });
          }}
        >
          Paketi düzenle
        </button>
      </div>
    </>
  );

  return (
    <Shell
      step={3}
      asideLeft
      title="Siparişinizi tamamlayın."
      sub="Ödeme bilgilerinizi ve fatura bilgilerinizi girin. Ödemeden hemen sonra proje başlangıç formuna geçersiniz."
      aside={summary}
      hint="Sıradaki adım: ödeme onaylandığında sipariş numaranızı alır ve içeriklerinizi göndereceğiniz forma geçersiniz."
    >
      <div className="panel">
        <h2 className="h-3">Ödeme Bilgileri</h2>
        <div className="demo-note">
          <Icon n="info" size={18} />
          <span>
            <b>Demo ortamı:</b> Gerçek ödeme alınmaz ve kart bilgileri hiçbir yere gönderilmez. Herhangi bir geçerli
            formatlı kart çalışır; 0002 ile biten kart reddedilir. Bireysel fatura için test T.C. kimlik no:
            10000000146.
          </span>
        </div>
        <DemoCardForm card={card} setCard={setCard} err={err} fix={fix} />
      </div>
      <div className="panel">
        <h2 className="h-3" style={{ marginBottom: "14px" }}>
          Fatura Bilgileri
        </h2>
        <div className="seg" role="group" aria-label="Fatura türü">
          {(
            [
              ["bireysel", "Bireysel"],
              ["kurumsal", "Kurumsal"],
            ] as const
          ).map((t) => (
            <button
              type="button"
              key={t[0]}
              className={inv.type === t[0] ? "on" : ""}
              aria-pressed={inv.type === t[0]}
              onClick={() => {
                if (inv.type !== t[0]) {
                  patch((o) => ({ invoice: { ...o.invoice, type: t[0], taxId: "", taxOffice: "" } }));
                  setErr((x) => ({ ...x, itax: undefined, ioffice: undefined }));
                }
              }}
            >
              {t[1]}
            </button>
          ))}
        </div>
        <Field id="i-title" label={corp ? "Şirket ünvanı" : "Ad soyad"} error={err.ititle}>
          <Inp
            id="i-title"
            maxLength={LIMITS.invTitle}
            value={inv.title}
            onValue={(v) => setInv("title", v)}
            error={err.ititle}
            placeholder={corp ? order.info.brand : order.info.name}
            autoComplete={corp ? "organization" : "name"}
          />
        </Field>
        {corp ? (
          <div className="grid sm:grid-cols-2 gap-x-4">
            <Field id="i-tax" label="Vergi numarası" error={err.itax}>
              <Inp
                id="i-tax"
                inputMode="numeric"
                value={inv.taxId}
                onValue={(v) => setInv("taxId", v.replace(/\D/g, "").slice(0, 10))}
                error={err.itax}
              />
            </Field>
            <Field id="i-office" label="Vergi dairesi" error={err.ioffice}>
              <Inp id="i-office" maxLength={LIMITS.taxOffice} value={inv.taxOffice} onValue={(v) => setInv("taxOffice", v)} error={err.ioffice} />
            </Field>
          </div>
        ) : (
          <Field
            id="i-tax"
            label="T.C. kimlik numarası"
            error={err.itax}
            hint="Faturanız için yasal olarak gereklidir; yalnızca bu amaçla kullanılır."
          >
            <Inp
              id="i-tax"
              inputMode="numeric"
              value={inv.taxId}
              onValue={(v) => setInv("taxId", v.replace(/\D/g, "").slice(0, 11))}
              error={err.itax}
            />
          </Field>
        )}
        <Field id="i-addr" label="Fatura adresi" error={err.iaddr}>
          <textarea
            className="input"
            maxLength={LIMITS.address}
            id="i-addr"
            style={{ minHeight: "84px" }}
            value={inv.address}
            aria-invalid={!!err.iaddr}
            onChange={(e) => setInv("address", e.target.value)}
          ></textarea>
        </Field>
        <label className="consent">
          <input
            type="checkbox"
            checked={ok.kvkk}
            onChange={(e) => {
              setOk({ ...ok, kvkk: e.target.checked });
              fix("consent");
            }}
          />
          <span>
            <button type="button" onClick={() => openLegal("kvkk")}>
              KVKK Aydınlatma Metni
            </button>
            &apos;ni okudum, kişisel verilerimin işlenmesi hakkında bilgilendirildim.
          </span>
        </label>
        <label className="consent">
          <input
            type="checkbox"
            checked={ok.distance}
            onChange={(e) => {
              setOk({ ...ok, distance: e.target.checked });
              fix("consent");
            }}
          />
          <span>
            <button type="button" onClick={() => openLegal("mesafeli")}>
              Ön Bilgilendirme Formu ve Mesafeli Satış Sözleşmesi
            </button>
            &apos;ni okudum ve onaylıyorum.
          </span>
        </label>
        <label className="consent">
          <input
            type="checkbox"
            checked={ok.terms}
            onChange={(e) => {
              setOk({ ...ok, terms: e.target.checked });
              fix("consent");
            }}
          />
          <span>
            <button type="button" onClick={() => openLegal("kosullar")}>
              Kullanım Koşulları
            </button>
            &apos;nı okudum ve kabul ediyorum.
          </span>
        </label>
        <label className="consent opt">
          <input type="checkbox" checked={ok.marketing} onChange={(e) => setOk({ ...ok, marketing: e.target.checked })} />
          <span>
            Kampanya ve duyurulardan e-posta ve SMS ile haberdar olmak istiyorum.{" "}
            <button type="button" onClick={() => openLegal("ileti")}>
              Ticari Elektronik İleti Onay Metni
            </button>{" "}
            (isteğe bağlı)
          </span>
        </label>
        {err.consent && (
          <p className="err" role="alert">
            {err.consent}
          </p>
        )}
        <button className="btn btn-primary btn-lg btn-block" style={{ marginTop: "18px" }} disabled={busy || !!lock} onClick={pay}>
          {busy ? (
            <>
              <span className="spin"></span>İşleniyor
            </>
          ) : (
            TL(p.total) + " Öde"
          )}
        </button>
        <p className="fine" style={{ textAlign: "center", marginTop: "8px" }}>
          Tutar {VAT_NOTE}. Butona bastığınızda ödeme yükümlülüğü doğar.
        </p>
        {payErr && (
          <div className="payerr" role="alert">
            {payErr}
          </div>
        )}
        <div className="secure">
          <Icon n="lock" size={16} /> Güvenli ödeme
        </div>
        <p className="fine" style={{ textAlign: "center", marginTop: "6px" }}>
          Ödeme bilgileriniz güvenli ödeme altyapısı üzerinden işlenir.
        </p>
        <Image
          className="pay-badge"
          style={{ display: "block", margin: "10px auto 0" }}
          src={`${BASE_PATH}/odeme-yontemleri.png`}
          alt="iyzico ile Öde — Mastercard, Visa, American Express, Troy"
          width={429}
          height={32}
        />
        <div className="trustrow" style={{ marginTop: "14px" }}>
          {["İlk yıl servis ücretsiz", "Şeffaf fiyatlandırma", "Mobil uyumlu"].map((t) => (
            <span key={t}>
              <Icon n="check" size={14} sw={2.5} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </Shell>
  );
}
