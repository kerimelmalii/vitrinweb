import type { Metadata } from "next";
import { openGraph } from "@/lib/open-graph";

/** Sayfa başlığı metin belgesindeki SEO başlığıyla birebir (marka eki dahil) kullanılır. */
export function pageMeta(path: string, title: string, description: string, image?: string, robots?: Metadata["robots"]): Metadata {
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title, type: "image/png" }] : undefined;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: openGraph(path, { title, description, ...(images && { images }) }),
    twitter: { card: "summary_large_image", title, description, ...(images && { images: images.map((i) => i.url) }) },
    ...(robots && { robots }),
  };
}
