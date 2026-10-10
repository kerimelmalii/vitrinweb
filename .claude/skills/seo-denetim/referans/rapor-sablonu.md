# Rapor şablonları

İki şablon var:
- **A. İç rapor** — Vitrinweb ekibi için (aylık otomatik denetim ve elle denetim). Teknik dil serbest.
- **B. Müşteri raporu** — işletme sahibi için. İki kullanımı var: **B1 teslim** (Vitrinweb'in kurduğu site; madde 2.8 "SEO özeti" teslim belgesinin SEO bölümü olarak kullanılır) ve **B2 ön analiz** (müşteri adayının mevcut sitesi; "Ücretsiz Site Analizi").

Her iki şablonda ortak kurallar (`google-kurallari.md` 8. bölüm):
- Puan, not, "SEO skoru" yok. Google bu tür puanları kullanmaz; puan vermek yanıltıcı olur.
- Sıralama, trafik ya da satış garantisi yok; "ilk sayfaya çıkar" yok.
- Her bulgu ya bir Google kaynağına bağlanır ya da "iyi uygulama" diye etiketlenir.
- Bilerek yapılmış durumlar (sipariş, form, teşekkür sayfalarında noindex) hata sayılmaz, "beklenen" yazılır.
- "Google onaylı denetim" gibi ifade kullanılmaz.

Kayıt yeri: claude.ai Vitrinweb projesi, `claude/seo-raporlari/YYYY-AA-<site>.md` (müşteri raporu için `YYYY-AA-<site>-musteri.md`). Otomatik betik çıktısı raporun ekine konur, raporun yerine geçmez.

---

## A. İç rapor

```markdown
# SEO denetimi — <site> — <Ay YYYY>

**Tarih:** YYYY-AA-GG · **Tür:** Aylık otomatik / Elle / Teslim öncesi
**Denetlenen:** <N> sayfa (dizine eklenebilir: <N>) · Kritik <n> · Önemli <n> · İyileştirme <n> · Bilgi <n>
**Önceki rapor:** <dosya adı> → değişim: Kritik <±n>, Önemli <±n>, İyileştirme <±n>

## Özet
<2–3 cümle: genel durum, önceki aya göre ne değişti.>

## Bu ay yapılacak en önemli 3 iş
1. <iş> — <bulgu kodu> — <neden önemli, bir cümle> — tahmini süre
2. …
3. …

## Bulgular

### Kritik
| Kod | Sayfa | Bulgu | Dayanak | Nasıl düzeltilir |
|---|---|---|---|---|

### Önemli
(aynı tablo)

### İyileştirme
(aynı tablo; aynı türden çok sayıda bulgu tek satırda toplanabilir)

### Beklenen / bilgi
| Kod | Sayfa | Durum | Neden beklenen |
|---|---|---|---|

## Canlı kontroller
| Kod | Kontrol | Sonuç | Not |
|---|---|---|---|
| C01 | http → https, www'siz → www (tek adım, kalıcı) | Geçti / Kaldı / Bakılmadı | |
| C02 | Canlı robots.txt ve sitemap.xml 200 | | |
| C03 | Search Console (Sayfalar, site haritası, CWV, el ile işlem, güvenlik) | | Bağlayıcı yoksa: "Kullanıcıdan bakması istendi" |
| C04 | PageSpeed mobil (LCP / INP / CLS) | | |
| C07 | Olmayan adres 404 dönüyor | | |

## Google tarafında değişenler
<`guncelleme-gunlugu.md`'ye bu ay eklenen Yüksek/Orta kayıtlar. Yoksa "Bizi etkileyen değişiklik yok (son kayıt: <tarih>)".>

## Önceki ayın açık işleri
| Bulgu | İlk görüldüğü rapor | Durum |
|---|---|---|

## Ek: otomatik denetim çıktısı
<denetle.mjs --md çıktısı olduğu gibi>
```

---

## B. Müşteri raporu

Okuyucu işletme sahibi. Her teknik terim ilk geçtiği yerde bir cümleyle açıklanır. Kısa tutulur: bulgu tablosu yerine en fazla 6–8 madde. Yazım: SEO Makale Standardı dili (sade, kısa cümle, abartısız).

### B1. Teslim — "Sitenizin arama motoru özeti"

```markdown
# <İşletme adı> web sitesi — arama motoru özeti

**Site:** <adres> · **Teslim tarihi:** GG Ay YYYY · **Hazırlayan:** Vitrinweb

## Kısaca
Siteniz Google'ın sayfaları bulup okuyabilmesi için gereken temel ayarlarla teslim edildi. Aşağıda neyin hazır olduğu, sizden ne beklendiği ve ne zaman sonuç görmeyi bekleyebileceğiniz var.

## Hazır olanlar
- **Her sayfanın kendi başlığı ve açıklaması var.** Bunlar Google sonuçlarında sitenizin adının altında görünen metinlerdir.
- **Site haritası ve robots.txt hazır.** Site haritası, Google'a sitenizdeki sayfaların listesini veren dosyadır.
- **Telefonda düzgün görünüyor.** Google sitenizi önce telefon görünümüne göre değerlendirir.
- **İşletme bilgileriniz yapısal veriyle işaretlendi.** Bu, adınızı, logonuzu ve iletişim bilgilerinizi Google'ın daha kolay anlamasını sağlayan görünmez bir etikettir.
- **Hız:** Telefonda ölçülen değerler: yüklenme <x,x> sn (hedef 2,5 sn'den az), tepki <x> ms (hedef 200 ms'den az), kayma <x,xx> (hedef 0,1'den az).
- <Eski siteden geçiş varsa:> **Eski adresleriniz yeni sayfalara yönlendirildi.** Eski bağlantılarınızı kullanan ziyaretçiler doğru sayfaya ulaşır. Bu yönlendirmeler en az bir yıl açık kalmalıdır (eşleme tablosu ekte).

## Sizden beklenenler
1. **Google Search Console** erişimini kabul edin. Bu, Google'ın sitenizle ilgili bildirimleri gönderdiği ücretsiz paneldir. <Vitrinweb kuracak / sizin hesabınızla kurulacak.>
2. **Google İşletme Profili**'nizdeki ad, adres, telefon ve çalışma saatlerinin sitedekiyle aynı olduğundan emin olun.
3. Ürün, fiyat ya da hizmet değiştiğinde siteyi güncel tutun (bize iletin).

## Ne zaman, ne beklemeli
- Google'ın yeni siteyi taraması ve dizine eklemesi genellikle birkaç gün ile birkaç hafta sürer. <Site taşıma varsa:> Taşıma sonrası sıralamalar birkaç hafta dalgalanabilir; bu normaldir.
- Kimse Google'da belirli bir sırayı garanti edemez. Google bunu kendi rehberinde açıkça yazar. Biz sıralama vaat etmeyiz; sitenin Google kurallarına uygun ve ziyaretçi için faydalı olmasını sağlarız.

## İlk yıl bizim takip ettiklerimiz
<Yıllık servis kapsamıyla uyumlu: aylık denetim, sorun çıkarsa bildirim.>

---
Bu özet, teslim tarihinde Google Search Central belgelerine göre yapılan denetime dayanır.
```

### B2. Ön analiz — "Ücretsiz Site Analizi" (müşteri adayının mevcut sitesi)

Vitrinweb eski siteleri onarmaz. Bu rapor mevcut siteyi küçümsemeden durumu anlatır ve **yeni sitenin bu konuları baştan nasıl çözdüğüyle** biter. "Sitenizi düzeltelim" denmez.

```markdown
# <İşletme adı> — mevcut web sitesi analizi

**İncelenen site:** <adres> · **Tarih:** GG Ay YYYY · **Hazırlayan:** Vitrinweb

## Kısaca
<2–3 cümle, olumlu bir tespitle başlar. Ör. "Sitenizde iletişim bilgileri ve hizmet listesi açıkça yer alıyor. Google'ın siteyi anlamasını ve ziyaretçinin size ulaşmasını zorlaştıran birkaç konu var.">

## Öne çıkan konular
<En fazla 5 madde, önem sırasıyla. Her madde: ne gördük → neden önemli (bir cümle, Google kaynağına dayalı) .>
1. **<Başlık>** — <ne gördük>. <neden önemli>.
2. …

## Telefonda hız
<PageSpeed mobil sonuçları, hedeflerle birlikte. Gerçek kullanıcı verisi yoksa "Google'ın gerçek kullanıcı verisi bu site için yeterli değil; laboratuvar ölçümü:" diye yazılır.>

## Yeni bir Vitrinweb sitesi bunları nasıl çözer
| Konu | Yeni sitede |
|---|---|
| <konu 1> | <baştan nasıl kurulduğu> |
| … | … |
<Eski adresler varsa:> Mevcut sitenizin adresleri yeni sayfalara kalıcı olarak yönlendirilir; Google'daki geçmişiniz korunur.

## Not
Bu analiz, <tarih> tarihinde sitenin herkese açık sayfalarına bakılarak yapıldı. Google Search Console verisi olmadan yapıldığı için sitenin Google'daki gerçek performansını göstermez. Kimse Google'da belirli bir sırayı garanti edemez.

[Bilgi Al — WhatsApp]
```
