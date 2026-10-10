---
name: tasarim-analizi
description: Vitrinweb müşterisinin brief'inden (içerik formu + başvuru anketi) yola çıkıp işletmeyi anlar, sektörü ve rakipleri internette araştırır, sayfa yapısını, özellikleri, içerik ve SEO planını, en son da gerekçeli tasarım yönünü çıkarır; Vitrinweb zorunlu eklerini ve kontrolleri uygular. "Tasarım analizi", "müşteri analizi", "siteyi planla" istendiğinde kullanılır.
---

# Vitrinweb Web Sitesi Tasarım Analizi

**Sürüm 1.0 (11 Ekim 2026).** Müşteri Süreci 2.8 adım 1'de, kodlamaya başlamadan önce çalıştırılır. Çıktı, geliştirmenin tek girdisidir.

**Temel kural:** Tasarım kararı en sona kalır. "Arka plan beyaz olsun", "mavi kullanalım" gibi kararlar ancak işletme, sektör, rakip ve kullanıcı analizinden sonra, bu analize dayanarak ve gerekçesiyle verilir.

## Girdi
- Müşterinin içerik formu kaydı (`content_form`: eski alanlar + `brief` + `consents`) veya yapıştırılmış brief metni
- Başvuru anketi cevapları ve (varsa) görüşme notları
- Sipariş: seçilen ek özellikler, teklif talepleri
- Varsa: logo, fotoğraflar, mevcut site adresi, Google Haritalar bağlantısı

Girdi eksikse durma: eksikleri **Aşama 0**'da listele, makul varsayımla devam et ve her varsayımı raporda **[Varsayım]** diye işaretle.

## Çalışma kuralları
- Dil: Türkçe. Rapor işletme sahibine değil Vitrinweb ekibine yazılır; teknik terim kullanılabilir.
- **Uydurma yok:** İşletme hakkında brief'te olmayan bir bilgiyi (kuruluş yılı, ödül, müşteri sayısı, yorum) gerçekmiş gibi yazma.
- **Kaynak göster:** Sektör ve rakip araştırmasındaki her somut bilgi bağlantısıyla verilir. Kaynak bulunamazsa "kaynak bulunamadı" yazılır.
- **Kopya yok:** Rakiplerin metni, görseli, logosu veya ayırt edici tasarımı kopyalanmaz; yalnızca neyi iyi/kötü yaptıkları analiz edilir.
- **Kapsam:** Temel paket 5 sayfadır. Kapsam dışı her öneri (6. sayfa, ek özellik) ayrıca "Ek satış önerisi" olarak işaretlenir; sessizce plana eklenmez.
- **Vaat yok:** Metin önerilerinde sıralama, satış veya müşteri artışı garantisi olmaz.
- Her aşamanın sonunda o aşamanın **çıktısı** kısa bir başlık altında yazılır; sonraki aşama bu çıktıyı kullanır.

---

## Aşama 0 — Girdi kontrolü
1. Brief'i oku; zorunlu alanları (Müşteri Bilgi Standardı, C bölümü) kontrol et: marka adı, yasal unvan, telefon, e-posta, adres/hizmet bölgesi, çalışma saatleri, ana eylem, en az 3 hizmet, hakkımızda bilgisi, logo/yazı logosu kararı, fotoğraf/stok kararı, alan adı tercihi, içerik hakları ve çalışma başlasın onayı.
2. **Çıktı:** Eksik bilgi listesi + her eksik için uygulanan varsayım.

## Aşama 1 — İşletmeyi anlamak
1. İşletmeyi 3–4 cümleyle özetle: ne satıyor, kime, nerede, nasıl (mekân / yerinde hizmet / online / randevu).
2. **İş modeli türü:** yerel mekân · yerinde hizmet · randevulu hizmet · ürün satışı · profesyonel hizmet (danışmanlık, hukuk, sağlık vb.).
3. **Müşteri yolculuğu:** müşteri bu işletmeyi nasıl arar, neye bakarak seçer, nasıl iletişime geçer, ne zaman karar verir.
4. **Ana eylem** (brief'ten) ve ikincil eylem; neden doğru olduğunu iş modeliyle ilişkilendir.
5. **Değer önerisi:** brief'teki "fark" ve hizmetlerden tek cümle. Brief'te yoksa öneri yaz, [Varsayım] işaretle.
6. **Marka karakteri:** 3–5 sıfat (ör. güvenilir, samimi, hızlı). Her sıfatın brief'te hangi bilgiye dayandığını yaz.
7. **Çıktı:** İşletme profili (yukarıdaki 6 madde).

## Aşama 2 — Sektör araştırması (internet)
Web araması yap; Türkiye kaynaklarını öncele, tarihleri kontrol et.
1. Bu sektörde müşterilerin **karar kriterleri** (fiyat, konum, uzmanlık, hijyen, hız, garanti, belge…).
2. **Güven unsurları:** müşterinin aradığı belge, sertifika, ruhsat, üyelik, fotoğraf türleri, yorumlar.
3. **Sektöre özel yasal kısıtlar:** reklam/tanıtım yasağı veya sınırı olan sektörleri mutlaka kontrol et (ör. sağlık kuruluşları ve hekimler, avukatlar, eczaneler, gayrimenkul ilanlarında yetki belgesi, gıda/takviye sağlık beyanları, finans). Hangi ifade ve içeriklerin kullanılamayacağını kaynağıyla yaz.
4. **Arama davranışı:** müşterilerin Google'da kullandığı tipik ifadeler (ör. "kadıköy diş kliniği", "acil çilingir ataşehir"), yerel arama ağırlığı, sezonluk dönemler.
5. **Sık sorulan sorular:** sektörde müşterilerin en sık sorduğu 5–8 soru (brief'tekilerle birleştir).
6. **Çıktı:** Sektör özeti + yasal kısıt listesi + anahtar ifade listesi + SSS listesi, kaynaklarıyla.

## Aşama 3 — Rakip ve örnek analizi
1. Aynı bölgede 3–5 rakibin web sitesini bul (Google araması / Haritalar). Brief'te rakip verildiyse onları dahil et.
2. Her biri için: sitesi var mı, mobilde nasıl, ana eylemi ne, güven unsurları neler, eksikleri neler, hangi aramalarda görünüyor.
3. Sektörün iyi uygulandığı 1–2 örnek site (bölge dışı olabilir) ve neyi iyi yaptığı.
4. Brief'te "beğendiğim site" varsa: neyi beğenmiş olabileceğini analiz et (düzen mi, renk mi, fotoğraf mı).
5. **Çıktı:** Rakip tablosu + "rakiplerde olmayan, bizim fark yaratabileceğimiz 3 şey".

## Aşama 4 — Hedef kitle ve kullanıcı beklentileri
1. 1–2 ziyaretçi profili: kim, hangi cihazdan (varsayılan: mobil ağırlıklı), hangi anda, ne arıyor.
2. Her profil için: siteye girince ilk 5 saniyede görmesi gerekenler, cevap aradığı sorular, kaygıları ve eyleme engel olan şeyler.
3. **Çıktı:** Ziyaretçi profilleri + "ilk ekranda mutlaka olmalı" listesi.

## Aşama 5 — Site yapısı (bilgi mimarisi)
1. 5 sayfanın adı ve amacı (varsayılan: Ana Sayfa, Hakkımızda, Hizmetler, Galeri, İletişim; iş modeline göre ad değişebilir, sayı değişmez). Seçilen ek özelliklerin sayfaları (Blog, Randevu, Katalog…) ayrıca.
2. Her sayfa için bölüm sırası (ör. Ana Sayfa: ilk ekran → hizmetler → neden biz → yorumlar → SSS → iletişim çağrısı).
3. Ana eylem butonunun yerleri (ilk ekran, sayfa sonu, mobil sabit çubuk) ve WhatsApp/tıkla-ara davranışı.
4. Menü, alt bilgi (yasal unvan, iletişim, yasal sayfalar) yapısı.
5. **Çıktı:** Site haritası + sayfa başına bölüm listesi.

## Aşama 6 — Özellik listesi
Aşama 1–5'e dayanarak:
- **Olmalı (paket içi):** her sitede olanlar + bu işletmeye özel olanlar.
- **Olursa iyi (paket içi):** zaman kalırsa.
- **Ek satış önerisi (paket dışı):** gerekçesi ve fiyatıyla (ADDONS listesindeki fiyatlar; teklifli olanlar "teklif").
- **Çıktı:** Üç başlıklı özellik listesi.

## Aşama 7 — İçerik ve SEO planı
1. Her sayfa için: hedef anahtar ifade (Aşama 2'den), sayfa başlığı (title, ~50–60 karakter), meta açıklama (~120–155 karakter), H1.
2. Her bölüm için içerik özeti: hangi bilgi brief'ten gelir, neyi biz yazarız, hangi görsel kullanılır.
3. Ton: Aşama 1'deki marka karakterine göre; "siz" hitabı (müşteri aksini istemedikçe).
4. Yerel SEO: işletme adı/adres/telefon her yerde aynı; LocalBusiness yapısal verisi için gerekli alanlar (ad, adres veya hizmet bölgesi, telefon, saatler, alan adı, logo, Google Haritalar bağlantısı).
5. Görseller: hangi sayfada hangi fotoğraf; fotoğraf yoksa stok görsel arama terimleri (kullanım hakkı uygun kaynaklardan).
6. **Çıktı:** Sayfa başına içerik ve SEO tablosu.

## Aşama 8 — Tasarım yönü (ancak şimdi)
Her karar için **"çünkü"** ile Aşama 1–4'teki bir bulguya dayan.
1. **Görsel karakter:** marka sıfatlarından türetilmiş 2–3 cümlelik tasarım ilkesi.
2. **Renk paleti:** logo/marka renkleri varsa onlardan; yoksa sektör ve karakterden. Ana, vurgu, metin, arka plan renkleri (HEX). Rakiplerden ayrışma. Metin/arka plan kontrastı WCAG AA (4,5:1) kontrol edilir.
3. **Tipografi:** başlık ve metin yazı tipi (Türkçe karakter desteği şart), boyut ölçeği.
4. **Görsel dili:** fotoğraf mı illüstrasyon mu, fotoğrafların tonu, ikon stili.
5. **Yerleşim:** yoğunluk (ferah/yoğun), ilk ekran düzeni (mobil önce), kart/bölüm yapısı.
6. **Hareket:** varsa ölçülü; erişilebilirlik için "hareketi azalt" tercihine uyulur.
7. Brief'teki stil tercihi ve "istemediklerim" ile çelişki varsa açıkça yaz ve müşteriye sorulacaklara ekle.
8. **Çıktı:** Tasarım yönü kartı.

## Aşama 9 — Vitrinweb zorunlu ekleri
Aşağıdakilerin her biri plana eklenir; eksik bırakılırsa nedeni yazılır.
- [ ] 5 sayfa, mobil uyumlu; 2 revizyon turuna uygun esnek yapı
- [ ] WhatsApp butonu (brief'teki WhatsApp numarası veya telefon) ve tıkla-ara
- [ ] Google Haritalar (adres gizliyse hizmet bölgesi metni, harita yok)
- [ ] Basit iletişim formu (ad, telefon, mesaj) + KVKK aydınlatma bağlantısı; mesajlar brief'teki e-postaya
- [ ] Google yorumları — **yalnızca `showReviews` işaretliyse:** müşterinin onayladığı yorumlar, metin aynen, yıldız + tarih + "Ad S." biçiminde yazar, "Google yorumları" etiketi, işletmenin Google'daki tüm yorumlarına bağlantı
- [ ] SEO altyapısı: sayfa başına özel title/meta, tek H1, site haritası, robots.txt, canonical, LocalBusiness + WebSite yapısal verisi, Open Graph görseli, favicon
- [ ] Görseller WebP, boyutları (width/height) belirtilmiş, anlamlı alt metinler
- [ ] Yasal sayfalar: KVKK aydınlatma metni (yasal unvanla), çerez metni (çerez kullanılıyorsa); alt bilgide yasal unvan
- [ ] 404 sayfası
- [ ] Ana eylem butonu ilk ekranda ve sayfa sonlarında
- [ ] Logo yoksa marka adıyla yazı logosu; fotoğraf yoksa kullanım hakkı uygun görseller
- [ ] Mevcut site varsa: eski adres → yeni sayfa yönlendirme tablosu (SEO denetimi C08)
- [ ] Mevcut alan adında e-posta varsa: DNS değişikliğinde e-posta (MX) kayıtları korunacak notu
- [ ] Seçilen ek özelliklerin brief'teki bilgilere göre planı

## Aşama 10 — Kontroller
1. **Tutarlılık:** Her öneri brief'le çelişmiyor mu? (ad, telefon, saatler, ana eylem, stil, istenmeyenler)
2. **Kapsam:** Plan 5 sayfayı ve seçilen ek özellikleri aşıyor mu? Aşıyorsa "Ek satış önerisi"ne taşındı mı?
3. **Yasal/etik:** sektör kısıtlarına uyuluyor mu, garanti/abartı ifadesi var mı, uydurma bilgi var mı, fotoğraftaki kişiler için izin işaretli mi (`consents.peoplePhotos`)?
4. **SEO:** her sayfanın title/meta/H1'i benzersiz mi, anahtar ifadeler doğal mı?
5. **Erişilebilirlik:** kontrast, yazı boyutu, buton boyutu (mobilde en az 44 px), alt metin planı.
6. **5 iş günü:** plan 5 iş gününe sığıyor mu? Sığmıyorsa nedenini yaz (genellikle ek özellik).
7. **Çıktı:** Kontrol tablosu (madde · durum · not).

---

## Çıktı biçimi
Raporu aşağıdaki başlıklarla, tek belge olarak yaz. Kayıt yeri: claude.ai Vitrinweb projesi → `claude/musteriler/<siparis-no>-<marka>/tasarim-analizi.md` (müşteri dosyalarının nihai yeri madde 3'te kesinleşir).

1. **Özet** (5 satır: işletme, ana eylem, tasarım yönü tek cümle, ek satış önerisi var mı, eksik bilgi var mı)
2. Eksik bilgiler ve varsayımlar (Aşama 0)
3. İşletme profili (Aşama 1)
4. Sektör araştırması — kaynaklarıyla (Aşama 2)
5. Rakip analizi (Aşama 3)
6. Ziyaretçi profilleri (Aşama 4)
7. Site haritası ve sayfa bölümleri (Aşama 5)
8. Özellik listesi (Aşama 6)
9. İçerik ve SEO planı (Aşama 7)
10. Tasarım yönü (Aşama 8)
11. Vitrinweb zorunlu ekleri — işaretli liste (Aşama 9)
12. Kontrol tablosu (Aşama 10)
13. **Geliştirme görev listesi** — sırayla, Gün 1–2'ye bölünmüş
14. **Müşteriye sorulacaklar** — tek WhatsApp mesajı taslağı ("siz" hitabı, en fazla 5 soru, cevapsız kalırsa uygulanacak varsayımla birlikte)
15. Kaynaklar

## claude.ai'de kullanım (Claude Code dışında)
Bu dosyanın "Vitrinweb Web Sitesi Tasarım Analizi" başlığından sonraki kısmını sohbete yapıştır, altına müşterinin brief'ini (içerik formu kaydı veya metin) ekle ve "Aşama 0'dan başla" yaz. Web araması açık olmalı.
