import "server-only";

import { ADDONS } from "@/data/content";
import { BASE_PRICE, PRICING_VERSION, YEARLY } from "@/lib/config";

export interface ServerPriceResult {
  pricingVersion: string;
  basePrice: number;
  addons: Array<{ id: string; name: string; price: number }>;
  extra: number;
  total: number;
  firstYearService: number;
  yearlyService: number;
}

/**
 * Ödeme tutarının tek güvenilir kaynağı sunucudur.
 * Tarayıcıdan gelen fiyat/total değerleri hiçbir zaman ödeme için kullanılmaz.
 */
export function calculateServerPrice(addonIds: string[]): ServerPriceResult {
  const uniqueIds = [...new Set(addonIds)];
  const knownIds = new Set(ADDONS.map((addon) => addon.id));
  const unknownIds = uniqueIds.filter((id) => !knownIds.has(id));

  if (unknownIds.length > 0) {
    throw new Error("Geçersiz ek özellik seçimi.");
  }

  const addons = ADDONS.filter((addon) => uniqueIds.includes(addon.id)).map(
    ({ id, name, price }) => ({ id, name, price }),
  );

  const extra = addons.reduce((sum, addon) => sum + addon.price, 0);

  return {
    pricingVersion: PRICING_VERSION,
    basePrice: BASE_PRICE,
    addons,
    extra,
    total: BASE_PRICE + extra,
    firstYearService: 0,
    yearlyService: YEARLY,
  };
}
