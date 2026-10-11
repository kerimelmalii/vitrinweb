import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

let transporter: Transporter | null | undefined;

/**
 * iletisim@vitrinweb.com.tr kutusunun kendi SMTP sunucusu (panel: SmarterMail) üzerinden
 * doğrudan gönderim yapan sunucu-taraflı istemci. SMTP_* değişkenleri NEXT_PUBLIC_ önekini
 * taşımaz, bu yüzden tarayıcıya hiçbir zaman gömülmez — form-webhook.ts'teki eski Apps
 * Script yönteminden farkı budur (bkz. ILETISIM-FORMU-KURULUMU.md).
 */
export function getMailer(): Transporter | null {
  if (transporter !== undefined) return transporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  transporter =
    host && user && pass
      ? nodemailer.createTransport({
          host,
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_SECURE === "true",
          auth: { user, pass },
        })
      : null;

  return transporter;
}
