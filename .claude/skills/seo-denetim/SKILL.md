---
name: seo-denetim
description: Vitrinweb'in kendi sitesini ya da bir müşteri sitesini (teslim öncesi) Google Search Central kurallarına ve Vitrinweb SEO Makale Standardı'na göre denetler; önem sıralı Türkçe rapor üretir. "SEO denetimi", "siteyi denetle", "teslim öncesi SEO kontrolü" istendiğinde kullanılır.
---

# Vitrinweb SEO denetimi

**Durum:** Sürüm 0.2 (10 Ekim 2026). Betik (K01–K19), kontrol listesi (C01–C08), Google kuralları bilgi tabanı, güncelleme günlüğü, rapor şablonları ve aylık otomatik görev hazır. Açık işler: `referans/devir-notu.md`.

## Dosyalar
- `denetle.mjs` — derlenmiş HTML üzerinde otomatik kontroller (bağımlılık yok)
- `referans/kontrol-listesi.md` — K ve C kodları, her birinin dayanağı
- `referans/google-kurallari.md` — kural + kaynak + tarih + Vitrinweb'e etkisi; "Google kuralı" ile "iyi uygulama" ayrımı
- `referans/guncelleme-gunlugu.md` — Search Central güncellemelerinin takibi, son kontrol tarihi
- `referans/rapor-sablonu.md` — A: iç rapor, B1: müşteri teslim özeti, B2: müşteri adayı ön analizi

## Ne zaman kullanılır
- Vitrinweb'in kendi sitesinin aylık denetimi (otomatik, her ayın 1'i)
- Bir müşteri sitesi teslim edilmeden önce (teslim süreci adımı)
- Müşteri adayının mevcut sitesinin ön analizi ("Ücretsiz Site Analizi"; yalnızca canlı kontroller + B2 şablonu, kaynak kod yoksa betik çalışmaz)
- Büyük bir değişiklikten (yeni sayfalar, tasarım değişikliği) sonra

## Adımlar
1. **Derle.** Next.js projesinde `npm ci && rm -rf .next && npm run build`. Statik sitede çıktı klasörünü kullan.
2. **Otomatik denetim:**
   `node .claude/skills/seo-denetim/denetle.mjs .next/server/app --site https://www.ALANADI --md rapor.md --json rapor.json`
   (Statik site: `.next/server/app` yerine `out/` ya da `dist/`.) Betik kritik bulgu varsa 1 ile çıkar.
3. **Canlı kontroller:** `referans/kontrol-listesi.md` içindeki C01–C08 (uygun olanlar). Çalışma ortamının kabuğu çoğu siteye erişemez; WebFetch kullan.
4. **Yorumla.** Her bulguyu `google-kurallari.md`'deki dayanağıyla birlikte değerlendir. Bilerek yapılmış durumları (ör. sipariş sayfasında noindex) "beklenen" olarak işaretle, hata sayma.
5. **Rapor.** `referans/rapor-sablonu.md`'deki uygun şablonla Türkçe rapor yaz. Raporu claude.ai'deki Vitrinweb projesine `claude/seo-raporlari/YYYY-AA-<site>.md` olarak kaydet.

## Aylık otomatik denetim (Vitrinweb sitesi)
Her ayın 1'inde 08:52 (TR) zamanlanmış görev bu bölümü uygular. Her çalışma yeni bir oturumdur, önceki sohbeti bilmez.

1. **Repo:** `kerimelmalii/vitrinweb`'i oturuma ekle ve klonla. Derle (Adımlar 1). Derleme başarısızsa raporu yine yaz, ilk satırda derleme hatasını bildir.
2. **Betik:** Adımlar 2, `--site https://www.vitrinweb.com.tr`.
3. **Canlı kontroller (WebFetch):** WebFetch bir siteyi yalnızca adresi kullanıcı mesajında geçiyorsa izinsiz açar; bu yüzden aşağıdaki adresler zamanlanmış görevin metninde birebir yazılıdır. Adres değişirse görev metni de güncellenmeli. İzin hatası gelirse kontrolü "bakılmadı (izin)" diye raporla, yeniden deneme.
   - C01: `https://vitrinweb.com.tr/` → `https://www.vitrinweb.com.tr/` (WebFetch başka ana makineye yönlendirmeyi bildirir; bildirilen hedef doğru mu?)
   - C02: `https://www.vitrinweb.com.tr/robots.txt` ve `https://www.vitrinweb.com.tr/sitemap.xml` açılıyor mu; site haritasında `example.com` ya da başka alan adı var mı
   - C07: `https://www.vitrinweb.com.tr/seo-denetim-404-testi` 404 mü
   - C04: PageSpeed Insights'a WebFetch ile ulaşılamıyorsa "bakılmadı" yaz, kullanıcıdan istemeye gerek yok
4. **Google güncellemeleri:** `referans/guncelleme-gunlugu.md`'deki "Son kontrol" tarihinden sonraki kayıtları https://developers.google.com/search/updates sayfasından oku ve günlüğün "Kontrol yöntemi" bölümünü uygula. Sayfası değişen kuralları `google-kurallari.md`'de güncelle.
5. **Karşılaştır:** Projedeki en son `claude/seo-raporlari/*-vitrinweb*.md` raporuyla bulgu sayılarını ve açık işleri karşılaştır.
6. **Rapor:** Şablon A ile `claude/seo-raporlari/YYYY-AA-vitrinweb.md` olarak projeye yaz. C03 (Search Console) için resmi bağlayıcı yok: raporda kullanıcıdan şu üçüne bakmasını iste: Sayfalar raporu (dizine eklenmeyen sebepler), Site haritaları durumu, Core Web Vitals (mobil).
7. **Repo değişikliği** (yalnızca günlük, bilgi tabanı ya da kontrol listesi değiştiyse): `claude/seo-aylik-YYYY-AA` dalında commit → PR → squash-merge. Sitenin kodunu aylık görevde değiştirme; site bulgusu raporda kalır.
8. **Bildir:** Kullanıcıya tek mesaj: Kritik/Önemli sayıları, en önemli 3 iş, Google tarafında yüksek etkili değişiklik varsa o. Kritik bulgu varsa mesajın ilk kelimesi "KRİTİK".

## Kurallar
- Google'ın söylemediği bir şeyi Google kuralı gibi sunma; her bulgunun dayanağı `google-kurallari.md`'de. Dayanağı yoksa "iyi uygulama" de.
- Sıralama garantisi verme, "şu yapılırsa ilk sıraya çıkar" deme. Puan ("SEO skoru") verme.
- Müşteri raporlarında teknik terimleri bir cümleyle açıkla (okuyucu işletme sahibi).
- Vitrinweb eski siteleri onarmaz: müşteri adayının mevcut sitesi denetlenirse rapor "yeni site neleri baştan çözer" diliyle biter (şablon B2).
