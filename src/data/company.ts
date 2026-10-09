/* ================= SATICI BİLGİLERİ =================
   6563 sayılı Kanun gereği sitede kolayca ulaşılabilir olmalıdır.
   Köşeli parantezli alanları yayından önce gerçek bilgilerle doldurun. */
export const COMPANY = {
  brand: "Vitrinweb",
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
  phone: "0538 629 94 90",
  kep: "[KEP adresi]",
};

/** Bir alanın hâlâ köşeli parantezli bir yer tutucu olup olmadığını (yani henüz
    doldurulmadığını) söyler — "Şirket Bilgileri" bölümü ve yasal metinler, MERSİS/KEP/
    telefon gibi henüz netleşmemiş alanları bu kontrolle gösterip göstermeyeceğine karar verir. */
export const isPlaceholder = (v: string): boolean => v.startsWith("[") && v.endsWith("]");

/** `COMPANY.phone`'un yalnızca rakamlardan oluşan, ülke koduyla (90) başlayan hâli —
    `tel:`/`wa.me` bağlantıları için. */
export const PHONE_DIGITS = isPlaceholder(COMPANY.phone) ? "" : "90" + COMPANY.phone.replace(/\D/g, "");

export const WHATSAPP_URL = PHONE_DIGITS
  ? `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent("Merhaba, Vitrinweb hakkında bilgi almak istiyorum.")}`
  : "";

export const INSTAGRAM_URL = "https://www.instagram.com/vitrinweb.com.tr/";
export const LEGAL_UPDATED = "28 Eylül 2026";

/* Yasal metinlerde satıcı kimliğini tek satırda özetler. Henüz doldurulmamış (köşeli
   parantezli) alanlar satıra hiç eklenmez — böylece sözleşme metninde "[Telefon numarası]"
   gibi çiğ bir yer tutucu görünmez; gerçek değer company.ts'e girilince satır otomatik
   genişler. MERSİS henüz yoksa, kimliği belirsiz bırakmamak için ticaret sicil no kullanılır. */
export const companyLine = (): string => {
  const parts = [`${COMPANY.title}, ${COMPANY.address}.`];
  parts.push(
    isPlaceholder(COMPANY.mersis)
      ? `Ticaret Sicil No: ${COMPANY.tradeRegistryNo} (${COMPANY.registryOffice}).`
      : `MERSİS: ${COMPANY.mersis}.`
  );
  parts.push(`E-posta: ${COMPANY.email}.`);
  if (!isPlaceholder(COMPANY.phone)) parts.push(`Telefon: ${COMPANY.phone}.`);
  if (!isPlaceholder(COMPANY.kep)) parts.push(`KEP: ${COMPANY.kep}.`);
  return parts.join(" ");
};
