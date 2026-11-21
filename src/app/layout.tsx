import type { Metadata, Viewport } from "next";
import { OrderProvider } from "@/lib/order-context";
import { AppShell } from "@/components/app-shell";
import { COMPANY, INSTAGRAM_URL, PHONE_DIGITS } from "@/data/company";
import { safeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";
import { openGraph, SITE_OG_DESCRIPTION, SITE_TITLE } from "@/lib/open-graph";
import "./globals.css";

/* Google aramada ~155-160 karakterden sonra kırpıyor; bu yüzden en önemli bilgiler ilk 130 karaktere sığdırılıyor. */
const SITE_DESCRIPTION =
  "Markanızı güçlendiren web siteleri, ürün görsel stüdyosu, reklam raporlama ve stok takibi araçları ile işletmenize özel yazılım çözümlerini keşfedin.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  /* Marka ("Vitrinweb") henüz aranan bir isim değil; asıl teklifin başlıkta önce gelmesi, tıklama
     ve alaka skorunu markanın önde olmasından daha çok artırır. Diğer sayfalarda da bu sırada. */
  title: { default: "Vitrinweb | İşletmeler İçin Dijital Ürünler ve Özel Yazılım", template: "%s | Vitrinweb" },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: openGraph("/"),
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_OG_DESCRIPTION,
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
  description: "Vitrinweb; işletmeler için yüksek standartlı web siteleri, operasyonları hızlandıran hazır dijital ürünler ve iş süreçlerine özel yazılımlar geliştirir.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(organizationLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteLd) }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Ana İçeriğe Geç
        </a>
        <noscript>Bu sitenin çalışması için JavaScript gereklidir.</noscript>
        <OrderProvider>
          <AppShell>{children}</AppShell>
        </OrderProvider>
      </body>
    </html>
  );
}
