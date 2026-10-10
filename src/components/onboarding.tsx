"use client";

import { useSearchParams } from "next/navigation";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Field, Inp } from "@/components/checkout/fields";
import { FileField } from "@/components/file-field";
import { Stepper } from "@/components/checkout/stepper";
import { Icon } from "@/components/icons";
import { ADDONS } from "@/data/content";
import { PROJECT_STATUSES, type ContentForm } from "@/lib/types";
import { useApp } from "@/lib/order-context";
import { Backend, buildRecord } from "@/lib/backend";
import { FILE_RULES, LIMITS, RX, clean, phoneOk } from "@/lib/security";

const STYLE_OPTS: [string, string][] = [
  ["Sade / Minimal", "Az öğe, bol boşluk"],
  ["Modern / Premium", "Cesur tipografi, güçlü görseller"],
  ["Kurumsal", "Güven veren, düzenli"],
  ["Renkli / Enerjik", "Canlı renkler, hareketli his"],
  ["Size bırakıyorum", "Sektörüme uygun olanı seçin"],
];

const ACTION_OPTS: [string, string][] = [
  ["WhatsApp'tan yazsın", "Mesajla iletişim"],
  ["Arasın", "Tıkla-ara"],
  ["Formu doldursun", "Talep veya başvuru bırakın"],
  ["Randevu alsın", "Online Randevu ek özelliğiyle"],
  ["Mekânıma gelsin", "Yol tarifi ve harita öne çıkar"],
  ["Size bırakıyorum", "Sektörüme uygun olanı seçin"],
];

const LOGO_OPTS: [string, string][] = [
  ["Logomu gönderiyorum", "Bu formdan veya WhatsApp'tan"],
  ["Logom yok", "Marka adımla sade bir yazı logosu hazırlayın"],
];

const PHOTO_OPTS: [string, string][] = [
  ["Fotoğraflarımı gönderiyorum", "Bu formdan veya WhatsApp'tan"],
  ["Fotoğrafım yok", "Kullanım hakkı uygun görseller kullanın"],
  ["Birkaç tane var", "Eksikleri uygun görsellerle tamamlayın"],
];

const PRICE_OPTS: [string, string][] = [
  ["Fiyat göstermeyelim", "Ziyaretçi fiyatı sizden sorar"],
  ["Fiyatlar görünsün", "Fiyatları hizmet listesine yazın"],
];

const YESNO: [string, string][] = [
  ["Evet", ""],
  ["Hayır", ""],
];

const DOMAIN_MAIL_OPTS: [string, string][] = [
  ["Evet", "Bu alan adıyla e-posta kullanıyorum"],
  ["Hayır", ""],
  ["Bilmiyorum", "Biz kontrol ederiz"],
];

const ADDON_PROMPTS: Record<string, string> = {
  blog: "İlk 3 yazı konusu ve yazıların kimin adına yayınlanacağı",
  randevu: "Hizmetler ve süreleri, randevu saatleri, randevuyu kimin onaylayacağı, bildirimin nereye gideceği",
  form: "Formda hangi bilgiler istensin, başvurular nereye ulaşsın",
  katalog: "Kategoriler ve yaklaşık ürün sayısı (ürün listesi için size bir tablo şablonu göndereceğiz)",
  dil: "Hangi diller, çeviriyi kim sağlayacak",
};

interface FormState {
  brand: string;
  legalName: string;
  sector: string;
  area: string;
  since: string;
  slogan: string;
  colors: string[];
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hideAddress: boolean;
  mapsUrl: string;
  hours: string;
  social: string;
  mainAction: string;
  audience: string;
  topServices: string;
  difference: string;
  faqs: string;
  about: string;
  services: string;
  products: string;
  priceDisplay: string;
  credentials: string;
  references: string;
  reviews: string;
  logoChoice: string;
  photoChoice: string;
  style: string;
  ref: string;
  competitors: string;
  dislikes: string;
  domainChoices: string;
  hasDomain: string;
  domainInfo: string;
  domainEmail: string;
  currentSite: string;
}

type TextKey = { [K in keyof FormState]: FormState[K] extends string ? K : never }[keyof FormState];

function Choice({
  label,
  name,
  opts,
  value,
  onValue,
}: {
  label: string;
  name: string;
  opts: [string, string][];
  value: string;
  onValue: (v: string) => void;
}) {
  return (
    <div className="fld">
      <span className="label">{label}</span>
      <div className="stylegrid" role="radiogroup" aria-label={label}>
        {opts.map((o) => (
          <label key={o[0]} className={"stylec " + (value === o[0] ? "on" : "")}>
            <input type="radio" name={name} checked={value === o[0]} onChange={() => onValue(o[0])} />
            <b>{o[0]}</b>
            {o[1] && <small>{o[1]}</small>}
          </label>
        ))}
      </div>
    </div>
  );
}

function Check({
  id,
  checked,
  onValue,
  error,
  children,
}: {
  id: string;
  checked: boolean;
  onValue: (v: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  return (
    <>
      <label className="consent">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          aria-invalid={!!error}
          aria-describedby={error ? id + "-e" : undefined}
          onChange={(e) => onValue(e.target.checked)}
        />
        <span>{children}</span>
      </label>
      {error && (
        <p className="err" id={id + "-e"} role="alert">
          {error}
        </p>
      )}
    </>
  );
}

export function ProjectOnboarding() {
  const { order, patch, ready, openLegal } = useApp();
  const searchParams = useSearchParams();
  const t = searchParams.get("t");

  const [f, setF] = useState<FormState>({
    brand: order.info.brand,
    legalName: order.invoice.title || order.info.name,
    sector: order.info.sector,
    area: "",
    since: "",
    slogan: "",
    colors: [],
    phone: order.info.phone,
    whatsapp: order.info.whatsapp,
    email: order.info.email,
    address: "",
    hideAddress: false,
    mapsUrl: "",
    hours: "",
    social: order.info.instagram,
    mainAction: "",
    audience: "",
    topServices: "",
    difference: "",
    faqs: "",
    about: "",
    services: "",
    products: "",
    priceDisplay: "",
    credentials: "",
    references: "",
    reviews: "",
    logoChoice: "",
    photoChoice: "",
    style: "",
    ref: "",
    competitors: "",
    dislikes: "",
    domainChoices: "",
    hasDomain: "",
    domainInfo: "",
    domainEmail: "",
    currentSite: order.info.site,
  });
  const [addonInfo, setAddonInfo] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<{ logo: File[]; biz: File[]; prod: File[]; team: File[] }>({
    logo: [],
    biz: [],
    prod: [],
    team: [],
  });
  const [consent, setConsent] = useState({
    serviceStart: false,
    contentRights: false,
    peoplePhotos: false,
    portfolio: false,
    experienceData: false,
  });
  const done = !!order.content;
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [submitErr, setSubmitErr] = useState("");
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setF((x) => ({ ...x, [k]: v }));
    if (errs[k]) setErrs((e) => ({ ...e, [k]: "" }));
  };
  const setFl = (k: keyof typeof files) => (v: File[]) => setFiles((x) => ({ ...x, [k]: v }));
  const setC = (k: keyof typeof consent) => (v: boolean) => {
    setConsent((x) => ({ ...x, [k]: v }));
    if (errs[k]) setErrs((e) => ({ ...e, [k]: "" }));
  };
  const selectedAddons = ADDONS.filter((a) => order.addons.includes(a.id));

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

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (f.brand.trim().length < 2) e.brand = "Marka adını girin.";
    if (f.legalName.trim().length < 2) e.legalName = "Şahıs adını veya şirket unvanını girin.";
    if (!phoneOk(f.phone)) e.phone = "Geçerli bir telefon numarası girin.";
    if (f.whatsapp.trim() && !phoneOk(f.whatsapp)) e.whatsapp = "Geçerli bir numara girin veya boş bırakın.";
    if (!RX.email.test(f.email.trim())) e.email = "Geçerli bir e-posta adresi girin.";
    (["mapsUrl", "ref", "currentSite"] as const).forEach((k) => {
      if (f[k].trim() && !RX.url.test(f[k].trim())) e[k] = "Bağlantıyı https://ornek.com biçiminde girin.";
    });
    if (!consent.contentRights) e.contentRights = "Göndermek için içerik haklarına ilişkin beyanı onaylayın.";
    if (!consent.serviceStart) e.serviceStart = "Göndermek için tasarım çalışmasının başlamasını onaylayın.";
    return e;
  };

  const submit = async () => {
    if (busy) return;
    const e = validate();
    setErrs(e);
    const first = Object.keys(e)[0];
    if (first) {
      const el = document.getElementById("o-" + first);
      if (el) el.focus();
      return;
    }
    if (!order.id || !order.accessToken) {
      setSubmitErr("Sipariş bilgisi bulunamadı. Lütfen ödeme sonucu sayfasındaki bağlantıyla tekrar açın.");
      return;
    }
    const names = (k: keyof typeof files) => files[k].map((x) => ({ name: x.name, size: x.size }));
    const txt = (k: TextKey) => clean(f[k], LIMITS.text).trim();
    const pick = (k: TextKey, opts: [string, string][]) => (opts.some((o) => o[0] === f[k]) ? f[k] : "");
    const content: ContentForm = {
      brand: txt("brand"),
      slogan: txt("slogan"),
      colors: f.colors.filter((c) => /^#[0-9a-f]{6}$/i.test(c)).slice(0, 4),
      about: txt("about"),
      services: txt("services"),
      products: txt("products"),
      phone: txt("phone"),
      email: txt("email"),
      address: txt("address"),
      hours: txt("hours"),
      style: pick("style", STYLE_OPTS),
      ref: txt("ref"),
      files: { logo: names("logo"), business: names("biz"), product: names("prod"), team: names("team") },
      brief: {
        legalName: txt("legalName"),
        sector: txt("sector"),
        area: txt("area"),
        since: txt("since"),
        whatsapp: txt("whatsapp"),
        hideAddress: f.hideAddress,
        mapsUrl: txt("mapsUrl"),
        social: txt("social"),
        mainAction: pick("mainAction", ACTION_OPTS),
        audience: txt("audience"),
        topServices: txt("topServices"),
        difference: txt("difference"),
        faqs: txt("faqs"),
        competitors: txt("competitors"),
        priceDisplay: pick("priceDisplay", PRICE_OPTS),
        credentials: txt("credentials"),
        references: txt("references"),
        reviews: txt("reviews"),
        logoChoice: pick("logoChoice", LOGO_OPTS),
        photoChoice: pick("photoChoice", PHOTO_OPTS),
        dislikes: txt("dislikes"),
        domainChoices: txt("domainChoices"),
        hasDomain: pick("hasDomain", YESNO),
        domainInfo: txt("domainInfo"),
        domainEmail: pick("domainEmail", DOMAIN_MAIL_OPTS),
        currentSite: txt("currentSite"),
        addonInfo: Object.fromEntries(
          selectedAddons.map((a) => [a.id, clean(addonInfo[a.id] || "", LIMITS.text).trim()]),
        ),
      },
      consents: { ...consent },
    };

    setBusy(true);
    setSubmitErr("");
    try {
      const response = await fetch("/api/orders/content-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ orderId: order.id, accessToken: order.accessToken, content }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string; serviceStartConsentAt?: string };
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Form şu anda kaydedilemiyor.");
      }
      content.serviceStartConsentAt = result.serviceStartConsentAt || new Date().toISOString();
    } catch (error) {
      setSubmitErr(error instanceof Error && error.message ? error.message : "Form şu anda kaydedilemiyor. Lütfen tekrar deneyin.");
      setBusy(false);
      return;
    }

    await Backend.upsert(buildRecord({ ...order, project: "Tasarım", content }));
    patch({ project: "Tasarım", content });
    window.scrollTo({ top: 0 });
    setBusy(false);
  };

  const area = (k: TextKey, label: string, opts: { hint?: string; optional?: boolean; max?: number } = {}) => (
    <Field id={"o-" + k} label={label} hint={opts.hint} optional={opts.optional} error={errs[k]}>
      <textarea
        className="input"
        id={"o-" + k}
        maxLength={opts.max || LIMITS.text}
        value={f[k]}
        onChange={(e) => set(k, e.target.value)}
      ></textarea>
    </Field>
  );
  const inp = (
    k: TextKey,
    label: string,
    opts: { hint?: string; optional?: boolean; type?: string; placeholder?: string; max?: number } = {},
  ) => (
    <Field id={"o-" + k} label={label} hint={opts.hint} optional={opts.optional} error={errs[k]}>
      <Inp
        id={"o-" + k}
        type={opts.type}
        placeholder={opts.placeholder}
        maxLength={opts.max}
        value={f[k]}
        onValue={(v) => set(k, v)}
        error={errs[k]}
      />
    </Field>
  );

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
          <h1 className="h-1">Web siteniz için bilgileri alalım.</h1>
          <p className="lead">
            Metinleri biz yazıyoruz; sizden yalnızca bilgi istiyoruz. Bilmediğiniz alanları boş bırakın, birlikte
            tamamlarız. Sipariş No: #{order.orderNo}
          </p>
          <p className="fine">
            İsteğe bağlı olmayan bilgiler tamamlandığında 5 iş günlük teslim süresi başlar.
          </p>
        </div>

        <div className="panel">
          <h2>İşletmeniz</h2>
          <div className="grid sm:grid-cols-2 gap-x-4">
            {inp("brand", "Marka adı", { hint: "Sitede görünecek ad", max: LIMITS.brand })}
            {inp("legalName", "Şahıs adı veya şirket unvanı", {
              hint: "Sitenin alt bilgisi ve KVKK metni için",
              max: LIMITS.invTitle,
            })}
            {inp("sector", "Sektör / ne iş yapıyorsunuz?", { placeholder: "Örnek: Diş kliniği" })}
            {inp("area", "Hizmet verdiğiniz şehir ve ilçeler", { placeholder: "Örnek: İstanbul, Kadıköy ve Ataşehir" })}
            {inp("since", "Kaç yıldır hizmet veriyorsunuz?", { optional: true })}
            {inp("slogan", "Slogan", { optional: true, hint: "Yoksa biz önerip onayınıza sunarız" })}
          </div>
        </div>

        <div className="panel">
          <h2>İletişim</h2>
          <div className="grid sm:grid-cols-2 gap-x-4">
            {inp("phone", "Telefon", { type: "tel", max: LIMITS.phone })}
            {inp("whatsapp", "WhatsApp numarası", {
              type: "tel",
              optional: true,
              hint: "Telefonla aynıysa boş bırakın",
              max: LIMITS.phone,
            })}
          </div>
          {inp("email", "E-posta", { type: "email", hint: "Sitedeki iletişim formu bu adrese ulaşır", max: LIMITS.email })}
          {inp("address", "Adres", { max: LIMITS.address })}
          <Check id="o-hideAddress" checked={f.hideAddress} onValue={(v) => set("hideAddress", v)}>
            Adresim sitede görünmesin, yalnızca hizmet bölgem yazsın.
          </Check>
          {inp("mapsUrl", "Google Haritalar veya Google İşletme Profili bağlantınız", {
            optional: true,
            placeholder: "https://",
            max: LIMITS.url,
            hint: "Harita ve Google yorumları için",
          })}
          {inp("hours", "Çalışma saatleri", {
            hint: "Örnek: Hafta içi 09:00 - 18:00, Cumartesi 10:00 - 16:00, resmî tatillerde kapalı",
          })}
          {inp("social", "Sosyal medya hesaplarınız", {
            optional: true,
            placeholder: "Instagram, Facebook, TikTok…",
            max: LIMITS.address,
          })}
        </div>

        <div className="panel">
          <h2>Hedef</h2>
          <Choice label="Ziyaretçi sitenizde en çok ne yapsın?" name="mainAction" opts={ACTION_OPTS} value={f.mainAction} onValue={(v) => set("mainAction", v)} />
          {area("audience", "Müşterileriniz kimler?", {
            hint: "Örnek: Kadıköy'de yaşayan 25-45 yaş aileler; şirketler ve bireysel müşteriler",
            max: LIMITS.wishes,
          })}
          {area("topServices", "En önemli 3 hizmetiniz veya ürününüz", { max: LIMITS.wishes })}
          {area("difference", "Sizi rakiplerinizden ayıran 1-3 şey", { optional: true, max: LIMITS.wishes })}
          {area("faqs", "Müşterilerinizin en sık sorduğu sorular", {
            optional: true,
            hint: "Yoksa sektörünüze göre biz yazıp onayınıza sunarız",
          })}
        </div>

        <div className="panel">
          <h2>İçerik bilgileri</h2>
          <p className="fine">Metin yazmanıza gerek yok; bilgileri madde madde yazmanız yeterli.</p>
          {area("about", "Hakkımızda için bilgiler", {
            hint: "Nasıl başladınız, kimlerden oluşuyorsunuz, neye önem veriyorsunuz?",
          })}
          {area("services", "Hizmet / ürün listesi", { hint: "Her biri için bir cümle yeterli" })}
          {area("products", "Ürünler", { optional: true })}
          <Choice label="Fiyatlar sitede görünsün mü?" name="priceDisplay" opts={PRICE_OPTS} value={f.priceDisplay} onValue={(v) => set("priceDisplay", v)} />
          {area("credentials", "Belge, sertifika, üyelik veya ödülleriniz", { optional: true, max: LIMITS.wishes })}
          {area("references", "Referanslarınız veya örnek işleriniz", {
            optional: true,
            hint: "Yalnızca adını kullanma izniniz olanları yazın",
            max: LIMITS.wishes,
          })}
          {area("reviews", "Sitede gösterilecek Google yorumları", {
            optional: true,
            hint: "Yorum sahibinin adını veya yorumun ilk cümlesini yazın. Boş bırakırsanız en yeni olumlu yorumlardan biz seçip onayınıza sunarız.",
          })}
        </div>

        <div className="panel">
          <h2>Görseller</h2>
          <Choice label="Logo" name="logoChoice" opts={LOGO_OPTS} value={f.logoChoice} onValue={(v) => set("logoChoice", v)} />
          <FileField
            id="o-logo"
            label="Logo dosyası"
            hint="PNG, JPG, SVG veya PDF, en fazla 10 MB; mümkünse arka plansız"
            accept=".png,.jpg,.jpeg,.webp,.svg,.pdf"
            types={FILE_RULES.logo}
            multiple={false}
            files={files.logo}
            onFiles={setFl("logo")}
          />
          <Choice label="Fotoğraflar" name="photoChoice" opts={PHOTO_OPTS} value={f.photoChoice} onValue={(v) => set("photoChoice", v)} />
          <FileField
            id="o-biz"
            label="İşletme / mekân fotoğrafları"
            hint="5-10 fotoğraf önerilir. JPG veya PNG, dosya başına en fazla 10 MB"
            accept="image/*"
            multiple
            files={files.biz}
            onFiles={setFl("biz")}
          />
          <FileField
            id="o-prodf"
            label="Ürün / iş fotoğrafları"
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
          <p className="fine">
            Dosyalar bu formdan henüz bize iletilmiyor. Logo ve fotoğraflarınızı WhatsApp&apos;tan &quot;belge&quot;
            olarak (sıkıştırılmadan) veya e-postayla gönderin.
          </p>
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
          <div className="fld" style={{ marginTop: "18px" }}>
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
          {inp("ref", "Beğendiğiniz bir web sitesi", { optional: true, placeholder: "https://", max: LIMITS.url })}
          {area("competitors", "Rakipleriniz veya örnek aldığınız işletmeler", { optional: true, max: LIMITS.wishes })}
          {area("dislikes", "Sitenizde görmek istemediğiniz renk veya stil", { optional: true, max: LIMITS.wishes })}
        </div>

        <div className="panel">
          <h2>Alan adı</h2>
          <Choice label="Hâlihazırda bir alan adınız (ornek.com) var mı?" name="hasDomain" opts={YESNO} value={f.hasDomain} onValue={(v) => set("hasDomain", v)} />
          {f.hasDomain === "Evet" ? (
            <>
              {inp("domainInfo", "Alan adınız ve kayıtlı olduğu firma", {
                placeholder: "Örnek: ornek.com.tr, Turhost",
                max: LIMITS.address,
              })}
              <Choice
                label="Bu alan adıyla e-posta kullanıyor musunuz?"
                name="domainEmail"
                opts={DOMAIN_MAIL_OPTS}
                value={f.domainEmail}
                onValue={(v) => set("domainEmail", v)}
              />
              <p className="fine">Alan adınızı yeni siteye bağlarken e-postanızın kesilmemesine dikkat ederiz.</p>
            </>
          ) : (
            inp("domainChoices", "İstediğiniz alan adı (öncelik sırasıyla 3 seçenek)", {
              placeholder: "Örnek: ornekklinik.com.tr, ornekklinik.com, ornekdis.com.tr",
              hint: "Boş bırakırsanız marka adınızdan biz önerip onayınıza sunarız",
              max: LIMITS.address,
            })
          )}
          {inp("currentSite", "Şu anki web sitenizin adresi", {
            optional: true,
            placeholder: "https://",
            hint: "Eski adreslerinizi yeni sayfalara yönlendirip Google'daki görünürlüğünüzü koruruz",
            max: LIMITS.url,
          })}
        </div>

        {selectedAddons.length > 0 && (
          <div className="panel">
            <h2>Seçtiğiniz ek özellikler</h2>
            {selectedAddons.map((a) => (
              <Field key={a.id} id={"o-addon-" + a.id} label={a.name} hint={ADDON_PROMPTS[a.id]}>
                <textarea
                  className="input"
                  id={"o-addon-" + a.id}
                  maxLength={LIMITS.text}
                  value={addonInfo[a.id] || ""}
                  onChange={(e) => setAddonInfo((x) => ({ ...x, [a.id]: e.target.value }))}
                ></textarea>
              </Field>
            ))}
          </div>
        )}

        <div className="panel">
          <h2>Onaylar</h2>
          <Check id="o-contentRights" checked={consent.contentRights} onValue={setC("contentRights")} error={errs.contentRights}>
            Gönderdiğim metin, logo ve fotoğrafları kullanma hakkım olduğunu beyan ederim.
          </Check>
          <Check id="o-peoplePhotos" checked={consent.peoplePhotos} onValue={setC("peoplePhotos")}>
            Fotoğraflarda yer alan kişilerin, fotoğraflarının sitede kullanılmasına izni var.{" "}
            <span className="opt">(Fotoğrafta kişi varsa)</span>
          </Check>
          <Check id="o-portfolio" checked={consent.portfolio} onValue={setC("portfolio")}>
            Sitemin Vitrinweb&apos;in örnek işleri arasında gösterilmesine izin veriyorum.{" "}
            <span className="opt">(İsteğe bağlı)</span>
          </Check>
          <Check id="o-experienceData" checked={consent.experienceData} onValue={setC("experienceData")}>
            Sitemin yayın öncesi ve sonrası ölçümlerinin (hız, arama görünürlüğü, gelen mesaj sayısı) Vitrinweb
            yazılarında örnek olarak kullanılmasına izin veriyorum. <span className="opt">(İsteğe bağlı)</span>
          </Check>
          <Check id="o-serviceStart" checked={consent.serviceStart} onValue={setC("serviceStart")} error={errs.serviceStart}>
            İçeriklerimi göndererek tasarım çalışmasının hemen başlamasını talep ediyorum. Çalışma başladıktan sonra
            cayma hakkımın sona ereceğini biliyorum.{" "}
            <button type="button" onClick={() => openLegal("mesafeli")}>
              Ayrıntılar
            </button>
          </Check>
          <p className="fine" style={{ marginTop: "10px" }}>
            Kişisel verileriniz,{" "}
            <button type="button" className="inl" onClick={() => openLegal("kvkk")}>
              KVKK Aydınlatma Metni
            </button>{" "}
            kapsamında işlenir.
          </p>
        </div>
        <div className="form-foot">
          <span className="fine">Eksik kalan bilgileri WhatsApp&apos;tan birlikte tamamlarız.</span>
          <button className="btn btn-primary btn-lg" onClick={submit} disabled={busy}>
            {busy ? "Gönderiliyor…" : "Bilgilerimi Gönder"}
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
