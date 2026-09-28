import { COMPANY, companyLine, isPlaceholder } from "@/data/company";
import { INCLUDED } from "@/data/content";
import { TL, VAT_NOTE, YEARLY } from "@/lib/config";
import type { LegalDoc } from "@/lib/types";

/* ================= YASAL METİNLER =================
   Blok biçimi: ["h", başlık] | ["p", paragraf] | ["ul", [maddeler]] | ["order"] (sipariş özeti).
   Köşeli parantezli açık uç kalmadı; makul varsayılan koşullar (revizyon hakkı, teslim süresi,
   fikri haklar/alan adı devri, iptal sonrası iade oranı) buraya yazıldı. Bunlar işletme sahibinin
   onayladığı varsayılan koşullardır — gerçek niyetle farklıysa güncellenmelidir. Yayından önce
   yine de bir hukukçu tarafından gözden geçirilmelidir. */
export const LEGAL_DOCS: Record<string, LegalDoc> = {
  kvkk: {
    t: "KVKK Aydınlatma Metni",
    b: () => {
      const kepClause = isPlaceholder(COMPANY.kep) ? "" : `${COMPANY.kep} KEP adresine veya `;
      return [
        [
          "p",
          `Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun ("KVKK") 10. maddesi ve Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ uyarınca, veri sorumlusu sıfatıyla ${COMPANY.title} ("${COMPANY.brand}") tarafından hazırlanmıştır.`,
        ],
        ["h", "1. Veri sorumlusu"],
        ["p", companyLine()],
        ["h", "2. İşlenen kişisel veriler"],
        [
          "ul",
          [
            "Kimlik: ad, soyad; bireysel faturalar için T.C. kimlik numarası.",
            "İletişim: telefon numarası, e-posta adresi, fatura adresi, WhatsApp numarası.",
            "Müşteri işlem: sipariş içeriği, seçilen özellikler, teklif talepleri, proje formu ile gönderdiğiniz metin, logo ve görseller.",
            "Finans: fatura bilgileri, ödeme tutarı ve ödeme işlem referansı. Kart bilgileriniz tarafımızca işlenmez ve saklanmaz; ödeme, lisanslı ödeme kuruluşu tarafından alınır.",
            "İşlem güvenliği: IP adresi, işlem tarihi ve saati, sistem kayıtları.",
            "Pazarlama: yalnızca ticari elektronik ileti onayı vermeniz hâlinde iletişim bilgileriniz.",
          ],
        ],
        ["h", "3. İşleme amaçları"],
        [
          "ul",
          [
            "Siparişinize ilişkin sözleşmenin kurulması ve ifası,",
            "web sitenizin tasarlanması, geliştirilmesi, yayına alınması, servis ve bakımının yapılması,",
            "faturalandırma ve muhasebe işlemleri,",
            "sizinle iletişim kurulması ve talep ettiğiniz özellikler için teklif hazırlanması,",
            "mevzuattan doğan yükümlülüklerin yerine getirilmesi ve yetkili kurumların taleplerinin karşılanması,",
            "bilgi güvenliğinin sağlanması ve kötüye kullanımın önlenmesi,",
            "onay vermeniz hâlinde kampanya ve duyuruların iletilmesi.",
          ],
        ],
        ["h", "4. Hukuki sebepler"],
        [
          "p",
          "Kişisel verileriniz KVKK'nın 5. maddesinin 2. fıkrasında yer alan; bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (c), veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi (ç), bir hakkın tesisi, kullanılması veya korunması (e) ve temel hak ve özgürlüklerinize zarar vermemek kaydıyla veri sorumlusunun meşru menfaati (f) hukuki sebeplerine dayanılarak işlenir. Ticari elektronik ileti gönderimi yalnızca açık onayınıza dayanır.",
        ],
        ["h", "5. Toplama yöntemi"],
        [
          "p",
          "Kişisel verileriniz; bu sitedeki sipariş ve proje formları ile e-posta, telefon ve WhatsApp yazışmaları aracılığıyla, kısmen otomatik yollarla toplanır.",
        ],
        ["h", "6. Aktarım"],
        [
          "p",
          "Kişisel verileriniz yukarıdaki amaçlarla sınırlı olarak; ödeme kuruluşuna, barındırma (hosting), e-posta ve bulut hizmeti sağlayıcılarına, muhasebe ve mali müşavirlik hizmeti alınan kişilere, hukuki danışmanlara ve talep hâlinde yetkili kamu kurum ve kuruluşlarına aktarılabilir.",
        ],
        [
          "p",
          "Kullanılan bazı hizmet sağlayıcıların sunucuları yurt dışında bulunabilir. Bu durumda aktarım, KVKK'nın 9. maddesine uygun olarak yeterlilik kararı, standart sözleşme gibi uygun güvenceler veya kanunda sayılan diğer hâller çerçevesinde yapılır. Sitenin barındırılması için GitHub, Inc. (ABD) kullanılır; kurulmuşsa form ve sipariş bildirimleri Google LLC'nin (ABD) altyapısı üzerinden iletilir. Yeni bir hizmet sağlayıcı devreye alındığında bu liste güncellenir.",
        ],
        ["h", "7. Saklama süresi"],
        [
          "p",
          "Sözleşme, fatura ve muhasebe kayıtları, başta Türk Ticaret Kanunu ve Vergi Usul Kanunu olmak üzere ilgili mevzuatta öngörülen süreler boyunca (10 yıla kadar) saklanır. Tamamlanmamış sipariş kayıtları 6 ay sonra, pazarlama amaçlı veriler ise onayınızı geri almanızla silinir. Süresi dolan veriler silinir, yok edilir veya anonim hâle getirilir.",
        ],
        ["h", "8. Haklarınız"],
        ["p", "KVKK'nın 11. maddesi uyarınca veri sorumlusuna başvurarak:"],
        [
          "ul",
          [
            "kişisel verilerinizin işlenip işlenmediğini öğrenme,",
            "işlenmişse buna ilişkin bilgi talep etme,",
            "işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,",
            "yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,",
            "eksik veya yanlış işlenmişse düzeltilmesini isteme,",
            "KVKK'nın 7. maddesindeki şartlar çerçevesinde silinmesini veya yok edilmesini isteme,",
            "düzeltme, silme ve yok etme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,",
            "münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,",
            "kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.",
          ],
        ],
        ["h", "9. Başvuru"],
        [
          "p",
          `Başvurunuzu, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ'e uygun olarak ve kimliğinizi tespit edici bilgilerle birlikte; yazılı olarak ${COMPANY.address} adresine, ${kepClause}sistemimizde kayıtlı e-posta adresinizden ${COMPANY.email} adresine iletebilirsiniz. Başvurunuz en geç 30 gün içinde ücretsiz olarak sonuçlandırılır. İşlemin ayrıca bir maliyet gerektirmesi hâlinde, Kişisel Verileri Koruma Kurulunca belirlenen tarifedeki ücret alınabilir.`,
        ],
      ];
    },
  },

  cerez: {
    t: "Çerez ve Yerel Depolama Politikası",
    b: () => [
      ["p", "Bu sitede reklam, analiz veya takip amaçlı çerez kullanılmaz."],
      ["h", "Kullanılan zorunlu depolama"],
      [
        "p",
        "Sitenin çalışması için tarayıcınızın yerel depolama alanına yalnızca aşağıdaki teknik bilgiler kaydedilir. Bunlar talep ettiğiniz hizmetin sunulması için zorunlu olduğundan ayrıca izin alınmaz.",
      ],
      [
        "ul",
        [
          "Sipariş taslağı: formu yarıda bırakırsanız kaldığınız yerden devam edebilmeniz içindir. En fazla 7 gün saklanır ve ödeme tamamlandığında silinir.",
          "Açık sipariş kimliği: sayfayı yenilediğinizde siparişinize dönebilmeniz içindir. Kişisel veri içermez.",
        ],
      ],
      ["h", "Üçüncü taraf kaynaklar"],
      [
        "p",
        "Sitenin çalışması için gerekli bazı yazılım dosyaları bir içerik dağıtım ağı (CDN) üzerinden yüklenebilir. Bu sırada IP adresiniz, teknik bir zorunluluk olarak ilgili sağlayıcıya iletilir. Yazı tipleri sitenin kendi dosyalarından yüklenir.",
      ],
      ["h", "Tercihlerinizi yönetme"],
      ["p", "Yerel depolamayı tarayıcınızın ayarlarından dilediğiniz zaman silebilirsiniz. Bu durumda tamamlanmamış sipariş taslağınız da silinir."],
      ["p", "Sitede analiz veya pazarlama amaçlı bir araç kullanılmaya başlanırsa, bu araçlar yalnızca açık izninizle çalıştırılacak ve bu politika güncellenecektir."],
    ],
  },

  mesafeli: {
    t: "Ön Bilgilendirme Formu ve Mesafeli Satış Sözleşmesi",
    b: () => [
      ["p", "Bu metin, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği uyarınca, siparişinizi onaylamadan önce bilgilendirilmeniz amacıyla hazırlanmıştır."],
      ["h", "Ön Bilgilendirme Formu"],
      ["h", "1. Satıcı / sağlayıcı"],
      ["p", companyLine()],
      ["h", "2. Hizmetin temel nitelikleri"],
      [
        "p",
        `Sipariş edilen hizmet; işletmeniz için web sitesi tasarımı ve geliştirilmesi, yayına alınması ve ilk yıl servis ve bakımıdır. Temel pakete ${INCLUDED.filter((f) => f.icon !== "shield")
          .map((f) => f.t.toLocaleLowerCase("tr"))
          .join(", ")} dahildir. Seçtiğiniz ek özellikler siparişinize eklenir.`,
      ],
      ["h", "3. Fiyat ve ödeme"],
      [
        "p",
        `Fiyatlar ${VAT_NOTE.toLocaleLowerCase("tr")}. Ödeme, sipariş sırasında banka veya kredi kartıyla, lisanslı ödeme kuruluşu aracılığıyla peşin alınır. Teklif ile fiyatlanan özellikler (Online Ödeme, Yönetim Paneli ve özel istekler) sipariş tutarına dahil değildir; bunlar için ayrı bir teklif iletilir ve yalnızca teklifi onaylamanız hâlinde ayrıca ödeme alınır.`,
      ],
      ["order"],
      ["h", "4. Yıllık servis ve bakım"],
      [
        "p",
        `İlk yıl servis ve bakım ücretsizdir. 2. yıl ücreti ${TL(YEARLY)}'dir; sonraki yıllarda ücret, TÜİK'in açıkladığı yıllık TÜFE oranında güncellenir ve yeni ücret yenilemeden en az 30 gün önce bildirilir. Servisin yenilenmesi isteğinize bağlıdır; yenilemek istemezseniz hiçbir ücret ödemeden hizmeti sona erdirebilirsiniz.`,
      ],
      ["h", "5. İfa (teslim)"],
      [
        "p",
        "Tasarım çalışması, proje başlangıç formu ile içeriklerinizin (logo, metin ve görseller) bize ulaşması ve hizmetin başlamasını onaylamanızla başlar. Teslim süresi, içeriklerin eksiksiz iletilmesine ve seçilen özelliklere bağlıdır; takvim, içerikleriniz ulaştığında yazılı olarak paylaşılır. Tasarım aşamasında 2 revizyon hakkınız bulunur; içerikleriniz eksiksiz ulaştıktan sonra siteniz en geç 30 gün içinde yayına hazır hâle getirilir.",
      ],
      ["h", "6. Cayma hakkı"],
      [
        "p",
        `Sözleşmenin kurulduğu günden itibaren 14 gün içinde herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden cayabilirsiniz. Cayma bildiriminizi bu süre içinde yazılı olarak veya e-posta ile ${COMPANY.email} adresine iletmeniz yeterlidir. Bildiriminiz bize ulaştıktan sonra en geç 14 gün içinde ödemeniz, ödemede kullandığınız araçla iade edilir.`,
      ],
      [
        "p",
        "Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesi uyarınca, cayma süresi dolmadan önce onayınızla ifasına başlanan hizmetlerde cayma hakkı kullanılamaz. Tasarım çalışması, proje formunu gönderirken hizmetin başlamasını açıkça onaylamanızla başlar; bu onayı vermediğiniz sürece cayma hakkınız devam eder.",
      ],
      ["h", "7. Şikâyet ve itirazlar"],
      [
        "p",
        `Şikâyetlerinizi ${COMPANY.email} adresine iletebilirsiniz. Uyuşmazlık hâlinde, Ticaret Bakanlığınca her yıl belirlenen parasal sınırlar dahilinde, yerleşim yerinizdeki veya işlemi yaptığınız yerdeki Tüketici Hakem Heyetine ya da Tüketici Mahkemesine başvurabilirsiniz.`,
      ],
      ["h", "8. Bilgilerin düzeltilmesi ve sözleşmenin saklanması"],
      [
        "p",
        "Ödeme öncesinde girdiğiniz bilgileri sipariş özetindeki bağlantılarla düzeltebilirsiniz. Sipariş onayınız ve bu sözleşmenin bir örneği e-posta adresinize gönderilir; sözleşme 10 yıl süreyle saklanır ve talep etmeniz hâlinde size iletilir.",
      ],
      ["h", "Mesafeli Satış Sözleşmesi"],
      ["h", "Madde 1: Taraflar"],
      ["p", `Satıcı / sağlayıcı: ${COMPANY.title}. Alıcı: sipariş formunda bilgileri yer alan kişi.`],
      ["h", "Madde 2: Konu"],
      [
        "p",
        "Bu sözleşmenin konusu, alıcının elektronik ortamda sipariş ettiği web sitesi tasarım, geliştirme, servis ve bakım hizmetine ilişkin tarafların hak ve yükümlülükleridir. Yukarıdaki Ön Bilgilendirme Formu bu sözleşmenin ayrılmaz parçasıdır.",
      ],
      ["h", "Madde 3: Tarafların yükümlülükleri"],
      [
        "ul",
        [
          "Sağlayıcı, hizmeti ön bilgilendirmede belirtilen kapsam ve niteliklerde, özenle sunar.",
          "Alıcı, web sitesinde kullanılacak içerikleri zamanında iletir ve bu içeriklerin üçüncü kişilerin fikri mülkiyet ve kişilik haklarını ihlal etmediğini taahhüt eder.",
          "İçeriklerin iletilmesindeki gecikmeler, teslim takvimini aynı ölçüde uzatır.",
        ],
      ],
      ["h", "Madde 4: Fikri haklar ve alan adı"],
      [
        "p",
        "Tamamlanan web sitesinin tasarımı, kaynak dosyaları ve alan adı alıcıya aittir. Servis sona erdiğinde (yenilenmemesi veya iptal hâlinde), alıcının talebi üzerine site dosyaları ve alan adının devri en geç 30 gün içinde gerçekleştirilir.",
      ],
      ["h", "Madde 5: Yıllık servis, cayma hakkı ve iade"],
      ["p", "Yıllık servis ve cayma hakkına ilişkin koşullar, Ön Bilgilendirme Formu'nun 4. ve 6. maddelerinde ve İptal ve İade Politikası'nda belirtildiği gibidir."],
      ["h", "Madde 6: Uyuşmazlıklar"],
      ["p", "Bu sözleşmeden doğan uyuşmazlıklarda Türk hukuku uygulanır; tüketici işlemlerinde Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir."],
      ["h", "Madde 7: Yürürlük"],
      ["p", "Alıcının ödemeyi tamamlamadan önce bu sözleşmeyi okuyup elektronik ortamda onaylamasıyla sözleşme kurulmuş olur."],
    ],
  },

  iade: {
    t: "İptal ve İade Politikası",
    b: () => [
      ["p", "Bu sayfa, sözleşmedeki iptal ve iade koşullarının kısa bir özetidir."],
      ["h", "Çalışma başlamadan önce"],
      [
        "p",
        "Sipariş tarihinden itibaren 14 gün içinde, proje formunu göndererek tasarım çalışmasının başlamasını onaylamadıysanız siparişinizi gerekçe göstermeden iptal edebilirsiniz. Ödemenizin tamamı, bildiriminiz bize ulaştıktan sonra en geç 14 gün içinde ödeme yaptığınız araçla iade edilir.",
      ],
      ["h", "Çalışma başladıktan sonra"],
      [
        "p",
        "Onayınızla tasarım çalışması başladıktan sonra yasal cayma hakkı kullanılamaz. Buna rağmen iptal talep ederseniz, o ana kadar tamamlanan iş karşılığında orantılı bir bedel düşülerek kalan tutar iade edilir.",
      ],
      ["h", "Yıllık servis ve bakım"],
      [
        "p",
        "Taahhüt yoktur. İlk yılın sonunda veya sonraki her yenilemeden önce servisi yenilememeyi seçebilirsiniz; bunun için hiçbir ücret ödemezsiniz. Ödemesi yapılmış bir servis yılı içinde iptal talep ederseniz, kalan aylara karşılık gelen tutar gün esasına göre orantılı olarak iade edilir.",
      ],
      ["h", "Teklif ile fiyatlanan işler"],
      ["p", "Size ilettiğimiz teklifi onaylamadığınız sürece herhangi bir ücret alınmaz. Onayladığınız teklifler için de yukarıdaki cayma hakkı kuralları geçerlidir."],
      ["h", "Nasıl başvurulur?"],
      ["p", `İptal talebinizi sipariş numaranızla birlikte ${COMPANY.email} adresine iletmeniz yeterlidir.`],
    ],
  },

  kosullar: {
    t: "Kullanım Koşulları",
    b: () => [
      ["p", `Bu site ${COMPANY.title} tarafından işletilmektedir. Siteyi kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız.`],
      ["h", "1. Site içeriği"],
      [
        "p",
        "Sitedeki metin, tasarım, görsel ve diğer içeriklerin hakları site sahibine aittir; izin alınmadan kopyalanamaz ve ticari amaçla kullanılamaz. Blog yazılarından kaynak gösterilerek kısa alıntı yapılabilir.",
      ],
      ["h", "2. Bilgilerin doğruluğu"],
      [
        "p",
        "Sipariş sırasında verdiğiniz bilgilerin doğru ve güncel olmasından siz sorumlusunuz. Sitedeki fiyat ve içerikler önceden haber verilmeksizin güncellenebilir; verilmiş siparişler, sipariş anındaki fiyat ve koşullara tabidir.",
      ],
      ["h", "3. Bilgilendirme içerikleri"],
      ["p", "Blog yazıları ve diğer bilgilendirme içerikleri genel bilgi amaçlıdır; hukuki, mali veya teknik danışmanlık yerine geçmez."],
      ["h", "4. Dış bağlantılar"],
      ["p", "Sitede yer alan üçüncü taraf bağlantılarının içeriğinden ve gizlilik uygulamalarından ilgili site sahipleri sorumludur."],
      ["h", "5. Yasaklı kullanım"],
      ["p", "Sitenin güvenliğini tehlikeye atacak, işleyişini bozacak, otomatik yollarla veri toplayacak veya gerçeğe aykırı sipariş oluşturacak kullanımlar yasaktır."],
      ["h", "6. Değişiklikler ve uygulanacak hukuk"],
      ["p", "Bu koşullar yayımlandığı tarihte yürürlüğe girer ve gerektiğinde güncellenebilir. Uyuşmazlıklarda Türk hukuku uygulanır; tüketici işlemlerinde Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir."],
    ],
  },

  ileti: {
    t: "Ticari Elektronik İleti Onay Metni",
    b: () => [
      [
        "p",
        `6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun ve Ticari İletişim ve Ticari Elektronik İletiler Hakkında Yönetmelik kapsamında; ${COMPANY.title} tarafından kampanya, duyuru ve yeni hizmetler hakkında e-posta ve SMS yoluyla ticari elektronik ileti gönderilmesine onay veriyorum.`,
      ],
      ["p", "Bu onay isteğe bağlıdır; vermemeniz siparişinizi etkilemez. Onayınız İleti Yönetim Sistemi'ne (İYS) kaydedilir."],
      [
        "p",
        `Onayınızı dilediğiniz zaman, iletilerdeki ret bağlantısıyla, ${COMPANY.email} adresine yazarak veya İYS üzerinden ücretsiz olarak geri alabilirsiniz. Talebiniz en geç 3 iş günü içinde işleme alınır.`,
      ],
      ["p", "Siparişiniz, faturanız ve aldığınız hizmetin kullanımı ve bakımıyla ilgili bilgilendirmeler bu onaydan bağımsız olarak gönderilebilir."],
    ],
  },
};

export const LEGAL_LINKS: [string, string][] = [
  ["kvkk", "KVKK Aydınlatma Metni"],
  ["cerez", "Çerez Politikası"],
  ["mesafeli", "Mesafeli Satış Sözleşmesi"],
  ["iade", "İptal ve İade Politikası"],
  ["kosullar", "Kullanım Koşulları"],
  ["ileti", "Ticari Elektronik İleti Onayı"],
];
