# Form bildirimlerini e-postaya bağlama (kurulum)

`/iletisim` ve `/girisim-programi` sayfalarındaki formlar, bu kurulum yapılmadan **kendi başına
hiçbir yere e-posta gönderemez**. Bu belge, her iki formun da gönderildiğinde otomatik olarak
**iletisim@vitrinweb.com.tr** adresine bir e-posta olarak düşmesini sağlayan kurulumu anlatır.

Gönderim, sunucudaki `/api/contact` uç noktası (`src/app/api/contact/route.ts`) üzerinden,
**iletisim@vitrinweb.com.tr kutusunun kendi SMTP sunucusu** ile doğrudan yapılır (bkz.
`src/lib/mailer.ts`, [nodemailer](https://nodemailer.com/)). Böylece giden e-postalarda hem
**Gönderen** hem **Alıcı** `iletisim@vitrinweb.com.tr` olur — kişisel bir Gmail hesabı hiçbir
şekilde karışmaz. `kind` alanı hangi formdan geldiğini belirtir (`iletisim` veya `girisim`),
uç nokta buna göre farklı bir e-posta konusu/gövdesi oluşturur.

Bu kurulum yapılmadan da formlar **çalışır**: ziyaretçinin "Gönder" tuşuna basması, mesajı hazır
şekilde kendi e-posta uygulamasında açar (ziyaretçi oradan Gönder'e basar). Aşağıdaki kurulum, bu
ekstra adımı ortadan kaldırıp gönderimi tamamen otomatik hale getirir.

## 1. SMTP bilgilerini posta panelinden al

`iletisim@vitrinweb.com.tr` kutusunun webmail panelinde (bu projede SmarterMail) soldaki
**Ayarlar → Hesap** altında posta istemcisi (Outlook, telefon vb.) bağlantısı için gösterilen
sunucu adresini bul — genelde `srvX.saglayici.com` gibi bir host ve SMTP için 587 (TLS) ya da
465 (SSL) portu olur. Kutunun kendi giriş şifresini not et (Vercel'e şifreyi sen gireceksin, bu
belgede saklanmaz).

## 2. Vercel'e ortam değişkenlerini ekle

Vercel projende **Settings → Environment Variables** ile aşağıdaki değerleri **Production**
ortamı için ekle. Bunların hiçbiri `NEXT_PUBLIC_` önekini taşımaz — yalnızca sunucuda çalışır,
tarayıcıya hiçbir zaman gönderilmez (önceki Apps Script yönteminden farkı budur).

| Ad | Değer | Zorunlu |
|---|---|---|
| `SMTP_HOST` | Panelden aldığın sunucu adresi (örn. `srv06.saglayici.com`) | Evet |
| `SMTP_PORT` | Panelden aldığın port (örn. `587`) — boş bırakılırsa `587` varsayılır | Hayır |
| `SMTP_SECURE` | Port 465 (SSL) kullanıyorsan `true`, 587 (TLS/STARTTLS) kullanıyorsan `false` ya da boş bırak | Hayır |
| `SMTP_USER` | `iletisim@vitrinweb.com.tr` | Evet |
| `SMTP_PASS` | Kutunun giriş şifresi | Evet |
| `CONTACT_TO` | Mesajların düşeceği adres — boş bırakılırsa `iletisim@vitrinweb.com.tr` | Hayır |
| `SMTP_FROM` | Gönderen başlığı — boş bırakılırsa `"Vitrinweb" <SMTP_USER>` | Hayır |

Kaydettikten sonra Vercel'de yeni bir deploy tetiklenmesi gerekir (bir sonraki `main` push'u
otomatik yapar, aksi hâlde Vercel panelinden **Deployments → ⋯ → Redeploy** ile elle
tetikleyebilirsin).

## Nasıl çalışır?

- **Kurulum tamamlandıysa:** Hangi formdan gönderilirse gönderilsin (iletişim veya girişim
  programı başvurusu), veri `/api/contact`'a POST edilir; uç nokta `kind` alanına bakıp uygun
  konuyla `CONTACT_TO` adresine bir e-posta gönderir (gönderenin e-postası `replyTo` olarak
  ayarlanır, yanıtla tuşuna basman yeterli). Girişim programı başvurusunda bir dosya (sunum, PDF
  vb.) seçilmişse, tarayıcıda base64'e çevrilip aynı istekle gönderilir ve e-postaya ek olarak
  eklenir. Ziyaretçiye başarı mesajı gösterilir.
- **Kurulum henüz yapılmadıysa** (`SMTP_HOST`/`SMTP_USER`/`SMTP_PASS` tanımsız): `/api/contact`
  `503` ile `ok:false` döner, ilgili form ziyaretçinin kendi e-posta uygulamasını konu ve mesaj
  dolu şekilde açar; ziyaretçi oradan gönderir. Mesaj hiçbir zaman sessizce kaybolmaz — yalnızca
  seçilen dosya bu yolla otomatik eklenemez (mailto bağlantıları dosya ekleyemez), ziyaretçiye
  açılan e-postaya dosyayı elle eklemesi gerektiği söylenir.

## Sınırlamalar (bilerek kabul edilen)

- Girişim programı başvuru formundaki dosya eki tek dosya ve en fazla 8 MB ile sınırlıdır (PDF,
  PPT, Word veya görsel) — alıcı kutusunun tek e-postadaki toplam ek boyutu sınırının altında
  kalmak için kasıtlı olarak düşük tutuldu.
- Her iki form da gizli bir "bal küpü" (honeypot) alanı içerir; botlar bu alanı doldurursa
  gönderim istemci tarafında sessizce durulur.
- Spam/hız sınırlaması yoktur (istemci tarafı doğrulama ve sunucu tarafı alan doğrulaması
  dışında). `/api/contact` doğrudan dışarıdan POST edilebilir bir uç nokta olduğu için kötüye
  kullanım görülürse ilk çare SMTP şifresini (`SMTP_PASS`) değiştirip Vercel'de güncellemektir.
