import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null | undefined;

/**
 * Ödeme ve sipariş durumu güncellemeleri için yalnızca sunucuda kullanılan
 * ayrıcalıklı Supabase istemcisi.
 *
 * Service Role anahtarı tarayıcıya veya NEXT_PUBLIC_* değişkenlerine konmaz.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  client = url && serviceRoleKey ? createClient(url, serviceRoleKey) : null;
  return client;
}
