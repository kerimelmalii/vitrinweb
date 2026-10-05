"use client";

import Image from "next/image";
import { useState } from "react";
import { Field, Inp } from "@/components/checkout/fields";
import { Shell } from "@/components/checkout/stepper";
import { Icon } from "@/components/icons";
import { OrderSummary } from "@/components/order-summary";
import { TL, VAT_NOTE } from "@/lib/config";
import { useApp } from "@/lib/order-context";
import { buildRecord } from "@/lib/backend";
import { sendOrderToSupabase } from "@/lib/supabase-order";
import { pricing } from "@/lib/pricing";
import { LIMITS, validTCKN } from "@/lib/security";
import { BASE_PATH } from "@/lib/site";
import type { Invoice } from "@/lib/types";

interface InitializeResponse {
  ok?: boolean;
  error?: string;
  paymentPageUrl?: string | null;
}

export function PaymentStep() {
  const { order, patch, openLegal } = useApp();
  const p = pricing(order.addons);
  const inv = order.invoice;
  const [err, setErr] = useState<Record<string, string | undefined>>({});
  const fix = (k: string) => setErr((e) => (e[k] ? { ...e, [k]: undefined } : e));
  const errKey: Record<string, string> = {
    title: "ititle",
    taxId: "itax",
    taxOffice: "ioffice",
    address: "iaddr",
    city: "icity",
  };
  const setInv = (k: keyof Invoice, v: string) => {
    patch((o) => ({ invoice: { ...o.invoice, [k]: v } }));
    if (errKey[k]) fix(errKey[k]);
  };
  const [ok, setOk] = useState({ kvkk: false, distance: false, terms: false, marketing: false });
  const corp = inv.type === "kurumsal";
  const [busy, setBusy] = useState(false);
  const [payErr, setPayErr] = useState("");

  const validate = (): Record<string, string | undefined> => {
    const e: Record<string, string | undefined> = {};
    if (inv.title.trim().length < 2) e.ititle = corp ? "Şirket ünvanını girin." : "Fatura için ad soyad girin.";
    const t = inv.taxId.replace(/\D/g, "");
    if (corp) {
      if (t.length !== 10) e.itax = "10 haneli vergi numarasını girin.";
      if (inv.taxOffice.trim().length < 2) e.ioffice = "Vergi dairesini girin.";
    } else if (!validTCKN(t)) e.itax = "Geçerli bir 11 haneli T.C. kimlik numarası girin.";
    if (inv.city.trim().length < 2) e.icity = "Şehrinizi girin.";
    if (inv.address.trim().length < 8) e.iaddr = "Fatura adresinizi girin.";
    if (!ok.kvkk || !ok.distance || !ok.terms) e.consent = "Devam etmek için zorunlu onay kutularını işaretleyin.";
    return e;
  };

  const pay = async () => {
    if (busy) return;
    const e = validate();
    setErr(e);
    if (Object.keys(e).length) {
      const f = document.querySelector('[aria-invalid="true"]') as HTMLElement | null;
      if (f && f.focus) f.focus();
      return;
    }

    if (!order.id) {
      setPayErr("Sipariş kimliği bulunamadı. Lütfen önceki adıma dönüp tekrar deneyin.");
      return;
    }

    setBusy(true);
    setPayErr("");
    const consents = {
      kvkk: true,
      distance: true,
      terms: true,
      marketing: !!ok.marketing,
      at: new Date().toISOString(),
    };

    try {
      const record = buildRecord({
        ...order,
        invoice: inv,
        consents,
        status: "pending",
      });

      /*
       * Checkout Form başlatılmadan önce siparişin güncel fatura ve onay bilgileri
       * Supabase'e yazılır. Kart bilgileri Vitrin'e hiç girmez; iyzico sayfasında
       * alınır. Browser ödeme durumunu "paid" yapamaz.
       */
      await sendOrderToSupabase(record);

      const response = await fetch("/api/payments/iyzico/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ orderId: order.id }),
      });
      const result = (await response.json()) as InitializeResponse;

      if (!response.ok || !result.ok || !result.paymentPageUrl) {
        throw new Error(result.error || "Güvenli ödeme ekranı başlatılamadı.");
      }

      patch({ consents, status: "payment_started" });
      window.location.assign(result.paymentPageUrl);
      return;
    } catch (error) {
      setPayErr(
        error instanceof Error && error.message
          ? error.message
          : "Bir sorun oluştu. Ödeme alınmadı, lütfen tekrar deneyin.",
      );
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
      sub="Fatura bilgilerinizi girin. Ödeme için güvenli iyzico ekranına yönlendirileceksiniz."
      aside={summary}
      hint="Sıradaki adım: iyzico ödeme ekranında kart bilgilerinizi girersiniz. Ödeme sunucuda doğrulandıktan sonra siparişiniz tamamlanır."
    >
      <div className="panel">
        <h2 className="h-3">Güvenli Ödeme</h2>
        <div className="demo-note">
          <Icon n="lock" size={18} />
          <span>
            Kart bilgileriniz Vitrin tarafından alınmaz veya saklanmaz. Ödeme bilgilerinizi güvenli iyzico ödeme ekranında girersiniz.
          </span>
        </div>
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
        <Field id="i-city" label="Şehir" error={err.icity}>
          <Inp
            id="i-city"
            maxLength={LIMITS.city}
            value={inv.city}
            onValue={(v) => setInv("city", v)}
            error={err.icity}
            autoComplete="address-level2"
          />
        </Field>
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
        <button className="btn btn-primary btn-lg btn-block" style={{ marginTop: "18px" }} disabled={busy} onClick={pay}>
          {busy ? (
            <>
              <span className="spin"></span>Güvenli ödeme hazırlanıyor
            </>
          ) : (
            TL(p.total) + " Ödemeye Geç"
          )}
        </button>
        <p className="fine" style={{ textAlign: "center", marginTop: "8px" }}>
          Tutar {VAT_NOTE}. Butona bastığınızda güvenli iyzico ödeme ekranına yönlendirilirsiniz.
        </p>
        {payErr && (
          <div className="payerr" role="alert">
            {payErr}
          </div>
        )}
        <div className="secure">
          <Icon n="lock" size={16} /> iyzico güvenli ödeme
        </div>
        <p className="fine" style={{ textAlign: "center", marginTop: "6px" }}>
          Kart bilgileriniz Vitrin sistemlerine girmez ve Vitrin tarafından saklanmaz.
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
