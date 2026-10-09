"use client";

import Image from "next/image";
import { useState } from "react";
import { Field, Inp } from "@/components/checkout/fields";
import { Icon } from "@/components/icons";
import { COMPANY, INSTAGRAM_URL, PHONE_DIGITS, WHATSAPP_URL } from "@/data/company";
import { sendContactMessage } from "@/lib/form-webhook";
import { LIMITS, RX, clean } from "@/lib/security";
import { BASE_PATH } from "@/lib/site";

const CONTACT_EMAIL = "iletisim@vitrinweb.com.tr";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}
type Errors = Partial<Record<keyof FormState, string>>;

const blank: FormState = { name: "", email: "", subject: "", message: "" };

function mailtoUrl(f: FormState): string {
  const body = `${f.message}\n\n— ${f.name} (${f.email})`;
  const q = new URLSearchParams({ subject: f.subject, body });
  return `mailto:${CONTACT_EMAIL}?${q.toString()}`;
}

function ContactForm() {
  const [f, setF] = useState<FormState>(blank);
  const [err, setErr] = useState<Errors>({});
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "mailto" | "sending">("idle");

  const set = (k: keyof FormState, v: string) => {
    setF((o) => ({ ...o, [k]: v }));
    setErr((e) => (e[k] ? { ...e, [k]: undefined } : e));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (f.name.trim().length < 2) e.name = "Ad ve soyadınızı girin.";
    if (!RX.email.test(f.email.trim())) e.email = "Geçerli bir e-posta adresi girin.";
    if (f.subject.trim().length < 3) e.subject = "Konuyu kısaca yazın.";
    if (f.message.trim().length < 10) e.message = "Mesajınızı biraz daha ayrıntılı yazın.";
    return e;
  };

  const submit = async () => {
    /* Bot tuzağı: insanlar bu gizli alanı görmez. Doluysa sessizce durulur. */
    if (hp) return;
    const e = validate();
    setErr(e);
    if (Object.keys(e).length) {
      (document.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus();
      return;
    }
    setStatus("sending");
    const relayed = await sendContactMessage(f);
    if (relayed) {
      setStatus("sent");
    } else {
      /* Form bildirimi henüz kurulmadıysa mesaj sessizce kaybolmasın diye
         ziyaretçinin kendi e-posta uygulamasından göndermesi sağlanır. */
      window.location.href = mailtoUrl(f);
      setStatus("mailto");
    }
  };

  if (status === "sent") {
    return (
      <div className="panel">
        <h2 className="h-3">Mesajınız gönderildi.</h2>
        <p className="mute" style={{ marginTop: "8px" }}>
          En kısa sürede {CONTACT_EMAIL} üzerinden size dönüş yapacağız.
        </p>
      </div>
    );
  }
  if (status === "mailto") {
    return (
      <div className="panel">
        <h2 className="h-3">E-posta uygulamanız açıldı.</h2>
        <p className="mute" style={{ marginTop: "8px" }}>
          Mesajınız {CONTACT_EMAIL} adresine, konu ve içerikle birlikte hazırlandı — göndermek için e-posta
          uygulamanızda Gönder&apos;e basmanız yeterli.
        </p>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="grid sm:grid-cols-2 gap-x-4">
        <Field id="c-name" label="Ad Soyad" error={err.name}>
          <Inp id="c-name" maxLength={LIMITS.name} value={f.name} onValue={(v) => set("name", v)} error={err.name} autoComplete="name" />
        </Field>
        <Field id="c-email" label="E-posta" error={err.email}>
          <Inp
            id="c-email"
            type="email"
            maxLength={LIMITS.email}
            value={f.email}
            onValue={(v) => set("email", v)}
            error={err.email}
            autoComplete="email"
          />
        </Field>
      </div>
      <Field id="c-subject" label="Konu" error={err.subject}>
        <Inp id="c-subject" maxLength={LIMITS.short} value={f.subject} onValue={(v) => set("subject", v)} error={err.subject} />
      </Field>
      <Field id="c-message" label="Mesajınız" error={err.message}>
        <textarea
          className="input"
          id="c-message"
          rows={6}
          maxLength={LIMITS.text}
          value={f.message}
          onChange={(e) => set("message", clean(e.target.value, LIMITS.text))}
          aria-invalid={!!err.message}
          aria-describedby={err.message ? "c-message-e" : undefined}
        ></textarea>
      </Field>
      <div className="hp" aria-hidden="true">
        <label htmlFor="c-hp">Bu alanı boş bırakın</label>
        <input id="c-hp" name="company_website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
      </div>
      <div className="form-foot">
        <span className="fine">Mesajınız yalnızca sorunuzu yanıtlamak için kullanılır.</span>
        <button className="btn btn-primary btn-lg" onClick={submit} disabled={status === "sending"}>
          {status === "sending" ? "Gönderiliyor…" : "Gönder"}
        </button>
      </div>
    </div>
  );
}

export function ContactPage() {
  return (
    <main id="main">
      <section className="sec" style={{ paddingBottom: "24px" }}>
        <div className="container-x hero-grid">
          <div className="hero-copy">
            <h1 className="h-1" style={{ maxWidth: "16ch" }}>
              Bir sorunuz mu var? Yazın.
            </h1>
            <p className="lead" style={{ marginTop: "16px" }}>
              Siparişten önce veya sonra, aklınıza takılan her şey için formu doldurun ya da doğrudan aşağıdaki
              kanallardan ulaşın.
            </p>
          </div>
          <div className="contact-hero-visual" aria-hidden="true">
            <Image src={`${BASE_PATH}/iletisim-illustrasyon.webp`} alt="" width={758} height={974} />
          </div>
        </div>
        <div className="container-x">
          <div className="contact-layout" style={{ marginTop: "36px" }}>
            <ContactForm />
            <div className="contact-side">
              {PHONE_DIGITS && (
                <>
                  <a className="contact-card" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <Icon n="whatsapp" size={26} />
                    <div>
                      <span className="contact-label">WhatsApp</span>
                      <span className="contact-email">{COMPANY.phone}</span>
                    </div>
                  </a>
                  <a className="contact-card" href={`tel:+${PHONE_DIGITS}`}>
                    <Icon n="phone" size={26} />
                    <div>
                      <span className="contact-label">Telefon</span>
                      <span className="contact-email">{COMPANY.phone}</span>
                    </div>
                  </a>
                </>
              )}
              <a className="contact-card" href={`mailto:${CONTACT_EMAIL}`}>
                <Icon n="mail" size={26} />
                <div>
                  <span className="contact-label">E-posta</span>
                  <span className="contact-email">{CONTACT_EMAIL}</span>
                </div>
              </a>
              <a className="contact-card" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                <Icon n="instagram" size={26} />
                <div>
                  <span className="contact-label">Instagram</span>
                  <span className="contact-email">@vitrinweb.com.tr</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
