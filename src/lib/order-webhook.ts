import type { OrderRecord } from "@/lib/types";

/* ================= SİPARİŞ BİLDİRİMİ (Google E-Tablolar) =================
   Site tamamen statiktir; siparişler yalnızca müşterinin kendi tarayıcısında
   (localStorage) durur. Sahibin siparişleri görebilmesi için, ödeme
   tamamlandığında bu fonksiyon sipariş özetini bir Google Apps Script
   Web App uç noktasına gönderir; o da kendi Google Sheet'ine bir satır ekler.

   Kurulum: bkz. SIPARIS-TAKIBI.md. URL ve secret ortam değişkeninden
   (NEXT_PUBLIC_ORDER_WEBHOOK_URL / NEXT_PUBLIC_ORDER_WEBHOOK_SECRET) okunur;
   tanımlı değilse fonksiyon sessizce hiçbir şey yapmaz.

   Not: Bu statik bir site olduğu için bu URL ve secret, herkesin görebileceği
   tarayıcı paketine gömülür — bir sunucu sırrı değildir. Güvenlik, secret'ın
   gizli kalmasından değil, E-Tablonun kendisinin sahibinin Google
   hesabı dışında kimseyle paylaşılmamasından ve uç noktanın yalnızca
   satır eklemesinden (asla veri döndürmemesinden) gelir. */

interface OrderWebhookPayload {
  secret: string;
  orderNo: string;
  customerName: string;
  phone: string;
  email: string;
  brand: string;
  sector: string;
  pkg: string;
  quotes: string;
  total: number;
  invoiceType: string;
  invoiceTitle: string;
  taxId: string;
  taxOffice: string;
  invoiceAddress: string;
  invoiceCity: string;
  paymentStatus: string;
  paymentRef: string;
}

export async function sendOrderToWebhook(rec: OrderRecord): Promise<void> {
  const url = process.env.NEXT_PUBLIC_ORDER_WEBHOOK_URL;
  if (!url) return;

  const payload: OrderWebhookPayload = {
    secret: process.env.NEXT_PUBLIC_ORDER_WEBHOOK_SECRET || "",
    orderNo: rec.orderNo,
    customerName: rec.customer.name,
    phone: rec.customer.phone,
    email: rec.customer.email,
    brand: rec.business.brand,
    sector: rec.business.sector,
    pkg: ["Temel Web Sitesi", ...rec.addons.map((a) => a.name)].join(", "),
    quotes: rec.quoteRequests.map((q) => q.name).join(", "),
    total: rec.total,
    invoiceType: rec.invoice.type,
    invoiceTitle: rec.invoice.title,
    taxId: rec.invoice.taxId,
    taxOffice: rec.invoice.taxOffice,
    invoiceAddress: rec.invoice.address,
    invoiceCity: rec.invoice.city,
    paymentStatus: rec.paymentStatus || "",
    paymentRef: rec.paymentRef || "",
  };

  try {
    /* "text/plain" içerik türü, Apps Script'in düzgün desteklemediği CORS
       ön kontrolünü (preflight) tetiklemeden basit bir istek olarak gönderilmesini sağlar. */
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
  } catch {
    /* Sipariş yerelde zaten kaydedildi; bildirim gönderilemese de sipariş akışı etkilenmez. */
  }
}
