# SEO denetim botu — devir notu (güncelleme: 10 Ekim 2026, v0.2)

Ana yapılacaklar sohbetinde başladı (madde 1.5), ayrı bir SEO sohbetinde sürüyor. Bu sohbet kendi kaydını claude.ai projesinde `claude/seo-calisma-kaydi.md`'ye yazar; `claude/vitrin-kayit.md` yalnızca ana sohbetten güncellenir.

## Kullanıcının kararları
- Kullanım alanı: **ikisi birden** — Vitrinweb'in kendi sitesi + müşteri sitelerinin teslim öncesi denetimi. İyi sonuç verirse ileride **ücretli hizmet** olabilir.
- Çalışma: **ayda bir otomatik rapor** + istendiğinde elle.
- Konumlandırma: Vitrinweb eski siteleri onarmaz; sitesi olmayana site kurar, olana daha iyisini yapar. Müşteri adayının mevcut sitesinin denetimi, yenilemeye yönlendiren bir araç olarak kullanılır ("Ücretsiz Site Analizi", şablon B2).

## Tamamlananlar
**v0.1 (PR #60):** `denetle.mjs` (K01–K19), `kontrol-listesi.md`, `SKILL.md`, ilk Vitrinweb denetimi (0 kritik, 0 önemli, 16 iyileştirme, 3 bilgi).

**v0.2 (10 Ekim 2026):**
1. Kalan Search Central sayfaları doğrulandı: yapısal veri genel kuralları (2026-07-10), breadcrumb (2026-09-08), sayfa deneyimi (2026-09-22), HTTP durum kodları/soft 404 (2026-02-04), yönlendirmeler (2026-04-14), site taşıma (2026-08-20), Search Console'a başlangıç (2025-12-10), Core Web Vitals (2025-12-10), üçüncü taraf SEO araçları (2026-06-05), "Bir SEO'ya ihtiyacınız var mı?" (2026-06-05).
2. `referans/google-kurallari.md`: kural + kaynak + tarih + Vitrinweb'e etkisi; "Google kuralı" ile "iyi uygulama" ayrı.
3. `referans/guncelleme-gunlugu.md`: Nisan–Ekim 2026 kayıtları, son kontrol 10 Ekim (en yeni kayıt 8 Ekim).
4. `referans/rapor-sablonu.md`: A iç rapor, B1 müşteri teslim özeti (madde 2.8 SEO özeti), B2 müşteri adayı ön analizi.
5. Betik: K13'e BreadcrumbList öğe sayısı/zorunlu alan kontrolü ve FAQPage bilgi notu eklendi. Kontrol listesine C07 (soft 404) ve C08 (site taşıma) eklendi.
6. **Aylık zamanlanmış görev** "Vitrinweb aylık SEO denetimi": her ayın 1'i 08:52 (TR), bulutta, onaysız (auto), telefon bildirimi açık. İlk çalışma 1 Kasım 2026. Adımlar `SKILL.md` → "Aylık otomatik denetim".

## Açık bulgular (Vitrinweb sitesi, düzeltilmedi)
- Ana sayfa + 8 yasal sayfa aynı meta açıklamayı kullanıyor → yasal sayfalara özel açıklama.
- Uzun blog başlık/açıklamaları (takvimdeki yeniden yazımlarla kısmen düzeliyor).
- /icerik-politikasi'nda BreadcrumbList, /hakkimizda'da og:image yok; /iletisim açıklaması kısa, /isgale-hayir uzun; /siparis'te H1 → H3.
- Ana sayfada FAQPage işaretlemesi: geçerli ama FAQ zengin sonuçları 7 Mayıs 2026'dan beri yok. Kaldırmak zorunlu değil.

## Yapılacaklar
1. **Search Console verisi (C03):** claude.ai bağlayıcı kayıtlarında resmi Google Search Console bağlayıcısı yok (10 Ekim 2026; yalnızca Semrush, Ahrefs, OpenSEO gibi üçüncü taraf araçlar var, bunlar Google verisi vermiyor). Şimdilik aylık rapor kullanıcıdan 3 rapora bakmasını istiyor. Seçenek: Search Console API + hizmet hesabıyla bir GitHub Actions işi verileri repoya JSON olarak yazar (kurulum kullanıcıda: Google Cloud projesi, hizmet hesabını Search Console'a kullanıcı olarak ekleme).
2. **Müşteri siteleri için akış:** Müşteri repolarının nerede tutulacağı madde 3'te karar bekliyor. Karar sonrası "teslim öncesi denetim" adımı teslim sürecine (madde 2.5) eklenecek; B1 şablonu madde 2.8 teslim belgelerine bağlanacak.
3. **İsteğe bağlı:** Denetimi Vitrinweb derleme sürecine uyarı olarak eklemek (ör. GitHub Actions'ta derleme sonrası `denetle.mjs`; kritik bulguda yayını durdurmak da bir seçenek).
4. **Ücretli hizmet olursa:** B2 şablonu "Ücretsiz Site Analizi" CTA'sıyla birlikte tasarlanacak (madde 2.4 / 5.x).

## Bilinen sınırlar
- Betik HTML'yi düzenli ifadelerle okur. Next.js ve statik site çıktılarında çalışır, ama çok sıra dışı HTML'de yanılabilir.
- Görünen başlık uzunluğu için karakter sayısı kullanılıyor; Google piksel genişliğine göre keser.
- Canlı hız (Core Web Vitals) ve Search Console verisi betiğin kapsamı dışında.
- Kabuk canlı sitelere erişemiyor; canlı kontroller WebFetch ile. **WebFetch bir siteyi yalnızca adresi kullanıcı mesajında geçiyorsa izinsiz açar** — aylık görevin metninde adresler bu yüzden birebir yazılı. Müşteri sitesi denetiminde adresi kullanıcının mesajına yazması istenir.
- Search Central güncellemeler sayfası çok uzun; WebFetch ilk 100.000 karakteri okur (Nisan 2026'ya kadarki kayıtlar). Aylık kontrolde yalnızca yeni kayıtlar gerektiği için yeterli.
