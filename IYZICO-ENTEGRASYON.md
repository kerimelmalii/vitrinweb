# iyzico Entegrasyon Notları

Bu belge, Vitrin'in iyzico Checkout Form entegrasyonu geliştirilirken yapılan değişikliklerin nedenlerini ve mevcut durumu takip etmek için tutulur.

## Hedef mimari

Müşteri → Vitrin sipariş akışı → Next.js sunucu endpoint'i → iyzico Checkout Form → iyzico callback → sunucuda ödeme sonucunu doğrulama → Supabase siparişini `paid` olarak güncelleme.

Temel güvenlik kuralı: tarayıcıdan gelen toplam tutar veya ödeme başarılı bilgisi güvenilir kabul edilmez. Fiyat sunucuda yeniden hesaplanır; bir sipariş yalnızca iyzico sonucu sunucuda doğrulandıktan sonra ödenmiş sayılır. Kart bilgileri Vitrin tarafından saklanmaz.

## Yapılan değişiklikler

### 1. Sunucu tarafı iyzico yapılandırması — `src/lib/iyzico.ts`

iyzico API anahtarlarını yalnızca sunucu tarafında okuyan yapılandırma eklendi. Geliştirme sırasında varsayılan ortam sandbox'tır. Canlı ortama geçiş yalnızca `IYZICO_ENVIRONMENT=production` ile bilinçli olarak yapılır.

Kullanılan ortam değişkenleri:
- `IYZICO_SANDBOX_API_KEY`
- `IYZICO_SANDBOX_SECRET_KEY`
- `IYZICO_API_KEY`
- `IYZICO_SECRET_KEY`

Bu anahtarların hiçbiri `NEXT_PUBLIC_*` olarak tanımlanmamalıdır.

### 2. Resmî iyzico SDK istemcisi — `src/lib/iyzico.ts`

Aynı server-only modüle resmî `iyzipay` Node SDK istemcisi eklendi. İstemci `apiKey`, `secretKey` ve seçili ortamın base URL'ini yalnızca sunucudaki environment variable'lardan alıyor. SDK Node.js runtime gerektirdiği için bu istemci browser/Edge koduna taşınmamalıdır. Ortam değişirse önbellekteki istemci yeniden oluşturulur.

### 3. Ödeme başlatma endpoint'i — `src/app/api/payments/iyzico/initialize/route.ts`

`POST /api/payments/iyzico/initialize` endpoint'i artık gerçek iyzico Checkout Form initialize isteğini sunucu tarafından oluşturup gönderiyor. Akış:
- `orderId` biçimini doğruluyor,
- ek özellik listesini browser'dan kabul etmiyor; Supabase'teki kayıtlı siparişten okuyor,
- siparişin Supabase'te gerçekten var olduğunu server-side kontrol ediyor,
- zaten ödenmiş sipariş için yeni ödeme başlatılmasını reddediyor,
- müşteri, işletme, fatura ve zorunlu onay bilgilerini Supabase'teki kayıtlı siparişten okuyor,
- eksik müşteri/fatura bilgisi veya tamamlanmamış zorunlu onay varsa Checkout Form hazırlığını reddediyor,
- bu hassas alanları API cevabında tarayıcıya geri döndürmüyor,
- tutarı server-side fiyatlandırmadan hesaplıyor,
- buyer/adres/sepet verisini server-only eşleme katmanından oluşturuyor,
- callback URL ve istemci IP'sini güvenilir server-side yardımcılarla ekliyor,
- resmî `iyzipay` SDK ile Checkout Form initialize çağrısını yapıyor,
- başarılı yanıttaki token ile siparişi `payment_started` durumuna geçiriyor,
- browser'a yalnızca Checkout Form'u göstermek için gereken token/içerik veya ödeme sayfası URL'sini döndürüyor; API anahtarları ve secret hiçbir zaman dönmüyor.

### 4. Güvenilir fiyatlandırma — `src/lib/server-pricing.ts`

Ödeme tutarı için server-only fiyatlandırma katmanı eklendi. Frontend'in gönderdiği `total` değeri ödeme için kullanılmıyor. Temel fiyat ve eklenti fiyatları uygulamanın güvenilir sabitlerinden yeniden hesaplanıyor. Tanınmayan eklenti ID'leri sessizce yok sayılmak yerine hata ile reddediliyor.

### 5. Supabase yönetici istemcisi — `src/lib/supabase-admin.ts`

Ödeme sonucu gibi ayrıcalıklı veritabanı işlemleri için server-only Supabase istemcisi eklendi. `SUPABASE_SERVICE_ROLE_KEY` yalnızca sunucuda okunuyor; tarayıcıya açılmıyor.

Vercel'de gerekli değişken:
- `SUPABASE_SERVICE_ROLE_KEY`

### 6. iyzico Node SDK ve npm lockfile

Resmî `iyzipay` Node paketi projeye eklendi ve sürüm `2.0.69` olarak sabitlendi. `package-lock.json` paketle ve çalışma zamanı bağımlılıklarıyla senkronize edildi. Böylece Vercel/`npm ci` sırasında `package.json` ile lockfile uyuşmazlığı oluşmaması hedefleniyor.

### 7. Checkout Form veri eşleme katmanı — `src/lib/iyzico-checkout.ts`

Supabase'ten okunup doğrulanmış sipariş verisini iyzico'nun `buyer`, `billingAddress`, `shippingAddress` ve `basketItems` modeline dönüştüren server-only yardımcı eklendi. Sepet fiyatları yine `ServerPriceResult` üzerinden gelir; browser fiyat belirleyemez. Temel web sitesi ve her ücretli ek özellik ayrı `VIRTUAL` sepet kalemi olarak oluşturulur.

Ana dalda fatura formuna ayrı `city` alanı eklendi (commit `cf0b504a9eea022bc8431f5d458ea6a297332703`). iyzico eşleme katmanı artık adres metninden şehir tahmini yapmıyor; doğrudan bu alanı kullanıyor. Alan yoksa ödeme hazırlığı fail-closed davranarak duruyor. Bireysel faturadaki kimlik numarası buyer alanına taşınabilir ancak loglanmamalıdır.

### 8. Callback URL ve istemci IP yardımcıları — `src/lib/payment-request.ts`

Checkout Form callback adresi ve buyer IP'si için server-only yardımcılar eklendi. Callback URL, request'in `Host` / `X-Forwarded-Host` başlıklarından üretilmez; böylece istemcinin callback hedefini etkilemesi önlenir. Tercih edilen kaynak `IYZICO_CALLBACK_ORIGIN` environment variable'ıdır; tanımlı değilse kanonik `https://vitrinweb.com.tr` origin'i kullanılır. HTTPS zorunludur (localhost geliştirme istisnası).

İstemci IP'si Vercel/proxy zincirinde `x-forwarded-for` başlığının ilk değerinden, yoksa `x-real-ip` üzerinden alınır. IP bulunamazsa ödeme hazırlığı fail-closed davranır. IP loglanmamalı ve yalnızca iyzico buyer isteği için kullanılmalıdır.

Vercel'e canlı/sandbox testinden önce eklenmesi önerilen değişken:
- `IYZICO_CALLBACK_ORIGIN=https://vitrinweb.com.tr`

### 9. Callback ve ödeme doğrulaması — `src/app/api/payments/iyzico/callback/route.ts`

iyzico Checkout Form callback endpoint'i eklendi. Callback'ten gelen token doğrudan başarı kabul edilmez. Sunucu token ile ilişkili siparişi bulur, Checkout Form sonucunu resmî SDK üzerinden iyzico'dan yeniden retrieve eder ve `status`, `paymentStatus`, token, conversationId, basketId, TRY para birimi, beklenen fiyat/ödenen fiyat ve response signature alanlarını doğrular.

Retrieve response imzası iyzico Node SDK'nın kullandığı HMAC-SHA256 yöntemiyle doğrulanır ve karşılaştırma timing-safe yapılır. Doğrulama tamamlanmadan `paid` yazılmaz. Güncelleme `payment_status != paid` koşuluyla idempotent tutulur; tekrarlanan callback siparişi yeniden ödeme durumuna geçirmez.

Başarılı doğrulamadan sonra kullanıcı `/siparis/tamamlandi?orderId=...` adresine yönlendirilir. Bu sayfanın mevcut uygulama akışıyla uyumu ayrıca kontrol edilmelidir.

### 10. Server doğrulamalı ödeme sonuç ekranı

`/siparis/tamamlandi` rotası ve `GET /api/orders/payment-status` endpoint'i eklendi. Başarı sayfası URL'deki `orderId` değerine güvenerek ödeme başarılı mesajı göstermez; Supabase'teki server-side ödeme durumunu kontrol eder. Yalnızca `payment_status=paid` ise onay ekranı gösterilir.

Durum endpoint'i salt okunurdur, ödeme durumunu değiştiremez ve browser'a yalnızca minimum veri (`orderId`, `orderNo`, `paid`) döndürür. Müşteri, fatura, iletişim, token veya ödeme referansı dönmez. Yanıtlar `Cache-Control: no-store, private` ile cache dışı tutulur. Route arama motorlarına `noindex,nofollow` olarak işaretlenmiştir.

Bu katman URL manipülasyonunun sahte başarı ekranı üretmesini engeller.

### 11. İmzalı ve süreli ödeme sonuç token'ı

Başarılı iyzico callback'inden sonra sonuç ekranına çıplak `orderId` ile erişim kaldırıldı. Sunucu, sipariş kimliğine bağlı HMAC-SHA256 imzalı bir `resultToken` üretir. Token 15 dakika geçerlidir ve iyzico secret key kullanılarak server-only oluşturulur; secret browser'a çıkmaz.

`GET /api/orders/payment-status` artık hem `orderId` hem de geçerli `resultToken` ister. Token'ın imzası timing-safe karşılaştırılır, süresi dolmuş veya geleceğe taşınmış token reddedilir. Böylece yalnızca başka bir sipariş ID'sini bilmek ödeme durumunu sorgulamak için yeterli değildir.

Token veritabanında saklanmadığı için bu sürüm tek kullanımlı değil, kısa ömürlü ve imzalıdır. Gerçek tek kullanımlılık istenirse token nonce/hash'i için server-side kalıcı kayıt gerekir.

### 12. Ana daldaki fatura şehri değişikliğinin senkronizasyonu

Ana dalda daha sonra eklenen zorunlu `Invoice.city` alanı ödeme feature branch'ine taşındı. `Invoice` tipi, boş fatura modeli ve `LIMITS.city` artık ana dalla uyumlu. iyzico veri eşleme katmanındaki geçici type-cast kaldırıldı; şehir doğrudan tiplenmiş `invoice.city` alanından okunuyor ve eksikse ödeme fail-closed davranıyor.

Bu senkronizasyon, ödeme arayüzü değiştirilirken ana daldaki şehir alanının yanlışlıkla kaybedilmesini önlemek için UI entegrasyonundan önce yapıldı.

### 13. Demo kart formunun kaldırılması ve Checkout Form yönlendirmesi

`src/components/checkout/payment-step.tsx` içindeki Vitrin'e ait demo kart alanları, sahte kart doğrulaması ve browser'ın kendi kendine `paid` yazdığı demo akışı kaldırıldı. Kullanıcı artık yalnızca fatura bilgilerini ve zorunlu onayları Vitrin'de tamamlar; ardından `POST /api/payments/iyzico/initialize` çağrılır ve başarılı cevapta iyzico'nun barındırdığı `paymentPageUrl` adresine yönlendirilir.

Kart numarası, son kullanma tarihi ve CVV artık Vitrin bileşenlerinde state'e alınmaz. Browser yalnızca `orderId` ile initialize endpoint'ini çağırır ve hiçbir durumda siparişi `paid` yapmaz.

Checkout öncesinde güncel fatura ve onay bilgilerinin server-side initialize tarafından okunabilmesi için Supabase sipariş yazımı insert yerine aynı `id` üzerinde upsert olarak güncellendi. Bu yazım başarısız olursa ödeme başlatılmaz; böylece iyzico'ya eski veya eksik sipariş verisiyle geçilmez.

Not: mevcut Supabase RLS politikası daha önce yalnızca anon `insert` için tasarlanmıştı. Bu nedenle gerçek sandbox testinden önce anon upsert/update yetkisinin güvenli biçimde çözülmesi veya bu ödeme-öncesi kayıt işleminin server-side sipariş endpoint'ine taşınması gerekir. Browser'a genel update yetkisi açmak tercih edilmemelidir.

### 14. Checkout verisinin server-side güncellenmesi

`POST /api/orders/checkout-data` endpoint'i eklendi. Ödeme öncesindeki fatura ve onay değişiklikleri artık browser'ın Supabase anon istemcisiyle UPDATE/upsert edilmez. Endpoint server-side service-role istemcisini kullanır; ancak yalnızca mevcut siparişin `invoice` ve `consents` alanlarını güncelleyebilir.

İstek `orderId + orderNo + kayıtlı müşteri e-postası` üçlüsüyle mevcut kayıtla eşleştirilir. Sunucu fatura türünü, alan uzunluklarını, bireysel TCKN algoritmasını / kurumsal 10 haneli vergi numarasını, şehir/adres zorunluluğunu ve zorunlu onayları yeniden doğrular. Onay zamanı yalnızca yakın geçmişteki makul bir pencere içinde kabul edilir. Ödenmiş sipariş değiştirilemez.

Bu endpoint fiyat, eklentiler, `payment_status`, `payment_ref`, müşteri veya işletme verisini değiştiremez. Böylece browser'ın service-role yetkilerine dolaylı olarak geniş erişim kazanması engellenir.

`payment-step.tsx` bu endpoint'e geçirildi. Browser tarafındaki Supabase yardımcı fonksiyonu yeniden yalnızca `INSERT` davranışına döndürüldü; mevcut RLS modelindeki anon SELECT/UPDATE/DELETE yasağı korunuyor.

### 15. İlk sipariş kaydının server-side oluşturulması

Paket seçiminden ödeme adımına geçerken siparişin yalnızca eski browser/localStorage demo katmanına yazıldığı tespit edildi. Bu durumda `/api/orders/checkout-data` Supabase'te siparişi bulamayacağı için gerçek iyzico akışı ödeme başlamadan duruyordu.

Bu nedenle `POST /api/orders/create` endpoint'i eklendi. Endpoint müşteri/işletme alanlarını, sektör, telefon/e-posta ve opsiyonel URL/Instagram/WhatsApp biçimlerini, eklenti ID'lerini ve teklif isteklerini sunucuda doğrular. Fiyat ve eklenti kayıtları browser'dan gelen toplam değerden alınmaz; `calculateServerPrice` ile sunucuda yeniden üretilir. Supabase INSERT işlemi service-role istemcisiyle server-side yapılır; ilk ödeme durumu yalnızca `pending` olabilir.

`package-step.tsx` artık ödeme adımına geçmeden önce bu endpoint'i çağırır. Sipariş Supabase'e başarıyla yazılmadan step 3'e geçilmez. İstek sürerken butonlar devre dışı bırakılır; hata halinde kullanıcı ödeme ekranına geçirilmez. Eski `Backend.upsert(buildRecord(...))` localStorage kaydı bu geçişten kaldırıldı.

### 16. Callback tekrarlarında ödeme referansının korunması

Başarılı callback sonrasında `payment_ref` alanının Checkout Form token'ından `paymentId` değerine çevrilmesi kaldırıldı. Callback endpoint'i siparişi `payment_ref=token` ile bulduğu için bu değişim, iyzico aynı callback'i yeniden gönderdiğinde siparişin bulunamamasına yol açabiliyordu.

Doğrulanmış ödeme sonrasında `payment_ref` artık Checkout Form token'ı olarak korunur. Böylece aynı token ile gelen tekrar callback siparişi yeniden bulabilir; mevcut `payment_status != paid` koşulu sayesinde ödeme durumu ikinci kez yazılmaz. Ayrı bir iyzico `paymentId` saklanması gerekirse ileride bunun için ayrı bir veritabanı alanı eklenmelidir.

### 17. Checkout Form retrieve imzasının resmî örnekle teyidi

Checkout Form sonuç doğrulamasındaki imza parametre sırası iyzico'nun güncel resmî SDK örneğiyle yeniden kontrol edildi. Retrieve sonucu için HMAC-SHA256 girdisi şu sıradadır: `paymentStatus`, `paymentId`, `currency`, `basketId`, `conversationId`, `paidPrice`, `price`, `token`. Mevcut `verifyRetrieveSignature` uygulaması bu sırayla ve secret key ile HMAC-SHA256 ürettiği için algoritmada kod değişikliği gerekmedi.

İmza kontrolüne ek olarak mevcut callback; token, conversationId, basketId, TRY para birimi, beklenen fiyat ve ödenen fiyatı da kayıtlı siparişle karşılaştırmaya devam eder. İmza tek başına ödeme durumunu `paid` yapmak için yeterli kabul edilmez.

### 18. Vercel server build ve iyzipay external package ayarı

İlk Vercel Preview build'inde `iyzipay` paketinin `lib/resources` dizinini dinamik `require` ile yüklemesi nedeniyle Next.js bundler `Module not found ... <dynamic>` hatası verdi. Ayrıca eski GitHub Pages mimarisinden kalan `output: "export"` ayarının yeni server-side API route'larıyla uyumsuz olduğu doğrulandı.

`next.config.ts` Vercel/Next.js server mimarisine geçirildi: statik `output: "export"`, GitHub Pages `basePath` ve `assetPrefix` ayarları kaldırıldı. `iyzipay`, `serverExternalPackages: ["iyzipay"]` ile server bundle dışında bırakıldı; böylece SDK Node.js runtime'da kendi `node_modules` kaynaklarını doğrudan yükleyebilir. `NEXT_PUBLIC_BASE_PATH` boş tutulur.

### 19. iyzipay TypeScript bildirimi

Vercel Preview build'inde Next.js derlemesi başarıyla tamamlandı ancak TypeScript, `iyzipay` paketinin declaration dosyası olmadığı için `TS7016` ile durdu. Paket çalışma zamanında kullanılabilir olmasına rağmen TypeScript modül tipini çözemiyordu.

`src/types/iyzipay.d.ts` eklendi. Yerel bildirim yalnızca entegrasyonda kullandığımız constructor ile `checkoutForm.initialize` ve `checkoutForm.retrieve` yüzeyini tanımlar; API anahtarları veya çalışma zamanı davranışı değişmez. Amaç üçüncü taraf paketin eksik tip bilgisini proje içinde sınırlı biçimde tamamlamaktır.

### 20. Checkout Form TypeScript yüzeyinin düzeltilmesi

Bir sonraki Vercel Preview build'i derleme aşamasını geçti ancak yerel `iyzipay` declaration dosyasının SDK yüzeyini eksik tanımladığı görüldü: initialize route'u gerçekte `iyzico.checkoutFormInitialize.create(...)` kullanırken declaration yalnızca `checkoutForm` tanımlıyordu. Bu nedenle TypeScript `TS2339` verdi.

`src/types/iyzipay.d.ts` gerçek kullanım yüzeyiyle eşleştirildi. `checkoutFormInitialize` ve `checkoutForm` ayrı resource alanları olarak tanımlandı; kullandığımız `create` ve `retrieve` callback metotları declaration'a eklendi. Çalışma zamanı ödeme kodu değiştirilmedi.

### 21. Ödeme sonrası kanonik domain yönlendirmesi

Sandbox uçtan uca ödeme testi başarıyla tamamlandı; ödeme iyzico tarafından onaylandı, callback doğrulandı ve sipariş başarı ekranına ulaştı. Test sırasında sonuç sayfasının bir Vercel deployment hostunda açıldığı görüldü.

Callback route'unda başarı URL'si artık gelen callback isteğinin `request.url` hostundan türetilmiyor. Bunun yerine iyzico callback adresi için kullanılan güvenilir `IYZICO_CALLBACK_ORIGIN` kaynağının origin'i kullanılıyor. Böylece ödeme hangi Preview deployment üzerinden başlatılırsa başlatılsın başarılı ödeme sonrası sonuç sayfası kanonik Vitrin domaininde açılır. İstemci/proxy Host başlığı sonuç yönlendirmesinin kaynağı değildir.

### 22. Kullanıcıya açık URL standardı ve içerik formu

Vitrin'in kullanıcıya açık sayfalarında kısa, okunabilir, ASCII karakterli ve tire ile ayrılmış URL'ler kullanılmasına karar verildi. Teknik/geliştirme isimleri kullanıcıya gösterilmeyecek; eski adresler mümkün olduğunda yönlendirmeyle korunacak.

İlk uygulama olarak proje başlangıç/içerik toplama sayfasının kanonik yolu `/icerik-formu` oldu. Eski `/baslangic` yolu geriye dönük uyumluluk için tutuldu ve varsa mevcut `t` erişim token'ını koruyarak `/icerik-formu?t=...` adresine yönlendiriyor. Token güvenlik akışının parçası olduğu için yalnızca estetik amaçla kaldırılmadı.

## Güvenlik kararları

- Canlı ve sandbox anahtarları kod deposuna yazılmaz.
- Sandbox geliştirme sırasında varsayılandır.
- Kart bilgileri Vitrin backend'ine veya Supabase'e kaydedilmez.
- Frontend toplam tutarı belirleyemez.
- Frontend ödeme sırasında ek özellik listesini değiştirerek daha düşük tutar üretemez; fiyat hesabı Supabase'te kayıtlı `addons` üzerinden yapılır.
- Rastgele veya veritabanında bulunmayan sipariş için ödeme başlatılmaz.
- Ödenmiş sipariş için tekrar ödeme başlatılmaz.
- Callback/redirect tek başına ödeme kanıtı sayılmaz; iyzico sonucu server-side retrieve/doğrulama ile kontrol edilmelidir.
- `paid` durumu yalnızca güvenilir sunucu akışı tarafından yazılmalıdır.

## Henüz yapılmayanlar

- Uçtan uca sandbox testi.
- Canlı ortama geçiş.
- Eski statik/GitHub Pages ve demo ödeme dokümantasyonunun temizlenmesi.

## İlgili commitler

- `8d6e69fbc2975025aab9683ac0da82da4b20c1c9` — server-only iyzico config
- `b9db1b8e07ff2c297bf4811f4961e7f5856dbf3f` — initialize endpoint iskeleti
- `c9af5876ccdb38468f2532b11f7e6d90633d5bdb` — server-side fiyatlandırma
- `cc3bc91bbe4d9fe5c26f8d390af9a96bee1759e0` — bilinmeyen eklenti ID'lerini reddetme
- `8ee3699d7d2c10cc35e3b304808bac2e8a22fd49` — iyzipay bağımlılığının ilk eklenmesi
- `54296145383a7a18acf13968b78270e9f6bee853` — initialize request doğrulaması
- `f806e0a79881bebd0a73263357bbec1925cc342c` — Supabase admin istemcisi
- `ad7cd6a738d2d6775772757f0e6d0ec53f2a5c89` — ödeme öncesi server-side sipariş kontrolü
- `0c77af854a552f9688504464d8d97f32456a3caa` — iyzipay sürüm sabitleme
- `ae388be94047fe3c504d2efc1d54083465d1e8e1` — npm lockfile senkronizasyonu
- `fba5d36b46d48cbf1415052626aa6389d332223d` — server-only resmî iyzico SDK istemcisi
- `324900b5e1e14420acb1f566be11e595b7e5d2ff` — Checkout Form öncesi güvenilir sipariş/fatura/onay doğrulaması
- `5d07af0b50970e19e5b353a961116d88472e52ca` — iyzico buyer/adres/sepet veri eşleme katmanı
- `0bd94bd68522716e9f1e8ace0518b055fdf99b68` — güvenilir callback URL ve istemci IP yardımcıları
- `ba60734c721717139fe1a7191f8b6f953332db8c` — iyzico eşlemesinde ayrı fatura şehir alanına geçiş
- `5c81a8f654371627669e7049fe9e01a661ffbc5f` — ödeme tutarını browser eklentileri yerine kayıtlı sipariş eklentilerinden hesaplama
- `54c7810913337fa6653863a332bc7778de483e37` — gerçek iyzico Checkout Form initialize çağrısının server-side bağlanması
- `3918bbfe60393ed9e355f8661bdc758fb4d2728b` — Checkout Form callback retrieve, imza ve ödeme doğrulaması
- `94c5165a3831ee175e8652ad7c0ee7637cd5e281` — minimum verili server-side ödeme durum endpoint'i
- `b30b8fa98781a794872b36d0b250b4a93822502a` — server doğrulamalı ödeme sonuç bileşeni
- `282f6595589753b43d6ad2805f76668f2feec609` — `/siparis/tamamlandi` ödeme sonuç rotası
- `56dba54103c4ebae7bb75c3da5d0860379080243` — HMAC imzalı ve 15 dakika süreli ödeme sonuç token'ı
- `a4eebd8d97247c24fe6a6df5d207244f3134a9a6` — callback başarı yönlendirmesine imzalı token eklenmesi
- `31d53b84ecf8a74cd045cf80979914b3ebdd4e1a` — ödeme durum endpoint'inde imzalı token zorunluluğu
- `8c451ce9bf1bdcaf1c3a8778d6debd7e2b6b4680` — sonuç ekranının imzalı token ile sorgulaması
- `dd30498aa7b3b3dcd98ef7927a8eb63a9befc5de` — `Invoice.city` tipinin ana daldan senkronizasyonu
- `c06cb90388c263997dcbc3dc459ce6c7bda11821` — boş fatura modeline şehir alanı
- `da7a617a686649e8674eda71bfacc7d74290e2f5` — şehir input sınırının senkronizasyonu
- `17d794b4ceac96a99d740ab161ca4eca066f3e9a` — iyzico eşlemesinde doğrudan tiplenmiş şehir kullanımı
- `45fc7c15a30fb268615dc879e8e122d06f3993ab` — demo kart formunun kaldırılması ve iyzico hosted ödeme yönlendirmesi
- `b14991c182e6f9db70f67d4e957bb4ab3f418678` — checkout öncesi sipariş verisini aynı kayıt üzerinde güncelleme
- `a2e6a551e65adf5f67eef15c94a1f67b136da742` — sipariş kalıcılaştırma başarısızsa ödeme başlatmama
- `ca41a6175490bb04a2e4b81cff481ce6fce22183` — dar kapsamlı server-side checkout veri güncelleme endpoint'i
- `8bae34c7a0c7c68214e476f1de5d3112a37e1a1a` — ödeme ekranının server-side checkout endpoint'ine geçirilmesi
- `10c66ab4fc1da0bdb83394869e5260effff14997` — browser Supabase erişiminin yeniden insert-only tutulması
- `8b0256b8e070d33df1bb4572f381b6d97e5ec28a` — ilk sipariş kaydı için server-side oluşturma endpoint'i
- `184773248bb72c8471ab7c2f0a75b6eecd6e6467` — paket adımının server-side sipariş oluşturma endpoint'ine bağlanması
- `773e5090e174125f7b7c77d65d916c682cd1e00d` — callback tekrarlarında Checkout Form token'ının korunması
- `2f24751e5b87e8f7d70f69fe845b7f84da60cdb2` — Vercel server mimarisi ve iyzipay external package ayarı
- `42ab24803788d325635a6a5a76e56a1250d47d5e` — iyzipay için yerel TypeScript module declaration
- `c91ff42ee535438f17e601bc5acd0270f6820d8f` — Checkout Form declaration yüzeyinin gerçek SDK kullanımına eşlenmesi

## Sonraki adım

Callback domain bağlantısı Vercel'de doğrulandı ve `IYZICO_CALLBACK_ORIGIN=https://www.vitrinweb.com.tr` environment variable'ı eklendi. İlk sipariş kaydı da artık server-side Supabase'e oluşturuluyor.

Callback'in tekrar çağrılmasına karşı idempotency sorunu düzeltildi ve Checkout Form retrieve imza algoritması güncel resmî iyzico SDK örneğiyle teyit edildi. İlk Vercel build hatasına karşı Next.js server yapılandırması düzeltildi ve iyzipay external package olarak işaretlendi. İlk yeni Vercel Preview derlemesi JavaScript/Next.js aşamasını geçti ancak iyzipay paketinin TypeScript declaration dosyası olmadığı için TS7016 ile durdu. Yerel declaration eklendi; ilk declaration'ın initialize resource adını eksik tanımlaması nedeniyle çıkan TS2339 da gerçek SDK kullanım yüzeyiyle eşleştirilerek düzeltildi. Bir sonraki adım yeni Vercel Preview build sonucunu yeniden doğrulamaktır; build başarılı olmadan sandbox ödeme denemesi yapılmamalıdır.
