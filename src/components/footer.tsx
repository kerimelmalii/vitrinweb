import Link from "next/link";
import { Icon } from "@/components/icons";
import { InstaLink, Logo } from "@/components/header";
import { COMPANY } from "@/data/company";
import { LEGAL_LINKS } from "@/data/legal";
import { BASE_PRICE, TL, VAT_NOTE } from "@/lib/config";
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
            </ul>
          </div>
          <div className="ftr-co">
            <h2 className="ftr-h">Satıcı bilgileri</h2>
            <p>{COMPANY.title}</p>
            <p>{COMPANY.address}</p>
            <p>E-posta: {COMPANY.email}</p>
            <p>Telefon: {COMPANY.phone}</p>
            <p>MERSİS: {COMPANY.mersis}</p>
            <p>KEP: {COMPANY.kep}</p>
            <p>
              {COMPANY.taxOffice}, {COMPANY.taxNo}
            </p>
          </div>
        </div>
        <div className="ftr-b">
          <p className="fine">© 2026 {COMPANY.brand}. Tüm hakları saklıdır.</p>
          <p className="fine">
            <Icon n="lock" size={14} /> Ödemeler lisanslı ödeme kuruluşu üzerinden, güvenli bağlantıyla alınır.
          </p>
        </div>
      </div>
    </footer>
  );
}
