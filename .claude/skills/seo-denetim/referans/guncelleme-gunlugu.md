# Search Central güncelleme günlüğü

Kaynak: [Google Search Central — Latest documentation updates](https://developers.google.com/search/updates). Aylık denetimde bu sayfa açılır, **son kontrol edilen kayıttan** sonraki girdiler okunur, bizi etkileyenler aşağıya eklenir ve `google-kurallari.md` gerekiyorsa güncellenir.

**Son kontrol:** 10 Ekim 2026 · **Okunan en yeni kayıt:** 8 Ekim 2026 (UGC Fresh Data Program)

Etki: **Yüksek** (kural ya da kontrol değişir), **Orta** (müşteri sitelerinde dikkat), **Düşük** (bilgi), **Yok** (bizi ilgilendirmeyen alan: haber, alışveriş, video vb. — yalnızca sayılır, listelenmez).

## Kayıtlar (yeniden eskiye)

| Tarih | Değişiklik | Etki | Ne yaptık |
|---|---|---|---|
| 2026-10-08 | UGC Fresh Data Program belgesi eklendi | Düşük | Kullanıcı içerikli büyük platformlar için; Vitrinweb ve küçük işletme siteleri kapsam dışı. |
| 2026-10-01 | Üretken yapay zekâ içeriği rehberi, Arama Kalitesi Değerlendirici yönergeleriyle hizalandı | Orta | `google-kurallari.md` 4. bölüm. SEO Makale Standardı'ndaki insan editörlüğü ve kaynak şartı yeterli; ayrıca değişiklik gerekmedi. |
| 2026-09-22 | Sayfa deneyimi sayfası güncellendi (güncellemeler listesinde ayrı kayıt yok, sayfa tarihinden görüldü) | Orta | `google-kurallari.md` 6. bölüm: yalnızca Core Web Vitals sıralamada açıkça kullanılıyor. |
| 2026-09-08 | Arama deneyiminde bölgesel farklar belgesi | Düşük | Bazı özellikler Türkiye'de olmayabilir; müşteriye bir özelliği vaat etmeden önce bölge kontrolü. |
| 2026-09-08 | Breadcrumb, Article, Organization sayfaları güncellendi (sayfa tarihleri) | Orta | Breadcrumb zorunlu alanları betiğe eklendi (K13). |
| 2026-08-28 | Favicon belgesi desteklenen dosya biçimlerini açıkça listeliyor | Orta | Sitede `favicon.ico` + `icon.svg` + `apple-icon.png`; K14 favicon varlığını kontrol ediyor. Biçim kontrolü betikte yok. |
| 2026-08-28 | Site itibarı politikası güncellendi (AEA içinde uygulama yaklaşımı) | Düşük | Türkiye AEA dışında; üçüncü taraf içerik barındırmıyoruz. |
| 2026-08-20 | Site taşıma rehberi güncellendi (sayfa tarihi) | Yüksek | Müşteri yenilemelerinde kullanılacak; `google-kurallari.md` 3. bölüm ve C08 eklendi. |
| 2026-08-20 | "Tercih edilen kaynak" özel düğmesi | Düşük | Haber/yayın siteleri için; şimdilik uygulamıyoruz. |
| 2026-07-24 | Yorum snippet'i: sahte ve açıklanmamış teşvikli yorum kuralı | Orta | Sitede Review işaretlemesi yok. Müşteri sitelerinde yalnızca gerçek yorumlar işaretlenir. |
| 2026-07-10 | Kanonikleştirme sorun giderme rehberi (yeniden değerlendirme zamanı) ve yapısal veri genel kuralları güncellendi | Orta | `google-kurallari.md` 2. ve 5. bölüm. |
| 2026-06-17 | Site taşıma: alan adı varyantları için Adres Değişikliği aracı | Orta | `google-kurallari.md` 3. bölüm. |
| 2026-06-15 | `llms.txt`: Google Arama kullanmıyor, başka hizmetler için tutulabilir | Orta | Sitedeki `/llms.txt` kalıyor; SEO kazancı diye sunulmaz. |
| 2026-06-15 | FAQ zengin sonuç belgesi kaldırıldı | Yüksek | Betik FAQPage için bilgi notu veriyor (K13). |
| 2026-06-05 | Üçüncü taraf SEO araçları, hizmetleri ve tavsiyeler rehberi; "Bir SEO'ya ihtiyacınız var mı?" güncellendi | Yüksek | Ücretli denetim hizmeti için kural: puan yok, "Google onaylı" yok, her bulgu kaynaklı (`google-kurallari.md` 8. bölüm). |
| 2026-05-15 | Üretken yapay zekâ özellikleri için optimizasyon rehberi; spam politikaları yapay zekâ yanıtlarına da uygulanıyor | Orta | AEO/GEO vaadi vermiyoruz; ileride ayrı kontrol olarak değerlendirilebilir. |
| 2026-05-08 | FAQ zengin sonucu kullanımdan kaldırıldı (7 Mayıs 2026'da sona erdi) | Yüksek | Bkz. 2026-06-15. |
| 2026-04-20 | "Daha fazla oku" derin bağlantıları bölümü | Düşük | — |
| 2026-04-14 / 04-23 | Spam raporlarının el ile işlemde kullanılabileceği açıklandı | Düşük | — |
| 2026-04-13 | Yeni spam politikası: geri tuşunu ele geçirme | Orta | Müşteri sitelerinde geri tuşunu engelleyen betik bulgu sayılır. |

## Önceki dönemden bilinenler

- Google İşletme Profili soru-cevap özelliği kaldırıldı (Search Central dışı; ana yapılacaklar sohbetinden aktarıldı, tarih doğrulanmadı).

## Kontrol yöntemi (aylık görev için)

1. Güncellemeler sayfasını WebFetch ile aç; "Son kontrol" tarihinden sonraki kayıtları iste.
2. Her kayda etki ver. "Yüksek" ise `google-kurallari.md`'de ilgili satırı ve gerekirse `denetle.mjs`/`kontrol-listesi.md`'yi güncelle (repo değişikliği → PR).
3. Bu dosyanın başındaki "Son kontrol" ve "Okunan en yeni kayıt" satırlarını güncelle.
4. Aylık raporun "Google tarafında değişenler" bölümüne yalnızca Yüksek/Orta kayıtları yaz.
