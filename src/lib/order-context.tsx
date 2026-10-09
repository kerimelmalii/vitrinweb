"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Backend, recordToOrder } from "@/lib/backend";
import { LS, blankOrder, initOrder } from "@/lib/storage";
import { RX } from "@/lib/security";
import type { Order, OrderRecord } from "@/lib/types";

type PatchArg = Partial<Order> | ((o: Order) => Partial<Order>);

interface AppCtxValue {
  order: Order;
  ready: boolean;
  patch: (p: PatchArg) => void;
  startCheckout: (opts?: { addons?: string[] }) => void;
  legal: string | null;
  openLegal: (kind: string | null) => void;
  goSection: (id: string) => void;
}

const Ctx = createContext<AppCtxValue | null>(null);

export function useApp(): AppCtxValue {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp() bir <OrderProvider> içinde çağrılmalı.");
  return v;
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  /* İlk render, sunucuda üretilen statik HTML ile birebir aynı olmalı (hydration uyuşmazlığı olmasın);
     localStorage'daki gerçek sipariş, bağlanma sonrası bir efektte yüklenir. */
  const [order, setOrder] = useState<Order>(blankOrder);
  const [ready, setReady] = useState(false);
  const [legal, setLegal] = useState<string | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    let initial = initOrder();
    /* Erişim bağlantısıyla (?t=) gelindiyse siparişi kayıttan yükle. */
    const t = new URLSearchParams(window.location.search).get("t");
    if (t && RX.token.test(t) && t !== initial.accessToken) {
      const rec = Backend.findByToken(t);
      if (rec) {
        initial = recordToOrder(rec);
      } else {
        /* Yerel depoda yok (farklı cihaz/tarayıcı ya da temizlenmiş depolama):
           sunucudaki ödenmiş siparişten tekrar kurmayı dene. */
        const controller = new AbortController();
        const fallback = initial;
        fetch(`/api/orders/by-token?t=${encodeURIComponent(t)}`, {
          cache: "no-store",
          signal: controller.signal,
        })
          .then((r) => (r.ok ? (r.json() as Promise<{ ok?: boolean; record?: OrderRecord }>) : null))
          .then((result) => {
            setOrder(result?.ok && result.record ? recordToOrder(result.record) : fallback);
            setReady(true);
          })
          .catch((error: unknown) => {
            if ((error as { name?: string })?.name !== "AbortError") {
              setOrder(fallback);
              setReady(true);
            }
          });
        return () => controller.abort();
      }
    }
    setOrder(initial);
    setReady(true);
  }, []);

  /* Açık sipariş kimliği (kişisel veri içermez): yenilemede siparişi geri kurmak için. */
  useEffect(() => {
    if (order.id) LS.set("vitrin:active", order.id);
    else LS.del("vitrin:active");
  }, [order.id]);

  /* Taslak yalnızca ödeme öncesinde tutulur; ödeme sonrası silinir. */
  useEffect(() => {
    if (order.status !== "paid") {
      LS.set("vitrin:draft", {
        ts: Date.now(),
        info: order.info,
        addons: order.addons,
        quotes: order.quotes || [],
        customRequest: order.customRequest || "",
      });
    }
  }, [order.info, order.addons, order.quotes, order.customRequest, order.status]);

  const patch = useCallback(
    (p: PatchArg) => setOrder((o) => ({ ...o, ...(typeof p === "function" ? p(o) : p) })),
    []
  );

  const startCheckout = useCallback(
    (opts: { addons?: string[] } = {}) => {
      setOrder((o) => {
        const base = o.status === "paid" ? initOrder({ info: o.info }) : o;
        const withReset = o.status === "paid" ? { ...base, addons: [], quotes: [], customRequest: "" } : base;
        return { ...withReset, step: 1, addons: opts.addons ? opts.addons : withReset.addons };
      });
      router.push("/siparis");
    },
    [router]
  );

  const goSection = useCallback(
    (id: string) => {
      if (pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push(`/#${id}`);
      }
    },
    [pathname, router]
  );

  const ctx: AppCtxValue = { order, ready, patch, startCheckout, legal, openLegal: setLegal, goSection };
  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
}

export { Ctx as AppContext };
