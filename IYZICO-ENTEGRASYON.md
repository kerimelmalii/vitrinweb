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

`POST /api/payments/iyzico/initialize` endpoint'i oluşturuldu. Şu an gerçek Checkout Form isteğini henüz göndermiyor. Ön hazırlık olarak:
- `orderId` biçimini doğruluyor,
- eklenti listesini doğruluyor,
- siparişin Supabase'te gerçekten var olduğunu server-side kontrol ediyor,
- zaten ödenmiş sipariş için yeni ödeme başlatılmasını reddediyor,
- müşteri, işletme, fatura ve zorunlu onay bilgilerini Supabase'teki kayıtlı siparişten okuyor,
- eksik müşteri/fatura bilgisi veya tamamlanmamış zorunlu onay varsa Checkout Form hazırlığını reddediyor,
- bu hassas alanları API cevabında tarayıcıya geri döndürmüyor,
- tutarı server-side fiyatlandırmadan hesaplıyor.

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

Mevcut sipariş modelinde şehir ayrı bir alan olmadığı için şehir, geçici olarak fatura adresinin son virgül/satır parçasından çıkarılıyor. Bu bilinçli bir geçiş çözümüdür; sipariş formuna ayrı şehir alanı eklendiğinde kaldırılmalıdır. Bireysel faturadaki kimlik numarası buyer alanına taşınabilir ancak loglanmamalıdır.

## Güvenlik kararları

- Canlı ve sandbox anahtarları kod deposuna yazılmaz.
- Sandbox geliştirme sırasında varsayılandır.
- Kart bilgileri Vitrin backend'ine veya Supabase'e kaydedilmez.
- Frontend toplam tutarı belirleyemez.
- Rastgele veya veritabanında bulunmayan sipariş için ödeme başlatılmaz.
- Ödenmiş sipariş için tekrar ödeme başlatılmaz.
- Callback/redirect tek başına ödeme kanıtı sayılmaz; iyzico sonucu server-side retrieve/doğrulama ile kontrol edilmelidir.
- `paid` durumu yalnızca güvenilir sunucu akışı tarafından yazılmalıdır.

## Henüz yapılmayanlar

- Gerçek Checkout Form initialize çağrısı.
- Callback endpoint'i.
- Checkout Form sonucunun iyzico üzerinden retrieve edilip doğrulanması.
- Doğrulanmış ödeme sonucunun Supabase'e idempotent biçimde yazılması.
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

## Sonraki adım

Bir sonraki geliştirme adımı, mevcut initialize endpoint'ini bu veri eşleme katmanına bağlamak ve gerçek iyzico Checkout Form initialize çağrısını hazırlamaktır. Bu adımdan önce callback URL üretimi ve istemci IP'sinin güvenilir şekilde alınması netleştirilmelidir.
