/* ================= SATICI BİLGİLERİ =================
   6563 sayılı Kanun gereği sitede kolayca ulaşılabilir olmalıdır.
   Köşeli parantezli alanları yayından önce gerçek bilgilerle doldurun. */
export const COMPANY = {
  brand: "Vitrin",
  title: "M-E Yapı Dekorasyon Maden İnşaat Sanayi ve Ticaret Anonim Şirketi",
  tradeRegistryNo: "82360",
  registryOffice: "Bursa Ticaret ve Sanayi Odası (BTSO)",
  mersis: "[MERSİS numarası]",
  taxOffice: "[Vergi dairesi]",
  taxNo: "[Vergi numarası]",
  address: "Işıktepe OSB Mahallesi, 75. Yıl Bulvarı No: 5, Nilüfer / Bursa",
  /* Gerçek ve izlenen bir kutu; cayma/KVKK başvurularının gidebileceği tek gerçek
     alan bu olduğu için (aşağıdaki diğer alanların aksine) yer tutucu bırakılmadı. */
  email: "iletisim@vitrinweb.com.tr",
  phone: "[Telefon numarası]",
  kep: "[KEP adresi]",
};

/** Bir alanın hâlâ köşeli parantezli bir yer tutucu olup olmadığını (yani henüz
    doldurulmadığını) söyler — "Yasal ve Şirket Bilgileri" bölümü, MERSİS/KEP gibi
    henüz netleşmemiş alanları bu kontrolle gösterip göstermeyeceğine karar verir. */
export const isPlaceholder = (v: string): boolean => v.startsWith("[") && v.endsWith("]");

export const INSTAGRAM_URL = "https://www.instagram.com/vitrinweb.com.tr/";
export const LEGAL_UPDATED = "25 Eylül 2026";

export const companyLine = (): string =>
  `${COMPANY.title}, ${COMPANY.address}. MERSİS: ${COMPANY.mersis}. E-posta: ${COMPANY.email}. Telefon: ${COMPANY.phone}. KEP: ${COMPANY.kep}.`;
