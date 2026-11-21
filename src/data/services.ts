/* ================= TAMAMLAYICI HİZMETLER ================= */

export interface Service {
  slug: string;
  name: string;
  icon: string;
  seoTitle: string;
  description: string;
  /** Kart metni (çoğunda meta açıklamasıyla aynı). */
  card: string;
  title: string;
  text: string;
  scope: string[];
  faq?: { q: string; a: string };
  /** Örnek mesaj/karşılama metni. */
  example?: { label: string; text: string };
  /** İlgili ürün bağlantısı. */
  link?: { label: string; href: string };
}

export const SERVICES: Service[] = [
  {
    slug: "google-isletme-profili",
    name: "Google İşletme Profili ve yorum yönetimi",
    icon: "pin",
    seoTitle: "Google İşletme Profili Düzenleme ve Yorum Yönetimi | Vitrinweb",
    description:
      "İşletme profilinizdeki kategori, çalışma saatleri ve bağlantıları optimize edin; düzenli yorum isteme ve yanıt sürecinizi kurun.",
    card: "İşletme profilinizdeki kategori, çalışma saatleri ve bağlantıları optimize edin; düzenli yorum isteme ve yanıt sürecinizi kurun.",
    title: "Google profiliniz işletmenizin kalitesini ve güncelliğini yansıtsın.",
    text: "Adres, kategori, çalışma saatleri ve web sitesi bağlantılarınızı eksiksiz düzenleyelim. Müşterilerinizden deneyimlerini paylaşmalarını isteyebileceğiniz sade bir akış ve kurumsal dilinize uygun yorum yanıt taslakları hazırlayalım.",
    scope: ["Profil denetimi", "Bilgi ve kategori optimizasyonu", "Yorum bağlantısı veya QR kart taslağı", "Kurumsal yanıt taslakları"],
    faq: {
      q: "Profil yetkisini nasıl devredeceğim?",
      a: "Şifre paylaşımı gerekmeden güvenli yetkilendirme adımlarını kurulumda sizinle paylaşıyoruz.",
    },
    link: { label: "Google Haritalar Karnesini İnceleyin", href: "/urunler/google-haritalar-karnesi" },
  },
  {
    slug: "whatsapp-karsilama",
    name: "WhatsApp karşılama ve hızlı yanıtlar",
    icon: "whatsapp",
    seoTitle: "WhatsApp Karşılama ve Hızlı Yanıt Kurulumu | Vitrinweb",
    description:
      "Kurumsal karşılama mesajı, mesai dışı bildirimi ve hızlı yanıt şablonlarıyla WhatsApp müşteri iletişimini standartlaştırın.",
    card: "Kurumsal karşılama mesajı, mesai dışı bildirimi ve hızlı yanıt şablonlarıyla WhatsApp müşteri iletişimini standartlaştırın.",
    title: "WhatsApp iletişiminizde ilk izlenimi profesyonelce yönetin.",
    text: "Çalışma saatleri, konum, sipariş ve randevu gibi tekrar eden sorular için net ve kurumsal yanıt şablonları oluşturun. Yoğun saatlerde ve mesai dışında müşterinizin doğru yönlendirilmesini sağlayın.",
    scope: ["Kurumsal karşılama metni", "Mesai dışı mesaj kurgusu", "Sık sorular için hızlı yanıt şablonları", "Ekibe yönlendirme akışı"],
    example: {
      label: "Örnek karşılama",
      text: "Merhaba, Lina Salon’a hoş geldiniz. Size en hızlı şekilde yardımcı olabilmemiz için hangi konuda yazdığınızı kısaca paylaşır mısınız?",
    },
    faq: {
      q: "Şirket belgelerimizden otomatik yanıt veren bir asistan kurulabilir mi?",
      a: "Bu ihtiyaç için Müşteri Asistanı ürünümüzü inceleyebilirsiniz.",
    },
    link: { label: "Müşteri Asistanını İnceleyin", href: "/urunler/musteri-asistani" },
  },
  {
    slug: "performans-raporu",
    name: "Aylık performans raporu",
    icon: "chart",
    seoTitle: "İşletmeler İçin Aylık Dijital Performans Raporu | Vitrinweb",
    description: "Reklam, arama görünürlüğü ve satış göstergelerini yönetici özetine uygun tek sayfalık aylık raporda okuyun.",
    card: "Reklam, arama görünürlüğü ve satış göstergelerini yönetici özetine uygun tek sayfalık aylık raporda okuyun.",
    title: "Ay sonunda hangi rakamların işinize yön verdiğini net biçimde görün.",
    text: "İş modeliniz için en kritik göstergeleri birlikte seçelim. Ulaşılabilen reklam, arama ve satış verilerini tek sayfada derleyip önceki dönemle karşılaştırmalı olarak sunalım.",
    scope: ["Temel metrik seçimi", "Dönemsel karşılaştırma", "Veri eksiklerinin tespiti", "Bir sonraki dönem için değerlendirme notu"],
    faq: {
      q: "Raporlama için hangi kayıtlara ihtiyaç duyulur?",
      a: "Veri kaynaklarını ölçmek istediğiniz iş hedeflerine göre ilk görüşmede belirliyoruz.",
    },
  },
  {
    slug: "seo-makale",
    name: "SEO destekli makale",
    icon: "pen",
    seoTitle: "İşletmeler İçin SEO Destekli İçerik Üretimi | Vitrinweb",
    description:
      "Müşterilerinizin aradığı konulara yanıt veren, editör kontrolünden geçmiş ve hizmetlerinize yönlendiren web içerikleri hazırlayın.",
    card: "Müşterilerinizin aradığı konulara yanıt veren, editör kontrolünden geçmiş ve hizmetlerinize yönlendiren web içerikleri hazırlayın.",
    title: "Müşterilerinizin aradığı sorulara kendi sitenizde uzmanlıkla yanıt verin.",
    text: "Hizmet alanınızla ilgili gerçek müşteri sorularını belirleyelim. Her makalede açık bir anlatım, doğru başlık hiyerarşisi ve ilgili hizmet sayfanıza doğal bir geçiş kurgulayalım.",
    scope: ["İçerik ve konu planı", "Makale yazımı", "SEO başlığı ve meta açıklaması", "Editörlük ve kalite kontrolü"],
    faq: {
      q: "Hangi konulardan başlamalıyız?",
      a: "Ekibinizin en sık yanıtladığı soruları ve öncelikli hizmet alanlarınızı birlikte değerlendirerek içerik planını çıkarıyoruz.",
    },
  },
  {
    slug: "online-randevu",
    name: "Online randevu ve hatırlatma",
    icon: "calendar",
    seoTitle: "Online Randevu ve Hatırlatma Kurulumu | Vitrinweb",
    description:
      "Hizmet seçimi, uygun zaman dilimi, onay ve otomatik hatırlatma adımlarını işletmenize uygun akışla kurgulayın.",
    card: "Hizmet seçimi, uygun zaman dilimi, onay ve otomatik hatırlatma adımlarını işletmenize uygun akışla kurgulayın.",
    title: "Randevu planlamasını hem müşteriniz hem ekibiniz için zahmetsiz hâle getirin.",
    text: "Hizmet seçimi, müsaitlik takvimi, iletişim ve onay adımlarını düzenli bir akışta birleştirelim. Doğrudan onay veya talep bazlı randevu modelini işletmenizin çalışma biçimine göre seçin.",
    scope: ["Hizmet seçimi", "Takvim veya talep formu", "Onay ve hatırlatma mesajları", "İptal ve değişiklik yönlendirmesi"],
    example: {
      label: "Örnek mesaj",
      text: "Lina Salon randevunuz 28 Kasım günü saat 14.30 için planlandı. Değişiklik veya iptal için WhatsApp hattımız üzerinden bize ulaşabilirsiniz.",
    },
  },
  {
    slug: "pazaryeri-senkronu",
    name: "Pazaryeri stok ve fiyat senkronu",
    icon: "sync",
    seoTitle: "Pazaryeri Stok ve Fiyat Entegrasyonu | Vitrinweb",
    description: "Depo stok kayıtlarınız ile pazaryeri ürün alanlarını teknik bağlantı olanaklarına göre uyumlu hâle getirin.",
    card: "Depo stok kayıtlarınız ile pazaryeri ürün alanlarını teknik bağlantı olanaklarına göre uyumlu hâle getirin.",
    title: "Depo kayıtlarınız ile pazaryerleriniz tek kaynak üzerinden uyumlu çalışsın.",
    text: "Aktif pazaryerlerinizi, ürün kodlarınızı ve ana veri kaynağını belirleyelim. Teknik olarak desteklenen karşılıklı senkronizasyon akışını önce sınırlı bir ürün grubunda test edip devreye alalım.",
    scope: ["Ürün kodu eşleştirme", "Ana veri kaynağı tanımı", "Hata ve istisna senaryoları", "Pilot test ve doğrulama"],
    faq: {
      q: "Hangi pazaryerleri bağlanabilir?",
      a: "Kullandığınız platformların entegrasyon olanaklarını ve hesap yetkilerini keşif görüşmesinde değerlendiriyoruz.",
    },
    link: { label: "Depo Takibini İnceleyin", href: "/urunler/depo-takibi" },
  },
  {
    slug: "musteri-takip-paneli",
    name: "Mini müşteri takip paneli",
    icon: "users",
    seoTitle: "İşletmeler İçin Mini Müşteri Takip Paneli | Vitrinweb",
    description: "Gelen müşteri taleplerini, sorumlu ekip üyelerini ve takip tarihlerini sade tek bir panelde yönetin.",
    card: "Gelen müşteri taleplerini, sorumlu ekip üyelerini ve takip tarihlerini sade tek bir panelde yönetin.",
    title: "Hiçbir müşteri talebi gözden kaçmasın; kimin ne zaman döneceği net olsun.",
    text: "Gelen tüm talepleri durum, not ve sonraki takip tarihiyle kayıt altına alın. Ekibiniz gün sonunda açık fırsatları ve bekleyen işleri tek listeden kolayca izlesin.",
    scope: ["Talep kayıt yapısı", "Sorumlu atama", "Takip tarihi hatırlatması", "Durum ve görüşme notları"],
    faq: {
      q: "Mesajlar panele otomatik düşebilir mi?",
      a: "Otomatik aktarım olanaklarını kullandığınız kanalın teknik erişim yapısına göre ayrıca değerlendiriyoruz.",
    },
  },
  {
    slug: "reklam-metni-ve-kisa-video",
    name: "Reklam metni ve kısa video",
    icon: "video",
    seoTitle: "Reklam Metni ve Kısa Video İçeriği | Vitrinweb",
    description:
      "Ürün veya hizmetiniz için mecraya uygun yüksek etkili reklam metni, kısa video kurgusu ve üretim kapsamı oluşturun.",
    card: "Ürün veya hizmetiniz için mecraya uygun yüksek etkili reklam metni, kısa video kurgusu ve üretim kapsamı oluşturun.",
    title: "Reklamınız ilk birkaç saniyede doğru mesajı net biçimde versin.",
    text: "Ürününüzün temel faydasını, hedef kitlenizi ve yayın mecrasını netleştirelim. Reklam metnini, kısa video akışını ve izleyiciden beklenen aksiyonu tutarlı tek bir fikir etrafında hazırlayalım.",
    scope: ["Ana mesaj stratejisi", "Reklam metni", "Kısa video akış taslağı", "Mecra ve format uyarlaması"],
    faq: {
      q: "Mevcut çekimlerimizle çalışabilir miyiz?",
      a: "Kullanım hakkına sahip olduğunuz görüntüleri inceleyip metin ve kurgu kapsamını buna göre netleştiriyoruz.",
    },
    link: { label: "Meta Reklam Panelini İnceleyin", href: "/urunler/meta-reklam-paneli" },
  },
];

export const getService = (slug: string): Service | undefined => SERVICES.find((s) => s.slug === slug);
