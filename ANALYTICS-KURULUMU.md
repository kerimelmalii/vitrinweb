# Google Analytics kurulumu

Site, ziyaretçi sayısı ve hangi sayfaların ilgi gördüğü gibi istatistikleri görmen için isteğe bağlı olarak Google
Analytics 4 (GA4) kullanabilir. Bu belge, kendi GA4 hesabını oluşturup siteye bağlamanı anlatır.

Bu kurulum yapılmadan site **hiçbir analiz aracı çalıştırmaz** — ziyaretçi onay şeridi bile görünmez, çünkü onay
istenecek bir şey yok. Kurulumdan sonra bile, her ziyaretçi açıkça "Kabul Et" demeden Google Analytics çalışmaz
(bkz. aşağıda "Çerez onayı nasıl çalışıyor?").

Ücretsiz ve ~5 dakikalık bir kurulumdur.

## 1. GA4 mülkü oluştur

1. [analytics.google.com](https://analytics.google.com) adresine git, kendi Google hesabınla gir.
2. **Yönetici (Admin) → Mülk oluştur (Create property)**.
3. Mülk adı olarak **"Vitrinweb"** yaz, zaman dilimi **Türkiye**, para birimi **TRY** seç, devam et.
4. İşletme bilgilerini doldur (sektör, şirket büyüklüğü — rastgele seçilebilir, önemli değil).
5. Platform olarak **Web**'i seç, web sitesi URL'si olarak `https://www.vitrinweb.com.tr` yaz, bir veri akışı
   (data stream) adı ver, **Akış oluştur (Create stream)** de.
6. Açılan ekranda **Ölçüm Kimliği (Measurement ID)** değerini kopyala — `G-XXXXXXXXXX` biçiminde olur.

## 2. Vercel'e bağla

Vercel projende **Settings → Environment Variables** ile şu değeri ekle (Production ortamı için):

| Ad | Değer |
|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | 1. adımda kopyaladığın `G-XXXXXXXXXX` |

`NEXT_PUBLIC_` ile başlayan ortam değişkenleri derleme anında tarayıcı koduna gömülür; bu yüzden kaydettikten sonra
Vercel'de yeni bir deploy tetiklenmesi gerekir (bir sonraki `main` push'u otomatik yapar, aksi hâlde Vercel
panelinden **Deployments → ⋯ → Redeploy** ile elle tetikleyebilirsin).

## Çerez onayı nasıl çalışıyor?

Ortam değişkeni tanımlandıktan sonra, sitenin alt kısmında herkese (yalnızca ilk ziyaretlerinde) bir çerez onay
şeridi görünür: **"Kabul Et"** veya **"Reddet"**. Yalnızca "Kabul Et" diyen ziyaretçilerde Google Analytics çalışır;
tercih tarayıcının yerel depolamasında (`vitrin:cookie-consent`) hatırlanır, bir daha sorulmaz. Bu, zaten
Çerez Politikası sayfasındaki "analiz çerezleri yalnızca açık onayınızla çalışır" taahhüdünü yerine getirir —
ayrıca bir KVKK/GDPR gereksinimidir, atlanmamalı.

## Verileri nerede görürsün?

[analytics.google.com](https://analytics.google.com) → mülkünü seç → **Raporlar**. Gerçek zamanlı ziyaretçi
sayısını, hangi sayfaların/kaynakların (Google, Instagram, doğrudan vb.) en çok trafik getirdiğini ve temel
davranış metriklerini buradan görürsün. İleride "sipariş başlatıldı" / "ödeme tamamlandı" gibi özel dönüşüm
olayları eklemek istersen bu ayrı bir geliştirme — şu an yalnızca temel sayfa görüntüleme takibi kuruludur.

## Sınırlamalar (bilerek kabul edilen)

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_` önekiyle tarayıcıya gönderilen kodun içinde bulunur — bu normal
  ve beklenen bir durumdur, GA4 Ölçüm Kimliği zaten gizli bir bilgi değildir (herkesin tarayıcısında görünür).
- Reddeden veya hiç seçim yapmayan ziyaretçiler için Google Analytics'e hiçbir istek gitmez; bu ziyaretçiler
  istatistiklere hiç yansımaz (gerçek, onaya dayalı bir uygulama — "reddet ama yine de say" gibi bir kaçamak yok).
- Yalnızca Google Analytics kuruldu; Meta (Facebook/Instagram) Pixel şimdilik eklenmedi. Meta reklamı vermeye
  başlarsan, aynı onay mekanizmasına eklemek küçük bir iş — o zaman tekrar gündeme getirilebilir.
