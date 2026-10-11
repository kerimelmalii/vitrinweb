import { NextRequest, NextResponse } from "next/server";

import { getMailer } from "@/lib/mailer";
import { FILE_RULES, LIMITS, RX, clean, phoneOk } from "@/lib/security";

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
 * /iletisim ve /girisim-programi formlarını iletisim@vitrinweb.com.tr kutusunun kendi
 * SMTP sunucusu üzerinden doğrudan gönderir (bkz. src/lib/mailer.ts). Form istemcisi
 * (form-webhook.ts) bu uç nokta false dönerse ziyaretçiyi mailto: yedeğine yönlendirir,
 * bu yüzden burada hata durumunda mesaj hiçbir zaman sessizce kaybolmaz.
 */
export async function POST(request: NextRequest) {
  const mailer = getMailer();
  if (!mailer) {
    return response({ ok: false, error: "E-posta gönderimi yapılandırılmamış." }, 503);
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return response({ ok: false, error: "Geçersiz istek." }, 400);
  }

  const to = process.env.CONTACT_TO || "iletisim@vitrinweb.com.tr";
  const from = process.env.SMTP_FROM || `"Vitrinweb" <${process.env.SMTP_USER}>`;

  try {
    if (body.kind === "girisim") {
      const founderName = clean(body.founderName, LIMITS.name).trim();
      const companyName = clean(body.companyName, LIMITS.brand).trim();
      const email = clean(body.email, LIMITS.email).trim().toLowerCase();
      const phone = clean(body.phone, LIMITS.phone).trim();
      const city = clean(body.city, LIMITS.city).trim();
      const statusText = clean(body.status, LIMITS.short).trim();
      const description = clean(body.description, LIMITS.text).trim();

      if (
        founderName.length < 2 ||
        companyName.length < 2 ||
        !RX.email.test(email) ||
        !phoneOk(phone) ||
        city.length < 2 ||
        description.length < 10
      ) {
        return response({ ok: false, error: "Başvuru bilgileri geçersiz." }, 400);
      }

      const attachments = [];
      const fileBase64 = typeof body.fileBase64 === "string" ? body.fileBase64 : "";
      if (fileBase64) {
        const fileType = typeof body.fileType === "string" ? body.fileType : "";
        const fileName = clean(typeof body.fileName === "string" ? body.fileName : "", 200) || "ek";
        if (!(FILE_RULES.pitch as readonly string[]).includes(fileType)) {
          return response({ ok: false, error: "Dosya türü desteklenmiyor." }, 400);
        }
        const content = Buffer.from(fileBase64, "base64");
        if (content.length > FILE_RULES.pitchMaxSize) {
          return response({ ok: false, error: "Dosya çok büyük." }, 400);
        }
        attachments.push({ filename: fileName, content, contentType: fileType });
      }

      await mailer.sendMail({
        to,
        from,
        replyTo: email,
        subject: `[Girişim Destek Programı] ${companyName}`,
        text: [
          `Kurucu: ${founderName} <${email}>`,
          `Telefon: ${phone}`,
          `Şehir: ${city}`,
          `Kuruluş durumu: ${statusText}`,
          "",
          description,
        ].join("\n"),
        attachments,
      });
    } else {
      const name = clean(body.name, LIMITS.name).trim();
      const email = clean(body.email, LIMITS.email).trim().toLowerCase();
      const subject = clean(body.subject, LIMITS.short).trim();
      const message = clean(body.message, LIMITS.text).trim();

      if (name.length < 2 || !RX.email.test(email) || subject.length < 3 || message.length < 10) {
        return response({ ok: false, error: "Mesaj bilgileri geçersiz." }, 400);
      }

      await mailer.sendMail({
        to,
        from,
        replyTo: email,
        subject: `[vitrinweb.com.tr İletişim Formu] ${subject}`,
        text: `${message}\n\n—\n${name} <${email}>`,
      });
    }

    return response({ ok: true });
  } catch (error) {
    console.error("Form e-postası gönderilemedi:", {
      message: error instanceof Error ? error.message : "Bilinmeyen hata",
    });
    return response({ ok: false, error: "Mesaj şu anda gönderilemiyor." }, 503);
  }
}
