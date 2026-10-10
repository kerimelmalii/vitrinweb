---
name: tasarim-analizi
description: Vitrinweb müşterisinin brief'inden (içerik formu + başvuru anketi) yola çıkıp işletmeyi anlar, sektörü ve rakipleri internette araştırır, sayfa yapısını, özellikleri, içerik ve SEO planını, en son da gerekçeli tasarım yönünü çıkarır; performans bütçesini, Vitrinweb zorunlu eklerini ve kontrolleri uygular, geliştirmeye hazır üretim reçetesi üretir. "Tasarım analizi", "müşteri analizi", "siteyi planla" istendiğinde kullanılır.
---

# Vitrinweb Web Sitesi Tasarım Analizi

**Sürüm 1.1 (11 Ekim 2026).** Müşteri Süreci 2.8 adım 1'de, kodlamaya başlamadan önce çalıştırılır. Çıktı, geliştirmenin tek girdisidir.

**Temel kural:** Tasarım kararı en sona kalır. "Arka plan beyaz olsun", "mavi kullanalım" gibi kararlar ancak işletme, sektör, rakip ve kullanıcı analizinden sonra, bu analize dayanarak ve gerekçesiyle verilir.

## Seri üretim ilkeleri: aynı süreç, her biri özel site
Vitrinweb her siteyi 5 iş gününde teslim eder. Bunu kaliteyi düşürmeden yapmanın yolu, **süreci standartlaştırıp sonucu kişiselleştirmektir**:
1. **Aynı adımlar, aynı sıra.** Her müşteri bu becerinin aşamalarından geçer; atlanan aşama raporda gerekçesiyle yazılır.
2. **Hazır yapı taşları, özel birleşim.** Site, Vitrinweb bileşen kataloğundaki bölüm varyantlarından (ilk ekran, hizmetler, galeri, yorumlar, SSS, iletişim…) kurulur; özgünlük varyant seçimi, tasarım belirteçleri (renk, yazı tipi, köşe, boşluk), içerik ve her siteye özel bir **imza öğesi** ile sağlanır. *(Bileşen kataloğu ve başlangıç şablonu madde 3.1'de kurulacak; o zamana kadar varyant adları bu belgedeki taslak adlardır.)*
3. **Biriken bilgi.** Her sektör araştırması `claude/sektorler/<sektor>.md` kütüphanesine yazılır; aynı sektörden ikinci müşteride araştırma oradan başlar, yalnızca güncellenir.
4. **Ölçülebilir kalite.** Her site aynı performans bütçesine ve aynı kontrollere tabidir (Aşama 9 ve 11).
5. **Zaman kutusu.** Analizin tamamı yaklaşık yarım iş günü sürmelidir:

| Aşama | Hedef süre |
|---|---|
| 0–1 Girdi kontrolü, işletmeyi anlama | 20 dk |
| 2–3 Sektör ve rakip araştırması | 60 dk (kütüphanede sektör varsa 20 dk) |
| 4–7 Kitle, yapı, özellikler, içerik/SEO | 60 dk |
| 8–9 Tasarım yönü, performans bütçesi | 30 dk |
| 10–13 Zorunlu ekler, kontroller, reçete, öğrenme | 30 dk |

## Girdi
- Müşterinin içerik formu kaydı (`content_form`: eski alanlar + `brief` + `consents`) veya yapıştırılmış brief metni
- Başvuru anketi cevapları ve (varsa) görüşme notları
- Sipariş: seçilen ek özellikler, teklif talepleri
- Varsa: logo, fotoğraflar, mevcut site adresi, Google Haritalar bağlantısı
- Sektör kütüphanesinde bu sektörün dosyası (varsa)
- Son 5 Vitrinweb sitesinin üretim reçeteleri (farklılaştırma kontrolü için, varsa)

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
2. Sektör kütüphanesinde bu sektörün dosyası var mı bak.
3. **Çıktı:** Eksik bilgi listesi + her eksik için uygulanan varsayım + "sektör dosyası: var/yok".

## Aşama 1 — İşletmeyi anlamak
1. İşletmeyi 3–4 cümleyle özetle: ne satıyor, kime, nerede, nasıl (mekân / yerinde hizmet / online / randevu).
2. **İş modeli türü:** yerel mekân · yerinde hizmet · randevulu hizmet · ürün satışı · profesyonel hizmet (danışmanlık, hukuk, sağlık vb.).
3. **Müşteri yolculuğu:** müşteri bu işletmeyi nasıl arar, neye bakarak seçer, nasıl iletişime geçer, ne zaman karar verir.
4. **Ana eylem** (brief'ten) ve ikincil eylem; neden doğru olduğunu iş modeliyle ilişkilendir.
5. **Değer önerisi:** brief'teki "fark" ve hizmetlerden tek cümle. Brief'te yoksa öneri yaz, [Varsayım] işaretle.
6. **Marka karakteri:** 3–5 sıfat (ör. güvenilir, samimi, hızlı). Her sıfatın brief'te hangi bilgiye dayandığını yaz.
7. **Çıktı:** İşletme profili (yukarıdaki 6 madde).

## Aşama 2 — Sektör araştırması (internet)
Sektör dosyası varsa onu oku; yalnızca 6 aydan eski bilgileri ve bu işletmenin bölgesine özel kısmı yeniden araştır. Yoksa baştan araştır. Web araması yap; Türkiye kaynaklarını öncele, tarihleri kontrol et.
1. Bu sektörde müşterilerin **karar kriterleri** (fiyat, konum, uzmanlık, hijyen, hız, garanti, belge…).
2. **Güven unsurları:** müşterinin aradığı belge, sertifika, ruhsat, üyelik, fotoğraf türleri, yorumlar.
3. **Sektöre özel yasal kısıtlar:** reklam/tanıtım yasağı veya sınırı olan sektörleri mutlaka kontrol et (ör. sağlık kuruluşları ve hekimler, avukatlar, eczaneler, gayrimenkul ilanlarında yetki belgesi, gıda/takviye sağlık beyanları, finans). Hangi ifade ve içeriklerin kullanılamayacağını kaynağıyla yaz.
4. **Arama davranışı:** müşterilerin Google'da kullandığı tipik ifadeler (ör. "kadıköy diş kliniği", "acil çilingir ataşehir"), yerel arama ağırlığı, sezonluk dönemler.
5. **Sık sorulan sorular:** sektörde müşterilerin en sık sorduğu 5–8 soru (brief'tekilerle birleştir).
6. **Çıktı:** Sektör özeti + yasal kısıt listesi + anahtar ifade listesi + SSS listesi, kaynaklarıyla.

## Aşama 3 — Rakip ve örnek analizi
1. Aynı bölgede 3–5 rakibin web sitesini bul (Google araması / Haritalar). Brief'te rakip verildiyse onları dahil et.
2. Her biri için: sitesi var mı, mobilde nasıl, ana eylemi ne, güven unsurları neler, eksikleri neler, hızlı mı (yavaşsa not et), hangi aramalarda görünüyor.
3. Sektörün iyi uygulandığı 1–2 örnek site (bölge dışı olabilir) ve neyi iyi yaptığı.
4. Brief'te "beğendiğim site" varsa: neyi beğenmiş olabileceğini analiz et (düzen mi, renk mi, fotoğraf mı).
5. **Çıktı:** Rakip tablosu + "rakiplerde olmayan, bizim fark yaratabileceğimiz 3 şey".

## Aşama 4 — Hedef kitle ve kullanıcı beklentileri
1. 1–2 ziyaretçi profili: kim, hangi cihazdan (varsayılan: mobil ağırlıklı, çoğu zaman yavaş mobil bağlantı), hangi anda, ne arıyor.
2. Her profil için: siteye girince ilk 5 saniyede görmesi gerekenler, cevap aradığı sorular, kaygıları ve eyleme engel olan şeyler.
3. **Çıktı:** Ziyaretçi profilleri + "ilk ekranda mutlaka olmalı" listesi.

## Aşama 5 — Site yapısı (bilgi mimarisi)
1. 5 sayfanın adı ve amacı (varsayılan: Ana Sayfa, Hakkımızda, Hizmetler, Galeri, İletişim; iş modeline göre ad değişebilir, sayı değişmez). Seçilen ek özelliklerin sayfaları (Blog, Randevu, Katalog…) ayrıca.
2. Her sayfa için bölüm sırası (ör. Ana Sayfa: ilk ekran → hizmetler → neden biz → yorumlar → SSS → iletişim çağrısı). Her bölüm için katalogdan bir **bölüm varyantı** seç (Aşama 12).
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
3. Ton: Aşama 1'deki marka karakterine göre; "siz" hitabı (müşteri aksini istemedikçe). Kısa paragraflar, taranabilir başlıklar; ilk ekrandaki başlık ne iş yapıldığını ve nerede yapıldığını tek bakışta söyler.
4. Yerel SEO: işletme adı/adres/telefon her yerde aynı; LocalBusiness yapısal verisi için gerekli alanlar (ad, adres veya hizmet bölgesi, telefon, saatler, alan adı, logo, Google Haritalar bağlantısı).
5. Görseller: hangi sayfada hangi fotoğraf; fotoğraf yoksa stok görsel arama terimleri (kullanım hakkı uygun kaynaklardan). Gerçek işletme fotoğrafı varsa ilk ekranda o kullanılır.
6. **Çıktı:** Sayfa başına içerik ve SEO tablosu.

## Aşama 8 — Tasarım yönü (ancak şimdi)
Her karar için **"çünkü"** ile Aşama 1–4'teki bir bulguya dayan.
1. **Görsel karakter:** marka sıfatlarından türetilmiş 2–3 cümlelik tasarım ilkesi.
2. **Renk paleti:** logo/marka renkleri varsa onlardan; yoksa sektör ve karakterden. Ana, vurgu, metin, arka plan renkleri (HEX). Rakiplerden ayrışma. Metin/arka plan kontrastı WCAG AA (normal metin 4,5:1, büyük metin 3:1) kontrol edilir.
3. **Tipografi:** en fazla 2 yazı ailesi (başlık + metin), Türkçe karakter desteği şart, siteyle birlikte sunulan (self-hosted) dosyalar. Boyut ölçeği; mobilde metin en az 16 px.
4. **Görsel dili:** fotoğraf mı illüstrasyon mu, fotoğrafların tonu, ikon stili (tek ikon seti).
5. **Yerleşim:** yoğunluk (ferah/yoğun), ilk ekran düzeni (mobil önce), kart/bölüm yapısı, köşe yuvarlaklığı ve boşluk ölçeği.
6. **Hareket:** varsa ölçülü (giriş animasyonu, hover); otomatik dönen slayt yok; "hareketi azalt" tercihine uyulur.
7. **İmza öğesi:** bu işletmeye özel, siteyi şablondan ayıran tek bir öğe; işletmenin kendisinden türetilir (ör. pastane için el yazısı menü başlıkları, oto servis için işlem adımlarını gösteren zaman çizelgesi, kafe için günün menüsü kartı). Hafif olmalı (Aşama 9 bütçesine uymalı).
8. **Farklılaştırma kontrolü:** Son 5 Vitrinweb sitesinin reçetesiyle karşılaştır; aynı ilk ekran varyantı + aynı palet + aynı yazı tipi üçlüsü tekrar etmemeli. (Aynı sektör ve aynı şehirde iki müşteri varsa iki site birbirine benzememeli.)
9. Brief'teki stil tercihi ve "istemediklerim" ile çelişki varsa açıkça yaz ve müşteriye sorulacaklara ekle.
10. **Çıktı:** Tasarım yönü kartı (tasarım belirteçleri dahil).

## Aşama 9 — Performans ve kalite bütçesi
Her Vitrinweb sitesi için sabit hedefler; plan bunlara uymuyorsa nedenini yaz ve planı değiştir.
- **Core Web Vitals (mobil):** LCP ≤ 2,5 sn · INP ≤ 200 ms · CLS ≤ 0,1. PageSpeed Insights mobil performans puanı hedefi ≥ 90.
- **Sayfa ağırlığı:** ilk yüklemede JavaScript ≤ 100 KB (sıkıştırılmış); ilk ekran görseli ≤ 150 KB; sayfa toplamı ≤ 1 MB.
- **Görseller:** WebP (veya AVIF), ekran genişliklerine göre birden fazla boyut (`srcset`), width/height belirtilmiş, ilk ekran dışındakiler gecikmeli yüklenir (lazy), ilk ekran görseli öncelikli.
- **Yazı tipleri:** en fazla 2 aile, yalnızca kullanılan ağırlıklar, Türkçe karakterleri içeren alt küme, `font-display: swap`, siteyle birlikte sunulur (Google Fonts'a istek yok; KVKK açısından da daha iyi).
- **Üçüncü taraf:** varsayılan olarak hiç yok. Google Haritalar sayfa açılışında değil, ziyaretçi tıklayınca yüklenir (önizleme görseli + "Haritada aç"); WhatsApp için harici eklenti yok, düz bağlantı. Analitik varsayılan olarak yok (gerekirse onay şeridiyle).
- **Üretim biçimi:** sayfalar derleme anında statik üretilir; sunucu gerektiren yalnızca iletişim formu ve seçilen ek özellikler.
- **Güvenlik:** HTTPS, güvenlik başlıkları (CSP, HSTS, X-Content-Type-Options, Referrer-Policy), formda bot tuzağı ve hız sınırı, kaynak kodda sır/anahtar yok.
- **Erişilebilirlik:** anlamlı başlık sırası, odak görünür, klavyeyle gezilebilir, buton/bağlantı dokunma alanı ≥ 44 px, form alanlarının etiketleri var.
- **Çıktı:** Bütçe tablosu + bu sitede bütçeyi zorlayabilecek öğeler (ör. büyük galeri, video) ve çözümü.

## Aşama 10 — Vitrinweb zorunlu ekleri
Aşağıdakilerin her biri plana eklenir; eksik bırakılırsa nedeni yazılır.
- [ ] 5 sayfa, mobil uyumlu; 2 revizyon turuna uygun esnek yapı
- [ ] WhatsApp butonu (brief'teki WhatsApp numarası veya telefon) ve tıkla-ara
- [ ] Google Haritalar (tıklayınca yüklenen; adres gizliyse hizmet bölgesi metni, harita yok)
- [ ] Basit iletişim formu (ad, telefon, mesaj) + KVKK aydınlatma bağlantısı; mesajlar brief'teki e-postaya; bot tuzağı
- [ ] Google yorumları — **yalnızca `showReviews` işaretliyse:** müşterinin onayladığı yorumlar, metin aynen, yıldız + tarih + "Ad S." biçiminde yazar, "Google yorumları" etiketi, işletmenin Google'daki tüm yorumlarına bağlantı
- [ ] SEO altyapısı: sayfa başına özel title/meta, tek H1, site haritası, robots.txt, canonical, LocalBusiness + WebSite yapısal verisi, Open Graph görseli, favicon
- [ ] Görseller WebP, boyutları (width/height) belirtilmiş, anlamlı alt metinler
- [ ] Yasal sayfalar: KVKK aydınlatma metni (yasal unvanla), çerez metni (çerez kullanılıyorsa); alt bilgide yasal unvan
- [ ] 404 sayfası
- [ ] Ana eylem butonu ilk ekranda, sayfa sonlarında ve mobilde sabit çubukta
- [ ] Logo yoksa marka adıyla yazı logosu; fotoğraf yoksa kullanım hakkı uygun görseller
- [ ] Mevcut site varsa: eski adres → yeni sayfa yönlendirme tablosu (SEO denetimi C08)
- [ ] Mevcut alan adında e-posta varsa: DNS değişikliğinde e-posta (MX) kayıtları korunacak notu
- [ ] Seçilen ek özelliklerin brief'teki bilgilere göre planı
- [ ] Aşama 9 performans ve kalite bütçesi

## Aşama 11 — Kontroller
1. **Tutarlılık:** Her öneri brief'le çelişmiyor mu? (ad, telefon, saatler, ana eylem, stil, istenmeyenler)
2. **Kapsam:** Plan 5 sayfayı ve seçilen ek özellikleri aşıyor mu? Aşıyorsa "Ek satış önerisi"ne taşındı mı?
3. **Yasal/etik:** sektör kısıtlarına uyuluyor mu, garanti/abartı ifadesi var mı, uydurma bilgi var mı, fotoğraftaki kişiler için izin işaretli mi (`consents.peoplePhotos`)?
4. **SEO:** her sayfanın title/meta/H1'i benzersiz mi, anahtar ifadeler doğal mı?
5. **Performans:** plan Aşama 9 bütçesine uyuyor mu?
6. **Erişilebilirlik:** kontrast, yazı boyutu, dokunma alanı, alt metin planı.
7. **Özgünlük:** imza öğesi var mı, farklılaştırma kontrolü geçti mi?
8. **5 iş günü:** plan 5 iş gününe sığıyor mu? Sığmıyorsa nedenini yaz (genellikle ek özellik).
9. **Çıktı:** Kontrol tablosu (madde · durum · not).

## Aşama 12 — Üretim reçetesi
Geliştirmenin doğrudan kullanacağı, makinece okunabilir özet. Bileşen kataloğu kurulana kadar varyant adları aşağıdaki taslak adlardır.

```yaml
musteri: { siparis_no: "", marka: "", sektor: "", sehir: "" }
alan_adi: ""
ana_eylem: whatsapp | ara | form | randevu | konum
belirtecler:
  renk: { ana: "#", vurgu: "#", metin: "#", zemin: "#", yuzey: "#" }
  yazi: { baslik: "", metin: "" }
  kose: kucuk | orta | buyuk
  bosluk: siki | dengeli | ferah
sayfalar:
  - yol: /
    title: ""
    description: ""
    h1: ""
    bolumler:
      - ilk-ekran: tam-gorsel | bolunmus | metin-agirlikli | kart
      - hizmetler: izgara | liste | sekmeler
      - neden-biz: ikonlu-3lu | sayilarla | zaman-cizelgesi
      - yorumlar: kart-dizisi | tek-alinti      # yalnızca showReviews
      - sss: akordeon
      - iletisim-cagrisi: bant | kart
  # /hakkimizda, /hizmetler, /galeri, /iletisim ...
imza_ogesi: ""
ek_ozellikler: []
yonlendirmeler: []          # eski adres -> yeni adres
notlar: []
```

## Aşama 13 — Öğrenme döngüsü
1. Sektör araştırmasını `claude/sektorler/<sektor>.md` dosyasına yaz veya güncelle (tarih, kaynaklar, yasal kısıtlar, anahtar ifadeler, SSS, güven unsurları). Müşteriye özel bilgi bu dosyaya girmez.
2. Üretim reçetesini müşteri klasörüne kaydet (farklılaştırma kontrolünde kullanılacak).
3. Bu analizde zaman kaybettiren ya da eksik kalan bir şey olduysa, beceriye eklenecek öneri olarak raporun sonuna yaz.

---

## Çıktı biçimi
Raporu aşağıdaki başlıklarla, tek belge olarak yaz. Kayıt yeri: claude.ai Vitrinweb projesi → `claude/musteriler/<siparis-no>-<marka>/tasarim-analizi.md` (müşteri dosyalarının nihai yeri madde 3'te kesinleşir).

1. **Özet** (5 satır: işletme, ana eylem, tasarım yönü ve imza öğesi tek cümle, ek satış önerisi var mı, eksik bilgi var mı)
2. Eksik bilgiler ve varsayımlar (Aşama 0)
3. İşletme profili (Aşama 1)
4. Sektör araştırması — kaynaklarıyla (Aşama 2)
5. Rakip analizi (Aşama 3)
6. Ziyaretçi profilleri (Aşama 4)
7. Site haritası ve sayfa bölümleri (Aşama 5)
8. Özellik listesi (Aşama 6)
9. İçerik ve SEO planı (Aşama 7)
10. Tasarım yönü (Aşama 8)
11. Performans ve kalite bütçesi (Aşama 9)
12. Vitrinweb zorunlu ekleri — işaretli liste (Aşama 10)
13. Kontrol tablosu (Aşama 11)
14. Üretim reçetesi (Aşama 12)
15. **Geliştirme görev listesi** — sırayla, Gün 1–2'ye bölünmüş
16. **Müşteriye sorulacaklar** — tek WhatsApp mesajı taslağı ("siz" hitabı, en fazla 5 soru, cevapsız kalırsa uygulanacak varsayımla birlikte)
17. Öğrenme notları (Aşama 13)
18. Kaynaklar

## Yayın öncesi (bu becerinin dışında, hatırlatma)
Site bittiğinde: `seo-denetim` becerisi + PageSpeed Insights mobil ölçümü + Müşteri Süreci 2.10 yayın kontrol listesi. Aşama 9 hedefleri tutmuyorsa yayına alınmaz.

## claude.ai'de kullanım (Claude Code dışında)
Bu dosyanın "Vitrinweb Web Sitesi Tasarım Analizi" başlığından sonraki kısmını sohbete yapıştır, altına müşterinin brief'ini (içerik formu kaydı veya metin) ekle ve "Aşama 0'dan başla" yaz. Web araması açık olmalı.
