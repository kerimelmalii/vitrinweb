/* ================= AJANS SİTESİ ORTAK METİNLERİ =================
   Menü, ana sayfa, süreç, ilkeler ve SSS. Ürünler products.ts, hizmetler services.ts,
   sektörler sectors.ts içindedir. */

export const NAV_LINKS: { label: string; href: string; menu?: "urunler" }[] = [
  { label: "Ürünler", href: "/urunler", menu: "urunler" },
  { label: "Demolar", href: "/demolar" },
  { label: "Sektörler", href: "/sektorler" },
  { label: "Blog", href: "/blog" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

export const BRAND_TEXT =
  "Vitrinweb; işletmeler için yüksek standartlı web siteleri, operasyonları hızlandıran hazır dijital ürünler ve iş süreçlerine özel yazılımlar geliştirir.";

export const HOME_PRIORITIES: { quote: string; slug: string; onlyWhenLive?: boolean }[] = [
  { quote: "Ürünlerimiz kaliteli ama fotoğraflarımız bu değeri yansıtmıyor.", slug: "urun-gorsel-studyosu" },
  { quote: "Reklam bütçemizin gerçek karşılığını sade bir ekranda görmek istiyoruz.", slug: "meta-reklam-paneli" },
  { quote: "Kritik stokları siparişler aksamadan önce bilmek istiyoruz.", slug: "depo-takibi" },
  { quote: "Müşterilerimize güvenle paylaşabileceğimiz, markamızı temsil eden bir web sitemiz olsun.", slug: "web-sitesi-paketi" },
  {
    quote: "Müşteriler Google’da işletmemizi aradığında nasıl bir profille karşılaşıyor?",
    slug: "google-haritalar-karnesi",
    onlyWhenLive: true,
  },
];

export const HOME_PROCESS = [
  {
    t: "Süreci analiz ediyoruz.",
    d: "İşinizi bugün nasıl yürüttüğünüzü, nerede zaman ve veri kaybettiğinizi ve neyi dönüştürmek istediğinizi dinliyoruz.",
  },
  {
    t: "Kapsamı yazılı olarak netleştiriyoruz.",
    d: "Hazır bir ürünümüz ihtiyacınızı karşılıyorsa doğrudan kurulum planlıyoruz. Özel geliştirme gerekiyorsa teslimatları, takvimi ve ölçütleri yazılı kapsamda paylaşıyoruz.",
  },
  {
    t: "Canlı senaryoda doğruluyoruz.",
    d: "Çözümü kuruyor veya belirlediğimiz pilot senaryo üzerinde ekibinizle birlikte test ediyoruz.",
  },
  {
    t: "Teslim ediyor ve destekliyoruz.",
    d: "Kullanım dokümantasyonunu ve destek koşullarını devrediyor, büyüme adımlarınızı birlikte planlıyoruz.",
  },
];

export const PRINCIPLES = [
  {
    icon: "file",
    t: "Baştan tanımlı kapsam.",
    d: "Teslim edilecek çıktıları, sizden beklenen girdileri, revizyon sınırlarını ve destek modelini projeye başlamadan yazılı olarak netleştiririz.",
  },
  {
    icon: "target",
    t: "Ölçülebilir çıktı odağı.",
    d: "Her çalışma için somut bir değerlendirme ölçütü belirleriz: rapor hazırlama süresinin kısalması, anlık izlenen stok hareketleri veya yayına hazır teslim edilen görsel setleri.",
  },
  {
    icon: "shield",
    t: "Şeffaf veri yönetimi.",
    d: "Hangi verilerin işleneceğini, erişim yetkilerini ve hizmet sona erdiğinde veri dışa aktarım ya da devir sürecinin nasıl işleyeceğini sözleşme ve kapsam belgesinde açıkça tanımlarız.",
  },
];

export const WHAT_IS =
  "Vitrinweb, işletmelere dijital çözümler sunan bir ajanstır. Kurumsal web siteleri tasarlar; ürün görseli üretimi, Meta reklam raporlama, barkodlu stok takibi, belge okuma, müşteri asistanı ve futbol kulübü yönetimi gibi işler için dijital ürünler geliştirir; kendi süreçlerine özel yapı isteyen işletmelere de yönetim paneli, otomasyon ve entegrasyon yazılımı yapar. Her çalışmada kapsam, teslimatlar ve takvim baştan yazılı olarak belirlenir.";

export const HOME_FAQS = [
  {
    q: "Vitrinweb nedir?",
    a: WHAT_IS,
  },
  {
    q: "İşletmem için hangi çözümün doğru olduğuna nasıl karar veririz?",
    a: "İlk keşif görüşmesinde en çok vakit alan operasyonunuzu ve mevcut araçlarınızı değerlendiririz. Hazır bir ürünümüz doğrudan çözüm sağlıyorsa oradan başlar, özel geliştirme gerekiyorsa kapsam belgesi çıkarırız.",
  },
  {
    q: "İlk görüşmede neleri ele alıyoruz?",
    a: "Mevcut iş akışınızı, kullandığınız sistemleri ve ulaşmak istediğiniz sonucu netleştiriyoruz. Görüşme sonunda size en uygun ürün veya proje yol haritasını paylaşıyoruz.",
  },
  {
    q: "Demoları incelemek için hesap açmam gerekir mi?",
    a: "Hayır. Açık demoları örnek verilerle doğrudan deneyebilirsiniz. Kendi işletme verinizle yürütülecek pilot çalışmalar için erişimleri ayrı olarak planlıyoruz.",
  },
  {
    q: "Bir ürün hakkında nasıl teklif ve bilgi alabilirim?",
    a: "İlgilendiğiniz ürün sayfasındaki “Bilgi Alın” butonundan kısa formumuzu doldurabilirsiniz. İhtiyacınızı inceleyip kapsam ve başlangıç adımlarıyla size dönüş yaparız.",
  },
  {
    q: "Tek bir ürün veya hizmetle başlayabilir miyim?",
    a: "Evet. Yalnızca ürün görselleri, web sitesi veya stok takibi gibi tek bir alanda çalışmaya başlayabilirsiniz. İhtiyaçlarınız genişledikçe kapsamı adım adım büyütebiliriz.",
  },
];

export const WORK_STEPS = [
  {
    t: "Keşif görüşmesi.",
    d: "Kısa ve odaklı bir görüşmede ihtiyacınızı, mevcut araçlarınızı ve hedeflediğiniz sonucu değerlendiriyoruz.",
  },
  {
    t: "Yazılı kapsam ve yol haritası.",
    d: "Hazır ürün, özel proje veya pilot uygulama önerimizi; teslimatlar, süre, kullanım ve destek koşullarıyla birlikte tek belgede sunuyoruz.",
  },
  {
    t: "Örnek ekran ve pilot doğrulama.",
    d: "Uygun projelerde prototip hazırlıyor, üzerinde anlaştığımız sınırlı kullanıcı veya işlem grubuyla pilot deneme yapıyoruz. Pilot süresi ve değerlendirme ölçütleri baştan tanımlanır.",
  },
  {
    t: "Kurulum, teslim ve sürekli destek.",
    d: "Onaylanan çözümü canlıya alıyor, gerekli erişim ve kullanım bilgilerini devrediyoruz. İhtiyaca göre dönemsel değerlendirme görüşmeleri planlıyoruz.",
  },
];

export const CUSTOM_WORK_TYPES = [
  { icon: "layout", t: "Yönetim panelleri", d: "Durumları, kayıtları ve ekip görevlerini operasyonunuza özel tasarlanmış tek ekranda yönetin." },
  {
    icon: "refresh",
    t: "Süreç otomasyonu",
    d: "Düzenli raporlama, hatırlatma ve veri aktarımı gibi tekrarlanan iş adımlarını hatasız otomasyona bağlayın.",
  },
  {
    icon: "sync",
    t: "Sistem entegrasyonu",
    d: "Kullandığınız uyumlu araçlar arasında veri akışını yetki ve hata yönetimi senaryolarıyla birlikte kurgulayın.",
  },
  {
    icon: "file",
    t: "Belge ve içerik akışları",
    d: "Belge özetleme, veri çıkarma veya taslak yanıt oluşturma süreçlerini ekip onay mekanizmasıyla hızlandırın.",
  },
];

export const CUSTOM_STEPS = [
  {
    t: "Mevcut iş akışını haritalayalım.",
    d: "Hangi adımı kimin yürüttüğünü, hangi araçların kullanıldığını ve sürecin nerede tıkandığını ortaya çıkaralım.",
  },
  {
    t: "Kapsamı ve başarı ölçütünü somutlaştıralım.",
    d: "Örnek ekran veya iş akışı şeması üzerinden nelerin değişeceğini, teslimatları ve takvimi netleştirelim.",
  },
  {
    t: "Pilot uygulama ile doğrulayıp teslim edelim.",
    d: "Tanımlı senaryoda test edelim; ardından canlı geçiş, ekip eğitimi ve destek modelini devreye alalım.",
  },
];

export const CUSTOM_FAQS = [
  {
    q: "Başlamak için teknik bir dokümana ihtiyacım var mı?",
    a: "Hayır. İşi bugün nasıl yürüttüğünüzü ve en çok zaman alan noktaları anlatmanız yeterlidir.",
  },
  {
    q: "Birden fazla sistemi birbirine bağlayabilir misiniz?",
    a: "Kullandığınız araçların entegrasyon olanaklarını ve erişim izinlerini teknik olarak inceliyor, mümkün olan kapsamı teklifimizde netleştiriyoruz.",
  },
  {
    q: "Yayın sonrası destek nasıl işliyor?",
    a: "Kullanım eğitimi, hata bildirimi ve ek geliştirme koşulları proje kapsamıyla birlikte yazılı olarak tanımlanır.",
  },
];

export const CUSTOM_QUESTIONS = [
  { q: "Hangi iş adımı düzenli olarak tekrarlanıyor?", example: "Sipariş onayı ve durum takibi." },
  { q: "Bugün hangi araçları kullanıyorsunuz?", example: "Excel ve WhatsApp." },
  {
    q: "Çözüm devreye girdiğinde neyin değişmesini hedefliyorsunuz?",
    example: "Tüm ekibin güncel sipariş durumunu tek ekrandan takip edebilmesi.",
  },
];

export const WHY_WEB = [
  {
    icon: "layout",
    t: "Hizmetlerinizi net biçimde konumlandırın.",
    d: "Sunduğunuz hizmetleri, kapsamlarını ve örnek çalışmalarınızı düzenli bir mimaride gösterin. Müşteri sizinle iletişime geçmeden önce ne bekleyeceğini bilsin.",
  },
  {
    icon: "message",
    t: "İletişim kanallarını sadeleştirin.",
    d: "Telefon, WhatsApp, adres ve çalışma saatlerinizi her cihazda kolayca bulunur tutun. Randevu, teklif veya mağaza ziyareti için en doğru adımı açıkça yönlendirin.",
  },
  {
    icon: "refresh",
    t: "Güncel ve tutarlı kalın.",
    d: "Çalışma saatleriniz, hizmet listeniz veya iletişim bilgileriniz değiştiğinde web sitenizi ve bağlı dijital kanallarınızı tek merkezden uyumlu tutun.",
  },
];

export const WHY_WEB_CHECKLIST = [
  "İşletme adı ve logosu",
  "Öncelikli üç hizmet alanı",
  "Güncel adres ve çalışma saatleri",
  "Aktif iletişim kanalları",
  "Kullanım hakkına sahip olduğunuz görseller",
];

export const DEMO_CARDS: { kind: string; title: string; text: string; action: string; slug: string }[] = [
  {
    kind: "gorsel",
    title: "Bir ürünün iki hâli",
    text: "Orijinal ürün fotoğrafı ile işlenmiş satış görselini kaydırıcıyla karşılaştırın.",
    action: "Görseli Karşılaştırın",
    slug: "urun-gorsel-studyosu",
  },
  {
    kind: "meta",
    title: "Haftalık reklam raporu",
    text: "Tarih aralığını değiştirerek harcama, sonuç ve maliyet metriklerinin nasıl güncellendiğini görün.",
    action: "Raporu Açın",
    slug: "meta-reklam-paneli",
  },
  {
    kind: "depo",
    title: "Depodan üç kutu çıkışı",
    text: "Örnek üründen üç adet çıkış yapın; kalan stok ve kritik seviye uyarısını anında görün.",
    action: "Stok Demosunu Deneyin",
    slug: "depo-takibi",
  },
  {
    kind: "karne",
    title: "İşletme profili karnesi",
    text: "Kurgusal bir işletmenin çalışma saatleri, kategori ve iletişim tutarlılığını inceleyin.",
    action: "Örnek Karneyi Açın",
    slug: "google-haritalar-karnesi",
  },
  {
    kind: "gorusme",
    title: "Satış görüşmesinden aksiyon özeti",
    text: "Örnek bir görüşmenin konuşma dökümünü, özetini ve sonraki adımlarını karşılaştırın.",
    action: "Örnek Özeti Açın",
    slug: "gorusme-ozeti",
  },
  {
    kind: "belge",
    title: "İrsaliyeden veri okuma",
    text: "Kaynak irsaliye ile otomatik çıkarılan ürün kodu ve adet alanlarını yan yana görün.",
    action: "Örnek Belgeyi Açın",
    slug: "belge-okuma",
  },
  {
    kind: "asistan",
    title: "Müşteri asistanı sohbeti",
    text: "Asistanın onaylı kaynaklardan nasıl yanıt verdiğini ve özel talepleri ne zaman ekibe aktardığını inceleyin.",
    action: "Örnek Konuşmayı Açın",
    slug: "musteri-asistani",
  },
  {
    kind: "musteri",
    title: "B2B satış listesi filtreleme",
    text: "Kurgusal işletmeleri sektör, bölge ve öncelik kriterlerine göre filtreleyin.",
    action: "Örnek Listeyi Açın",
    slug: "musteri-bulma",
  },
  {
    kind: "kulup",
    title: "Üç rol, üç farklı ekran",
    text: "Yönetici, antrenör ve veli arasında geçiş yapın; kim neyi görüyor karşılaştırın ve idman yoklaması alın.",
    action: "Kulüp Panelini Açın",
    slug: "kulup-takip",
  },
  {
    kind: "web",
    title: "Kurumsal web sitesi ön izleme",
    text: "Örnek bir işletme sitesini mobil ve masaüstü görünümlerinde inceleyin.",
    action: "Örnek Siteyi Açın",
    slug: "web-sitesi-paketi",
  },
];

/** Ana sayfa blog bölümünde öne çıkan üç rehber. */
export const HOME_GUIDES = [
  "urun-fotografi-cekerken-nelere-dikkat-etmeli",
  "meta-reklam-raporunda-hangi-rakamlara-bakmali",
  "stok-tablosunu-duzenlerken-nereden-baslamali",
];

export const FOUNDER = {
  name: "Kerim Elmalı",
  role: "Vitrinweb Kurucusu",
  text: "Vitrinweb’i, işletmelerin dijital dönüşüme nereden ve nasıl başlayacağını belirsizlik yaşamadan netleştirebileceği bir çözüm ortağı olarak kurdum. Her projede önce en çok zaman ve enerji tüketen adımı belirliyor, ardından kapsamı, teslimatları ve çalışma sonunda elinizde olacak gerçek çıktıyı tüm şeffaflığıyla ortaya koyuyoruz.",
  /** public/ altında gerçek bir fotoğraf eklendiğinde yolu buraya yazın (ör. "/kurucu.webp"). */
  photo: "",
  photoAlt: "Vitrinweb kurucusu Kerim Elmalı.",
};

export const ABOUT_STORY =
  "Vitrinweb yolculuğuna, işletmelerin kendilerini dijitalde güçlü biçimde temsil edebileceği web siteleri tasarlayarak başladık. Sahada işletmelerle yakın çalıştıkça gördük ki dijital dönüşüm yalnızca iyi bir vitrinle sınırlı değil; vitrinin arkasındaki operasyonun da aynı netlikte çalışması gerekiyor. Ürünleri satışa hazırlamak, reklam yatırımının karşılığını doğru okumak ve stok hareketlerini anlık izlemek bu bütünün ayrılmaz parçaları. Bugün kurumsal web sitelerinin yanında bu kritik ihtiyaçlar için hazır dijital ürünler geliştiriyor, kendi süreçlerine özel yapı isteyen işletmeler için terzi işi yazılımlar tasarlıyoruz.";

/** Çalışma saatleri; doğrulanmamışsa boş bırakın, sayfada gösterilmez. */
export const WORK_HOURS = "";
