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

- Demo kart formunun kaldırılması ve gerçek Checkout Form UX'ine geçilmesi.
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

## Sonraki adım

Bir sonraki geliştirme adımı ödeme arayüzündeki demo kart formunu kaldırıp initialize endpoint'inden dönen iyzico Checkout Form'u kullanıcıya gösterecek akışa geçmektir. Sandbox uçtan uca test, UI bağlantısı ve callback origin environment variable'ı tamamlandıktan sonra yapılmalıdır.
