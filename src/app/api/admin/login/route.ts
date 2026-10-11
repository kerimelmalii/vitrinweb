import { NextRequest, NextResponse } from "next/server";

import { ADMIN_COOKIE_NAME, createSessionToken, verifyAdminPassword } from "@/lib/admin-session";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let body: { password?: unknown };
  try {
    body = (await request.json()) as { password?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: "Geçersiz istek." }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";
  const valid = await verifyAdminPassword(password);
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
