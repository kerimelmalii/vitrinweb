/* ================= FORM BİLDİRİMLERİ =================
   /iletisim ve /girisim-programi formları, buradaki fonksiyonlarla sunucudaki
   /api/contact uç noktasına POST eder; o da iletisim@vitrinweb.com.tr kutusunun
   kendi SMTP sunucusu üzerinden doğrudan e-posta gönderir (bkz. src/lib/mailer.ts,
   src/app/api/contact/route.ts). `kind` alanı hangi form olduğunu belirtir.
   Kurulum: bkz. ILETISIM-FORMU-KURULUMU.md.

   SMTP ortam değişkenleri sunucuda tanımlı değilse (kurulum henüz yapılmadıysa)
   uç nokta false döner; çağıran taraf bu durumda ziyaretçinin kendi e-posta
   uygulamasından göndermesi için bir mailto: bağlantısına yönlendirir — mesaj
   hiçbir zaman kaybolmaz. */

async function postForm(payload: Record<string, string>): Promise<boolean> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    return res.ok && !!result?.ok;
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
