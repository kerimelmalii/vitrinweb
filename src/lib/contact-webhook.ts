/* ================= İLETİŞİM FORMU BİLDİRİMİ (Google Apps Script) =================
   Site tamamen statiktir; formun kendisi hiçbir yere veri kaydetmez. Bu fonksiyon,
   NEXT_PUBLIC_CONTACT_FORM_URL tanımlıysa mesajı bir Google Apps Script Web App
   uç noktasına gönderir; o da MailApp.sendEmail() ile iletisim@vitrinweb.com.tr
   adresine bir e-posta olarak iletir. Kurulum: bkz. ILETISIM-FORMU-KURULUMU.md.

   URL tanımlı değilse (kurulum henüz yapılmadıysa) bu fonksiyon false döner;
   çağıran taraf (contact-page.tsx) bu durumda ziyaretçinin kendi e-posta
   uygulamasından göndermesi için bir mailto: bağlantısına yönlendirir — mesaj
   hiçbir zaman sessizce kaybolmaz. */

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactMessage(msg: ContactMessage): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_CONTACT_FORM_URL;
  if (!url) return false;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        secret: process.env.NEXT_PUBLIC_CONTACT_FORM_SECRET || "",
        name: msg.name,
        email: msg.email,
        subject: msg.subject,
        message: msg.message,
      }),
    });
    return true;
  } catch {
    return false;
  }
}
