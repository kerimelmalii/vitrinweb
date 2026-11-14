import { BASE_PRICE, TL } from "@/lib/config";

/** Ürün ekranı çizimi: her ürünün sayfasında ve kartında gösterilen temsilî arayüz. */
export type ProductScreenKind = "meta" | "depo" | "gorsel" | "musteri" | "web" | "ozel";

export interface ProductStep {
  t: string;
  d: string;
}

export interface ProductFeature {
  icon: string;
  t: string;
  d: string;
}

export interface Product {
  slug: string;
  name: string;
  /** Kartlarda ve menüde tek satırlık açıklama. */
  short: string;
  /** Ürün sayfasının ana başlığı: ürünün sonucu, müşterinin dilinden. */
  title: string;
  lead: string;
  /** Arama sonuçlarında görünen açıklama (~155 karakter). */
  description: string;
  icon: string;
  screen: ProductScreenKind;
  /** Müşterinin bu ürünü aramasına yol açan cümleler. */
  pains: string[];
  steps: ProductStep[];
  features: ProductFeature[];
  forWho: string[];
  notFor: string[];
  pricing: { label: string; d: string };
  faqs: { q: string; a: string }[];
  /** Web sitesi gibi sitede doğrudan satın alınabilen ürün. Diğerleri görüşmeyle başlar. */
  checkout?: boolean;
}

/* Sıra, ürünler sayfasındaki ve ana sayfadaki sıradır. Özel çözümler her zaman sonda, geniş kartla gösterilir. */
export const PRODUCTS: Product[] = [
  {
    slug: "meta-reklam-paneli",
    name: "Meta Reklam Paneli",
    short: "Instagram ve Facebook reklamlarınızın harcamasını ve sonucunu tek ekranda görün.",
    title: "Reklamınız ne getiriyor, tek ekranda görün.",
    lead: "Instagram ve Facebook reklamlarınızın harcamasını, gelen mesajları ve sonuçları sade bir panelde topluyoruz. Haftalık özet WhatsApp'ınıza gelir.",
    description:
      "Instagram ve Facebook reklamlarınızın harcamasını ve sonucunu sade, Türkçe bir panelde görün. Bütçe uyarısı ve haftalık özet dahil.",
    icon: "trend",
    screen: "meta",
    pains: [
      "Reklama her ay para harcıyorum ama ne getirdiğini bilmiyorum.",
      "Meta'nın reklam yöneticisi çok karışık, rakamları anlamıyorum.",
      "Bütçe bittiğinde ya da reklam durduğunda geç fark ediyorum.",
    ],
    steps: [
      { t: "Hesabınızı bağlarız", d: "Reklam hesabınıza, sizin verdiğiniz izinle ve yalnızca okuma yetkisiyle bağlanırız." },
      { t: "Paneli kurarız", d: "Sizin için önemli rakamları seçeriz: harcama, mesaj, arama, satış ya da ziyaret." },
      { t: "Her hafta özet", d: "Panel her gün güncellenir; haftalık kısa özet WhatsApp veya e-postanıza gelir." },
    ],
    features: [
      { icon: "layout", t: "Tek ekran", d: "Kampanyalar, harcama ve sonuçlar aynı yerde; menüler arasında kaybolmazsınız." },
      { icon: "message", t: "Mesaj başına maliyet", d: "Reklamdan gelen her WhatsApp ve Instagram mesajının size kaça mal olduğunu görürsünüz." },
      { icon: "info", t: "Bütçe uyarısı", d: "Harcama belirlediğiniz sınıra yaklaşınca ya da bir reklam durunca haber verir." },
      { icon: "file", t: "Haftalık özet", d: "Geçen haftaya göre ne değişti, üç cümlede." },
      { icon: "phone", t: "Telefonda rahat", d: "Panel telefonda da okunur; bilgisayar başında olmanız gerekmez." },
      { icon: "shield", t: "Yalnızca okuma izni", d: "Paneliniz reklamlarınızı değiştirmez; yalnızca verileri okur." },
    ],
    forWho: [
      "Instagram veya Facebook'ta düzenli reklam veren işletmeler",
      "Reklamını bir ajansa ya da çalışanına yaptıran ve sonucu kendi görmek isteyen işletme sahipleri",
      "Birden fazla şubesi veya kampanyası olan işletmeler",
    ],
    notFor: [
      "Henüz hiç reklam vermemiş işletmeler (önce reklamın kendisi gerekir)",
      "Yalnızca Google reklamı veren işletmeler (bu panel Meta reklamları içindir)",
    ],
    pricing: {
      label: "Kurulum + aylık ücret",
      d: "Fiyat, bağlanacak reklam hesabı ve rapor sayısına göre belirlenir. Kısa bir görüşmeden sonra yazılı teklif iletiriz.",
    },
    faqs: [
      {
        q: "Reklamlarımı siz mi yönetiyorsunuz?",
        a: "Hayır. Panel reklamlarınızı göstermek içindir; reklamlarınızı siz, çalışanınız ya da ajansınız yönetmeye devam eder. Panele yalnızca okuma izniyle bağlanırız.",
      },
      {
        q: "Hangi bilgileri görürüm?",
        a: "Harcama, gösterim, tıklama, mesaj ve sizin için önemli sonuçlar (arama, form, satış gibi). Hangi rakamların görüneceğini kurulumda birlikte seçeriz.",
      },
      {
        q: "İstediğim zaman bırakabilir miyim?",
        a: "Evet. Aylık hizmet istediğiniz ay sona erdirilebilir; erişim izni de sizin tarafınızdan her an geri alınabilir.",
      },
    ],
  },
  {
    slug: "depo-takibi",
    name: "Depo ve Stok Takibi",
    short: "Stok giriş ve çıkışlarını telefonla kaydedin, ürün bitmeden haber alın.",
    title: "Excel'den çıkın, stoğunuzu telefonla sayın.",
    lead: "Ürün girişlerini ve çıkışlarını telefonunuzla, barkod okutarak kaydedin. Kritik seviyeye düşen ürünü siz fark etmeden önce panel size söyler.",
    description:
      "Stok giriş ve çıkışlarını telefonla, barkod okutarak kaydedin. Kritik stok uyarısı, hareket geçmişi ve Excel'e aktarma dahil.",
    icon: "box",
    screen: "depo",
    pains: [
      "Stoğu Excel'de tutuyorum, dosya hiç güncel değil.",
      "Ürün bittiğinde, müşteri sorunca fark ediyorum.",
      "Kim neyi ne zaman depodan çıkardı, bilmiyorum.",
    ],
    steps: [
      { t: "Ürünlerinizi aktarırız", d: "Mevcut Excel listenizi ya da ürün kayıtlarınızı sisteme biz aktarırız." },
      { t: "Ekibinizi tanıtırız", d: "Çalışanlarınız kendi hesaplarıyla telefondan giriş ve çıkış kaydeder." },
      { t: "Uyarıları ayarlarız", d: "Her ürün için kritik seviyeyi belirleriz; stok düşünce haber gelir." },
    ],
    features: [
      { icon: "scan", t: "Barkodla kayıt", d: "Telefon kamerasıyla barkodu okutun; adet girin, kaydedin." },
      { icon: "info", t: "Kritik stok uyarısı", d: "Belirlediğiniz seviyenin altına düşen ürünler listenin başında görünür." },
      { icon: "file", t: "Hareket geçmişi", d: "Her giriş ve çıkış, kimin yaptığı ve ne zaman yapıldığıyla kayıtlıdır." },
      { icon: "layout", t: "Birden fazla depo", d: "Depo, şube veya raf bazında ayrı stok tutabilirsiniz." },
      { icon: "upload", t: "Excel'e aktarma", d: "Tüm stok ve hareket kayıtlarını istediğiniz an Excel olarak indirirsiniz." },
      { icon: "lock", t: "Yetki ayarı", d: "Kimin yalnızca kayıt girebileceğini, kimin raporları görebileceğini siz belirlersiniz." },
    ],
    forWho: [
      "Toptancılar, atölyeler ve deposu olan perakendeciler",
      "Pazaryerinde satış yapan ve stoğu elle takip eden e-ticaret satıcıları",
      "Stok bilgisini Excel'de ya da kâğıtta tutan işletmeler",
    ],
    notFor: [
      "Muhasebe veya fatura programı arayanlar (bu bir stok takip aracıdır)",
      "Halihazırda stok modülü olan bir ERP programını verimli kullanan işletmeler",
    ],
    pricing: {
      label: "Kurulum + aylık ücret",
      d: "Fiyat, ürün sayısı, depo sayısı ve kullanıcı sayısına göre belirlenir. Ürün aktarımı kuruluma dahildir.",
    },
    faqs: [
      {
        q: "Barkod okuyucu almam gerekiyor mu?",
        a: "Hayır. Telefonun kamerası barkod okumak için yeterlidir. Yoğun kullanımda isterseniz bir el tipi barkod okuyucu da bağlanabilir.",
      },
      {
        q: "Ürünlerimin barkodu yoksa ne olur?",
        a: "Ürünlerinize sistem içinde kod verilir ve isterseniz yazdırılabilir etiketler hazırlanır. Barkodsuz ürünler listeden seçilerek de kaydedilebilir.",
      },
      {
        q: "Verilerim bana mı ait?",
        a: "Evet. Tüm kayıtlarınızı istediğiniz an Excel olarak indirebilirsiniz; hizmeti sonlandırdığınızda verileriniz size teslim edilir ve talebinizle silinir.",
      },
    ],
  },
  {
    slug: "urun-gorsel-studyosu",
    name: "Ürün Görsel Stüdyosu",
    short: "Telefonla çektiğiniz ürün fotoğraflarını satışa hazır, profesyonel görsellere dönüştürün.",
    title: "Ürün fotoğraflarınız, stüdyoda çekilmiş gibi.",
    lead: "Telefonla çektiğiniz fotoğrafı gönderin; ürününüze uygun arka plan, ışık ve sahneyle pazaryeri ve sosyal medya için hazır görseller teslim edelim.",
    description:
      "Ürün fotoğraflarınıza uygun arka plan ve sahne ekliyoruz. Trendyol, Hepsiburada ve Instagram için hazır, tutarlı görseller.",
    icon: "image",
    screen: "gorsel",
    pains: [
      "Ürün fotoğraflarım amatör görünüyor, rakiplerim daha profesyonel.",
      "Her ürün için stüdyo çekimi yaptırmak çok pahalı.",
      "Pazaryeri beyaz arka plan istiyor, Instagram'a başka görsel lazım.",
    ],
    steps: [
      { t: "Fotoğrafı gönderin", d: "Ürününüzü telefonla, düz bir zeminde çekip WhatsApp'tan ya da formdan iletin." },
      { t: "Sahneyi hazırlarız", d: "Ürününüze ve markanıza uygun arka plan, ışık ve sahneleri hazırlarız." },
      { t: "Hazır seti alın", d: "Pazaryeri, Instagram gönderisi ve hikâye ölçülerinde görseller teslim edilir." },
    ],
    features: [
      { icon: "image", t: "Ürüne uygun sahne", d: "Kozmetik için banyo tezgâhı, kahve için mutfak, takı için kadife: ürünün dünyasına uygun." },
      { icon: "check", t: "Pazaryeri uyumu", d: "Beyaz arka planlı ana görsel, platformların istediği ölçü ve formatta." },
      { icon: "layout", t: "Tüm ölçüler", d: "Kare gönderi, dikey hikâye ve web sitesi ölçülerinde aynı setten çıktı." },
      { icon: "star", t: "Marka tutarlılığı", d: "Tüm ürünleriniz aynı ışık ve tarzda; vitrininiz düzenli görünür." },
      { icon: "shield", t: "Ürün değişmez", d: "Yalnızca arka plan ve ışık değişir; ürününüzün rengi, şekli ve yazısı olduğu gibi kalır." },
      { icon: "search", t: "İnsan kontrolü", d: "Her görsel teslimden önce elle kontrol edilir; hatalı çıktı size ulaşmaz." },
    ],
    forWho: [
      "Trendyol, Hepsiburada veya kendi sitesinden satış yapan e-ticaret işletmeleri",
      "Instagram'da ürün satan butikler, üreticiler ve el yapımı ürün satıcıları",
      "Yeni ürünlerini hızlıca vitrine koymak isteyen markalar",
    ],
    notFor: [
      "Model veya manken çekimi gereken giyim ürünleri (bu hizmet ürün görseli içindir)",
      "Ürünün olduğundan farklı görünmesini isteyenler: ürünün kendisini değiştirmiyoruz",
    ],
    pricing: {
      label: "Görsel paketi",
      d: "Fiyat, ürün sayısı ve her ürün için istenen sahne sayısına göre paket olarak belirlenir. Düzenli ihtiyaç için aylık paket de sunulur.",
    },
    faqs: [
      {
        q: "Fotoğrafı nasıl çekmeliyim?",
        a: "Gün ışığında, düz ve sade bir zeminde, ürünün tamamı görünecek şekilde çekmeniz yeterli. Size kısa bir çekim rehberi göndeririz.",
      },
      {
        q: "Görseller pazaryeri kurallarına uygun mu?",
        a: "Ana ürün görseli, pazaryerlerinin istediği beyaz arka plan ve ölçülerde hazırlanır. Sahne görselleri ise ek görsel ve sosyal medya için kullanılır.",
      },
      {
        q: "Görsellerin kullanım hakkı kime ait?",
        a: "Teslim edilen görselleri işletmeniz için süresiz kullanabilirsiniz.",
      },
    ],
  },
  {
    slug: "musteri-bulma",
    name: "Müşteri Bulma Aracı",
    short: "Bölge ve sektöre göre size uygun işletmeleri bulun, kimle önce görüşeceğinizi bilin.",
    title: "Kime satacağınızı tahmin etmeyin, görün.",
    lead: "İşletmelere satış yapıyorsanız, hedeflediğiniz ilçe ve sektördeki işletmeleri bulmanıza ve hangileriyle önce görüşmeniz gerektiğini belirlemenize yardımcı oluyoruz.",
    description:
      "İşletmelere satış yapanlar için: hedef ilçe ve sektördeki işletmeleri bulun, önceliklendirin ve satış görüşmelerinizi düzenleyin.",
    icon: "target",
    screen: "musteri",
    pains: [
      "Yeni müşteriyi nerede arayacağımı bilmiyorum.",
      "Satış ekibim rastgele arıyor, kime öncelik vereceğimizi bilmiyoruz.",
      "Hangi işletmeyle görüştük, sonra ne olacaktı, kayıt yok.",
    ],
    steps: [
      { t: "Hedefi belirleriz", d: "Hangi ilçe, hangi sektör ve nasıl bir işletme sizin müşteriniz, birlikte tanımlarız." },
      { t: "Fırsatları çıkarırız", d: "Bölgedeki işletmeleri bulur, size uygunluklarına göre sıralarız." },
      { t: "Takibi kolaylaştırırız", d: "Kiminle görüşüldü, sonuç ne oldu, sıradaki adım ne; hepsi tek listede." },
    ],
    features: [
      { icon: "pin", t: "Bölge ve sektör", d: "İlçe, mahalle ve sektör seçerek hedef bölgenizi daraltırsınız." },
      { icon: "trend", t: "Önceliklendirme", d: "İşletmeler sizin ürününüze uygunluk puanına göre sıralanır." },
      { icon: "check", t: "Görüşme takibi", d: "Her işletme için durum, not ve bir sonraki adım kaydedilir." },
      { icon: "layout", t: "Ekip görünümü", d: "Satış ekibiniz aynı listeyi görür; aynı işletme iki kez aranmaz." },
    ],
    forWho: [
      "İşletmelere ürün veya hizmet satan firmalar (B2B)",
      "Sahada ya da telefonla satış yapan ekipler",
      "Yeni bir ilçe veya şehre açılmak isteyen işletmeler",
    ],
    notFor: [
      "Son tüketiciye (bireylere) satış yapan işletmeler",
      "Toplu ve izinsiz mesaj göndermek isteyenler: yasal kurallara uygun iletişim kuruyoruz",
    ],
    pricing: {
      label: "Kapsama göre",
      d: "Fiyat, hedef bölge sayısı ve kullanıcı sayısına göre belirlenir. Görüşmeden sonra yazılı teklif iletiriz.",
    },
    faqs: [
      {
        q: "Bulduğunuz işletmelere toplu mesaj atabilir miyim?",
        a: "Araç, toplu ve izinsiz mesaj göndermek için değildir. Ticari iletiler yasal kurallara tabidir; size uygun ve kurallara uyan bir iletişim yöntemi öneririz.",
      },
      {
        q: "Hangi sektörlerde çalışıyor?",
        a: "Adresi ve kamuya açık işletme bilgisi olan her sektörde kullanılabilir: kafe, kuaför, klinik, mağaza, ofis gibi.",
      },
      {
        q: "Kendi müşteri listemi ekleyebilir miyim?",
        a: "Evet. Elinizdeki listeyi aktarabilir, takip ve önceliklendirme özelliklerini onunla da kullanabilirsiniz.",
      },
    ],
  },
  {
    slug: "web-sitesi",
    name: "Web Sitesi",
    short: `İşletmeniz için modern, hızlı ve mobil uyumlu web sitesi. ${TL(BASE_PRICE)}, ilk yıl servis ücretsiz.`,
    title: `${TL(BASE_PRICE)}'ye profesyonel web sitesi.`,
    lead: "Modern, hızlı ve mobil uyumlu web sitenizi sizin için hazırlıyoruz. Metinleri biz yazarız; ilk yıl alan adı, barındırma, servis ve bakım dahil.",
    description: `İşletmeniz için ${TL(BASE_PRICE)}'ye modern, hızlı, mobil uyumlu web sitesi. İlk yıl servis ve bakım ücretsiz, taahhüt yok.`,
    icon: "globe",
    screen: "web",
    checkout: true,
    pains: [
      "Müşteriler beni Google'da arıyor ama bulamıyor.",
      "Instagram hesabım var ama kendi sitem yok.",
      "Mevcut sitem eski, telefonda düzgün görünmüyor.",
    ],
    steps: [
      { t: "Sipariş verin", d: "Bilgilerinizi girin, paketinizi seçin ve güvenli ödemeyle siparişinizi tamamlayın." },
      { t: "İçeriklerinizi iletin", d: "Logo, fotoğraf ve işletme bilgilerinizi kısa bir formla gönderin." },
      { t: "Yayına alalım", d: "İçerikleriniz tamamlandıktan sonra 5 iş günü içinde, onayınızla siteniz yayında." },
    ],
    features: [
      { icon: "layout", t: "5 sayfalık tasarım", d: "Ana sayfa, hakkımızda, hizmetler, galeri ve iletişim; sektörünüze göre." },
      { icon: "phone", t: "Mobil uyumlu", d: "Telefon, tablet ve bilgisayarda düzgün görünür." },
      { icon: "file", t: "Metin yazımı", d: "Verdiğiniz bilgilerden sayfa metinlerinizi biz yazarız." },
      { icon: "search", t: "SEO uyumlu altyapı", d: "Sayfa başlıkları, açıklamalar, site haritası ve yapısal veri." },
      { icon: "message", t: "WhatsApp ve tıkla-ara", d: "Ziyaretçiniz tek dokunuşla size ulaşır." },
      { icon: "shield", t: "İlk yıl servis ücretsiz", d: "Alan adı, barındırma, SSL, güvenlik güncellemeleri ve ayda 2 küçük güncelleme." },
    ],
    forWho: [
      "Web sitesi olmayan ya da sitesini yenilemek isteyen küçük işletmeler",
      "Google aramalarında görünmek isteyen yerel işletmeler",
      "Hızlı, net fiyatlı ve uğraştırmayan bir süreç arayanlar",
    ],
    notFor: [
      "Çok sayıda ürünlü, büyük ölçekli e-ticaret altyapısı arayanlar (bunu teklifle değerlendiriyoruz)",
      "Başka bir firmanın yaptığı mevcut sitenin onarımını isteyenler",
    ],
    pricing: {
      label: TL(BASE_PRICE),
      d: "KDV dahil, tek seferlik. İlk yıl servis ve bakım ücretsiz, taahhüt yok. Ek özellikler (blog, randevu, çoklu dil) açık fiyatlarla eklenir.",
    },
    faqs: [
      {
        q: "Sitem ne zaman hazır olur?",
        a: "İçerikleriniz eksiksiz ulaştıktan sonra 5 iş günü içinde siteniz yayına hazır olur.",
      },
      {
        q: "İlk yıldan sonra ne ödüyorum?",
        a: "2. yıl servis ve bakım ücreti yıllık 1.000 TL'dir; sonraki yıllarda enflasyon oranında güncellenir ve önceden bildirilir. Memnun kalmazsanız yenilemezsiniz.",
      },
      {
        q: "Ödeme nasıl alınıyor?",
        a: "Ödeme, BDDK lisanslı ödeme kuruluşu iyzico üzerinden, 3D Secure doğrulamasıyla alınır. Kart bilgileriniz bize ulaşmaz.",
      },
    ],
  },
];

/** İşletmeye özel geliştirme: ürün listesinde geniş kartla ayrıca gösterilir. */
export const CUSTOM_SOLUTION: Product = {
  slug: "ozel-cozumler",
  name: "İşletmeye Özel Çözümler",
  short: "Hazır yazılımların karşılamadığı işleriniz için size özel panel, otomasyon ve entegrasyon.",
  title: "Hazır yazılım işinize uymuyorsa, size özel kuralım.",
  lead: "Elle yapılan, tekrar eden ya da birden fazla program arasında kaybolan işlerinizi dinliyor; işletmenize özel bir panel, otomasyon veya entegrasyonla çözüyoruz.",
  description:
    "Hazır yazılımların karşılamadığı işleriniz için işletmenize özel panel, otomasyon ve entegrasyon. Keşiften teslime, net kapsam ve fiyatla.",
  icon: "tool",
  screen: "ozel",
  pains: [
    "Aynı bilgiyi her gün üç farklı programa elle giriyoruz.",
    "Hiçbir hazır yazılım bizim işleyişimize tam uymuyor.",
    "Siparişleri, randevuları ya da talepleri WhatsApp yazışmalarından takip ediyoruz.",
  ],
  steps: [
    { t: "Keşif görüşmesi", d: "İşinizin nasıl yürüdüğünü ve nerede zaman kaybettiğinizi dinleriz. Ücretsizdir." },
    { t: "Yazılı öneri", d: "Kapsam, süre ve fiyat tek sayfada. Neyin yapılıp neyin yapılmayacağı baştan bellidir." },
    { t: "Kurulum ve destek", d: "Önce küçük bir pilotla başlar, sonra kullanıma alırız. Bakım ve destek devam eder." },
  ],
  features: [
    { icon: "layout", t: "Yönetim panelleri", d: "Sipariş, randevu, talep ya da saha işlerini takip ettiğiniz size özel ekranlar." },
    { icon: "trend", t: "Otomasyonlar", d: "Tekrar eden işler kendiliğinden yapılır: hatırlatma, rapor, bildirim." },
    { icon: "globe", t: "Entegrasyonlar", d: "Kullandığınız programları birbirine bağlar, aynı bilgiyi iki kez girmezsiniz." },
    { icon: "file", t: "Belge ve rapor", d: "Teklif, form ve raporlarınız tek tıkla, kendi şablonunuzla hazırlanır." },
  ],
  forWho: [
    "Elle yapılan, tekrar eden işleri olan işletmeler",
    "Birden fazla program arasında bilgi taşıyan ekipler",
    "Hazır yazılımların işleyişine uymadığı işletmeler",
  ],
  notFor: ["Hazır bir programın kolayca çözebileceği işler: bu durumda size o programı öneririz"],
  pricing: {
    label: "Proje teklifi",
    d: "Keşif görüşmesinden sonra kapsam, süre ve fiyatı yazılı olarak iletiriz. Fiyatı onaylamadan hiçbir işe başlamayız.",
  },
  faqs: [
    {
      q: "Keşif görüşmesi ücretli mi?",
      a: "Hayır. İlk görüşme ücretsizdir ve herhangi bir taahhüt doğurmaz.",
    },
    {
      q: "Yazılımın sahibi kim olur?",
      a: "Sahiplik ve kaynak kodun teslimi projeye göre sözleşmede açıkça yazılır; teklifte baştan belirtiriz.",
    },
    {
      q: "Küçük bir işletme için de yapıyor musunuz?",
      a: "Evet. Çoğu zaman küçük bir pilotla başlıyor, işe yaradığını gördükten sonra büyütüyoruz.",
    },
  ],
};

export const ALL_PRODUCTS: Product[] = [...PRODUCTS, CUSTOM_SOLUTION];

export const getProduct = (slug: string): Product | undefined => ALL_PRODUCTS.find((p) => p.slug === slug);

/** Ürün için iletişim formunun konusu önceden dolu gelir. */
export const contactHref = (p: Product): string => `/iletisim?konu=${encodeURIComponent(p.name)}`;

export const productWhatsAppText = (p: Product): string => `Merhaba, ${p.name} hakkında bilgi almak istiyorum.`;
