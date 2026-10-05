import { createHmac, timingSafeEqual } from "node:crypto";

import { NextRequest, NextResponse } from "next/server";

import { getIyzicoClient, getIyzicoServerConfig } from "@/lib/iyzico";
import { getIyzicoCallbackUrl } from "@/lib/payment-request";
import { createPaymentResultToken } from "@/lib/payment-result-token";
import { calculateServerPrice } from "@/lib/server-pricing";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

interface RetrieveResult {
  status?: string;
  errorCode?: string;
  paymentStatus?: string;
  paymentId?: string;
  currency?: string;
  basketId?: string;
  conversationId?: string;
  paidPrice?: number | string;
  price?: number | string;
  token?: string;
  signature?: string;
}

function retrieveCheckoutForm(
  token: string,
  conversationId: string,
): Promise<RetrieveResult> {
  const iyzico = getIyzicoClient();

  return new Promise((resolve, reject) => {
    iyzico.checkoutForm.retrieve(
      { locale: "tr", conversationId, token },
      (error: unknown, result: RetrieveResult) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      },
    );
  });
}

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function verifyRetrieveSignature(result: RetrieveResult): boolean {
  if (!result.signature) return false;

  const { secretKey } = getIyzicoServerConfig();
  const params = [
    result.paymentStatus,
    result.paymentId,
    result.currency,
    result.basketId,
    result.conversationId,
    result.paidPrice,
    result.price,
    result.token,
  ];

  if (params.some((value) => value === undefined || value === null)) {
    return false;
  }

  const expected = createHmac("sha256", secretKey)
    .update(params.map(String).join(":"))
    .digest("hex");

  return safeEqual(expected, result.signature);
}

async function readCallbackToken(request: NextRequest): Promise<string> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = (await request.json()) as { token?: unknown };
    return typeof body.token === "string" ? body.token.trim() : "";
  }

  const form = await request.formData();
  const token = form.get("token");
  return typeof token === "string" ? token.trim() : "";
}

export async function POST(request: NextRequest) {
  try {
    const token = await readCallbackToken(request);
    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Ödeme token'ı eksik." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      throw new Error("Supabase sunucu yapılandırması eksik.");
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, order_no, addons, payment_status, payment_ref")
      .eq("payment_ref", token)
      .maybeSingle();

    if (orderError) {
      throw new Error("Ödeme siparişi okunamadı.");
    }

    if (!order) {
      return NextResponse.json(
        { ok: false, error: "Ödeme siparişi bulunamadı." },
        { status: 404 },
      );
    }

    if (
      !Array.isArray(order.addons) ||
      !order.addons.every(
        (addon: unknown) =>
          typeof addon === "object" &&
          addon !== null &&
          "id" in addon &&
          typeof addon.id === "string",
      )
    ) {
      throw new Error("Siparişin kayıtlı ek özellikleri geçersiz.");
    }

    const pricing = calculateServerPrice(
      order.addons.map((addon: { id: string }) => addon.id),
    );
    const result = await retrieveCheckoutForm(token, order.id);

    const expectedAmount = pricing.total.toFixed(2);
    const retrievedPrice = Number(result.price).toFixed(2);
    const retrievedPaidPrice = Number(result.paidPrice).toFixed(2);

    const verified =
      result.status === "success" &&
      result.paymentStatus === "SUCCESS" &&
      result.token === token &&
      result.conversationId === order.id &&
      result.basketId === order.order_no &&
      result.currency === "TRY" &&
      retrievedPrice === expectedAmount &&
      retrievedPaidPrice === expectedAmount &&
      verifyRetrieveSignature(result);

    if (!verified) {
      console.error("iyzico callback doğrulaması başarısız:", {
        orderId: order.id,
        status: result.status,
        paymentStatus: result.paymentStatus,
        errorCode: result.errorCode,
      });

      return NextResponse.json(
        { ok: false, error: "Ödeme doğrulanamadı." },
        { status: 400 },
      );
    }

    if (order.payment_status !== "paid") {
      const { error: updateError } = await supabase
        .from("orders")
        .update({
          payment_status: "paid",
          payment_ref: token,
        })
        .eq("id", order.id)
        .neq("payment_status", "paid");

      if (updateError) {
        throw new Error("Doğrulanmış ödeme siparişe yazılamadı.");
      }
    }

    const resultToken = createPaymentResultToken(order.id);
    // Başarılı ödeme sonrası dönüş hostunu callback isteğinin Host bilgisinden
    // türetmeyiz. Aynı güvenilir origin, hem iyzico callback adresi hem de
    // kullanıcı sonuç sayfası için kullanılır.
    const callbackUrl = new URL(getIyzicoCallbackUrl());
    const successUrl = new URL("/siparis/tamamlandi", callbackUrl.origin);
    successUrl.searchParams.set("orderId", order.id);
    successUrl.searchParams.set("resultToken", resultToken);

    return NextResponse.redirect(successUrl, 303);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    console.error(
      "iyzico callback işlenemedi:",
      message || "Bilinmeyen hata",
    );

    return NextResponse.json(
      { ok: false, error: "Ödeme sonucu işlenemedi." },
      { status: 503 },
    );
  }
}
