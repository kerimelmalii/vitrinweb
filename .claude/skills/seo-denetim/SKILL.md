---
name: seo-denetim
description: Vitrinweb'in kendi sitesini ya da bir müşteri sitesini (teslim öncesi) Google Search Central kurallarına ve Vitrinweb SEO Makale Standardı'na göre denetler; önem sıralı Türkçe rapor üretir. "SEO denetimi", "siteyi denetle", "teslim öncesi SEO kontrolü" istendiğinde kullanılır.
---

# Vitrinweb SEO denetimi

**Durum:** Sürüm 0.1 (10 Ekim 2026). Otomatik denetim betiği ve kontrol listesi hazır ve Vitrinweb sitesinde test edildi. Bilgi tabanının genişletilmesi ve aylık otomatik rapor henüz yapılmadı — ayrıntı: `referans/devir-notu.md`.

## Ne zaman kullanılır
- Vitrinweb'in kendi sitesinin aylık denetimi
- Bir müşteri sitesi teslim edilmeden önce (teslim süreci adımı)
- Büyük bir değişiklikten (yeni sayfalar, tasarım değişikliği) sonra

## Adımlar
1. **Derle.** Next.js projesinde `npm ci && npm run build`. Statik sitede çıktı klasörünü kullan.
2. **Otomatik denetim:**
   `node .claude/skills/seo-denetim/denetle.mjs .next/server/app --site https://www.ALANADI --md rapor.md --json rapor.json`
   (Statik site: `.next/server/app` yerine `out/` ya da `dist/`.) Betik kritik bulgu varsa 1 ile çıkar.
3. **Canlı kontroller:** `referans/kontrol-listesi.md` içindeki C01–C06. Çalışma ortamının kabuğu çoğu siteye erişemez; WebFetch kullan.
4. **Yorumla.** Her bulguyu kontrol listesindeki dayanağıyla birlikte değerlendir. Bilerek yapılmış durumları (ör. sipariş sayfasında noindex) "beklenen" olarak işaretle, hata sayma.
5. **Rapor.** `referans/rapor-sablonu.md` biçiminde Türkçe rapor yaz: önce özet ve en önemli 3 aksiyon, sonra önem sırasına göre bulgular, her birinde "neden önemli" ve "nasıl düzeltilir". Raporu claude.ai'deki Vitrinweb projesine `claude/seo-raporlari/YYYY-AA-<site>.md` olarak kaydet.

## Kurallar
- Google'ın söylemediği bir şeyi Google kuralı gibi sunma; her bulgunun dayanağı kontrol listesinde.
- Sıralama garantisi verme, "şu yapılırsa ilk sıraya çıkar" deme.
- Müşteri raporlarında teknik terimleri bir cümleyle açıkla (okuyucu işletme sahibi).
- Vitrinweb eski siteleri onarmaz: müşteri adayının mevcut sitesi denetlenirse rapor "yeni site neleri baştan çözer" diliyle biter.
