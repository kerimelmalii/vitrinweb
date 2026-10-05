"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type State =
  | { kind: "loading" }
  | { kind: "paid"; orderNo: string }
  | { kind: "pending" }
  | { kind: "failed" }
  | { kind: "error" };

export function PaymentSuccess() {
  const params = useSearchParams();
  const orderId = params.get("orderId") ?? "";
  const resultToken = params.get("resultToken") ?? "";
  const failed = params.get("failed") === "1";
  const [state, setState] = useState<State>(() => {
    if (failed) return { kind: "failed" };
    if (!orderId || !resultToken) return { kind: "error" };
    return { kind: "loading" };
  });

  useEffect(() => {
    if (failed || !orderId || !resultToken) return;

    const controller = new AbortController();

    const query = new URLSearchParams({ orderId, resultToken });
    fetch(`/api/orders/payment-status?${query.toString()}`, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("status");
        return response.json() as Promise<{
          ok: boolean;
          paid: boolean;
          orderNo?: string;
        }>;
      })
      .then((result) => {
        if (!result.ok) {
          setState({ kind: "error" });
          return;
        }
        if (!result.paid || !result.orderNo) {
          setState({ kind: "pending" });
          return;
        }
        setState({ kind: "paid", orderNo: result.orderNo });
      })
      .catch((error: unknown) => {
        if ((error as { name?: string })?.name !== "AbortError") {
          setState({ kind: "error" });
        }
      });

    return () => controller.abort();
  }, [failed, orderId, resultToken]);

  return (
    <main id="main" className="container-x co">
      <div className="ok-wrap">
        {state.kind === "loading" && (
          <>
            <h1 className="h-1">Ödemeniz doğrulanıyor.</h1>
            <p className="lead" style={{ marginTop: "12px" }}>
              Güvenli ödeme sonucunu kontrol ediyoruz.
            </p>
          </>
        )}

        {state.kind === "paid" && (
          <>
            <svg className="ok-ring" viewBox="0 0 96 96" aria-hidden="true">
              <circle cx="48" cy="48" r="46" />
              <path d="M28 50l14 14 27-30" />
            </svg>
            <h1 className="h-1">Teşekkürler, ödemeniz onaylandı.</h1>
            <p className="lead" style={{ marginTop: "12px" }}>
              Siparişiniz güvenli şekilde doğrulandı. Projenizin sonraki adımları
              için sizinle iletişime geçeceğiz.
            </p>
            <div className="ordno">
              Sipariş No: <b>#{state.orderNo}</b>
            </div>
          </>
        )}

        {state.kind === "pending" && (
          <>
            <h1 className="h-1">Ödeme henüz doğrulanmadı.</h1>
            <p className="lead" style={{ marginTop: "12px" }}>
              Bu sayfayı görmek ödeme yapıldığı anlamına gelmez. Ödeme sonucunuz
              sunucuda doğrulanamadı; siparişiniz ödenmiş olarak işaretlenmedi.
            </p>
          </>
        )}

        {state.kind === "failed" && (
          <>
            <h1 className="h-1">Ödemeniz tamamlanamadı.</h1>
            <p className="lead" style={{ marginTop: "12px" }}>
              Kartınız onaylanmadı veya ödeme doğrulanamadı; sizden herhangi bir
              ücret alınmadı. Lütfen aynı veya başka bir kartla tekrar deneyin.
            </p>
            <a className="btn btn-primary" style={{ marginTop: "20px" }} href="/siparis">
              Tekrar dene
            </a>
          </>
        )}

        {state.kind === "error" && (
          <>
            <h1 className="h-1">Ödeme durumu görüntülenemiyor.</h1>
            <p className="lead" style={{ marginTop: "12px" }}>
              Sipariş bilgisi geçersiz veya ödeme durumu şu anda doğrulanamıyor.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
