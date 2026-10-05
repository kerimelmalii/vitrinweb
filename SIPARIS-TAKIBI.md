# Siparişleri Google E-Tablo'da görme (kurulum)

Site tamamen statik olduğu için (sunucu yok), siparişler normalde yalnızca **müşterinin kendi tarayıcısında** kalır — hiçbir yerde toplanmaz. Bu belge, bir sipariş tamamlandığında bilgilerin otomatik olarak **senin kendi Google hesabındaki özel bir tabloya** bir satır olarak düşmesini sağlayan kurulumu anlatır. Tablo yalnızca senin Google hesabından görülebilir; kimseyle paylaşmadığın sürece başka kimse erişemez.

Bu, ücretsiz ve ~10 dakikalık bir kurulumdur. İlk birkaç siparişten sonra gerçek bir arka uç (veritabanı + admin panel) kurmak istersen, bu adım kolayca değiştirilebilir.

## 1. Google E-Tablo oluştur

1. [sheets.new](https://sheets.new) adresine git (otomatik olarak yeni bir tablo açar).
2. Sol üstten adını **"Vitrin Siparişleri"** yap.
3. Bu tabloyu kimseyle **paylaşma** (link paylaşımını açma) — sadece sen görebilmelisin, çünkü T.C. kimlik no gibi hassas bilgiler içerecek.

## 2. Apps Script'i ekle

1. Üst menüden **Uzantılar (Extensions) → Apps Script**.
2. Açılan editördeki hazır kodu (`function myFunction() {}`) sil, aşağıdaki kodu yapıştır:

```javascript
// ÖNEMLİ: Aşağıdaki metni olduğu gibi bırakmayın, kendi rastgele değerinizle değiştirin.
// Bir tane üretmek için: bu kodu geçici olarak yapıştırıp "Çalıştır (Run)" deyin, sonra
// üstteki "Yürütme günlüğü (Execution log)" sekmesinde çıkan değeri kopyalayıp SHARED_SECRET
// olarak buraya yapıştırın: function uretVeYazdir(){Logger.log(Utilities.getUuid())}
const SHARED_SECRET = "BURAYA_KENDI_RASTGELE_ANAHTARINIZI_YAZIN";

const HEADERS = [
  "Tarih", "Sipariş No", "Ad Soyad", "Telefon", "E-posta",
  "İşletme/Marka", "Sektör", "Paket", "Teklif İstenenler", "Toplam (TL)",
  "Fatura Türü", "Fatura Ünvanı/Ad", "Vergi/TC No", "Vergi Dairesi",
  "Fatura Şehri", "Fatura Adresi", "Ödeme Durumu", "Ödeme Referansı",
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SHARED_SECRET) {
      return ContentService.createTextOutput("forbidden");
    }
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }
    sheet.appendRow([
      new Date(),
      data.orderNo || "",
      data.customerName || "",
      data.phone || "",
      data.email || "",
      data.brand || "",
      data.sector || "",
      data.pkg || "",
      data.quotes || "",
      data.total || "",
      data.invoiceType || "",
      data.invoiceTitle || "",
      data.taxId || "",
      data.taxOffice || "",
      data.invoiceCity || "",
      data.invoiceAddress || "",
      data.paymentStatus || "",
      data.paymentRef || "",
    ]);
    return ContentService.createTextOutput("ok");
  } catch (err) {
    return ContentService.createTextOutput("error: " + err);
  }
}
```

3. Sol üstte "Untitled project" yazan yere tıklayıp adını **"Vitrin Sipariş Bildirimi"** yap, sonra disket (kaydet) simgesine bas.

> `SHARED_SECRET`'i mutlaka değiştir (yukarıdaki metni olduğu gibi bırakma) — önemli olan, aşağıdaki adım 4'te GitHub'a gireceğin `ORDER_WEBHOOK_SECRET` ile **birebir aynı** olması.

> Bu kurulumu daha önce yaptıysan ve "Fatura Şehri" sütunu tabloda yoksa: Apps Script editöründeki kodu yukarıdaki güncel haliyle değiştirip tekrar kaydet ve **Dağıt → Dağıtımları yönet → düzenle → Yeni sürüm → Dağıt** ile yeniden yayınla; yeni siparişlerden itibaren şehir bilgisi de düşer.

## 3. Web uygulaması olarak yayınla

1. Sağ üstteki mavi **Dağıt (Deploy) → Yeni dağıtım (New deployment)** butonuna bas.
2. Dişli simgesine tıklayıp tür olarak **Web uygulaması (Web app)** seç.
3. **Yürüten (Execute as):** Ben / kendi hesabın.
4. **Erişimi olanlar (Who has access):** **Herkes (Anyone)** — bu, betiğin bir web adresinden çağrılabilir olması için gerekli; betik yine de yalnızca doğru "secret" ile gelen isteği kabul eder ve yalnızca satır ekler, tabloyu asla dışarı açmaz.
5. **Dağıt (Deploy)** de. Google seni yetkilendirme isteyebilir: hesabını seç, "Bu uygulama doğrulanmadı" uyarısı çıkarsa **Gelişmiş (Advanced) → (güvenli değil) [proje adı]'a git** ile devam et (kendi yazdığın betik olduğu için güvenlidir).
6. Karşına çıkan **"Web app URL"** değerini kopyala (`https://script.google.com/macros/s/.../exec` biçiminde olur).

## 4. GitHub'a bağla

Repo sayfasında **Settings → Secrets and variables → Actions → "New repository secret"** ile iki gizli değer ekle:

| Ad | Değer |
|---|---|
| `ORDER_WEBHOOK_URL` | 3. adımda kopyaladığın Web app URL |
| `ORDER_WEBHOOK_SECRET` | 2. adımdaki `SHARED_SECRET` ile birebir aynı metin |

Kaydettikten sonra `main`'e yapılacak bir sonraki push (veya Actions sekmesinden `deploy-pages` iş akışını elle çalıştırman) sitenin bu bilgilerle yeniden derlenmesini sağlar.

## Nasıl çalışır, ne zaman satır düşer?

Bir müşteri ödemeyi tamamladığı anda (adım 3'ün sonu), sipariş özeti bu Web app adresine gönderilir ve tabloya bir satır eklenir: sipariş no, müşteri bilgileri, seçilen paket ve ek özellikler, teklif istenen kalemler, toplam tutar, fatura bilgileri. Ödeme reddedilirse veya tamamlanmazsa satır eklenmez.

## Sınırlamalar (bilerek kabul edilen)

- Bu statik bir site olduğundan, `ORDER_WEBHOOK_URL` ve `ORDER_WEBHOOK_SECRET` tarayıcıya gönderilen kodun içinde bulunur — isteyen biri geliştirici araçlarından görebilir. Bu yüzden secret bir "şifre" değil, yalnızca rastgele bot/tarama isteklerini eleyen bir filtredir. Gerçek güvenlik, tablonun kendisinin paylaşılmamasından ve uç noktanın veri **döndürmemesinden** (yalnızca yazmasından) gelir.
- Bu geçici bir çözümdür. Gerçek bir admin paneli (şifreyle korunan, durum güncellemeye izin veren) istediğinde, DEVIR-BELGESI.md bölüm 8'deki backend planına geçilmesi önerilir.
- Bu belgenin ilk sürümünde örnek olarak sabit bir `SHARED_SECRET` değeri verilmişti; o değer artık genel (public) depo geçmişinde göründüğü için **kesinlikle kullanılmamalı**. Apps Script'i kurarken mutlaka kendi rastgele değerinizi üretip kullanın.
