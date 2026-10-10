import { money, TL, VAT_INCLUDED, YEARLY, BASE_PRICE } from "@/lib/config";
import type {
  Addon,
  Faq,
  HeroDemo,
  IncludedFeature,
  NavItem,
  ProcessStep,
  QuoteAddon,
  Reference,
  WhyItem,
} from "@/lib/types";

export const SECTORS = [
  "Restoran / Kafe",
  "Güzellik",
  "Sağlık",
  "Hukuk",
  "Emlak",
  "Danışmanlık",
  "Eğitim",
  "Spor",
  "Mimarlık",
  "İnşaat",
  "Otomotiv",
  "Turizm",
  "Freelancer",
  "Diğer",
];

export const INCLUDED: IncludedFeature[] = [
  { icon: "layout", t: "5 sayfalık modern tasarım", d: "Ana sayfa, hakkımızda, hizmetler, galeri ve iletişim; sektörünüze ve markanıza göre sade bir tasarım, 2 revizyon hakkıyla." },
  { icon: "phone", t: "Mobil uyumlu", d: "Telefon, tablet ve bilgisayarda düzgün görünür ve rahat kullanılır." },
  { icon: "file", t: "Metin yazımı", d: "Verdiğiniz bilgilerden sayfa metinlerinizi biz yazarız; hazır metniniz olmasa da olur." },
  { icon: "search", t: "SEO uyumlu altyapı", d: "Her sayfaya özel başlık ve açıklama, site haritası, işletme bilgileri için yapısal veri ve hızlı açılan görseller." },
  { icon: "message", t: "WhatsApp ve tıkla-ara", d: "Ziyaretçileriniz tek dokunuşla size yazabilir veya sizi arayabilir." },
  { icon: "pin", t: "Google Maps ve iletişim formu", d: "Konumunuz harita olarak; iletişim formu, adres ve çalışma saatleri tek sayfada." },
  { icon: "star", t: "Google yorumlarınız", d: "Google'daki yorumlarınızdan seçtiklerinizi sitenize ekleriz; istediğinizde güncelleriz." },
  { icon: "globe", t: "Alan adı, barındırma ve SSL", d: "İlk yıl dahildir. Alan adınız sizin adınıza kaydedilir, yönetimini biz yaparız." },
  { icon: "shield", t: "İlk yıl servis ücretsiz", d: "Güvenlik güncellemeleri, yedekleme ve ayda 2 küçük içerik güncellemesi için ilk yıl ek ücret ödemezsiniz." },
];

/** Temel pakete dahil olmayanlar: SSS'de ve sözleşmede açıkça yazılır. */
export const NOT_INCLUDED = [
  "logo tasarımı",
  "profesyonel fotoğraf çekimi",
  "kurumsal e-posta hesabı",
  "5 sayfanın üzerindeki ek sayfalar",
  "ek özellikler (blog, online randevu, katalog, çoklu dil, online ödeme, yönetim paneli)",
  "reklam ve sosyal medya yönetimi",
  "başka bir firmanın yaptığı mevcut sitenin onarımı",
];

export const ADDONS: Addon[] = [
  { id: "blog", name: "Blog", price: 2000, d: "Yazılarınızı yayınlayın, içerikle aramalarda görünür olun." },
  { id: "randevu", name: "Online Randevu", price: 3000, d: "Müşterileriniz siteden kendi randevusunu oluşturur." },
  { id: "form", name: "Gelişmiş Form", price: 1250, d: "Teklif, başvuru ve talep formları için ek alanlar ve akışlar." },
  { id: "katalog", name: "Ürün / Hizmet Kataloğu", price: 2000, d: "Ürün ve hizmetlerinizi kategorilerle listeleyin." },
  { id: "dil", name: "Çoklu Dil", price: 2500, d: "Sitenizi birden fazla dilde yayınlayın." },
];

/** Kapsama göre fiyatı değişen özellikler: sabit fiyat gösterilmez, teklif alınır. */
export const QUOTE_ADDONS: QuoteAddon[] = [
  { id: "odeme", name: "Online Ödeme", d: "Sitenizden doğrudan tahsilat alın." },
  { id: "panel", name: "Yönetim Paneli", d: "İçeriklerinizi kendiniz yönetin." },
  {
    id: "ozel",
    name: "Özel İstek",
    d: "Listede olmayan bir şey mi istiyorsunuz? Kısaca yazın, değerlendirip teklif verelim.",
    custom: true,
  },
];

/** Türkçe liste: "A, B ve C" */
export const joinTr = (l: string[]): string =>
  l.length < 2 ? l[0] || "" : l.slice(0, -1).join(", ") + " ve " + l[l.length - 1];

export const quoteNames = (q: string[] | undefined): string[] =>
  QUOTE_ADDONS.filter((a) => (q || []).includes(a.id)).map((a) => (a.custom ? "özel isteğiniz" : a.name));

const FONT = "'Manrope','Segoe UI',system-ui,sans-serif";

/** Hero görselinde kullanılan iki dekoratif konsept (CSS ile çizilir). */
export const HERO_DEMOS: HeroDemo[] = [
  {
    id: "danismanlik",
    cat: "Danışmanlık",
    desc: "Premium kurumsal tasarım",
    url: "kuzeydanismanlik.com",
    tags: ["Kurumsal", "Kişisel", "Hizmet"],
    sector: "Danışmanlık",
    addon: "blog",
    feat: ["Hizmetler ve çalışma yaklaşımı", "Vaka ve referans alanı", "Görüşme planlama butonu"],
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
      bg: "#F3F5F9",
      ink: "#0E1B36",
      ac: "#2B54D8",
      acink: "#FFFFFF",
      card: "#FFFFFF",
      g: ["#C9D5F5", "#8FA8EB", "#DDE5F8"],
      r: "0.8cqw",
      font: FONT,
    },
  },
  {
    id: "guzellik",
    cat: "Güzellik merkezi",
    desc: "Randevu odaklı tasarım",
    url: "novaguzellik.com",
    tags: ["Sağlık", "Hizmet"],
    sector: "Güzellik",
    addon: "randevu",
    feat: ["Hizmet ve fiyat listesi", "Randevu butonu her sayfada", "Galeri ve WhatsApp iletişimi"],
    m: {
      variant: "split",
      name: "Nova Güzellik",
      nav: ["Hizmetler", "Fiyatlar", "Galeri", "İletişim"],
      tag: "RANDEVU ODAKLI",
      h: "Kendinize zaman ayırın.",
      p: "Cilt bakımı ve güzellik hizmetleri için randevunuzu alın.",
      cta: "Randevu Al",
      cta2: "Hizmetler",
      cards: ["Cilt Bakımı", "Lazer", "Saç ve Makyaj"],
      bg: "#FBF4F1",
      ink: "#3A2A2C",
      ac: "#C4708A",
      acink: "#FFFFFF",
      card: "#FFFFFF",
      g: ["#F1C9C4", "#E8A9B4", "#F7E1D7"],
      r: "1.2cqw",
      font: FONT,
    },
  },
];

export const WHY: WhyItem[] = [
  { icon: "globe", t: "Her an açık bir vitrin", d: "İşletmeniz kapalıyken bile müşterileriniz hizmetlerinizi, fiyatlarınızı ve çalışma saatlerinizi görebilir." },
  { icon: "search", t: "Google'da bulunursunuz", d: "İnsanlar önce arar. Web sitesi olan işletme, aramada karşısına çıkabilecek işletmedir." },
  { icon: "shield", t: "Güven verir", d: "Düzgün bir web sitesi, sizi tanımayan müşteri için ilk güven işaretidir." },
  { icon: "message", t: "Tek dokunuşla ulaşırlar", d: "WhatsApp, telefon ve harita bağlantıları ziyaretçiyi doğrudan iletişime taşır." },
  { icon: "phone", t: "Telefonda düzgün görünür", d: "Müşterileriniz sizi çoğunlukla telefonundan arar. Siteniz her ekranda rahat okunur." },
  { icon: "trend", t: "Reklamlarınız için sağlam bir adres", d: "Instagram ve reklam bağlantılarınızı, size ait bir adrese yönlendirirsiniz." },
];

export const PROCESS: ProcessStep[] = [
  { n: "01", t: "Bilgi", d: "İşletmenizi tanıyoruz. Bilgilerinizi girer, siparişinizi tamamlarsınız." },
  { n: "02", t: "Tasarım", d: "Logo, metin ve görsellerinizi alır, tercihlerinize göre tasarımı hazırlarız." },
  { n: "03", t: "Geliştirme", d: "Tasarım çalışan bir web sitesine dönüşür. Geri bildirimlerinizle şekillenir." },
  { n: "04", t: "Yayın", d: "İçerikleriniz tamamlandıktan sonra 5 iş günü içinde, onayınızla sitenizi yayına alırız." },
];

export const FAQ_CATEGORIES = ["Fiyat, Ödeme ve İptal", "Süreç ve İçerik", "Güven, Güvenlik ve SEO"] as const;

export const FAQS: Faq[] = [
  {
    cat: "Fiyat, Ödeme ve İptal",
    q: `${money(BASE_PRICE)} TL'ye neler dahil?`,
    a: "5 sayfalık (ana sayfa, hakkımızda, hizmetler, galeri, iletişim) mobil uyumlu tasarım, metin yazımı, SEO uyumlu altyapı, WhatsApp ve tıkla-ara, Google Maps, iletişim formu, seçtiğiniz Google yorumlarınız, ilk yıl alan adı, barındırma ve SSL ile ilk yıl servis ve bakım dahildir. Blog, randevu, çoklu dil gibi ihtiyaçlar ek özellik olarak eklenir.",
  },
  {
    cat: "Fiyat, Ödeme ve İptal",
    q: "Pakete neler dahil değil?",
    a: `${NOT_INCLUDED.map((x, i) => (i === 0 ? x.charAt(0).toLocaleUpperCase("tr") + x.slice(1) : x)).join(", ")} temel pakete dahil değildir. Logonuz yoksa marka adınızla sade bir yazı logosu hazırlarız; fotoğrafınız yoksa kullanım hakkı uygun görseller kullanırız.`,
  },
  {
    cat: "Fiyat, Ödeme ve İptal",
    q: "İlk yıl servis ve bakım gerçekten ücretsiz mi?",
    a: `Evet. İlk yıl servis ve bakım için ek ücret ödemezsiniz. 2. yıl servis ve bakım ücreti ${TL(YEARLY)}'dir; sonraki yıllarda ücret enflasyon oranında güncellenir ve yenilemeden önce size bildirilir.`,
  },
  {
    cat: "Fiyat, Ödeme ve İptal",
    q: "Online Ödeme ve Yönetim Paneli nasıl fiyatlanıyor?",
    a: "Kapsamları işletmeye göre değiştiği için sabit fiyatları yok. Siparişte bu özellikler için teklif isteyebilirsiniz; sipariş tutarınıza eklenmezler. Size teklif ilettiğimizde onaylarsanız tutarı ödemeniz için güvenli ödeme sayfasına yönlendirilirsiniz, onaylamazsanız ek ödeme yapmazsınız. Listede olmayan bir ihtiyacınız varsa Özel İstek ile yazabilirsiniz.",
  },
  {
    cat: "Fiyat, Ödeme ve İptal",
    q: "Fiyatlara KDV dahil mi?",
    a: VAT_INCLUDED ? "Evet. Sitede gördüğünüz tüm fiyatlara KDV dahildir." : "Hayır. Fiyatlara KDV ayrıca eklenir.",
  },
  {
    cat: "Fiyat, Ödeme ve İptal",
    q: "Kart bilgilerim saklanıyor mu?",
    a: "Hayır. Ödeme, güvenli ödeme altyapısı üzerinden alınır ve kart bilgileriniz bizim sistemlerimizde saklanmaz.",
  },
  {
    cat: "Fiyat, Ödeme ve İptal",
    q: "Fatura kesiliyor mu?",
    a: "Evet. Ödeme sırasında girdiğiniz fatura bilgileriyle fatura düzenlenir.",
  },
  {
    cat: "Fiyat, Ödeme ve İptal",
    q: "Memnun kalmazsam servisi iptal edebilir miyim?",
    a: "Evet, taahhüt yok. İlk yılın sonunda memnun kalmazsanız servisi yenilemezsiniz ve iptal için hiçbir ücret ödemezsiniz. Sonraki yıllarda da her yenilemeden önce aynı hakka sahipsiniz.",
  },
  {
    cat: "Fiyat, Ödeme ve İptal",
    q: "Sitemden ürün veya hizmet satabilir miyim?",
    a: "Evet. Ürün / Hizmet Kataloğu ek özelliğiyle ürünlerinizi kategorilere ayırarak sergileyebilir, Online Ödeme ek özelliğiyle sitenizden doğrudan tahsilat alabilirsiniz. Büyük ölçekli, çok sayıda ürünlü bir e-ticaret altyapısı istiyorsanız kapsamı birlikte değerlendirip ayrıca teklif veririz.",
  },
  {
    cat: "Süreç ve İçerik",
    q: "Ek özellikleri sonradan da ekletebilir miyim?",
    a: "Sipariş sırasında seçebilirsiniz. Sonradan ihtiyaç doğarsa bizimle iletişime geçin; kapsamına göre fiyatını net olarak bildiririz.",
  },
  {
    cat: "Süreç ve İçerik",
    q: "Ödemeden sonra ne oluyor?",
    a: "Sipariş numaranızı alır ve logo, metin, görsel gibi içerikleri göndereceğiniz proje formuna yönlendirilirsiniz. İçerikleriniz bize ulaştıktan sonra tasarım süreci başlar.",
  },
  {
    cat: "Süreç ve İçerik",
    q: "Sitem ne zaman hazır olur?",
    a: "İçerikleriniz eksiksiz ulaştıktan sonra 5 iş günü içinde siteniz yayına hazır olur. Revizyon ve onay sırasında sizden yanıt beklediğimiz süre bu 5 güne dahil değildir. Ek özellik veya teklifle eklenen bir özellik seçtiyseniz süreyi, içerikleriniz ulaştığında yazılı olarak bildiririz.",
  },
  {
    cat: "Süreç ve İçerik",
    q: "Sitemin içeriğini kendim güncelleyebilir miyim?",
    a: "Standart pakette içerik değişikliği taleplerinizi bize iletirsiniz, biz güncelleriz: servis süresince ayda 2 küçük güncelleme (metin, fotoğraf, fiyat, çalışma saatleri, Google yorumlarının yenilenmesi) 2 iş günü içinde yapılır. Fiyat, metin veya görselleri kendiniz yönetmek isterseniz, Yönetim Paneli ek özelliğini (teklif üzerine) ekleyebilirsiniz.",
  },
  {
    cat: "Süreç ve İçerik",
    q: "Sitemi birden fazla dilde yayınlayabilir miyim?",
    a: "Evet, Çoklu Dil ek özelliğiyle sitenizi birden fazla dilde yayınlayabilirsiniz.",
  },
  {
    cat: "Güven, Güvenlik ve SEO",
    q: "Sitem Google'da üst sıralarda çıkacak mı?",
    a: "Her sitede temel SEO altyapısını kuruyoruz: sayfa başlıkları, açıklamalar, site haritası ve işletme bilgileri için yapısal veri. Sıralamayı ise rekabet, içerik, yorumlar ve Google İşletme Profili gibi pek çok etken belirler; hiçbir hizmet belirli bir sırayı garanti edemez. Görünürlüğünüzü artırmanın yollarını blogumuzda anlatıyoruz.",
  },
  {
    cat: "Güven, Güvenlik ve SEO",
    q: "Zaten Instagram/sosyal medya hesabım var, neden ayrıca web sitesine ihtiyacım var?",
    a: "Sosyal medya hesabınız platformun kurallarına ve algoritmasına bağlıdır; erişiminiz bir gecede düşebilir veya hesabınıza erişim sorunu yaşayabilirsiniz. Web siteniz ve alan adınız ise yalnızca size aittir; Google aramalarında bulunmanızı sağlar ve reklam/bağlantılarınız için sağlam bir adres olur.",
  },
  {
    cat: "Güven, Güvenlik ve SEO",
    q: "Sitem güvenli mi (SSL/HTTPS)?",
    a: "Evet, siteniz HTTPS (SSL) ile şifreli olarak yayınlanır; tarayıcılarda güvenlik uyarısı göstermez.",
  },
];

/** Gerçek müşteri referansları hazır olduğunda buraya eklenir. */
export const REFERENCES: Reference[] = [];

export const TRUST = ["İlk yıl servis ücretsiz", "Taahhüt yok", "Güvenli ödeme", "Mobil uyumlu"];

export const NAV: NavItem[] = [
  { label: "Neden Web Sitesi?", to: "/neden" },
  { label: "Süreç", sec: "surec" },
  { label: "Ücretlendirme", to: "/ucretlendirme" },
  { label: "Blog", to: "/blog" },
  { label: "Hakkımızda", to: "/hakkimizda" },
  { label: "SSS", sec: "sss" },
  { label: "İletişim", to: "/iletisim" },
];
