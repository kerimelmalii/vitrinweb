import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { InstaLink, Logo } from "@/components/header";
import { COMPANY, PHONE_DIGITS, WHATSAPP_URL } from "@/data/company";
import { LEGAL_LINKS } from "@/data/legal";
import { BASE_PRICE, TL, VAT_NOTE } from "@/lib/config";
import { BASE_PATH } from "@/lib/site";
import { SectionLink } from "@/components/section-link";

export function Footer() {
  return (
    <footer className="ftr">
      <div className="container-x">
        <div className="ftr-in">
          <div className="ftr-brand">
            <Logo />
            <p className="fine">
              İşletmenizin dijital vitrini. Temel web sitesi {TL(BASE_PRICE)} ({VAT_NOTE}), ilk yıl servis ve bakım
              ücretsiz, taahhüt yok.
            </p>
            <InstaLink cls="ftr-ig" label="Instagram'da bizi takip edin" />
            {PHONE_DIGITS && (
              <div className="ftr-contacts">
                <a className="ftr-ig" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Icon n="whatsapp" size={18} />
                  <span>WhatsApp</span>
                </a>
                <a className="ftr-ig" href={`tel:+${PHONE_DIGITS}`}>
                  <Icon n="phone" size={18} />
                  <span>{COMPANY.phone}</span>
                </a>
              </div>
            )}
          </div>
          <div>
            <h2 className="ftr-h">Sayfalar</h2>
            <ul>
              <li>
                <Link href="/neden">Neden web sitesi?</Link>
              </li>
              <li>
                <Link href="/ucretlendirme">Ücretlendirme</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <SectionLink id="sss">Sık sorulan sorular</SectionLink>
              </li>
              <li>
                <Link href="/iletisim">İletişim</Link>
              </li>
              <li>
                <Link href="/girisim-programi">Girişim Destek Programı</Link>
              </li>
              <li>
                <Link href="/hakkimizda">Hakkımızda</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="ftr-h">Yasal</h2>
            <ul>
              {LEGAL_LINKS.map(([id, label]) => (
                <li key={id}>
                  <Link href={`/yasal/${id}`}>{label}</Link>
                </li>
              ))}
              <li>
                <Link href="/hakkimizda">Şirket Bilgileri</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="ftr-b">
          <p className="fine">© 2026 {COMPANY.brand}. Tüm hakları saklıdır.</p>
          <p className="fine">
            <Icon n="lock" size={14} /> Ödemeler lisanslı ödeme kuruluşu üzerinden, güvenli bağlantıyla alınır.
          </p>
          <Image className="pay-badge" src={`${BASE_PATH}/odeme-yontemleri.png`} alt="iyzico ile Öde — Mastercard, Visa, American Express, Troy" width={429} height={32} />
        </div>
      </div>
    </footer>
  );
}
