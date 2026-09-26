"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useApp } from "@/lib/order-context";

/* Menü dışında (ör. footer) ana sayfadaki bir bölüme giden link. header.tsx'teki
   NavButton ile aynı deseni izler: normal tıklamada yumuşak kaydırma, Ctrl/Cmd/
   Shift/orta tık'ta tarayıcı varsayılanına (yeni sekmede açma) bırakılır. */
export function SectionLink({ id, children }: { id: string; children: ReactNode }) {
  const { goSection } = useApp();
  return (
    <Link
      href={`/#${id}`}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        goSection(id);
      }}
    >
      {children}
    </Link>
  );
}
