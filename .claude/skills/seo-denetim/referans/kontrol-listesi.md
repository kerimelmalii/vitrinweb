# SEO denetim kontrol listesi

Kodlar `denetle.mjs` çıktısındaki kodlarla birebir aynıdır. Önem: **kritik** (dizine eklenmeyi ya da güveni doğrudan bozar), **önemli** (görünürlüğü belirgin etkiler), **iyileştirme**, **bilgi**.
Kaynak tarihleri, sayfanın Google'daki "son güncelleme" tarihidir (10 Ekim 2026'da kontrol edildi).

| Kod | Kontrol | Otomatik mi? | Dayanak |
|---|---|---|---|
| K01 | Her sayfada benzersiz, açıklayıcı <title>; tekrar eden başlık yok; görünen kısım ~50-60 karakter | Evet | [Başlık bağlantıları](https://developers.google.com/search/docs/appearance/title-link) (2025-12-10) |
| K02 | Her sayfaya özel meta açıklama; tekrar yok; pratik 120-155 karakter | Evet | [Snippet ve meta açıklama](https://developers.google.com/search/docs/appearance/snippet) (2026-04-20) |
| K03 | Tek, mutlak, https, kendini gösteren canonical | Evet | [Yinelenen URL'leri birleştirme](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) (2026-07-10) |
| K04 | noindex yalnızca bilerek kullanılmış (sipariş, form, teşekkür sayfaları) | Evet (listeler) | [Teknik gereklilikler](https://developers.google.com/search/docs/essentials/technical) (2025-12-18) |
| K05 | <html lang="tr"> | Evet | Erişilebilirlik ve dil eşleşmesi; [Başlık bağlantıları](https://developers.google.com/search/docs/appearance/title-link) dil uyumu |
| K06 | viewport meta etiketi (mobil uyum) | Evet | [Mobil öncelikli dizine ekleme](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing) (2025-12-10) |
| K07 | Tek ve en belirgin H1; başlık seviyesi atlanmıyor | Evet | [Başlık bağlantıları](https://developers.google.com/search/docs/appearance/title-link) (ana başlık netliği) |
| K08 | Her görselde alt özniteliği (süs görsellerde boş alt) | Evet | [Görsel SEO](https://developers.google.com/search/docs/appearance/google-images) (2026-03-02) |
| K09 | Görsellerde width/height (CLS) | Evet | [Web Vitals](https://web.dev/articles/vitals) (2024-10-31) |
| K10 | Kırık iç bağlantı yok | Evet | [Bağlantı en iyi uygulamaları](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) (2025-12-10) |
| K11 | Bağlantı metinleri açıklayıcı; metinsiz bağlantı yok | Evet | Aynı |
| K12 | Dış bağlantılar https, utm parametresiz | Evet | Aynı + SEO Makale Standardı 8.2 |
| K13 | Geçerli JSON-LD; blog yazılarında BlogPosting/Article; alt sayfalarda BreadcrumbList | Evet | [Article](https://developers.google.com/search/docs/appearance/structured-data/article) (2026-09-08) |
| K14 | Ana sayfada Organization/LocalBusiness, WebSite (site adı) ve favicon | Evet | [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization) (2026-09-08), [Site adları](https://developers.google.com/search/docs/appearance/site-names) (2025-12-10), [Favicon](https://developers.google.com/search/docs/appearance/favicon-in-search) (2026-08-28) |
| K15 | Open Graph (og:title, og:description, og:image) | Evet | Sosyal paylaşım görünümü (Google kuralı değil) |
| K16 | Az metinli dizinlenebilir sayfalar gözden geçirildi | Evet (bilgi) | [Faydalı içerik](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) (2026-10-05) |
| K17 | Sıralama garantisi ve benzeri yanıltıcı vaat yok | Evet (kalıp arama) | [Bir SEO'ya ihtiyacınız var mı?](https://developers.google.com/search/docs/fundamentals/do-i-need-seo) (2026-06-05), [Spam politikaları](https://developers.google.com/search/docs/essentials/spam-policies) (2026-08-28) |
| K18 | robots.txt siteyi engellemiyor, Sitemap satırı var | Evet | [robots.txt'ye giriş](https://developers.google.com/search/docs/crawling-indexing/robots/intro) (2025-12-10) |
| K19 | Site haritası: yalnızca doğru alan adı, dizinlenebilir sayfaların hepsi, noindex sayfa yok | Evet | [Site haritası oluşturma](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) (2026-07-08) |

## Elle (canlı sitede) yapılacak kontroller

| Kod | Kontrol | Nasıl |
|---|---|---|
| C01 | http → https ve www'siz → www yönlendirmesi (tek kanonik ana makine) | Tarayıcıda ya da WebFetch ile http:// ve www'siz adresi açın |
| C02 | Canlı robots.txt ve sitemap.xml 200 dönüyor | WebFetch |
| C03 | Search Console: Sayfalar raporu, site haritası durumu, Core Web Vitals | Search Console (kullanıcı ya da bağlayıcı) |
| C04 | PageSpeed Insights mobil: LCP ≤ 2,5 sn, INP ≤ 200 ms, CLS ≤ 0,1 | pagespeed.web.dev |
| C05 | Google İşletme Profili: ad/adres/telefon/saatler sitedekiyle aynı | Profil ile sitenin iletişim sayfası karşılaştırılır |
| C06 | İçerik kalitesi: ilk paragrafta cevap, özgün katkı, kaynaklar (yalnızca blog) | SEO Makale Standardı Bölüm 14 |
