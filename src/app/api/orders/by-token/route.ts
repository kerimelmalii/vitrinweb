import { NextRequest, NextResponse } from "next/server";

import { RX } from "@/lib/security";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { OrderRecord } from "@/lib/types";

export const runtime = "nodejs";

function noStoreJson(body: object, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store, private" },
  });
}

/**
 * Erişim bağlantısıyla (?t=) gelen müşterinin siparişini geri kurar.
 *
 * Bu site hesap/şifre sistemi kullanmaz: ödeme sonrası üretilen `accessToken`
 * tek kimlik kanıtıdır (bkz. backend.ts'teki Backend.findByToken yorumu —
 * burası onun sunucu karşılığıdır). Yalnızca ödenmiş siparişler döner;
 * token veritabanındaki kayıtla birebir eşleşmelidir.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("t")?.trim() ?? "";

  if (!RX.token.test(token)) {
    return noStoreJson({ ok: false, error: "Geçersiz bağlantı." }, 400);
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return noStoreJson({ ok: false, error: "Sipariş durumu kullanılamıyor." }, 503);
  }

  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, order_no, access_token, pricing_version, customer, business, package, addons, quote_requests, total, first_year_service, yearly_service, invoice, consents, payment_status, payment_ref, project_status, content_form, created_at",
    )
    .eq("access_token", token)
    .eq("payment_status", "paid")
    .maybeSingle();

  if (error) {
    console.error("Sipariş token ile okunamadı.");
    return noStoreJson({ ok: false, error: "Sipariş durumu kullanılamıyor." }, 503);
  }

  if (!data) {
    return noStoreJson({ ok: false, error: "Bu bağlantı geçerli değil." }, 404);
  }

  const record: OrderRecord = {
    id: data.id,
    orderNo: data.order_no,
    accessToken: data.access_token,
    pricingVersion: data.pricing_version,
    customer: data.customer,
    business: data.business,
    package: data.package,
    addons: data.addons ?? [],
    quoteRequests: data.quote_requests ?? [],
    total: data.total,
    firstYearService: data.first_year_service,
    yearlyService: data.yearly_service,
    invoice: data.invoice,
    consents: data.consents,
    paymentStatus: data.payment_status,
    paymentRef: data.payment_ref,
    projectStatus: data.project_status,
    createdAt: data.created_at,
    contentForm: data.content_form,
  };

  return noStoreJson({ ok: true, record });
}
