# Vitrin

Türkçe, tek paket (10.000 TL) satan bir web sitesi ajansı satış sitesi. Next.js 16 (App Router) +
TypeScript, **Vercel'de Next.js server olarak çalışır** (statik export değil — `src/app/api/`
altında gerçek server route'lar var: sipariş oluşturma, ödeme başlatma/doğrulama, içerik formu).
Detaylı iş/hukuk planı: `DEVIR-BELGESI.md`. Genel bakış: `README.md`. iyzico entegrasyonunun
tüm geliştirme geçmişi ve güvenlik kararları: `IYZICO-ENTEGRASYON.md`.

## Durum ve kısıtlar (unutma)

- **Ödeme gerçek:** iyzico Checkout Form, tam sayfa yönlendirme akışıyla (bkz.
  `IYZICO-ENTEGRASYON.md`). Kart bilgileri Vitrin'e hiç uğramaz; sunucu tarafında imza
  doğrulaması yapılmadan bir sipariş asla `paid` sayılmaz. Sandbox/production ortamı
  `IYZICO_ENVIRONMENT` ile seçilir.
- Sipariş kaydının **tek güvenilir kaynağı Supabase**'tir (service-role anahtarla, yalnızca
  server route'lardan yazılır/güncellenir — `src/lib/supabase-admin.ts`). `localStorage`
  (`order-context.tsx`) yalnızca o tarayıcı oturumu için önbellek/UX amaçlıdır; erişim
  bağlantısıyla (`?t=`) farklı bir cihaz/tarayıcıdan dönen müşteri için `GET
  /api/orders/by-token` sunucudan siparişi yeniden kurar.
- **Yasal metinler nihai (doğrulandı 2026-10-11):** "taslak, hukukçu gözden geçirmeli" uyarısı
  kaldırıldı, işletme sahibi metinleri onayladı. `src/data/company.ts`'teki MERSİS numarası, vergi
  dairesi ve vergi numarası resmi belgelerden (ticaret sicil tasdiknamesi, imza sirküleri, vergi
  levhası) dolduruldu. **KEP adresi hâlâ köşeli parantezli yer tutucu** — bu, ayrı bir başvuruyla
  (PTT KEP, TNB KEP vb.) edinilen resmi bir adres, belgeden çıkarılamaz; edinilince `company.ts`'e
  eklenmeli. Elektronik Ticarette Hizmet Sağlayıcı Yönetmeliği'nin tacir için öngördüğü tanıtıcı
  bilgi zorunluluğu (ticaret unvanı, MERSİS no, merkez adresi, KEP/e-posta, telefon) doğrulandı;
  vergi dairesi/no tacir için ayrıca zorunlu değil (yalnızca esnaf için "vergi kimlik numarası"
  aranıyor), bu yüzden `legal-company-info.tsx` bilinçli olarak bu ikisini genel ziyaretçiye
  göstermiyor.
- **DNS cutover tamamlandı (doğrulandı 2026-10-09):** `https://vitrinweb.com.tr` artık Vercel'e
  (apex, `www.vitrinweb.com.tr`'ye 308 yönlendiriyor — canonical `www`'lı hâli) işaret ediyor ve
  gerçek Next.js server kodu çalışıyor; GitHub Pages dönemi bitti. Bu geçiş sırasında
  `NEXT_PUBLIC_SITE_URL` Vercel Production'da hiç ayarlanmamış olduğu ortaya çıktı — sitemap.xml,
  robots.txt, canonical link ve JSON-LD (Organization `logo` alanı dahil) yayında yer tutucu
  `https://example.com` üretiyordu; bu yüzden Google marka logosunu gösteremiyordu. `src/lib/site.ts`
  içindeki varsayılan artık gerçek domain'e düzeltildi (env var hâlâ ayarlanmamışsa bile doğru
  adres üretilir), ama en doğrusu `NEXT_PUBLIC_SITE_URL`'i yine de Vercel Production ortam
  değişkeni olarak ayarlamak.
- **iyzico canlı mod doğrulandı (2026-10-11):** Vercel Production'da `IYZICO_ENVIRONMENT=production`
  + gerçek `IYZICO_API_KEY`/`IYZICO_SECRET_KEY` ayarlı — canlı `/api/payments/iyzico/initialize`
  yanıtı `"environment":"production"`, ödeme sayfası `cpp.iyzipay.com` (sandbox değil) döndürüyor,
  doğrudan test edildi. `IYZICO_SANDBOX_API_KEY`/`IYZICO_SANDBOX_SECRET_KEY` bilerek silinmedi
  (geri dönüş için), ama artık kullanılmıyor — `IYZICO_ENVIRONMENT` ikisi arasında seçim yapıyor.
- Tamamlanan siparişler isteğe bağlı olarak bir Google E-Tablo'ya (`src/lib/order-webhook.ts`,
  kurulum: `SIPARIS-TAKIBI.md`) bildirilir — iyzico callback'i (`src/app/api/payments/iyzico/callback`)
  ödeme doğrulandığında çağırır; ortam değişkeni tanımlı değilse sessizce atlanır.
- `/iletisim` ve `/girisim-programi` sayfalarındaki formlar `src/app/api/contact`'a POST eder
  (`src/lib/form-webhook.ts`, `kind` alanıyla ayrışır). Uç nokta iki şeyi **ayrı ayrı, en iyi
  çaba ile** dener: (1) `iletisim@vitrinweb.com.tr` kutusunun kendi SMTP sunucusundan doğrudan
  e-posta gönderir (`src/lib/mailer.ts`, nodemailer — `SMTP_*`/`CONTACT_TO`, `NEXT_PUBLIC_`
  değil, yalnızca sunucuda; kurulum: `ILETISIM-FORMU-KURULUMU.md`), (2) Supabase'teki
  `contact_messages` tablosuna kalıcı kayıt yazar (admin panelin tek güvenilir kaynağı — orders
  ile aynı desen). İkisinden biri başarılı olduğu sürece `/api/contact` `ok:true` döner; ikisi de
  başarısız olursa `503` döner ve form ziyaretçinin kendi e-posta uygulamasını (`mailto:`)
  prefilled açar — mesaj hiçbir zaman kaybolmaz.
- **`/admin`**, tek-şifreli bir yönetim paneli (`ADMIN_PASSWORD`/`ADMIN_SESSION_SECRET`, kurulum:
  `ADMIN-PANELI-KURULUMU.md`), üç sekme: `/admin` form mesajlarını (yeni/okundu/yanıtlandı/
  arşivlendi), `/admin/tum-siparisler` **tüm** siparişleri (ödenmemiş/sepette bırakılmış dahil,
  `payment_status`'e göre filtrelenebilir — Google E-Tablo takibine artık gerek yok, aynı veri
  panelde) ve ödenmiş olanlarda düzenlenebilir `project_status` seçicisi, `/admin/siparisler`
  ödeme sonrası müşteri içerik formu **doldurulmuş** siparişleri (`orders.content_form`, durum:
  `orders.content_form_status` — yeni/incelendi/tamamlandi, **müşteriye görünen** `project_status`
  pipeline'ından ayrı bir alan, onunla karıştırma) listeler. `src/proxy.ts`
  (Next.js 16'da `middleware.ts` yerine geçen dosya adı — **"proxy" ismi zorunlu**, aksi hâlde
  build hata verir) `/admin/*` ve `/api/admin/*`'i imzalı oturum çerezi (`src/lib/admin-session.ts`,
  HMAC-SHA256) olmadan engeller. `robots.txt`'te devre dışı, sayfalar `noindex`.
- **Google Analytics isteğe bağlı ve onaya bağlıdır** (`NEXT_PUBLIC_GA_MEASUREMENT_ID`, kurulum:
  `ANALYTICS-KURULUMU.md`). Ortam değişkeni tanımlı değilse çerez onay şeridi (`cookie-consent.tsx`)
  hiç görünmez. Tanımlıysa şerit görünür; yalnızca "Kabul Et" diyen ziyaretçide GA4 betiği yüklenir
  (tercih `localStorage`'da `vitrin:cookie-consent` anahtarıyla tutulur). CSP'ye bunun için
  `googletagmanager.com`/`google-analytics.com` eklendi (`vercel.json`) — Meta Pixel henüz yok.

## Kod yapısı

- `src/app/` — sayfa rotaları (App Router): `/`, `neden`, `ucretlendirme`, `blog`, `blog/[slug]`,
  `iletisim`, `girisim-programi`, `siparis`, `siparis/tamamlandi`, `icerik-formu`, `yasal/[id]`,
  `admin`, `admin/login`, `admin/tum-siparisler`, `admin/siparisler`, artı `sitemap.ts`/`robots.ts`.
- `src/app/api/` — server route'lar: `orders/create`, `orders/checkout-data`, `orders/content-form`,
  `orders/by-token`, `orders/payment-status`, `payments/iyzico/initialize`, `payments/iyzico/callback`,
  `contact` (form bildirimleri, SMTP + Supabase), `admin/login`, `admin/logout`,
  `admin/messages/[id]`, `admin/orders/[id]`. Hepsi `runtime = "nodejs"`, service-role Supabase
  erişimi burada.
- `src/proxy.ts` — `/admin` ve `/api/admin` için oturum kontrolü (bkz. yukarıdaki not).
- `src/components/` — UI; `src/components/checkout/` — sipariş adımları.
- `src/lib/` — yapılandırma, güvenlik/doğrulama (`security.ts`), sipariş durumu (`order-context.tsx`,
  React Context + `localStorage` önbellek), yerel sahte depo (`backend.ts`, yalnızca aynı tarayıcı
  için), iyzico istemcisi (`iyzico.ts`), server-side fiyatlandırma (`server-pricing.ts`).
- `src/data/` — statik içerik (fiyatlar, SSS, yasal metinler, satıcı bilgisi).
- **Blog:** her yazı `content/blog/<slug>.md` (ön bilgi + Markdown alt kümesi, ayrıntı `src/lib/markdown.ts`
  başındaki yorumda). `src/data/blog.ts` derlemede okur ve doğrular: kırık iç bağlantı, eksik kapak,
  bugünden ileri tarih, `utm_` parametreli dış bağlantı derlemeyi durdurur. Kapaklar
  `node scripts/blog-kapaklari.mjs <slug>` ile `public/blog/<slug>/` altına üretilir (yeni yazıya yeni
  kapak tanımı eklenmeli; marka: monokrom çizgi, lacivert yok). Yazım kuralları: SEO Makale Standardı
  (yazar imzası "Vitrinweb İçerik Ekibi", ana CTA "Bilgi Al"/WhatsApp). İçerik Politikası sayfası
  `content/sayfalar/icerik-politikasi.md`.
- **Zamanlanmış blog yayını:** `content/blog-planli/<slug>.md` (ön bilgide `yayin: YYYY-AA-GG`) sitede görünmez.
  `.github/workflows/blog-yayin.yml` her gün 09:00 (TR) `scripts/blog-yayinla.mjs`'i çalıştırır, günü gelen yazıyı
  `content/blog/`a taşır (yeni yazıda `date`, yeniden yazımda `updated` = o gün), derler ve main'e gönderir.
  Henüz yayında olmayan yazıya verilen bağlantılar o güne kadar düz metin gösterilir. Tarihleri elle geriye
  çekmek yok: tarih her zaman gerçek yayın/güncelleme günüdür.

## Kurallar

- Kullanıcıya görünen tüm metin **Türkçe**. Yorum yazma alışkanlığı: yalnızca "neden" açık değilse
  kısa bir satır; ne yaptığını anlatan yorum yazma (isimler zaten anlatıyor).
- CSP tek kaynağı `vercel.json`'daki HTTP başlığıdır. `layout.tsx`'e CSP `<meta>` etiketi EKLEME —
  iki ayrı CSP birlikte, kesişimleri (en kısıtlayıcısı) uygulanır; bu daha önce iyzico izinlerinin
  sessizce engellenmesine yol açmıştı (bkz. IYZICO-ENTEGRASYON.md madde 26/28).
- CSS tek dosyada elle yazılı (`src/app/globals.css`); yeni bir sınıf gerekiyorsa oraya elle eklenir
  (derlenmiş bir Tailwind aracı yok).

## Değişiklik yaptıktan sonra her seferinde

```bash
npx tsc --noEmit -p tsconfig.json
npx eslint src --max-warnings=0
rm -rf .next && npm run build
```

Görsel/davranış doğrulaması için `npm run dev` ile servis edip Playwright ile gez (checkout akışı,
konsol/CSP ihlali kontrolü dahil) — bu oturumdaki önceki denetimlerde kullanılan betikler `/tmp`
altında kalıcı değil, gerektiğinde yeniden yazılır. iyzico sandbox'a karşı uçtan uca test için
gerçek bir Vercel Preview deploy'u gerekir (yerelde iyzico'nun hosted ödeme sayfasına ulaşılamaz).

## Git akışı

Her özellik: `claude/convert-project-typescript-3jy59p` dalını `origin/main`'den yeniden başlat →
değişiklik → commit → push (`--force-with-lease`, dal zaten squash-merge edildiği için) → PR aç →
squash-merge et. Kullanıcı onayı zaten bu şekilde çalışmaya devam et diye verildi; her PR için tekrar
sorma.
