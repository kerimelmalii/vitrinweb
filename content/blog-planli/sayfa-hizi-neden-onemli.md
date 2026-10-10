---
yayin: 2026-10-28
title: Sayfa hızı neden önemli? Yavaş bir sitenin işletmenize maliyeti
seoTitle: Sayfa Hızı Neden Önemli? Core Web Vitals Rehberi
description: Yavaş açılan bir site müşteri kaybettirir mi? Core Web Vitals ölçütlerini, hızın satışa etkisini gösteren araştırmaları ve sitenizi hızlandırmanın yollarını anlatıyoruz.
date: 2026-09-26
category: SEO ve Teknik
coverAlt: Yüklenen bir web sitesi penceresinin önünde yüksek hızı gösteren hız göstergesi
related: kucuk-isletmeler-icin-temel-seo, web-sitem-neden-musteri-getirmiyor, web-sitesi-tasariminda-sik-yapilan-hatalar
---

Sayfa hızı önemlidir, çünkü ziyaretçi beklemez: Yavaş açılan, açılırken içeriği kayan ya da dokunuşlara geç cevap veren bir site, müşteriyi daha karar vermeden kaybettirir. Google, iyi bir kullanıcı deneyimini ölçmek için üç ölçüt tanımlıyor (Core Web Vitals) ve bu ölçütlerde iyi sonuç alınmasını Arama'da başarı için şiddetle öneriyor. Büyük markalarda yapılan kontrollü testler de hızdaki iyileşmenin satış ve başvurularda ölçülebilir artış getirdiğini gösteriyor.

> [!ozet]
> - Google'ın üç hız ve deneyim ölçütü: yükleme (LCP 2,5 saniye veya altı), tepki verme (INP 200 milisaniye veya altı) ve görsel kararlılık (CLS 0,1 veya altı).
> - Vodafone'un kontrollü testinde, ana içeriğin yüklenme süresindeki yüzde 31'lik iyileşme satışlarda yüzde 8 artış getirdi.
> - Hızı PageSpeed Insights ve Google Search Console ile ücretsiz ölçebilirsiniz.
> - En sık neden büyük görseller ve gereksiz eklentilerdir; ikisi de kolayca düzeltilebilir.

## Google hızı nasıl ölçer? Core Web Vitals

Google, bir sayfanın kullanıcıya nasıl bir deneyim sunduğunu üç ölçütle değerlendiriyor:

| Ölçüt | Neyi ölçer? | İyi sayılan değer |
|---|---|---|
| **LCP** (Largest Contentful Paint) | Sayfadaki en büyük içeriğin (genellikle ana görsel ya da başlık) ekranda görünme süresi | 2,5 saniye veya daha kısa |
| **INP** (Interaction to Next Paint) | Bir butona dokunduğunuzda ya da menüyü açtığınızda sayfanın tepki verme süresi | 200 milisaniye veya daha kısa |
| **CLS** (Cumulative Layout Shift) | Sayfa yüklenirken içeriğin beklenmedik şekilde kayması | 0,1 veya daha düşük |

Bu değerler tek bir ziyarete göre değil, gerçek kullanıcıların sayfa yüklemelerinin yüzde 75'inde karşılanacak şekilde değerlendirilir; mobil ve masaüstü ayrı ayrı ölçülür. Yani sitenizin sizin hızlı internetinizde değil, müşterinizin telefonunda nasıl açıldığı önemlidir.

## Hız Google sıralamasını etkiler mi?

Google, Core Web Vitals'ta iyi sonuç alınmasını Arama'da başarı için şiddetle öneriyor ve bu ölçütlerin, iyi bir sayfa deneyimini ödüllendirme hedefiyle uyumlu olduğunu belirtiyor. Ama hız tek başına bir sıralama garantisi değildir. Çok hızlı ama aranan soruya cevap vermeyen bir sayfa, biraz daha yavaş ama faydalı bir sayfanın önüne geçemez. Hızı, içerik ve güvenle birlikte iyi bir deneyimin bir parçası olarak düşünmek gerekir. Google'da görünmenin diğer temellerini [küçük işletmeler için temel SEO](/blog/kucuk-isletmeler-icin-temel-seo) yazımızda anlattık.

Asıl önemli etki ise sıralamadan önce gelir: Siteye gelen ziyaretçinin kalıp kalmaması.

## Hız satışlara gerçekten etki ediyor mu?

Hızın etkisini en güvenilir şekilde, diğer her şeyin aynı tutulduğu kontrollü testler gösterir. İki örnek:

- **Vodafone:** Ücretli reklamlardan gelen trafiği, yalnızca hız iyileştirmeleri yapılmış ve yapılmamış iki aynı sayfaya eşit böldü. Ana içeriğin yüklenme süresi (LCP) yüzde 31 iyileşen sayfada toplam satışlar yüzde 8, ziyaret başına potansiyel müşteri oranı yüzde 15 arttı.
- **Deloitte ve 55 araştırması (Google'ın siparişi):** 37 marka sitesinde 30 milyonu aşkın oturum incelendi. Mobil site hızındaki 0,1 saniyelik iyileşmenin perakende sitelerinde dönüşüm oranında yüzde 8,4 artışla birlikte görüldüğü raporlandı.

Bu rakamlar büyük markalara ait ve her işletmede aynı sonucu vermez. Ama yön açık: Ziyaretçi ne kadar az beklerse, o kadar çok kişi sayfanızı okumaya, aramaya ya da mesaj atmaya devam ediyor.

## Sitenizin hızını nasıl ölçersiniz?

İki ücretsiz araç yeterlidir:

1. **PageSpeed Insights (pagespeed.web.dev):** Sitenizin adresini yazın. Rapor iki kısımdan oluşur: Gerçek kullanıcı verisi (sitenizin yeterli trafiği varsa) ve laboratuvar testi. Laboratuvar puanı her ölçümde biraz değişebilir; gerçek kullanıcı verisi daha belirleyicidir.
2. **Google Search Console, Core Web Vitals raporu:** Sitenizin hangi sayfalarının "iyi", "iyileştirme gerekli" ya da "zayıf" olduğunu gerçek kullanıcı verisine göre gruplar.

Ölçümü mutlaka **mobil** için yapın ve sitenin en çok ziyaret edilen sayfalarından başlayın: genellikle ana sayfa, hizmetler ve iletişim.

## Bir siteyi yavaşlatan en yaygın nedenler

- **Büyük ve sıkıştırılmamış görseller:** Telefonla çekilmiş birkaç megabaytlık bir fotoğrafı olduğu gibi siteye koymak, hız sorunlarının en sık nedenidir. Görseller ekranda göründükleri boyuta küçültülmeli ve WebP ya da AVIF gibi modern biçimlerde sunulmalıdır.
- **Gereksiz eklentiler ve üçüncü taraf kodları:** Her sohbet balonu, sayaç, sosyal medya akışı ya da reklam kodu sayfaya yük bindirir. Kullanmadığınız her eklentiyi kaldırın. Hızı bozan diğer tasarım alışkanlıklarını [web sitesi tasarımında sık yapılan hatalar](/blog/web-sitesi-tasariminda-sik-yapilan-hatalar) yazımızda bulabilirsiniz.
- **Yazı tipleri:** Çok sayıda yazı tipi ağırlığı ya da başka sunuculardan yüklenen yazı tipleri ilk görünümü geciktirebilir.
- **Yerleşim kaymaları:** Boyutu belirtilmemiş görseller ya da sayfa açıldıktan sonra beliren duyuru şeritleri içeriği aşağı iter; ziyaretçi yanlış yere dokunur. Bu, CLS değerini bozar.
- **Zayıf barındırma:** Çok ucuz ve kalabalık sunucular, sayfanın daha ilk baytını geç gönderir.
- **Ana görselin geç yüklenmesi:** Sayfanın en üstündeki ana görsel "sonradan yükle" (lazy load) olarak ayarlanırsa, LCP gereksiz yere uzar.

> [!vitrin] Bu sitede hız için yaptıklarımız
> Okuduğunuz sayfa da dahil Vitrinweb'in kendi sitesinde şu kuralları uyguluyoruz: Yazı tipini başka bir sunucudan değil kendi sunucumuzdan yüklüyoruz, böylece ziyaretçinin tarayıcısı üçüncü bir taraf beklemiyor. Görseller ekran boyutuna göre otomatik küçültülüp WebP olarak sunuluyor; bu blogdaki her kapak görselinin dosya boyutu yaklaşık 10 KB. Görsellerin boyutları önceden belirli, bu yüzden sayfa yüklenirken içerik kaymıyor. Ziyaretçi istatistiği betiği de yalnızca çerez onayı verildikten sonra yükleniyor. Müşterilerimiz için kurduğumuz sitelerde de aynı yaklaşımla çalışıyoruz; paketin içeriğini [ücretlendirme sayfamızda](/ucretlendirme) görebilirsiniz.

[[cta]]

## Fotoğrafları siteye yüklemeden önce hazırlayın

Küçük işletme sitelerinde hız sorunlarının en büyük kaynağı fotoğraflardır. Telefonla çekilen bir fotoğraf çoğu zaman birkaç megabayttır ve sitede gösterileceği boyuttan kat kat büyüktür. Fotoğraflarınızı siteye eklemeden önce şu dört adımı uygulayın:

1. **Boyutu küçültün.** Sitede en fazla tam ekran genişliğinde görünecek bir fotoğrafın kenarı genellikle 1.600-2.000 pikseli aşmamalıdır. Küçük kartlarda görünecek görseller için daha da küçüğü yeterlidir.
2. **Sıkıştırın.** Ücretsiz görsel sıkıştırma araçlarıyla, gözle görülür bir kalite kaybı olmadan dosya boyutunu ciddi ölçüde düşürebilirsiniz.
3. **Modern biçim kullanın.** Mümkünse WebP ya da AVIF biçimini tercih edin; bu biçimler aynı görüntüyü JPEG'den daha küçük dosyayla sunar. Pek çok altyapı bunu otomatik yapar.
4. **Açıklayıcı ad ve alt metin verin.** IMG_2034.jpg yerine "kahvalti-tabagi.webp" gibi bir ad ve görselde ne olduğunu anlatan bir alt metin hem erişilebilirliğe hem de Google'ın görseli anlamasına yardım eder.

Siteniz bir firma tarafından yönetiliyorsa, bu işlemlerin yeni yüklenen görsellerde otomatik yapılıp yapılmadığını sorun. Otomatik değilse, fotoğrafları göndermeden önce kendiniz küçültmeniz bile fark yaratır.

## İşletme sahibi için hız kontrol listesi

1. Sitenizi kendi telefonunuzda, mobil veriyle açın. Ana içerik birkaç saniye içinde görünüyor mu?
2. PageSpeed Insights'ta mobil sonuca bakın ve en kötü ölçütü not edin.
3. Sitenize yüklediğiniz fotoğrafların boyutunu kontrol edin; birkaç megabaytlık görseller varsa küçültün.
4. Kullanmadığınız eklentileri, sohbet araçlarını ve sosyal medya akışlarını kaldırın.
5. Sayfa açılırken içerik kayıyor mu? Kayıyorsa nedenini (genellikle görsel ya da şerit) bulun.
6. Search Console'daki Core Web Vitals raporunu ayda bir kontrol edin.
7. Siteye yeni bir özellik eklediğinizde hızı yeniden ölçün.

## Sık sorulan sorular

### PageSpeed puanım düşük, Google'da düşer miyim?

Puan tek başına sıralamanızı belirlemez; Google için içeriğin faydası ve aranan soruya uygunluğu daha belirleyicidir. Ama düşük puan genellikle ziyaretçinin beklediği ve bir kısmının sayfayı terk ettiği anlamına gelir. Puandan çok, gerçek kullanıcı verisindeki LCP, INP ve CLS değerlerine odaklanın.

### Mobil puanım neden masaüstünden düşük?

PageSpeed Insights mobil testi, ortalama bir telefonu ve daha yavaş bir bağlantıyı taklit eder. Telefonların işlemcisi ve bağlantısı bilgisayarlardan daha zayıf olduğu için mobil puanlar genellikle daha düşüktür. Müşterilerinizin çoğu telefondan geldiği için mobil sonuca öncelik verin.

### Hız için sitemi baştan mı yaptırmalıyım?

Her zaman gerekmez. Görselleri küçültmek, gereksiz eklentileri kaldırmak ve ana görselin yükleme ayarını düzeltmek ciddi iyileşme sağlayabilir. Ama site eski bir altyapı üzerindeyse, telefonda da düzgün görünmüyorsa ya da bu adımlara rağmen yavaş kalıyorsa, yenisini kurmak genellikle daha verimlidir. Hangi durumda yenisinin gerektiğini [web sitesi neden gerekli](/blog/web-sitesi-olmayan-isletme-ne-kaybeder) yazımızda ayrıca anlattık.

### Hızı ne sıklıkla ölçmeliyim?

Ayda bir kontrol ve siteye büyük bir değişiklik (yeni sayfa, yeni eklenti, yeni görseller) yaptıktan sonra ek bir ölçüm yeterlidir.

## Sonuç

Sayfa hızı, ziyaretçinin sitenizle ilk karşılaşmasını belirler. Google'ın Core Web Vitals ölçütlerinde iyi sonuç almak hem kullanıcı deneyimini hem de arama görünürlüğünü destekler; kontrollü testler de hızın satışa yansıdığını gösteriyor. İyi haber şu ki küçük bir işletme sitesinde hız sorunlarının çoğu, görselleri doğru hazırlamak ve gereksiz yükleri kaldırmak gibi basit adımlarla çözülür. Hız dahil, sitenizin neden beklediğiniz sonucu vermediğini adım adım incelemek isterseniz [web sitem neden müşteri getirmiyor](/blog/web-sitem-neden-musteri-getirmiyor) yazımıza göz atın.

## Kaynaklar

1. [Web Vitals — web.dev](https://web.dev/articles/vitals)
2. [Core Web Vitals ve Google Arama sonuçları — Google Search Central](https://developers.google.com/search/docs/appearance/core-web-vitals?hl=tr)
3. [Vodafone: A 31% improvement in LCP increased sales by 8% — web.dev](https://web.dev/case-studies/vodafone)
4. [Milliseconds make millions — web.dev](https://web.dev/case-studies/milliseconds-make-millions)
5. [SEO başlangıç kılavuzu — Google Search Central](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=tr)
