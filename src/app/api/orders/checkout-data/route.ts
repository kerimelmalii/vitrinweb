import { NextRequest, NextResponse } from "next/server";

import { LIMITS, RX, clean, validTCKN } from "@/lib/security";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { Consents, Invoice } from "@/lib/types";

export const runtime = "nodejs";

interface CheckoutDataBody {
  orderId?: unknown;
  orderNo?: unknown;
  email?: unknown;
  invoice?: unknown;
  consents?: unknown;
}

function badRequest(error: string) {
  return NextResponse.json(
    { ok: false, error },
    { status: 400, headers: { "Cache-Control": "no-store, private" } },
  );
}

function parseInvoice(value: unknown): Invoice | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;
  const type = raw.type === "kurumsal" ? "kurumsal" : raw.type === "bireysel" ? "bireysel" : null;
  if (!type) return null;

  const invoice: Invoice = {
    type,
    title: clean(raw.title, LIMITS.invTitle).trim(),
    taxId: clean(raw.taxId, 11).replace(/\D/g, ""),
    taxOffice: clean(raw.taxOffice, LIMITS.taxOffice).trim(),
    address: clean(raw.address, LIMITS.address).trim(),
    city: clean(raw.city, LIMITS.city).trim(),
  };

  if (invoice.title.length < 2 || invoice.address.length < 8 || invoice.city.length < 2) {
    return null;
  }

  if (type === "kurumsal") {
    if (!/^\d{10}$/.test(invoice.taxId) || invoice.taxOffice.length < 2) return null;
  } else if (!validTCKN(invoice.taxId)) {
    return null;
  }

  return invoice;
}

function parseConsents(value: unknown): Consents | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;

  if (raw.kvkk !== true || raw.distance !== true || raw.terms !== true) return null;
  if (typeof raw.at !== "string") return null;

  const at = new Date(raw.at);
  const now = Date.now();
  if (
    Number.isNaN(at.getTime()) ||
    at.getTime() > now + 60_000 ||
    at.getTime() < now - 10 * 60_000
  ) {
    return null;
  }

  return {
    kvkk: true,
    distance: true,
    terms: true,
    marketing: raw.marketing === true,
    at: at.toISOString(),
  };
}

/**
 * Checkout'tan hemen önce yalnızca fatura ve onay alanlarını günceller.
 *
 * Service-role anahtarı browser'a verilmez. Siparişin kimliğini doğrulamak için
 * tahmin edilmesi zor orderId'ye ek olarak orderNo ve kayıtlı müşteri e-postası
 * eşleşmesi zorunludur. Fiyat, eklentiler ve ödeme durumu bu endpoint ile
 * değiştirilemez.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutDataBody;
    const orderId = typeof body.orderId === "string" ? body.orderId.trim() : "";
    const orderNo = typeof body.orderNo === "string" ? body.orderNo.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const invoice = parseInvoice(body.invoice);
    const consents = parseConsents(body.consents);

    if (!RX.orderId.test(orderId) || !/^\d{6}$/.test(orderNo) || !RX.email.test(email)) {
      return badRequest("Sipariş doğrulama bilgileri geçersiz.");
    }

    if (!invoice || !consents) {
      return badRequest("Fatura veya zorunlu onay bilgileri geçersiz.");
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) throw new Error("Supabase sunucu yapılandırması eksik.");

    const { data: order, error: readError } = await supabase
      .from("orders")
      .select("id, order_no, customer, payment_status")
      .eq("id", orderId)
      .maybeSingle();

    if (readError) throw new Error("Sipariş doğrulanamadı.");
    if (!order) {
      return NextResponse.json(
        { ok: false, error: "Sipariş bulunamadı." },
        { status: 404, headers: { "Cache-Control": "no-store, private" } },
      );
    }

    const storedEmail =
      typeof order.customer?.email === "string"
        ? order.customer.email.trim().toLowerCase()
        : "";

    if (order.order_no !== orderNo || storedEmail !== email) {
      return NextResponse.json(
        { ok: false, error: "Sipariş doğrulanamadı." },
        { status: 403, headers: { "Cache-Control": "no-store, private" } },
      );
    }

    if (order.payment_status === "paid") {
      return NextResponse.json(
        { ok: false, error: "Ödenmiş sipariş değiştirilemez." },
        { status: 409, headers: { "Cache-Control": "no-store, private" } },
      );
    }

    const { error: updateError } = await supabase
      .from("orders")
      .update({ invoice, consents })
      .eq("id", orderId)
      .neq("payment_status", "paid");

    if (updateError) throw new Error("Checkout bilgileri kaydedilemedi.");

    return NextResponse.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store, private" } },
    );
  } catch (error) {
    console.error("Checkout sipariş güncellemesi başarısız:", {
      message: error instanceof Error ? error.message : "Bilinmeyen hata",
    });
    return NextResponse.json(
      { ok: false, error: "Sipariş bilgileri şu anda kaydedilemiyor." },
      { status: 503, headers: { "Cache-Control": "no-store, private" } },
    );
  }
}
