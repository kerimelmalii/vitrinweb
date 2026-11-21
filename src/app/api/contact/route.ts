import { NextRequest, NextResponse } from "next/server";

import { PRODUCTS, INTEREST_EXTRA, WEB_ADDONS, WEB_CUSTOM, interestLabel } from "@/data/products";
import { FORM_SECTORS } from "@/data/sectors";
import { getService } from "@/data/services";
import { getMailer } from "@/lib/mailer";
import { FILE_RULES, LIMITS, RX, clean, phoneOk } from "@/lib/security";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

type Body = Record<string, unknown>;

function response(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store, private" } });
}

const KIND_TITLES: Record<string, string> = {
  iletisim: "İletişim Formu",
  girisim: "Girişim Destek Programı",
  bilgi: "Bilgi Talebi",
  kesif: "Keşif Görüşmesi",
  proje: "Proje Başlangıç Formu",
  iptal: "İptal ve İade Talebi",
  ileti: "Ticari İleti Tercihi",
};

/* Sunucusuz örnekte en iyi çaba: aynı IP'den kısa sürede çok sayıda gönderimi keser. */
const HITS = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const list = (HITS.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  list.push(now);
  HITS.set(ip, list);
  if (HITS.size > 5000) HITS.clear();
  return list.length > 12;
}

const str = (v: unknown, max: number) => clean(typeof v === "string" ? v : "", max).trim();
const isEmail = (v: string) => RX.email.test(v);
const contactValid = (v: string) => isEmail(v) || phoneOk(v);

interface Prepared {
  name: string;
  email: string;
  summary: string;
  subject: string;
  text: string;
  fields: Record<string, string>;
  attachments: { filename: string; content: Buffer; contentType: string }[];
  fileName?: string;
  fileType?: string;
  /** Ziyaretçiye gidecek otomatik yanıt (e-posta adresi verdiyse). */
  auto?: { to: string; subject: string; text: string };
}

const PRODUCT_IDS = new Set([...PRODUCTS.map((p) => p.slug), ...INTEREST_EXTRA.map((x) => x.id)]);
const ADDON_SET = new Set([...WEB_ADDONS, ...WEB_CUSTOM]);

function lines(rows: [string, string][]): string {
  return rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

function prepareLead(body: Body, kind: "bilgi" | "kesif"): Prepared | null {
  const name = str(body.name, LIMITS.name);
  const contact = str(body.contact, LIMITS.email);
  const product = str(body.product, 40);
  const business = str(body.business, LIMITS.brand);
  const sector = str(body.sector, 40);
  const message = str(body.message, 1000);
  const meeting = body.meeting === true;
  const service = getService(str(body.service, 60));
  const addons = Array.isArray(body.addons) ? body.addons.filter((a): a is string => typeof a === "string" && ADDON_SET.has(a)) : [];
  if (name.length < 3 || !contactValid(contact) || !PRODUCT_IDS.has(product)) return null;
  if (sector && !FORM_SECTORS.includes(sector)) return null;
  const productName = interestLabel(product);
  const email = isEmail(contact) ? contact.toLowerCase() : "";
  const fields: Record<string, string> = {
    contact,
    business,
    sector,
    product: productName,
    message,
    meeting: meeting ? "Evet" : "Hayır",
    addons: addons.join(", "),
    service: service?.name || "",
    page: str(body.page, 120),
  };
  const subject = `[${KIND_TITLES[kind]}] ${productName}${business ? " – " + business : ""}`;
  const text = lines([
    ["Ad Soyad", name],
    ["E-posta / Telefon", contact],
    ["İşletme", business],
    ["Sektör", sector],
    ["İlgilendiği ürün", productName],
    ["Hizmet", service?.name || ""],
    ["Ek özellikler", addons.join(", ")],
    ["Keşif görüşmesi", meeting ? "Evet, planlamak istiyor" : "Hayır"],
    ["Gönderildiği sayfa", fields.page],
  ]) + (message ? `\n\n${message}` : "");
  const productLine = product === "karar-vermedim" ? "Vitrinweb çözümleri" : productName;
  const first = name.split(/\s+/)[0];
  const auto = email
    ? {
        to: email,
        subject: kind === "kesif" ? "Vitrinweb | Keşif görüşmesi talebiniz bize ulaştı" : "Vitrinweb | Bilgi talebiniz bize ulaştı",
        text:
          kind === "kesif"
            ? `Merhaba ${first},\n\nVitrinweb’e ulaştığınız için teşekkür ederiz. Keşif görüşmesi talebiniz ekibimize ulaştı. Uygun zaman dilimini netleştirmek için sizinle iletişime geçeceğiz. Talebinize eklemek istediğiniz bir bilgi varsa bu e-postayı doğrudan yanıtlayabilirsiniz.\n\nSaygılarımızla,\nVitrinweb`
            : `Merhaba ${first},\n\nVitrinweb’e ulaştığınız için teşekkür ederiz. ${productLine} hakkındaki talebiniz ekibimize ulaştı. Paylaştığınız notlar doğrultusunda ihtiyacınızı inceleyip en kısa sürede sizinle iletişime geçeceğiz. Talebinize eklemek istediğiniz bir bilgi varsa bu e-postayı doğrudan yanıtlayabilirsiniz.\n\nSaygılarımızla,\nVitrinweb`,
      }
    : undefined;
  return { name, email, summary: `${productName}${business ? " · " + business : ""}`, subject, text, fields, attachments: [], auto };
}

function prepareProject(body: Body): Prepared | null | "too-large" {
  const g = (k: string, max: number = LIMITS.short) => str(body[k], max);
  const project = g("project", 40);
  const business = g("business", LIMITS.brand);
  const person = g("person", LIMITS.name);
  const phone = g("phone", LIMITS.phone);
  const email = g("email", LIMITS.email).toLowerCase();
  if (project.length < 3 || business.length < 2 || person.length < 3 || !phoneOk(phone) || !isEmail(email)) return null;
  const publish = Array.isArray(body.publish) ? body.publish.filter((x): x is string => ["phone", "email", "address", "hours"].includes(String(x))) : [];
  const rawFiles = Array.isArray(body.files) ? body.files.slice(0, 8) : [];
  const allowed = new Set<string>([...FILE_RULES.logo, ...FILE_RULES.image]);
  const attachments: Prepared["attachments"] = [];
  let total = 0;
  for (const it of rawFiles) {
    if (!it || typeof it !== "object") return null;
    const o = it as Record<string, unknown>;
    const type = typeof o.type === "string" ? o.type : "";
    const data = typeof o.data === "string" ? o.data : "";
    if (!allowed.has(type) || !data) return null;
    const content = Buffer.from(data, "base64");
    total += content.length;
    if (total > 3 * 1024 * 1024) return "too-large";
    attachments.push({ filename: clean(typeof o.name === "string" ? o.name : "dosya", 120) || "dosya", content, contentType: type });
  }
  const pubLabel: Record<string, string> = { phone: "Telefon", email: "E-posta", address: "Adres", hours: "Çalışma saatleri" };
  const fields: Record<string, string> = {
    project,
    business,
    person,
    phone,
    address: g("address", LIMITS.address),
    hours: g("hours", 200),
    publish: publish.map((p) => pubLabel[p]).join(", "),
    about: g("about", 2000),
    services: g("services", 2000),
    social: g("social", 300),
    missing: g("missing", 2000),
    domain: g("domain", 120),
    refs: g("refs", 2000),
    style: g("style", 2000),
    cta: g("cta", 60),
    files: attachments.map((a) => a.filename).join(", "),
  };
  const text = lines([
    ["Proje numarası", project],
    ["İşletme", business],
    ["İletişim kişisi", person],
    ["Telefon", phone],
    ["E-posta", email],
    ["Adres", fields.address],
    ["Çalışma saatleri", fields.hours],
    ["Sitede yayınlanacaklar", fields.publish],
    ["Sosyal medya", fields.social],
    ["Alan adı", fields.domain],
    ["Öncelikli çağrı", fields.cta],
    ["Dosyalar", fields.files],
  ]) +
    ["about", "services", "missing", "refs", "style"]
      .filter((k) => fields[k])
      .map((k) => `\n\n${{ about: "İşletme tanıtımı", services: "Hizmetler", missing: "Hazır olmayan içerikler", refs: "Örnek siteler", style: "Renk ve görsel tercih" }[k]}:\n${fields[k]}`)
      .join("");
  return {
    name: person,
    email,
    summary: `${project} · ${business}`,
    subject: `[${KIND_TITLES.proje}] ${project} – ${business}`,
    text,
    fields,
    attachments,
    fileName: attachments.map((a) => a.filename).join(", ").slice(0, 200) || undefined,
    auto: {
      to: email,
      subject: "Vitrinweb | Proje içerikleriniz alındı",
      text: `Merhaba ${person.split(/\s+/)[0]},\n\n${project} numaralı projeniz için gönderdiğiniz içerikler bize ulaştı. Eksik veya netleştirilmesi gereken bir detay olursa sizinle iletişime geçeceğiz. Eklemek istediğiniz bir bilgi varsa bu e-postayı doğrudan yanıtlayabilirsiniz.\n\nSaygılarımızla,\nVitrinweb`,
    },
  };
}

function prepareCancel(body: Body): Prepared | null {
  const name = str(body.name, LIMITS.name);
  const contact = str(body.contact, LIMITS.email);
  const order = str(body.order, 40);
  const message = str(body.message, 1000);
  if (name.length < 3 || !contactValid(contact) || order.length < 3) return null;
  return {
    name,
    email: isEmail(contact) ? contact.toLowerCase() : "",
    summary: `İptal/iade · ${order}`,
    subject: `[${KIND_TITLES.iptal}] ${order}`,
    text: lines([
      ["Ad Soyad", name],
      ["E-posta / Telefon", contact],
      ["Sipariş veya proje numarası", order],
    ]) + (message ? `\n\n${message}` : ""),
    fields: { contact, order, message },
    attachments: [],
  };
}

function preparePreference(body: Body): Prepared | null {
  const contact = str(body.contact, LIMITS.email);
  const action = body.action === "durdur" ? "durdur" : body.action === "izin" ? "izin" : "";
  const channels = Array.isArray(body.channels) ? body.channels.filter((c): c is string => c === "E-posta" || c === "SMS") : [];
  if (!contactValid(contact) || !action || (action === "izin" && channels.length === 0)) return null;
  const label = action === "izin" ? `İzin verildi: ${channels.join(", ")}` : "Tanıtım iletilerini durdurma talebi";
  return {
    name: contact,
    email: isEmail(contact) ? contact.toLowerCase() : "",
    summary: label,
    subject: `[${KIND_TITLES.ileti}] ${label}`,
    text: lines([
      ["İletişim", contact],
      ["Talep", label],
      ["Zaman", new Date().toISOString()],
    ]),
    fields: { contact, action: action === "izin" ? "İzin" : "Durdur", channels: channels.join(", ") },
    attachments: [],
  };
}

function prepareGirisim(body: Body): Prepared | null | "too-large" {
  const founderName = str(body.founderName, LIMITS.name);
  const companyName = str(body.companyName, LIMITS.brand);
  const mail = str(body.email, LIMITS.email).toLowerCase();
  const phone = str(body.phone, LIMITS.phone);
  const city = str(body.city, LIMITS.city);
  const statusText = str(body.status, LIMITS.short);
  const description = str(body.description, LIMITS.text);
  if (founderName.length < 2 || companyName.length < 2 || !isEmail(mail) || !phoneOk(phone) || city.length < 2 || description.length < 10) return null;
  const attachments: Prepared["attachments"] = [];
  let fileName = "";
  let fileType = "";
  const fileBase64 = typeof body.fileBase64 === "string" ? body.fileBase64 : "";
  if (fileBase64) {
    fileType = typeof body.fileType === "string" ? body.fileType : "";
    fileName = clean(typeof body.fileName === "string" ? body.fileName : "", 200) || "ek";
    if (!(FILE_RULES.pitch as readonly string[]).includes(fileType)) return null;
    const content = Buffer.from(fileBase64, "base64");
    if (content.length > FILE_RULES.pitchMaxSize) return "too-large";
    attachments.push({ filename: fileName, content, contentType: fileType });
  }
  return {
    name: founderName,
    email: mail,
    summary: companyName,
    subject: `[Girişim Destek Programı] ${companyName}`,
    text: [`Kurucu: ${founderName} <${mail}>`, `Telefon: ${phone}`, `Şehir: ${city}`, `Kuruluş durumu: ${statusText}`, "", description].join("\n"),
    fields: { founderName, companyName, phone, city, status: statusText, description },
    attachments,
    fileName: fileName || undefined,
    fileType: fileType || undefined,
  };
}

function prepareContact(body: Body): Prepared | null {
  const mail = str(body.email, LIMITS.email).toLowerCase();
  const subject = str(body.subject, LIMITS.short);
  const message = str(body.message, LIMITS.text);
  const name = str(body.name, LIMITS.name);
  if (name.length < 2 || !isEmail(mail) || subject.length < 3 || message.length < 10) return null;
  return {
    name,
    email: mail,
    summary: subject,
    subject: `[vitrinweb.com.tr İletişim Formu] ${subject}`,
    text: `${message}\n\n—\n${name} <${mail}>`,
    fields: { subject, message },
    attachments: [],
  };
}

/**
 * Sitedeki tüm formları işler (`kind`: iletisim, girisim, bilgi, kesif, proje, iptal, ileti). Kalıcı
 * kayıt Supabase'teki contact_messages tablosudur (admin panelin tek güvenilir kaynağı); e-posta
 * bildirimi SMTP üzerinden ayrıca, en iyi çaba ile denenir. İkisinden biri başarılı olduğu sürece
 * istek başarılı sayılır; ikisi de başarısız olursa 503 döner ve istemci ziyaretçiyi doğrudan
 * WhatsApp/e-posta kanalına yönlendirir.
 */
export async function POST(request: NextRequest) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return response({ ok: false, error: "Geçersiz istek." }, 400);
  }
  if (!body || typeof body !== "object") return response({ ok: false, error: "Geçersiz istek." }, 400);

  const kind = typeof body.kind === "string" && body.kind in KIND_TITLES ? body.kind : "iletisim";

  /* Bot tuzağı: görünmeyen alan doldurulduysa kayıt açmadan başarılı yanıt verilir. */
  if (typeof body.website === "string" && body.website.trim()) return response({ ok: true });

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "yerel";
  if (limited(ip)) return response({ ok: false, error: "Çok fazla deneme. Lütfen biraz sonra tekrar deneyin." }, 429);

  const prepared =
    kind === "girisim"
      ? prepareGirisim(body)
      : kind === "bilgi" || kind === "kesif"
        ? prepareLead(body, kind)
        : kind === "proje"
          ? prepareProject(body)
          : kind === "iptal"
            ? prepareCancel(body)
            : kind === "ileti"
              ? preparePreference(body)
              : prepareContact(body);

  if (prepared === "too-large") return response({ ok: false, error: "Dosya çok büyük." }, 413);
  if (!prepared) return response({ ok: false, error: "Form bilgileri geçersiz." }, 400);

  const to = process.env.CONTACT_TO || "iletisim@vitrinweb.com.tr";
  const from = process.env.SMTP_FROM || `"Vitrinweb" <${process.env.SMTP_USER}>`;

  let emailSent = false;
  const mailer = getMailer();
  if (mailer) {
    try {
      await mailer.sendMail({
        to,
        from,
        replyTo: prepared.email || undefined,
        subject: prepared.subject,
        text: prepared.text,
        attachments: prepared.attachments,
      });
      emailSent = true;
    } catch (error) {
      console.error("Form e-postası gönderilemedi:", { message: error instanceof Error ? error.message : "Bilinmeyen hata" });
    }
  }

  let stored = false;
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const row = {
      kind,
      name: prepared.name,
      email: prepared.email,
      summary: prepared.summary,
      fields: prepared.fields,
      file_name: prepared.fileName || null,
      file_type: prepared.fileType || null,
      email_sent: emailSent,
    };
    let { error } = await supabase.from("contact_messages").insert(row);
    /* Tabloda tür için bir kısıt varsa yeni türler "iletisim" olarak, gerçek türü alanlarda taşıyarak kaydedilir. */
    if (error && error.code === "23514" && kind !== "iletisim" && kind !== "girisim") {
      ({ error } = await supabase.from("contact_messages").insert({ ...row, kind: "iletisim", fields: { ...prepared.fields, tur: kind } }));
    }
    stored = !error;
    if (error) console.error("Form kaydı oluşturulamadı:", { message: error.message, code: error.code });
  }

  if (!(stored || emailSent)) return response({ ok: false, error: "Form şu anda gönderilemiyor." }, 503);

  if (mailer && prepared.auto) {
    try {
      await mailer.sendMail({ to: prepared.auto.to, from, replyTo: to, subject: prepared.auto.subject, text: prepared.auto.text });
    } catch (error) {
      console.error("Otomatik yanıt gönderilemedi:", { message: error instanceof Error ? error.message : "Bilinmeyen hata" });
    }
  }
  return response({ ok: true });
}
