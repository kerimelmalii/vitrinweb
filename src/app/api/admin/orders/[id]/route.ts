import { NextRequest, NextResponse } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { RX } from "@/lib/security";
import { PROJECT_STATUSES } from "@/lib/types";

export const runtime = "nodejs";

const CONTENT_FORM_STATUSES = new Set(["yeni", "incelendi", "tamamlandi"]);
const PROJECT_STATUS_SET = new Set<string>(PROJECT_STATUSES);

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!RX.orderId.test(id)) {
    return NextResponse.json({ ok: false, error: "Geçersiz sipariş kimliği." }, { status: 400 });
  }

  let body: { contentFormStatus?: unknown; projectStatus?: unknown };
  try {
    body = (await request.json()) as { contentFormStatus?: unknown; projectStatus?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: "Geçersiz istek." }, { status: 400 });
  }

  const update: Record<string, string> = {};
  if (body.contentFormStatus !== undefined) {
    const contentFormStatus = typeof body.contentFormStatus === "string" ? body.contentFormStatus : "";
    if (!CONTENT_FORM_STATUSES.has(contentFormStatus)) {
      return NextResponse.json({ ok: false, error: "Geçersiz durum." }, { status: 400 });
    }
    update.content_form_status = contentFormStatus;
  }
  if (body.projectStatus !== undefined) {
    const projectStatus = typeof body.projectStatus === "string" ? body.projectStatus : "";
    if (!PROJECT_STATUS_SET.has(projectStatus)) {
      return NextResponse.json({ ok: false, error: "Geçersiz proje durumu." }, { status: 400 });
    }
    update.project_status = projectStatus;
  }
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ ok: false, error: "Güncellenecek alan yok." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "Veritabanı yapılandırılmamış." }, { status: 503 });
  }

  const { error } = await supabase.from("orders").update(update).eq("id", id);
  if (error) {
    return NextResponse.json({ ok: false, error: "Güncellenemedi." }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
