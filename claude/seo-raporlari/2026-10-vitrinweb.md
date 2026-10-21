# SEO denetimi — vitrinweb.com.tr — Ekim 2026

**Tarih:** 2026-10-21 · **Tür:** Elle (kullanıcı talebi: "Google'da 'vitrinweb' aramasında site çıkmıyor")
**Denetlenen:** 38 sayfa (dizine eklenebilir: 34) · Kritik 0 (gerçek) · Önemli 0 · İyileştirme 15 · Bilgi 5
**Önceki rapor:** yok (bu site için ilk SEO denetimi)

## Özet

Sitenin teknik SEO temeli sağlam: tek kanonik host (`www`), doğru robots.txt/sitemap.xml, gerçek 404, yapısal veri, mobil uyum. Google'da "vitrinweb" ve `site:vitrinweb.com.tr` aramalarının sonuç vermemesinin kod kaynaklı bir nedeni **yok** — en olası açıklama, sitenin bu haliyle (gerçek Next.js sunucusu, kendi alan adında) henüz çok yeni olması: DNS geçişi 9 Ekim 2026'da tamamlandı, bu denetim tarihinde sadece 12 gün geçmiş. Google'ın yeni bir alan adını/sürümü keşfedip taraması genellikle günler-haftalar sürer; bunu hızlandıracak iki adım (Search Console doğrulaması + site haritası gönderimi) şu an yapılmış görünmüyor ve bu, Vitrinweb'in kod tarafından yapamayacağı, kullanıcının Google hesabıyla yapması gereken bir iş.

## Bu denetimde yapılacak en önemli 3 iş

1. **Google Search Console'da alan adını doğrulayın ve site haritasını gönderin** — K08/C03, Search Console'a başlangıç rehberi — Google'a keşfetmesi gereken yeri doğrudan gösterir, indexlenmeyi haftalar değil günler mertebesine indirir. Tahmini süre: 15 dakika. **Bu kullanıcıda, kodla yapılamaz.**
2. **Google İşletme Profili oluşturun/doğrulayın** (işletme adı, adres, telefon, web sitesi linki site ile aynı) — arama sonuçlarında işletme kartı olarak çıkmanın ve markalı aramada ("vitrinweb") görünürlüğün en hızlı yolu; teknik SEO'dan bağımsız, ayrı bir Google ürünü. Tahmini süre: 20-30 dakika.
3. **En az bir-iki dış bağlantı/atıf edinin** (kendi Instagram hesabınızdan siteye bağlantı, bir iş rehberi/dizin kaydı) — bu denetimde web aramasında `vitrinweb.com.tr`'ye veya Instagram hesabına işaret eden hiçbir sonuç bulunamadı; Google'ın bir siteyi "keşfetmesinin" en doğal yolu ona işaret eden bir bağlantıdır. Düşük efor, günler içinde etkisi görülebilir.

Bunların dışında kod tarafında iki küçük düzeltmeyi bu denetim sırasında uyguladım (aşağıda).

## Bulgular

### Kritik — gerçek bulgu yok (otomatik betik 3 yanlış pozitif verdi)
Betik "ilk sıra garantisi" ifadesini 3 blog yazısında riskli bulgu olarak işaretledi. İçeriği okudum: üçü de tersine, okuyucuyu "ilk sıra garantisi verenlere dikkat edin, Google bunun mümkün olmadığını söylüyor" diye **uyarıyor** — bu tam olarak Google'ın kendi kuralıyla uyumlu, doğru mesaj. Betik anlam/olumsuzlama ayırt edemiyor, salt anahtar kelime eşleşmesi yapıyor. Bu üçü **beklenen**, düzeltme gerekmez.

| Kod | Sayfa | Durum | Neden beklenen |
|---|---|---|---|
| K17 | /blog/kucuk-isletmeler-icin-temel-seo | Yanlış pozitif | "İlk sıra garantisi" ifadesi bir uyarı cümlesinde, vaat olarak değil |
| K17 | /blog/web-sitesi-fiyati-neye-bagli | Yanlış pozitif | Aynı |
| K17 | /blog/web-tasarim-firmasi-nasil-secilir | Yanlış pozitif | Aynı |

### Bu denetimde düzeltildi (kod, uygulandı ve build ile doğrulandı)

| Kod | Sayfa | Bulgu | Dayanak | Yapılan |
|---|---|---|---|---|
| K15 | /brosur | og:image hiç yoktu — sayfa kendi `openGraph` nesnesini elle veriyordu, bu da site genelindeki varsayılan görseli (`/opengraph-image.jpg`) miras almasını engelliyordu (kod yorumunda zaten belgelenmiş bir tuzak) | Sosyal paylaşım görünümü (Google kuralı değil, iyi uygulama) | `src/app/brosur/page.tsx`'te elle yazılan nesne yerine paylaşılan `openGraph()` yardımcı fonksiyonu kullanıldı; artık og:image doğru şekilde geliyor |
| K13 | /icerik-politikasi | BreadcrumbList yapısal verisi yoktu (görünen breadcrumb vardı, yapısal veri eksikti) | [Breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) | `/yasal/[id]` sayfalarındaki aynı desen eklendi |

### İyileştirme (15 — düşük öncelik, onay gerektirir)

| Kod | Sayfa | Bulgu |
|---|---|---|
| K01 | 3 blog yazısı | Başlık 72-76 karakter, Google sonuçlarında kesilebilir ("…içerik pazarlaması: nereden başlamalı? \| Vitrinweb" vb.) |
| K02 | Ana sayfa + 8 yasal sayfa | Aynı meta açıklama 9 sayfada tekrarlıyor ("İşletmenizin dijital vitrini…") — yasal sayfalar zaten düşük öncelikli arama hedefleri, ama her birine kendi açıklaması iyi olurdu |
| K02 | 8 blog yazısı | Meta açıklama 166-199 karakter, pratik üst sınır (155) aşılıyor — Google kırpabilir |
| K02 | /iletisim | Meta açıklama 65 karakter, pratik alt sınırın (120) altında |
| K07 | /siparis | H1 → H3 başlık seviyesi atlaması — ama bu sayfa zaten `noindex` (K04'te görülüyor), aramada görünmeyeceği için SEO etkisi yok, yalnızca erişilebilirlik nit'i |

Bunlar içerik/kopya değişikliği gerektiriyor (başlık/açıklama metni yeniden yazımı) — kod hatası değil, editöryal bir karar olduğu için onayınız olmadan değiştirmedim. İsterseniz ayrı bir iş olarak ele alabiliriz.

### Beklenen / bilgi

| Kod | Sayfa | Durum | Neden beklenen |
|---|---|---|---|
| K04 | /admin/login, /icerik-formu, /siparis, /siparis/tamamlandi | noindex | Bilerek — bunlar herkese açık arama sonucu olması istenmeyen sayfalar |
| K13 | / | FAQPage yapısal verisi geçerli ama Google 7 Mayıs 2026'dan beri FAQ zengin sonuçlarını göstermiyor | Kod hatası değil, yalnızca o özel görünümden artık fayda yok; yapısal veri kendisi zararsız, kaldırmaya gerek yok |

## Canlı kontroller

| Kod | Kontrol | Sonuç | Not |
|---|---|---|---|
| C01 | http→https, www'siz→www (tek kanonik host) | **Geçti** | `http://vitrinweb.com.tr/` → `https://vitrinweb.com.tr/` (308) → `https://www.vitrinweb.com.tr/` (308) → 200. CLAUDE.md'de belgelenen davranışla uyumlu |
| C02 | Canlı robots.txt / sitemap.xml 200 dönüyor | **Geçti** | robots.txt'te `Disallow: /siparis, /baslangic, /admin` + doğru Sitemap satırı; sitemap.xml'de yalnızca `www.vitrinweb.com.tr` adresleri, `example.com` yok |
| C03 | Search Console (Sayfalar, site haritası, CWV, el ile işlem) | **Bakılmadı — bağlayıcı yok** | Kullanıcıdan Search Console'u açıp Sayfalar raporuna, site haritası durumuna bakması istendi (aşağıda) |
| C04 | PageSpeed mobil (LCP/INP/CLS) | **Bakılmadı** | Bu oturumdan pagespeed.web.dev'e erişilemedi; daha önceki denetimlerde (bu konuşmanın geçmişi) production TTFB 170-1300ms ölçüldü, bu olumlu bir sinyal ama CWV'nin yerine geçmez |
| C07 | Olmayan adres gerçek 404 dönüyor | **Geçti** | `/seo-denetim-404-testi` → 404 |
| — | Google'da marka adı görünürlüğü (bu denetimin asıl konusu) | **Sıfır sonuç** | `site:vitrinweb.com.tr` ve "vitrinweb web sitesi ajansı" aramalarında hiçbir sonuç bulunamadı; Instagram hesabı (`instagram.com/vitrinweb.com.tr`) için de arama sonucu yok. Bu, sitenin henüz indexlenmediğini / herhangi bir dış bağlantıyla keşfedilmediğini gösteriyor — yukarıdaki "en önemli 3 iş" bunun için |

## Search Console'da kendiniz bakmanız gereken 3 şey (bağlayıcı olmadığı için otomatik kontrol edilemedi)
1. **Sayfalar raporu** — "Dizine eklenmedi" sekmesinde sebep var mı (varsa en sık neden "Keşfedildi, şu an dizine eklenmedi" — bu genellikle zaman meselesidir, hata değildir).
2. **Site haritaları durumu** — `sitemap.xml` gönderilmiş mi, "Başarılı" mı okunuyor.
3. **Core Web Vitals (mobil)** — gerçek kullanıcı verisi birikince (trafik arttıkça) burada görünür; yeni sitede henüz veri olmayabilir, bu normaldir.

## Google tarafında değişenler
Bu, bu site için ilk denetim olduğu için karşılaştırma yapılacak önceki bir kayıt yok. `referans/guncelleme-gunlugu.md` bu denetimde ayrıca güncellenmedi (bu elle/tek seferlik bir denetim, aylık otomatik görev değil).

## Önceki ayın açık işleri
Yok (ilk denetim).

## Ek: otomatik denetim çıktısı (düzeltmelerden sonra, 2. çalıştırma)
38 sayfa · Kritik 3 (yukarıda açıklandığı gibi yanlış pozitif, gerçek kritik bulgu yok) · Önemli 0 · İyileştirme 15 · Bilgi 5. Tam tablo yukarıdaki bölümlerde.
