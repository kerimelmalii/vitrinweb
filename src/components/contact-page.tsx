"use client";

import { Icon } from "@/components/icons";
import { INSTAGRAM_URL } from "@/data/company";
import { useApp } from "@/lib/order-context";

export function ContactPage() {
  const { startCheckout } = useApp();
  return (
    <main id="main">
      <section className="sec" style={{ paddingBottom: "24px" }}>
        <div className="container-x">
          <h1 className="h-1" style={{ maxWidth: "16ch" }}>
            Bir sorunuz mu var? Yazın.
          </h1>
          <p className="lead" style={{ marginTop: "16px" }}>
            Siparişten önce veya sonra, aklınıza takılan her şey için doğrudan aşağıdaki kanallardan
            ulaşabilirsiniz.
          </p>
          <div className="contact-grid" style={{ marginTop: "36px" }}>
            <a className="contact-card" href="mailto:iletisim@vitrinweb.com.tr">
              <Icon n="mail" size={26} />
              <div>
                <span className="contact-label">E-posta</span>
                <span className="contact-email">iletisim@vitrinweb.com.tr</span>
              </div>
            </a>
            <a className="contact-card" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <Icon n="instagram" size={26} />
              <div>
                <span className="contact-label">Instagram</span>
                <span className="contact-email">@vitrinweb.com.tr</span>
              </div>
            </a>
          </div>
          <div className="hero-cta" style={{ marginTop: "40px" }}>
            <button className="btn btn-primary btn-lg" onClick={() => startCheckout()}>
              Web Sitesi Edinin
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
