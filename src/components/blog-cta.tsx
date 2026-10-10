"use client";

import Link from "next/link";
import { Icon } from "@/components/icons";
import { PHONE_DIGITS } from "@/data/company";
import { BASE_PRICE, TL } from "@/lib/config";
import { useApp } from "@/lib/order-context";

type Gtag = (cmd: "event", name: string, params: Record<string, string>) => void;

/* Blogun ana çağrısı "Bilgi Al" (WhatsApp); "Web Sitesi Edinin" ikincil.
   Ücretsiz site analizi hizmeti sunulmaya başlanınca ana çağrı ona çevrilecek (SEO Makale Standardı, Bölüm 13). */
export function BlogCta({ slug, title, variant }: { slug: string; title: string; variant: "inline" | "end" }) {
  const { startCheckout } = useApp();
  const track = (name: string) => {
    const g = (window as unknown as { gtag?: Gtag }).gtag;
    g?.("event", name, { location: `blog_${variant}`, post: slug });
  };
  const waHref = PHONE_DIGITS
    ? `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(`Merhaba, blogdaki "${title}" yazısını okudum, web sitesi hakkında bilgi almak istiyorum.`)}`
    : "";
  return (
    <div className={variant === "end" ? "post-cta" : "post-cta post-cta-inline"}>
      <div>
        <b>{variant === "end" ? "İşletmeniz için bir web sitesi mi düşünüyorsunuz?" : "Aklınıza takılan bir soru mu var?"}</b>
        <p>
          {variant === "end"
            ? `Temel paket ${TL(BASE_PRICE)}, ilk yıl servis ve bakım ücretsiz. Sorularınızı WhatsApp'tan yanıtlayalım.`
            : "İşletmenize uygun çözümü birlikte netleştirelim."}
        </p>
      </div>
      <div className="post-cta-btns">
        {waHref ? (
          <a className="btn btn-primary" href={waHref} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click")}>
            <Icon n="whatsapp" size={18} /> Bilgi Al
          </a>
        ) : (
          <Link className="btn btn-primary" href="/iletisim" onClick={() => track("contact_click")}>
            Bilgi Al
          </Link>
        )}
        {variant === "end" && (
          <button
            className="btn btn-line"
            onClick={() => {
              track("checkout_start");
              startCheckout();
            }}
          >
            Web Sitesi Edinin
          </button>
        )}
      </div>
    </div>
  );
}
