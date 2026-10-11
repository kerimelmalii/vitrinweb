import { NextRequest, NextResponse } from "next/server";

import { ADMIN_COOKIE_NAME, createSessionToken, verifyAdminPassword } from "@/lib/admin-session";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const WINDOW_MINUTES = 15;
const MAX_FAILURES = 5;

/**
 * Tek operatörlü bir panel olduğu için kilitleme IP bazlı değil, geneldir: pencere içinde
 * MAX_FAILURES başarısız denemeden sonra doğru şifre de olsa reddedilir. Kaba kuvvet
 * denemelerine karşı basit ama etkili — admin_login_attempts tablosu (service-role, RLS
 * politikasız) Supabase'de tutulur çünkü Vercel serverless fonksiyonları arasında bellek
 * paylaşılmaz.
 */
export async function POST(request: NextRequest) {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const since = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("admin_login_attempts")
      .select("id", { count: "exact", head: true })
      .eq("success", false)
      .gte("created_at", since);
    if ((count || 0) >= MAX_FAILURES) {
      return NextResponse.json(
        { ok: false, error: `Çok fazla başarısız deneme. ${WINDOW_MINUTES} dakika sonra tekrar deneyin.` },
        { status: 429 },
      );
    }
  }

  let body: { password?: unknown };
  try {
    body = (await request.json()) as { password?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: "Geçersiz istek." }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";
  const valid = await verifyAdminPassword(password);

  if (supabase) {
    await supabase.from("admin_login_attempts").insert({ success: valid });
    const cutoff = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    await supabase.from("admin_login_attempts").delete().lt("created_at", cutoff);
  }

  if (!valid) {
    return NextResponse.json({ ok: false, error: "Şifre yanlış." }, { status: 401 });
  }

  let token: string;
  try {
    token = await createSessionToken();
  } catch {
    return NextResponse.json({ ok: false, error: "Admin girişi yapılandırılmamış." }, { status: 503 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
