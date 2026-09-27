"use client";

import { useState } from "react";
import { Field, Inp } from "@/components/checkout/fields";
import { FileField } from "@/components/file-field";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { sendStartupApplication } from "@/lib/form-webhook";
import { FILE_RULES, LIMITS, RX, clean, phoneOk } from "@/lib/security";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

const VEST_STOPS: [string, string][] = [
  ["Teslim", "%0,5"],
  ["3. ay", "%0,875"],
  ["6. ay", "%1,25"],
  ["9. ay", "%1,625"],
  ["12. ay", "%2"],
];

const BENEFITS: { icon: "layout" | "shield" | "trend"; title: string; items: string[] }[] = [
  {
    icon: "layout",
    title: "Web Sitesi",
    items: [
      "5-6 sayfalık, mobil uyumlu, özel tasarım web sitesi",
      "2 revizyon turu",
      "Google Search Console ve Analytics kurulumu",
    ],
  },
  {
    icon: "shield",
    title: "12 Ay Bakım",
    items: ["Güncellemeler, yedekleme, güvenlik kontrolü", "Ayda 2-3 saate kadar içerik değişikliği"],
  },
  {
    icon: "trend",
    title: "SEO Desteği",
    items: [
      "Ayda 1-2 içerik veya sayfa optimizasyonu",
      "Google İşletme Profili kurulumu",
      "Aylık performans raporu",
    ],
  },
];

const STEPS: [string, string][] = [
  ["Başvuru", "Başvuru formunu doldurun."],
  ["Tanışma", "Kısa bir tanışma görüşmesi yapalım."],
  ["Sözleşme", "Seçilen girişimlerle sözleşme imzalanır."],
  ["Yayın", "Site 3-4 hafta içinde yayında, 12 aylık destek başlar."],
];

const CRITERIA = [
  "Net bir problem ve çözüm tanımı",
  "Kararlı bir kurucu ekip",
  "Kurulmuş veya yakında kurulacak bir şirket",
  "Birlikte büyümeye açık olmak",
];

const EXTRA_EXPECTATIONS = [
  "Sitenizin alt bilgisinde küçük bir Vitrin bağlantısı",
  "Vaka çalışması olarak paylaşım ve referans izni",
  "Zamanında içerik ve geri bildirim",
];

interface FormState {
  founderName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  status: "kurulu" | "kurulacak";
  description: string;
}
type Errors = Partial<Record<keyof FormState, string>>;

const blank: FormState = {
  founderName: "",
  companyName: "",
  email: "",
  phone: "",
  city: "",
  status: "kurulacak",
  description: "",
};

function mailtoUrl(f: FormState, hasFile: boolean): string {
  const body = [
    `Girişim/Şirket: ${f.companyName}`,
    `Kurucu: ${f.founderName}`,
    `E-posta: ${f.email}`,
    `Telefon: ${f.phone}`,
    `Şehir: ${f.city}`,
    `Kuruluş durumu: ${f.status === "kurulu" ? "Kurulmuş şirket" : "Kurulma aşamasında"}`,
    "",
    f.description,
    ...(hasFile ? ["", "Not: Seçtiğiniz dosyayı bu e-postaya elle eklemeniz gerekiyor (mailto bağlantıları dosya ekleyemez)."] : []),
  ].join("\n");
  const q = new URLSearchParams({ subject: `Girişim Destek Programı başvurusu — ${f.companyName}`, body });
  return `mailto:iletisim@vitrinweb.com.tr?${q.toString()}`;
}

function ApplicationForm() {
  const [f, setF] = useState<FormState>(blank);
  const [err, setErr] = useState<Errors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [fileErr, setFileErr] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto">("idle");

  const set = (k: keyof FormState, v: string) => {
    setF((o) => ({ ...o, [k]: v }));
    setErr((e) => (e[k] ? { ...e, [k]: undefined } : e));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (f.founderName.trim().length < 2) e.founderName = "Adınızı ve soyadınızı girin.";
    if (f.companyName.trim().length < 2) e.companyName = "Girişim veya şirket adını girin.";
    if (!RX.email.test(f.email.trim())) e.email = "Geçerli bir e-posta adresi girin.";
    if (!phoneOk(f.phone)) e.phone = "Telefon numaranızı alan koduyla girin.";
    if (f.city.trim().length < 2) e.city = "Şehrinizi girin.";
    if (f.description.trim().length < 30) e.description = "Girişiminizi biraz daha ayrıntılı anlatın (problem ve çözüm).";
    return e;
  };

  const submit = async () => {
    if (hp) return;
    const e = validate();
    setErr(e);
    if (Object.keys(e).length) {
      (document.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus();
      return;
    }
    setStatus("sending");
    const file = files[0];
    let fileData: { fileName?: string; fileType?: string; fileBase64?: string } = {};
    if (file) {
      try {
        fileData = { fileName: file.name, fileType: file.type, fileBase64: await fileToBase64(file) };
      } catch {
        setFileErr("Dosya okunamadı, lütfen tekrar deneyin veya dosyayı kaldırıp devam edin.");
        setStatus("idle");
        return;
      }
    }
    const relayed = await sendStartupApplication({
      founderName: f.founderName,
      companyName: f.companyName,
      email: f.email,
      phone: f.phone,
      city: f.city,
      status: f.status === "kurulu" ? "Kurulmuş şirket" : "Kurulma aşamasında",
      description: f.description,
      ...fileData,
    });
    if (relayed) {
      setStatus("sent");
    } else {
      window.location.href = mailtoUrl(f, !!file);
      setStatus("mailto");
    }
  };

  if (status === "sent") {
    return (
      <div className="panel">
        <h2 className="h-3">Başvurunuz alındı.</h2>
        <p className="mute" style={{ marginTop: "8px" }}>
          {files[0] ? "Yüklediğiniz dosyayla birlikte başvurunuz iletildi. " : ""}İnceleyip en kısa sürede size dönüş
          yapacağız.
        </p>
      </div>
    );
  }
  if (status === "mailto") {
    return (
      <div className="panel">
        <h2 className="h-3">E-posta uygulamanız açıldı.</h2>
        <p className="mute" style={{ marginTop: "8px" }}>
          Başvurunuz konu ve içerikle birlikte hazırlandı — göndermek için e-posta uygulamanızda Gönder&apos;e
          basmanız yeterli.{" "}
          {files[0] && "Seçtiğiniz dosyayı e-postaya elle eklemeniz gerekiyor, mailto bağlantıları dosya ekleyemiyor."}
        </p>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="grid sm:grid-cols-2 gap-x-4">
        <Field id="g-founder" label="Kurucu Adı Soyadı" error={err.founderName}>
          <Inp
            id="g-founder"
            maxLength={LIMITS.name}
            value={f.founderName}
            onValue={(v) => set("founderName", v)}
            error={err.founderName}
            autoComplete="name"
          />
        </Field>
        <Field id="g-company" label="Girişim / Şirket Adı" error={err.companyName}>
          <Inp
            id="g-company"
            maxLength={LIMITS.brand}
            value={f.companyName}
            onValue={(v) => set("companyName", v)}
            error={err.companyName}
            autoComplete="organization"
          />
        </Field>
        <Field id="g-email" label="E-posta" error={err.email}>
          <Inp
            id="g-email"
            type="email"
            maxLength={LIMITS.email}
            value={f.email}
            onValue={(v) => set("email", v)}
            error={err.email}
            autoComplete="email"
          />
        </Field>
        <Field id="g-phone" label="Telefon" error={err.phone}>
          <Inp
            id="g-phone"
            type="tel"
            inputMode="tel"
            maxLength={LIMITS.phone}
            value={f.phone}
            onValue={(v) => set("phone", v)}
            error={err.phone}
            placeholder="05xx xxx xx xx"
            autoComplete="tel"
          />
        </Field>
        <Field id="g-city" label="Şehir" error={err.city}>
          <Inp id="g-city" maxLength={LIMITS.short} value={f.city} onValue={(v) => set("city", v)} error={err.city} autoComplete="address-level2" />
        </Field>
        <div className="fld">
          <span className="label" id="g-status-l">
            Kuruluş durumu
          </span>
          <div className="chips" role="group" aria-labelledby="g-status-l">
            <button
              type="button"
              className={"chipb " + (f.status === "kurulacak" ? "on" : "")}
              aria-pressed={f.status === "kurulacak"}
              onClick={() => set("status", "kurulacak")}
            >
              Kurulma aşamasında
            </button>
            <button
              type="button"
              className={"chipb " + (f.status === "kurulu" ? "on" : "")}
              aria-pressed={f.status === "kurulu"}
              onClick={() => set("status", "kurulu")}
            >
              Kurulmuş şirket
            </button>
          </div>
        </div>
      </div>
      <Field id="g-desc" label="Girişiminiz hakkında" hint="Kısaca problem ve çözümünüzü anlatın." error={err.description}>
        <textarea
          className="input"
          id="g-desc"
          rows={6}
          maxLength={LIMITS.text}
          value={f.description}
          onChange={(e) => set("description", clean(e.target.value, LIMITS.text))}
          aria-invalid={!!err.description}
          aria-describedby={err.description ? "g-desc-e" : undefined}
        ></textarea>
      </Field>
      <FileField
        id="g-file"
        label="Sunum veya doküman (opsiyonel)"
        hint="PDF, PPT veya Word, en fazla 8 MB"
        accept=".pdf,.ppt,.pptx,.doc,.docx,.png,.jpg,.jpeg"
        types={FILE_RULES.pitch}
        maxSize={FILE_RULES.pitchMaxSize}
        multiple={false}
        files={files}
        onFiles={(fs) => {
          setFileErr("");
          setFiles(fs);
        }}
      />
      {fileErr && (
        <p className="ferr" role="alert">
          {fileErr}
        </p>
      )}
      <div className="hp" aria-hidden="true">
        <label htmlFor="g-hp">Bu alanı boş bırakın</label>
        <input id="g-hp" name="company_website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
      </div>
      <div className="form-foot">
        <span className="fine">Başvurunuzu inceleyip size döneriz.</span>
        <button className="btn btn-primary btn-lg" onClick={submit} disabled={status === "sending"}>
          {status === "sending" ? "Gönderiliyor…" : "Başvuruyu Gönder"}
        </button>
      </div>
    </div>
  );
}

export function GirisimProgramiPage() {
  return (
    <main id="main">
      <section className="sec" style={{ paddingBottom: "24px" }}>
        <div className="container-x">
          <h1 className="h-1" style={{ maxWidth: "18ch" }}>
            Fikrinize yatırım yapıyoruz, sitenizi biz kuruyoruz.
          </h1>
          <p className="lead" style={{ marginTop: "16px", maxWidth: "56ch" }}>
            Girişiminiz için profesyonel web sitesi, 12 ay bakım ve SEO desteği. Karşılığında nakit değil,{" "}
            <b>%2 hisse</b>.
          </p>
          <div className="hero-cta" style={{ marginTop: "30px" }}>
            <a className="btn btn-primary btn-lg" href="#basvuru">
              Başvur
            </a>
            <a className="btn btn-line btn-lg" href="#surec">
              Nasıl çalışır?
            </a>
          </div>
        </div>
      </section>

      <Reveal className="sec-s">
        <div className="container-x">
          <SectionHead title="Neler alırsınız" sub="Sitenizden bakımına, arama motorlarındaki görünürlüğüne kadar tek elden." />
          <div className="gp-cards">
            {BENEFITS.map((b) => (
              <div className="gp-card" key={b.title}>
                <Icon n={b.icon} size={28} sw={1.4} />
                <h3 className="h-3">{b.title}</h3>
                <ul>
                  {b.items.map((it) => (
                    <li key={it}>
                      <Icon n="check" size={15} sw={2.5} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="sec-s" id="surec">
        <div className="container-x">
          <SectionHead title="Nasıl çalışır" sub="Dört adım. Başvurudan yayına net bir yol haritası." />
          <ol className="proc">
            {STEPS.map((s, i) => (
              <li key={s[0]}>
                <div className="n">0{i + 1}</div>
                <h3 className="h-3">{s[0]}</h3>
                <p>{s[1]}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal className="sec-s">
        <div className="container-x">
          <SectionHead
            title="Karşılığında ne istiyoruz"
            sub="Nakit yok. Toplam %2 hisse, kademeli olarak hak ediliyor."
          />
          <div className="panel" style={{ maxWidth: "760px" }}>
            <div className="vest">
              <div className="vest-track">
                <i></i>
              </div>
              <div className="vest-stops">
                {VEST_STOPS.map((s) => (
                  <div className="vest-stop" key={s[0]}>
                    <b>{s[1]}</b>
                    <span>{s[0]}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="qnote">
              <Icon n="info" size={16} />
              Program erken biterse yalnızca hak edilmiş pay geçerli olur. Tüm detaylar sözleşmede açıkça yer alır.
            </p>
          </div>
          <ul className="gp-extra">
            {EXTRA_EXPECTATIONS.map((x) => (
              <li key={x}>
                <Icon n="chev" size={14} sw={2.5} />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className="sec-s">
        <div className="container-x">
          <SectionHead title="Kimleri arıyoruz" />
          <ul className="checks" style={{ maxWidth: "640px" }}>
            {CRITERIA.map((c) => (
              <li key={c}>
                <span className="ck">
                  <Icon n="check" size={14} sw={2.5} />
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className="sec-s" style={{ paddingBottom: "24px" }}>
        <div className="container-x">
          <div className="gp-out">
            <Icon n="info" size={20} />
            <div>
              <b>Kapsam dışı</b>
              <p style={{ margin: "4px 0 0", color: "var(--ink-2)" }}>
                E-ticaret altyapısı (bu ön görüşme sonrasında ayrıca değerlendirilir).
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <section className="sec-s" id="basvuru" style={{ paddingBottom: "96px" }}>
        <div className="container-x">
          <SectionHead title="Başvurun" sub="Formu doldurun, sizi arayalım." />
          <ApplicationForm />
        </div>
      </section>
    </main>
  );
}
