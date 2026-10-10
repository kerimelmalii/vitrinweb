/* ================= FORM BİLDİRİMLERİ (Google Apps Script) =================
   Site tamamen statiktir; formların hiçbiri kendi başına veri kaydetmez/e-posta
   gönderemez. Bu dosyadaki fonksiyonlar, NEXT_PUBLIC_CONTACT_FORM_URL tanımlıysa
   ilgili formu aynı Google Apps Script Web App uç noktasına gönderir; o da
   MailApp.sendEmail() ile e-posta olarak iletir. `kind` alanı hangi form
   olduğunu (ve hangi e-posta şablonunun kullanılacağını) belirtir.
   Kurulum: bkz. ILETISIM-FORMU-KURULUMU.md.

   URL tanımlı değilse (kurulum henüz yapılmadıysa) fonksiyonlar false döner;
   çağıran taraf bu durumda ziyaretçinin kendi e-posta uygulamasından göndermesi
   için bir mailto: bağlantısına yönlendirir — mesaj hiçbir zaman kaybolmaz. */

async function postForm(payload: Record<string, string>): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_CONTACT_FORM_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret: process.env.NEXT_PUBLIC_CONTACT_FORM_SECRET || "", ...payload }),
    });
    /* Apps Script, yanlış secret veya kendi içindeki bir hatada da HTTP 200 döner
       (ContentService özel bir durum kodu veremez) — gövde "ok" değilse fetch()
       başarıyla çözülse bile mesaj gerçekte işlenmemiş demektir; bu durumda sessizce
       "gönderildi" göstermek yerine mailto yedeğine düşülmeli (bkz. çağıran taraf). */
    return res.ok && (await res.text()).trim() === "ok";
  } catch {
    return false;
  }
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactMessage(msg: ContactMessage): Promise<boolean> {
  return postForm({ kind: "iletisim", ...msg });
}

export interface StartupApplication {
  founderName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  status: string;
  description: string;
  fileName?: string;
  fileType?: string;
  fileBase64?: string;
}

export async function sendStartupApplication(app: StartupApplication): Promise<boolean> {
  return postForm({
    kind: "girisim",
    ...app,
    fileName: app.fileName || "",
    fileType: app.fileType || "",
    fileBase64: app.fileBase64 || "",
  });
}
