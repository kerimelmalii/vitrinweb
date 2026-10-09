import type { BlogPost } from "@/lib/types";

/* ================= BLOG =================
   Yeni yazı eklemek için diziye aynı biçimde bir nesne ekleyin. slug yalnızca küçük harf, rakam ve tire içermelidir.
   Blok biçimi: ["p", metin] | ["h2", başlık] | ["ul", [maddeler]] | ["ol", [maddeler]]. */
export const BLOG: BlogPost[] = [
  {
    slug: "kucuk-isletmeler-icin-ucretsiz-dijital-araclar",
    cover: "map",
    date: "23 Ekim 2026",
    title: "Küçük işletmeler için 10 ücretsiz dijital pazarlama aracı",
    excerpt:
      "Büyük bir pazarlama bütçeniz olmasa da elinizin altında güçlü, ücretsiz araçlar var. İşletmenizi internette büyütmek için kullanabileceğiniz 10 aracı derledik.",
    body: [
      [
        "p",
        "Dijital pazarlama denince akla ilk büyük reklam bütçeleri gelir, ama küçük bir işletme için en çok işe yarayan araçların birçoğu ücretsizdir. Aşağıdaki listeyi elinizin altında bir kontrol listesi gibi kullanabilirsiniz.",
      ],
      ["h2", "1. Google İşletme Profili"],
      [
        "p",
        "Google'da ve Haritalar'da görünmenin temeli. Adresiniz, çalışma saatleriniz, fotoğraflarınız ve yorumlarınız burada toplanır; kurulumu ve kullanımı tamamen ücretsizdir.",
      ],
      ["h2", "2. Google Search Console"],
      [
        "p",
        "Sitenizin Google'da hangi aramalarda göründüğünü, hangi sayfaların tıklandığını ve teknik bir sorun olup olmadığını gösterir. Site haritanızı da buradan Google'a bildirebilirsiniz.",
      ],
      ["h2", "3. Google Analytics"],
      [
        "p",
        "Sitenize kaç kişinin geldiğini, nereden geldiğini ve hangi sayfalarda vakit geçirdiğini gösterir. Hangi içeriğin işe yaradığını anlamadan pazarlama kararı vermek tahmin yürütmekten farksızdır.",
      ],
      ["h2", "4. Meta Business Suite"],
      [
        "p",
        "Instagram ve Facebook hesaplarınızı tek yerden yönetmenizi, gönderi planlamanızı ve temel performans verilerini görmenizi sağlar.",
      ],
      ["h2", "5. WhatsApp Business"],
      [
        "p",
        "Katalog, otomatik karşılama mesajı, hızlı yanıtlar ve etiketler gibi özellikleriyle sıradan WhatsApp'tan çok daha güçlü bir müşteri iletişim aracı. Ayrıntılı rehberimizi aşağıda bulabilirsiniz.",
      ],
      ["h2", "6. Canva"],
      [
        "p",
        "Tasarımcı olmadan sosyal medya görseli, afiş veya basit bir sunum hazırlamak için hazır şablonlarla çalışan ücretsiz bir tasarım aracı.",
      ],
      ["h2", "7. Google Trends"],
      [
        "p",
        "Bir konunun veya ürünün aranma ilgisinin zaman içinde nasıl değiştiğini, hangi mevsimde arttığını gösterir; kampanya zamanlaması için fikir verir.",
      ],
      ["h2", "8. Google Keyword Planner"],
      [
        "p",
        "Müşterilerinizin hizmetinizi ararken hangi kelimeleri kullandığını gösterir. Sitenizin metinlerini ve blog yazılarınızı bu kelimelere göre şekillendirmek, doğru aramalarda görünme ihtimalinizi artırır.",
      ],
      ["h2", "9. Google Formlar"],
      [
        "p",
        "Basit bir memnuniyet anketi, randevu talep formu veya etkinlik kaydı için ücretsiz ve hızlı bir çözüm.",
      ],
      ["h2", "10. Kendi web siteniz"],
      [
        "p",
        "Son ve en önemlisi: yukarıdaki araçların çoğu, insanları GÖTÜRECEĞİNİZ bir yer olduğunda anlam kazanır. Reklamı, Instagram biyografisini, WhatsApp mesajını gören bir müşterinin gideceği, size ait, kalıcı bir adres olmadan bu araçların çoğu yarım kalır.",
      ],
      [
        "ul",
        [
          "Bu araçların hepsini birden kurmaya çalışmayın; Google İşletme Profili ve web siteniz önceliğiniz olsun.",
          "Analytics ve Search Console'u kurduktan sonra ayda bir kez bile bakmak, hiç bakmamaktan çok daha iyidir.",
          "Bir aracı bırakmadan önce en az birkaç hafta düzenli kullanın; sonuçlar genelde hemen görünmez.",
        ],
      ],
    ],
  },
  {
    slug: "instagram-ve-web-sitesini-birlikte-kullanmak",
    cover: "search",
    date: "20 Ekim 2026",
    title: "Instagram ve web sitesini birlikte kullanmanın 6 yolu",
    excerpt:
      "İkisinden birini seçmek zorunda değilsiniz. Instagram'ın getirdiği ilgiyi web sitenizle nasıl kalıcı müşteriye çevirebileceğinizi altı pratik yöntemle anlatıyoruz.",
    body: [
      [
        "p",
        "Web sitesi mi, Instagram mı sorusunun cevabı genelde ikisi birden'dir; önemli olan bu ikisini birbirini besleyecek şekilde kullanmaktır. İşte pratikte nasıl yapılacağı.",
      ],
      ["h2", "1. Biyografideki bağlantıyı boşa harcamayın"],
      [
        "p",
        "Instagram profilinizde tek bir bağlantı hakkınız var. Bunu genel bir link toplama sayfası yerine doğrudan web sitenize, hatta o an kampanyanız varsa ilgili sayfaya yönlendirin.",
      ],
      ["h2", "2. Öne çıkan hikayelerde siteye yönlendirin"],
      [
        "p",
        "Fiyat, hizmetler veya sık sorulan sorular gibi başlıkları öne çıkan hikaye (highlight) olarak tutup, detayını web sitenizdeki ilgili sayfaya yönlendiren bir hikaye ekleyin.",
      ],
      ["h2", "3. Kısa bilgiyi Instagram'da, detayı sitede verin"],
      [
        "p",
        "Bir gönderide ürününüzü tanıtın, fiyat ve teknik detay gibi uzun bilgileri sitenizdeki sayfaya bırakın. Böylece gönderi sade kalır, ilgilenen kişi detayı okumak için sitenize gelir.",
      ],
      ["h2", "4. Kampanyaları sitede kalıcı hale getirin"],
      [
        "p",
        "Instagram gönderileri birkaç gün sonra akışta kayboluyor. Kampanya koşullarını, geçerlilik tarihini ve şartları sitenizde bir sayfada tutarsanız, hem siz hem müşteri her an geri dönüp bakabilir.",
      ],
      ["h2", "5. Sitenizden Instagram'a da köprü kurun"],
      [
        "p",
        "Web sitenizin her sayfasında Instagram hesabınıza bir bağlantı bulunsun; sitenizi bulan ama sizi henüz tanımayan bir ziyaretçi, günlük paylaşımlarınızı takip ederek markanızla bağ kurabilir.",
      ],
      ["h2", "6. Ölçün: hangisi gerçekten işe yarıyor?"],
      [
        "p",
        "Web sitenize Google Analytics kurarsanız, ziyaretçilerin ne kadarının Instagram'dan geldiğini görebilirsiniz. Bu veri, pazarlama çabanızı nereye yoğunlaştıracağınızı size gösterir; tahmin yerine veriyle karar almanızı sağlar.",
      ],
      [
        "p",
        "Kısacası: Instagram ilgi çeker, web siteniz bu ilgiyi güvene ve kalıcı bilgiye çevirir. İkisini rakip değil, aynı ekibin iki oyuncusu gibi düşünün.",
      ],
    ],
  },
  {
    slug: "sayfa-hizi-neden-onemli",
    cover: "browser",
    date: "17 Ekim 2026",
    title: "Sayfa hızı neden önemli? Yavaş bir sitenin gizli maliyeti",
    excerpt:
      "Bir web sitesinin güzel görünmesi yetmez, hızlı da açılması gerekir. Yavaş bir sitenin işletmenize ne kadara mal olabileceğini ve neyin hızı belirlediğini anlatıyoruz.",
    body: [
      [
        "p",
        "Bir web sitesi ne kadar güzel tasarlanırsa tasarlansın, açılması uzun sürüyorsa ziyaretçinin çoğu içeriği hiç görmeden ayrılır. Google'ın kendi verilerine göre, mobil sitelerde yükleme süresi 1 saniyeden 3 saniyeye çıktığında ziyaretçinin siteden ayrılma ihtimali belirgin şekilde artıyor; sitemizin de dayandığı Google verisine göre 3 saniyeden uzun süren mobil sitelerde ziyaretlerin %53'ü yarıda bırakılıyor.",
      ],
      ["h2", "Yavaş bir sitenin gerçek bedeli nedir?"],
      [
        "ul",
        [
          "Kaybedilen ziyaretçi: Sayfa açılana kadar bekleyen kalmaz, rakibin sitesine geçer.",
          "Daha düşük arama sıralaması: Google, hız da dahil kullanıcı deneyimini sıralama etkenlerinden biri olarak değerlendirir.",
          "Daha kötü izlenim: Yavaş açılan bir site, ziyaretçide işin ciddiyetsiz yürütüldüğü hissi uyandırabilir.",
        ],
      ],
      ["h2", "Bir sitenin hızını ne belirler?"],
      [
        "ol",
        [
          "Görsellerin boyutu: Sıkıştırılmamış, gereğinden büyük fotoğraflar en sık karşılaşılan yavaşlık sebebidir.",
          "Gereksiz eklenti ve kod: Kullanılmayan ama yine de yüklenen betikler, sayfayı görünmeden önce meşgul eder.",
          "Barındırma (hosting) kalitesi: Ucuz ve aşırı yüklü sunucular, en iyi tasarlanmış siteyi bile yavaşlatabilir.",
          "Yazı tipi ve üçüncü taraf istekleri: Her dış kaynaktan yüklenen dosya (yazı tipi, harita, takip kodu) bir bekleme süresi daha ekler.",
        ],
      ],
      ["h2", "Hızı test etmenin kolay bir yolu"],
      [
        "p",
        "Google'ın ücretsiz PageSpeed Insights aracına sitenizin adresini yazmanız yeterli; hem mobil hem masaüstü için bir puan ve nelerin yavaşlattığına dair somut öneriler alırsınız.",
      ],
      ["h2", "Vitrinweb sitelerinde hız nasıl sağlanıyor?"],
      [
        "p",
        "Her site, dış bir görsel indirmeden, gereksiz eklenti taşımadan, önceden üretilmiş sayfalar olarak yayınlanır; yazı tipleri kendi sunucumuzdan, yalnızca ihtiyaç duyulan karakterlerle yüklenir. Hız, sonradan eklenen bir özellik değil, baştan itibaren tasarımın bir parçasıdır.",
      ],
    ],
  },
  {
    slug: "yerel-seo-rehberi",
    cover: "map",
    date: "14 Ekim 2026",
    title: "Yerel SEO rehberi: Mahallenizdeki aramalarda nasıl görünürsünüz?",
    excerpt:
      "Birisi bulunduğu yere yakın bir hizmet aradığında karşısına kimin çıkacağını büyük ölçüde yerel SEO belirler. Küçük bir işletmenin dikkat etmesi gereken temel etkenleri anlatıyoruz.",
    body: [
      [
        "p",
        "Yerel SEO, 'kadıköy'de kuaför' ya da 'yakınımda eczane' gibi bir yere veya konuma bağlı aramalarda işletmenizin görünürlüğünü artırmak için yapılan çalışmaların bütünüdür. Ulusal bir markayla rekabet etmenize gerek yok; yerel aramada öne çıkmak çoğu zaman doğru birkaç temel adımla mümkündür.",
      ],
      ["h2", "1. İşletme bilgileriniz her yerde birebir aynı olsun"],
      [
        "p",
        "İşletme adı, adres ve telefon numaranız; web siteniz, Google İşletme Profili'niz ve sosyal medya hesaplarınızda harfi harfine aynı yazılmalı. Bu tutarlılık (İngilizce kısaltmasıyla NAP), Google'ın işletmenizin gerçek ve güvenilir olduğuna dair en temel sinyallerinden biri.",
      ],
      ["h2", "2. Google İşletme Profilinizi eksiksiz doldurun"],
      [
        "p",
        "Kategori, çalışma saatleri, fotoğraflar, hizmet listesi gibi her alanı doldurmak, boş bırakılan bir profile göre çok daha fazla aramada görünme şansı verir.",
      ],
      ["h2", "3. Yorumları biriktirin ve yanıtlayın"],
      [
        "p",
        "Yerel sıralamada yorum sayısı ve puanı önemli bir etken. Olumlu-olumsuz her yoruma nazikçe yanıt vermek, hem Google'a hem potansiyel müşteriye işletmenin aktif ve ilgili olduğunu gösterir.",
      ],
      ["h2", "4. Site içeriğinizde konumunuzu doğal şekilde geçirin"],
      [
        "p",
        "Ana sayfanızda ve hizmet sayfalarınızda hizmet verdiğiniz semt veya şehrin adı doğal cümleler içinde geçsin. Anahtar kelimeyi zorla sıkıştırmak yerine, gerçek bir ziyaretçiye yazar gibi yazın.",
      ],
      ["h2", "5. Yerel dizinlere ve iş ortaklarına kayıt olun"],
      [
        "p",
        "Sektörünüzle ilgili dizinler, oda/dernek siteleri veya iş ortaklarınızın sitesinden sitenize verilen bağlantılar, Google'ın gözünde işletmenizin o bölgede gerçekten var olduğunu doğrulayan ek sinyallerdir.",
      ],
      ["h2", "6. Mobil uyum şart"],
      [
        "p",
        "Yerel aramaların büyük kısmı sokakta, telefonda yapılır. Sitenizin mobilde hızlı açılması ve telefon numaranıza, adresinize tek dokunuşla ulaşılabilmesi bu aramalarda belirleyici.",
      ],
      [
        "p",
        "Yerel SEO bir kerede biten bir iş değil; bilgileri güncel tutmak ve yorumlarla ilgilenmek, zamanla küçük bir işletmeyi büyük bütçeli rakiplerinin önüne bile geçirebilir.",
      ],
    ],
  },
  {
    slug: "web-sitesi-tasariminda-sik-yapilan-hatalar",
    cover: "browser",
    date: "11 Ekim 2026",
    title: "Web sitesi tasarımında sık yapılan 8 hata",
    excerpt:
      "Bir web sitesini kötü değil, etkisiz yapan çoğu zaman büyük bir eksiklik değil, küçük ve tekrar eden hatalardır. En sık karşılaşılan sekiz hatayı ve çözümlerini derledik.",
    body: [
      [
        "p",
        "Bir web sitesinin işe yaramasının şartı mükemmel olması değil; temel hataları yapmamasıdır. İşte müşteri kaybettiren en yaygın sekiz hata.",
      ],
      ["h2", "1. Güncel olmayan iletişim bilgisi"],
      [
        "p",
        "Eski bir telefon numarası ya da taşınılan bir adres, müşteriyi doğrudan rakibe gönderir. İletişim bilgileri, sitenin en sık kontrol edilmesi gereken kısmıdır.",
      ],
      ["h2", "2. Mobilde bozuk görünüm"],
      [
        "p",
        "Ziyaretçilerin büyük kısmı telefondan geliyor. Masaüstünde kusursuz görünen ama mobilde metni taşan, düğmesi tıklanamayan bir site, ziyaretçilerin çoğunu daha ilk saniyede kaybeder.",
      ],
      ["h2", "3. Yavaş yüklenme"],
      [
        "p",
        "Sıkıştırılmamış görseller ve gereksiz eklentiler, sitenin açılmasını yavaşlatır. Hızın neden bu kadar kritik olduğunu ayrı bir yazımızda ayrıntılı anlattık.",
      ],
      ["h2", "4. Net olmayan bir çağrı (CTA) eksikliği"],
      [
        "p",
        "Ziyaretçi siteye girdiğinde ne yapması gerektiğini saniyeler içinde anlamalı: ara, yaz, sipariş ver. Belirgin bir düğme veya bağlantı olmadan bu adım genelde atlanır.",
      ],
      ["h2", "5. Karmaşık, çok katmanlı menü"],
      [
        "p",
        "Bulmak için üç dört tıklama gereken bir sayfa, çoğu ziyaretçi için hiç yok demektir. Menü, işletmenizin sunduğu birkaç ana başlığı basitçe göstermeli.",
      ],
      ["h2", "6. Otomatik çalan müzik veya video"],
      [
        "p",
        "İzin almadan sesli içerik oynatmak, ziyaretçinin siteyi hemen kapatmasının en klasik sebeplerinden biri; özellikle sessiz bir ortamda ya da işte bakılan bir telefonda büyük bir rahatsızlık yaratır.",
      ],
      ["h2", "7. Güvenli olmayan bağlantı uyarısı"],
      [
        "p",
        "Tarayıcıda görünen bir güvenlik uyarısı, en iyi tasarlanmış siteyi bile güvenilmez gösterir. Bu genelde SSL sertifikasının eksik veya yanlış kurulmuş olmasından kaynaklanır ve öncelikle çözülmesi gerekir.",
      ],
      ["h2", "8. Sosyal medya ve WhatsApp bağlantısının olmaması"],
      [
        "p",
        "Bir müşteri aramadan önce mesajla sormak isteyebilir. Sitenizde görünür bir WhatsApp veya Instagram bağlantısı olmaması, kolayca ulaşılabilecek bir müşteriyi kaybetmek anlamına gelebilir.",
      ],
      [
        "p",
        "Bu sekiz maddenin çoğu, büyük bir yeniden tasarım değil, küçük düzeltmeler gerektirir; ama etkileri küçük değildir.",
      ],
    ],
  },
  {
    slug: "kucuk-isletmeler-icin-icerik-pazarlamasi",
    cover: "search",
    date: "8 Ekim 2026",
    title: "Küçük işletmeler için içerik pazarlaması: nereden başlamalı?",
    excerpt:
      "İçerik pazarlaması büyük markalara özgü bir şey değil. Küçük bir işletmenin, elindeki bilgiyi düzenli paylaşarak nasıl hem güven hem arama trafiği kazanabileceğini anlatıyoruz.",
    body: [
      [
        "p",
        "İçerik pazarlaması kulağa büyük bütçeli bir kavram gibi gelse de özünde basit bir fikre dayanır: müşterilerinizin sorduğu soruları, elinizdeki bilgiyle düzenli olarak yanıtlamak. Bu hem güven kurar hem zamanla arama motorlarında görünürlüğünüzü artırır.",
      ],
      ["h2", "Neden işe yarar?"],
      [
        "p",
        "Bir müşteri karar vermeden önce genelde araştırma yapar. Sorularına en açık ve faydalı yanıtı veren işletme, o kararın kazananı olma ihtimali en yüksek olandır. Blog yazıları, sık sorulan sorular bölümü veya kısa rehberler bu araştırma anında karşınıza çıkmanızı sağlar.",
      ],
      ["h2", "Nereden başlamalı?"],
      [
        "ol",
        [
          "Müşterilerinizin size en çok sorduğu 5-10 soruyu bir kenara not edin; bunlar ilk içerik fikirleriniz.",
          "Her biri için kısa, net ve gerçekten faydalı bir yazı hazırlayın; satış değil, yardım odaklı yazın.",
          "Yazıyı web sitenizde yayınlayın, ardından sosyal medyada kısa bir özetini paylaşıp siteye yönlendirin.",
          "Belirli bir sıklıkla (ayda 2 yazı bile olur) bu döngüyü tekrarlayın.",
        ],
      ],
      ["h2", "Hangi konular işe yarar?"],
      [
        "ul",
        [
          "Sık sorulan sorular ve net cevapları",
          "Ürün veya hizmetinizin nasıl kullanılacağına dair pratik ipuçları",
          "Sektörünüzle ilgili küçük ama gerçek bir rehber (bu yazı da tam olarak bunlardan biri)",
          "Müşteri hikayeleri veya öncesi-sonrası örnekler",
        ],
      ],
      ["h2", "Mükemmeliyetçilikten kaçının"],
      [
        "p",
        "İlk yazınız kusursuz olmak zorunda değil. Düzenli ve gerçekten faydalı olan bir içerik, nadiren yayınlanan mükemmel bir içerikten her zaman daha fazla iş yapar.",
      ],
      ["h2", "Sonuç zamanla gelir"],
      [
        "p",
        "İçerik pazarlamasının etkisi genelde hemen değil, birkaç ay içinde birikerek görülür. Her yeni yazı, sitenizin arama motorlarında görünebileceği yeni bir kapı açar; zamanla bu kapılar birikir.",
      ],
    ],
  },
  {
    slug: "musteri-yorumlari-toplama-yonetme",
    cover: "map",
    date: "5 Ekim 2026",
    title: "Müşteri yorumlarını toplama ve yönetme rehberi",
    excerpt:
      "Yorumlar hem karar verme sürecinde hem arama sıralamasında güçlü bir etken. Yorum isteme, yanıtlama ve olumsuz bir yorumla karşılaşınca ne yapılacağını anlatıyoruz.",
    body: [
      [
        "p",
        "Bir işletmeyi ilk kez duyan bir müşteri için en güvenilir bilgi kaynağı, genelde başka müşterilerin yorumlarıdır. Yorumlar hem karar verme sürecini kısaltır hem de Google'ın yerel aramalarda kimi öne çıkaracağını etkiler.",
      ],
      ["h2", "Yorum nasıl istenir?"],
      [
        "ul",
        [
          "Doğru zaman: hizmet veya ürün teslim edildikten hemen sonra, memnuniyet henüz tazeyken isteyin.",
          "Kolaylaştırın: Google İşletme Profilinizin doğrudan yorum bağlantısını WhatsApp'tan veya sitenizden paylaşın.",
          "Kişiselleştirin: Genel bir mesaj yerine, müşterinin adını kullanan kısa ve samimi bir istek daha çok karşılık bulur.",
        ],
      ],
      ["h2", "Yorumlara nasıl yanıt verilir?"],
      [
        "p",
        "Olumlu bir yoruma kısa bir teşekkürle yanıt vermek bile, o yorumu okuyan başka birine işletmenin ilgili olduğunu gösterir. Olumsuz bir yoruma sakin, savunmacı olmayan ve çözüm odaklı bir dille yanıt vermek, aslında yorumun kendisinden daha çok izlenir.",
      ],
      ["h2", "Olumsuz bir yorumla karşılaşınca"],
      [
        "ol",
        [
          "Hemen ve duygusal tepki vermeden önce bir adım geri çekilin.",
          "Şikayeti anladığınızı gösteren kısa bir açıklama yazın; tartışmaya girmeyin.",
          "Mümkünse konuşmayı özelden devam ettirmeyi teklif edin (telefon veya WhatsApp).",
          "Sorunu gerçekten çözdüyseniz, yorumu güncellemesini nazikçe rica edebilirsiniz.",
        ],
      ],
      ["h2", "Yapılmaması gerekenler"],
      [
        "p",
        "Sahte olumlu yorum satın almak veya yazdırmak hem platform kurallarını ihlal eder hem de fark edildiğinde güveni tamamen sarsar. Uzun vadede gerçek, biraz kusurlu ama tutarlı bir yorum profili, sahte bir mükemmellikten çok daha güvenilir görünür.",
      ],
      ["h2", "Yorumları sitenizde de gösterin"],
      [
        "p",
        "Google'daki en güzel birkaç yorumu web sitenizde bir referans bölümünde paylaşmak, sitenize gelen ama henüz Google'a bakmamış bir ziyaretçi için de güven oluşturur.",
      ],
    ],
  },
  {
    slug: "web-sitesi-olmayan-isletme-ne-kaybeder",
    cover: "search",
    date: "2 Ekim 2026",
    title: "Web sitesi olmayan bir işletme neler kaybeder?",
    excerpt:
      "Web sitesi olmadan da iş yürütülebilir, ama sessizce kaybedilen fırsatlar birikir. Bir web sitesi olmamasının somut olarak neye mal olduğunu anlatıyoruz.",
    body: [
      [
        "p",
        "Web sitesi olmadan yıllardır iş yapan işletmeler var, bu doğru. Ama bu, hiçbir şey kaybetmedikleri anlamına gelmiyor; kayıplar sadece görünmüyor. İşte en sık rastlanan beş görünmez kayıp.",
      ],
      ["h2", "1. Gece ve tatil günü gelen aramalar"],
      [
        "p",
        "Mesai saatiniz bittiğinde telefonlar susar, ama müşteri arama davranışı susmaz. Bir web sitesi, siz uyurken bile fiyat, hizmet ve iletişim bilgisi sunarak ertesi gün geri dönebileceğiniz bir talep bırakır.",
      ],
      ["h2", "2. Arama sonuçlarında görünmemek"],
      [
        "p",
        "Birisi hizmetinizi Google'da aradığında karşısına genelde web siteleri çıkar. Sitesi olmayan bir işletme, bu aramalarda neredeyse hiç yer almaz; rakip, sadece sitesi olduğu için önde görünür.",
      ],
      ["h2", "3. İlk izlenimde güven kaybı"],
      [
        "p",
        "Bir işletmeyi ilk kez duyan biri genelde adını arar. Karşısına düzgün bir site yerine sadece dağınık sosyal medya gönderileri çıkarsa, işin ciddiyeti konusunda tereddüt oluşabilir.",
      ],
      ["h2", "4. Aynı soruları tekrar tekrar yanıtlamak"],
      [
        "p",
        "Fiyat, çalışma saatleri, adres gibi sorular telefonla veya mesajla tekrar tekrar sorulur. Bu bilgiler bir web sitesinde her an erişilebilir olsa, hem müşterinin hem sizin zamanınız kazanılır.",
      ],
      ["h2", "5. Sosyal medyaya tamamen bağımlı kalmak"],
      [
        "p",
        "Bir sosyal medya hesabı, platformun kurallarına ve algoritmasına bağlıdır; erişiminiz bir gecede düşebilir veya hesaba erişim sorunu yaşayabilirsiniz. Web siteniz ve alan adınız ise yalnızca size aittir.",
      ],
      [
        "p",
        "Hiçbiri tek başına işi bitiren bir kayıp değil; ama üst üste bindiğinde, sessizce kaçırılan fırsatların toplamı hiç de küçük olmuyor.",
      ],
    ],
  },
  {
    slug: "whatsapp-business-musteri-iletisimi",
    cover: "browser",
    date: "29 Eylül 2026",
    title: "WhatsApp Business ile müşteri iletişimini profesyonelleştirmek",
    excerpt:
      "Türkiye'de internet kullananların büyük çoğunluğu WhatsApp kullanıyor. WhatsApp Business'ın sıradan WhatsApp'tan farkını ve işletmeniz için nasıl kullanacağınızı anlatıyoruz.",
    body: [
      [
        "p",
        "TÜİK'in 2026 verilerine göre internet kullananların %90'ı WhatsApp kullanıyor; bu da onu Türkiye'deki en yaygın iletişim kanalı yapıyor. WhatsApp Business, bu kanalı sıradan bir sohbetten işletmeniz için gerçek bir müşteri iletişim aracına dönüştürüyor.",
      ],
      ["h2", "WhatsApp Business'ı farklı kılan nedir?"],
      [
        "ul",
        [
          "İşletme profili: adres, çalışma saatleri, web sitesi ve kategori bilgisi ekleyebilirsiniz.",
          "Katalog: ürün veya hizmetlerinizi fotoğraf ve fiyatlarıyla sohbetin içinden gösterebilirsiniz.",
          "Otomatik karşılama mesajı: mesai dışında yazan bir müşteriye anında bir bilgilendirme gönderir.",
          "Hızlı yanıtlar: sık sorulan sorulara tek tuşla, önceden hazırlanmış cevaplar gönderebilirsiniz.",
          "Etiketler: konuşmaları 'yeni sipariş', 'ödeme bekleniyor' gibi etiketlerle düzenleyebilirsiniz.",
        ],
      ],
      ["h2", "Kurulumda dikkat edilmesi gerekenler"],
      [
        "ol",
        [
          "İşletme adını, kategoriyi ve profil fotoğrafını gerçek ve tanınabilir tutun.",
          "Çalışma saatlerini güncel tutun; mesai dışı otomatik mesaj bu bilgiye göre gösterilir.",
          "Kısa ve net bir karşılama mesajı yazın; müşteriye kiminle konuştuğunu hemen hissettirin.",
          "Katalog varsa güncel fiyatlarla tutun; eski bir fiyat, müşteriyle ilk temasta güven sorunu yaratabilir.",
        ],
      ],
      ["h2", "Web sitenizle birlikte kullanın"],
      [
        "p",
        "WhatsApp hızlı ve samimi bir kanal, ama fiyat listesi, hizmet detayları ve sık sorulan sorular gibi uzun bilgiler için ideal değil. Web sitenize bir WhatsApp bağlantısı ekleyerek, müşteriye önce detaylı bilgiyi sitede sunup, karar verdiğinde tek dokunuşla mesaj yazmasını sağlayabilirsiniz.",
      ],
      ["h2", "Küçük bir alışkanlık, büyük bir fark yaratır"],
      [
        "p",
        "Hızlı yanıtlar ve otomatik karşılama mesajı gibi özellikleri bir kere kurup unutabilirsiniz; ama her yeni müşteri için sizin adınıza profesyonel bir ilk izlenim bırakmaya devam ederler.",
      ],
    ],
  },
  {
    slug: "web-sitesi-fiyati-neye-bagli",
    cover: "browser",
    date: "26 Eylül 2026",
    title: "Web sitesi fiyatları: Bir web sitesi kaça çıkar, neye bağlı?",
    excerpt:
      "Web sitesi fiyatları birkaç yüz liradan on binlerce liraya kadar değişebiliyor. Bu farkın nereden geldiğini ve bir teklif alırken nelere dikkat etmeniz gerektiğini anlatıyoruz.",
    body: [
      [
        "p",
        "Web sitesi fiyatı diye aratıldığında karşınıza çok geniş bir aralık çıkar; bunun sebebi hepsinin aynı şeyi satmamasıdır. Fiyatı asıl belirleyen, sitenin arkasında ne kadar iş ve sorumluluk olduğudur.",
      ],
      ["h2", "Fiyatı belirleyen temel etkenler"],
      [
        "ul",
        [
          "Hazır şablon mu, özel tasarım mı: Herkese aynı görünen bir şablon ile işletmenize özel tasarlanmış bir site arasında hem görünüm hem emek farkı büyüktür.",
          "Sayfa ve özellik sayısı: Tek sayfalık basit bir tanıtım ile randevu sistemi, çoklu dil veya ürün kataloğu içeren bir site aynı fiyata mal olmaz.",
          "İçerik hazırlığı: Metinleri, fotoğrafları siz mi sağlıyorsunuz yoksa bunlar da mı hazırlanıyor, fiyatı doğrudan etkiler.",
          "Servis ve bakım: Bir site yayına alındıktan sonra kimin sorumluluğunda; güncelleme, teknik destek bu maliyete dahil mi?",
          "Alan adı ve barındırma: Bazı teklifler bunu içerir, bazıları ayrıca fatura eder; teklif karşılaştırırken bu kalemi mutlaka sorun.",
        ],
      ],
      ["h2", "Çok ucuz bir teklifte nelere dikkat etmeli?"],
      [
        "p",
        "Piyasanın çok altında bir fiyat gördüğünüzde, neyin dahil olmadığına bakın: Site yayına girdikten bir yıl sonra ne olacak? Bir sorun çıkarsa kim ilgilenecek? Genelde ucuzluk, sonradan ek ücret olarak geri döner.",
      ],
      ["h2", "Pahalı olan her zaman daha iyi midir?"],
      [
        "p",
        "Hayır. Küçük bir işletme için gerekenden fazla karmaşık ve pahalı bir sistem, hem bütçenizi hem de siteyi yönetme kolaylığınızı olumsuz etkileyebilir. Doğru soru en ucuzu veya en pahalısı değil, ihtiyacınıza uygun olanıdır.",
      ],
      ["h2", "Teklif alırken sorulması gereken sorular"],
      [
        "ol",
        [
          "Bu fiyata tam olarak hangi sayfalar ve özellikler dahil?",
          "İlk yıldan sonra servis/bakım ücreti var mı, ne kadar?",
          "Alan adı ve barındırma bu fiyata dahil mi?",
          "Memnun kalmazsam iptal koşulları ve süresi nedir?",
        ],
      ],
      [
        "p",
        "Vitrinweb sitelerinde bu sorulara net bir cevabımız var: sabit ve tek bir temel fiyat, ilk yıl servis ve bakım ücretsiz, istediğiniz ek özellik için ayrı ve açık fiyat, taahhüt yok.",
      ],
    ],
  },
  {
    slug: "web-sitesi-mi-instagram-mi",
    cover: "browser",
    date: "25 Eylül 2026",
    title: "İşletmeniz için web sitesi mi, yalnızca Instagram mı?",
    excerpt:
      "Instagram ilgi uyandırır, web sitesi kararı kolaylaştırır. İkisinin farkını ve birlikte nasıl daha iyi çalıştıklarını anlatıyoruz.",
    body: [
      [
        "p",
        "Birçok küçük işletme ilk dijital adımını Instagram ile atıyor. Bu doğru bir başlangıç: TÜİK'in 2026 verilerine göre internet kullananların %71,1'i Instagram kullanıyor. Ancak sosyal medya hesabı ile web sitesi aynı işi yapmaz; birbirini tamamlar.",
      ],
      ["h2", "Instagram'ın güçlü olduğu yerler"],
      [
        "ul",
        [
          "Takipçilerinizle hızlı ve samimi iletişim kurmak,",
          "ürün ve hizmetlerinizi görsellerle, günlük olarak göstermek,",
          "kampanyaları ve yenilikleri anında duyurmak.",
        ],
      ],
      ["h2", "Web sitesinin farkı"],
      [
        "p",
        "Sahiplik: Instagram hesabınız platformun kurallarına bağlıdır. Algoritma değiştiğinde erişiminiz düşebilir, hesabınıza erişimde sorun yaşayabilirsiniz. Web siteniz ve alan adınız ise size aittir.",
      ],
      [
        "p",
        "Aramada görünürlük: Birisi Google'da hizmetinizi aradığında karşısına çoğunlukla web siteleri ve Google İşletme Profilleri çıkar. Instagram gönderileri bu aramalarda sınırlı görünür.",
      ],
      [
        "p",
        "Güven: Adresi, çalışma saatleri, hizmetleri ve iletişim bilgileri düzenli sunulan bir site, sizi ilk kez duyan müşteri için güçlü bir güven işaretidir.",
      ],
      ["p", "Kalıcı bilgi: Sık sorulan sorular, hizmet ayrıntıları ve fiyatlar akışta kaybolmaz; müşteri aradığını tek yerde bulur."],
      ["h2", "En iyi sonuç: ikisi birlikte"],
      [
        "p",
        "Instagram biyografinizdeki bağlantıyı web sitenize yönlendirin; sitenizden de Instagram hesabınıza ve WhatsApp'a tek dokunuşla ulaşılabilsin. Böylece takipçiniz müşteriye, müşteriniz takipçiye dönüşür.",
      ],
      ["h2", "Kısa kontrol listesi"],
      [
        "ul",
        [
          "Instagram biyografinizde web sitenizin adresi var mı?",
          "Sitenizde çalışma saatleri, adres ve telefon güncel mi?",
          "WhatsApp butonu telefonda tek dokunuşla çalışıyor mu?",
          "Hizmetleriniz ve fiyatlarınız sitede açıkça yazıyor mu?",
        ],
      ],
    ],
  },
  {
    slug: "google-isletme-profili-rehberi",
    cover: "map",
    date: "22 Eylül 2026",
    title: "Google İşletme Profili nedir, nasıl oluşturulur?",
    excerpt:
      "Google'da ve Haritalar'da görünmenin ücretsiz ve en önemli adımlarından biri. Profilinizi adım adım nasıl oluşturacağınızı anlatıyoruz.",
    body: [
      [
        "p",
        "Google'da veya Google Haritalar'da bir işletme aradığınızda gördüğünüz adres, çalışma saatleri, fotoğraflar ve yorumlardan oluşan bilgi kartı, Google İşletme Profili'dir. Ücretsizdir ve yerel aramalarda görünmenin en önemli adımlarından biridir.",
      ],
      ["h2", "Neden önemli?"],
      [
        "p",
        "Google'ın 2016 verilerine göre, telefonundan yakınındaki bir şeyi arayanların %76'sı bir gün içinde ilgili bir işletmeyi ziyaret ediyor. Bu aramalarda öne çıkan bilgilerin büyük kısmı İşletme Profili'nden gelir.",
      ],
      ["h2", "Adım adım oluşturma"],
      [
        "ol",
        [
          "business.google.com adresine Google hesabınızla girin ve işletmenizin adını yazın.",
          "İşletmenize en uygun ana kategoriyi seçin (ör. güzellik salonu, diş kliniği). Kategori, hangi aramalarda görüneceğinizi doğrudan etkiler.",
          "Müşterilerin sizi ziyaret ettiği bir adresiniz varsa adresinizi girin; yalnızca müşterinin yanına giderek hizmet veriyorsanız hizmet bölgelerinizi belirleyin.",
          "Telefon numaranızı ve web sitenizin adresini ekleyin.",
          "İşletmenizi doğrulayın. Google, doğrulama yöntemini işletmeye göre belirler; telefon, e-posta veya kısa bir video kaydı istenebilir.",
          "Çalışma saatlerinizi, hizmetlerinizi ve birkaç kaliteli fotoğraf ekleyin.",
        ],
      ],
      ["h2", "Profilinizi güçlü tutmanın yolları"],
      [
        "ul",
        [
          "İşletme adınız, adresiniz ve telefonunuz sitenizde ve profilinizde birebir aynı yazılsın.",
          "Resmî tatillerde ve özel günlerde çalışma saatlerinizi güncelleyin.",
          "Memnun müşterilerinizden yorum isteyin ve olumsuz olanlar dahil tüm yorumlara nazikçe yanıt verin.",
          "Yeni fotoğrafları ve duyuruları düzenli olarak paylaşın.",
        ],
      ],
      ["h2", "Sıralamayı ne belirler?"],
      [
        "p",
        "Google, yerel sonuçları başlıca üç etkene göre sıralar: aramayla ilgililik, aranan konuma uzaklık ve işletmenin bilinirliği. Yorumlar, profilin doluluğu ve web siteniz bu etkenleri güçlendirir; ancak hiçbir hizmet belirli bir sırada çıkmayı garanti edemez.",
      ],
      ["h2", "Web sitenizle birlikte çalışır"],
      [
        "p",
        "İşletme Profili kısa ve hızlı bilgi verir; web siteniz ise ayrıntıyı, güveni ve iletişimi tamamlar. Profildeki web sitesi bağlantısı, karar vermek üzere olan müşteriyi doğrudan size getirir.",
      ],
    ],
  },
  {
    slug: "kucuk-isletmeler-icin-temel-seo",
    cover: "search",
    date: "18 Eylül 2026",
    title: "Küçük işletmeler için temel SEO: 7 adım",
    excerpt:
      "Arama motorlarında doğru aramalarda görünmek için karmaşık çalışmalara gerek yok. Küçük bir işletmenin atması gereken temel adımlar.",
    body: [
      [
        "p",
        "SEO (arama motoru optimizasyonu), sitenizin Google gibi arama motorlarında doğru aramalarda görünmesi için yapılan çalışmaların bütünüdür. Küçük bir işletme için temel adımlar sanıldığı kadar karmaşık değildir.",
      ],
      ["h2", "1. Her hizmete ayrı bir sayfa"],
      ["p", "Saç boyama ve cilt bakımı gibi farklı hizmetleri ayrı sayfalarda anlatmak, her birinin kendi aramasında görünmesini kolaylaştırır."],
      ["h2", "2. Başlık ve açıklamaları özenle yazın"],
      [
        "p",
        'Her sayfanın başlığında hizmetinizi ve bulunduğunuz yeri belirtin (ör. "Kadıköy\'de cilt bakımı | Nova Güzellik"). Arama sonuçlarında görünen kısa açıklama, kullanıcının tıklama kararını etkiler.',
      ],
      ["h2", "3. İşletme bilgileriniz her yerde aynı olsun"],
      [
        "p",
        "İşletme adınız, adresiniz ve telefonunuz sitenizde, Google İşletme Profili'nizde ve sosyal medya hesaplarınızda birebir aynı yazılmalıdır.",
      ],
      ["h2", "4. Mobil uyum ve hız"],
      [
        "p",
        "Ziyaretçilerin çoğu telefondan gelir. Google'ın verilerine göre mobil ziyaretlerin %53'ü, sayfa 3 saniyede açılmazsa yarıda bırakılıyor. Görselleri sıkıştırın ve gereksiz eklentilerden kaçının.",
      ],
      ["h2", "5. Müşterilerinizin sorularını yanıtlayın"],
      ["p", "Sık sorulan sorular bölümü ve blog yazıları, insanların aradığı sorulara yanıt vererek sitenizin daha çok aramada görünmesini sağlar."],
      ["h2", "6. Google Search Console'a kaydolun"],
      ["p", "Ücretsiz olan bu araç, sitenizin hangi aramalarda göründüğünü ve teknik bir sorun olup olmadığını gösterir. Site haritanızı da buradan gönderebilirsiniz."],
      ["h2", "7. Sabırlı olun, düzenli güncelleyin"],
      ["p", "SEO çalışmalarının etkisi genellikle birkaç hafta ile birkaç ay arasında görülür. Düzenli güncellenen ve doğru bilgi veren siteler zamanla daha iyi sonuç alır."],
      ["h2", "Vitrinweb sitelerinde neler hazır gelir?"],
      ["p", "Her sitede sayfa başlıkları, açıklamalar, site haritası ve işletme bilgileri için yapısal veri başlangıçta kurulur. İçeriklerinizi güncel tutmak ise sizin elinizdeki en güçlü SEO aracıdır."],
    ],
  },
];

export const readMin = (p: BlogPost): number =>
  Math.max(2, Math.round(JSON.stringify(p.body).split(/\s+/).length / 180));

const TR_MONTHS: Record<string, string> = {
  Ocak: "01",
  Şubat: "02",
  Mart: "03",
  Nisan: "04",
  Mayıs: "05",
  Haziran: "06",
  Temmuz: "07",
  Ağustos: "08",
  Eylül: "09",
  Ekim: "10",
  Kasım: "11",
  Aralık: "12",
};

/** "25 Eylül 2026" -> "2026-09-25" (yapısal veri / meta etiketleri için). */
export const dateToISO = (trDate: string): string | undefined => {
  const m = /^(\d{1,2})\s+(\S+)\s+(\d{4})$/.exec(trDate.trim());
  if (!m) return undefined;
  const month = TR_MONTHS[m[2]];
  if (!month) return undefined;
  return `${m[3]}-${month}-${m[1].padStart(2, "0")}`;
};
