"use client";

import { useState } from "react";
import { Field, Inp } from "@/components/checkout/fields";
import { FileField } from "@/components/file-field";
import { Icon } from "@/components/icons";
import Link from "next/link";
import { StartupArt, VEST } from "@/components/art";
import { Crumbs, FaqList, SecHead, Steps } from "@/components/ui";
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

const BENEFITS: { icon: "layout" | "shield" | "trend"; title: string; items: string[] }[] = [
  {
    icon: "layout",
    title: "Web sitesi",
    items: [
      "5-6 sayfalık, mobil uyumlu, özel tasarım web sitesi",
      "2 revizyon turu",
      "Google Search Console ve Analytics kurulumu",
    ],
  },
  {
    icon: "shield",
    title: "12 ay bakım",
    items: ["Güncellemeler, yedekleme, güvenlik kontrolü", "Ayda 2-3 saate kadar içerik değişikliği"],
  },
  {
    icon: "trend",
    title: "SEO desteği",
    items: [
      "Ayda 1-2 içerik veya sayfa optimizasyonu",
      "Google İşletme Profili kurulumu",
      "Aylık performans raporu",
    ],
  },
];

const STEPS = [
  { t: "Başvurun.", d: "Formu doldurun; girişiminizi, problemi ve çözümünüzü birkaç cümleyle anlatın. Varsa sunumunuzu ekleyin." },
  { t: "Tanışalım.", d: "Kısa bir görüşmede ekibinizi, hedeflerinizi ve dijital tarafta önceliğiniz olan adımları konuşalım." },
  { t: "Sözleşmeyi imzalayalım.", d: "Seçilen girişimlerle kapsam, takvim ve kademeli hak ediş koşulları yazılı sözleşmeyle netleşir." },
  { t: "Yayına alalım ve destekleyelim.", d: "Siteniz 3-4 hafta içinde yayında olur; 12 aylık bakım ve SEO desteği başlar." },
];

/* Programın ana paketi dışında kalan, ihtiyaç doğduğunda kapsamı ve koşulları ayrıca belirlenen destekler. */
const MORE: { slug: string; name: string; d: string; icon: string }[] = [
  { slug: "urun-gorsel-studyosu", name: "Ürün Görsel Stüdyosu", icon: "image", d: "Lansman, satış sayfası ve yatırımcı sunumu için tutarlı ürün görselleri." },
  { slug: "meta-reklam-paneli", name: "Meta Reklam Paneli", icon: "trend", d: "İlk kampanyalarınızın harcama ve sonuçlarını tek ekranda okuyun." },
  { slug: "musteri-bulma", name: "Müşteri Bulma", icon: "target", d: "İlk B2B müşterileriniz için hedef listesi ve satış takibi." },
  { slug: "google-haritalar-karnesi", name: "Google Haritalar Karnesi", icon: "pin", d: "Yerel hizmet veren girişimler için profil denetimi." },
];

const FAQS = [
  {
    q: "Neden nakit yerine hisse?",
    a: "Erken aşamadaki girişimlerin nakdi en kritik kaynaklarından biridir. Dijital altyapınızı birlikte kurup sizinle aynı hedefe bakmak istiyoruz; bu yüzden karşılığında nakit değil, kademeli olarak hak edilen küçük bir pay alıyoruz.",
  },
  {
    q: "Pay neden kademeli olarak hak ediliyor?",
    a: "Pay, destek sürdükçe hak edilir: teslimde %0,5, ardından her üç ayda bir artarak 12. ayın sonunda toplam %2. Program erken biterse yalnızca hak edilmiş pay geçerli olur. Tüm detaylar sözleşmede açıkça yer alır.",
  },
  {
    q: "Şirketim henüz kurulmadıysa başvurabilir miyim?",
    a: "Evet. Kurulmuş veya yakında kurulacak girişimlerin başvurularını değerlendiriyoruz; kuruluş durumunuzu formda belirtmeniz yeterli.",
  },
  {
    q: "Programa kabul edilmezsem ne olur?",
    a: "Başvurunuzu inceleyip size dönüş yaparız. Program sizin için uygun değilse, ihtiyacınıza uyan ürün ve hizmetlerimizi standart çalışma modelimizle önerebiliriz.",
  },
  {
    q: "Programda olmayan bir dijital ihtiyacımız olursa?",
    a: "Görsel üretim, reklam raporlama veya müşteri takibi gibi ihtiyaçlar ana paketin dışındadır; ihtiyaç doğduğunda kapsamını ve koşullarını sizinle birlikte belirleriz.",
  },
];

const CRITERIA = [
  "Net bir problem ve çözüm tanımı",
  "Kararlı bir kurucu ekip",
  "Kurulmuş veya yakında kurulacak bir şirket",
  "Birlikte büyümeye açık olmak",
];

const EXTRA_EXPECTATIONS = [
  "Sitenizin alt bilgisinde küçük bir Vitrinweb bağlantısı",
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
    <div className="panel gp-form">
      <div className="lead-grid">
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
          {status === "sending" ? "Gönderiliyor…" : "Başvuruyu Gönderin"}
        </button>
      </div>
    </div>
  );
}

export function GirisimProgramiPage() {
  return (
    <main id="main">
      <section className="phero">
        <div className="container-x phero-grid">
          <div className="phero-copy">
            <Crumbs items={[{ label: "Girişimlere Destek" }]} />
            <p className="pname">
              <Icon n="spark" size={20} sw={1.8} />
              Girişim Destek Programı
            </p>
            <h1 className="h-1">Fikrinize ortak oluyoruz, dijital altyapınızı birlikte kuruyoruz.</h1>
            <p className="lead">
              Yeni kurulan girişimlere profesyonel web sitesi, 12 ay bakım ve SEO desteği sunuyoruz. Karşılığında nakit değil, 12 ay boyunca kademeli
              olarak hak edilen toplam <b>%2 pay</b> alıyoruz.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary btn-lg" href="#basvuru">
                Başvurun
              </a>
              <a className="btn btn-line btn-lg" href="#program">
                Programı İnceleyin
              </a>
            </div>
          </div>
          <figure className="phero-shot">
            <div className="phero-art">
              <StartupArt />
            </div>
            <figcaption className="fine">Örnek girişim sitesi ve kademeli hak ediş takvimi</figcaption>
          </figure>
        </div>
      </section>

      <section className="sec" id="program" aria-labelledby="gp-kapsam">
        <div className="container-x">
          <SecHead id="gp-kapsam" title="Program kapsamında neler var?" sub="Sitenizden bakımına, arama motorlarındaki görünürlüğüne kadar tek elden." />
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
      </section>

      <section className="sec sec-tint" aria-labelledby="gp-surec">
        <div className="container-x">
          <SecHead id="gp-surec" title="Nasıl ilerliyoruz?" sub="Başvurudan yayına dört adım; her adımda ne olacağını önceden bilirsiniz." />
          <Steps steps={STEPS} cols={4} />
        </div>
      </section>

      <section className="sec" aria-labelledby="gp-karsilik">
        <div className="container-x split">
          <div>
            <h2 className="h-2" id="gp-karsilik">
              Karşılığında ne istiyoruz?
            </h2>
            <p className="lead">Nakit yok. Toplam %2 pay, destek sürdükçe kademeli olarak hak ediliyor.</p>
            <ul className="chk" style={{ marginTop: 22 }}>
              {EXTRA_EXPECTATIONS.map((x) => (
                <li key={x}>
                  <Icon n="check" size={16} sw={2.4} />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="vest-card">
            <ol className="vest-list">
              {VEST.map(([when, pct], i) => (
                <li key={when}>
                  <span className="vest-dot" aria-hidden="true">
                    {i === VEST.length - 1 ? <Icon n="check" size={14} sw={2.6} /> : null}
                  </span>
                  <span className="vest-when">{when}</span>
                  <b>{pct}</b>
                </li>
              ))}
            </ol>
            <p className="note-safe">
              <Icon n="info" size={15} /> Program erken biterse yalnızca hak edilmiş pay geçerli olur. Tüm detaylar sözleşmede açıkça yer alır.
            </p>
          </div>
        </div>
      </section>

      <section className="sec sec-tint" aria-labelledby="gp-ek">
        <div className="container-x">
          <SecHead
            id="gp-ek"
            title="Büyüdükçe yanınızdayız."
            sub="Ana paketin dışında kalan dijital ihtiyaçlarınızda da ürünlerimizle destek oluyoruz; kapsamı ve koşulları ihtiyaç doğduğunda birlikte belirliyoruz."
          />
          <ul className="gp-more">
            {MORE.map((m) => (
              <li key={m.slug}>
                <Link href={`/urunler/${m.slug}`}>
                  <Icon n={m.icon} size={22} sw={1.7} />
                  <b>{m.name}</b>
                  <span>{m.d}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec" aria-labelledby="gp-kim">
        <div className="container-x">
          <div className="fitw">
            <div>
              <h2 className="h-3" id="gp-kim">
                Kimleri arıyoruz?
              </h2>
              <ul className="chk" style={{ marginTop: 16 }}>
                {CRITERIA.map((c) => (
                  <li key={c}>
                    <Icon n="check" size={16} sw={2.4} />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="h-3">Kapsam dışı</h2>
              <p>E-ticaret altyapısı programa dahil değildir; ihtiyaç varsa tanışma görüşmesinden sonra ayrıca değerlendirilir.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="gp-sss">
        <div className="container-x narrow">
          <SecHead id="gp-sss" title="Sık sorulan sorular" />
          <FaqList items={FAQS} idPrefix="sss-girisim" />
        </div>
      </section>

      <section className="sec" id="basvuru" style={{ paddingTop: 0 }} aria-labelledby="gp-basvuru">
        <div className="container-x">
          <div className="final-form">
            <div>
              <h2 className="h-1" id="gp-basvuru">
                Başvurun, girişiminizi tanıyalım.
              </h2>
              <p className="lead">Formu doldurun; başvurunuzu inceleyip size dönüş yapalım. Varsa sunumunuzu da ekleyebilirsiniz.</p>
              <p className="fine">
                Kişisel verilerinizin işlenmesine ilişkin detayları <Link href="/yasal/kvkk">KVKK Aydınlatma Metni</Link>’nde inceleyebilirsiniz.
              </p>
            </div>
            <ApplicationForm />
          </div>
        </div>
      </section>
    </main>
  );
}

