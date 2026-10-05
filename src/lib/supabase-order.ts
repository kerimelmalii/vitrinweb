import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { OrderRecord } from "@/lib/types";

/* ================= SUPABASE (sipariş verisi) =================
   Site tamamen statiktir; bu istemci doğrudan tarayıcıdan anon anahtarla yalnızca
   YENİ satır ekler (bkz. supabase/schema.sql — RLS insert-only). Siparişler Supabase
   Dashboard'ın Table Editor'ünden görüntülenir. Ödeme (iyzico) ve erişim token'ıyla
   güncelleme gibi sunucu mantığı henüz burada değil (bkz. DEVIR-BELGESI.md bölüm 8).

   Kurulum: SUPABASE-KURULUM.md. URL ve anon anahtar ortam değişkeninden
   (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY) okunur; tanımlı
   değilse fonksiyon sessizce hiçbir şey yapmaz (order-webhook.ts ile aynı desen). */

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
  if (!supabase) return;
  try {
    await supabase.from("orders").upsert({
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
    }, { onConflict: "id" });
  } catch {
    /* Sipariş yerelde zaten kaydedildi; Supabase'e yazılamasa da akış etkilenmez. */
  }
}
