import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { OrderRecord } from "@/lib/types";

/* ================= SUPABASE (sipariş verisi) =================
   Tarayıcıdaki anon istemci yalnızca ilk sipariş kaydını eklemek için kullanılır.
   Mevcut sipariş güncellemeleri ve ödeme durumu değişiklikleri server-side
   endpoint'lerden yapılır. RLS anon UPDATE/SELECT/DELETE izni vermemelidir.

   Kurulum: SUPABASE-KURULUM.md. URL ve anon anahtar ortam değişkeninden
   (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY) okunur. */

let client: SupabaseClient | null | undefined;

function getClient(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  client = url && key ? createClient(url, key) : null;
  return client;
}

export async function sendOrderToSupabase(rec: OrderRecord): Promise<void> {
  const supabase = getClient();
  if (!supabase) throw new Error("Supabase istemci yapılandırması eksik.");

  const { error } = await supabase.from("orders").insert({
      id: rec.id,
      order_no: rec.orderNo,
      access_token: rec.accessToken,
      pricing_version: rec.pricingVersion,
      customer: rec.customer,
      business: rec.business,
      package: rec.package,
      addons: rec.addons,
      quote_requests: rec.quoteRequests,
      total: rec.total,
      first_year_service: rec.firstYearService,
      yearly_service: rec.yearlyService,
      invoice: rec.invoice,
      consents: rec.consents,
      payment_status: rec.paymentStatus,
      payment_ref: rec.paymentRef,
      project_status: rec.projectStatus,
      content_form: rec.contentForm,
      created_at: rec.createdAt,
    });

  if (error) {
    throw new Error("Sipariş kaydedilemedi.");
  }
}
