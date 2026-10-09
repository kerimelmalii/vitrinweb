import { createHmac, timingSafeEqual } from "node:crypto";

import { NextRequest, NextResponse } from "next/server";

import { getIyzicoClient, getIyzicoServerConfig } from "@/lib/iyzico";
import { sendOrderToWebhook } from "@/lib/order-webhook";
import { getIyzicoCallbackUrl } from "@/lib/payment-request";
import { createPaymentResultToken } from "@/lib/payment-result-token";
import { token as randomToken } from "@/lib/security";
import { calculateServerPrice, parseStoredAddonIds } from "@/lib/server-pricing";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { OrderRecord } from "@/lib/types";

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
    iyzico.checkoutForm.retrieve<RetrieveResult>(
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

// iyzico, kullanıcının tarayıcısını bu endpoint'e POST ile geri yönlendirir;
// bu nedenle hata/red durumlarında da ham JSON değil, Vitrin'in sonuç sayfasına
// yönlendirme döndürülür. Host, callback isteğinin kendi başlığından değil,
// güvenilir callback origin'inden türetilir (bkz. getIyzicoCallbackUrl).
function buildFailureUrl(orderId?: string): URL {
  const callbackUrl = new URL(getIyzicoCallbackUrl());
  const failureUrl = new URL("/siparis/tamamlandi", callbackUrl.origin);
  if (orderId) failureUrl.searchParams.set("orderId", orderId);
  failureUrl.searchParams.set("failed", "1");
  return failureUrl;
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
  let knownOrderId: string | undefined;
  try {
    const token = await readCallbackToken(request);
    if (!token) {
      console.error("iyzico callback token'ı eksik.");
      return NextResponse.redirect(buildFailureUrl(), 303);
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      throw new Error("Supabase sunucu yapılandırması eksik.");
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select(
        "id, order_no, addons, quote_requests, customer, business, invoice, pricing_version, payment_status, payment_ref, created_at",
      )
      .eq("payment_ref", token)
      .maybeSingle();

    if (orderError) {
      throw new Error("Ödeme siparişi okunamadı.");
    }

    if (!order) {
      console.error("iyzico callback: token ile eşleşen sipariş bulunamadı.");
      return NextResponse.redirect(buildFailureUrl(), 303);
    }

    knownOrderId = order.id;

    const addonIds = parseStoredAddonIds(order.addons);
    const pricing = calculateServerPrice(addonIds);
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

      return NextResponse.redirect(buildFailureUrl(order.id), 303);
    }

    if (order.payment_status !== "paid") {
      // İçerik formuna erişim için kalıcı bir token: yalnızca ödeme ilk kez
      // doğrulandığında üretilir, tekrar eden callback'lerde değişmez.
      const accessToken = randomToken(24);
      const { error: updateError } = await supabase
        .from("orders")
        .update({
          payment_status: "paid",
          payment_ref: token,
          access_token: accessToken,
        })
        .eq("id", order.id)
        .neq("payment_status", "paid");

      if (updateError) {
        throw new Error("Doğrulanmış ödeme siparişe yazılamadı.");
      }

      // Sipariş sahibinin görebileceği harici bildirim (Google E-Tablo, bkz.
      // SIPARIS-TAKIBI.md). Ortam değişkeni tanımlı değilse sessizce atlanır;
      // başarısız olsa da ödeme akışı etkilenmez.
      const record: OrderRecord = {
        id: order.id,
        orderNo: order.order_no,
        accessToken,
        pricingVersion: order.pricing_version,
        customer: order.customer,
        business: order.business,
        package: "temel",
        addons: pricing.addons,
        quoteRequests: Array.isArray(order.quote_requests) ? order.quote_requests : [],
        total: pricing.total,
        firstYearService: pricing.firstYearService,
        yearlyService: pricing.yearlyService,
        invoice: order.invoice,
        consents: null,
        paymentStatus: "paid",
        paymentRef: token,
        projectStatus: null,
        createdAt: order.created_at,
        contentForm: null,
      };
      await sendOrderToWebhook(record);
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

    return NextResponse.redirect(buildFailureUrl(knownOrderId), 303);
  }
}
