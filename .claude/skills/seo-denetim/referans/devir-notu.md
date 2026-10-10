# SEO denetim botu — devir notu (10 Ekim 2026)

Bu çalışma ana yapılacaklar sohbetinde başladı (madde 1.5). Kullanıcının isteğiyle ayrı bir sohbette sürdürülecek. Bu not, yeni sohbetin kaldığı yerden devam etmesi için yazıldı.

## Kullanıcının kararları
- Kullanım alanı: **ikisi birden** — Vitrinweb'in kendi sitesi + müşteri sitelerinin teslim öncesi denetimi. İyi sonuç verirse ileride **ücretli hizmet** olabilir.
- Çalışma: **ayda bir otomatik rapor** + istendiğinde elle.
- Konumlandırma: Vitrinweb eski siteleri onarmaz; sitesi olmayana site kurar, olana daha iyisini yapar. Müşteri adayının mevcut sitesinin denetimi, yenilemeye yönlendiren bir araç olarak kullanılabilir ("Ücretsiz Site Analizi" CTA'sıyla ilişkili).

## Tamamlananlar
1. `denetle.mjs`: Derlenmiş HTML'yi bağımlılıksız denetleyen betik, K01–K19 arası 19 kontrol (başlık, açıklama, canonical, noindex, dil, viewport, H1/başlık düzeni, alt metin, görsel boyutları, kırık iç bağlantı, bağlantı metni, http/utm, JSON-LD, Organization/WebSite/favicon, Open Graph, az metin, riskli vaat, robots.txt, site haritası).
2. Bilinçli hatalar içeren test sayfasında tüm kritik kontrollerin çalıştığı doğrulandı.
3. Vitrinweb sitesinde ilk denetim: **0 kritik, 0 önemli, 16 iyileştirme, 3 bilgi** (aşağıda).
4. `referans/kontrol-listesi.md`: her kontrolün Google kaynağı ve kaynak sayfanın son güncelleme tarihi.
5. `SKILL.md`: kullanım adımları.

## İlk denetimin öne çıkan bulguları (Vitrinweb, 10 Ekim 2026)
- **Ana sayfa ve 8 yasal sayfa aynı meta açıklamayı kullanıyor.** Yasal sayfalara kendi açıklamaları yazılmalı (gerçek bulgu, düzeltilmedi).
- Bazı eski blog yazılarında başlık ve açıklama uzun. Fiyat ve yerel SEO yazıları takvimde yeniden yazılınca düzeliyor; diğer eski yazılar yükseltilirken düzeltilecek.
- /icerik-politikasi sayfasında BreadcrumbList yok, /hakkimizda sayfasında og:image yok (küçük düzeltmeler).
- /iletisim açıklaması kısa (65 karakter), /isgale-hayir açıklaması uzun (199 karakter).

## Yapılacaklar (sırayla)
1. **Kalan Search Central sayfalarını doğrula** (10 Ekim'de WebFetch kotası doldu): yapısal veri genel kuralları (sd-policies), breadcrumb, sayfa deneyimi, HTTP durum kodları ve soft 404, yönlendirmeler, site taşıma, Search Console'a başlangıç. Ardından `referans/google-kurallari.md` bilgi tabanını yaz (kural + kaynak + tarih + Vitrinweb'e etkisi).
2. **Güncelleme günlüğü:** `referans/guncelleme-gunlugu.md` dosyasını oluştur. Search Central "güncellemeler" sayfasında son kontrol edilen tarih ve bizi etkileyen değişiklikler burada tutulacak. 10 Ekim itibarıyla son kayıtlar: 8 Eki UGC Fresh Data, 1 Eki üretken yapay zekâ rehberi güncellemesi, 28 Ağu favicon biçimleri ve site itibarı politikası, 24 Tem review snippet sahte/teşvikli yorum kuralı. Daha önce: FAQ zengin sonuçları 7 Mayıs 2026'da kaldırıldı, İşletme Profili soru-cevap özelliği kaldırıldı.
3. `referans/rapor-sablonu.md`: Vitrinweb iç raporu ve müşteriye verilecek rapor için iki şablon. Müşteri raporu, madde 2.8'deki "SEO özeti" teslim belgesiyle birleştirilebilir.
4. **Aylık otomatik görev:** Her ayın 1'inde 08:52 (TR). Yapacakları: (a) repoyu ekle ve derle, (b) denetle.mjs, (c) canlı kontroller C01–C02, (d) Search Central güncellemelerini günlükle karşılaştır, (e) raporu projeye yaz ve bildirim gönder. Search Console verisi için bir bağlayıcı araştırılacak (C03).
5. **Müşteri siteleri için akış:** Müşteri repolarının nerede tutulacağı madde 3'te karar bekliyor. Karar sonrası "teslim öncesi denetim" adımı teslim sürecine (madde 2.5) eklenecek.
6. **İsteğe bağlı:** Denetimi Vitrinweb sitesinin derleme sürecine uyarı olarak eklemek. Kritik bulguda yayını durdurmak da bir seçenek.

## Bilinen sınırlar
- Betik HTML'yi düzenli ifadelerle okur. Next.js ve statik site çıktılarında çalışır, ama çok sıra dışı HTML'de yanılabilir.
- Görünen başlık uzunluğu için karakter sayısı kullanılıyor; Google piksel genişliğine göre keser.
- Canlı hız (Core Web Vitals) ve Search Console verisi betiğin kapsamı dışında.
- Bu ortamın kabuğu canlı sitelere erişemiyor; canlı kontroller WebFetch ile yapılmalı.
