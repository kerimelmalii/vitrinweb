"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { FormError } from "@/components/lead-form";
import { COMPANY } from "@/data/company";
import { sendForm, type SendResult } from "@/lib/forms";
import { RX, phoneOk } from "@/lib/security";

const STEPS = ["İşletme Bilgileri", "İçerik ve Dosyalar", "Site Tercihleri", "Kontrol ve Gönderim"];
const MAX_TOTAL = 3 * 1024 * 1024;
const LOGO_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "application/pdf"];
const PHOTO_TYPES = ["image/png", "image/jpeg", "image/webp"];
const CTA_OPTS = ["Telefonla arama", "WhatsApp mesajı", "Randevu talebi", "Teklif formu", "Mağaza ziyareti"];

interface Upload {
  name: string;
  type: string;
  size: number;
  data: string;
  slot: "logo" | "photo";
}

const readB64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] || "");
    r.onerror = () => reject(new Error("read"));
    r.readAsDataURL(file);
  });

const mb = (n: number) => `${(n / 1024 / 1024).toLocaleString("tr-TR", { maximumFractionDigits: 1 })} MB`;

export function ProjectStart() {
  const id = useId();
  const top = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [f, setF] = useState({
    project: "",
    business: "",
    person: "",
    phone: "",
    email: "",
    address: "",
    hours: "",
    about: "",
    services: "",
    social: "",
    missing: "",
    domain: "",
    refs: "",
    style: "",
    cta: "",
    website: "",
  });
  const [pub, setPub] = useState({ phone: true, email: true, address: true, hours: true });
  const [files, setFiles] = useState<Upload[]>([]);
  const [fileMsg, setFileMsg] = useState<{ tone: "ok" | "bad" | "busy"; text: string } | null>(null);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<SendResult | null>(null);

  const set = (k: keyof typeof f, v: string) => {
    setF((x) => ({ ...x, [k]: v }));
    if (errs[k]) setErrs((e) => ({ ...e, [k]: "" }));
  };
  const total = files.reduce((a, b) => a + b.size, 0);

  const addFiles = async (list: FileList | null, slot: "logo" | "photo") => {
    if (!list || !list.length) return;
    const types = slot === "logo" ? LOGO_TYPES : PHOTO_TYPES;
    setFileMsg({ tone: "busy", text: "Yükleniyor…" });
    let size = total;
    const next: Upload[] = [];
    for (const file of Array.from(list)) {
      if (!types.includes(file.type)) {
        setFileMsg({ tone: "bad", text: "Bu dosya formatı desteklenmiyor." });
        return;
      }
      if (size + file.size > MAX_TOTAL) {
        setFileMsg({ tone: "bad", text: `Dosya boyutu ${mb(MAX_TOTAL)} sınırını aşıyor.` });
        return;
      }
      try {
        next.push({ name: file.name.slice(0, 120), type: file.type, size: file.size, data: await readB64(file), slot });
        size += file.size;
      } catch {
        setFileMsg({ tone: "bad", text: "Yükleme tamamlanamadı. Lütfen tekrar deneyin." });
        return;
      }
    }
    setFiles((x) => [...(slot === "logo" ? x.filter((y) => y.slot !== "logo") : x), ...next].slice(0, 8));
    setFileMsg({ tone: "ok", text: "Dosya başarıyla eklendi." });
  };

  const validateStep = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (f.project.trim().length < 3) e.project = "Size iletilen proje numarasını girin.";
      if (f.business.trim().length < 2) e.business = "İşletme adını girin.";
      if (f.person.trim().length < 3) e.person = "İletişim kişisinin adını girin.";
      if (!phoneOk(f.phone)) e.phone = "Geçerli bir telefon numarası girin.";
      if (!RX.email.test(f.email.trim())) e.email = "Geçerli bir e-posta adresi girin.";
    }
    if (s === 2 && /şifre|parola|password/i.test(f.domain + f.refs + f.style)) e.domain = "Erişim şifrelerinizi bu forma girmeyin.";
    return e;
  };

  const go = (n: number) => {
    setStep(n);
    window.setTimeout(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 20);
  };
  const next = () => {
    const e = validateStep(step);
    setErrs(e);
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    go(step + 1);
  };

  const submit = async () => {
    const e = { ...validateStep(0), ...validateStep(2) };
    if (Object.keys(e).length) {
      setErrs(e);
      go(e.domain && Object.keys(e).length === 1 ? 2 : 0);
      return;
    }
    setBusy(true);
    setResult(null);
    const r = await sendForm("proje", {
      ...f,
      publish: Object.entries(pub)
        .filter(([, v]) => v)
        .map(([k]) => k),
      files: files.map(({ name, type, data, slot }) => ({ name, type, data, slot })),
    });
    setBusy(false);
    setResult(r);
    if (r === "ok") window.setTimeout(() => top.current?.focus(), 30);
  };

  if (result === "ok") {
    return (
      <div className="lead-ok" ref={top} tabIndex={-1} role="status">
        <svg className="ok-ring" viewBox="0 0 96 96" aria-hidden="true">
          <circle cx="48" cy="48" r="46" />
          <path d="M28 50l14 14 27-30" />
        </svg>
        <h2 className="h-2">Proje içerikleriniz bize ulaştı.</h2>
        <p className="lead">Eksik veya netleştirilmesi gereken bir detay olursa sizinle iletişime geçeceğiz.</p>
        <Link className="btn btn-line" href="/">
          Ana Sayfaya Dönün
        </Link>
      </div>
    );
  }

  const inp = (k: keyof typeof f, label: string, opts: { req?: boolean; type?: string; ph?: string; max?: number; area?: boolean; hint?: string } = {}) => (
    <div className={"fld" + (opts.area ? " span2" : "")}>
      <label className="label" htmlFor={`${id}-${k}`}>
        {label}
        {opts.req ? "*" : ""}
      </label>
      {opts.area ? (
        <textarea
          id={`${id}-${k}`}
          className="input"
          rows={4}
          maxLength={opts.max || 2000}
          placeholder={opts.ph}
          value={f[k]}
          onChange={(e) => set(k, e.target.value)}
        />
      ) : (
        <input
          id={`${id}-${k}`}
          className="input"
          type={opts.type || "text"}
          maxLength={opts.max || 150}
          placeholder={opts.ph}
          value={f[k]}
          onChange={(e) => set(k, e.target.value)}
          aria-invalid={!!errs[k]}
          aria-describedby={errs[k] ? `${id}-${k}-e` : undefined}
        />
      )}
      {errs[k] ? (
        <p className="err" id={`${id}-${k}-e`} role="alert">
          {errs[k]}
        </p>
      ) : opts.hint ? (
        <p className="fhint">{opts.hint}</p>
      ) : null}
    </div>
  );
  const pubBox = (k: keyof typeof pub) => (
    <label className="ck-row sm">
      <input type="checkbox" checked={pub[k]} onChange={(e) => setPub((x) => ({ ...x, [k]: e.target.checked }))} />
      <span>Sitede yayınlansın</span>
    </label>
  );

  const preview: [number, string, [string, string][]][] = [
    [
      0,
      STEPS[0],
      [
        ["Proje Numarası", f.project],
        ["İşletme Adı", f.business],
        ["İletişim Kişisi", f.person],
        ["Telefon", `${f.phone}${pub.phone ? " · sitede yayınlanacak" : ""}`],
        ["E-posta", `${f.email}${pub.email ? " · sitede yayınlanacak" : ""}`],
        ["Adres", f.address ? `${f.address}${pub.address ? " · sitede yayınlanacak" : ""}` : ""],
        ["Çalışma Saatleri", f.hours ? `${f.hours}${pub.hours ? " · sitede yayınlanacak" : ""}` : ""],
      ],
    ],
    [
      1,
      STEPS[1],
      [
        ["İşletme Tanıtımı", f.about],
        ["Hizmetler", f.services],
        ["Dosyalar", files.map((x) => x.name).join(", ")],
        ["Sosyal Medya", f.social],
        ["Hazır olmayan içerikler", f.missing],
      ],
    ],
    [
      2,
      STEPS[2],
      [
        ["Alan Adı", f.domain],
        ["Örnek Siteler", f.refs],
        ["Renk veya Görsel Tercih", f.style],
        ["Öncelikli Çağrı", f.cta],
      ],
    ],
  ];

  return (
    <div className="pstart" ref={top} tabIndex={-1}>
      <ol className="wsteps" aria-label="Form adımları">
        {STEPS.map((s, i) => (
          <li key={s} className={i === step ? "on" : i < step ? "done" : ""} aria-current={i === step ? "step" : undefined}>
            <span>{i < step ? <Icon n="check" size={14} sw={2.6} /> : i + 1}</span>
            {s}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <section aria-labelledby={`${id}-s0`}>
          <h2 className="h-3" id={`${id}-s0`}>
            {STEPS[0]}
          </h2>
          <p className="fine step-note">Sitede herkese açık yayınlanmasını istediğiniz bilgileri özellikle işaretleyin.</p>
          <div className="lead-grid">
            {inp("project", "Proje Numarası", { req: true, ph: "Örn. VW-2611", max: 40, hint: "Çalışma onaylandığında size iletilen numara." })}
            {inp("business", "İşletme Adı", { req: true, max: 100 })}
            {inp("person", "İletişim Kişisi", { req: true, max: 80 })}
            <div>
              {inp("phone", "Telefon", { req: true, type: "tel", max: 20 })}
              {pubBox("phone")}
            </div>
            <div>
              {inp("email", "E-posta", { req: true, type: "email", max: 120 })}
              {pubBox("email")}
            </div>
            <div>
              {inp("address", "Adres", { max: 300 })}
              {pubBox("address")}
            </div>
            <div className="span2">
              {inp("hours", "Çalışma Saatleri", { ph: "Örn. Hafta içi 09.00–19.00, cumartesi 10.00–16.00", max: 200 })}
              {pubBox("hours")}
            </div>
          </div>
        </section>
      )}

      {step === 1 && (
        <section aria-labelledby={`${id}-s1`}>
          <h2 className="h-3" id={`${id}-s1`}>
            {STEPS[1]}
          </h2>
          <p className="fine step-note">Kullanım hakkına sahip olduğunuz dosyaları yükleyin. Hazır olmayan içerikleri not alanına ekleyin.</p>
          <div className="lead-grid">
            {inp("about", "İşletme Tanıtımı", { area: true, ph: "İşletmenizi birkaç cümleyle anlatın." })}
            {inp("services", "Hizmetler", { area: true, ph: "Öne çıkarmak istediğiniz hizmetleri sıralayın." })}
            <div className="fld">
              <span className="label">Logo</span>
              <label className="upl">
                <input type="file" accept={LOGO_TYPES.join(",")} onChange={(e) => void addFiles(e.target.files, "logo")} />
                <Icon n="upload" size={18} /> Dosya Ekleyin
              </label>
              <p className="fhint">PNG, JPG, WEBP, SVG veya PDF.</p>
            </div>
            <div className="fld">
              <span className="label">Fotoğraflar</span>
              <label className="upl">
                <input type="file" multiple accept={PHOTO_TYPES.join(",")} onChange={(e) => void addFiles(e.target.files, "photo")} />
                <Icon n="upload" size={18} /> Dosya Ekleyin
              </label>
              <p className="fhint">PNG, JPG veya WEBP. Toplam {mb(MAX_TOTAL)}; daha büyük dosyaları ayrıca e-postayla iletebilirsiniz.</p>
            </div>
            <div className="span2" aria-live="polite">
              {fileMsg && <p className={`form-msg ${fileMsg.tone === "bad" ? "bad" : fileMsg.tone === "ok" ? "ok" : ""}`}>{fileMsg.text}</p>}
              {files.length > 0 && (
                <ul className="flist">
                  {files.map((x, i) => (
                    <li key={x.name + i}>
                      <Icon n={x.slot === "logo" ? "star" : "image"} size={16} />
                      <span>
                        {x.name} <small>{mb(x.size)}</small>
                      </span>
                      <button type="button" className="dm-linkbtn" onClick={() => setFiles((fs) => fs.filter((_, j) => j !== i))}>
                        Dosyayı Kaldırın
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {inp("social", "Sosyal Medya Bağlantıları", { ph: "instagram.com/isletmeniz", max: 300 })}
            {inp("missing", "Hazır olmayan içerikler", { area: true, ph: "Örn. Ekip fotoğrafları gelecek hafta hazır olacak." })}
          </div>
        </section>
      )}

      {step === 2 && (
        <section aria-labelledby={`${id}-s2`}>
          <h2 className="h-3" id={`${id}-s2`}>
            {STEPS[2]}
          </h2>
          <p className="fine step-note">Beğendiğiniz örnek sitelerde öne çıkan bölümleri yazın. Erişim şifrelerinizi bu forma girmeyin.</p>
          <div className="lead-grid">
            {inp("domain", "Alan Adı", { ph: "Örn. isletmeniz.com veya henüz yok", max: 120 })}
            <div className="fld">
              <label className="label" htmlFor={`${id}-cta`}>
                Öncelikli Çağrı
              </label>
              <select id={`${id}-cta`} className="input" value={f.cta} onChange={(e) => set("cta", e.target.value)}>
                <option value="">Seçin</option>
                {CTA_OPTS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <p className="fhint">Ziyaretçinin sitede atmasını en çok istediğiniz adım.</p>
            </div>
            {inp("refs", "Örnek Site Bağlantıları", { area: true, ph: "Bağlantı ve beğendiğiniz bölüm, örn. ornek.com – hizmet kartları" })}
            {inp("style", "Renk veya Görsel Tercih", { area: true, ph: "Örn. sade, açık renkler; kurumsal renginiz varsa kodu" })}
          </div>
        </section>
      )}

      {step === 3 && (
        <section aria-labelledby={`${id}-s3`}>
          <h2 className="h-3" id={`${id}-s3`}>
            Bilgileri Ön İzleyin
          </h2>
          <p className="fine step-note">Göndermeden önce özellikle sitede yayınlanacak telefon, adres ve çalışma saatlerini doğrulayın.</p>
          {preview.map(([n, title, rows]) => (
            <div key={title} className="pv">
              <div className="pv-h">
                <h3>{title}</h3>
                <button type="button" className="dm-linkbtn" onClick={() => go(n)}>
                  Düzenleyin
                </button>
              </div>
              <dl>
                {rows.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v || <span className="mute">—</span>}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
          <div aria-live="assertive">{result && <FormError result={result} />}</div>
        </section>
      )}

      <div className="hp" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Web siteniz</label>
        <input id={`${id}-website`} tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div className="wiz-act">
        {step > 0 && (
          <button type="button" className="btn btn-line" onClick={() => go(step - 1)}>
            Geri
          </button>
        )}
        {step < 3 ? (
          <button type="button" className="btn btn-primary" onClick={next}>
            Devam Edin
          </button>
        ) : (
          <button type="button" className="btn btn-primary btn-lg" onClick={submit} disabled={busy}>
            {busy ? "Gönderiliyor…" : "İçerikleri Gönderin"}
          </button>
        )}
      </div>
      <p className="fine">
        Daha önce oluşturduğunuz bir siparişle ilgili destek almak için sipariş numaranızla bize ulaşabilirsiniz.{" "}
        <a href={`mailto:${COMPANY.email}?subject=${encodeURIComponent("Vitrinweb destek talebi – ")}`}>Destek İçin Yazın</a>
      </p>
    </div>
  );
}
