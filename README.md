# Vitrin

İşletmeler için 10.000 TL'ye profesyonel web sitesi satan, Türkçe tek sayfalık satış sitesi.

Müşteri fiyatı görür, ek özellik seçer, siparişini verir, iyzico ile öder ve web sitesi için
içeriklerini proje formundan gönderir. Sitede ayrıca "Neden Web Sitesi?" sayfası, blog ve yasal
metinler bulunur.

## Durum

- **Ödeme gerçek:** iyzico Checkout Form üzerinden, tam sayfa yönlendirmeyle. Kart bilgileri
  Vitrin'e hiç uğramaz; ödeme sunucu tarafında doğrulanmadan sipariş `paid` sayılmaz.
- Sipariş kaydı Supabase'te tutulur (service-role erişimle, yalnızca sunucudan). Ayrıntılar:
  `IYZICO-ENTEGRASYON.md`.
- Yasal metinler **taslaktır**. Köşeli parantezli alanlar doldurulmalı ve metinler bir hukukçu
  tarafından gözden geçirilmelidir.
- **Geçiş dönemi:** gerçek domain (`vitrinweb.com.tr`) şu an hâlâ eski statik GitHub Pages
  sürümünde donuk duruyor; Vercel Production kodu zaten çalıştırıyor ama DNS henüz çevrilmedi
  (bkz. CLAUDE.md).

Ayrıntılar, yapılacaklar ve iş planı için: [DEVIR-BELGESI.md](DEVIR-BELGESI.md). iyzico
entegrasyonunun teknik geçmişi ve güvenlik kararları için: [IYZICO-ENTEGRASYON.md](IYZICO-ENTEGRASYON.md).
Tamamlanan siparişleri bir Google E-Tablo'da görmek için: [SIPARIS-TAKIBI.md](SIPARIS-TAKIBI.md).
`/iletisim` ve `/girisim-programi` formlarını e-postaya bağlamak için:
[ILETISIM-FORMU-KURULUMU.md](ILETISIM-FORMU-KURULUMU.md).

## Çalıştırma

Node.js 20 veya üzeri ve npm gerekir.

```bash
npm install
npm run dev
# http://localhost:3000
```

Üretim derlemesi:

```bash
npm run build
npm start
```

Bu bir Next.js server uygulamasıdır (statik export değil) — `src/app/api/` altındaki route'lar
Node.js runtime gerektirir, Vercel'de çalışır. Gerçek iyzico sandbox ödemesini uçtan uca test
etmek için (iyzico'nun hosted ödeme sayfasına yerelden ulaşılamadığından) bir Vercel Preview
deploy'u gerekir.

Sandbox test kartları: `5528790000000008` (başarılı), `4111111111111129` (yetersiz bakiye ile
reddedilir), ikisi için de son kullanma `12/30`, CVC `123`. Bireysel fatura için test T.C. kimlik
no: `10000000146`.

## Teknoloji

- **Next.js 16** (App Router) + **React 19**, tamamı **TypeScript**
- Vercel'de Next.js server olarak çalışır; `src/app/api/` altında gerçek, service-role Supabase
  erişimli server route'lar var
- Her sayfa kendi adresinde (`/blog/<slug>`, `/yasal/<id>`) önceden üretilmiş (SSG) bir HTML
  dosyasıdır — arama motorları için doğrudan dizinlenebilir
- Elle yazılmış CSS (`src/app/globals.css`); derlenmiş Tailwind preflight ve birkaç yerleşim
  yardımcısı korunmuştur
- Manrope yazı tipi dosyanın kendi sunucusundan `woff2` olarak yüklenir (`src/app/fonts`), üçüncü
  tarafa istek gitmez
- Sipariş durumu React Context ile yönetilir (`src/lib/order-context.tsx`); tarayıcıda
  `localStorage` önbelleği, Supabase ise tek güvenilir kaynak
- SEO: her sayfa için canonical URL, dinamik Open Graph/Twitter Card görselleri (`next/og`),
  JSON-LD (`Service`, `FAQPage`, `Article`, `BreadcrumbList`), `sitemap.xml`'de `lastModified`

## Proje yapısı

| Yol | İçerik |
|---|---|
| `src/app/` | Sayfa rotaları (App Router): ana sayfa, `neden`, `ucretlendirme`, `blog`, `iletisim`, `girisim-programi`, `siparis`, `siparis/tamamlandi`, `icerik-formu`, `yasal/[id]`, `sitemap.ts`, `robots.ts` |
| `src/app/api/` | Server route'lar: sipariş oluşturma/güncelleme, iyzico ödeme başlatma/callback, erişim token'ıyla sipariş sorgulama — hepsi service-role Supabase erişimli |
| `src/components/` | UI bileşenleri (başlık, altbilgi, sipariş adımları, blog, yasal metin gösterimi, ...) |
| `src/lib/` | Yapılandırma, güvenlik/doğrulama yardımcıları, fiyatlandırma, sipariş context'i, iyzico istemcisi, server-side fiyatlandırma, tipler |
| `src/data/` | İçerik: sektörler, ek özellikler, SSS, yasal metinler, blog yazıları, satıcı bilgileri |
| `src/app/fonts/` | Manrope `woff2` dosyaları |
| `src/app/og-fonts/` | Manrope `ttf` dosyaları (yalnızca derleme sırasında Open Graph görselleri için, `next/og` woff2 desteklemez) |
| `src/lib/order-webhook.ts` | Ödeme doğrulanınca sipariş özetini Google E-Tablo'ya bildiren yardımcı (bkz. SIPARIS-TAKIBI.md) |
| `src/lib/form-webhook.ts` | `/iletisim` ve `/girisim-programi` formlarını Google Apps Script üzerinden e-postaya bildiren yardımcı (bkz. ILETISIM-FORMU-KURULUMU.md) |
| `supabase/schema.sql` | Supabase `orders` tablosu şeması |
| `DEVIR-BELGESI.md` | Projeyi devralacak geliştirici için ayrıntılı belge |
| `IYZICO-ENTEGRASYON.md` | iyzico entegrasyonunun geliştirme geçmişi ve güvenlik kararları |
| `SIPARIS-TAKIBI.md` | Sipariş bildirimi (Google E-Tablo) kurulum rehberi |
| `ILETISIM-FORMU-KURULUMU.md` | İletişim ve girişim programı formları → e-posta bildirimi kurulum rehberi |

## Güvenlik

- `npm audit` düzenli kontrol edilmeli (iyzipay'ın transitif bağımlılıklarında geçmişte uyarı
  çıktı, bkz. IYZICO-ENTEGRASYON.md).
- Üretim derlemesinde tam bir **Content-Security-Policy** ve diğer güvenlik başlıkları
  `vercel.json` üzerinden HTTP başlığı olarak uygulanır — tek kaynak budur, `layout.tsx`'e ayrıca
  bir CSP `<meta>` etiketi EKLENMEMELİDİR (iki politika birlikte, en kısıtlayıcı kesişimleriyle
  uygulanır ve sessizce birbirini bozabilir).
- Tüm kullanıcı girdisi hem istemci hem sunucu tarafında uzunluk/biçim doğrulamasından geçer
  (`src/lib/security.ts`); T.C. kimlik no algoritma kontrolü, bot tuzağı, dosya türü/boyut/adet
  sınırı dahil.
- Ödeme: fiyat ve toplam her zaman sunucuda (`server-pricing.ts`) yeniden hesaplanır, tarayıcıdan
  gelen değerler güvenilmez; bir sipariş yalnızca iyzico sonucu HMAC imzasıyla doğrulandıktan
  sonra `paid` sayılır. Ayrıntılı tehdit modeli: `IYZICO-ENTEGRASYON.md`.
