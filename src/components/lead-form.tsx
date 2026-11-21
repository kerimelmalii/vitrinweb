"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Icon } from "@/components/icons";
import { waLink } from "@/components/ui";
import { COMPANY } from "@/data/company";
import { INTEREST_EXTRA, PRODUCTS, WEB_ADDONS, WEB_CUSTOM, interestLabel } from "@/data/products";
import { FORM_SECTORS, SECTORS } from "@/data/sectors";
import { getService } from "@/data/services";
import { MESSAGE_MAX, contactOk, sendForm, type SendResult } from "@/lib/forms";

const GENERIC_PLACEHOLDER =
  "Örneğin: Ürün giriş-çıkışlarını şu an Excel’de tutuyoruz, ekibimizin telefonla barkod okutarak kayıt girmesini istiyoruz.";

export interface LeadInit {
  product?: string;
  sector?: string;
  service?: string;
  message?: string;
}

/** Bilgi talebi ve keşif görüşmesi formu (aynı alanlar). */
export function LeadForm({
  mode = "bilgi",
  compact = false,
  init,
  onProduct,
}: {
  mode?: "bilgi" | "kesif";
  compact?: boolean;
  init?: LeadInit;
  onProduct?: (slug: string) => void;
}) {
  const id = useId();
  const [f, setF] = useState({
    name: "",
    business: "",
    contact: "",
    sector: "",
    product: "",
    message: "",
    meeting: mode === "kesif",
    website: "",
  });
  const [addons, setAddons] = useState<string[]>([]);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<SendResult | null>(null);
  const [sentProduct, setSentProduct] = useState("");

  useEffect(() => {
    if (!init) return;
    const valid = (s?: string) => (s && (PRODUCTS.some((p) => p.slug === s) || INTEREST_EXTRA.some((x) => x.id === s)) ? s : "");
    const sec = SECTORS.find((s) => s.slug === init.sector)?.formSector || (FORM_SECTORS.includes(init.sector || "") ? init.sector : "");
    const svc = init.service ? getService(init.service) : undefined;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- adres çubuğundaki ön seçim yalnızca tarayıcıda okunur
    setF((x) => ({
      ...x,
      product: valid(init.product) || (svc ? "hizmetler" : x.product),
      sector: sec || x.sector,
      message: x.message || init.message || (svc ? `${svc.name} hizmeti hakkında bilgi almak istiyorum. ` : ""),
    }));
  }, [init]);

  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => {
    setF((x) => ({ ...x, [k]: v }));
    if (errs[k as string]) setErrs((e) => ({ ...e, [k]: "" }));
    if (k === "product" && onProduct) onProduct(v as string);
  };

  const example = PRODUCTS.find((p) => p.slug === f.product)?.formExample;
  const clinic = f.sector === "Klinik ve Sağlık";

  const validate = () => {
    const e: Record<string, string> = {};
    if (f.name.trim().split(/\s+/).filter(Boolean).length < 2 || f.name.trim().length < 4) e.name = "Lütfen adınızı ve soyadınızı girin.";
    if (!contactOk(f.contact)) e.contact = "Lütfen geçerli bir e-posta adresi veya telefon numarası girin.";
    if (!f.product) e.product = "Lütfen bir ürün veya “Henüz Karar Vermedim” seçeneğini işaretleyin.";
    if (f.message.length > MESSAGE_MAX) e.message = `En fazla ${MESSAGE_MAX} karakter kullanabilirsiniz.`;
    return e;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (busy) return;
    const e = validate();
    setErrs(e);
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    setBusy(true);
    setResult(null);
    const r = await sendForm(mode, {
      name: f.name.trim(),
      business: f.business.trim(),
      contact: f.contact.trim(),
      sector: f.sector,
      product: f.product,
      message: f.message.trim(),
      meeting: f.meeting,
      addons: f.product === "web-sitesi-paketi" ? addons : [],
      service: init?.service || "",
      website: f.website,
      page: typeof window !== "undefined" ? window.location.pathname : "",
    });
    setBusy(false);
    setResult(r);
    if (r === "ok") {
      setSentProduct(interestLabel(f.product));
      window.setTimeout(() => document.getElementById(`${id}-ok`)?.focus(), 30);
    }
  };

  if (result === "ok") {
    return (
      <div className={"lead-ok" + (compact ? " compact" : "")} id={`${id}-ok`} tabIndex={-1} role="status">
        <svg className="ok-ring" viewBox="0 0 96 96" aria-hidden="true">
          <circle cx="48" cy="48" r="46" />
          <path d="M28 50l14 14 27-30" />
        </svg>
        <h2 className="h-2">{mode === "kesif" ? "Görüşme talebinizi aldık." : "Talebiniz bize ulaştı."}</h2>
        <p className="lead">
          {mode === "kesif"
            ? "Uygun zaman dilimini netleştirmek için sizinle iletişime geçeceğiz."
            : `${sentProduct && sentProduct !== "Henüz Karar Vermedim" ? sentProduct : "Vitrinweb çözümleri"} için paylaştığınız bilgileri inceleyip tercih ettiğiniz iletişim kanalından size dönüş yapacağız.`}
        </p>
        <div className="hero-cta">
          <Link className="btn btn-primary" href="/urunler">
            Ürünlere Dönün
          </Link>
          <Link className="btn btn-line" href="/demolar">
            Demoları İnceleyin
          </Link>
        </div>
      </div>
    );
  }

  const err = (k: string) =>
    errs[k] ? (
      <p className="err" id={`${id}-${k}-e`} role="alert">
        {errs[k]}
      </p>
    ) : null;
  const aria = (k: string) => ({ "aria-invalid": !!errs[k], "aria-describedby": errs[k] ? `${id}-${k}-e` : undefined });

  return (
    <form className={"lead" + (compact ? " compact" : "")} onSubmit={submit} noValidate>
      <p className="fine req-note">Yıldızlı (*) alanların doldurulması zorunludur.</p>
      <div className="lead-grid">
        <div className="fld">
          <label className="label" htmlFor={`${id}-name`}>
            Ad Soyad*
          </label>
          <input
            id={`${id}-name`}
            className="input"
            autoComplete="name"
            maxLength={80}
            placeholder="Adınızı ve soyadınızı yazın."
            value={f.name}
            onChange={(e) => set("name", e.target.value)}
            {...aria("name")}
          />
          {err("name")}
        </div>
        <div className="fld">
          <label className="label" htmlFor={`${id}-business`}>
            İşletme Adı
          </label>
          <input
            id={`${id}-business`}
            className="input"
            autoComplete="organization"
            maxLength={100}
            placeholder="İşletmenizin adını yazın."
            value={f.business}
            onChange={(e) => set("business", e.target.value)}
          />
        </div>
        <div className="fld">
          <label className="label" htmlFor={`${id}-contact`}>
            E-posta veya Telefon*
          </label>
          <input
            id={`${id}-contact`}
            className="input"
            maxLength={120}
            inputMode="email"
            placeholder="Size ulaşabileceğimiz e-posta adresi veya telefon numarası."
            value={f.contact}
            onChange={(e) => set("contact", e.target.value)}
            {...aria("contact")}
          />
          {err("contact")}
        </div>
        <div className="fld">
          <label className="label" htmlFor={`${id}-sector`}>
            Sektör
          </label>
          <select id={`${id}-sector`} className="input" value={f.sector} onChange={(e) => set("sector", e.target.value)}>
            <option value="">Sektör Seçin</option>
            {FORM_SECTORS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="fld span2">
          <label className="label" htmlFor={`${id}-product`}>
            İlgilendiğiniz Ürün*
          </label>
          <select id={`${id}-product`} className="input" value={f.product} onChange={(e) => set("product", e.target.value)} {...aria("product")}>
            <option value="">Seçin</option>
            <optgroup label="Ürünler">
              {PRODUCTS.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Diğer">
              {INTEREST_EXTRA.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.label}
                </option>
              ))}
            </optgroup>
          </select>
          {err("product")}
        </div>
        {f.product === "web-sitesi-paketi" && (
          <fieldset className="fld span2 addon-fs">
            <legend className="label">İhtiyaç duyduğunuz ek özellikler</legend>
            <div className="chips">
              {[...WEB_ADDONS, ...WEB_CUSTOM].map((a) => {
                const on = addons.includes(a);
                return (
                  <label key={a} className={"chip chk-chip" + (on ? " on" : "")}>
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => setAddons((x) => (on ? x.filter((y) => y !== a) : [...x, a]))}
                    />
                    {a}
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}
        <div className="fld span2">
          <label className="label" htmlFor={`${id}-message`}>
            Ne Yapmak İstiyorsunuz?
          </label>
          <textarea
            id={`${id}-message`}
            className="input"
            rows={compact ? 3 : 5}
            maxLength={MESSAGE_MAX}
            placeholder={example ? `Örneğin: ${example}` : GENERIC_PLACEHOLDER}
            value={f.message}
            onChange={(e) => set("message", e.target.value)}
            {...aria("message")}
          />
          <p className="fhint counter" aria-live="polite">
            {f.message.length} / {MESSAGE_MAX}
          </p>
          {err("message")}
          {clinic && (
            <p className="note-warn">
              <Icon n="info" size={15} /> Lütfen bu formda hasta bilgisi veya sağlık kaydı paylaşmayın.
            </p>
          )}
        </div>
        <label className="ck-row span2" htmlFor={`${id}-meeting`}>
          <input id={`${id}-meeting`} type="checkbox" checked={f.meeting} onChange={(e) => set("meeting", e.target.checked)} />
          <span>
            Kısa bir keşif görüşmesi de planlamak istiyorum. <span className="opt">(isteğe bağlı)</span>
          </span>
        </label>
        <div className="hp" aria-hidden="true">
          <label htmlFor={`${id}-website`}>Web siteniz</label>
          <input id={`${id}-website`} tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set("website", e.target.value)} />
        </div>
      </div>
      <p className="note-safe">
        <Icon n="shield" size={15} /> Güvenliğiniz için bu formda şifre, ödeme bilgisi, görüşme kaydı, müşteri belgesi veya sağlık verisi paylaşmayın.
      </p>
      <div aria-live="assertive">
        {result && <FormError result={result} />}
      </div>
      <div className="lead-act">
        <button className="btn btn-primary btn-lg" type="submit" disabled={busy}>
          {busy ? "Talebiniz gönderiliyor…" : mode === "kesif" ? "Görüşme Talebi Gönderin" : "Talebinizi Gönderin"}
        </button>
        {!compact && <WaAlt product={f.product} />}
      </div>
      <p className="fine">
        Kişisel verilerinizin işlenmesine ilişkin detayları <Link href="/yasal/kvkk">KVKK Aydınlatma Metni</Link>’nde inceleyebilirsiniz.
      </p>
    </form>
  );
}

function WaAlt({ product }: { product: string }) {
  const name = interestLabel(product);
  const href = waLink(
    `Merhaba, Vitrinweb’in ${name && name !== "Henüz Karar Vermedim" ? name : "dijital"} çözümü hakkında bilgi almak istiyorum. İşletmem: . Destek aradığım konu: .`,
  );
  if (!href) return null;
  return (
    <a className="btn btn-line btn-lg" href={href} target="_blank" rel="noopener noreferrer">
      <Icon n="whatsapp" size={18} />
      WhatsApp’tan Yazın
    </a>
  );
}

export function FormError({ result, channel }: { result: SendResult; channel?: string }) {
  if (result === "duplicate")
    return <p className="form-msg warn">Bu talebi zaten aldık. Eklemek istediğiniz bir detay varsa aynı iletişim kanalından bize yazabilirsiniz.</p>;
  if (result === "invalid") return <p className="form-msg bad">Talebiniz şu an iletilemedi. Bilgilerinizi kontrol edip tekrar deneyin.</p>;
  if (result === "offline") return <p className="form-msg bad">İnternet bağlantınızı kontrol edip tekrar deneyin.</p>;
  const wa = waLink("Merhaba, Vitrinweb’e ulaşmak istiyorum.");
  return (
    <p className="form-msg bad">
      {channel || "Form geçici olarak kullanılamıyor. Bize doğrudan WhatsApp veya e-posta üzerinden ulaşabilirsiniz."}{" "}
      {wa && (
        <a href={wa} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      )}
      {wa && " · "}
      <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
    </p>
  );
}
