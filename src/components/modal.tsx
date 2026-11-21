"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons";

export function Modal({
  title,
  onClose,
  wide,
  size,
  children,
}: {
  title: string;
  onClose: () => void;
  wide?: boolean;
  size?: "xl";
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    if (ref.current) ref.current.focus();
    return () => {
      document.removeEventListener("keydown", k);
      document.body.style.overflow = "";
      if (prev && prev.focus) prev.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="ovl"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={"mdl " + (wide ? "wide " : "") + (size === "xl" ? "xl" : "")}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={ref}
      >
        <div className="mdl-h">
          <span>{title}</span>
          <button className="iconbtn" onClick={onClose} aria-label="Kapat">
            <Icon n="x" />
          </button>
        </div>
        <div className="mdl-b">{children}</div>
      </div>
    </div>
  );
}
