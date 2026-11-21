/* ================= SEKTÖRLER ================= */

export interface Sector {
  slug: string;
  name: string;
  /** /bilgi-al sektör seçeneği. */
  formSector: string;
  icon: string;
  seoTitle: string;
  description: string;
  title: string;
  text: string;
  steps: string[];
  links: { label: string; href: string }[];
  button: string;
  formNote?: string;
}

export const SECTORS: Sector[] = [
  {
    slug: "kuafor-ve-guzellik",
    name: "Kuaför ve Güzellik",
    formSector: "Kuaför ve Güzellik",
    icon: "scissors",
    seoTitle: "Kuaför ve Güzellik Salonları İçin Dijital Çözümler | Vitrinweb",
    description: "Salon hizmetlerinizi, çalışma saatlerinizi ve randevu kanallarınızı düzenli, şık bir dijital vitrinde bir araya getirin.",
    title: "Hizmetlerinizi estetik biçimde sunun, randevu sürecini zahmetsiz hâle getirin.",
    text: "Müşterileriniz sunduğunuz işlemleri, çalışma saatlerinizi ve randevu kanallarınızı tek sayfada görsün. Sık sorulan soruları düzenli karşılama mesajlarıyla hızla yanıtlayın.",
    steps: [
      "Hizmet vitrininizi oluşturun.",
      "Net bir randevu kanalı tanımlayın.",
      "Google İşletme Profilindeki saat ve adres bilgilerinizi güncelleyin.",
    ],
    links: [
      { label: "Web Sitesi Paketi", href: "/urunler/web-sitesi-paketi" },
      { label: "Online Randevu", href: "/hizmetler/online-randevu" },
      { label: "WhatsApp Karşılama", href: "/hizmetler/whatsapp-karsilama" },
    ],
    button: "Salonunuz İçin Görüşün",
  },
  {
    slug: "kafe-ve-restoran",
    name: "Kafe ve Restoran",
    formSector: "Yeme İçme",
    icon: "cup",
    seoTitle: "Kafe ve Restoranlar İçin Dijital Çözümler | Vitrinweb",
    description: "Menü, konum, servis saatleri, iştah açıcı ürün görselleri ve rezervasyon bilgilerinizi dijitalde eksiksiz sunun.",
    title: "Misafirleriniz yola çıkmadan güncel bilgiye ve doğru atmosfere ulaşsın.",
    text: "Menü, konum ve servis saatlerinize mobilden saniyeler içinde erişim sağlayın. Rezervasyon süreçlerinizi açık bir kanala bağlayın ve marka görsellerinizi tutarlı standartta sunun.",
    steps: [
      "Mobil uyumlu menü ve konum yapısını kurun.",
      "Tutarlı kadrajlarla ürün fotoğraflarınızı yenileyin.",
      "Aktif reklamlarınızın geri dönüşünü izleyin.",
    ],
    links: [
      { label: "Web Sitesi Paketi", href: "/urunler/web-sitesi-paketi" },
      { label: "Ürün Görsel Stüdyosu", href: "/urunler/urun-gorsel-studyosu" },
      { label: "Meta Reklam Paneli", href: "/urunler/meta-reklam-paneli" },
    ],
    button: "İşletmeniz İçin Görüşün",
  },
  {
    slug: "perakende",
    name: "Mağaza ve Perakende",
    formSector: "Perakende",
    icon: "store",
    seoTitle: "Mağaza ve Perakende İçin Dijital Çözümler | Vitrinweb",
    description:
      "Mağaza ve depo stoklarını anlık yönetin, ürün görsellerinizi profesyonelleştirin ve dijital kataloğunuzu müşterilerinizle paylaşın.",
    title: "Mağazada ne var, ne azalıyor, ne vitrine çıkmalı?",
    text: "Raf ve depo hareketlerinizi düzenli kayıt altına alın. Satışa hazır ürün fotoğraflarınızla müşterilerinize güvenle gönderebileceğiniz dijital bir katalog oluşturun.",
    steps: [
      "Mevcut stok tablonuzu standartlaştırın.",
      "Ürün bazında kritik stok eşiklerini belirleyin.",
      "Öne çıkan ürünlerinizle dijital vitrininizi kurun.",
    ],
    links: [
      { label: "Depo Takibi", href: "/urunler/depo-takibi" },
      { label: "Ürün Görsel Stüdyosu", href: "/urunler/urun-gorsel-studyosu" },
      { label: "Web Sitesi Paketi", href: "/urunler/web-sitesi-paketi" },
    ],
    button: "Mağazanız İçin Görüşün",
  },
  {
    slug: "e-ticaret",
    name: "E-Ticaret",
    formSector: "E-Ticaret",
    icon: "cart",
    seoTitle: "E-Ticaret Markaları İçin Dijital Çözümler | Vitrinweb",
    description:
      "Ürün görsellerinizi standartlaştırın, stok hareketlerinizi kontrol altına alın ve Meta reklam performansınızı sade bir panelden izleyin.",
    title: "Ürün vitrininiz, reklam verileriniz ve stoklarınız tek ritimde çalışsın.",
    text: "Web siteniz, pazaryerleri ve reklam kampanyalarınız için tutarlı görsel setleri üretin. Stok hareketlerinizi anlık izleyin ve reklam bütçenizin gerçek performansını net metriklerle takip edin.",
    steps: [
      "Öncelikli ürün grubunu belirleyin.",
      "Kanal bazlı görsel ölçülerini netleştirin.",
      "Stok ve reklam takibinde izlenecek temel verileri yapılandırın.",
    ],
    links: [
      { label: "Ürün Görsel Stüdyosu", href: "/urunler/urun-gorsel-studyosu" },
      { label: "Depo Takibi", href: "/urunler/depo-takibi" },
      { label: "Meta Reklam Paneli", href: "/urunler/meta-reklam-paneli" },
    ],
    button: "E-Ticaret Operasyonunuz İçin Görüşün",
  },
  {
    slug: "toptanci-ve-depo",
    name: "Toptancı ve Depo",
    formSector: "Toptan Satış ve Depo",
    icon: "truck",
    seoTitle: "Toptancılar ve Depolar İçin Dijital Çözümler | Vitrinweb",
    description: "Depo giriş-çıkışlarını barkodla anlık kaydedin, kritik stokları izleyin ve operasyonunuza özel iş akışları kurun.",
    title: "Ürün depodan çıktığı anda kayıt da güncellensin.",
    text: "Giriş ve çıkış hareketlerini doğrudan raf başında kaydedin. Kritik stok seviyelerini ve son hareketleri tüm ekip aynı ekrandan izlesin. Özel onay veya irsaliye akışlarınızı ayrıca yapılandıralım.",
    steps: [
      "Ürün kodları ve ölçü birimlerini netleştirin.",
      "En yoğun hareket gören ürünlerle pilot başlatın.",
      "Özel onay veya belge adımlarını tanımlayın.",
    ],
    links: [
      { label: "Depo Takibi", href: "/urunler/depo-takibi" },
      { label: "İşletmeye Özel Çözümler", href: "/isletmeye-ozel" },
    ],
    button: "Deponuz İçin Görüşün",
  },
  {
    slug: "klinik-ve-saglik",
    name: "Klinik ve Sağlık",
    formSector: "Klinik ve Sağlık",
    icon: "health",
    seoTitle: "Klinikler İçin Web Sitesi ve İletişim Çözümleri | Vitrinweb",
    description:
      "Kliniğinizin adres, çalışma saatleri ve randevu iletişim kanallarını düzenli, güven veren bir kurumsal web sitesinde paylaşın.",
    title: "Kliniğinize ulaşmak için gereken tüm bilgiler net ve erişilebilir olsun.",
    text: "Adres, çalışma saatleri ve randevu iletişim kanallarınızı sade ve düzenli bir yapıda sunun. Web sitesinde ve iletişim akışında yer alacak tüm bilgileri kurum sorumlularınızın onayıyla yapılandıralım.",
    steps: [
      "Kurum ve iletişim bilgilerini doğrulayın.",
      "Randevu yönlendirme akışını tasarlayın.",
      "Yayınlanacak içerikleri kurum onay sürecinden geçirin.",
    ],
    links: [
      { label: "Web Sitesi Paketi", href: "/urunler/web-sitesi-paketi" },
      { label: "Online Randevu", href: "/hizmetler/online-randevu" },
      { label: "İşletmeye Özel Çözümler", href: "/isletmeye-ozel" },
    ],
    button: "Kliniğiniz İçin Görüşün",
    formNote: "Lütfen bu formda hasta bilgisi veya sağlık kaydı paylaşmayın.",
  },
];

export const getSector = (slug: string): Sector | undefined => SECTORS.find((s) => s.slug === slug);

/** /bilgi-al sektör seçenekleri. */
export const FORM_SECTORS = [
  "Kuaför ve Güzellik",
  "Yeme İçme",
  "Perakende",
  "E-Ticaret",
  "Toptan Satış ve Depo",
  "Klinik ve Sağlık",
  "Diğer",
];
