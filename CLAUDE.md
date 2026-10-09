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
- **Yasal metinler taslak**, köşeli parantezli alanlar dolduruluncaya ve bir hukukçu onaylayana kadar
  gerçek müşteriden veri toplamak için kullanılmamalı.
- **DNS cutover tamamlandı (doğrulandı 2026-10-09):** `https://vitrinweb.com.tr` artık Vercel'e
  (apex, `www.vitrinweb.com.tr`'ye 308 yönlendiriyor — canonical `www`'lı hâli) işaret ediyor ve
  gerçek Next.js server kodu çalışıyor; GitHub Pages dönemi bitti. Bu geçiş sırasında
  `NEXT_PUBLIC_SITE_URL` Vercel Production'da hiç ayarlanmamış olduğu ortaya çıktı — sitemap.xml,
  robots.txt, canonical link ve JSON-LD (Organization `logo` alanı dahil) yayında yer tutucu
  `https://example.com` üretiyordu; bu yüzden Google marka logosunu gösteremiyordu. `src/lib/site.ts`
  içindeki varsayılan artık gerçek domain'e düzeltildi (env var hâlâ ayarlanmamışsa bile doğru
  adres üretilir), ama en doğrusu `NEXT_PUBLIC_SITE_URL`'i yine de Vercel Production ortam
  değişkeni olarak ayarlamak. **Henüz benim tarafımdan doğrulanmamış, mutlaka kontrol edilmeli:**
  Vercel Production'daki iyzico anahtarları gerçek mi yoksa hâlâ sandbox mı
  (`IYZICO_ENVIRONMENT`), ve `IYZICO_CALLBACK_ORIGIN=https://www.vitrinweb.com.tr` doğru ayarlı mı
  — DNS zaten canlı olduğu için bu yanlışsa gerçek müşteri trafiği şu an etkileniyor olabilir.
- Tamamlanan siparişler isteğe bağlı olarak bir Google E-Tablo'ya (`src/lib/order-webhook.ts`,
  kurulum: `SIPARIS-TAKIBI.md`) bildirilir — iyzico callback'i (`src/app/api/payments/iyzico/callback`)
  ödeme doğrulandığında çağırır; ortam değişkeni tanımlı değilse sessizce atlanır.
- `/iletisim` ve `/girisim-programi` sayfalarındaki formlar aynı desende, TEK bir Apps Script
  dağıtımını paylaşır: `src/lib/form-webhook.ts` (`kind` alanıyla ayrışır), kurulum
  `ILETISIM-FORMU-KURULUMU.md`. Fark: ortam değişkeni tanımlı değilse sessizce atlamak yerine
  ziyaretçinin kendi e-posta uygulamasını (`mailto:`) prefilled açar — mesaj hiç kaybolmaz.

## Kod yapısı

- `src/app/` — sayfa rotaları (App Router): `/`, `neden`, `ucretlendirme`, `blog`, `blog/[slug]`,
  `iletisim`, `girisim-programi`, `siparis`, `siparis/tamamlandi`, `icerik-formu`, `yasal/[id]`,
  artı `sitemap.ts`/`robots.ts`.
- `src/app/api/` — server route'lar: `orders/create`, `orders/checkout-data`, `orders/content-form`,
  `orders/by-token`, `orders/payment-status`, `payments/iyzico/initialize`, `payments/iyzico/callback`.
  Hepsi `runtime = "nodejs"`, service-role Supabase erişimi burada.
- `src/components/` — UI; `src/components/checkout/` — sipariş adımları.
- `src/lib/` — yapılandırma, güvenlik/doğrulama (`security.ts`), sipariş durumu (`order-context.tsx`,
  React Context + `localStorage` önbellek), yerel sahte depo (`backend.ts`, yalnızca aynı tarayıcı
  için), iyzico istemcisi (`iyzico.ts`), server-side fiyatlandırma (`server-pricing.ts`).
- `src/data/` — statik içerik (fiyatlar, SSS, yasal metinler, blog yazıları, satıcı bilgisi).

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
