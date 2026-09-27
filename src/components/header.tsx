"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { NAV } from "@/data/content";
import { INSTAGRAM_URL } from "@/data/company";
import { useApp } from "@/lib/order-context";
import type { NavItem } from "@/lib/types";

export function Logo() {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  return (
    <Link
      className="logo"
      href="/"
      aria-label="Vitrin, ana sayfa"
      onClick={(e) => {
        /* Zaten ana sayfadaysa Link'in kendisi gezinme yapmaz (URL aynı), bu yüzden
           kaydırma konumu sıfırlanmaz; bunu elle yapıyoruz. */
        if (pathname === "/") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
    >
      vitrin
      <i></i>
    </Link>
  );
}

export function InstaLink({ cls, label }: { cls: string; label?: string }) {
  return (
    <a
      className={cls}
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ? undefined : "Instagram hesabımız (yeni sekmede açılır)"}
    >
      <Icon n="instagram" size={20} />
      {label && <span>{label}</span>}
    </a>
  );
}

export function CheckoutHeader() {
  return (
    <header className="hdr s">
      <div className="container-x hdr-in">
        <Logo />
        <div className="flex items-center gap-4">
          <span className="secure-b">
            <Icon n="lock" size={16} /> Güvenli sipariş
          </span>
          <Link className="navl" href="/">
            Siteye Dön
          </Link>
        </div>
      </div>
    </header>
  );
}

function NavButton({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const { goSection } = useApp();
  const isOn = !!item.to && (item.to === pathname || (item.to === "/blog" && pathname.startsWith("/blog")));
  if (item.to) {
    return (
      <Link
        href={item.to}
        className={"navl " + (isOn ? "on" : "")}
        aria-current={isOn ? "page" : undefined}
        onClick={onNavigate}
      >
        {item.label}
      </Link>
    );
  }
  return (
    <Link
      href={`/#${item.sec}`}
      className="navl"
      onClick={(e) => {
        /* Ctrl/Cmd/Shift+tık veya orta tık: yeni sekmede açma gibi tarayıcı
           varsayılanına izin ver, yalnızca normal tıklamada JS ile kaydır. */
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        onNavigate();
        /* Mobil menü açıksa onNavigate() onu kapatır ve sayfa yüksekliği değişir;
           kaydırma hedefi bu kapanma DOM'a yansıyıp bir kare boyanmadan hesaplanırsa
           menünün yüksekliği kadar aşağı taşar. İki rAF, o boyamayı bekler. */
        requestAnimationFrame(() => requestAnimationFrame(() => goSection(item.sec as string)));
      }}
    >
      {item.label}
    </Link>
  );
}

export function Header() {
  const { startCheckout } = useApp();
  const [open, setOpen] = useState(false);
  const [sc, setSc] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const f = () => setSc(window.scrollY > 6);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- sayfa değişince mobil menüyü kapatır
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={"hdr " + (sc || open ? "s" : "")}>
      <div className="container-x hdr-in">
        <Logo />
        <nav className="nav-desk" aria-label="Ana menü">
          {NAV.map((it) => (
            <NavButton key={it.label} item={it} onNavigate={() => setOpen(false)} />
          ))}
        </nav>
        <div className="hdr-r">
          <button
            className="btn btn-primary hdr-cta"
            onClick={() => {
              setOpen(false);
              startCheckout();
            }}
          >
            Web Sitesi Edinin
          </button>
          <Link href="/girisim-programi" className="btn btn-line hdr-cta" onClick={() => setOpen(false)}>
            Girişim Programı
          </Link>
          <InstaLink cls="iconbtn ig-h" />
          <button
            className="iconbtn burger"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            aria-controls="mnav"
            onClick={() => setOpen(!open)}
          >
            <Icon n={open ? "x" : "menu"} />
          </button>
        </div>
      </div>
      {open && (
        <div className="mnav" id="mnav">
          {NAV.map((it) => (
            <NavButton key={it.label} item={it} onNavigate={() => setOpen(false)} />
          ))}
          <InstaLink cls="navl mnav-ig" label="Instagram" />
          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              setOpen(false);
              startCheckout();
            }}
          >
            Web Sitesi Edinin
          </button>
          <Link href="/girisim-programi" className="btn btn-line btn-block" onClick={() => setOpen(false)}>
            Girişim Programı
          </Link>
        </div>
      )}
    </header>
  );
}
