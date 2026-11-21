import { notFound } from "next/navigation";
import { ProductArt } from "@/components/art";
import { getProduct } from "@/data/products";

/* Ürün paylaşım görsellerinin (public/og/<slug>.png) kaynağı. Yalnızca OG_KART=1 ile çalışan yerel
   sunucuda açılır; scripts/og-gorselleri.mjs bu sayfanın ekran görüntüsünü alır. Yayında 404 döner. */
export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  if (process.env.OG_KART !== "1") notFound();
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  return (
    <div className="ogc">
      <div className="ogc-l">
        <span className="ogc-logo">
          vitrin<span className="logo-web">web</span>
          <i></i>
        </span>
        <div>
          <p className="ogc-name">{p.name}</p>
          <p className="ogc-t">{p.title}</p>
        </div>
        <span className="ogc-url">vitrinweb.com.tr/urunler</span>
      </div>
      <div className="ogc-r">
        <ProductArt kind={p.art} uid={`og-${p.slug}`} />
      </div>
    </div>
  );
}
