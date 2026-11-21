"use client";

import { useId, useState } from "react";
import { COMPANY } from "@/data/company";
import { contactOk, sendForm, type SendResult } from "@/lib/forms";

function Msg({ result, ok, fail }: { result: SendResult | null; ok: string; fail: string }) {
  if (!result) return null;
  if (result === "ok") return <p className="form-msg ok">{ok}</p>;
  if (result === "duplicate") return <p className="form-msg warn">Bu talebi zaten aldık. Eklemek istediğiniz bir detay varsa aynı iletişim kanalından bize yazabilirsiniz.</p>;
  if (result === "offline") return <p className="form-msg bad">İnternet bağlantınızı kontrol edip tekrar deneyin.</p>;
  return <p className="form-msg bad">{fail}</p>;
}

export function CancelForm() {
  const id = useId();
  const [f, setF] = useState({ name: "", contact: "", order: "", message: "", website: "" });
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<SendResult | null>(null);
  const set = (k: keyof typeof f, v: string) => {
    setF((x) => ({ ...x, [k]: v }));
    if (errs[k]) setErrs((e) => ({ ...e, [k]: "" }));
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 3) er.name = "Lütfen adınızı ve soyadınızı girin.";
    if (!contactOk(f.contact)) er.contact = "Lütfen geçerli bir e-posta adresi veya telefon numarası girin.";
    if (f.order.trim().length < 3) er.order = "Proje veya sipariş numaranızı girin.";
    setErrs(er);
    const first = Object.keys(er)[0];
    if (first) {
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    setBusy(true);
    const r = await sendForm("iptal", { ...f });
    setBusy(false);
    setResult(r === "invalid" || r === "unavailable" ? "unavailable" : r);
  };
  if (result === "ok") return <p className="form-msg ok legal-form">Talebiniz alındı.</p>;
  const field = (k: "name" | "contact" | "order", label: string, ph?: string) => (
    <div className="fld">
      <label className="label" htmlFor={`${id}-${k}`}>
        {label}*
      </label>
      <input
        id={`${id}-${k}`}
        className="input"
        maxLength={k === "contact" ? 120 : 80}
        placeholder={ph}
        value={f[k]}
        onChange={(e) => set(k, e.target.value)}
        aria-invalid={!!errs[k]}
        aria-describedby={errs[k] ? `${id}-${k}-e` : undefined}
      />
      {errs[k] && (
        <p className="err" id={`${id}-${k}-e`} role="alert">
          {errs[k]}
        </p>
      )}
    </div>
  );
  return (
    <form className="legal-form" onSubmit={submit} noValidate>
      <div className="lead-grid">
        {field("name", "Ad Soyad")}
        {field("contact", "E-posta veya Telefon")}
        {field("order", "Proje veya Sipariş Numarası", "Örn. VW-2611")}
        <div className="fld span2">
          <label className="label" htmlFor={`${id}-m`}>
            Talebiniz
          </label>
          <textarea id={`${id}-m`} className="input" rows={3} maxLength={1000} value={f.message} onChange={(e) => set("message", e.target.value)} />
        </div>
        <div className="hp" aria-hidden="true">
          <label htmlFor={`${id}-w`}>Web siteniz</label>
          <input id={`${id}-w`} tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set("website", e.target.value)} />
        </div>
      </div>
      <div aria-live="assertive">
        <Msg result={result} ok="Talebiniz alındı." fail={`Talep iletilemedi. Lütfen ${COMPANY.email} adresi üzerinden bize ulaşın.`} />
      </div>
      <button className="btn btn-primary" type="submit" disabled={busy}>
        {busy ? "Gönderiliyor…" : "İptal ve İade Talebi Gönderin"}
      </button>
    </form>
  );
}

const CHANNELS = ["E-posta", "SMS"] as const;

export function PreferenceForm() {
  const id = useId();
  const [contact, setContact] = useState("");
  const [channels, setChannels] = useState<string[]>([]);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState<"izin" | "durdur" | null>(null);
  const [result, setResult] = useState<{ r: SendResult; action: "izin" | "durdur" } | null>(null);

  const send = async (action: "izin" | "durdur") => {
    if (!contactOk(contact)) {
      setErr("Lütfen geçerli bir e-posta adresi veya telefon numarası girin.");
      document.getElementById(`${id}-c`)?.focus();
      return;
    }
    if (action === "izin" && channels.length === 0) {
      setErr("Tanıtım iletisi almak istediğiniz en az bir kanalı seçin.");
      return;
    }
    setErr("");
    setBusy(action);
    const r = await sendForm("ileti", { contact: contact.trim(), channels: action === "izin" ? channels : [], action });
    setBusy(null);
    setResult({ r: r === "invalid" ? "unavailable" : r, action });
  };

  return (
    <div className="legal-form pref">
      <div className="fld">
        <label className="label" htmlFor={`${id}-c`}>
          E-posta veya Telefon*
        </label>
        <input
          id={`${id}-c`}
          className="input"
          maxLength={120}
          value={contact}
          onChange={(e) => {
            setContact(e.target.value);
            setErr("");
          }}
          aria-invalid={!!err}
          aria-describedby={err ? `${id}-e` : undefined}
        />
      </div>
      <fieldset className="pref-ch">
        <legend className="label">Kanallar</legend>
        {CHANNELS.map((c) => (
          <label key={c} className="ck-row">
            <input
              type="checkbox"
              checked={channels.includes(c)}
              onChange={() => setChannels((x) => (x.includes(c) ? x.filter((y) => y !== c) : [...x, c]))}
            />
            <span>Vitrinweb’den yeni ürün ve kampanyalar hakkında {c === "E-posta" ? "e-posta" : "SMS"} üzerinden tanıtım iletisi almak istiyorum.</span>
          </label>
        ))}
      </fieldset>
      {err && (
        <p className="err" id={`${id}-e`} role="alert">
          {err}
        </p>
      )}
      <div aria-live="assertive">
        {result &&
          (result.r === "ok" ? (
            <p className="form-msg ok">{result.action === "izin" ? "İleti tercihiniz kaydedildi." : "Talebiniz alındı."}</p>
          ) : (
            <Msg result={result.r} ok="" fail="Tercihiniz güncellenemedi. Lütfen tekrar deneyin." />
          ))}
      </div>
      <div className="wiz-act">
        <button className="btn btn-primary" type="button" disabled={!!busy} onClick={() => send("izin")}>
          {busy === "izin" ? "Kaydediliyor…" : "Tercihimi Kaydedin"}
        </button>
        <button className="btn btn-line" type="button" disabled={!!busy} onClick={() => send("durdur")}>
          {busy === "durdur" ? "Gönderiliyor…" : "Tanıtım İletilerini Durdurun"}
        </button>
      </div>
      <p className="fine">Bu tercih, bilgi talebi formlarından ve KVKK Aydınlatma Metni’nden bağımsızdır; vermemeniz hiçbir hizmeti etkilemez.</p>
    </div>
  );
}
