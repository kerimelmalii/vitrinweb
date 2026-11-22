/* ================= ÖZEL TEKLİF SAYFALARI =================
   Yalnızca bağlantıyı alan müşteri içindir: menüde, site haritasında ve llms dosyalarında yoktur,
   arama motorlarına kapalıdır (noindex + X-Robots-Tag). Adresteki rastgele ek tahmin edilmesini önler.
   Geçerlilik günü bittiğinde sayfa kendiliğinden 404 olur; ardından kaydı bu dosyadan silin. */

export interface Teklif {
  /** /teklif/<kod> */
  kod: string;
  musteri: string;
  musteriAlt: string;
  /** Sayfanın başındaki kişisel hitap ve kısa not. */
  hitap?: { ad: string; metin: string };
  baslik: string;
  ozet: string;
  tarih: string;
  /** Son geçerli gün (YYYY-AA-GG, Türkiye saatiyle gün sonuna kadar). */
  gecerlilik: string;
  yaklasim: string;
  toplam: string;
  /** Toplamın yanında küçük yazılır: "KDV dahil" ya da "+ KDV". */
  kdv: string;
  kapsamGiris: string;
  kapsam: { t: string; d: string }[];
  incelenenSite?: { ad: string; url: string };
  sure: string;
  takvim: { hafta: string; is: string; d: string }[];
  odemeler: { ne: string; oran: string; tutar: string }[];
  odemeNotu: string;
  /** Bedele dahil olmayan giderler; toplam bedelin ve ödeme planının altında da gösterilir. */
  haricNotu?: string;
  kosullar: { t: string; d: string }[];
  onay: string;
  /** iyzico ödeme bağlantısı ve neyin ödemesi olduğu. */
  odeme: { url: string; etiket: string; aciklama: string };
}

export const TEKLIFLER: Teklif[] = [
  {
    kod: "ies-intervega-vtmke2nx",
    musteri: "IES Intervega",
    musteriAlt: "Yurtdışı Eğitim Danışmanlığı",
    hitap: {
      ad: "Sayın Sevil Kassem,",
      metin:
        "IES Intervega için hazırladığımız web sitesi yenileme teklifini bilginize sunarız. Kapsamı, takvimi, ödeme planını ve koşulları bu sayfada bulabilirsiniz; aklınıza takılan her konuyu sayfanın sonundaki kanallardan bize iletebilirsiniz.",
    },
    baslik: "Web Sitesi Yenileme Teklifi",
    ozet: "IES'in eğitim programlarını ve okul seçeneklerini tek bir yapıda buluşturan, öğrencilerin ve velilerin danışmanlık ekibine kolayca ulaşabildiği bir web sitesi.",
    tarih: "22 Kasım 2026",
    gecerlilik: "2026-11-30",
    yaklasim:
      "IES'in 1995'ten bu yana edindiği deneyimi, İstanbul ve Mersin ofislerini ve okul iş birliklerini yeni tasarımda görünür kılacağız. Öğrenciler ve veliler ülke ve program türüne göre seçenekleri inceleyebilecek, ilgilendikleri okuldan veya programdan doğrudan danışmanlık talebi iletebilecek. IES ekibi de okul kayıtlarını ve güncel içerikleri yönetim panelinden düzenleyebilecek.",
    toplam: "95.000 TL",
    kdv: "KDV dahil",
    kapsamGiris:
      "Mevcut okul kataloğu, eğitim programları, kampanyalar ve danışmanlık sayfaları yenilenecek. Okul arama ve danışmana ulaşma adımları mobilde ve masaüstünde kolayca kullanılabilecek.",
    kapsam: [
      {
        t: "Kurumsal sayfalar ve mobil tasarım",
        d: "Ana sayfa, Hakkımızda, vize danışmanlığı, SSS, referanslar, galeri ve iletişim için IES'e özel tasarım. Eğitim programlarına, kampanyalara ve İstanbul ile Mersin ofislerine ana menüden kolay erişim.",
      },
      {
        t: "Eğitim programları ve okul kataloğu",
        d: "Dil okulu, yaz okulu, lise, üniversite, yüksek lisans ve sertifika sayfaları. Okul adında arama, ülke ve program türüne göre filtreleme. Okul detayında lokasyon, program bilgileri ve danışmanlık bağlantısı.",
      },
      {
        t: "Danışmanlık talebi ve iletişim",
        d: "Danışmanlık ve iletişim formlarının IES'in belirleyeceği e-posta adreslerine bağlanması. Okul veya program sayfasından gelen taleplere ilgili sayfa bilgisinin eklenmesi, spam önleme ve gönderim testi.",
      },
      {
        t: "İçerik yönetimi",
        d: "Okulların, programların, kampanyaların, blog ve haberlerin kod bilgisi gerektirmeden güncellenebildiği yönetim paneli. IES ekibine panel eğitimi ve kısa kullanım dokümanı.",
      },
      {
        t: "İçerik aktarımı ve arama görünürlüğü",
        d: "Onaylı sayfaların, okul kayıtlarının, yazıların ve erişilebilir görsellerin taşınması. Değişen adresler için 301 yönlendirmeleri, sayfa başlıkları, meta açıklamaları ve XML site haritası kurulumu.",
      },
      {
        t: "Test ve yayına geçiş",
        d: "Telefon, tablet ve masaüstünde arama, filtre, form ve menü testleri. Görsel optimizasyonu ve temel erişilebilirlik kontrolleri. Mevcut alan adında yayına alma ve yayın sonrası kontroller.",
      },
    ],
    incelenenSite: { ad: "ies-intervega.com", url: "https://ies-intervega.com" },
    sure: "Öngörülen proje süresi 5–6 haftadır. Takvim, yazılı onay ve ilk ödemenin ardından gerekli erişimler ile içerikler teslim edildiğinde başlar.",
    takvim: [
      { hafta: "1. hafta", is: "Keşif ve site haritası", d: "İçerik envanteri, aktarım listesi ve sayfa yapısı" },
      { hafta: "2. hafta", is: "Tasarım", d: "Ana sayfa ve temel sayfa şablonlarının onayı" },
      { hafta: "3–5. hafta", is: "Geliştirme ve içerik aktarımı", d: "Okul kataloğu, yönetim paneli ve formlar" },
      { hafta: "5–6. hafta", is: "Kontrol ve yayın", d: "Ön izleme, kabul testleri, eğitim ve yayına geçiş" },
    ],
    odemeler: [
      { ne: "Proje başlangıcında", oran: "%50", tutar: "47.500 TL" },
      { ne: "Tasarım onayında", oran: "%30", tutar: "28.500 TL" },
      { ne: "Yayın onayında", oran: "%20", tutar: "19.000 TL" },
    ],
    odemeNotu: "Tüm tutarlar %20 KDV dahildir.",
    haricNotu: "Alan adı, barındırma (hosting), kurumsal e-posta, ücretli eklenti ve lisans gibi üçüncü taraf giderleri teklif bedeline dahil değildir.",
    kosullar: [
      {
        t: "Onay ve revizyon",
        d: "Tasarım aşamasında iki toplu revizyon turu dahildir. İçerik ve erişimler IES tarafından sağlanır. Onay ve içerik gecikmeleri takvime yansıtılır.",
      },
      {
        t: "İçerik ve dil",
        d: "Aktarılacak kayıtlar ve adresler keşifte onaylanır. Aktarım, mevcut sistemden dışa aktarılabilen veya erişilebilen içerikleri kapsar. Mevcut onaylı İngilizce kurumsal sayfalar taşınır.",
      },
      {
        t: "Yayın ve teslim",
        d: "Yayın öncesi ön izleme IES onayına sunulur. Yayında kaynak kodu, yönetim erişimleri ve kullanım dokümanı teslim edilir. Yayından itibaren 30 gün boyunca proje kapsamındaki yazılım hataları giderilir.",
      },
      {
        t: "Yıllık bakım",
        d: "Web sitesi için yıllık bakım hizmeti gereklidir. İlk yıllık bakım ödemesi proje tesliminden bir yıl sonra yapılır. Teklif tarihi itibarıyla yıllık bakım bedeli 5.000 TL'dir. Bedel, ödeme döneminde enflasyona göre güncellenebilir.",
      },
      {
        t: "Bedele dahil olmayan giderler",
        d: "Alan adı kaydı ve yenilemesi, barındırma (hosting), kurumsal e-posta, ücretli eklenti, tema, yazı tipi, görsel ve yazılım lisansları gibi üçüncü taraf hizmet bedelleri teklif bedeline dahil değildir; IES tarafından doğrudan ya da ayrıca faturalandırılarak karşılanır.",
      },
      {
        t: "Ek hizmetler",
        d: "Yeni metin ve çeviri üretimi, kullanıcı hesabı ve geçmiş form verilerinin taşınması, başvuru portalı, CRM entegrasyonu, barındırma ve lisanslar ayrıca fiyatlandırılır.",
      },
    ],
    onay: "Teklifin yazılı onayıyla başlangıç tarihi birlikte planlanır.",
    odeme: {
      url: "https://iyzi.link/AK25_Q",
      etiket: "Proje Başlangıç Ödemesini Yapın",
      aciklama: "Proje başlangıcındaki ilk ödeme dilimi (%50 / 47.500 TL, KDV dahil)",
    },
  },
];

/** Geçerlilik günü Türkiye saatiyle 23.59'da biter. */
export function getTeklif(kod: string, now = new Date()): Teklif | undefined {
  const t = TEKLIFLER.find((x) => x.kod === kod);
  if (!t) return undefined;
  return now.getTime() <= new Date(`${t.gecerlilik}T23:59:59+03:00`).getTime() ? t : undefined;
}

export const gecerlilikMetni = (iso: string): string =>
  new Date(`${iso}T12:00:00+03:00`).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Istanbul" });
