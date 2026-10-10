# Google kuralları bilgi tabanı

Denetimde "Google böyle diyor" denen her şeyin dayanağı burada. Her satır: kural, kaynak, kaynak sayfanın Google'daki "son güncelleme" tarihi, Vitrinweb sitesine etkisi.
Son doğrulama: **10 Ekim 2026**. Bir kaynağın tarihi değiştiyse sayfa yeniden okunur, kural ve etki satırı güncellenir, değişiklik `guncelleme-gunlugu.md`'ye yazılır.

Kural yazarken ayrım: **"Google söylüyor"** (kaynakta açıkça var) ile **"iyi uygulama"** (Google kuralı değil, bizim tercihimiz) karıştırılmaz. İyi uygulamalar en altta ayrı bölümde.

## 1. Tarama, dizine ekleme, durum kodları

| Kural | Kaynak (son güncelleme) | Vitrinweb'e etkisi |
|---|---|---|
| 2xx yanıt içeriği dizine ekleme aşamasına geçirir ama dizine eklenme garanti değildir. | [HTTP durum kodları](https://developers.google.com/search/docs/crawling-indexing/http-network-errors) (2026-02-04) | — |
| 4xx sayfaların içeriği yok sayılır; 404/410 dizindeki adresi kaldırır, taraması seyrekleşir. 429 sunucu hatası sayılır. Tarama hızını sınırlamak için 401/403 kullanılmaz. | Aynı | `not-found.tsx` var, `blog/[slug]` ve `yasal/[id]` bilinmeyen adreste `notFound()` çağırıyor → gerçek 404. Canlıda C07 ile doğrulanır. |
| 5xx taramayı geçici olarak yavaşlatır; uzun süre hata veren adresler dizinden düşer. | Aynı | Vercel kesintisi ya da API hatası sayfa HTML'ini etkilemiyorsa sorun yok; sayfa rotaları statik. |
| **Soft 404:** 200 dönen ama hata mesajı gösteren ya da fiilen boş sayfa. Eksik sayfa için gerçek 404/410 dönülmeli. | Aynı | Sipariş/teşekkür sayfaları boş durumda 200 + "sipariş bulunamadı" gösterebilir; bunlar noindex olduğu için sorun değil. Müşteri sitelerinde "ürün kalmadı" gibi boş sayfalara dikkat. |
| Googlebot en fazla 10 yönlendirme adımı izler; yönlendiren adresin içeriği yok sayılır. | Aynı | — |
| robots.txt ile engellenen, noindex olan ya da erişim kontrollü sayfalardaki yapısal veri kullanılmaz. | [Yapısal veri genel kuralları](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) (2026-07-10) | — |
| robots.txt dizinden çıkarmak için değil tarama trafiğini yönetmek içindir; Sitemap satırı eklenebilir. | [robots.txt'ye giriş](https://developers.google.com/search/docs/crawling-indexing/robots/intro) (2025-12-10) | `robots.ts` üretiyor, K18 kontrol ediyor. |
| Site haritası yalnızca kanonik, dizine eklenmesi istenen adresleri içermeli. | [Site haritası oluşturma](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) (2026-07-08) | `sitemap.ts`; K19 kontrol ediyor. Ekim 2026'daki `example.com` hatası bu kontrolle yakalanır. |
| Sayfanın mobil sürümü dizine ekleme ve sıralamada esas alınır. | [Mobil öncelikli dizine ekleme](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing) (2025-12-10) | Tek duyarlı tasarım, aynı içerik; K06 viewport. |

## 2. Kanonik adres ve yönlendirmeler

| Kural | Kaynak (son güncelleme) | Vitrinweb'e etkisi |
|---|---|---|
| Yinelenen adreslerde tercih edilen adres canonical, yönlendirme ve site haritasıyla belirtilir. | [Yinelenen URL'leri birleştirme](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) (2026-07-10) | Kanonik ana makine `www`; K03 her sayfada kendini gösteren canonical arar. |
| **Kalıcı** (301, 308, anında meta refresh, JS) hedefi kanonik yapar; **geçici** (302, 303, 307, gecikmeli meta refresh) kaynağı sonuçlarda tutar. Geri alınmayacaksa kalıcı kullan. | [Yönlendirmeler](https://developers.google.com/search/docs/crawling-indexing/301-redirects) (2026-04-14) | www'siz → www **308** (Vercel). Doğru. C01 ile her ay doğrulanır. |
| Sunucu tarafı yönlendirme en güvenilir olandır; JavaScript yönlendirmesi son çare (oluşturma başarısız olursa görülmez). | Aynı | Müşteri sitelerinde JS ya da meta refresh yönlendirmesi görülürse bulgu. |
| Eski adres yönlendirmeden sonra bir süre "alternatif ad" olarak sonuçlarda görünebilir, zamanla kaybolur. | Aynı | Alan adı değişikliği sonrası eski adres görünürse alarm değil. |
| HTTP 301/308 güçlü, 302/307 zayıf kanonik sinyalidir. | [HTTP durum kodları](https://developers.google.com/search/docs/crawling-indexing/http-network-errors) (2026-02-04) | — |

## 3. Site taşıma (müşteri sitesi yenilerken)

Vitrinweb'in işi eski sitenin yerine yenisini koymak; bu yüzden müşteri sitelerinde en sık kullanılacak bölüm.

| Kural | Kaynak (son güncelleme) | Etkisi |
|---|---|---|
| Taşınmayan içerik için 404/410 dön. Eski ve yeni siteyi (tüm varyantlarıyla) Search Console'da doğrula. İkinci el alan adında el ile işlem ve kaldırma isteklerini kontrol et. | [URL değişiklikli site taşıma](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) (2026-08-20) | Teslim öncesi kontrol listesine girer. |
| Eski adres listesini site haritası, sunucu kayıtları, CMS ve Search Console bağlantılar raporundan çıkar; her eski adresi yeni karşılığına eşle (görseller dahil). | Aynı | Yenileme işinde "eski → yeni adres tablosu" teslim belgesinin parçası. |
| Kalıcı sunucu yönlendirmesi (301/308); zincir olmasın (en çok 3 adım); çok sayıda eski adresi ilgisiz bir sayfaya (ör. ana sayfa) toplu yönlendirme. | Aynı | Her eski sayfa en yakın yeni sayfaya; karşılığı yoksa 404/410. |
| Alan adı ya da alt alan adı değiştiyse Search Console'da Adres Değişikliği aracı (her doğrulanmış varyant için). HTTP→HTTPS, www değişikliği ya da yol değişikliği için gerekmez. | Aynı | — |
| Yönlendirmeleri **en az bir yıl** tut. Yeni site haritasını gönder, eskisini kaldır. | Aynı | Müşteriye teslimde açıkça yazılır. |
| Sıralamalar haftalarca dalgalanabilir. | Aynı | Müşteri raporunda beklenti yönetimi cümlesi. |

## 4. Başlık, açıklama, içerik

| Kural | Kaynak (son güncelleme) | Vitrinweb'e etkisi |
|---|---|---|
| Her sayfaya benzersiz, açıklayıcı, kısa `<title>`; tekrar eden ve anahtar kelime doldurulmuş başlıklardan kaçın. | [Başlık bağlantıları](https://developers.google.com/search/docs/appearance/title-link) (2025-12-10) | K01. Uzun blog başlıkları biliniyor. |
| Meta açıklama sayfaya özel olmalı; aynı açıklama birçok sayfada kullanılmamalı. Google snippet'i sayfadan kendisi de seçebilir. | [Snippet ve meta açıklama](https://developers.google.com/search/docs/appearance/snippet) (2026-04-20) | **Açık bulgu:** ana sayfa + 8 yasal sayfa aynı açıklamayı kullanıyor (K02). |
| İçerik insanlar için, özgün, güvenilir olmalı; "arama motoru için" üretilmiş içerik ödüllendirilmez. | [Faydalı içerik](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) (2026-10-05) | SEO Makale Standardı bu sayfaya dayanıyor; C06. |
| Üretken yapay zekâ içeriği yasak değil; amaç sıralama manipülasyonuysa spam politikası uygulanır. Rehber 1 Ekim 2026'da değerlendirici yönergeleriyle hizalandı. | [Güncellemeler](https://developers.google.com/search/updates) — 2026-10-01 kaydı | Blog yazıları yapay zekâ destekli; insan editörlüğü ve kaynak gösterme şart (Makale Standardı). |
| Spam politikaları üretken yapay zekâ yanıtlarındaki görünürlük için de geçerli; "geri tuşu ele geçirme" (Nisan 2026) yeni kötü amaçlı uygulama. | [Spam politikaları](https://developers.google.com/search/docs/essentials/spam-policies) (2026-08-28) | Sitede geri tuşunu engelleyen betik yok. Müşteri sitelerinde pop-up/geri tuşu tuzağı bulgu sayılır. |
| Bağlantılar `<a href>` ile taranabilir olmalı; bağlantı metni açıklayıcı olmalı. | [Bağlantı en iyi uygulamaları](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) (2025-12-10) | K10, K11. |
| Görsellerde açıklayıcı alt metin. | [Görsel SEO](https://developers.google.com/search/docs/appearance/google-images) (2026-03-02) | K08. |

## 5. Yapısal veri

| Kural | Kaynak (son güncelleme) | Vitrinweb'e etkisi |
|---|---|---|
| JSON-LD önerilir. İşaretleme sayfada **görünen** içeriği anlatmalı, doğru ve güncel olmalı; yanıltıcı, sahte yorum, kimliğe bürünme yasak. | [Yapısal veri genel kuralları](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) (2026-07-10) | Ana sayfadaki FAQPage cevapları sayfada görünüyor (`home.tsx` FAQS) — uygun. Service/Offer fiyatı sayfada görünen fiyatla aynı kaynaktan (`BASE_PRICE`). |
| Zorunlu özelliklerin hepsi bulunmalı; en özel schema.org türü kullanılmalı; işaretleme anlattığı sayfada durmalı. | Aynı | — |
| Yapısal veri zengin sonucu **mümkün kılar, garanti etmez**. İhlal el ile işleme yol açar: zengin sonuç uygunluğu gider, sıralama etkilenmez. | Aynı | Müşteriye "yıldızlar/zengin sonuç kesin çıkar" denmez. |
| **BreadcrumbList:** `itemListElement` en az iki `ListItem`; her `ListItem`'da `position` (1'den başlar), `name`, `item`. Son öğede `item` isteğe bağlı. Yolu URL yapısına göre değil tipik kullanıcı yoluna göre kur. Masaüstünde gösterilir. | [Breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) (2026-09-08) | Tüm alt sayfalarda 2–3 öğeli, doğru. `/icerik-politikasi` eksik (açık bulgu). Betik artık öğe sayısını ve zorunlu alanları da kontrol ediyor. |
| Blog yazısında Article/BlogPosting: başlık, görsel, tarih, yazar önerilir. | [Article](https://developers.google.com/search/docs/appearance/structured-data/article) (2026-09-08) | `blog/[slug]` BlogPosting üretiyor; K13. |
| Ana sayfada Organization (logo), WebSite (site adı), favicon. Favicon biçimleri Ağustos 2026'da açıkça listelendi. | [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization) (2026-09-08), [Site adları](https://developers.google.com/search/docs/appearance/site-names) (2025-12-10), [Favicon](https://developers.google.com/search/docs/appearance/favicon-in-search) (2026-08-28) | `layout.tsx` Organization + WebSite; `favicon.ico` + `icon.svg` + `apple-icon.png`. |
| **FAQ zengin sonucu kaldırıldı:** 7 Mayıs 2026'dan beri gösterilmiyor, belgesi 15 Haziran 2026'da kaldırıldı. | [Güncellemeler](https://developers.google.com/search/updates) — 2026-05-08 ve 2026-06-15 kayıtları | Ana sayfadaki FAQPage işaretlemesi geçerli ve zararsız ama Google'da zengin sonuç üretmez. Kaldırmak zorunlu değil; müşteriye "SSS işaretlemesiyle arama sonucunda soru-cevap çıkar" denmez. Betik bilgi olarak raporluyor. |
| Yorum snippet'i: sahte ve açıklanmamış teşvikli yorumlar için işaretleme yasak (Temmuz 2026). | [Güncellemeler](https://developers.google.com/search/updates) — 2026-07-24 kaydı | Sitede Review işaretlemesi yok. Müşteri sitelerine yorum işaretlemesi eklenirse yalnızca gerçek, doğrulanabilir yorumlar. |

## 6. Sayfa deneyimi ve hız

| Kural | Kaynak (son güncelleme) | Vitrinweb'e etkisi |
|---|---|---|
| Sayfa deneyimi tek bir sinyal değil; çekirdek sıralama sistemlerinin dikkate aldığı bir bütün. Sıralamada açıkça kullanıldığı söylenen tek parça **Core Web Vitals**. HTTPS, mobil uyum, rahatsız edici geçiş reklamları, reklam ayrımı ve ana içerik netliği kullanıcı memnuniyeti içindir, doğrudan sıralama getirmez. | [Sayfa deneyimi](https://developers.google.com/search/docs/appearance/page-experience) (2026-09-22) | Müşteriye "hız = ilk sıra" denmez. Alakalı içerik zayıf sayfa deneyimine rağmen önde tutulur. |
| Değerlendirme genelde sayfa bazında, bazı site geneli değerlendirmeler de var. | Aynı | — |
| Core Web Vitals hedefleri: **LCP ≤ 2,5 sn, INP < 200 ms, CLS < 0,1**. | [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) (2025-12-10) | C04 (PageSpeed Insights mobil). |
| Eşikler sayfa yüklemelerinin **75. yüzdeliği** için, mobil ve masaüstü ayrı. | [web.dev Web Vitals](https://web.dev/articles/vitals) (2024-10-31) | PageSpeed'in "gerçek kullanıcı" bölümü yeterli trafik yoksa boş gelir; o zaman laboratuvar değeri yalnızca yön gösterir. |
| Görsellerde boyut belirtmek sayfa kaymasını (CLS) önler. | web.dev (aynı) | K09. |

## 7. Search Console

| Kural | Kaynak (son güncelleme) | Vitrinweb'e etkisi |
|---|---|---|
| İlk adımlar: sahipliği doğrula → Dizine ekleme (Sayfalar) raporunda hata/uyarı → site haritası gönder → Arama performansı raporunu izle. | [Search Console'a başlangıç](https://developers.google.com/search/docs/monitor-debug/search-console-start) (2025-12-10) | Vitrinweb için doğrulama ve site haritası gönderimi kullanıcıda; C03. |
| Her gün bakmak gerekmez; Google yeni sorunları e-postayla bildirir. **Ayda bir** ya da içerik değişikliğinden sonra kontrol önerilir. | Aynı | Aylık otomatik raporun ritmi bununla örtüşüyor. |
| Web geliştirici için önemli raporlar: Dizine ekleme, URL denetimi, Güvenlik sorunları, Core Web Vitals. SEO tarafı için: El ile işlemler, Kaldırmalar, Adres değişikliği, Zengin sonuç durumu. | Aynı | Aylık raporun C03 bölümü bu raporları sırayla sorar. |

## 8. SEO hizmeti ve araçlar (ücretli hizmet olursa)

| Kural | Kaynak (son güncelleme) | Etkisi |
|---|---|---|
| "Kimse Google'da 1. sırayı garanti edemez." Sıralama garantisi, Google'la "özel ilişki", "öncelikli gönderim" vaatleri uyarı işaretidir. Reklam organik sonuçları etkilemez. | [Bir SEO'ya ihtiyacınız var mı?](https://developers.google.com/search/docs/fundamentals/do-i-need-seo) (2026-06-05) | K17 bu kalıpları arar. Vitrinweb raporu ve satış metni de bu kurala tabi. |
| Denetim için Search Console'a yalnızca **okuma** erişimi istenir; yazma erişimi sonra. | Aynı | Müşteri denetiminde "kısıtlı kullanıcı" yetkisi istenir. |
| Google üçüncü taraf araçları değerlendirmez ya da onaylamaz; araçların Google'ın sıralama verisine erişimi yoktur, tahminleri kendilerinindir. "Google onaylı" iddiasına şüpheyle bak. İyi tavsiye ya görüş olarak sunulur ya da resmi Google belgesine dayanır. AEO/GEO vaatleri de aynı şüpheyle değerlendirilir. Araçtan bağımsız olarak Search Console kullanılmalı. | [Üçüncü taraf SEO araçları, hizmetleri ve tavsiyeler](https://developers.google.com/search/docs/fundamentals/third-party-seo) (2026-06-05) | Raporlarımızda puan ("SEO skoru 87/100") verilmez; her bulgu bu dosyadaki kaynağa bağlanır, kaynaksız olanlar "iyi uygulama" diye etiketlenir. Raporda "Google onaylı denetim" gibi ifade kullanılmaz. |
| `llms.txt` Google Arama tarafından kullanılmaz; başka hizmetler için tutulabilir. | [Güncellemeler](https://developers.google.com/search/updates) — 2026-06-15 kaydı | Sitede `/llms.txt` var; zararsız, Google'a etkisi yok. Müşteriye SEO kazancı diye satılmaz. |

## İyi uygulamalar (Google kuralı değil)

Raporda bunlar "iyi uygulama" etiketiyle yazılır, "Google kuralı" denmez.

- Başlık ~50–60, açıklama ~120–155 karakter (Google piksel genişliğine göre keser, sabit sınır yayımlamaz).
- Open Graph etiketleri (sosyal paylaşım görünümü) — K15.
- Tek H1 ve başlık seviyelerini atlamamak — erişilebilirlik; yukarıdaki Google belgelerinde tek H1 şartı yok — K07.
- Dış bağlantılarda utm parametresi kullanmamak — SEO Makale Standardı 8.2 — K12.
- Az metinli sayfaları gözden geçirmek — Google kelime sayısı şartı koymaz — K16.
