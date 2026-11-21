/* ================= İZİNLİ UYGULAMA ÖRNEKLERİ =================
   /uygulamalar/[slug] sayfaları buradan üretilir. Yalnızca ölçüm yöntemi ve sonucu doğrulanmış,
   müşterinin yazılı yayın onayı alınmış çalışmalar eklenir; liste boşken sayfa ve ana sayfadaki
   "Kendi operasyonumuzda" bölümü hiç görünmez. Uydurma rakam veya alıntı eklemeyin. */

export interface CaseStudy {
  slug: string;
  /** "[İşletme veya sektör] için [uygulama adı]" — SEO başlığı. */
  seoTitle: string;
  description: string;
  /** "[İşletme veya sektör] için [dönüştürülen iş adımı]" */
  title: string;
  problem: string;
  solution: string;
  result: string;
  /** Ölçüm yöntemi ve tarih aralığı, sonuçla birlikte gösterilir. */
  measurement: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  quote?: { text: string; title: string };
  productSlug: string;
  /** Ana sayfadaki "Kendi operasyonumuzda" bölümünde gösterilsin mi (yalnızca kendi kullanımımız). */
  internal?: boolean;
}

export const CASES: CaseStudy[] = [];

export const getCase = (slug: string): CaseStudy | undefined => CASES.find((c) => c.slug === slug);
