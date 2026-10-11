import { NextRequest, NextResponse } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const STATUSES = new Set(["yeni", "okundu", "yanitlandi", "arsivlendi"]);

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let body: { adminStatus?: unknown };
  try {
    body = (await request.json()) as { adminStatus?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: "Geçersiz istek." }, { status: 400 });
  }

  const adminStatus = typeof body.adminStatus === "string" ? body.adminStatus : "";
  if (!STATUSES.has(adminStatus)) {
    return NextResponse.json({ ok: false, error: "Geçersiz durum." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "Veritabanı yapılandırılmamış." }, { status: 503 });
  }

  const { error } = await supabase.from("contact_messages").update({ admin_status: adminStatus }).eq("id", id);
  if (error) {
    return NextResponse.json({ ok: false, error: "Güncellenemedi." }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
