import { NextRequest, NextResponse } from "next/server";

import { QUOTE_ADDONS, SECTORS } from "@/data/content";
import { LIMITS, RX, clean, phoneOk } from "@/lib/security";
import { calculateServerPrice } from "@/lib/server-pricing";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

interface CreateOrderBody {
  orderId?: unknown;
  orderNo?: unknown;
  createdAt?: unknown;
  info?: unknown;
  addons?: unknown;
  quotes?: unknown;
  customRequest?: unknown;
}

function response(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store, private" },
  });
}

function parseInfo(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;

  const info = {
    name: clean(raw.name, LIMITS.name).trim(),
    brand: clean(raw.brand, LIMITS.brand).trim(),
    phone: clean(raw.phone, LIMITS.phone).trim(),
    email: clean(raw.email, LIMITS.email).trim().toLowerCase(),
    sector: clean(raw.sector, LIMITS.short).trim(),
    site: clean(raw.site, LIMITS.url).trim(),
    instagram: clean(raw.instagram, LIMITS.handle).trim(),
    whatsapp: clean(raw.whatsapp, LIMITS.phone).trim(),
    wishes: clean(raw.wishes, LIMITS.wishes).trim(),
  };

  if (
    info.name.length < 2 ||
    info.brand.length < 2 ||
    !phoneOk(info.phone) ||
    !RX.email.test(info.email) ||
    !SECTORS.includes(info.sector) ||
    (info.site && !RX.url.test(info.site)) ||
    (info.instagram && !RX.ig.test(info.instagram)) ||
    (info.whatsapp && !phoneOk(info.whatsapp))
  ) {
    return null;
  }

  return info;
}

function parseStringArray(value: unknown, maxItems: number): string[] | null {
  if (!Array.isArray(value) || value.length > maxItems) return null;
  if (value.some((item) => typeof item !== "string")) return null;
  return [...new Set(value.map((item) => item.trim()))];
}

/**
 * Paket seçiminden ödeme adımına geçerken ilk kalıcı sipariş kaydını oluşturur.
 *
 * Browser yalnızca seçimleri gönderir. Fiyat, eklenti adları ve servis ücretleri
 * sunucuda güvenilir sabitlerden yeniden üretilir. Service-role anahtarı browser'a
 * açılmaz ve bu endpoint ödeme durumunu hiçbir zaman paid yapamaz.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateOrderBody;
    const orderId = typeof body.orderId === "string" ? body.orderId.trim() : "";
    const orderNo = typeof body.orderNo === "string" ? body.orderNo.trim() : "";
    const info = parseInfo(body.info);
    const addonIds = parseStringArray(body.addons, 20);
    const quoteIds = parseStringArray(body.quotes, 20);
    const customRequest = clean(body.customRequest, LIMITS.custom).trim();

    if (!RX.orderId.test(orderId) || !/^\d{6}$/.test(orderNo) || !info) {
      return response({ ok: false, error: "Sipariş bilgileri geçersiz." }, 400);
    }

    if (!addonIds || !quoteIds) {
      return response({ ok: false, error: "Sipariş seçimleri geçersiz." }, 400);
    }

    const allowedQuoteIds = new Set(QUOTE_ADDONS.map((quote) => quote.id));
    if (quoteIds.some((id) => !allowedQuoteIds.has(id))) {
      return response({ ok: false, error: "Teklif seçimi geçersiz." }, 400);
    }

    const wantsCustom = quoteIds.includes("ozel");
    if (wantsCustom && customRequest.length < 10) {
      return response({ ok: false, error: "Özel isteğinizi biraz daha ayrıntılı yazın." }, 400);
    }

    const createdAt =
      typeof body.createdAt === "string" && !Number.isNaN(Date.parse(body.createdAt))
        ? new Date(body.createdAt).toISOString()
        : new Date().toISOString();

    const price = calculateServerPrice(addonIds);
    const quoteRequests = QUOTE_ADDONS.filter((quote) => quoteIds.includes(quote.id)).map(
      (quote) =>
        quote.custom
          ? { id: quote.id, name: quote.name, note: customRequest }
          : { id: quote.id, name: quote.name },
    );

    const supabase = getSupabaseAdmin();
    if (!supabase) throw new Error("Supabase sunucu yapılandırması eksik.");

    const { data: existing, error: existingError } = await supabase
      .from("orders")
      .select("id")
      .or(`id.eq.${orderId},order_no.eq.${orderNo}`)
      .limit(1);

    if (existingError) throw new Error("Sipariş çakışması kontrol edilemedi.");
    if (existing && existing.length > 0) {
      return response(
        { ok: false, error: "Sipariş kimliği oluşturulamadı. Lütfen tekrar deneyin." },
        409,
      );
    }

    const { error: insertError } = await supabase.from("orders").insert({
      id: orderId,
      order_no: orderNo,
      access_token: null,
      pricing_version: price.pricingVersion,
      customer: {
        name: info.name,
        email: info.email,
        phone: info.phone,
      },
      business: {
        brand: info.brand,
        sector: info.sector,
        site: info.site,
        instagram: info.instagram,
        whatsapp: info.whatsapp,
        wishes: info.wishes,
      },
      package: "temel",
      addons: price.addons,
      quote_requests: quoteRequests,
      total: price.total,
      first_year_service: price.firstYearService,
      yearly_service: price.yearlyService,
      invoice: {
        type: "bireysel",
        title: "",
        taxId: "",
        taxOffice: "",
        address: "",
        city: "",
      },
      consents: null,
      payment_status: "pending",
      payment_ref: null,
      project_status: null,
      content_form: null,
      created_at: createdAt,
    });

    if (insertError) throw new Error("Sipariş oluşturulamadı.");

    return response({
      ok: true,
      orderId,
      orderNo,
      createdAt,
      pricingVersion: price.pricingVersion,
      amount: price.total,
    });
  } catch (error) {
    console.error("Sipariş oluşturma başarısız:", {
      message: error instanceof Error ? error.message : "Bilinmeyen hata",
    });
    return response(
      { ok: false, error: "Sipariş şu anda oluşturulamıyor. Lütfen tekrar deneyin." },
      503,
    );
  }
}
