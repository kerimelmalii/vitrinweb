"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { CheckoutHeader, Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { LegalModal } from "@/components/legal";
import { useApp } from "@/lib/order-context";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const { legal, openLegal } = useApp();
  const isCheckout = pathname === "/siparis" || pathname === "/baslangic";

  return (
    <>
      {isCheckout ? <CheckoutHeader /> : <Header />}
      {children}
      {!isCheckout && <Footer />}
      {!isCheckout && <FloatingWhatsApp />}
      {legal && <LegalModal kind={legal} onClose={() => openLegal(null)} />}
    </>
  );
}
