"use client";

import { useEffect, useState } from "react";
import { AddonList, QuoteAddons } from "@/components/addons";
import { AnimatedNumber } from "@/components/animated-number";
import { Shell } from "@/components/checkout/stepper";
import { Icon } from "@/components/icons";
import { OrderSummary } from "@/components/order-summary";
import { INCLUDED } from "@/data/content";
import { BASE_PRICE, TL } from "@/lib/config";
import { useApp } from "@/lib/order-context";
import { Backend } from "@/lib/backend";
import { pricing } from "@/lib/pricing";
import { token } from "@/lib/security";

export function PackageStep() {
  const { order, patch } = useApp();
  const p = pricing(order.addons);
  const [qErr, setQErr] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- kullanıcı düzenlemeye başlayınca hatayı temizler
    if (qErr) setQErr("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order.customRequest, order.quotes]);

  const next = async () => {
    if ((order.quotes || []).includes("ozel") && (order.customRequest || "").trim().length < 10) {
      setQErr("İsteğinizi birkaç kelimeyle yazın ya da Özel İstek seçimini kaldırın.");
      const el = document.getElementById("q-custom");
      if (el) {
        el.focus();
        el.scrollIntoView({ block: "center" });
      }
      return;
    }
    const id = order.id || "ord_" + token(16);
    const orderNo = order.orderNo || Backend.newOrderNo();
    const createdAt = order.createdAt || new Date().toISOString();
    setSaving(true);
    try {
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: id,
          orderNo,
          createdAt,
          info: order.info,
          addons: order.addons,
          quotes: order.quotes,
          customRequest: order.customRequest,
        }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        setQErr(result.error || "Sipariş şu anda oluşturulamıyor. Lütfen tekrar deneyin.");
        return;
      }

      patch({ id, orderNo, createdAt, status: "pending", step: 3 });
      window.scrollTo({ top: 0 });
    } catch {
      setQErr("Sipariş şu anda oluşturulamıyor. Lütfen tekrar deneyin.");
    } finally {
      setSaving(false);
    }
  };

  const back = (
    <button
      className="back"
      onClick={() => {
        patch({ step: 1 });
        window.scrollTo({ top: 0 });
      }}
    >
      Bilgilerime dön
    </button>
  );

  return (
    <Shell
      step={2}
      title="Web sitenizi ihtiyacınıza göre oluşturun."
      sub="Temel paket otomatik seçili. Gerekiyorsa ek özellikleri işaretleyin, toplam anında güncellenir."
      aside={
        <OrderSummary
          sticky
          cta={
            <>
              <button className="btn btn-tag btn-lg btn-block" onClick={next} disabled={saving}>
                {saving ? "Sipariş Oluşturuluyor…" : "Ödemeye Geç"}
              </button>
              {back}
            </>
          }
        />
      }
      desk
      hint="Sıradaki adım: ödeme. Ödeme sayfasında siparişinizi son kez görürsünüz."
    >
      <div className="base-row">
        <div>
          <b>Temel Web Sitesi</b>
          <div className="fine" style={{ marginTop: "4px" }}>
            {INCLUDED.slice(0, 6)
              .map((f) => f.t)
              .join(", ")}
          </div>
        </div>
        <span className="fixed">
          <Icon n="check" size={15} sw={2.5} /> Otomatik seçili
        </span>
        <b>{TL(BASE_PRICE)}</b>
      </div>
      <AddonList />
      <div className="quote-block">
        <p className="fine quote-label">Kapsama göre fiyatlanan özellikler</p>
        <QuoteAddons err={qErr} />
      </div>
      <div className="mbar">
        <div>
          <small>{(order.quotes || []).length ? "Şimdi ödenecek" : "Toplam"}</small>
          <b>
            <AnimatedNumber value={p.total} /> TL
          </b>
        </div>
        <button className="btn btn-primary" onClick={next} disabled={saving}>
          {saving ? "Sipariş Oluşturuluyor…" : "Ödemeye Geç"}
        </button>
      </div>
      <div style={{ height: "70px" }} className="lg:hidden"></div>
    </Shell>
  );
}
