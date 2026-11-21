import { COMPANY, INSTAGRAM_URL, PHONE_DIGITS } from "@/data/company";
import { PRODUCTS } from "@/data/products";
import { SITE_URL } from "@/lib/site";

/* Schema.org yapısal verisi. Kuruluş tek bir @id ile tanımlanır; ürün, hizmet ve yazı şemaları
   ona bağlanır. Böylece Google ve yapay zekâ arama motorları markayı tek varlık olarak tanır. */

export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

export const BRAND_DESCRIPTION =
  "Vitrinweb; işletmeler için yüksek standartlı web siteleri, operasyonları hızlandıran hazır dijital ürünler ve iş süreçlerine özel yazılımlar geliştirir.";

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: COMPANY.brand,
  alternateName: "vitrinweb.com.tr",
  legalName: COMPANY.title,
  description: BRAND_DESCRIPTION,
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  email: COMPANY.email,
  ...(PHONE_DIGITS && { telephone: `+${PHONE_DIGITS}` }),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Işıktepe OSB Mahallesi, 75. Yıl Bulvarı No: 5",
    addressLocality: "Nilüfer",
    addressRegion: "Bursa",
    addressCountry: "TR",
  },
  areaServed: { "@type": "Country", name: "Türkiye" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: COMPANY.email,
    ...(PHONE_DIGITS && { telephone: `+${PHONE_DIGITS}` }),
    availableLanguage: ["Turkish"],
  },
  knowsAbout: ["Kurumsal web sitesi", "Ürün fotoğrafı düzenleme", "Meta reklam raporlama", "Stok ve depo takibi", "Google İşletme Profili", "İş süreci otomasyonu"],
  makesOffer: PRODUCTS.map((p) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: p.name, url: `${SITE_URL}/urunler/${p.slug}` },
  })),
  sameAs: [INSTAGRAM_URL],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_ID,
  name: COMPANY.brand,
  url: SITE_URL,
  inLanguage: "tr-TR",
  publisher: { "@id": ORG_ID },
};


export function serviceLd(o: { name: string; description: string; path: string; serviceType?: string; image?: string; category?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${o.path}#hizmet`,
    name: o.name,
    description: o.description,
    url: `${SITE_URL}${o.path}`,
    serviceType: o.serviceType || o.name,
    ...(o.category && { category: o.category }),
    ...(o.image && { image: o.image }),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Türkiye" },
    availableLanguage: "Turkish",
  };
}

export function itemListLd(name: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: `${SITE_URL}${it.path}` })),
  };
}
