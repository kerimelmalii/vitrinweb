"use client";

import Link from "next/link";
import { openCookiePrefs } from "@/components/cookie-consent";
import { Logo } from "@/components/header";
import { BRAND_TEXT } from "@/data/agency";
import { COMPANY, INSTAGRAM_URL, PHONE_DIGITS, WHATSAPP_URL } from "@/data/company";
import { LEGAL_LINKS } from "@/data/legal";
import { menuProducts } from "@/data/products";

export function Footer() {
  const year = new Date().getFullYear();
  const [kvkk, cerez, ...restLegal] = LEGAL_LINKS;
  return (
    <footer className="ftr">
      <div className="container-x">
        <div className="ftr-in">
          <div className="ftr-brand">
            <Logo />
            <p className="fine">{BRAND_TEXT}</p>
          </div>
          <div>
            <h2 className="ftr-h">Ürünler</h2>
            <ul>
              <li>
                <Link href="/urunler">Tüm Ürünler</Link>
              </li>
              {menuProducts().map((p) => (
                <li key={p.slug}>
                  <Link href={`/urunler/${p.slug}`}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="ftr-h">Vitrinweb</h2>
            <ul>
              <li>
                <Link href="/hakkimizda">Hakkımızda</Link>
              </li>
              <li>
                <Link href="/nasil-calisiyoruz">Nasıl Çalışıyoruz?</Link>
              </li>
              <li>
                <Link href="/demolar">Demolar</Link>
              </li>
              <li>
                <Link href="/sektorler">Sektörler</Link>
              </li>
              <li>
                <Link href="/girisim-programi">Girişimlere Destek</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
            </ul>
            <h2 className="ftr-h ftr-h2">İletişim</h2>
            <ul>
              <li>
                <Link href="/iletisim">İletişim</Link>
              </li>
              <li>
                <Link href="/kesif-gorusmesi">Keşif Görüşmesi</Link>
              </li>
              {PHONE_DIGITS && (
                <li>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </li>
              )}
              <li>
                <a href={`mailto:${COMPANY.email}`}>E-posta</a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="ftr-h">Yasal</h2>
            <ul>
              {[kvkk, cerez].map(([id, label]) => (
                <li key={id}>
                  <Link href={`/yasal/${id}`}>{label}</Link>
                </li>
              ))}
              <li>
                <button type="button" className="ftr-btn" onClick={openCookiePrefs}>
                  Çerez Tercihleri
                </button>
              </li>
              {restLegal.map(([id, label]) => (
                <li key={id}>
                  <Link href={`/yasal/${id}`}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="ftr-b">
          <p className="fine">© {year} Vitrinweb. Tüm hakları saklıdır.</p>
          <p className="fine">
            {COMPANY.title} · <Link href="/hakkimizda#sirket-bilgileri">Şirket Bilgileri</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
