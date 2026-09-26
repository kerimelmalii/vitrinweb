/* ================= SATICI BİLGİLERİ =================
   6563 sayılı Kanun gereği sitede kolayca ulaşılabilir olmalıdır.
   Köşeli parantezli alanları yayından önce gerçek bilgilerle doldurun. */
export const COMPANY = {
  brand: "Vitrin",
  title: "[Ticaret unvanı veya ad soyad]",
  mersis: "[MERSİS numarası]",
  taxOffice: "[Vergi dairesi]",
  taxNo: "[Vergi numarası]",
  address: "[Merkez adresi]",
  /* Gerçek ve izlenen bir kutu; cayma/KVKK başvurularının gidebileceği tek gerçek
     alan bu olduğu için (aşağıdaki diğer alanların aksine) yer tutucu bırakılmadı. */
  email: "iletisim@vitrinweb.com.tr",
  phone: "[Telefon numarası]",
  kep: "[KEP adresi]",
};

/** Instagram hesabınızın tam adresi, ör. "https://www.instagram.com/vitrin". */
export const INSTAGRAM_URL = "https://www.instagram.com/";
export const LEGAL_UPDATED = "25 Eylül 2026";

export const companyLine = (): string =>
  `${COMPANY.title}, ${COMPANY.address}. MERSİS: ${COMPANY.mersis}. E-posta: ${COMPANY.email}. Telefon: ${COMPANY.phone}. KEP: ${COMPANY.kep}.`;
