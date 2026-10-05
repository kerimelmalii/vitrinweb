import "server-only";

import type { ServerPriceResult } from "@/lib/server-pricing";
import type { Consents, Invoice } from "@/lib/types";

export interface TrustedCheckoutOrder {
  id: string;
  orderNo: string;
  customer: { name: string; email: string; phone: string };
  business: { brand: string };
  invoice: Invoice;
  consents: Consents;
}

export interface IyzicoCheckoutContext {
  buyer: {
    id: string;
    name: string;
    surname: string;
    identityNumber?: string;
    email: string;
    gsmNumber: string;
    registrationAddress: string;
    city: string;
    country: string;
    ip: string;
  };
  billingAddress: {
    address: string;
    contactName: string;
    city: string;
    country: string;
  };
  shippingAddress: {
    address: string;
    contactName: string;
    city: string;
    country: string;
  };
  basketItems: Array<{
    id: string;
    price: string;
    name: string;
    category1: string;
    itemType: "VIRTUAL";
  }>;
}

function splitName(fullName: string): { name: string; surname: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return { name: parts[0], surname: "-" };
  return {
    name: parts.slice(0, -1).join(" "),
    surname: parts.at(-1) ?? "-",
  };
}

function getInvoiceCity(invoice: Invoice): string {
  if (invoice.city.trim()) return invoice.city.trim();
  throw new Error("Ödeme için fatura şehri eksik.");
}

function price(value: number): string {
  return value.toFixed(2);
}

/**
 * Supabase'ten okunup doğrulanmış siparişi iyzico Checkout Form modeline çevirir.
 *
 * Bu yardımcı tarayıcıdan buyer/adres/fiyat kabul etmez. Kimlik numarası yalnızca
 * bireysel faturada mevcutsa iyzico buyer alanına taşınır; loglanmamalıdır.
 *
 * Şehir ayrı ve zorunlu fatura alanından okunur. Adres metninden şehir tahmini
 * yapılmaz; şehir eksikse ödeme hazırlığı güvenli biçimde durdurulur.
 */
export function buildIyzicoCheckoutContext(
  order: TrustedCheckoutOrder,
  pricing: ServerPriceResult,
  ip: string,
): IyzicoCheckoutContext {
  const person = splitName(order.customer.name);
  const contactName = order.invoice.title.trim() || order.customer.name.trim();
  const city = getInvoiceCity(order.invoice);

  const basketItems: IyzicoCheckoutContext["basketItems"] = [
    {
      id: "temel-web-sitesi",
      price: price(pricing.basePrice),
      name: "Profesyonel Web Sitesi",
      category1: "Web Hizmeti",
      itemType: "VIRTUAL",
    },
    ...pricing.addons.map((addon) => ({
      id: addon.id,
      price: price(addon.price),
      name: addon.name,
      category1: "Ek Özellik",
      itemType: "VIRTUAL" as const,
    })),
  ];

  return {
    buyer: {
      id: order.id,
      ...person,
      ...(order.invoice.type === "bireysel" && order.invoice.taxId
        ? { identityNumber: order.invoice.taxId }
        : {}),
      email: order.customer.email,
      gsmNumber: order.customer.phone,
      registrationAddress: order.invoice.address,
      city,
      country: "Türkiye",
      ip,
    },
    billingAddress: {
      address: order.invoice.address,
      contactName,
      city,
      country: "Türkiye",
    },
    shippingAddress: {
      address: order.invoice.address,
      contactName,
      city,
      country: "Türkiye",
    },
    basketItems,
  };
}
