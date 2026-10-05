import type { Metadata } from "next";
import { Suspense } from "react";

import { PaymentSuccess } from "@/components/checkout/payment-success";

export const metadata: Metadata = {
  title: "Ödeme Sonucu",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <main id="main" className="container-x co">
          <div className="ok-wrap">
            <h1 className="h-1">Ödemeniz doğrulanıyor.</h1>
          </div>
        </main>
      }
    >
      <PaymentSuccess />
    </Suspense>
  );
}
