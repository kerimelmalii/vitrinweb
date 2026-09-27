# Vitrin: Devir Belgesi (v6)

Bu belge, projeyi başka bir yapay zekâ veya geliştiriciyle sürdürmek için hazırlandı. Proje artık tek bir `index.html` değil, `src/` altında TypeScript ile yazılmış bir Next.js (App Router) projesidir; ayrıntılar için [README.md](README.md).

**v6 notu:** Proje, önceki sürümde React 18 + htm ile yazılmış tek dosyalık bir prototipti (derleme adımı yok, doğrudan tarayıcıda açılıyordu). v6'da bu, TypeScript ile yazılmış bir Next.js 16 (App Router) projesine dönüştürüldü: statik dışa aktarım (`output: "export"`) kullanıldığı için sonuç yine sunucu gerektirmeyen saf HTML/CSS/JS'tir, ama artık her sayfa gerçek bir adrese sahiptir (`#/blog/slug` yerine `/blog/slug`) ve derleme zamanında (SSG) üretilir. Bu, bölüm 7d'de belirtilen hash-routing/SEO sorununu çözer. İşlevsellik, tasarım, veriler ve güvenlik önlemleri birebir korundu; hiçbir metin veya davranış kasıtlı olarak değiştirilmedi.

## 1. Ne yapılıyor
Türkçe bir satış sitesi: **10.000 TL'ye temel web sitesi**, ilk yıl servis ve bakım ücretsiz, 2. yıl 1.000 TL, sonraki yıllarda yıllık ücret enflasyon (TÜFE) oranında güncellenir. Taahhüt yok: müşteri ilk yılın sonunda (ve sonraki her yenilemeden önce) servisi ücretsiz iptal edebilir. Ek özellikler ayrı satılır.

Müşteri yolculuğu:
siteye girer → fiyatı görür → (isterse "Neden Web Sitesi?" sayfasında araştırmaları okur) → "Web Siteni Şimdi Başlat" veya "Kendi Paketini Oluştur" → bilgilerini girer → ek özellik seçer, gerekirse teklif ister → öder → proje başlangıç formunu doldurur (hemen ya da erişim bağlantısıyla sonra).

## 2. Mevcut durum
`src/`: Next.js 16 (App Router) + TypeScript projesi. İçeriği:
- React 19, Next.js dosya tabanlı yönlendirme,
- Manrope yazı tipi `src/app/fonts/` altında iki `woff2` dosyası olarak (Google Fonts'a istek yok; KVKK açısından üçüncü tarafa IP aktarımı azalır),
- elle yazılmış CSS (`src/app/globals.css`),
- derlenmiş Tailwind preflight ve birkaç yerleşim yardımcısı (aynı dosyanın sonunda).

Derleme adımı var (`npm run build`), ama sonuç yine statik dosyalardır (`output: "export"`, `out/` klasörü); Node.js sunucusu gerekmez.

Sayfalar (gerçek adresler, Next.js App Router):

| Adres | Dosya | Sayfa |
|---|---|---|
| `/` | `src/app/page.tsx` | Ana sayfa |
| `/neden` | `src/app/neden/page.tsx` | Neden Web Sitesi? |
| `/ucretlendirme` | `src/app/ucretlendirme/page.tsx` | Ücretlendirme |
| `/siparis` | `src/app/siparis/page.tsx` | Sipariş (4 adım) |
| `/baslangic` | `src/app/baslangic/page.tsx` | Proje formu (`?t=` erişim bağlantısıyla da açılır) |
| `/blog`, `/blog/<slug>` | `src/app/blog/` | Blog listesi ve yazılar (`BLOG` dizisi, `src/data/blog.ts`) |
| `/yasal/<id>` | `src/app/yasal/[id]/page.tsx` | Yasal metinler: `kvkk`, `cerez`, `mesafeli`, `iade`, `kosullar`, `ileti` |
| bilinmeyen adres | `src/app/not-found.tsx` | "Sayfa bulunamadı" |

Blog ve yasal sayfalar `generateStaticParams` ile derleme zamanında (SSG) üretilir; her biri gerçek, ayrı bir HTML dosyasıdır. `src/app/sitemap.ts` ve `src/app/robots.ts` site haritası ve `robots.txt`'i otomatik üretir (`/siparis` ve `/baslangic` dizinden hariç tutulur).

**Simüle edilen (gerçek değil):**
- **Ödeme (`PaymentProvider`):** 0002 ile biten kart reddedilir, diğerleri geçer. Bireysel fatura için test T.C. no: `10000000146`.
- **Backend (`Backend`):** Kayıtlar `localStorage["vitrin:orders"]` içinde. Açık sipariş kimliği `vitrin:active`, ödeme öncesi taslak `vitrin:draft` içinde tutulur. Taslak 7 gün ömürlüdür ve ödeme sonrası silinir.
- **Erişim token'ı:** İstemcide üretilir ve kayıtta düz durur. Üretimde sunucu üretmeli, yalnızca özetini saklamalı, e-postayla göndermeli.
- **Dosya yükleme:** Yalnızca ad ve boyut kaydedilir.
- **Teklif süreci:** Teklif hazırlama, onay ve ödeme bağlantısı yok. Arayüzde yalnızca talep ve açıklama var; akışın kendisi backend işi (bölüm 8).
- **Yasal metinler:** Taslak yer tutucu (`LEGAL` sabiti). Her birinde bulunması gerekenler listeli.

## 3. Kod yapısı (`src/` altında)
1. **`src/app/layout.tsx`:** kök düzen — meta, JSON-LD (fiyat 10000), `referrer` politikası, `OrderProvider` + `AppShell` sarmalayıcı.
2. **`src/app/globals.css`:** tüm CSS. Renkler `:root` değişkenlerinde, yalnızca açık tema, ardından iki `@font-face` (Manrope) ve derlenmiş Tailwind bloğu; yeni bir Tailwind sınıfı eklenirse blok yeniden derlenmeli ya da sınıf CSS'e elle yazılmalı.
3. **`src/lib/`:**
   - Yapılandırma: `config.ts` (`BASE_PRICE`, `YEARLY`, `PRICING_VERSION`, `VAT_INCLUDED`, `money`, `TL`).
   - Güvenlik yardımcıları: `security.ts` (`LIMITS`, `FILE_RULES`, `clean`, `RX`, `phoneOk`, `rand`, `token`, `validTCKN`).
   - Veri katmanı: `backend.ts` (`Backend`, `buildRecord`, `recordToOrder`, `isRecord`), `payment.ts` (`PaymentProvider`), `storage.ts` (`LS`, `initOrder`, `blankOrder`), `pricing.ts` (`pricing`, `quoteLink`).
   - `order-context.tsx`: `OrderProvider` / `useApp()` — sipariş durumu, `startCheckout`, `goSection`, yasal metin modali durumu (eski `App` bileşeninin sipariş/route state'inin yerini alır; yönlendirme artık Next.js router'ı kullanır).
   - `types.ts`: paylaşılan TypeScript tipleri.
4. **`src/data/`:** `content.ts` (`SECTORS`, `INCLUDED`, `ADDONS`, `QUOTE_ADDONS`, `FAQS`, `WHY`, `PROCESS`, `HERO_DEMOS`, `REFERENCES`, `NAV`), `company.ts` (`COMPANY`, `INSTAGRAM_URL`), `legal.ts` (`LEGAL_DOCS`, `LEGAL_LINKS`), `blog.ts` (`BLOG`).
5. **`src/components/`:** `icons.tsx`, `modal.tsx`, `legal.tsx` (`LegalModal`/`LegalPage`/`NotFound`), `header.tsx`, `footer.tsx`, `app-shell.tsx`, `animated-number.tsx`, `section-head.tsx`, `mock-site.tsx`, `home.tsx` (`Hero`, `WhyWebsite`, `PackageSection`, `Process`, `AnnualService`, `About`, `FAQ`, `FinalCTA`, `StickyCTA`, `Home`), `pricing-page.tsx`, `why-page.tsx`, `blog.tsx` / `blog-post.tsx`, `offer-panel.tsx`, `addons.tsx` (`AddonList`, `QuoteAddons`, `QuoteNote`), `order-summary.tsx`, `order-box.tsx`, `onboarding.tsx` (`FileField`, `ProjectOnboarding`).
6. **`src/components/checkout/`:** `stepper.tsx` (`Stepper`, `Shell`), `fields.tsx` (`Field`, `Inp`), `business-info-step.tsx`, `package-step.tsx`, `payment-step.tsx` (`DemoCardForm`, `PaymentStep`), `success-step.tsx` (`AccessLink`, `SuccessStep`), `checkout.tsx` (`Checkout`).
7. **`src/app/*/page.tsx`:** her rota, ilgili bileşeni render eden ince bir dosya (bkz. bölüm 2'deki tablo); dinamik rotalarda (`blog/[slug]`, `yasal/[id]`) ayrıca `generateStaticParams`/`generateMetadata`.

## 4. Fiyatlar
| Kalem | Fiyat |
|---|---|
| Temel web sitesi | 10.000 TL |
| Blog | 2.000 TL |
| Online Randevu | 3.000 TL |
| Gelişmiş Form | 1.250 TL |
| Ürün / Hizmet Kataloğu | 2.000 TL |
| Çoklu Dil | 2.500 TL |
| Online Ödeme, Yönetim Paneli, Özel İstek | Teklif ile |
| Servis: 1. yıl / 2. yıl / sonrası | 0 TL / 1.000 TL / TÜFE oranında güncellenir |

Fiyat değişikliği yalnızca `BASE_PRICE`, `YEARLY` ve `ADDONS` üzerinden yapılır. Sitedeki tüm metinler bu sabitlerden üretilir. İstisna `<head>` içindeki başlık, meta ve JSON-LD'dir; bunlar elle güncellenmeli. Fiyat değişince `PRICING_VERSION` da artırılmalı.

## 5. Tasarım ve içerik kararları

**v4 değişiklikleri:**
- **Renk (v5):** Lacivert yalnızca logoda (`--logo:#1F2F6B`, logo noktası). Sitenin geri kalanı monokrom: butonlar, onay işaretleri ve bağlantılar siyah (`--brand:#111114`), hero'nun ilk satırı gri.
- **Ana sayfa sırası:** Hero → Neden web sitesi (6 kutu, 2×3 düzen) → Paket (fiyat + dahil olanlar tek panelde, açıklamalarıyla) → Süreç → Yıllık servis → Hakkımızda → SSS → Son çağrı. Eski "fiyat paneli" ve ayrı "Neler dahil?" bölümü tek bölümde birleşti; hero'daki butonun hemen altında ikinci bir başlatma butonu yok.
- **Mobil başlatma çubuğu** (`StickyCTA`): yalnızca 768 px altında, ilk ekran geçilince görünür, alt bilgiye gelince gizlenir.
- **Buton dili:** Birincil eylem her yerde **"Web Sitesi Edinin"**: hero, paket paneli, ücretlendirme, Neden Web Sitesi?, blog yazıları, son çağrı, üst menü, mobil menü ve mobil alt çubuk (sahibinin kararı, v5.1). İkincil: "Paket Detaylarını İnceleyin", "Paketinizi Oluşturun", "Araştırmaları İnceleyin". Sipariş içindeki adım butonları kalıplaşmış arayüz fiilleriyle kaldı ("Devam Et", "Ödemeye Geç", "… TL Öde").
- **Instagram:** başlıkta (1024 px ve üstü), mobil menüde, alt bilgide ve `/iletisim` sayfasında. Adres `INSTAGRAM_URL` sabitinde, gerçek hesap adresine ayarlı.
- **İletişim sayfası** (`/iletisim`, `contact-page.tsx`): e-posta (`iletisim@vitrinweb.com.tr`) ve Instagram için iki büyük kart. Üst menüde ve alt bilgide gerçek bir sayfa linki olarak yer alır (bölüme kaydıran diğer menü öğelerinin aksine).
- **Alt bilgi:** sayfalar, altı yasal metin ve 6563 sayılı Kanun gereği "Satıcı bilgileri" (unvan, adres, e-posta, telefon, MERSİS, KEP, vergi bilgisi). Bilgiler `COMPANY` sabitinde; `email` hariç köşeli parantezli yer tutucular hâlâ doldurulmalı.
- **Mobil uyum:** 320, 360, 390, 414, 768, 1024 ve 1280 px genişliklerde tüm sayfalar, sipariş adımları, pencere ve menü otomatik olarak yatay taşma için tarandı; bulunan taşmalar (uzun e-posta, dar ekranda pencere) düzeltildi. Başlıklarda dengeli satır kırılımı, uzun kelime ve adreslerde güvenli kırılma, çentikli telefonlar için güvenli alan boşlukları var.


**Görsel dil:** Sade ve monokrom. Tek vurgu rengi mavi ve yalnızca küçük öğelerde kullanılır. Yazı tipi Manrope. Animasyon yalnızca hero yüklenişi, toplam sayacı ve başarı işaretinde var.

**CTA'lar ve paket oluşturma:**
- Ana CTA "Web Siteni Şimdi Başlat", menüde "Web Siteni Başlat".
- "Kendi Paketini Oluştur" butonları da sipariş adım 1'e ("Önce işletmenizi tanıyalım") gider; paket adım 2'de oluşturulur.
- Ana sayfadaki hesaplayıcı kaldırıldı. Ücretlendirme sayfasında yalnızca salt okunur fiyat listesi var.

**Neden Web Sitesi?:** "Web sitesi, işletmenizin 7/24 açık vitrinidir." bölümü ana sayfada duruyor. Bölümdeki "Araştırmalarla inceleyin" butonu ve menüdeki "Neden Web Sitesi?" ayrı `#/neden` sayfasına gider.

**Neden Web Sitesi? sayfasındaki veriler.** Bir veri değiştirilirse kaynağı da güncellenmeli.

| Veri | Kaynak |
|---|---|
| İnternet kullanımı: 2024 %88,8 → 2025 %90,9 → 2026 %92,3 | TÜİK Hanehalkı BT Kullanım Araştırması (16-74 yaş) |
| İnternetten satın alma/sipariş: 2024 %51,7 → 2025 %55,7 → 2026 %60 | TÜİK, aynı araştırma |
| İnternet kullananların %90'ı WhatsApp kullanıyor | TÜİK, 2026 |
| Yakındaki bir şeyi telefondan arayanların %76'sı bir gün içinde ilgili işletmeyi ziyaret ediyor; bu aramaların %28'i satın almayla sonuçlanıyor | Google, 2016, ABD |
| 3 saniyeden uzun açılan mobil sitelerde ziyaretlerin %53'ü yarıda bırakılıyor | Google, 2016 |
| Katılımcıların %46,1'i güvenilirliği kısmen görsel tasarıma bakarak değerlendirdi | Stanford Web Credibility Project, 2002 (2.684 katılımcı) |
| Görsel ilk izlenim yaklaşık 50 ms'de oluşuyor | Lindgaard vd., 2006 |

Sayfada, yurt dışı verilerin Türkiye'ye ait birebir oranlar olmadığı açıkça yazıyor. TÜİK kaynağı veri portalına bağlanıyor; bülten yayımlandıkça doğrudan bülten bağlantısıyla değiştirilebilir.

**Sosyal kanıt:** Sahte sosyal kanıt yok. Gerçek referanslar `REFERENCES` dizisine `{name, business, text}` olarak eklenir.

## 6. Sipariş modeli

**Durumlar:**
- Ödeme: `pending` → `payment_started` → `paid` (+ `cancelled`, `refunded`).
- Proje: Yeni Sipariş → Bilgiler Bekleniyor → Tasarım → Geliştirme → Revizyon → Yayına Hazır → Yayında.

**Kimlikler:**
- `id`: `ord_` + 16 karakter, iç kimlik.
- `orderNo`: 6 hane, müşteriye gösterilir, asla erişim anahtarı olarak kullanılmaz.
- `accessToken`: 24 karakter (~120 bit), proje formuna erişim.

**Teklif talepleri** (`order.quotes`, kayıtta `quoteRequests`):
- Kapsam: Online Ödeme, Yönetim Paneli, Özel İstek.
- Özel İstek seçilince metin alanı açılır (en az 10, en fazla 1000 karakter). Metin `quoteRequests[].note` olarak kaydedilir.
- Teklifler sipariş tutarına eklenmez.
- Teklif seçiliyken özet "Şimdi ödenecek" der ve bir açıklama gösterir: bu kalemler tutara dahil değildir, teklif iletilecektir, onaylanırsa müşteri güvenli ödeme sayfasına yönlendirilir, onaylanmazsa ek ödeme yoktur.
- Başarı ekranında aynı bilgi tekrar edilir.

**Fatura:**
- Bireysel: ad soyad + T.C. no (algoritma kontrolü).
- Kurumsal: ünvan + 10 haneli vergi no + vergi dairesi.

**Onaylar:** İlk üçü zorunludur, dördüncüsü isteğe bağlıdır; hepsi zaman damgasıyla kayda yazılır (`consents.marketing` dahil):
- KVKK aydınlatma metni: "bilgilendirildim" beyanı, rıza değil.
- Ön bilgilendirme formu + mesafeli satış sözleşmesi.
- Kullanım koşulları.
- (İsteğe bağlı, işaretsiz gelir) Ticari elektronik ileti onayı. İşaretlenirse İYS'ye kaydedilmesi gerekir.

**Cayma hakkı akışı:** Sözleşme ödemeyle kurulur; 14 günlük cayma süresi işler. Tasarım çalışması, müşteri proje formunda "tasarım çalışmasının hemen başlamasını talep ediyorum" kutusunu işaretleyip içeriklerini gönderince başlar (Mesafeli Sözleşmeler Yönetmeliği md. 15/1-h istisnası). Bu onay `content.serviceStartConsentAt` olarak kaydedilir. Onay verilmeden cayma hakkı sürer ve tam iade yapılır. Adım 1'de ve proje formunda KVKK aydınlatma bağlantısı, veri toplandığı anda gösterilir.

## 7. Güvenlik

### 7a. Prototipte yapılanlar
- **Bağımlılık bütünlüğü (v6):** Kütüphaneler artık CDN'den değil, npm üzerinden derleniyor; `package-lock.json` tam sürüm ve bütünlük özetlerini (integrity hash) kilitler, `npm ci` bunları doğrular. `npm audit` temiz (0 bilinen güvenlik açığı, düzenli olarak tekrar çalıştırılmalı).
- **XSS:** Tüm kullanıcı verisi React ile kaçışlanarak basılır. `dangerouslySetInnerHTML` yalnızca sabit ikon SVG'lerinde ve kendi ürettiğimiz JSON-LD verisinde kullanılır (kullanıcı girdisi hiçbir zaman bu yolla basılmaz); JSON-LD ayrıca `safeJsonLd()` ile `<` karakterlerini kaçışlayarak olası bir `</script>` kaçışına karşı korunur. Kullanıcının girdiği adresler hiçbir zaman bağlantı olarak basılmaz.
- **İçerik Güvenliği Politikası (CSP):** `src/app/layout.tsx`, üretim derlemesinde bir `<meta>` CSP ekler (`default-src 'self'`, sıkı `connect-src` yalnızca kendi origin'i ve SIPARIS-TAKIBI.md'deki Google Apps Script uç noktasına izin verir). Statik dışa aktarımda sunucu nonce üretemediği için `script-src`/`style-src` `'unsafe-inline'` içermek zorunda (Next.js'in kendi hydration betikleri ve satır içi `style` özniteliği için) — bu yüzden asıl kazanım inline script koruması değil, **connect-src ile veri sızdırma (exfiltration) engeli**: sızan bir bağımlılık olsa bile veri yalnızca izinli adreslere gönderilebilir. `vercel.json` gerçek bir sunucuya geçilince bu politikayı HTTP başlığı olarak (ve `frame-ancestors`, `X-Frame-Options`, HSTS, `Permissions-Policy` ile) sıkılaştırır — bkz. 7b.
- **Girdi:**
  - Her alanda uzunluk sınırı (`LIMITS`) ve kontrol karakteri temizliği (`clean`) var.
  - Biçim doğrulama `RX` (e-posta, adres, Instagram, token, sipariş kimliği), `phoneOk` ve `validTCKN` ile yapılır.
  - Sektör ve tasarım tercihi yalnızca listedeki değerlerden kabul edilir; renkler `#RRGGBB` biçiminde süzülür.
- **Depo verisi güvenilmez kabul edilir:**
  - `localStorage`'dan okunan kayıt ve taslaklar biçim kontrolünden geçer.
  - Bilinmeyen ek özellik ve teklif kimlikleri elenir, bozuk veri silinir.
  - Taslak 7 günde, ödeme sonrasında ise hemen silinir.
- **Rastgelelik:** `crypto.getRandomValues` ile reddetmeli örnekleme kullanılır (modulo yanlılığı yok). Güvensiz `Math.random` yedeği kaldırıldı.
- **Erişim bağlantısı:**
  - Token biçimi doğrulanmadan arama yapılmaz.
  - Token URL'nin `#` kısmında olduğu için sunucu günlüklerine ve `Referer` başlığına girmez.
  - Kullanıcıya "kimseyle paylaşmayın" uyarısı gösterilir.
- **Bot tuzağı:** Adım 1'de görünmeyen bir alan var; doluysa form ilerlemez.
- **Ödeme:**
  - Kart verisi yalnızca bileşen durumunda tutulur, kaydedilmez ve başarıdan sonra silinir. CVV alanı gizli.
  - Çift gönderim engelli.
  - Üst üste 3 red sonrası 30 saniye bekleme uygulanır.
- **Dosyalar:** Tür (MIME), boyut (10 MB) ve adet (20) sınırı var.
- **Diğer:** `referrer` politikası `strict-origin-when-cross-origin`; dış bağlantılar `noopener noreferrer`.

### 7b. İstemcide yapılamayan, sunucuda mutlaka yapılması gerekenler
Tarayıcıdaki hiçbir kontrol bir güvenlik sınırı değildir; kullanıcı hepsini atlayabilir. Gerçek güvenlik aşağıdakilerle sağlanır.

**HTTP güvenlik başlıkları.** `vercel.json` bunları zaten tanımlıyor (Vercel'e geçilince otomatik uygulanır); **GitHub Pages özel HTTP başlığı desteklemez** — özel domain (`vitrinweb.com.tr`) bağlansa bile durum değişmez. Orada yalnızca yukarıdaki `<meta>` CSP ve `<meta name="referrer">` etkilidir, `X-Frame-Options`/HSTS/`Permissions-Policy` GitHub Pages'te **hiçbir şekilde ayarlanamaz**. Site artık bu domain'de gerçek trafik aldığı için Vercel'e geçiş öncelikli bir yapılacak.
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://script.google.com https://script.googleusercontent.com <ödeme-sağlayıcı-api>; frame-src <ödeme-sağlayıcı-iframe>; form-action 'self' <ödeme-sağlayıcı>; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(self <sağlayıcı>)
```
Gerçek bir backend'e (sunucu tarafı render veya route handler) geçilince `script-src`/`style-src`'ten `'unsafe-inline'` kaldırılıp nonce tabanlı bir CSP'ye geçilebilir; statik dışa aktarımda bu mümkün değil (bkz. 7a). `/baslangic` ve `/siparis` sayfaları zaten `robots: {index:false}` ile `noindex` ediliyor (bkz. bölüm 2 tablosu).

**Diğer sunucu kontrolleri:**
- **Doğrulama:** Her uç nokta girdisini bir şemayla (ör. Zod) doğrular; kurallar `LIMITS`/`RX` ile aynıdır. Fazladan alanlar reddedilir.
- **Fiyat:**
  - Toplam sunucuda `ADDONS`'tan yeniden hesaplanır.
  - İstemciden gelen fiyat ve teklif tutarı kullanılmaz.
  - `pricingVersion` eskiyse müşteri güncel fiyatla onaya döner.
- **Ödeme:**
  - Hosted checkout kullanılır (iyzico, PayTR vb.).
  - `paid` durumuna yalnızca imzası doğrulanmış webhook ile geçilir.
  - Webhook idempotent çalışır; ödeme oturumu açarken idempotency anahtarı kullanılır.
- **Erişim token'ı:**
  - Sunucu üretir; veritabanında yalnızca SHA-256 özeti tutulur.
  - Karşılaştırma sabit zamanlı yapılır.
  - İsteğe bağlı bir son kullanma tarihi eklenebilir.
- **Hız sınırı:**
  - Sipariş oluşturma, ödeme oturumu, token ile erişim ve dosya yükleme uç noktalarında IP ve e-posta bazlı sınır uygulanır.
  - Bot tuzağı alanı (`company_website`) sunucuda da kontrol edilir. Gerekirse Cloudflare Turnstile eklenir.
- **CSRF:** Oturum çerezi kullanılırsa çerez `SameSite=Lax/Strict`, `HttpOnly` ve `Secure` olmalı. Durum değiştiren isteklerde CSRF koruması uygulanır.
- **Dosyalar:**
  - Yükleme önceden imzalı adresle yapılır.
  - Sunucuda içerik türü sihirli baytlarla doğrulanır, boyut sınırlanır, virüs taraması yapılır.
  - Dosyalara rastgele ad verilir ve herkese açık olmayan bir kovada tutulur.
  - SVG'ler temizlenmeden gösterilmez.
- **Yönetici paneli:** Güçlü kimlik doğrulama + iki adımlı doğrulama, rol bazlı yetki ve işlem günlüğü.
- **Veri:**
  - KVKK'ya uygun saklama süreleri, veritabanı şifreleme, yedekleme ve erişim günlükleri.
  - Gizli anahtarlar ortam değişkenlerinde tutulur.
  - Bağımlılıklar düzenli taranır (npm audit/Dependabot).

## 8. Gerçek backend planı
Karar verildi (bkz. bölüm 9): veri katmanı **Supabase** (PostgreSQL + Auth + Storage +
Edge Functions), ödeme sağlayıcısı **iyzico**. Site statik dışa aktarım (`output: "export"`)
olarak kalır — Next.js API route'ları/sunucusu yok; sunucu mantığı gerektiren her şey
(iyzico secret key ile ödeme oturumu açma, webhook imza doğrulama, fiyat yeniden hesaplama,
erişim token'ı üretme) **Supabase Edge Functions** (Deno) üzerinde çalışır, tarayıcı bunlara
doğrudan `fetch` ile ulaşır (Vercel/Next.js sunucusuna gerek yok).

**Uygulanan (v7):** `orders` tablosu ve INSERT-only RLS politikası (`supabase/schema.sql`),
tarayıcıdan sipariş tamamlanınca yazan istemci (`src/lib/supabase-order.ts`, kurulum:
`SUPABASE-KURULUM.md`). Bu, aşağıdaki Prisma modelinin veri şeklini birebir taşır ama yalnızca
INSERT yapar; okuma Supabase Dashboard'dan (Table Editor, RLS'yi atlayan proje sahibi girişiyle).

**Henüz yok (aşağıdaki Edge Functions ile eklenecek):** ödeme oturumu, webhook, teklif akışı,
yıllık servis yenilemesi, erişim token'ı ile sorgulama/güncelleme, admin paneli.

Prisma şeması aşağıda hâlâ veri modelinin referansı olarak kullanılıyor (alan adları
`supabase/schema.sql`'de `snake_case`'e çevrilmiş durumda); gerçek depolama artık Prisma
değil, doğrudan Supabase Postgres + SQL migration'lardır.

```prisma
model Order {
  id              String   @id @default(cuid())
  orderNo         String   @unique
  customerName    String
  email           String
  phone           String
  brand           String
  sector          String
  site            String?
  instagram       String?
  whatsapp        String?
  wishes          String?
  package         String   @default("temel")
  pricingVersion  String
  addons          Json     // [{id,name,price}]
  total           Int      // sunucuda hesaplanır
  invoice         Json     // {type,title,taxId,taxOffice,address}
  consents        Json     // {kvkk,distance,terms,at} + metin sürümleri
  accessTokenHash String?  @unique
  paymentStatus   PaymentStatus @default(pending)
  paymentRef      String?
  projectStatus   ProjectStatus @default(YeniSiparis)
  createdAt       DateTime @default(now())
  paidAt          DateTime?
  content         ContentForm?
  files           OrderFile[]
  quotes          Quote[]
  renewals        ServiceRenewal[]
}
model Quote {                       // Online Ödeme / Yönetim Paneli / Özel İstek
  id          String   @id @default(cuid())
  orderId     String
  kind        String   // odeme | panel | ozel
  note        String?  // özel istek metni
  amount      Int?     // yönetici girer
  status      QuoteStatus @default(requested)
  tokenHash   String?  @unique   // müşteriye giden onay bağlantısı
  paymentRef  String?
  createdAt   DateTime @default(now())
}
model ServiceRenewal { id String @id @default(cuid()) orderId String periodStart DateTime periodEnd DateTime amount Int status String paymentRef String? }
model ContentForm { id String @id @default(cuid()) orderId String @unique data Json }
model OrderFile   { id String @id @default(cuid()) orderId String kind String key String name String size Int mime String }
enum PaymentStatus { pending payment_started paid cancelled refunded }
enum ProjectStatus { YeniSiparis BilgilerBekleniyor Tasarim Gelistirme Revizyon YayinaHazir Yayinda }
enum QuoteStatus { requested sent accepted paid declined expired }
```

Uç noktalar (Supabase Edge Functions, Next.js API route değil — bkz. yukarısı):
- **Sipariş:** İstemci `orders` tablosuna doğrudan INSERT eder (anon key + RLS, uygulandı — bkz. yukarısı); sunucu tarafı fiyat doğrulaması olmadığından fiyat hâlâ istemciden geliyor, `pricingVersion` kontrolü Edge Function'a taşınana kadar tam güvenilir değildir.
- **Ödeme:** `POST /functions/v1/create-payment-session` (iyzico oturumu açar, secret key burada), `POST /functions/v1/payment-webhook` (iyzico imzasını doğrular, `paid` durumuna yalnızca burada geçilir).
- **Erişim bağlantısı:** `POST /functions/v1/order-by-token` (token'ın SHA-256 özetini karşılaştırır, sabit zamanlı), `POST /functions/v1/order-content` (proje formu güncellemesi).
- **Teklif akışı** (sitedeki metin bu akışı vaat ediyor):
  1. Yönetici panelinde teklif tutarı girilir, `Quote.status=sent` olur.
  2. Müşteriye tek kullanımlık bağlantıyla e-posta gider.
  3. Müşteri teklifi görür ve onaylar; teklif tutarı için ayrı bir ödeme oturumu açılır.
  4. Webhook ile `paid` olur. Müşteri reddederse durum `declined` olur ve ücret alınmaz.
- **Yıllık servis:**
  - 1. yıl bitmeden hatırlatma e-postası ve ödeme bağlantısı gönderilir.
  - Müşteri ödemezse servis yenilenmez; iptal ücretsizdir.
  - 3. yıldan itibaren tutar TÜFE ile güncellenir ve yenilemeden önce bildirilir.

## 7c. Yasal uyum özeti (araştırma sonucu)
Sitede taslak olarak bulunanlar ve dayanakları:

| Metin / öğe | Dayanak |
|---|---|
| KVKK Aydınlatma Metni (veri sorumlusu, veriler, amaçlar, hukuki sebepler, aktarım, yurt dışı, saklama, md. 11 hakları, başvuru) | 6698 sayılı KVKK md. 10–11, Aydınlatma Tebliği, Başvuru Tebliği |
| Yurt dışı aktarım ifadesi (yeterlilik kararı / standart sözleşme) | KVKK md. 9 (7499 sayılı Kanunla değişik, 1 Haziran 2024) |
| Çerez ve Yerel Depolama Politikası (yalnızca zorunlu depolama, izin gerektirmez) | KVKK Çerez Uygulamaları Rehberi |
| Ön Bilgilendirme Formu + Mesafeli Satış Sözleşmesi (siparişe özel tutar tablosu dahil) | 6502 sayılı Kanun, Mesafeli Sözleşmeler Yönetmeliği (md. 9, 11, 15) |
| İptal ve İade Politikası | Aynı |
| Kullanım Koşulları | Genel |
| Ticari Elektronik İleti Onay Metni (isteğe bağlı, İYS, 3 iş günü içinde ret) | 6563 sayılı Kanun md. 6–8 |
| Satıcı bilgileri alt bilgide; sözleşme öncesi bilgi, veri girişini düzeltme imkânı | 6563 sayılı Kanun md. 3 |

Yayından önce yapılması gerekenler:
- Tüm metinler bir hukukçuya okutulmalı; köşeli parantezli işletme kararları doldurulmalı (saklama süreleri, revizyon ve teslim, fikri haklar ve alan adı, çalışma başladıktan sonraki iptal, yıllık servis iadesi, yenileme bildirim süresi).
- KVKK metnine kullanılan hizmet sağlayıcıların (hosting, e-posta, ödeme) adları ve ülkeleri yazılmalı; yurt dışı sağlayıcılar için standart sözleşme imzalanıp 5 iş günü içinde Kuruma bildirilmeli.
- VERBİS kaydı yükümlülüğünün (çalışan sayısı ve ciro eşiklerine göre muafiyet olabilir) ve ETBİS kaydının gerekip gerekmediği mali müşavirle teyit edilmeli.
- Pazarlama iletisi gönderilecekse İYS'ye kayıt olunmalı.
- Sipariş onayı ve sözleşme örneği e-postası (kalıcı veri saklayıcısı) backend ile gönderilmeli; sitede bu vaat ediliyor.
- ~~Canlı sürümde React dosyaları da kendi sunucudan sunulmalı~~ — v6'da Next.js'e geçişle birlikte tüm kütüphaneler zaten npm bağımlılığı olarak derleniyor ve kendi sunucusundan sunuluyor; harici CDN'den betik yüklenmiyor.

## 7d. Blog
- Yazılar `BLOG` dizisinde (slug, `cover`, tarih, başlık, özet, bloklar; `src/data/blog.ts`). Blog listesi, "Neden Web Sitesi?" kutularıyla aynı dilde yuvarlak köşeli kartlardan oluşur; her kartın üstünde bir kapak görseli var. Kapaklar `BlogCover` bileşeninde (`src/components/blog.tsx`) dosyanın içinde çizilmiş SVG'lerdir (`browser`, `map`, `search`); dış görsel yüklenmez. Yeni yazıya bu üçünden birini verin ya da yeni bir çizim ekleyin. Canlı sürümde gerçek fotoğraf kullanılacaksa sıkıştırılmış WebP/AVIF ve `next/image` ile eklenmeli. Üç yazı var: web sitesi ve Instagram karşılaştırması, Google İşletme Profili rehberi, küçük işletmeler için 7 adımda temel SEO. Yazılardaki rakamlar "Neden Web Sitesi?" sayfasındaki doğrulanmış kaynaklarla aynı; TÜİK 2026 Instagram oranı (%71,1) ek olarak kullanıldı.
- **v6'da çözüldü:** Her yazı artık gerçek `/blog/<slug>` adresinde, derleme zamanında üretilmiş (SSG) bir HTML sayfasıdır (`generateStaticParams`); başlık ve açıklama `generateMetadata` ile ayarlanır, `Article` yapısal verisi eklenmiştir, site haritası `src/app/sitemap.ts` ile otomatik üretilir.

## 9. Yapılacaklar
- [x] TypeScript'e ve gerçek sayfa adreslerine (Next.js, SSG) geçiş (v6)
- [x] Sahibin siparişleri görebileceği geçici bir yer: ödeme tamamlanınca `src/lib/order-webhook.ts` sipariş özetini bir Google E-Tablo'ya yazar (bkz. SIPARIS-TAKIBI.md). Gerçek admin paneli/veritabanına (aşağıdaki madde) geçilince kaldırılabilir.
- [x] Supabase karar verildi (veri: Supabase, ödeme: iyzico) ve veri katmanının ilk parçası eklendi: `orders` tablosu + INSERT-only RLS (`supabase/schema.sql`), istemci yazımı (`src/lib/supabase-order.ts`, kurulum: `SUPABASE-KURULUM.md`)
- [x] Temel paket fiyatı 5.000 TL'den 10.000 TL'ye yükseltildi (`BASE_PRICE`, `config.ts`); `PRICING_VERSION` `2026-10`'a bumplandı
- [x] Ana sayfa logosuna zaten ana sayfadayken basınca kaydırmanın yukarı dönmeme hatası düzeltildi (`Logo`, `header.tsx`) ve 10 yeni SEO odaklı blog yazısı eklendi (`data/blog.ts`, toplam 13 yazı)
- [ ] iyzico entegrasyonu + Supabase Edge Functions: ödeme oturumu, webhook (imza doğrulama, `paid` geçişi, fiyat sunucuda yeniden hesaplama), erişim token'ı ile sorgulama/güncelleme, teklif akışı, yıllık servis yenilemesi (bkz. bölüm 8)
- [ ] Bölüm 7b'deki tüm sunucu güvenlik maddeleri
- [ ] Dosya yükleme, yönetici paneli, e-posta bildirimleri
- [ ] Hukuki metinler (avukatla):
  - KVKK aydınlatma metni
  - Ön bilgilendirme formu + mesafeli satış sözleşmesi (cayma hakkı ve istisnası, yıllık ücret güncelleme ve iptal koşulları dahil)
  - Kullanım koşulları
- [x] Alan adı bağlandı (`vitrinweb.com.tr`, `public/CNAME`) ve `NEXT_PUBLIC_SITE_URL` gerçek adrese ayarlandı (`.github/workflows/deploy-pages.yml`; site haritası, `robots.txt` ve canonical URL'ler bunu kullanır). `GITHUB_PAGES` bayrağı bu yüzden `"false"`'a çekildi — özel domain kökten sunuluyor, alt yol basePath'i artık gerekmiyor.
- [x] Gerçek iletişim kanalları: `COMPANY.email` ve `INSTAGRAM_URL` gerçek değerlerine ayarlandı, ayrı bir `/iletisim` sayfası eklendi (üst menü ve alt bilgiden bağlı; bölüme kaydıran diğer menü öğelerinden farklı olarak gerçek bir sayfa — sahibinin kararı: bu tür kalıcı iletişim kanalları anlık kaydırma değil, kendi adresi olan bir sayfa hak ediyor)
- [x] `/iletisim` sayfasına gerçek bir form eklendi (ad/e-posta/konu/mesaj, bot tuzağı dahil): `src/lib/form-webhook.ts`, kurulum `ILETISIM-FORMU-KURULUMU.md`. `CONTACT_FORM_URL` tanımlı değilse (kurulum yapılmadıysa) form sessizce başarısız olmaz — ziyaretçinin kendi e-posta uygulamasını prefilled açar (`mailto:`), mesaj hiçbir zaman kaybolmaz
- [x] `/girisim-programi` sayfası eklendi: yeni girişimlere %2 hisse karşılığında web sitesi + 12 ay bakım + SEO sunan ayrı bir program sayfası (siteyle aynı tasarım dili, kaydırma-tetiklemeli giriş animasyonları, kademeli hisse hakedişini gösteren bir grafik, kendi başvuru formu). Form bildirimi `/iletisim`'deki AYNI Apps Script dağıtımını ve secret'ını paylaşır (`src/lib/form-webhook.ts`, `kind` alanıyla ayrışır) — ek bir kurulum/secret gerekmedi
- [ ] Vercel'e geçiş: özel domain artık gerçek trafik aldığından GitHub Pages'in HTTP başlığı sınırlaması (yukarıda) öncelikli hâle geldi
- [ ] OG görseli, Lighthouse ve erişilebilirlik denetimi
- [ ] Gerçek referanslar geldikçe `REFERENCES`'a ekleme

## 10. Sahibinden netleşmesi gerekenler
- **Marka adı:** "Vitrin" şu an yer tutucu.
- **Satıcı bilgileri** (`COMPANY`) — `email` ve `INSTAGRAM_URL` artık gerçek, geri kalanı (unvan, adres, MERSİS, KEP, vergi bilgisi) hâlâ netleşmeli.
- **KDV:** Prototip "KDV dahil" gösteriyor (`VAT_INCLUDED=true`).
- **Yıllık ücret:**
  - 2. yıl 1.000 TL sabit mi, yoksa o da sipariş tarihinden itibaren TÜFE ile mi güncellenecek? Sitede "2. yıl 1.000 TL, sonraki yıllarda TÜFE oranında" yazıyor.
  - Bildirim süresi (ör. 30 gün) sözleşmede belirtilmeli.
- **İptal sonrası:**
  - Servis iptal edilince site ne olacak?
  - Alan adı ve barındırma kime ait? Dosyalar müşteriye teslim edilecek mi?
  - "Taahhüt yok" vaadi bu cevaplarla birlikte sözleşmeye yazılmalı.
- **Teklif:** Yanıt süresi ve teklifin geçerlilik süresi.
- **Hizmet kapsamı:** Revizyon hakkı ve teslim süresi.
- **Ödeme:** Ödeme sağlayıcısı ve fatura süreci.

## 11. Test notu
Headless Chromium (Playwright) ile uçtan uca test edildi; konsolda hata yok. v6'da (TypeScript/Next.js dönüşümü):
- `npm run build` (statik dışa aktarım) ve `npx tsc --noEmit` hatasız; `npx eslint src` uyarısız.
- `out/` klasörü statik bir sunucuyla servis edilip tüm rotalar (`/`, `/neden/`, `/ucretlendirme/`, `/blog/`, `/blog/<slug>/`, `/yasal/<id>/`, `/siparis/`, `/baslangic/`, bilinmeyen adres → 404) 1280 px ve 390 px'te ekran görüntüsüyle doğrulandı.
- Tam sipariş akışı uçtan uca çalıştırıldı: ana sayfadan başlatma → adım 1 (bilgiler, sektör seçimi) → adım 2 (ek özellik seçimi, toplamın güncellenmesi) → adım 3 (kart ve fatura bilgileri, üç zorunlu onay, ödeme) → adım 4 (başarı ekranı, sipariş numarası, erişim bağlantısı).
- Erişim bağlantısı: başarı ekranından `/baslangic/?t=...` bağlantısına geçiş, formun sipariş bilgileriyle önceden doldurulması, gönderim sonrası onay ekranı, bağlantının daha sonra tekrar açılmasında durumun `localStorage`'dan doğru yüklenmesi, biçimi geçerli ama eşleşmeyen bir `t` ile "bağlantı geçerli değil" ekranı.
- `/baslangic` adresine ödeme yapılmadan gidilirse "önce siparişinizi tamamlayın" ekranı.
- Yasal metin modalının sipariş adımından açılması, mobil menü, SSS akordeonunun varsayılan açık ilk sorusu.
- Tarayıcı konsolunda hata veya uyarı yok (beklenen 404 dışında).
- **Güvenlik denetimi (v6.1):** `npm audit` 0 bilinen açık; depoda sızmış gerçek bir sır/anahtar yok (yalnızca SIPARIS-TAKIBI.md'nin ilk sürümündeki, artık geçersiz sayılması gereken örnek değer — bkz. o dosyadaki uyarı); tüm sayfalarda `document.addEventListener("securitypolicyviolation", ...)` ile CSP ihlali taraması yapıldı, sıfır ihlal; `?t=` erişim bağlantısında biçimi bozuk bir token artık doğru şekilde "bağlantı geçerli değil" ekranını gösteriyor (önceden yanlışlıkla farklı bir ekrana düşen bir hata düzeltildi).

Önceki (v5 ve öncesi, htm/CDN sürümü) test senaryoları değişmeden geçerliliğini korur: bot tuzağı, T.C. kimlik no ve vergi no doğrulaması, üç red sonrası 30 saniyelik kilit, bozuk `localStorage` verisiyle açılış, 320–1280 px arası taşma taraması. Kod artık npm bağımlılıkları (React/Next.js) kullandığından SRI özet doğrulaması `package-lock.json`'ın bütünlüğüne devretmiştir; harici CDN'den betik yüklenmez.
