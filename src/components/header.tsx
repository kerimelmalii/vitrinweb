"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { NAV_LINKS } from "@/data/agency";
import { INSTAGRAM_URL, PHONE_DIGITS, WHATSAPP_URL } from "@/data/company";
import { menuProducts } from "@/data/products";

export function Logo({ sub = true }: { sub?: boolean }) {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  return (
    <Link
      className="logo"
      href="/"
      aria-label={sub ? "Vitrinweb Dijital Çözümler, ana sayfa" : "Vitrinweb, ana sayfa"}
      onClick={(e) => {
        /* Zaten ana sayfadaysa Link gezinme yapmaz; kaydırmayı elle sıfırlıyoruz. */
        if (pathname === "/") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
    >
      <span className="logo-w">
        vitrin<span className="logo-web">web</span>
        <i></i>
      </span>
      {sub && " "}
      {sub && <span className="logo-sub">Dijital Çözümler</span>}
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

export function WhatsAppLink({ cls, label }: { cls: string; label?: string }) {
  if (!PHONE_DIGITS) return null;
  return (
    <a
      className={cls}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ? undefined : "WhatsApp'tan bize yazın (yeni sekmede açılır)"}
    >
      <Icon n="whatsapp" size={20} />
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
            <Icon n="lock" size={16} /> Güvenli sayfa
          </span>
          <Link className="navl" href="/">
            Siteye Dönün
          </Link>
        </div>
      </div>
    </header>
  );
}

function ProductsMenu({ onNavigate, mobile = false }: { onNavigate: () => void; mobile?: boolean }) {
  const ps = menuProducts();
  return (
    <ul className={mobile ? "mnav-sub" : "pmenu-list"}>
      <li className="pmenu-all">
        <Link href="/urunler" onClick={onNavigate}>
          <b>Tüm Ürünler</b>
          {!mobile && <small>Tüm ürünleri karşılaştırın</small>}
        </Link>
      </li>
      {ps.map((p) => (
        <li key={p.slug}>
          <Link href={`/urunler/${p.slug}`} onClick={onNavigate}>
            <Icon n={p.icon} size={17} sw={1.8} />
            <span>
              <b>{p.name}</b>
            </span>
          </Link>
        </li>
      ))}
      <li className="pmenu-extra">
        <Link href="/hizmetler" onClick={onNavigate}>
          <Icon n="layout" size={17} sw={1.8} />
          <span>
            <b>Tamamlayıcı Hizmetler</b>
          </span>
        </Link>
      </li>
    </ul>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mSub, setMSub] = useState(false);
  const [sc, setSc] = useState(false);
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const menuRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const f = () => setSc(window.scrollY > 6);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sayfa değişince menüleri kapatır
    setOpen(false);
    setMenu(false);
  }, [pathname]);
  useEffect(() => {
    if (!menu) return;
    const out = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(false);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        menuRef.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("mousedown", out);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", out);
      document.removeEventListener("keydown", esc);
    };
  }, [menu]);

  const isOn = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const close = () => {
    setOpen(false);
    setMenu(false);
  };

  return (
    <header className={"hdr " + (sc || open ? "s" : "")}>
      <div className="container-x hdr-in">
        <Logo />
        <nav className="nav-desk" aria-label="Ana menü">
          <ul>
            {NAV_LINKS.map((it) =>
              it.menu ? (
                <li key={it.label} className="pmenu" ref={menuRef}>
                  <button
                    type="button"
                    className={"navl" + (isOn("/urunler") || isOn("/hizmetler") || pathname === "/isletmeye-ozel" ? " on" : "")}
                    aria-expanded={menu}
                    aria-controls="pmenu"
                    onClick={() => setMenu(!menu)}
                  >
                    {it.label} <Icon n="chev" size={15} sw={2} />
                  </button>
                  {menu && (
                    <div className="pmenu-pop" id="pmenu">
                      <ProductsMenu onNavigate={close} />
                    </div>
                  )}
                </li>
              ) : (
                <li key={it.label}>
                  <Link href={it.href} className={"navl" + (isOn(it.href) ? " on" : "")} aria-current={isOn(it.href) ? "page" : undefined}>
                    {it.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="hdr-r">
          <Link className="btn btn-primary hdr-cta" href="/bilgi-al" onClick={close}>
            Bilgi Alın
          </Link>
          <button
            className="iconbtn burger"
            aria-label={open ? "Menüyü Kapat" : "Menüyü Aç"}
            aria-expanded={open}
            aria-controls="mnav"
            onClick={() => setOpen(!open)}
          >
            <Icon n={open ? "x" : "menu"} />
          </button>
        </div>
      </div>
      {open && (
        <nav className="mnav" id="mnav" aria-label="Mobil menü">
          {NAV_LINKS.map((it) =>
            it.menu ? (
              <div key={it.label} className="mnav-group">
                <button type="button" className="navl mnav-toggle" aria-expanded={mSub} onClick={() => setMSub(!mSub)}>
                  {it.label}
                  <Icon n="chev" size={18} />
                </button>
                {mSub && <ProductsMenu onNavigate={close} mobile />}
              </div>
            ) : (
              <Link key={it.label} href={it.href} className={"navl" + (isOn(it.href) ? " on" : "")} onClick={close}>
                {it.label}
              </Link>
            ),
          )}
          <div className="mnav-social">
            <WhatsAppLink cls="navl mnav-ig" label="WhatsApp" />
            <InstaLink cls="navl mnav-ig" label="Instagram" />
          </div>
          <Link className="btn btn-primary btn-block" href="/bilgi-al" onClick={close}>
            Bilgi Alın
          </Link>
        </nav>
      )}
    </header>
  );
}

/** Mobilde sayfa kaydırılınca görünen sabit "Bilgi Alın" çubuğu. */
export function MobileCta() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const f = () => setOn(window.scrollY > 520);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className={"sticky-cta" + (on ? " on" : "")} aria-hidden={!on}>
      <div>
        <b>Vitrinweb</b>
        <small>Dijital Çözümler</small>
      </div>
      <Link className="btn btn-primary" href="/bilgi-al" tabIndex={on ? 0 : -1}>
        Bilgi Alın
      </Link>
    </div>
  );
}
