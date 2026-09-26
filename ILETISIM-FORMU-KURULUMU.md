# İletişim formunu e-postaya bağlama (kurulum)

`/iletisim` sayfasındaki form, doldurulup gönderildiğinde site tamamen statik olduğu için **kendi başına hiçbir yere e-posta gönderemez**. Bu belge, formun gönderildiğinde mesajın otomatik olarak **iletisim@vitrinweb.com.tr** adresine bir e-posta olarak düşmesini sağlayan kurulumu anlatır — SIPARIS-TAKIBI.md'deki sipariş bildirimiyle birebir aynı yöntem (Google Apps Script), farklı olarak bu sefer bir tabloya satır eklemek yerine doğrudan e-posta gönderiyor.

Bu kurulum yapılmadan da form **çalışır**: ziyaretçinin "Gönder" tuşuna basması, mesajı hazır şekilde kendi e-posta uygulamasında açar (ziyaretçi oradan Gönder'e basar). Aşağıdaki kurulum, bu ekstra adımı ortadan kaldırıp gönderimi tamamen otomatik hale getirir.

Ücretsiz ve ~10 dakikalık bir kurulumdur.

## 1. Google E-Tablo oluştur (yalnızca betiği barındırmak için)

1. [sheets.new](https://sheets.new) adresine git.
2. Adını **"Vitrin İletişim Formu"** yap (içeriği boş kalacak, yalnızca aşağıdaki betiği barındırıyor).

## 2. Apps Script'i ekle

1. Üst menüden **Uzantılar (Extensions) → Apps Script**.
2. Hazır kodu silip aşağıdakini yapıştır:

```javascript
// ÖNEMLİ: Aşağıdaki metni olduğu gibi bırakmayın, kendi rastgele değerinizle değiştirin.
// Bir tane üretmek için: bu kodu geçici olarak yapıştırıp "Çalıştır (Run)" deyin, sonra
// üstteki "Yürütme günlüğü (Execution log)" sekmesinde çıkan değeri kopyalayıp SHARED_SECRET
// olarak buraya yapıştırın: function uretVeYazdir(){Logger.log(Utilities.getUuid())}
const SHARED_SECRET = "BURAYA_KENDI_RASTGELE_ANAHTARINIZI_YAZIN";
const ALICI = "iletisim@vitrinweb.com.tr";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SHARED_SECRET) {
      return ContentService.createTextOutput("forbidden");
    }
    const name = (data.name || "").slice(0, 200);
    const email = (data.email || "").slice(0, 200);
    const subject = (data.subject || "").slice(0, 300);
    const message = (data.message || "").slice(0, 5000);

    MailApp.sendEmail({
      to: ALICI,
      replyTo: email,
      subject: "[vitrinweb.com.tr İletişim Formu] " + subject,
      body: message + "\n\n—\n" + name + " <" + email + ">",
    });
    return ContentService.createTextOutput("ok");
  } catch (err) {
    return ContentService.createTextOutput("error: " + err);
  }
}
```

3. Sol üstte "Untitled project" yazan yere tıklayıp adını **"Vitrin İletişim Formu Bildirimi"** yap, disket (kaydet) simgesine bas.

> `SHARED_SECRET`'i mutlaka değiştirin — aşağıdaki adım 4'te GitHub'a gireceğiniz `CONTACT_FORM_SECRET` ile **birebir aynı** olmalı. Sipariş bildirimindeki `SHARED_SECRET` ile aynı değeri kullanmayın; ayrı bir değer üretin.

## 3. Web uygulaması olarak yayınla

1. Sağ üstteki mavi **Dağıt (Deploy) → Yeni dağıtım (New deployment)**.
2. Dişli simgesine tıklayıp tür olarak **Web uygulaması (Web app)** seçin.
3. **Yürüten (Execute as):** Ben / kendi hesabınız.
4. **Erişimi olanlar (Who has access):** **Herkes (Anyone)**.
5. **Dağıt (Deploy)** deyin, Google hesabınızla yetkilendirin ("Bu uygulama doğrulanmadı" uyarısı çıkarsa **Gelişmiş → devam et**).
6. **"Web app URL"** değerini kopyalayın (`https://script.google.com/macros/s/.../exec`).

> İlk çalıştırmada Google, betiğe **e-posta gönderme** izni isteyecek — bu normal, `MailApp.sendEmail` için gerekli. Kendi Gmail/Workspace hesabınız adına gönderim yapar; ayrı bir e-posta sunucusu kurmanız gerekmez.

## 4. GitHub'a bağla

Repo sayfasında **Settings → Secrets and variables → Actions → "New repository secret"** ile iki gizli değer ekleyin:

| Ad | Değer |
|---|---|
| `CONTACT_FORM_URL` | 3. adımda kopyaladığınız Web app URL |
| `CONTACT_FORM_SECRET` | 2. adımdaki `SHARED_SECRET` ile birebir aynı metin |

Kaydettikten sonra `main`'e yapılacak bir sonraki push (veya Actions sekmesinden `deploy-pages` iş akışını elle çalıştırmanız) siteyi bu bilgilerle yeniden derler.

## Nasıl çalışır?

- **Kurulum tamamlandıysa:** Form gönderildiğinde mesaj doğrudan bu Web app adresine POST edilir, Apps Script `iletisim@vitrinweb.com.tr` adresine bir e-posta gönderir (gönderenin e-postası `replyTo` olarak ayarlanır, yanıtla tuşuna basmanız yeterli). Ziyaretçiye "Mesajınız gönderildi" yazar.
- **Kurulum henüz yapılmadıysa** (`CONTACT_FORM_URL` tanımsız): form, ziyaretçinin kendi e-posta uygulamasını konu ve mesaj dolu şekilde açar; ziyaretçi oradan gönderir. Mesaj hiçbir zaman sessizce kaybolmaz.

## Sınırlamalar (bilerek kabul edilen)

- `CONTACT_FORM_URL` ve `CONTACT_FORM_SECRET`, statik site olduğu için tarayıcıya gönderilen kodun içinde bulunur — bir "şifre" değil, yalnızca rastgele bot isteklerini eleyen bir filtredir. Sipariş bildirimindekiyle aynı tehdit modeli (bkz. SIPARIS-TAKIBI.md).
- Form ayrıca gizli bir "bal küpü" (honeypot) alanı içerir; botlar bu alanı doldurursa gönderim sessizce durur.
- Spam/hız sınırlaması yoktur (istemci tarafı doğrulama dışında). Sorun çıkarsa Apps Script dağıtımını iptal edip yeniden kurmak (yeni bir `SHARED_SECRET` ile) sıfırlamanın en hızlı yoludur.
