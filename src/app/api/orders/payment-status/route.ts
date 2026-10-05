import { NextRequest, NextResponse } from "next/server";

import { verifyPaymentResultToken } from "@/lib/payment-result-token";
import { RX } from "@/lib/security";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

function noStoreJson(body: object, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store, private" },
  });
}

/**
 * Ödeme sonrası tarayıcının görebileceği minimum sipariş durumu.
 *
 * Bu endpoint ödeme durumunu değiştirmez. Sadece Supabase'teki güvenilir kaydı
 * okur ve kişisel/fatura verilerini hiçbir zaman browser'a döndürmez.
 */
export async function GET(request: NextRequest) {
  const orderId = request.nextUrl.searchParams.get("orderId")?.trim() ?? "";
  const resultToken =
    request.nextUrl.searchParams.get("resultToken")?.trim() ?? "";

  if (!RX.orderId.test(orderId)) {
    return noStoreJson({ ok: false, error: "Geçersiz sipariş." }, 400);
  }

  if (!verifyPaymentResultToken(orderId, resultToken)) {
    return noStoreJson({ ok: false, error: "Geçersiz veya süresi dolmuş ödeme sonucu." }, 403);
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return noStoreJson({ ok: false, error: "Sipariş durumu kullanılamıyor." }, 503);
  }

  const { data, error } = await supabase
    .from("orders")
    .select("id, order_no, payment_status")
    .eq("id", orderId)
    .maybeSingle();

  if (error) {
    console.error("Sipariş ödeme durumu okunamadı:", { orderId });
    return noStoreJson({ ok: false, error: "Sipariş durumu kullanılamıyor." }, 503);
  }

  if (!data) {
    return noStoreJson({ ok: false, error: "Sipariş bulunamadı." }, 404);
  }

  return noStoreJson({
    ok: true,
    orderId: data.id,
    orderNo: data.order_no,
    paid: data.payment_status === "paid",
  });
}
