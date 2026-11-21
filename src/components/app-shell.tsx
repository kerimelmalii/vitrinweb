"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { CheckoutHeader, Header, MobileCta } from "@/components/header";
import { CookieConsent } from "@/components/cookie-consent";
import { Footer } from "@/components/footer";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { LegalModal } from "@/components/legal";
import { useApp } from "@/lib/order-context";

/* Formun kendisi olan sayfalarda sabit "Bilgi Alın" çubuğu gereksiz. */
const NO_STICKY = ["/bilgi-al", "/kesif-gorusmesi", "/proje-baslangic", "/icerik-formu", "/siparis"];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const { legal, openLegal } = useApp();
  const isCheckout = pathname === "/siparis" || pathname === "/baslangic";
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/og-kart/");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      {isCheckout ? <CheckoutHeader /> : <Header />}
      {children}
      {!isCheckout && <Footer />}
      {!isCheckout && <FloatingWhatsApp />}
      {!isCheckout && !NO_STICKY.some((p) => pathname.startsWith(p)) && <MobileCta />}
      {legal && <LegalModal kind={legal} onClose={() => openLegal(null)} />}
      <CookieConsent />
    </>
  );
}
