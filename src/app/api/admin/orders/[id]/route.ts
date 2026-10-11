import { NextRequest, NextResponse } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { RX } from "@/lib/security";

export const runtime = "nodejs";

const STATUSES = new Set(["yeni", "incelendi", "tamamlandi"]);

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!RX.orderId.test(id)) {
    return NextResponse.json({ ok: false, error: "Geçersiz sipariş kimliği." }, { status: 400 });
  }

  let body: { contentFormStatus?: unknown };
  try {
    body = (await request.json()) as { contentFormStatus?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: "Geçersiz istek." }, { status: 400 });
  }

  const contentFormStatus = typeof body.contentFormStatus === "string" ? body.contentFormStatus : "";
  if (!STATUSES.has(contentFormStatus)) {
    return NextResponse.json({ ok: false, error: "Geçersiz durum." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "Veritabanı yapılandırılmamış." }, { status: 503 });
  }

  const { error } = await supabase.from("orders").update({ content_form_status: contentFormStatus }).eq("id", id);
  if (error) {
    return NextResponse.json({ ok: false, error: "Güncellenemedi." }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
