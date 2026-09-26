import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Sorularınız için e-posta veya Instagram'dan doğrudan bize ulaşın.",
  alternates: { canonical: "/iletisim" },
};

export default function Page() {
  return <ContactPage />;
}
