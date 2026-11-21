---
title: Stok tablonuzu düzenlerken nereden başlamalı?
seoTitle: Excel Stok Tablosu Nasıl Düzenlenir? | Vitrinweb
description: Ürün kodu, ölçü birimi, güncel stok ve kritik seviye yapısını kurarak hatasız stok takibine geçin.
date: 2026-11-21
category: Stok ve Operasyon
coverAlt: Ürün kodu, adet ve kritik seviye sütunları olan düzenli bir stok tablosu ve barkod okutan telefon
related: kucuk-isletmeler-icin-ucretsiz-dijital-araclar
urun: depo-takibi
kapanis: Mevcut Excel tablonuzdan mobil barkodlu stok takibine geçiş adımlarını inceleyin.
---

Sağlıklı stok yönetimi, aynı ürünün ekipteki herkes tarafından tek bir isim ve kodla tanımlanmasıyla başlar. Bir ürünün tabloda iki farklı adla yer alması, giriş ve çıkışların farklı satırlara bölünmesine ve sayım açıklarına yol açar.

Bu yazıda, stoklarını Excel'de veya defterde tutan bir işletmenin tablosunu adım adım nasıl düzene sokabileceğini anlatıyoruz. Aynı yapı, ileride barkodlu bir sisteme geçerken de doğrudan kullanılabilir.

## Her ürüne tekil bir kod tanımlayın

Ürün adı, ürün kodu, varsa barkod ve ölçü birimi ayrı sütunlarda yer alsın. Adet ve koli bazlı hareketleri birlikte izliyorsanız birim dönüşüm kuralını açıkça belirtin.

| Ürün kodu | Ürün adı | Barkod | Birim | Koli içi adet |
| --- | --- | --- | --- | --- |
| K-104 | Kutu Ambalaj | 8690000104 | Adet | 25 |
| E-220 | Etiket Rulosu | 8690000220 | Rulo | 12 |
| B-310 | Koli Bandı | 8690000310 | Adet | 36 |

- Kodu bir kez verin ve değiştirmeyin; ürün adı değişse bile kod aynı kalsın.
- Aynı ürünün farklı renk veya boyutları için ayrı kod açın.
- Serbest metinli "açıklama" sütunlarını koda dönüştürmeye çalışmayın; kod kısa ve tutarlı olmalı.

## Mevcut stok ile hareket geçmişini ayırın

Depoda anlık kaç adet bulunduğu ile dün hangi ürünün çıktığı farklı iki veridir. Hareket günlüğünde tarih, ürün kodu, işlem yönü (giriş/çıkış) ve miktar bilgilerini düzenli tutun.

İki ayrı sayfa kullanmak işinizi kolaylaştırır: Birinci sayfada her ürün için tek satır ve güncel adet; ikinci sayfada her hareket için yeni bir satır. Güncel adet, hareketlerin toplamından hesaplanırsa elle düzeltme ihtiyacı ve hata payı azalır.

[[cta]]

## Kritik seviyeyi tedarik hızına göre belirleyin

Tedarik süresi uzun ve devir hızı yüksek ürünler için yeniden sipariş eşiğini buna göre ayarlayın. Yeni düzeni ilk olarak en sık hareket gören ürün grubunda test edin.

Basit bir başlangıç formülü: Günlük ortalama çıkış × tedarik süresi (gün) + güvenlik payı. Örneğin günde ortalama 2 adet çıkan ve 4 günde tedarik edilen bir ürün için 8 adetlik ihtiyacın üzerine 2 adet güvenlik payı eklemek, kritik seviyeyi 10 olarak belirler.

## Geçiş için kısa kontrol listesi

1. Her ürünün tekil bir kodu ve ölçü birimi var mı?
2. Güncel stok ve hareket geçmişi ayrı tutuluyor mu?
3. Her hareket satırında tarih, kod, yön ve miktar yazıyor mu?
4. Kritik seviyeler tedarik süresine göre belirlendi mi?
5. Yeni düzen önce en yoğun ürün grubunda denendi mi?

> [!vitrin] Depo Takibi ile
> Bu yapıda düzenlenmiş bir tablo, barkodlu depo takibine geçişte doğrudan aktarılabilir. Mevcut tablonuzu inceliyor, aktarılabilecek sütunları ve tamamlanması gereken alanları sizinle paylaşıyoruz. [Depo Takibini İnceleyin](/urunler/depo-takibi)
