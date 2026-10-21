import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/header";
import { safeJsonLd } from "@/lib/json-ld";
import { BASE_PRICE, TL, VAT_NOTE } from "@/lib/config";
import { openGraph } from "@/lib/open-graph";
import { BASE_PATH, SITE_URL } from "@/lib/site";

const TITLE = "Tanıtım Broşürü";
const DESCRIPTION = `Vitrinweb tanıtım broşürü: paket içeriği, süreç, ek özellikler ve fiyat tek sayfada. Temel web sitesi ${TL(BASE_PRICE)} (${VAT_NOTE}).`;
const BROCHURE = `${BASE_PATH}/brosur.png`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/brosur" },
  openGraph: openGraph("/brosur", { title: TITLE, description: DESCRIPTION }),
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Anasayfa", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: TITLE, item: `${SITE_URL}/brosur` },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbLd) }} />
      <main id="main" className="container-x doc-wrap">
        <nav className="crumbs" aria-label="Konum">
          <Link className="linkb" href="/">
            Anasayfa
          </Link>
          <span aria-hidden="true">/</span>
          <span>{TITLE}</span>
        </nav>
        <article className="post">
          <h1 className="h-2">{TITLE}</h1>
          <p>
            Paket içeriği, süreç, ek özellikler ve fiyat tek sayfada. Broşürü indirip saklayabilir ya da işletmenizde
            birlikte karar verdiğiniz kişilerle paylaşabilirsiniz.
          </p>
          <p style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <a className="btn btn-primary" href={BROCHURE} download="Vitrinweb-Tanitim-Brosuru.png">
              Broşürü indir
            </a>
            <Link className="btn btn-line" href="/ucretlendirme">
              Ücretlendirme ayrıntıları
            </Link>
          </p>
          <Image
            src={BROCHURE}
            alt="Vitrinweb tanıtım broşürü: neden web sitesi gerekli, dört adımda süreç, pakete dahil olanlar, isteğe bağlı ek özellikler, KDV dahil 10.000 TL fiyat ve yıllık servis, iyzico ile güvenli ödeme ve iletişim bilgileri."
            width={1024}
            height={1536}
            sizes="(max-width: 860px) 100vw, 820px"
            style={{ width: "100%", height: "auto", borderRadius: 16, border: "1px solid var(--line)" }}
            priority
          />
          <section aria-labelledby="brosur-imza" style={{ marginTop: 40, paddingTop: 28, borderTop: "1px solid var(--line)" }}>
            <Logo />
            <h2 id="brosur-imza" className="h-3" style={{ marginTop: 14 }}>
              Vitrinweb: İşletmenizin internetteki vitrini
            </h2>
            <p>
              Sorularınızı <Link href="/iletisim">iletişim sayfamızdan</Link> ya da WhatsApp üzerinden iletebilirsiniz.
              Paketin tüm koşulları <Link href="/ucretlendirme">ücretlendirme sayfasında</Link> ve yasal metinlerde yer alır.
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
