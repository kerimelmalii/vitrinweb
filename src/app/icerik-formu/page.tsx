import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectOnboarding } from "@/components/onboarding";

export const metadata: Metadata = {
  title: "İçerik Formu",
  robots: { index: false },
};

export default function Page() {
  return (
    <Suspense fallback={<main id="main" className="container-x co"></main>}>
      <ProjectOnboarding />
    </Suspense>
  );
}
