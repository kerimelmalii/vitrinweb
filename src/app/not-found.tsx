import type { Metadata } from "next";
import { NotFound } from "@/components/legal";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı",
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return <NotFound />;
}
