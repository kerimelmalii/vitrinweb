import type { Metadata } from "next";
import { IsgaleHayirPage } from "@/components/isgale-hayir-page";

const TITLE = "İşgale Hayır!";
const DESCRIPTION =
  "Vitrin olarak Filistin ve Doğu Türkistan halklarının özgürlük ve onurlu yaşam hakkının yanındayız; insani yardım için çalışan dernek ve kuruluşlara ücretsiz web sitesi ve dijital destek sunuyoruz.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/isgale-hayir" },
  robots: { index: true, follow: true },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function Page() {
  return <IsgaleHayirPage />;
}
