---
yayin: 2027-02-03
title: Fatura, irsaliye ve formlardan elle veri girişi nasıl azaltılır?
seoTitle: Elle Veri Girişini Azaltma: Fatura, İrsaliye ve Form Rehberi
description: Fatura, irsaliye ve formlardaki bilgileri her gün elle mi giriyorsunuz? Belge envanteri, alan listesi, doğrulama kuralları ve onay adımıyla başlayın.
category: Operasyon
coverAlt: Bir belgeden okunan alanların ok ile düzenli bir kayıt formuna aktarılması
related: stok-tablosunu-duzenlerken-nereden-baslamali, kucuk-isletmeler-icin-ucretsiz-dijital-araclar
urun: belge-okuma
kapanis: Ekibinizin en sık elle işlediği belge türünü paylaşın; hangi alanların hızlanabileceğini birlikte inceleyelim.
---

Belgelerden elle veri girişini azaltmanın ilk adımı bir yazılım seçmek değil, hangi belgeden hangi bilginin nereye gittiğini netleştirmektir. Çoğu işletmede elle girilen alanların sayısı, gerçekten ihtiyaç duyulandan fazladır; bazı belgeler ise zaten dijital ve okunmaya hiç gerek yoktur. Bu yazıda fatura, irsaliye ve başvuru formları gibi tekrar eden belgeler için adım adım bir yol haritası çıkarıyoruz.

> [!ozet]
> - Önce belge envanteri çıkarın: hangi belge, ayda kaç adet, hangi alanlar, nereye aktarılıyor?
> - e-Fatura ve e-Arşiv faturalar zaten yapılandırılmış veri taşır; bunları okumak yerine dijital olarak almak daha doğrudur.
> - Kâğıt, PDF ve fotoğraf belgeler için alan listesini küçültün ve doğrulama kuralları yazın.
> - Otomatik okunan her alan, kayda geçmeden önce bir insan onayından geçmeli.
> - Belgelerdeki kişisel verileri yalnızca gerektiği kadar aktarın.

## 1. Belge envanterini çıkarın

Bir hafta boyunca ekibinizin elle işlediği her belgeyi kaydedin. Basit bir tablo yeterlidir:

| Belge türü | Aylık adet | Geliş biçimi | Aktarılan alanlar | Hedef |
| --- | --- | --- | --- | --- |
| Tedarikçi irsaliyesi | 120 | Kâğıt | Tarih, ürün kodu, miktar | Stok tablosu |
| Gelen fatura | 80 | e-Fatura + PDF | Belge no, tarih, tutar, KDV | Ön muhasebe |
| Başvuru formu | 40 | Fotoğraf (WhatsApp) | Ad, telefon, seçilen hizmet | Müşteri listesi |

Tablodaki satırlar örnektir; kendi belgelerinizle doldurun.

Envanter iki şeyi hemen gösterir: Hangi belgenin en çok zamanı aldığı ve hangi belgenin aslında zaten dijital olduğu. İşe en çok adet gelen ve en çok hata çıkan belge türüyle başlayın.

## 2. Zaten dijital olan belgeleri ayırın

e-Fatura, Gelir İdaresi Başkanlığı'nın belirlediği UBL-TR adlı XML tabanlı standartta düzenlenir ve kâğıt faturayla aynı hukuki niteliğe sahiptir. Yani bu faturaların içindeki tarih, tutar, vergi ve kalem bilgileri zaten makinenin okuyabileceği alanlar hâlinde gelir.

Bu nedenle e-Fatura ve e-Arşiv faturaları PDF görüntüsünden okumaya çalışmak yerine, kullandığınız e-belge portalından ya da entegratörden XML olarak almak ve doğrudan aktarmak çoğu zaman daha doğru ve daha hızlıdır. Okuma ihtiyacı asıl olarak kâğıt irsaliyeler, taranmış belgeler, fotoğrafla gelen formlar ve standart dışı PDF'ler için ortaya çıkar.

## 3. Alan listesini küçültün

Her belgeden "her şeyi" almak yerine, gerçekten kullandığınız alanları seçin. Bir irsaliyeden stok girişi için çoğu zaman tarih, tedarikçi, ürün kodu ve miktar yeterlidir; adres ve araç plakası gibi alanlar arşivde durabilir.

Alan sayısı azaldıkça hem kontrol süresi kısalır hem de hata ihtimali düşer. Ürün kodlarının tutarlı olması burada kritik önemdedir: Belgedeki kod, sizin stok listenizdeki kodla eşleşmiyorsa hiçbir okuma yöntemi doğru kaydı bulamaz. Kod düzeninin nasıl kurulacağını [stok tablosu rehberimizde](/blog/stok-tablosunu-duzenlerken-nereden-baslamali) anlattık.

[[cta]]

## 4. Doğrulama kurallarını yazın

Elle girişte de otomatik okumada da hatayı yakalayan şey kurallardır. Her belge türü için birkaç basit kural belirleyin:

- **Toplam kontrolü:** Kalemlerin toplamı belgedeki genel toplamla aynı mı?
- **Tarih kontrolü:** Belge tarihi makul bir aralıkta mı (gelecek tarihli ya da çok eski değil)?
- **Kod kontrolü:** Ürün kodu stok listenizde var mı?
- **Mükerrer kontrolü:** Aynı belge numarası daha önce kaydedilmiş mi?

Bu kurallara uymayan kayıtlar otomatik olarak işaretlenmeli ve onay adımında öncelikle incelenmelidir.

## 5. Onay adımını kaldırmayın

Belgeden okunan bilgi, kayda geçmeden önce bir kişi tarafından kaynak belgeyle karşılaştırılmalıdır. Amaç her alanı yeniden yazmak değil, yalnızca işaretlenen ya da şüpheli alanlara bakmaktır. Bu adım, elle girişe göre çok daha kısa sürer ve muhasebe ya da stok kayıtlarına hatalı verinin girmesini önler.

Özellikle tutar, vergi ve miktar gibi sonucu doğrudan etkileyen alanlarda onay adımını hiçbir zaman atlamayın.

## 6. Fotoğrafla gelen belgeler için kural koyun

Belgeler telefonla çekilip gönderiliyorsa, birkaç basit kural okuma kalitesini belirgin biçimde artırır:

1. Belge düz bir zemine konsun, katlanmış ya da buruşuk olmasın.
2. Dört köşesi de kadrajda görünsün.
3. Gölge ve parlama olmasın; flaş yerine gün ışığı tercih edilsin.
4. Birden fazla sayfa varsa her sayfa ayrı çekilsin.

Bu kuralları belge gönderen tedarikçilere ve ekibinize kısa bir mesajla iletmek, sonradan yapılacak düzeltmeleri azaltır.

## 7. Kişisel verileri sınırlı tutun

Başvuru formları ve bazı faturalar ad, telefon, adres gibi kişisel veriler içerir. 6698 sayılı Kişisel Verilerin Korunması Kanunu, kişisel verilerin işlendikleri amaçla bağlantılı, sınırlı ve ölçülü olmasını ister. Belgeden yalnızca işinize yarayan alanları aktarın, belgelerin nerede ve ne kadar süre saklanacağını belirleyin ve erişimi gerçekten ihtiyaç duyan kişilerle sınırlayın.

> [!vitrin] Belge Okuma ile
> Belge Okuma'yı bu adımlara göre kurguladık. Kurulumu sizin örnek belgelerinizle yapıyor; okunacak alanları, onay kuralını ve verinin aktarılacağı tabloyu ya da sistemi birlikte belirliyoruz. Okunan alanlar önce bir taslakta görünür; işaretlenen alanlar kaynak belgeyle karşılaştırılıp onaylandıktan sonra kayda hazır hâle gelir. Muhasebe ya da stok kaydının doğrudan açılması, seçilen entegrasyon yapısına ve ekibinizin onay kuralına göre planlanır. Bir irsaliyeden ürün kodu ve adet alanlarının nasıl okunduğunu [örnek belgede görebilirsiniz](/urunler/belge-okuma).

## Sık sorulan sorular

### Telefonla çekilmiş belge fotoğrafları okunabilir mi?

Fotoğraf net, belge düz ve eksiksiz kadrajlanmışsa çoğu zaman okunabilir. Bulanık, gölgeli ya da kesik fotoğraflarda hata oranı artar; bu yüzden fotoğraf kurallarını baştan belirlemek önemlidir.

### e-Faturalarımı da okumam gerekiyor mu?

Genellikle hayır. e-Faturalar UBL-TR standardında yapılandırılmış veri olarak düzenlenir; bu veriyi e-belge portalınızdan ya da entegratörünüzden almak, PDF görüntüsünü okumaktan daha güvenilirdir.

### Otomatik okuma tamamen hatasız olur mu?

Hayır. Belge kalitesi, el yazısı ve standart dışı düzenler hataya yol açabilir. Bu yüzden doğrulama kuralları ve onay adımı sistemin parçası olmalıdır.

### Küçük bir işletme için de değer mi?

Belge sayısı azsa düzenli bir elle giriş yeterli olabilir. Aynı türden belgeyi her gün işliyorsanız ya da elle girişten kaynaklanan hatalar stok veya muhasebe farklarına yol açıyorsa, okuma ve onay düzeni kısa sürede kendini gösterir. Önce ücretsiz araçlarla neler yapılabileceğine [küçük işletmeler için dijital araçlar yazımızda](/blog/kucuk-isletmeler-icin-ucretsiz-dijital-araclar) göz atabilirsiniz.

## Sonuç

Elle veri girişini azaltmak, belgelerinizi tanımakla başlar. Envanter çıkarın, zaten dijital olan e-faturaları ayırın, alan listesini küçültün, doğrulama kurallarını yazın ve onay adımını koruyun. Bu düzen kurulduğunda okuma yöntemi ne olursa olsun daha az zaman harcar, daha az hata yaparsınız.

## Kaynaklar

1. [e-Fatura Nedir — TÜRMOB](https://turmob.org.tr/e-donusum/efatura/nedir)
2. [Kanun Kapsamındaki Hak ve Yükümlülükler — Kişisel Verileri Koruma Kurumu](https://www.kvkk.gov.tr/Icerik/4192/Kanun-Kapsamindaki-Hak-ve-Yukumlulukler)
