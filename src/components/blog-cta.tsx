"use client";

import Link from "next/link";
import { Icon } from "@/components/icons";
import { PHONE_DIGITS } from "@/data/company";
import { getProduct } from "@/data/products";

type Gtag = (cmd: "event", name: string, params: Record<string, string>) => void;

/* Blogun ana çağrısı "Bilgi Al" (WhatsApp, yazının adıyla); ikincil bağlantı yazının konusu olan ürüne gider. */
export function BlogCta({
  slug,
  title,
  variant,
  product = "web-sitesi-paketi",
  closing,
}: {
  slug: string;
  title: string;
  variant: "inline" | "end";
  product?: string;
  closing?: string;
}) {
  const p = getProduct(product);
  const track = (name: string) => {
    const g = (window as unknown as { gtag?: Gtag }).gtag;
    g?.("event", name, { location: `blog_${variant}`, post: slug });
  };
  const waHref = PHONE_DIGITS
    ? `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(`Merhaba, blogdaki "${title}" yazısını okudum${p ? `, ${p.name} hakkında` : ""} bilgi almak istiyorum.`)}`
    : "";
  return (
    <div className={variant === "end" ? "post-cta" : "post-cta post-cta-inline"}>
      <div>
        <b>{variant === "end" ? closing || `${p?.name ?? "Vitrinweb"} işletmenize uygun mu?` : "Aklınıza takılan bir soru mu var?"}</b>
        <p>{variant === "end" ? "Sorularınızı WhatsApp’tan yanıtlayalım veya kısa formu doldurun." : "İşletmenize uygun çözümü birlikte netleştirelim."}</p>
      </div>
      <div className="post-cta-btns">
        {waHref ? (
          <a className="btn btn-primary" href={waHref} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click")}>
            <Icon n="whatsapp" size={18} /> Bilgi Al
          </a>
        ) : (
          <Link className="btn btn-primary" href={`/bilgi-al?urun=${product}`} onClick={() => track("contact_click")}>
            Bilgi Al
          </Link>
        )}
        {variant === "end" && p && (
          <Link className="btn btn-line" href={`/urunler/${p.slug}`} onClick={() => track("product_click")}>
            {p.linkLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
