"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Field, Inp } from "@/components/checkout/fields";
import { FileField } from "@/components/file-field";
import { Stepper } from "@/components/checkout/stepper";
import { Icon } from "@/components/icons";
import { PROJECT_STATUSES } from "@/lib/types";
import { useApp } from "@/lib/order-context";
import { Backend, buildRecord } from "@/lib/backend";
import { FILE_RULES, LIMITS, RX, clean } from "@/lib/security";

const STYLE_OPTS: [string, string][] = [
  ["Sade / Minimal", "Az öğe, bol boşluk"],
  ["Modern / Premium", "Cesur tipografi, güçlü görseller"],
  ["Kurumsal", "Güven veren, düzenli"],
  ["Renkli / Enerjik", "Canlı renkler, hareketli his"],
  ["Size bırakıyorum", "Sektörüme uygun olanı seçin"],
];

interface FormState {
  brand: string;
  slogan: string;
  colors: string[];
  about: string;
  services: string;
  products: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  style: string;
  ref: string;
}

export function ProjectOnboarding() {
  const { order, patch, ready, openLegal } = useApp();
  const searchParams = useSearchParams();
  const t = searchParams.get("t");

  const [f, setF] = useState<FormState>({
    brand: order.info.brand,
    slogan: "",
    colors: [],
    about: "",
    services: "",
    products: "",
    phone: order.info.phone,
    email: order.info.email,
    address: "",
    hours: "",
    style: "",
    ref: "",
  });
  const [files, setFiles] = useState<{ logo: File[]; biz: File[]; prod: File[]; team: File[] }>({
    logo: [],
    biz: [],
    prod: [],
    team: [],
  });
  const done = !!order.content;
  const [err, setErr] = useState("");
  const [refErr, setRefErr] = useState("");
  const [startOk, setStartOk] = useState(false);
  const [startErr, setStartErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [submitErr, setSubmitErr] = useState("");
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((x) => ({ ...x, [k]: v }));
  const setFl = (k: keyof typeof files) => (v: File[]) => setFiles((x) => ({ ...x, [k]: v }));

  if (!ready) return <main id="main" className="container-x co"></main>;

  if (t && t !== order.accessToken) {
    return (
      <main id="main" className="container-x co">
        <div className="ok-wrap">
          <h1 className="h-1">Bu bağlantı geçerli değil.</h1>
          <p className="lead" style={{ margin: "12px 0 24px" }}>
            Bağlantıyı e-postanızdan eksiksiz kopyaladığınızdan emin olun. Sorun sürerse sipariş numaranızla bize
            yazın.
          </p>
          <Link className="btn btn-primary btn-lg" href="/">
            Ana Sayfaya Dönün
          </Link>
        </div>
      </main>
    );
  }
  if (order.status !== "paid") {
    return (
      <main id="main" className="container-x co">
        <div className="ok-wrap">
          <h1 className="h-1">Önce siparişinizi tamamlayın.</h1>
          <p className="lead" style={{ margin: "12px 0 24px" }}>
            Proje başlangıç formu, ödeme tamamlandıktan sonra açılır.
          </p>
          <Link className="btn btn-primary btn-lg" href="/siparis">
            Siparişe Dön
          </Link>
        </div>
      </main>
    );
  }

  const submit = async () => {
    if (busy) return;
    if (f.brand.trim().length < 2) {
      setErr("Marka adını girin.");
      const el = document.getElementById("o-brand");
      if (el) el.focus();
      return;
    }
    if (!startOk) {
      setStartErr("Göndermek için tasarım çalışmasının başlamasını onaylayın.");
      const el = document.getElementById("o-start");
      if (el) el.focus();
      return;
    }
    setErr("");
    const names = (k: keyof typeof files) => files[k].map((x) => ({ name: x.name, size: x.size }));
    if (f.ref.trim() && !RX.url.test(f.ref.trim())) {
      setErr("");
      setRefErr("Bağlantıyı https://ornek.com biçiminde girin.");
      const el = document.getElementById("o-ref");
      if (el) el.focus();
      return;
    }
    setRefErr("");
    if (!order.id || !order.accessToken) {
      setSubmitErr("Sipariş bilgisi bulunamadı. Lütfen ödeme sonucu sayfasındaki bağlantıyla tekrar açın.");
      return;
    }
    const txt: Record<string, unknown> = {};
    (Object.keys(f) as (keyof FormState)[]).forEach((k) => {
      txt[k] = k === "colors" ? f.colors.filter((c) => /^#[0-9a-f]{6}$/i.test(c)).slice(0, 4) : clean(f[k] as string, LIMITS.text).trim();
    });
    const content = {
      ...txt,
      style: STYLE_OPTS.some((o) => o[0] === f.style) ? f.style : "",
      files: { logo: names("logo"), business: names("biz"), product: names("prod"), team: names("team") },
    } as import("@/lib/types").ContentForm;

    setBusy(true);
    setSubmitErr("");
    try {
      const response = await fetch("/api/orders/content-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ orderId: order.id, accessToken: order.accessToken, content }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Form şu anda kaydedilemiyor.");
      }
    } catch (error) {
      setSubmitErr(error instanceof Error && error.message ? error.message : "Form şu anda kaydedilemiyor. Lütfen tekrar deneyin.");
      setBusy(false);
      return;
    }

    content.serviceStartConsentAt = new Date().toISOString();
    await Backend.upsert(buildRecord({ ...order, project: "Tasarım", content }));
    patch({ project: "Tasarım", content });
    window.scrollTo({ top: 0 });
    setBusy(false);
  };

  if (done) {
    return (
      <main id="main" className="container-x co">
        <Stepper step={4} />
        <div className="ok-wrap">
          <svg className="ok-ring" viewBox="0 0 96 96" aria-hidden="true">
            <circle cx="48" cy="48" r="46" />
            <path d="M28 50l14 14 27-30" />
          </svg>
          <h1 className="h-1">İçerikleriniz bize ulaştı.</h1>
          <p className="lead" style={{ margin: "12px 0 18px" }}>
            Tasarım sürecini başlatıyoruz. Sipariş numaranız <b>#{order.orderNo}</b>.
          </p>
          <p>
            <span className="pill-s">
              <i></i>Proje durumu: {order.project || "Tasarım"}
            </span>
          </p>
          <p className="fine" style={{ margin: "18px 0 26px" }}>
            Proje aşamaları: {PROJECT_STATUSES.join(", ")}.
          </p>
          <Link className="btn btn-line btn-lg" href="/">
            Ana Sayfaya Dönün
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main" className="container-x co">
      <Stepper step={4} />
      <div className="ob">
        <div className="co-head">
          <h1 className="h-1">Web siteniz için içerikleri alalım.</h1>
          <p className="lead">Elinizdekileri gönderin, eksikleri sonra tamamlayabiliriz. Sipariş No: #{order.orderNo}</p>
        </div>

        <div className="panel">
          <h2>Marka bilgileri</h2>
          <p className="fine">Logonuz ve kimliğiniz sitenin temelini oluşturur.</p>
          <FileField
            id="o-logo"
            label="Logo"
            hint="PNG, JPG, SVG veya PDF, en fazla 10 MB"
            accept=".png,.jpg,.jpeg,.webp,.svg,.pdf"
            types={FILE_RULES.logo}
            multiple={false}
            files={files.logo}
            onFiles={setFl("logo")}
          />
          <div className="grid sm:grid-cols-2 gap-x-4">
            <Field id="o-brand" label="Marka adı" error={err}>
              <Inp id="o-brand" value={f.brand} onValue={(v) => set("brand", v)} error={err} />
            </Field>
            <Field id="o-slogan" label="Slogan" optional>
              <Inp id="o-slogan" value={f.slogan} onValue={(v) => set("slogan", v)} />
            </Field>
          </div>
          <div className="fld">
            <span className="label">
              Marka renkleri <span className="opt">(isteğe bağlı)</span>
            </span>
            <div className="swatches">
              {f.colors.map((c, i) => (
                <span className="sw" key={i}>
                  <input
                    type="color"
                    value={c}
                    aria-label={"Renk " + (i + 1)}
                    onChange={(e) => set("colors", f.colors.map((x, j) => (j === i ? e.target.value : x)))}
                  />
                  <button aria-label="Rengi kaldır" onClick={() => set("colors", f.colors.filter((_, j) => j !== i))}>
                    <Icon n="x" size={14} />
                  </button>
                </span>
              ))}
              {f.colors.length < 4 && (
                <button
                  className="btn btn-line"
                  style={{ padding: ".6rem 1rem" }}
                  onClick={() => set("colors", [...f.colors, "#2340F2"])}
                >
                  <Icon n="plus" size={16} />
                  Renk ekle
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="panel">
          <h2>İçerik</h2>
          <p className="fine">Kısa ve net yazılar yeterli. Metni birlikte düzenleriz.</p>
          <Field id="o-about" label="Hakkımızda yazısı">
            <textarea className="input" maxLength={LIMITS.text} id="o-about" value={f.about} onChange={(e) => set("about", e.target.value)}></textarea>
          </Field>
          <Field id="o-serv" label="Hizmetler">
            <textarea className="input" maxLength={LIMITS.text} id="o-serv" value={f.services} onChange={(e) => set("services", e.target.value)}></textarea>
          </Field>
          <Field id="o-prod" label="Ürünler" optional>
            <textarea className="input" maxLength={LIMITS.text} id="o-prod" value={f.products} onChange={(e) => set("products", e.target.value)}></textarea>
          </Field>
          <div className="grid sm:grid-cols-2 gap-x-4">
            <Field id="o-phone" label="Telefon">
              <Inp id="o-phone" type="tel" value={f.phone} onValue={(v) => set("phone", v)} />
            </Field>
            <Field id="o-mail" label="E-posta">
              <Inp id="o-mail" type="email" value={f.email} onValue={(v) => set("email", v)} />
            </Field>
          </div>
          <Field id="o-addr" label="Adres">
            <Inp id="o-addr" value={f.address} onValue={(v) => set("address", v)} autoComplete="street-address" />
          </Field>
          <Field id="o-hours" label="Çalışma saatleri" hint="Örnek: Hafta içi 09:00 - 18:00, Cumartesi 10:00 - 16:00">
            <Inp id="o-hours" value={f.hours} onValue={(v) => set("hours", v)} />
          </Field>
        </div>

        <div className="panel">
          <h2>Görseller</h2>
          <p className="fine">Net ve yüksek çözünürlüklü fotoğraflar siteyi daha profesyonel gösterir.</p>
          <FileField
            id="o-biz"
            label="İşletme fotoğrafları"
            hint="JPG veya PNG, dosya başına en fazla 10 MB"
            accept="image/*"
            multiple
            files={files.biz}
            onFiles={setFl("biz")}
          />
          <FileField
            id="o-prodf"
            label="Ürün fotoğrafları"
            hint="JPG veya PNG, dosya başına en fazla 10 MB"
            accept="image/*"
            multiple
            files={files.prod}
            onFiles={setFl("prod")}
          />
          <FileField
            id="o-team"
            label="Ekip fotoğrafları"
            hint="JPG veya PNG, dosya başına en fazla 10 MB"
            accept="image/*"
            multiple
            files={files.team}
            onFiles={setFl("team")}
          />
        </div>

        <div className="panel">
          <h2>Tasarım tercihi</h2>
          <p className="fine">Hangisi size daha yakın?</p>
          <div className="stylegrid" role="radiogroup" aria-label="Tasarım tercihi">
            {STYLE_OPTS.map((s) => (
              <label key={s[0]} className={"stylec " + (f.style === s[0] ? "on" : "")}>
                <input type="radio" name="style" checked={f.style === s[0]} onChange={() => set("style", s[0])} />
                <b>{s[0]}</b>
                <small>{s[1]}</small>
              </label>
            ))}
          </div>
          <div style={{ marginTop: "18px" }}>
            <Field id="o-ref" label="Beğendiğiniz bir web sitesi varsa linkini paylaşabilirsiniz." optional error={refErr}>
              <Inp
                id="o-ref"
                maxLength={LIMITS.url}
                value={f.ref}
                onValue={(v) => {
                  set("ref", v);
                  setRefErr("");
                }}
                error={refErr}
                placeholder="https://"
                inputMode="url"
              />
            </Field>
          </div>
        </div>
        <div className="panel">
          <h2>Onay</h2>
          <label className="consent">
            <input
              type="checkbox"
              id="o-start"
              checked={startOk}
              aria-invalid={!!startErr}
              aria-describedby={startErr ? "o-start-e" : undefined}
              onChange={(e) => {
                setStartOk(e.target.checked);
                setStartErr("");
              }}
            />
            <span>
              İçeriklerimi göndererek tasarım çalışmasının hemen başlamasını talep ediyorum. Çalışma başladıktan
              sonra cayma hakkımın sona ereceğini biliyorum.{" "}
              <button type="button" onClick={() => openLegal("mesafeli")}>
                Ayrıntılar
              </button>
            </span>
          </label>
          {startErr && (
            <p className="err" id="o-start-e" role="alert">
              {startErr}
            </p>
          )}
          <p className="fine" style={{ marginTop: "10px" }}>
            Kişisel verileriniz,{" "}
            <button type="button" className="inl" onClick={() => openLegal("kvkk")}>
              KVKK Aydınlatma Metni
            </button>{" "}
            kapsamında işlenir.
          </p>
        </div>
        <div className="form-foot">
          <span className="fine">Bu önizlemede dosyalar yalnızca tarayıcınızda listelenir, gönderilmez.</span>
          <button className="btn btn-primary btn-lg" onClick={submit} disabled={busy}>
            {busy ? "Gönderiliyor…" : "İçeriklerimi Gönder"}
          </button>
        </div>
        {submitErr && (
          <p className="err" role="alert" style={{ textAlign: "right" }}>
            {submitErr}
          </p>
        )}
      </div>
    </main>
  );
}
