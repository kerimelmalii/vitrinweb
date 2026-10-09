import { NextRequest, NextResponse } from "next/server";

import { FILE_RULES, LIMITS, RX, clean } from "@/lib/security";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { ContentForm, ContentFormFiles } from "@/lib/types";

export const runtime = "nodejs";

interface ContentFormBody {
  orderId?: unknown;
  accessToken?: unknown;
  content?: unknown;
}

function badRequest(error: string) {
  return NextResponse.json(
    { ok: false, error },
    { status: 400, headers: { "Cache-Control": "no-store, private" } },
  );
}

function parseFileList(value: unknown): { name: string; size: number }[] {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, FILE_RULES.maxFiles)
    .filter(
      (f): f is { name: unknown; size: unknown } =>
        typeof f === "object" && f !== null && "name" in f && "size" in f,
    )
    .map((f) => ({
      name: clean(f.name, LIMITS.short).trim(),
      size: typeof f.size === "number" && f.size >= 0 ? f.size : 0,
    }))
    .filter((f) => f.name.length > 0);
}

function parseFiles(value: unknown): ContentFormFiles {
  const raw = (value && typeof value === "object" ? value : {}) as Record<string, unknown>;
  return {
    logo: parseFileList(raw.logo),
    business: parseFileList(raw.business),
    product: parseFileList(raw.product),
    team: parseFileList(raw.team),
  };
}

function parseContent(value: unknown): ContentForm | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;

  const colors = Array.isArray(raw.colors)
    ? raw.colors.filter((c): c is string => typeof c === "string" && /^#[0-9a-f]{6}$/i.test(c)).slice(0, 4)
    : [];

  const content: ContentForm = {
    brand: clean(raw.brand, LIMITS.brand).trim(),
    slogan: clean(raw.slogan, LIMITS.short).trim(),
    colors,
    about: clean(raw.about, LIMITS.text).trim(),
    services: clean(raw.services, LIMITS.text).trim(),
    products: clean(raw.products, LIMITS.text).trim(),
    phone: clean(raw.phone, LIMITS.phone).trim(),
    email: clean(raw.email, LIMITS.email).trim(),
    address: clean(raw.address, LIMITS.address).trim(),
    hours: clean(raw.hours, LIMITS.short).trim(),
    style: clean(raw.style, LIMITS.short).trim(),
    ref: clean(raw.ref, LIMITS.url).trim(),
    files: parseFiles(raw.files),
  };

  if (content.brand.length < 2) return null;
  if (content.ref && !RX.url.test(content.ref)) return null;

  return content;
}

/**
 * Ödeme sonrası proje başlangıç formunu (içerik) kaydeder.
 *
 * Kimlik doğrulama: sipariş hesap/şifre sistemi yok, bu yüzden müşterinin
 * elindeki tek kimlik kanıtı ödeme sonrası üretilen `accessToken`'dır — bu
 * değer, veritabanındaki kayıtla birebir eşleşmeli ve sipariş `paid`
 * olmalıdır. Fiyat/ödeme durumu bu endpoint ile hiçbir şekilde değişmez.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContentFormBody;
    const orderId = typeof body.orderId === "string" ? body.orderId.trim() : "";
    const accessToken = typeof body.accessToken === "string" ? body.accessToken.trim() : "";

    if (!RX.orderId.test(orderId) || !RX.token.test(accessToken)) {
      return badRequest("Sipariş doğrulama bilgileri geçersiz.");
    }

    const content = parseContent(body.content);
    if (!content) {
      return badRequest("Form bilgileri geçersiz.");
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) throw new Error("Supabase sunucu yapılandırması eksik.");

    const { data: order, error: readError } = await supabase
      .from("orders")
      .select("id, access_token, payment_status")
      .eq("id", orderId)
      .maybeSingle();

    if (readError) throw new Error("Sipariş doğrulanamadı.");

    if (
      !order ||
      !order.access_token ||
      order.access_token !== accessToken ||
      order.payment_status !== "paid"
    ) {
      return NextResponse.json(
        { ok: false, error: "Sipariş doğrulanamadı." },
        { status: 403, headers: { "Cache-Control": "no-store, private" } },
      );
    }

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        content_form: content,
        project_status: "Tasarım",
        received_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (updateError) throw new Error("Proje formu kaydedilemedi.");

    return NextResponse.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store, private" } },
    );
  } catch (error) {
    console.error("İçerik formu kaydedilemedi:", {
      message: error instanceof Error ? error.message : "Bilinmeyen hata",
    });
    return NextResponse.json(
      { ok: false, error: "Form şu anda kaydedilemiyor. Lütfen tekrar deneyin." },
      { status: 503, headers: { "Cache-Control": "no-store, private" } },
    );
  }
}
