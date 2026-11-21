import type { Metadata, Viewport } from "next";
import { OrderProvider } from "@/lib/order-context";
import { AppShell } from "@/components/app-shell";
import { safeJsonLd } from "@/lib/json-ld";
import { organizationLd, websiteLd } from "@/lib/schema";
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
  applicationName: "Vitrinweb",
  alternates: { canonical: "/" },
  /* Arama sonuçlarında ve yapay zekâ özetlerinde büyük görsel ve tam uzunlukta alıntıya izin verir. */
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
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
        <OrderProvider>
          <AppShell>{children}</AppShell>
        </OrderProvider>
      </body>
    </html>
  );
}
