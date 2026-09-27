# Form bildirimlerini e-postaya bağlama (kurulum)

`/iletisim` ve `/girisim-programi` sayfalarındaki formlar, doldurulup gönderildiğinde site tamamen statik olduğu için **kendi başına hiçbir yere e-posta gönderemez**. Bu belge, her iki formun da gönderildiğinde otomatik olarak **iletisim@vitrinweb.com.tr** adresine bir e-posta olarak düşmesini sağlayan kurulumu anlatır — SIPARIS-TAKIBI.md'deki sipariş bildirimiyle birebir aynı yöntem (Google Apps Script), farklı olarak bu sefer bir tabloya satır eklemek yerine doğrudan e-posta gönderiyor. **Tek bir Apps Script dağıtımı ve tek bir secret çifti iki formu da kapsar** — her form gönderdiği veriye bir `kind` alanı ekler (`iletisim` veya `girisim`), betik buna göre farklı bir e-posta konusu/gövdesi oluşturur.

Bu kurulum yapılmadan da formlar **çalışır**: ziyaretçinin "Gönder" tuşuna basması, mesajı hazır şekilde kendi e-posta uygulamasında açar (ziyaretçi oradan Gönder'e basar). Aşağıdaki kurulum, bu ekstra adımı ortadan kaldırıp gönderimi tamamen otomatik hale getirir.

Ücretsiz ve ~10 dakikalık bir kurulumdur.

## 1. Google E-Tablo oluştur (yalnızca betiği barındırmak için)

1. [sheets.new](https://sheets.new) adresine git.
2. Adını **"Vitrin Form Bildirimi"** yap (içeriği boş kalacak, yalnızca aşağıdaki betiği barındırıyor).

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
    const clip = (v, n) => (v || "").slice(0, n);

    if (data.kind === "girisim") {
      const founderName = clip(data.founderName, 200);
      const companyName = clip(data.companyName, 200);
      const email = clip(data.email, 200);
      MailApp.sendEmail({
        to: ALICI,
        replyTo: email,
        subject: "[Girişim Destek Programı] " + companyName,
        body: [
          "Kurucu: " + founderName + " <" + email + ">",
          "Telefon: " + clip(data.phone, 50),
          "Şehir: " + clip(data.city, 100),
          "Kuruluş durumu: " + clip(data.status, 100),
          "",
          clip(data.description, 5000),
        ].join("\n"),
      });
    } else {
      const name = clip(data.name, 200);
      const email = clip(data.email, 200);
      MailApp.sendEmail({
        to: ALICI,
        replyTo: email,
        subject: "[vitrinweb.com.tr İletişim Formu] " + clip(data.subject, 300),
        body: clip(data.message, 5000) + "\n\n—\n" + name + " <" + email + ">",
      });
    }
    return ContentService.createTextOutput("ok");
  } catch (err) {
    return ContentService.createTextOutput("error: " + err);
  }
}
```

3. Sol üstte "Untitled project" yazan yere tıklayıp adını **"Vitrin Form Bildirimi"** yap, disket (kaydet) simgesine bas.

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

- **Kurulum tamamlandıysa:** Hangi formdan gönderilirse gönderilsin (iletişim veya girişim programı başvurusu), veri doğrudan bu tek Web app adresine POST edilir; Apps Script `kind` alanına bakıp uygun konuyla `iletisim@vitrinweb.com.tr` adresine bir e-posta gönderir (gönderenin e-postası `replyTo` olarak ayarlanır, yanıtla tuşuna basmanız yeterli). Ziyaretçiye başarı mesajı gösterilir.
- **Kurulum henüz yapılmadıysa** (`CONTACT_FORM_URL` tanımsız): ilgili form, ziyaretçinin kendi e-posta uygulamasını konu ve mesaj dolu şekilde açar; ziyaretçi oradan gönderir. Mesaj hiçbir zaman sessizce kaybolmaz.

## Sınırlamalar (bilerek kabul edilen)

- `CONTACT_FORM_URL` ve `CONTACT_FORM_SECRET`, statik site olduğu için tarayıcıya gönderilen kodun içinde bulunur — bir "şifre" değil, yalnızca rastgele bot isteklerini eleyen bir filtredir. Sipariş bildirimindekiyle aynı tehdit modeli (bkz. SIPARIS-TAKIBI.md).
- Her iki form da gizli bir "bal küpü" (honeypot) alanı içerir; botlar bu alanı doldurursa gönderim sessizce durur.
- Spam/hız sınırlaması yoktur (istemci tarafı doğrulama dışında). Sorun çıkarsa Apps Script dağıtımını iptal edip yeniden kurmak (yeni bir `SHARED_SECRET` ile) sıfırlamanın en hızlı yoludur.
