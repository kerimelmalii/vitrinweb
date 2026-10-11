import { NextRequest, NextResponse } from "next/server";

import { getMailer } from "@/lib/mailer";
import { FILE_RULES, LIMITS, RX, clean, phoneOk } from "@/lib/security";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

interface ContactBody {
  kind?: unknown;
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  founderName?: unknown;
  companyName?: unknown;
  phone?: unknown;
  city?: unknown;
  status?: unknown;
  description?: unknown;
  fileName?: unknown;
  fileType?: unknown;
  fileBase64?: unknown;
}

function response(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store, private" } });
}

/**
 * /iletisim ve /girisim-programi formlarını işler. Kalıcı kayıt Supabase'teki
 * contact_messages tablosudur (admin panelin tek güvenilir kaynağı — orders ile
 * aynı desen, bkz. src/lib/supabase-admin.ts); e-posta bildirimi iletisim@vitrinweb.com.tr
 * kutusunun kendi SMTP sunucusu üzerinden (src/lib/mailer.ts) ayrıca, en iyi çaba ile
 * denenir. İkisinden biri başarılı olduğu sürece mesaj kaybolmaz; ikisi de başarısız
 * olursa form istemcisi (form-webhook.ts) ziyaretçiyi mailto: yedeğine yönlendirir.
 */
export async function POST(request: NextRequest) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return response({ ok: false, error: "Geçersiz istek." }, 400);
  }

  const to = process.env.CONTACT_TO || "iletisim@vitrinweb.com.tr";
  const from = process.env.SMTP_FROM || `"Vitrinweb" <${process.env.SMTP_USER}>`;
  const isGirisim = body.kind === "girisim";

  let name: string;
  let email: string;
  let summary: string;
  let mailSubject: string;
  let mailText: string;
  let fields: Record<string, string>;
  let attachments: { filename: string; content: Buffer; contentType: string }[] = [];
  let fileName = "";
  let fileType = "";

  if (isGirisim) {
    const founderName = clean(body.founderName, LIMITS.name).trim();
    const companyName = clean(body.companyName, LIMITS.brand).trim();
    const mail = clean(body.email, LIMITS.email).trim().toLowerCase();
    const phone = clean(body.phone, LIMITS.phone).trim();
    const city = clean(body.city, LIMITS.city).trim();
    const statusText = clean(body.status, LIMITS.short).trim();
    const description = clean(body.description, LIMITS.text).trim();

    if (
      founderName.length < 2 ||
      companyName.length < 2 ||
      !RX.email.test(mail) ||
      !phoneOk(phone) ||
      city.length < 2 ||
      description.length < 10
    ) {
      return response({ ok: false, error: "Başvuru bilgileri geçersiz." }, 400);
    }

    const fileBase64 = typeof body.fileBase64 === "string" ? body.fileBase64 : "";
    if (fileBase64) {
      fileType = typeof body.fileType === "string" ? body.fileType : "";
      fileName = clean(typeof body.fileName === "string" ? body.fileName : "", 200) || "ek";
      if (!(FILE_RULES.pitch as readonly string[]).includes(fileType)) {
        return response({ ok: false, error: "Dosya türü desteklenmiyor." }, 400);
      }
      const content = Buffer.from(fileBase64, "base64");
      if (content.length > FILE_RULES.pitchMaxSize) {
        return response({ ok: false, error: "Dosya çok büyük." }, 400);
      }
      attachments = [{ filename: fileName, content, contentType: fileType }];
    }

    name = founderName;
    email = mail;
    summary = companyName;
    mailSubject = `[Girişim Destek Programı] ${companyName}`;
    mailText = [
      `Kurucu: ${founderName} <${mail}>`,
      `Telefon: ${phone}`,
      `Şehir: ${city}`,
      `Kuruluş durumu: ${statusText}`,
      "",
      description,
    ].join("\n");
    fields = { founderName, companyName, phone, city, status: statusText, description };
  } else {
    const mail = clean(body.email, LIMITS.email).trim().toLowerCase();
    const subject = clean(body.subject, LIMITS.short).trim();
    const message = clean(body.message, LIMITS.text).trim();
    name = clean(body.name, LIMITS.name).trim();

    if (name.length < 2 || !RX.email.test(mail) || subject.length < 3 || message.length < 10) {
      return response({ ok: false, error: "Mesaj bilgileri geçersiz." }, 400);
    }

    email = mail;
    summary = subject;
    mailSubject = `[vitrinweb.com.tr İletişim Formu] ${subject}`;
    mailText = `${message}\n\n—\n${name} <${mail}>`;
    fields = { subject, message };
  }

  let emailSent = false;
  const mailer = getMailer();
  if (mailer) {
    try {
      await mailer.sendMail({ to, from, replyTo: email, subject: mailSubject, text: mailText, attachments });
      emailSent = true;
    } catch (error) {
      console.error("Form e-postası gönderilemedi:", {
        message: error instanceof Error ? error.message : "Bilinmeyen hata",
      });
    }
  }

  let stored = false;
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert({
      kind: isGirisim ? "girisim" : "iletisim",
      name,
      email,
      summary,
      fields,
      file_name: fileName || null,
      file_type: fileType || null,
      email_sent: emailSent,
    });
    stored = !error;
    if (error) {
      console.error("Form kaydı oluşturulamadı:", { message: error.message });
    }
  }

  if (stored || emailSent) {
    return response({ ok: true });
  }
  return response({ ok: false, error: "Mesaj şu anda gönderilemiyor." }, 503);
}
