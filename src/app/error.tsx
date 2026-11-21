"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    /* Üretimde bu bir hata izleme servisine (Sentry vb.) da gönderilebilir. */
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="container-x doc-wrap">
      <h1 className="h-2">Sayfa yüklenemedi. Lütfen tekrar deneyin.</h1>
      <p className="lead" style={{ margin: "14px 0 26px" }}>
        {typeof navigator !== "undefined" && navigator.onLine === false
          ? "İnternet bağlantınızı kontrol edip tekrar deneyin."
          : "Sorun sürerse ana sayfaya dönebilir veya bize doğrudan e-posta gönderebilirsiniz."}
      </p>
      <div className="hero-cta" style={{ marginTop: 0 }}>
        <button className="btn btn-primary" onClick={reset}>
          Tekrar Deneyin
        </button>
        <Link className="btn btn-line" href="/">
          Ana Sayfa
        </Link>
      </div>
    </main>
  );
}
