import type { Metadata, Viewport } from "next";
import { OrderProvider } from "@/lib/order-context";
import { AppShell } from "@/components/app-shell";
import { COMPANY, INSTAGRAM_URL, PHONE_DIGITS } from "@/data/company";
import { BASE_PRICE, money } from "@/lib/config";
import { safeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const SITE_TITLE = `${money(BASE_PRICE)} TL'ye profesyonel web sitesi`;
/* Google aramada ~155-160 karakterden sonra kırpıyor; bu yüzden en önemli bilgiler (fiyat,
   temel değer önermeleri) ilk 130 karaktere sığdırılıyor. */
const SITE_DESCRIPTION =
  "İşletmenizin dijital vitrini. 10.000 TL'ye modern, hızlı, mobil uyumlu web sitesi. İlk yıl servis ve bakım ücretsiz, taahhüt yok.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  /* Marka ("Vitrin") henüz aranan bir isim değil; asıl teklifin (fiyat + "profesyonel web
     sitesi") başlıkta önce gelmesi, tıklama ve alaka skorunu markanın önde olmasından daha
     çok artırır. Diğer tüm sayfalarda zaten bu sırada (bkz. template). */
  title: { default: `${SITE_TITLE} | Vitrin`, template: "%s | Vitrin" },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: "Modern, hızlı ve mobil uyumlu web siteniz. İlk yıl servis ve bakım ücreti yok.",
    type: "website",
    siteName: "Vitrin",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: "Modern, hızlı ve mobil uyumlu web siteniz. İlk yıl servis ve bakım ücreti yok.",
  },
  other: {
    referrer: "strict-origin-when-cross-origin",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFFFFF",
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.brand,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: COMPANY.email,
  ...(PHONE_DIGITS && { telephone: `+${PHONE_DIGITS}` }),
  sameAs: [INSTAGRAM_URL],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: COMPANY.brand,
  url: SITE_URL,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Profesyonel web sitesi",
  description: "Modern, hızlı ve mobil uyumlu web sitesi. İlk yıl servis ve bakım ücretsiz.",
  provider: { "@type": "Organization", name: COMPANY.brand, url: SITE_URL },
  areaServed: "TR",
  offers: { "@type": "Offer", price: String(BASE_PRICE), priceCurrency: "TRY", url: SITE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(organizationLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      </head>
      <body>
        <a className="skip" href="#main">
          İçeriğe geç
        </a>
        <noscript>Bu sitenin çalışması için JavaScript gereklidir.</noscript>
        <OrderProvider>
          <AppShell>{children}</AppShell>
        </OrderProvider>
      </body>
    </html>
  );
}
