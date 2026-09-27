"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/* Bölüm görünüme girince hafif bir fade + yukarı kayma ile beliren sarmalayıcı.
   prefers-reduced-motion zaten globals.css'te sitewide olarak sıfırlanıyor. */
export function Reveal({
  children,
  className = "",
  id,
  style,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={"reveal " + (shown ? "on " : "") + className}
      style={{ ...style, transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
