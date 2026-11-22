import type { MockData } from "@/lib/types";

/* ================= ÜRÜNLER =================
   Katalogdaki çekirdek ürünler. Metinler "Vitrinweb Kurumsal Ajans Sitesi Metinleri"
   belgesinden gelir. Ekranlar ve demolar örnek veridir. `status` yalnızca iç takip içindir;
   sahibinin isteğiyle sitede durum etiketi gösterilmez, tüm çağrılar "Bilgi Alın"dır. */

export type ProductStatus = "hazir" | "pilot" | "gelistiriliyor";
export type ProductCategory = "gorsel-web" | "reklam-musteri" | "stok-operasyon" | "belge-gorusme";
export type ArtKind = "gorsel" | "meta" | "depo" | "karne" | "web" | "gorusme" | "belge" | "asistan" | "musteri" | "kulup" | "influencer" | "ozel";

export const STATUS: Record<ProductStatus, { label: string; desc: string; button: string }> = {
  hazir: {
    label: "Kullanıma Hazır",
    desc: "İşletmenize uygun kurulum ve kullanım seçeneklerini planlayalım.",
    button: "Bilgi Alın",
  },
  pilot: {
    label: "Pilot Aşamasında",
    desc: "Çözümü işletmenizde tanımlı ve kontrollü bir kapsamla deneyimleyin.",
    button: "Pilot İçin Başvurun",
  },
  gelistiriliyor: {
    label: "Geliştiriliyor",
    desc: "Kullanıma açıldığında öncelikli olarak haberdar olmak için talebinizi bırakın.",
    button: "Öncelikli Erişim İsteyin",
  },
};

export const SAMPLE = {
  label: "Örnek Veri",
  desc: "Bu demodaki işletme, kayıt ve rakamlar gösterim amaçlıdır.",
  button: "Demoyu Deneyin",
};

export const CATEGORIES: { id: ProductCategory | "tumu"; label: string }[] = [
  { id: "tumu", label: "Tümü" },
  { id: "gorsel-web", label: "Görsel ve Web" },
  { id: "reklam-musteri", label: "Reklam ve Müşteri" },
  { id: "stok-operasyon", label: "Stok ve Operasyon" },
  { id: "belge-gorusme", label: "Belge ve Görüşme" },
];

export interface Step {
  t: string;
  d: string;
}

export interface Product {
  slug: string;
  name: string;
  icon: string;
  art: ArtKind;
  category: ProductCategory;
  status: ProductStatus;
  seoTitle: string;
  description: string;
  /** /urunler listesindeki kart metni. */
  listText: string;
  /** Ana sayfa ürün kartı metni (yalnızca öne çıkan üç ürün). */
  homeText?: string;
  linkLabel: string;
  title: string;
  lead: string;
  /** Hero'daki ikinci buton; demo bölümüne kaydırır. */
  secondary: string;
  caption?: string;
  alt: string;
  stepsTitle: string;
  steps: Step[];
  /** Özellik tablosu. */
  features?: { title: string; items: Step[] };
  /** Madde listesi (ör. "Neleri görebilirsiniz?"). */
  chips?: { title: string; intro?: string; items: string[] };
  /** Örnek çıktı satırları. */
  sample?: { title: string; lines: string[] };
  demoTitle: string;
  demoIntro: string;
  forWho: string;
  setup: { title: string; text: string };
  faqs: { q: string; a: string }[];
  closing: string;
  /** /bilgi-al not alanındaki örnek. */
  formExample: string;
  /** Diğer ürün önerileri. */
  related: string[];
}

export const PRODUCTS: Product[] = [
  {
    slug: "urun-gorsel-studyosu",
    name: "Ürün Görsel Stüdyosu",
    icon: "image",
    art: "gorsel",
    category: "gorsel-web",
    status: "hazir",
    seoTitle: "E-Ticaret İçin Ürün Görsel Stüdyosu | Vitrinweb",
    description:
      "Mevcut ürün fotoğraflarınızı e-ticaret, pazaryeri ve sosyal medya için arka planı, ışığı ve kadrajı standartlaştırılmış görsel setlere dönüştürün.",
    listText: "Mevcut ürün fotoğraflarınızı mağaza, pazaryeri ve reklam kanalları için tutarlı bir görsel sete dönüştürün.",
    homeText:
      "Mevcut ürün fotoğraflarınızı e-ticaret, pazaryeri ve sosyal medya standartlarına uygun, tutarlı görsel setlere dönüştürün.",
    linkLabel: "Görsel Stüdyosunu İnceleyin",
    title: "Ürününüz aynı. Görsel standardı satışa hazır.",
    lead: "Elinizdeki ürün fotoğraflarını paylaşın; ürünün rengini, dokusunu ve ayırt edici detaylarını koruyarak her satış kanalına uygun profesyonel görsel setler hazırlayalım.",
    secondary: "Görselleri Karşılaştırın",
    caption: "Aynı ürün, iki farklı kanal standardı.",
    alt: "Orijinal ürün fotoğrafı ile arka planı ve ışığı düzenlenmiş final görsel yan yana.",
    stepsTitle: "Görsel seti nasıl hazırlanır?",
    steps: [
      {
        t: "Fotoğrafları ve kanal hedeflerini paylaşın.",
        d: "Ürün adedini, yayınlanacak mecraları ve varsa marka stil referanslarınızı iletin.",
      },
      {
        t: "Örnek çalışmayı onaylayın.",
        d: "Seçilen bir ürün için hazırladığımız ışık, arka plan ve kadraj yönünü birlikte değerlendirelim.",
      },
      {
        t: "Final seti teslim alın.",
        d: "Onaylanan görsel dilde üretilen tüm görselleri kararlaştırılan ölçü ve dosya biçimlerinde eksiksiz teslim alın.",
      },
    ],
    features: {
      title: "Görsel setinde neler var?",
      items: [
        { t: "Sade ürün görseli", d: "Ürünü odağa alan temiz ve standart arka planlarla yüksek okunabilirlikli listeleme görselleri oluşturun." },
        { t: "Kullanım sahnesi", d: "Ürünün gerçek bağlamını ve ölçeğini hissettiren sahnelerle koleksiyon hikayenizi güçlendirin." },
        { t: "Koleksiyon bütünlüğü", d: "Aynı serideki tüm ürünlerde ışık, açı, kadraj ve renk dilini marka standartlarında tutarlı tutun." },
        { t: "Kanala özel çıktı", d: "Web sitesi, pazaryeri, reklam ve sosyal medya için gereken tüm en-boy oranlarını brief aşamasında belirleyin." },
        {
          t: "Teslim öncesi kalite kontrol",
          d: "Ürün formu, renk doğruluğu, etiket yazıları ve ambalaj detayları kaynak fotoğrafla birebir karşılaştırılır.",
        },
      ],
    },
    demoTitle: "Aynı ürünü farklı sahnelerde inceleyin.",
    demoIntro: "Sahne seçin, kaydırıcıyla orijinal ve işlenmiş görseli karşılaştırın.",
    forWho:
      "Kendi ürününü üreten veya satan markalar, butikler ve e-ticaret ekipleri için. Henüz fotoğrafı çekilmemiş ya da mevcut karelerinde kritik detayları seçilmeyen ürünler için çekim ihtiyacını kapsam görüşmesinde değerlendiririz.",
    setup: {
      title: "Görsel üretim kapsamını kataloğunuza göre şekillendirin.",
      text: "Proje kapsamı; ürün adedi, ürün başına görsel sayısı, sahne çeşitliliği ve çıktı ölçülerine göre belirlenir. Düzenli sezon veya katalog yenilemeleri için aylık teslim modeli planlayabiliriz.",
    },
    faqs: [
      {
        q: "Telefonla çekilmiş fotoğraflar yeterli olur mu?",
        a: "Ürün net, dengeli aydınlatılmış ve eksiksiz görünüyorsa başlangıç için değerlendirebiliriz. Eksik açı varsa hangi karelerin yeniden çekilmesi gerektiğini çekim notlarıyla paylaşırız.",
      },
      {
        q: "Ürün formu veya ambalaj detayları değişir mi?",
        a: "Çalışma arka plan, ışık ve kadraj düzenlemesi üzerine kuruludur. Renk, logo, etiket yazısı ve ürün geometrisi kaynak fotoğrafa sadık kalınarak kontrol edilir.",
      },
      {
        q: "Teslim süresi nasıl belirlenir?",
        a: "Ürün adedi ve sahne kapsamı netleştikten sonra kesin teslim takvimini yazılı olarak paylaşıyoruz.",
      },
      {
        q: "Revizyon hakkım bulunuyor mu?",
        a: "Revizyon turu sayısı ve kapsama giren düzenleme kriterleri teklif belgesinde açıkça yer alır.",
      },
    ],
    closing:
      "İlk üründen başlayarak kalite farkını birlikte görelim. Kullanacağınız kanalları ve mevcut fotoğrafınızı paylaşın, görsel yönü planlayalım.",
    formExample: "Mağazamızda listeleyeceğimiz 12 ürünün telefonla çekilmiş fotoğrafları hazır.",
    related: ["ai-influencer", "web-sitesi-paketi", "meta-reklam-paneli"],
  },
  {
    slug: "ai-influencer",
    name: "AI Influencer",
    icon: "instagram",
    art: "influencer",
    category: "reklam-musteri",
    status: "pilot",
    seoTitle: "Markanıza Özel AI Influencer ve Instagram Hesabı | Vitrinweb",
    description:
      "Markanız için yapay zekâ ile tasarlanan, kendi Instagram hesabı olan bir sanal karakter oluşturun; içerik takvimi, gönderiler ve aylık rapor dahil.",
    listText:
      "Markanıza özel, kendi Instagram hesabı olan ve yapay zekâ ile oluşturulduğu açıkça belirtilen bir sanal karakterle düzenli içerik yayınlayın.",
    homeText: "Markanız için yapay zekâ ile tasarlanan, kendi Instagram hesabı olan bir sanal karakterle her hafta düzenli içerik yayınlayın.",
    linkLabel: "AI Influencer'ı İnceleyin",
    title: "Markanızın kendi sanal yüzü, kendi Instagram hesabıyla.",
    lead: "Markanızın değerlerine göre bir yapay zekâ karakteri tasarlıyor; hesabını açıyor, içerik takvimini hazırlıyor ve onayınızla her hafta düzenli paylaşım yapıyoruz. Karakterin yapay zekâ ile oluşturulduğu her zaman açıkça belirtilir.",
    secondary: "Demoyu Deneyin",
    caption: "Örnek karakter profili · Örnek veri",
    alt: "Yapay zekâ ile oluşturulmuş örnek bir marka karakterinin Instagram profili, gönderi ızgarası ve haftalık içerik takvimi.",
    stepsTitle: "AI Influencer nasıl hayata geçer?",
    steps: [
      {
        t: "Karakteri birlikte tasarlayın.",
        d: "Hedef kitlenizden, marka tonunuzdan ve değerlerinizden yola çıkarak karakterin adını, kişiliğini, konuşma dilini, görsel kimliğini ve hiç girmeyeceği konuları içeren bir karakter kitabı hazırlarız.",
      },
      {
        t: "Görünümü ve hesabı onaylayın.",
        d: "Karakterin farklı açı ve ortamlarda tutarlı görünen görsel setini onayınıza sunarız. Instagram hesabı işletmeniz adına açılır; biz yalnızca yetkilendirilmiş iş ortağı olarak erişiriz.",
      },
      {
        t: "Takvime göre yayına başlayın.",
        d: "Aylık takvime göre gönderi, Reels ve hikâyeler hazırlanır; her içerik yayından önce onayınıza gelir. Ay sonunda erişim, etkileşim ve profil ziyaretlerini içeren raporu paylaşırız.",
      },
    ],
    features: {
      title: "AI Influencer çalışmasında neler var?",
      items: [
        {
          t: "Karakter kitabı",
          d: "Ad, yaş aralığı, kişilik, ses tonu, ilgi alanları, marka sınırları, yasaklı konular ve örnek cümlelerden oluşan, tüm içeriklerin dayandığı yazılı rehber.",
        },
        {
          t: "Tutarlı görsel kimlik",
          d: "Yüz hatları, saç, kıyafet tarzı ve renk paleti sabit kalır; karakter her gönderide aynı kişi olarak tanınır. Görünüm gerçek bir kişiye benzetilmez.",
        },
        {
          t: "Instagram hesabı ve profil",
          d: "Kullanıcı adı, biyografi, profil fotoğrafı, öne çıkan hikâye kapakları ve bağlantı alanı. Biyografide karakterin markanın yapay zekâ ile oluşturulmuş karakteri olduğu yazılır.",
        },
        {
          t: "İçerik üretimi",
          d: "Gönderi görselleri, kısa Reels videoları, hikâyeler ve açıklama metinleri. Ürünleriniz, rengi, logosu ve etiketi korunarak karakterin dünyasına yerleştirilir.",
        },
        {
          t: "Onaylı yayın takvimi",
          d: "Aylık takvim, içerik türleri ve paylaşım saatleri önceden planlanır; hiçbir içerik onayınız olmadan yayınlanmaz.",
        },
        {
          t: "Yorum ve mesaj akışı",
          d: "Yanıtların kimde olacağı kurulumda belirlenir; sık sorulara onaylı yanıt kalıpları hazırlanır. Sipariş, şikâyet, fiyat ve özel talepler her zaman ekibinize aktarılır.",
        },
        {
          t: "Aylık rapor",
          d: "Erişim, etkileşim, kaydetme, profil ziyareti ve bağlantı tıklamaları; hangi içerik türünün işe yaradığına dair önerilerle birlikte.",
        },
      ],
    },
    chips: {
      title: "Şeffaflık ve sınırlar",
      intro: "Sanal bir karakterin güven kazanması, gerçek bir insan gibi davranmamasına bağlıdır. Her hesapta şu kurallar geçerlidir:",
      items: [
        "Biyografide ve gerektiğinde gönderilerde karakterin yapay zekâ ile oluşturulduğu açıkça yazılır; Instagram'ın yapay zekâ etiketi kullanılır",
        "Karakter, ürünü gerçekten kullanmış bir müşteri gibi deneyim ya da yorum anlatmaz; ürün bilgisi markanın onayladığı kaynaktan gelir",
        "Gerçek bir kişinin yüzü, sesi veya kimliği taklit edilmez; ünlülere benzeyen görünüm kullanılmaz",
        "Takipçi, beğeni veya yorum satın alınmaz; büyüme içerik ve isteğe bağlı reklamla sağlanır",
        "Başka markalarla iş birliği içeriklerinde reklam olduğu açıkça belirtilir",
      ],
    },
    demoTitle: "Bir gönderiyi baştan sona hazırlayın.",
    demoIntro: "Karakterin tonunu ve içerik türünü seçin, taslak gönderiyi görün ve onay akışını deneyin.",
    forWho:
      "Ürünlerini sosyal medyada düzenli anlatmak isteyen ama her hafta çekim yapacak ekibi, mankeni ya da bütçesi olmayan markalar, e-ticaret işletmeleri ve yeni girişimler için. Yüzü olan ve hep aynı tonda konuşan bir marka karakteri; kozmetik, moda, yiyecek-içecek, ev-yaşam ve teknoloji ürünleri gibi görselle anlatılan kategorilere uyum sağlar.",
    setup: {
      title: "Kurulum ve aylık içerik planı",
      text: "Kurulum; karakter kitabını, görsel kimliği ve hesap hazırlığını kapsar. Sonrasında aylık plan, gönderi, Reels ve hikâye adedine göre belirlenir; ücret, teslim takvimi ve karakterin kullanım hakları yazılı teklifte yer alır. İçerikleri öne çıkarmak isterseniz Meta reklam kurulumunu ve raporlamasını da ekleyebiliriz.",
    },
    faqs: [
      {
        q: "AI influencer kullanmak yasal mı?",
        a: "Türkiye'de sosyal medyadaki ticari iletişimin kuralları Reklam Kurulu'nun sosyal medya etkileyicileri kılavuzunda yer alır; kılavuz, ürünler hakkında iletişimde sahte ya da var olmayan kimlikler kullanılmasını yasaklar. Bu yüzden karakteri gerçek bir kişi gibi sunmuyor, markanın yapay zekâ ile oluşturulmuş karakteri olduğunu açıkça belirtiyoruz. Sektörünüze özel kurallar için hukuk danışmanınızın görüşünü almanızı öneririz.",
      },
      {
        q: "Instagram hesabı kimin olur?",
        a: "Hesap işletmeniz adına açılır ve size aittir. Biz Meta Business Suite üzerinden iş ortağı olarak erişiriz; çalışma sona erdiğinde erişimimiz kaldırılır. Karakter tasarımının kullanım hakları teklif belgesinde yazılı olarak belirlenir.",
      },
      {
        q: "Karakter her gönderide aynı mı görünür?",
        a: "Evet. Onaylanan görsel kimlik tüm üretimlerde referans alınır ve her içerik yayından önce tutarlılık açısından kontrol edilir. Belirgin farklılık gösteren bir içerik yayınlanmaz, yeniden üretilir.",
      },
      {
        q: "Ürünlerim içeriklerde nasıl yer alır?",
        a: "Ürünlerinizin net fotoğraflarından yola çıkarak ürünü karakterin dünyasına yerleştiririz. Rengi, logosu, etiket yazısı ve biçimi kaynak fotoğrafa sadık kalır; ürün detayları onay aşamasında ayrıca kontrol edilir.",
      },
      {
        q: "Takipçi sayısı garanti ediyor musunuz?",
        a: "Hayır. Takipçi ve etkileşim; içeriğin kalitesine, paylaşım düzenine, sektöre ve isteğe bağlı reklam bütçesine göre değişir. Takipçi satın almıyoruz; aylık raporda gerçek verileri paylaşıyor ve içerik planını bu verilere göre güncelliyoruz.",
      },
      {
        q: "Yorumlara ve mesajlara kim yanıt veriyor?",
        a: "Kurulumda birlikte belirleriz: Yanıtları ekibiniz verebilir ya da onaylı yanıt kalıplarıyla biz destek olabiliriz. Sipariş, şikâyet, fiyat ve özel talepler her zaman ekibinize aktarılır.",
      },
    ],
    closing:
      "Markanızın hedef kitlesini ve öne çıkarmak istediğiniz ürünleri paylaşın; karakterin ilk taslağını ve örnek bir haftalık içerik planını birlikte değerlendirelim.",
    formExample: "Doğal kozmetik markamız için haftada 3 paylaşım yapacak, samimi tonda bir sanal karakter düşünüyoruz.",
    related: ["urun-gorsel-studyosu", "meta-reklam-paneli", "musteri-asistani"],
  },
  {
    slug: "meta-reklam-paneli",
    name: "Meta Reklam Paneli",
    icon: "trend",
    art: "meta",
    category: "reklam-musteri",
    status: "pilot",
    seoTitle: "Facebook ve Instagram Reklam Raporlama Paneli | Vitrinweb",
    description: "Meta reklam harcamasını, kampanya sonuçlarını ve sonuç başına maliyeti sade, karar odaklı bir yönetim panelinde izleyin.",
    listText: "Facebook ve Instagram reklamlarında harcamayı, hedef bazlı sonuçları ve birim maliyeti tek ekranda izleyin.",
    homeText:
      "Facebook ve Instagram reklam harcamalarınızı, kampanya sonuçlarınızı ve sonuç başına maliyeti karmaşadan uzak tek ekranda izleyin.",
    linkLabel: "Reklam Panelini İnceleyin",
    title: "Reklam bütçenizin karşılığını karmaşadan uzak tek ekranda okuyun.",
    lead: "Facebook ve Instagram kampanyalarınızın harcama tutarını, hesabınızda ölçülen sonuçları ve birim maliyetleri seçtiğiniz tarih aralığına göre net biçimde takip edin.",
    secondary: "Demoyu Deneyin",
    caption: "Haftalık reklam performans özeti · Örnek veri",
    alt: "Kampanya harcaması, toplam sonuç sayısı ve sonuç başına maliyet göstergeleri.",
    stepsTitle: "Panel nasıl çalışır?",
    steps: [
      {
        t: "Hesap ve metrik yapısını tanımlayın.",
        d: "Raporlanacak reklam hesaplarını, kampanya hedeflerini ve erişim izinlerini kurulumda belirleyin.",
      },
      {
        t: "Performansı tek ekrandan izleyin.",
        d: "Tarih aralığını seçin; harcama, sonuç ve maliyet metriklerini kampanya bazında karşılaştırın.",
      },
      {
        t: "Kritik değişimlerden haberdar olun.",
        d: "Bütçe eşiği uyarılarını ve haftalık özet bildirimlerini yönetim rutininize göre ayarlayın.",
      },
    ],
    features: {
      title: "Panelde neler var?",
      items: [
        { t: "Harcama takibi", d: "Seçili dönemdeki planlanan bütçe ile gerçekleşen harcama tutarını anlık izleyin." },
        { t: "Hedef bazlı sonuçlar", d: "Kampanya kurgunuza göre ölçülen mesaj, form veya satın alma sonuçlarını net biçimde görün." },
        { t: "Sonuç başına maliyet", d: "Ölçülebilen kampanyalarda tek bir sonuç için oluşan gerçek birim maliyeti karşılaştırın." },
        { t: "Dönemsel karşılaştırma", d: "Haftalık veya aylık performansları aynı metrik seti üzerinden kıyaslayın." },
        { t: "Bütçe eşiği uyarısı", d: "Etkinleştirildiğinde belirlediğiniz harcama sınırına ulaşıldığında bildirim alın." },
        { t: "Haftalık özet", d: "Tercih ettiğinizde ve özellik etkinse temel performans rakamlarını WhatsApp özetiyle takip edin." },
      ],
    },
    demoTitle: "Haftalık reklam performansı nasıl görünüyor?",
    demoIntro: "Tarih aralığını ve kampanyayı değiştirin; harcama, sonuç ve maliyet metriklerinin nasıl güncellendiğini görün.",
    forWho:
      "Aktif Facebook ve Instagram kampanyalarını düzenli izleyen işletme yöneticileri ve müşterilerine yalın rapor sunmak isteyen ajanslar için. Reklam kampanyası kurulumu ve yönetimi ihtiyacınız varsa görüşmede ayrı kapsam olarak planlayabiliriz.",
    setup: {
      title: "Kurulum ve kullanım",
      text: "Bağlanacak hesap sayısını, rapor metriklerini, destek kapsamını ve bildirim tercihlerinizi birlikte yapılandıralım.",
    },
    faqs: [
      {
        q: "Reklam kampanyalarını kim yönetir?",
        a: "Bu ürün raporlama ve performans takibi odaklıdır. Kampanya kurulumu, kreatif ve bütçe yönetimi hesabınızı yöneten ekip tarafından sürdürülür.",
      },
      {
        q: "Paneldeki veriler doğrudan satış sayımla birebir örtüşür mü?",
        a: "Panel, Meta reklam hesabında ölçümlenen verileri yansıtır. Gerçekleşen sipariş veya mağaza cirolarıyla karşılaştırma için işletme içi satış kayıtlarının birlikte değerlendirilmesi gerekir.",
      },
      {
        q: "Birden fazla reklam hesabını bağlayabilir miyiz?",
        a: "Hesap sayısı ve yetki yapısı kurulum aşamasında planlanır; bağlantı gerekli hesap izinlerinin tanımlanmasına bağlıdır.",
      },
      {
        q: "Rapor dışa aktarımı ve abonelik iptali nasıl ilerler?",
        a: "Teslim edilebilir rapor formatları ve abonelik sonlandırma koşulları yazılı kapsam belgesinde açıkça belirtilir.",
      },
    ],
    closing:
      "Haftalık reklam özetinizde ilk bakışta hangi üç metriği görmek istersiniz? Hesap yapınızı paylaşın, panel kurgusunu birlikte değerlendirelim.",
    formExample: "Instagram reklamlarımızın harcama ve gelen mesaj performansını haftalık izlemek istiyoruz.",
    related: ["urun-gorsel-studyosu", "musteri-bulma", "depo-takibi"],
  },
  {
    slug: "depo-takibi",
    name: "Depo Takibi",
    icon: "scan",
    art: "depo",
    category: "stok-operasyon",
    status: "pilot",
    seoTitle: "Barkodlu Depo ve Stok Takibi Sistemi | Vitrinweb",
    description:
      "Mobil cihazınızla barkod okutun, depo giriş-çıkış hareketlerini anlık kaydedin, kritik stokları ve işlem geçmişini kolayca yönetin.",
    listText: "Barkodla ürün bulun, giriş-çıkış hareketlerini kaydedin ve kritik stokları anlık yönetin.",
    homeText:
      "Barkod okutarak ürün giriş ve çıkışlarını telefonunuzdan kaydedin, kritik stok seviyesine inen ürünleri anında görün.",
    linkLabel: "Depo Takibini İnceleyin",
    title: "Hangi üründen ne kadar kaldığını telefonunuzdan anlık yönetin.",
    lead: "Barkod okutarak ürüne saniyeler içinde ulaşın, giriş ve çıkış hareketlerini yerinde kaydedin, kritik seviyeye yaklaşan ürünleri tek listeden takip edin.",
    secondary: "Stok Demosunu Deneyin",
    caption: "Barkod tarama ve kritik stok ekranı · Örnek veri",
    alt: "Mobil stok çıkış formu ve kritik stok seviyesinin altındaki ürünler listesi.",
    stepsTitle: "Depo takibi nasıl çalışır?",
    steps: [
      { t: "Ürün kataloğunuzu tanımlayın.", d: "Barkod, ürün kodu, mevcut stok adedi ve kritik stok eşiklerini sisteme aktarın." },
      {
        t: "Hareketi deponun içinde kaydedin.",
        d: "Ürünün barkodunu telefonla okutun, giriş veya çıkış işlemini seçip adedi onaylayın.",
      },
      {
        t: "Stok ve geçmişi anlık izleyin.",
        d: "Hareket kayıtlarını, kritik stok listesini ve Excel uyumlu raporlarınızı tek ekrandan yönetin.",
      },
    ],
    features: {
      title: "Depo takibinde neler var?",
      items: [
        { t: "Barkodla hızlı erişim", d: "Ürün kodunu elle aramaya gerek kalmadan kamerayla ilgili ürün kartını açın." },
        { t: "Giriş ve çıkış kayıtları", d: "Depoya giren ve çıkan tüm adetleri zaman damgalı ayrı hareketler olarak kaydedin." },
        { t: "Kritik stok takibi", d: "Belirlediğiniz alt sınırın altına düşen ürünleri otomatik önceliklendirilmiş listede görün." },
        { t: "Hareket geçmişi", d: "Her ürünün ne zaman, hangi yönde ve kaç adet işlem gördüğünü geriye dönük inceleyin." },
        { t: "Excel dışa aktarım", d: "Güncel stok listesini ve hareket dökümlerini Excel’de açılabilir formatta dışa aktarın." },
      ],
    },
    demoTitle: "Bir stok çıkışı kaydedin.",
    demoIntro: "Örnek üründen çıkış yapın; kalan stok ve kritik seviye uyarısını anında görün.",
    forWho:
      "Stoklarını hâlâ Excel tabloları veya defterle takip eden mağaza, toptancı, atölye ve e-ticaret operasyonları için. Çoklu depo yönetimi, muhasebe entegrasyonu veya pazaryeri senkronizasyonu ihtiyaçlarınızı teklif öncesinde ayrıca kapsamlandırıyoruz.",
    setup: {
      title: "Kurulum ve kullanım",
      text: "Başlangıç ürün listenizi, kullanıcı rollerini ve takip edeceğiniz hareket türlerini kurulum öncesi netleştiriyoruz.",
    },
    faqs: [
      {
        q: "Mevcut Excel listemle geçiş yapabilir miyim?",
        a: "Mevcut tablonuzu inceliyor; doğrudan aktarılabilecek sütunları ve tamamlanması gereken alanları sizinle paylaşıyoruz.",
      },
      {
        q: "Barkodu olmayan ürünleri sisteme ekleyebilir miyim?",
        a: "Ürün koduyla takip yapısını kurulumda planlayabiliriz. Kullanılacak etiketleme ve tarama yöntemi kapsam belgesinde belirlenir.",
      },
      {
        q: "Kritik stok uyarısı nasıl çalışır?",
        a: "Ürün bazında tanımladığınız eşik değere göre tetiklenir. Eşik değerleri satış hızınıza ve tedarik sürenize göre dilediğiniz gibi güncelleyebilirsiniz.",
      },
      {
        q: "Verilerimi istediğim zaman dışa aktarabilir miyim?",
        a: "Dışa aktarım kapsamı ve dosya formatları teklif ve kapsam belgesinde açıkça tanımlanır.",
      },
    ],
    closing:
      "Mevcut stok tablonuzla hızlı bir başlangıç yapalım. Ürün sayınızı ve günlük depo hareketlerinizi paylaşın, kurulum planını çıkaralım.",
    formExample: "Yaklaşık 200 ürünü Excel’de takip ediyoruz; depo çıkışlarını telefonla kaydetmek istiyoruz.",
    related: ["belge-okuma", "urun-gorsel-studyosu", "meta-reklam-paneli"],
  },
  {
    slug: "google-haritalar-karnesi",
    name: "Google Haritalar Karnesi",
    icon: "pin",
    art: "karne",
    category: "reklam-musteri",
    status: "gelistiriliyor",
    seoTitle: "Google İşletme Profili Karnesi | Vitrinweb",
    description:
      "İşletmenizin Google İşletme Profilindeki çalışma saatleri, kategoriler, iletişim bilgileri ve yorum temalarını kapsamlı bir karneyle denetleyin.",
    listText: "Google İşletme Profilinizde müşterilerin gördüğü bilgileri denetleyin, öncelikli iyileştirme alanlarını belirleyin.",
    linkLabel: "Örnek Karneyi İnceleyin",
    title: "Müşteriler Google’da sizi aradığında nasıl bir izlenim ediniyor?",
    lead: "İşletmenizin Google profilini detaylı biçimde inceleyelim. Eksik, tutarsız veya güncel olmayan alanları belirleyip öncelikli aksiyon planınızı net bir karneyle sunalım.",
    secondary: "Örnek Karneyi İnceleyin",
    caption: "Profil tutarlılığı kontrolü · Örnek veri",
    alt: "Kurgusal bir işletme için iletişim bilgileri, çalışma saatleri ve profil tutarlılığı kontrol ekranı.",
    stepsTitle: "Karne nasıl hazırlanır?",
    steps: [
      { t: "İşletme profilinizi paylaşın.", d: "İncelenecek profil bağlantısını ve temel hizmet alanlarınızı iletin." },
      {
        t: "Kapsamlı profil denetimi yapalım.",
        d: "Kategori doğruluğu, çalışma saatleri, iletişim bağlantıları, görsel kalitesi ve kapsam uygunsa yorum temalarını inceleyelim.",
      },
      {
        t: "Öncelikli aksiyon listenizi alın.",
        d: "Hangi alanların acilen güncellenmesi gerektiğini ve nereden başlamanız gerektiğini tek raporda görün.",
      },
    ],
    chips: {
      title: "Karnede neler yer alır?",
      items: [
        "Profil bilgi tutarlılığı",
        "Ana ve ek hizmet kategorileri",
        "Güncel çalışma saatleri",
        "Web sitesi ve iletişim bağlantıları",
        "Profil görsel standardı",
        "Müşteri yorumlarında öne çıkan temalar",
      ],
    },
    demoTitle: "Örnek karneyi inceleyin.",
    demoIntro: "İlçe ve kategori seçimi, gösterim amaçlı kurgusal örnekleri değiştirir.",
    forWho:
      "Google görünürlüğünü profesyonelce denetlemek isteyen yerel işletmeler ve yetkili ekipler için. Çok şubeli yapılarda kapsamı şube sayısına göre planlıyoruz.",
    setup: {
      title: "Kapsam",
      text: "Tek şube için kapsamlı karne hazırlayabilir veya çok şubeli işletmeler için dönemsel takip modeli kurabiliriz. Profil düzenleme desteğini ayrıca planlayabiliriz.",
    },
    faqs: [
      {
        q: "Google hesap şifremi paylaşmam gerekiyor mu?",
        a: "Hayır. Erişim gerektiren çalışmalarda şifre paylaşımı olmadan yetkilendirme adımlarını size iletiyoruz.",
      },
      {
        q: "Karne sonrasında sıralamam garantili olarak yükselir mi?",
        a: "Karne, profilinizdeki eksikleri ve iyileştirme önceliklerini görünür kılar. Google arama sıralaması ve görüntülenme performansı platform algoritmalarına bağlı olduğundan sonuç garantisi verilmez.",
      },
      {
        q: "Rapordaki güncellemeleri kim uygular?",
        a: "İsterseniz kendi ekibiniz karne üzerinden ilerleyebilir; profil düzenleme ve optimizasyon desteğini bizim yürütmemizi isterseniz kapsamı buna göre belirleyebiliriz.",
      },
    ],
    closing: "Müşterilerinizin Google’da karşılaştığı ilk izlenimi birlikte gözden geçirelim.",
    formExample: "İki şubemizin Google profilindeki çalışma saatleri ve iletişim bilgilerini denetlemek istiyoruz.",
    related: ["web-sitesi-paketi", "musteri-bulma", "musteri-asistani"],
  },
  {
    slug: "web-sitesi-paketi",
    name: "Web Sitesi Paketi",
    icon: "globe",
    art: "web",
    category: "gorsel-web",
    status: "hazir",
    seoTitle: "İşletmeler İçin Kurumsal Web Sitesi Paketi | Vitrinweb",
    description: "Mobil uyumlu, hızlı ve kurumsal kimliğinizi yansıtan web sitesi paketimizi ve ek özellik seçeneklerini inceleyin.",
    listText: "Hizmetlerinizi, konumunuzu ve iletişim kanallarınızı modern, mobil uyumlu bir kurumsal sitede yayınlayın.",
    linkLabel: "Web Sitesi Paketini İnceleyin",
    title: "Müşterilerinize güven veren, modern bir kurumsal web sitesi.",
    lead: "Hizmetlerinizi net biçimde sergileyin, adres ve iletişim bilgilerinize erişimi kolaylaştırın. Kapsamı, takvimi ve teslimatları baştan belli bir süreçle yayına geçin.",
    secondary: "Örnek Siteleri İnceleyin",
    caption: "Mobil ve masaüstü görünüm · Örnek tasarım",
    alt: "Örnek bir işletme web sitesinin mobil ve masaüstü görünümü.",
    stepsTitle: "Web siteniz nasıl hazırlanır?",
    steps: [
      {
        t: "İşletmenizi ve hedeflerinizi paylaşın.",
        d: "Faaliyet alanınızı ve ziyaretçilerinizin sitenizde ilk bakışta ne görmesini istediğinizi belirleyelim.",
      },
      {
        t: "Sayfa mimarisini ve ek özellikleri netleştirin.",
        d: "Hizmet sayfaları, katalog, blog veya randevu gibi ihtiyaçları birlikte planlayalım.",
      },
      {
        t: "İçeriklerinizi iletin ve yayına hazırlanalım.",
        d: "Onay sonrasında logo, görsel ve hizmet metinlerinizi proje başlangıç formundan güvenle paylaşın.",
      },
    ],
    chips: {
      title: "Paket kapsamında neler var?",
      intro:
        "Alan adı, barındırma, bakım, teslim süresi ve revizyon koşulları yazılı kapsam belgesinde şeffaf biçimde sunulur.",
      items: [
        "Kurumsal kimliğinize uygun mobil uyumlu web sitesi",
        "Hizmet ve iletişim bilgilerinize özel yapılandırılmış sayfalar",
        "Hızlı iletişim bağlantıları",
        "Yayına alma desteği",
      ],
    },
    demoTitle: "Örnek siteleri inceleyin.",
    demoIntro: "Bu ön izlemedeki işletme ve içerikler gösterim amacıyla hazırlanmıştır.",
    forWho:
      "İlk kurumsal web sitesini hayata geçiren, mevcut sitesini modern standartlara taşıyan veya hizmetlerini düzenli bir yapıda sunmak isteyen işletmeler için. Kapsamlı e-ticaret altyapıları ve özel sistem entegrasyonları ayrı proje olarak tekliflendirilir.",
    setup: {
      title: "Ek seçenekler",
      text: "İhtiyaç duyduğunuz ek özellikleri bilgi formunda işaretleyin; sitenizin mimarisine en uygun kurguyu birlikte planlayalım.",
    },
    faqs: [
      {
        q: "Mevcut alan adımı kullanabilir miyim?",
        a: "Evet. Alan adı sağlayıcınızı ve erişim durumunuzu paylaşmanız yeterli; yönlendirme ve kurulum adımlarını birlikte planlıyoruz.",
      },
      {
        q: "Metin ve görselleri nasıl ileteceğim?",
        a: "Çalışma onaylandıktan sonra size özel açılan proje başlangıç formundan tüm içeriklerinizi yükleyebilirsiniz. Henüz hazır olmayan içerikleri formda not düşebilirsiniz.",
      },
      {
        q: "Yıllık bakım ve barındırma nasıl işliyor?",
        a: "Barındırma, teknik bakım ve içerik güncelleme koşulları çalışmaya başlamadan önce yazılı kapsam belgesinde paylaşılır.",
      },
      {
        q: "Sitemi ileride büyütebilir miyim?",
        a: "Evet. Blog, ürün kataloğu veya ek dil gibi ihtiyaçlarınız doğduğunda mevcut altyapıya uygun genişleme planını birlikte çıkarabiliriz.",
      },
    ],
    closing: "Markanızı dijitalde doğru temsil eden bir yapı kuralım. İhtiyaçlarınızı paylaşın, size özel kapsamı netleştirelim.",
    formExample: "Mevcut alan adımız var; hizmetlerimizi ve randevu kanalımızı sunan modern bir site istiyoruz.",
    related: ["urun-gorsel-studyosu", "google-haritalar-karnesi", "musteri-asistani"],
  },
  {
    slug: "gorusme-ozeti",
    name: "Görüşme Özeti",
    icon: "mic",
    art: "gorusme",
    category: "belge-gorusme",
    status: "gelistiriliyor",
    seoTitle: "Satış Görüşmesi Kaydını Özetleme | Vitrinweb Görüşme Özeti",
    description:
      "Satış görüşmesi kayıtlarını metne dönüştürün; müşteri taleplerini, alınan kararları ve sonraki aksiyonları ekibinizle net biçimde takip edin.",
    listText:
      "Satış görüşmelerinin kaydını metne dönüştürün; kararları, açık soruları ve aksiyon adımlarını tek özette toplayın.",
    linkLabel: "Görüşme Özetini İnceleyin",
    title: "Görüşme bittiğinde kararlar ve aksiyonlar net kalsın.",
    lead: "Satış görüşmelerinin kaydını yazıya dökün; müşterinin beklentilerini, alınan kararları ve kimin hangi adımı üstlendiğini tek ve düzenli bir özette toplayın.",
    secondary: "Örnek Özeti İnceleyin",
    caption: "Konuşma dökümü ve yapılandırılmış özet · Örnek görüşme",
    alt: "Bir satış görüşmesinin metin dökümü ile yanında müşteri taleplerini, açık soruları ve sonraki adımları gösteren özet ekranı.",
    stepsTitle: "Görüşme özeti nasıl oluşur?",
    steps: [
      {
        t: "Yetkili görüşme kaydını yükleyin.",
        d: "Katılımcıların bilgilendirildiği ve paylaşım yetkisine sahip olduğunuz ses kaydını sisteme aktarın.",
      },
      {
        t: "Metin ve yapılandırılmış özeti alın.",
        d: "Konuşma dökümüyle birlikte talepler, kararlar ve aksiyon adımlarını içeren düzenli bir taslak oluşur.",
      },
      {
        t: "Kontrol edip ekibinizle paylaşın.",
        d: "Özel isimleri, rakamları ve taahhüt içeren maddeleri gözden geçirin; doğrulanan özeti takibe alın.",
      },
    ],
    chips: {
      title: "Neleri görebilirsiniz?",
      items: ["Konuşma dökümü", "Görüşme özeti", "Müşteri talepleri", "Alınan kararlar", "Açık sorular", "Sonraki aksiyonlar"],
    },
    sample: {
      title: "Örnek çıktı",
      lines: [
        "Talep: Ürün listesi haftalık güncellensin.",
        "Açık soru: Listeyi kim onaylayacak?",
        "Sonraki adım: Örnek listeyi ekip incelemesine gönderin.",
      ],
    },
    demoTitle: "Örnek bir görüşmeyi inceleyin.",
    demoIntro: "Konuşma dökümünü, özeti ve sonraki adımları sekmeler arasında karşılaştırın.",
    forWho:
      "Yoğun satış görüşmeleri yürüten işletme yöneticileri, müşteri ilişkileri ekipleri ve keşif toplantıları yapan ajanslar için.",
    setup: {
      title: "Kurulum",
      text: "Ses dosyası formatlarını, konuşma dilini, özet şablonunu ve kayıt saklama koşullarını kurulum görüşmesinde netleştiriyoruz.",
    },
    faqs: [
      {
        q: "Toplantılara otomatik olarak katılıyor mu?",
        a: "Bu ürünün standart akışı, paylaşmaya yetkili olduğunuz kaydı yüklemenizle başlar. Otomatik toplantı entegrasyonu ihtiyacınız varsa ayrıca değerlendiririz.",
      },
      {
        q: "Özette hata oluşabilir mi?",
        a: "Ses netliği, üst üste konuşmalar ve özel terimler çıktıyı etkileyebilir. Müşteriye veya ekibe iletilecek metinlerin önce kontrol edilmesi önerilir.",
      },
      {
        q: "Kayıtlar nerede ve nasıl saklanır?",
        a: "Kullanılan altyapı, erişim yetkileri ve saklama süreleri çalışma başlamadan önce yazılı olarak paylaşılır.",
      },
    ],
    closing:
      "Satış görüşmelerinizde gözden kaçmasını istemediğiniz kritik bilgileri paylaşın, size uygun özet akışını planlayalım.",
    formExample: "Satış görüşmelerindeki talepleri ve sonraki adımları ekip için düzenli özetlemek istiyoruz.",
    related: ["belge-okuma", "musteri-asistani", "musteri-bulma"],
  },
  {
    slug: "belge-okuma",
    name: "Belge Okuma",
    icon: "file",
    art: "belge",
    category: "belge-gorusme",
    status: "gelistiriliyor",
    seoTitle: "Fatura ve Formlardan Veri Çıkarma | Vitrinweb Belge Okuma",
    description:
      "PDF, fotoğraf ve taranmış belgelerden ihtiyacınız olan alanları çıkarın; ekip onayıyla tablolarınıza ve iş akışlarınıza aktarın.",
    listText: "Fatura, irsaliye, form ve sözleşmelerden kritik alanları çıkarın; ekip onayıyla kayıtlarınıza aktarın.",
    linkLabel: "Belge Okumayı İnceleyin",
    title: "Belgelerdeki veriyi tek tek elle girmeden kayda alın.",
    lead: "Fatura, irsaliye, başvuru formu veya sözleşmelerde takip ettiğiniz alanları hızla çıkarın. Kontrol adımından geçirerek kullandığınız tabloya veya iş akışına aktarın.",
    secondary: "Örnek Belgeyi İnceleyin",
    caption: "Kaynak belge ve çıkarılan alanlar · Örnek veri",
    alt: "Örnek irsaliye belgesi ile yanında çıkarılan tarih, ürün kodu ve miktar alanları.",
    stepsTitle: "Belge okuma nasıl çalışır?",
    steps: [
      { t: "Belge türünü ve alanları tanımlayın.", d: "Okunacak dosya tipini ve çekmek istediğiniz veri alanlarını belirleyin." },
      {
        t: "Alanları otomatik taslağa alın.",
        d: "Belge numarası, tarih, ürün kodu, miktar veya form yanıtlarını yapılandırılmış taslakta görün.",
      },
      {
        t: "Doğrulayın ve aktarın.",
        d: "İşaretlenen alanları kaynak belgeyle karşılaştırıp onaylayın; kayıtları hedef tablo veya sistem için hazır hâle getirin.",
      },
    ],
    chips: {
      title: "Kullanım senaryoları",
      items: [
        "İrsaliyeden stok giriş taslağı",
        "Faturadan belge numarası ve tarih",
        "Başvuru formundan seçili alanlar",
        "Sözleşmeden taraf adı ve tarih bilgisi",
      ],
    },
    demoTitle: "İrsaliyeden veri okuyun.",
    demoIntro: "Kaynak irsaliye ile otomatik çıkarılan ürün kodu ve adet alanlarını yan yana görün, işaretli alanı düzeltip kaydı onaylayın.",
    forWho:
      "Aynı belge tiplerinden düzenli olarak manuel veri girişi yapan depo, operasyon, idari işler ve ön muhasebe ekipleri için.",
    setup: {
      title: "Kurulum",
      text: "Örnek belgeleriniz üzerinden okunacak alanları, onay mekanizmasını ve aktarım yapılacak sistemi birlikte planlıyoruz.",
    },
    faqs: [
      {
        q: "Telefonla çekilmiş belge fotoğraflarını okuyabilir mi?",
        a: "Fotoğrafın net olması ve belgenin eksiksiz kadrajlanması önemlidir. Örnek belgeleriniz üzerinden uygun formatı test ederek belirliyoruz.",
      },
      {
        q: "Muhasebe veya stok kaydı doğrudan otomatik mi açılır?",
        a: "Veri aktarımı ve kayıt oluşturma adımları, seçilen entegrasyon yapısına ve ekip onay kuralına göre planlanır.",
      },
      {
        q: "Sözleşmelerde hangi bilgileri çıkarabilir?",
        a: "Taraf adı, tarih veya belirli madde başlıkları gibi tanımlı alanları çıkarabilir. Hukuki değerlendirme ve yorum için mutlaka hukuk uzmanına başvurulmalıdır.",
      },
    ],
    closing: "Ekibinizin en sık elle işlediği belge türünü paylaşın; hangi alanları hızlandırabileceğimizi birlikte inceleyelim.",
    formExample: "İrsaliyelerdeki ürün kodu ve adet bilgilerini her gün elle sisteme giriyoruz.",
    related: ["depo-takibi", "gorusme-ozeti", "musteri-asistani"],
  },
  {
    slug: "musteri-asistani",
    name: "Müşteri Asistanı",
    icon: "chat",
    art: "asistan",
    category: "reklam-musteri",
    status: "gelistiriliyor",
    seoTitle: "Onaylı Kaynaklarla Yanıt Veren Müşteri Asistanı | Vitrinweb",
    description:
      "Sık sorulan müşteri sorularını kurumunuzun onaylı bilgi kaynaklarıyla yanıtlayın, özel talepleri kesintisiz biçimde ekibinize aktarın.",
    listText: "Müşteri sorularını kurumunuzun onaylı bilgi kaynaklarıyla yanıtlayın, özel talepleri ekibinize aktarın.",
    linkLabel: "Müşteri Asistanını İnceleyin",
    title: "Müşteriniz sorsun, asistanınız onaylı bilgilerinizle yanıtlasın.",
    lead: "Teslimat, kullanım koşulları, çalışma saatleri ve sık sorulan konularda yalnızca kurumunuzun onayladığı kaynaklardan yararlanan bir müşteri asistanı kurun. Ekibinize devredilecek konuları baştan tanımlayın.",
    secondary: "Örnek Konuşmayı Görün",
    caption: "Onaylı kaynaktan yanıt ve ekibe devir · Örnek konuşma",
    alt: "Müşteri asistanının çalışma saatlerini yanıtladığı ve özel bir talebi müşteri ekibine aktardığı örnek sohbet ekranı.",
    stepsTitle: "Asistan nasıl kurulur?",
    steps: [
      {
        t: "Onaylı bilgi kaynaklarını derleyin.",
        d: "Güncel hizmet bilgilerini, ürün rehberlerini ve sık sorulan soruları sisteme tanımlayın.",
      },
      {
        t: "Yanıt ve devir sınırlarını çizin.",
        d: "Asistanın hangi soruları doğrudan yanıtlayacağını, hangi durumlarda ekibinize yönlendirme yapacağını belirleyin.",
      },
      {
        t: "Gerçek senaryolarla test edin.",
        d: "Yayına almadan önce yanıt tonunu, doğruluğunu ve ekibe devir akışını birlikte doğrulayın.",
      },
    ],
    chips: {
      title: "Kapsam unsurları",
      items: [
        "Onaylı belge ve sayfalar",
        "Sık sorulan sorular",
        "Bilgi güncelleme akışı",
        "Ekibe devir kuralları",
        "Kapsama göre web veya WhatsApp bağlantısı",
      ],
    },
    demoTitle: "Örnek konuşmayı deneyin.",
    demoIntro: "Hazır sorulardan birini seçin; asistanın onaylı kaynaktan nasıl yanıt verdiğini ve ne zaman ekibe aktardığını görün.",
    forWho:
      "Benzer müşteri sorularına her gün düzenli yanıt veren mağaza, e-ticaret ve hizmet işletmeleri için. Kurulum için güncel ve onaylı bilgi dokümanları ile devredilen talepleri karşılayacak bir iletişim kanalı gerekir.",
    setup: {
      title: "Kurulum",
      text: "Yayın kanalını, onaylı kaynakları, devir akışını ve içerik güncellemelerinden sorumlu rolü kurulumda birlikte belirliyoruz.",
    },
    faqs: [
      {
        q: "Asistan müşteriye özel söz veya fiyat verebilir mi?",
        a: "Hayır. Asistan yalnızca onayladığınız kaynaklardaki bilgileri aktarır. Özel fiyat, istisna, taahhüt ve karar gerektiren tüm talepler ekibinize yönlendirilir.",
      },
      {
        q: "İşletme bilgilerimiz değiştiğinde ne olur?",
        a: "Kaynak güncelleme ve yanıt doğrulama sürecini kurulum aşamasında net bir rutin olarak planlıyoruz.",
      },
      {
        q: "WhatsApp üzerinde çalışabilir mi?",
        a: "Hedef kanal ve hesap bağlantısı gereksinimlerini kurulum öncesinde teknik olarak değerlendiriyoruz.",
      },
    ],
    closing: "Müşterilerinizin en sık sorduğu üç soruyla başlayalım; asistan kurgunuzu birlikte planlayalım.",
    formExample: "Teslimat ve ürün kullanımıyla ilgili sık soruları onaylı belgelerimizden yanıtlamak istiyoruz.",
    related: ["gorusme-ozeti", "belge-okuma", "web-sitesi-paketi"],
  },
  {
    slug: "musteri-bulma",
    name: "Müşteri Bulma",
    icon: "target",
    art: "musteri",
    category: "reklam-musteri",
    status: "pilot",
    seoTitle: "B2B Potansiyel Müşteri Araştırma ve Takip Aracı | Vitrinweb",
    description:
      "Hedef müşteri kriterlerinizi belirleyin, kullanım yetkiniz olan işletme kayıtlarını sınıflandırın ve satış ekibinizin takip sürecini düzenleyin.",
    listText:
      "Hedef müşteri ölçütlerinizi belirleyin; kullanım yetkiniz olan kayıtları sınıflandırıp satış ekibiniz için düzenli takip listesi oluşturun.",
    linkLabel: "Müşteri Bulmayı İnceleyin",
    title: "Satış ekibiniz kiminle, neden görüşeceğini net biçimde bilsin.",
    lead: "İşletme kayıtlarını hedef sektör, bölge ve hizmet ihtiyacı kriterlerine göre değerlendirin. Uygun potansiyel müşterileri ekibinizin düzenli takip edebileceği tek bir çalışma listesinde toplayın.",
    secondary: "Örnek Listeyi İnceleyin",
    caption: "Filtrelenmiş satış takip listesi · Örnek veri",
    alt: "Sektör ve bölge kriterlerine göre filtrelenmiş kurgusal işletmelerden oluşan satış takip listesi.",
    stepsTitle: "Müşteri bulma nasıl çalışır?",
    steps: [
      { t: "Hedef profili tanımlayın.", d: "Odaklanmak istediğiniz sektör, bölge ve işletme niteliklerini belirleyin." },
      {
        t: "Kayıtları sınıflandırın.",
        d: "Kullanım yetkisine sahip olduğunuz kaynaklar veya kendi mevcut listeniz üzerinden kayıtları önceliklendirin.",
      },
      {
        t: "Satış takibini planlayın.",
        d: "Ekipçe seçilen kayıtları, sorumlu kişiyi ve sonraki temas adımını tek listeden yönetin.",
      },
    ],
    chips: {
      title: "Listede neler yer alır?",
      items: ["Sektör", "Bölge", "Kaynak", "Öncelik", "Sorumlu", "Sonraki Adım"],
    },
    demoTitle: "B2B satış listesini filtreleyin.",
    demoIntro: "Kurgusal işletmeleri sektör, bölge ve öncelik kriterlerine göre filtreleyin.",
    forWho:
      "Potansiyel müşteri araştırmasını sistematik hâle getirmek isteyen B2B satış ekipleri, hizmet sağlayıcılar ve iş geliştirme yöneticileri için.",
    setup: {
      title: "Kurulum",
      text: "Hedef müşteri kriterlerinizi, kullanılacak veri kaynaklarını ve takip sorumluluklarını kurulum görüşmesinde planlıyoruz.",
    },
    faqs: [
      {
        q: "Kendi mevcut listemi kullanabilir miyim?",
        a: "Mevcut listenizin yapısını ve hangi alanların sınıflandırmada kullanılabileceğini birlikte değerlendiriyoruz.",
      },
      {
        q: "Sistem otomatik mesaj veya e-posta gönderir mi?",
        a: "Bu ürün araştırma, değerlendirme ve ekip içi satış takibi kapsamındadır. İletişim kararı ve kanal seçimi tamamen ekibinize aittir.",
      },
      {
        q: "Google Haritalar Karnesi ile farkı nedir?",
        a: "Müşteri Bulma, satış ekibinizin potansiyel müşteri araştırmasını ve takibini düzenler. Google Haritalar Karnesi ise kendi işletme profilinizde müşterilerin gördüğü bilgileri denetler.",
      },
    ],
    closing:
      "Hedeflediğiniz işletmelerin ortak özelliklerini paylaşın; satış takip yapınızı nasıl sadeleştirebileceğimizi birlikte inceleyelim.",
    formExample: "Satış ekibimizin elindeki işletme listesini sektör ve bölgeye göre sınıflandırmak istiyoruz.",
    related: ["meta-reklam-paneli", "gorusme-ozeti", "google-haritalar-karnesi"],
  },
  {
    slug: "kulup-takip",
    name: "Kulüp Takip",
    icon: "ball",
    art: "kulup",
    category: "stok-operasyon",
    status: "gelistiriliyor",
    seoTitle: "Futbol Kulübü Yönetim Yazılımı | Kulüp Takip | Vitrinweb",
    description:
      "Futbol kulübünüzün oyuncu, idman, maç, aidat, gelir-gider ve malzeme işlerini yönetici, antrenör ve veli için ayrı yetkilerle tek panelden yönetin.",
    listText:
      "Oyuncuları, idmanları, maçları, aidatları ve malzemeyi tek panelden yönetin; antrenör ve veli yalnızca kendisine açılan bilgiyi görsün.",
    homeText:
      "Futbol kulübünüzün oyuncu, idman, maç, aidat ve malzeme işlerini web paneli ve mobil uygulamadan tek yerden yönetin.",
    linkLabel: "Kulüp Takibi İnceleyin",
    title: "Kulübünüzün oyuncusu, idmanı, maçı ve kasası tek ekranda.",
    lead: "Futbol kulüplerinin günlük işlerini tek yerden yönetmesi için geliştirdiğimiz yazılım. Yönetici kulübün tamamını görür; antrenör kendi takımlarını, veli yalnızca kendi çocuğunu.",
    secondary: "Demoyu Deneyin",
    caption: "Kulüp yönetim paneli · Örnek veri",
    alt: "Örnek bir futbol kulübü için sıradaki maç, idman yoklaması, takım kadrosu ve aylık aidat özetini gösteren yönetim paneli.",
    stepsTitle: "Kulüp Takip nasıl çalışır?",
    steps: [
      {
        t: "Kulübünüzü ve takımlarınızı tanımlayın.",
        d: "A takım, altyapı ve futbol okulu gibi takımları açın; oyuncu kartlarını ve veli bilgilerini ekleyin. Toplu içe aktarma da planlanabilir.",
      },
      {
        t: "Ekibinizi davetle ekleyin.",
        d: "Antrenör ve velilere tek kullanımlık, 7 gün geçerli davet bağlantısı gönderin. Antrenör davetine takımları, veli davetine çocuğun kaydı önceden bağlanır.",
      },
      {
        t: "Günlük işleri tek yerden yürütün.",
        d: "Yoklama, idman planı, maç kadrosu, maç olayları, aidat ve malzeme zimmetini web panelinden veya mobil uygulamadan kaydedin.",
      },
    ],
    features: {
      title: "Kulüp Takip'te neler var?",
      items: [
        {
          t: "Takımlar ve oyuncular",
          d: "Kulübe özel oyuncu numarası; mevki, güçlü ayak, boy-kilo, lisans bitiş tarihi, fotoğraf, takım geçmişi, sakatlık kayıtları ve veli bilgileri.",
        },
        {
          t: "İdman",
          d: "Geldi, gelmedi, izinli yoklaması; 1–10 performans puanı ve notu; bloklara ayrılmış idman planı ve kaydedilebilir şablonlar.",
        },
        {
          t: "Maçlar",
          d: "Fikstür, kadro (11 as, en fazla 10 yedek), gol, asist, değişiklik ve kartlar. Maç bitince her oyuncunun dakikası ve istatistiği otomatik hesaplanır.",
        },
        {
          t: "Gelir ve gider",
          d: "Aidat, sponsorluk, maaş ve saha giderleri için hazır kategoriler; aynı ay için mükerrer aidat girişi engellenir, aylık gelir-gider özeti hazır gelir.",
        },
        {
          t: "Gelişim",
          d: "Sprint, sıçrama ve dayanıklılık gibi fiziksel testler; teknik, taktik, fiziksel ve mental başlıklarda dönemlik karne ve veliye mesaj.",
        },
        {
          t: "Malzeme ve stok",
          d: "Kritik seviye takibi, oyuncuya beden bilgisiyle zimmet ve iade, giriş-çıkış hareketleri.",
        },
        {
          t: "Kulüp web sitesi",
          d: "İsteğe bağlı ek hizmet: kulüp adı, renkleri, logosu, fikstür, sonuçlar ve kadro. Oyuncu adı yalnızca veli izin verdiyse görünür.",
        },
      ],
    },
    chips: {
      title: "Kim neyi görür?",
      intro:
        "Yetkiler uygulamada değil, veritabanı seviyesinde kontrol edilir. Bir kişi aynı anda hem antrenör hem veli olabilir.",
      items: [
        "Yönetici: kulübün tamamı; para, maaş ve değişiklik kayıtları yalnızca onda",
        "Antrenör: yalnızca atandığı takımların oyuncuları, idmanları ve maçları",
        "Veli: yalnızca kendi çocuğunun yoklaması, maçları, test sonuçları, aidatı ve zimmeti",
        "Karne veliye ancak antrenör paylaştığında açılır; idman puanları ve iç notlar veliye kapalıdır",
      ],
    },
    demoTitle: "Her rol kendi ekranını görür.",
    demoIntro: "Yönetici, antrenör ve veli arasında geçiş yapın; antrenör ekranında idman yoklamasını deneyin.",
    forWho:
      "Altyapısı, futbol okulu veya amatör takımları olan ve oyuncu, idman, aidat ve malzeme takibini hâlâ defter, tablo ve mesaj gruplarıyla yürüten futbol kulüpleri için. Web paneli bilgisayardan, mobil uygulama sahadan kullanım için tasarlandı.",
    setup: {
      title: "Planlar ve kurulum",
      text: "Kulübünüzün takım, oyuncu ve personel sayısına göre abonelik planı seçilir; yeni kulüp deneme süresiyle başlar. Takım ve oyuncu listenizi ilk kurulumda birlikte aktarabiliriz.",
    },
    faqs: [
      {
        q: "Veli, diğer oyuncuların bilgilerini görebilir mi?",
        a: "Hayır. Veli yalnızca kendi çocuğunun yoklamasını, maçlarını, istatistiklerini, test sonuçlarını, aidat durumunu ve zimmetini görür. Maaşlar, idman puanları, karne iç notları ve rakip analizi veliye hiç açılmaz.",
      },
      {
        q: "Verilerimiz başka kulüplerle karışabilir mi?",
        a: "Hayır. Her kayıt kulübün kimliğiyle birlikte tutulur ve satır düzeyinde güvenlik tüm tablolarda açıktır; bir kulübün verisine başka kulüp veritabanı seviyesinde erişemez.",
      },
      {
        q: "Aboneliği bırakırsak verilerimiz silinir mi?",
        a: "Hayır. Abonelik sona erdiğinde kulüp salt okunur hâle gelir; veriler silinmez, yalnızca yeni kayıt girilemez.",
      },
      {
        q: "Oyuncu fotoğrafları herkese açık mı?",
        a: "Hayır. Fotoğraflar özel bir depoda tutulur; personel ve yalnızca kendi çocuğunun fotoğrafı için veli erişebilir.",
      },
      {
        q: "Yönetici hesabı nasıl korunuyor?",
        a: "Yöneticiler için iki adımlı doğrulama zorunludur; antrenörler için kulüp isterse açılır. Oyuncu, para, üyelik ve stok gibi önemli kayıtlardaki her değişiklik silinemeyen bir denetim kaydında tutulur.",
      },
    ],
    closing: "Kulübünüzün takım ve oyuncu yapısını paylaşın; Kulüp Takip kullanıma açıldığında sizi ilk haberdar edelim.",
    formExample: "Altyapıda 4 takım ve yaklaşık 120 oyuncumuz var; yoklama ve aidatı şu an tabloda tutuyoruz.",
    related: ["depo-takibi", "web-sitesi-paketi", "musteri-asistani"],
  },
];

/** Menü ve alt bilgideki sıra (katalog sırasından farklı). */
export const MENU_ORDER = [
  "urun-gorsel-studyosu",
  "meta-reklam-paneli",
  "ai-influencer",
  "depo-takibi",
  "web-sitesi-paketi",
  "gorusme-ozeti",
  "belge-okuma",
  "musteri-asistani",
  "musteri-bulma",
  "google-haritalar-karnesi",
  "kulup-takip",
];

export const getProduct = (slug: string): Product | undefined => PRODUCTS.find((p) => p.slug === slug);
export const menuProducts = (): Product[] => MENU_ORDER.map((s) => getProduct(s)).filter((p): p is Product => !!p);
export const HOME_PRODUCTS = ["urun-gorsel-studyosu", "ai-influencer", "kulup-takip", "meta-reklam-paneli", "depo-takibi"];

/** /urunler ihtiyaca göre gezinme. */
export const NEEDS: { label: string; slugs: string[] }[] = [
  { label: "Ürünlerimi daha profesyonel sunmak istiyorum", slugs: ["urun-gorsel-studyosu", "web-sitesi-paketi"] },
  { label: "Reklam verilerimi net okumak istiyorum", slugs: ["meta-reklam-paneli"] },
  { label: "Stoklarımı kontrol altına almak istiyorum", slugs: ["depo-takibi", "belge-okuma"] },
  { label: "Dijitalde güçlü görünmek istiyorum", slugs: ["web-sitesi-paketi", "google-haritalar-karnesi", "urun-gorsel-studyosu"] },
  { label: "Sosyal medyada düzenli içerik paylaşmak istiyorum", slugs: ["ai-influencer", "urun-gorsel-studyosu", "meta-reklam-paneli"] },
  { label: "Tekrarlanan işleri otomatikleştirmek istiyorum", slugs: ["belge-okuma", "gorusme-ozeti", "musteri-asistani"] },
  { label: "Spor kulübümü tek yerden yönetmek istiyorum", slugs: ["kulup-takip"] },
];

/** Bilgi talebi formundaki "İlgilendiğiniz Ürün" alanı için ek seçenekler. */
export const INTEREST_EXTRA: { id: string; label: string }[] = [
  { id: "hizmetler", label: "Tamamlayıcı Hizmetler" },
  { id: "isletmeye-ozel", label: "İşletmeye Özel Çözüm" },
  { id: "karar-vermedim", label: "Henüz Karar Vermedim" },
];

export const interestLabel = (id: string): string =>
  getProduct(id)?.name || INTEREST_EXTRA.find((x) => x.id === id)?.label || "";

export const infoHref = (slug: string, extra = ""): string => `/bilgi-al?urun=${encodeURIComponent(slug)}${extra}`;

export const whatsAppText = (service: string): string =>
  `Merhaba, Vitrinweb’in ${service} çözümü hakkında bilgi almak istiyorum. İşletmem: . Destek aradığım konu: .`;

/* ---------- Web Sitesi Paketi ---------- */
export const WEB_ADDONS = ["Blog", "Online Randevu", "Gelişmiş İletişim Formu", "Ürün/Hizmet Kataloğu", "Çoklu Dil"];
export const WEB_CUSTOM = ["Online Ödeme", "Yönetim Paneli", "Özel Geliştirme"];

const FONT = "'Manrope','Segoe UI',system-ui,sans-serif";
const SERIF = "Georgia,'Times New Roman',serif";

export const SAMPLE_SITES: { id: string; label: string; url: string; m: MockData }[] = [
  {
    id: "kuafor",
    label: "Kuaför ve Güzellik Salonu",
    url: "linasalon.com",
    m: {
      variant: "split",
      name: "Lina Salon",
      nav: ["Hizmetler", "Fiyatlar", "Galeri", "İletişim"],
      tag: "SAÇ · CİLT · MAKYAJ",
      h: "Kendinize ayırdığınız zaman, özenle.",
      p: "Saç kesimi, renklendirme ve cilt bakımı için randevunuzu birkaç adımda planlayın.",
      cta: "Randevu Al",
      cta2: "Hizmetler",
      cards: ["Saç Tasarımı", "Cilt Bakımı", "Gelin Paketi"],
      bg: "#FBF6F3",
      ink: "#33262A",
      ac: "#A9586E",
      acink: "#FFFFFF",
      card: "#FFFFFF",
      g: ["#EDC9C6", "#DFA7B1", "#F6E2D9"],
      r: "1.2cqw",
      font: FONT,
      hfont: SERIF,
    },
  },
  {
    id: "kafe",
    label: "Kafe ve Restoran",
    url: "koseustu.com",
    m: {
      variant: "full",
      name: "Köşe Üstü",
      nav: ["Menü", "Rezervasyon", "Konum", "İletişim"],
      tag: "HER GÜN 08.00 – 23.00",
      h: "Mahallenin en sıcak masası.",
      p: "Taze kahve, ev yapımı tatlılar ve mevsim menüsü. Masanızı önceden ayırın.",
      cta: "Masa Ayırt",
      cta2: "Menüyü Gör",
      cards: ["Kahvaltı", "Öğle Menüsü", "Tatlılar", "Kahve"],
      bg: "#1E1814",
      ink: "#F5EDE3",
      ac: "#D9A55B",
      acink: "#1E1814",
      card: "#2A221C",
      g: ["#6B4B33", "#3B2A1F", "#9C6B3F"],
      r: "0.6cqw",
      font: FONT,
      hfont: SERIF,
    },
  },
  {
    id: "danismanlik",
    label: "Danışmanlık",
    url: "kuzeydanismanlik.com",
    m: {
      variant: "center",
      name: "Kuzey Danışmanlık",
      nav: ["Hizmetler", "Yaklaşım", "Vakalar", "İletişim"],
      tag: "STRATEJİ VE BÜYÜME",
      h: "Büyümeniz için net bir yol haritası.",
      p: "İşletmenizi verilerle okuyup uygulanabilir bir plana dönüştürüyoruz.",
      cta: "Görüşme Planla",
      cta2: "Hizmetler",
      cards: ["Strateji", "Operasyon", "Finans"],
      bg: "#F3F5F7",
      ink: "#14202E",
      ac: "#2E5E4E",
      acink: "#FFFFFF",
      card: "#FFFFFF",
      g: ["#CFDCD6", "#9FB9AE", "#E2EAE6"],
      r: "0.8cqw",
      font: FONT,
    },
  },
  {
    id: "klinik",
    label: "Klinik",
    url: "denizagizdis.com",
    m: {
      variant: "grid",
      name: "Deniz Ağız ve Diş",
      nav: ["Tedaviler", "Ekibimiz", "Ulaşım", "İletişim"],
      tag: "HAFTA İÇİ 09.00 – 19.00",
      h: "Kliniğimize ulaşmak için ihtiyacınız olan her şey.",
      p: "",
      cta: "Randevu İçin Arayın",
      cta2: "",
      cards: ["Tedaviler", "Ekibimiz", "Ulaşım"],
      tiles: [
        ["Genel muayene", "Randevu ile"],
        ["Çocuk diş hekimliği", "Hafta içi"],
        ["Ortodonti", "Ön görüşme"],
        ["Ulaşım", "Haritada görün"],
      ],
      bg: "#F4F8FA",
      ink: "#12303B",
      ac: "#1F6F86",
      acink: "#FFFFFF",
      card: "#FFFFFF",
      g: ["#CFE3EA", "#9CC6D3", "#E4F0F4"],
      r: "1cqw",
      font: FONT,
    },
  },
];
