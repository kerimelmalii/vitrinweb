import type { Metadata } from "next";
import { GirisimProgramiPage } from "@/components/girisim-programi-page";

export const metadata: Metadata = {
  title: "Girişim Destek Programı",
  description:
    "Yeni kurulan girişimlere profesyonel web sitesi, 12 ay bakım ve SEO desteği; karşılığında nakit değil %2 hisse.",
  alternates: { canonical: "/girisim-programi" },
};

export default function Page() {
  return <GirisimProgramiPage />;
}
