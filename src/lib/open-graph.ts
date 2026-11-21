import type { Metadata } from "next";
export const SITE_TITLE = "Vitrinweb | İşletmeler İçin Dijital Ürünler ve Özel Yazılım";
export const SITE_OG_DESCRIPTION =
  "Markanızı güçlendiren web siteleri, ürün görsel stüdyosu, reklam raporlama ve stok takibi araçları ile işletmenize özel yazılım çözümlerini keşfedin.";

type OpenGraph = NonNullable<Metadata["openGraph"]>;

/* Next.js, sayfadaki `openGraph` nesnesini layout'takiyle birleştirmez, tamamen değiştirir.
   og:url sayfaya özel olmak zorunda olduğu için her sayfa bunu çağırır; siteName/locale ve
   (sayfa kendi başlığını vermediyse) varsayılan başlık/açıklama böylece kaybolmaz. */
export function openGraph(path: string, extra: Partial<OpenGraph> = {}, ownImage = false): OpenGraph {
  return {
    title: SITE_TITLE,
    description: SITE_OG_DESCRIPTION,
    type: "website",
    siteName: "Vitrinweb",
    locale: "tr_TR",
    url: path,
    /* Kendi openGraph'ını veren sayfaya app/opengraph-image.jpg miras kalmıyor. Klasöründe kendi
       opengraph-image dosyası olan sayfa ownImage=true verir; yoksa bu liste o dosyayı ezer. */
    ...(!ownImage && {
      images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: "Vitrinweb", type: "image/jpeg" }],
    }),
    ...extra,
  } as OpenGraph;
}
