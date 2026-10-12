import Link from "next/link";
import { AdminLogoutButton, AdminProjectStatusSelect, PAYMENT_STATUS_LABELS } from "@/components/admin/controls";
import { AdminTabs } from "@/components/admin/tabs";
import { Icon } from "@/components/icons";
import { TL } from "@/lib/config";
import { adminDateFmt } from "@/lib/format";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { AddonRecord, Invoice, PaymentStatus, QuoteRequestRecord } from "@/lib/types";

export const dynamic = "force-dynamic";

interface AllOrderRow {
  id: string;
  order_no: string;
  customer: { name: string; email: string; phone: string };
  business: { brand: string; sector: string };
  addons: AddonRecord[] | null;
  quote_requests: QuoteRequestRecord[] | null;
  total: number;
  invoice: Invoice | null;
  payment_status: PaymentStatus;
  payment_ref: string | null;
  project_status: string | null;
  content_form_status: "yeni" | "incelendi" | "tamamlandi" | null;
  created_at: string | null;
}

const PAYMENT_FILTERS: [string, string][] = [
  ["pending", "Beklemede"],
  ["payment_started", "Ödeme Başlatıldı"],
  ["paid", "Ödendi"],
  ["cancelled", "İptal Edildi"],
  ["refunded", "İade Edildi"],
];

interface PageProps {
  searchParams: Promise<{ payment?: string }>;
}

export default async function AdminAllOrdersPage({ searchParams }: PageProps) {
  const { payment } = await searchParams;

  const supabase = getSupabaseAdmin();
  let rows: AllOrderRow[] = [];
  let loadError = false;

  if (!supabase) {
    loadError = true;
  } else {
    let query = supabase
      .from("orders")
      .select(
        "id, order_no, customer, business, addons, quote_requests, total, invoice, payment_status, payment_ref, project_status, content_form_status, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(200);
    if (payment && PAYMENT_FILTERS.some(([v]) => v === payment)) {
      query = query.eq("payment_status", payment);
    }
    const { data, error } = await query;
    if (error) loadError = true;
    else rows = (data || []) as AllOrderRow[];
  }

  const filterHref = (next?: string) => (next ? `/admin/tum-siparisler?payment=${next}` : "/admin/tum-siparisler");

  return (
    <main className="admin-shell">
      <div className="admin-bar">
        <h1 className="h-3">Tüm Siparişler</h1>
        <AdminLogoutButton />
      </div>

      <AdminTabs active="tumsiparisler" />

      <div className="admin-filters">
        <span className="fine" style={{ marginRight: "4px" }}>
          Ödeme durumu:
        </span>
        <Link className={`admin-filter${!payment ? " active" : ""}`} href={filterHref()}>
          Tümü
        </Link>
        {PAYMENT_FILTERS.map(([v, label]) => (
          <Link key={v} className={`admin-filter${payment === v ? " active" : ""}`} href={filterHref(v)}>
            {label}
          </Link>
        ))}
      </div>

      {loadError && (
        <div className="panel">
          <p className="err" role="alert">
            Siparişler yüklenemedi. Supabase yapılandırmasını kontrol edin.
          </p>
        </div>
      )}

      {!loadError && rows.length === 0 && (
        <div className="panel admin-empty">
          <p className="mute">Bu filtreyle eşleşen sipariş yok.</p>
        </div>
      )}

      <div className="admin-list">
        {rows.map((row) => (
          <details key={row.id} className="admin-row">
            <summary>
              <span className="admin-badge">#{row.order_no}</span>
              <span className={`admin-pay-badge admin-pay-${row.payment_status || "pending"}`}>
                {PAYMENT_STATUS_LABELS[row.payment_status || "pending"] || row.payment_status}
              </span>
              <span className="admin-row-name">{row.business?.brand || row.customer?.name}</span>
              <span className="admin-row-summary">{TL(row.total)}</span>
              <span className="fine admin-row-date">
                {row.created_at ? adminDateFmt.format(new Date(row.created_at)) : ""}
              </span>
              {row.payment_status === "paid" && (
                <AdminProjectStatusSelect id={row.id} status={row.project_status || "Yeni Sipariş"} />
              )}
              <Icon n="chev" size={16} className="admin-row-chev" />
            </summary>
            <div className="admin-row-body">
              <p className="fine">
                <strong>Müşteri:</strong> {row.customer?.name} —{" "}
                <a href={`mailto:${row.customer?.email}`}>{row.customer?.email}</a> — {row.customer?.phone}
              </p>
              <p className="fine" style={{ marginTop: "6px" }}>
                <strong>Sektör:</strong> {row.business?.sector}
              </p>
              {row.addons && row.addons.length > 0 && (
                <p style={{ marginTop: "10px" }}>
                  <strong>Ek özellikler:</strong> {row.addons.map((a) => a.name).join(", ")}
                </p>
              )}
              {row.quote_requests && row.quote_requests.length > 0 && (
                <p style={{ marginTop: "10px" }}>
                  <strong>Teklif talepleri:</strong> {row.quote_requests.map((q) => q.name).join(", ")}
                </p>
              )}
              {row.invoice && (
                <p style={{ marginTop: "10px" }}>
                  <strong>Fatura:</strong> {row.invoice.title} — {row.invoice.city}
                  {row.invoice.address ? `, ${row.invoice.address}` : ""}
                </p>
              )}
              {row.payment_ref && (
                <p className="fine" style={{ marginTop: "10px" }}>
                  <strong>Ödeme referansı:</strong> {row.payment_ref}
                </p>
              )}
              {row.payment_status === "paid" ? (
                <p className="fine" style={{ marginTop: "10px" }}>
                  İçerik formu durumu:{" "}
                  {{ yeni: "Yeni", incelendi: "İncelendi", tamamlandi: "Tamamlandı" }[row.content_form_status || "yeni"] ||
                    "Henüz doldurulmadı"}
                </p>
              ) : (
                <p className="fine" style={{ marginTop: "10px" }}>
                  Ödeme tamamlanmadığı için henüz bir proje başlamadı.
                </p>
              )}
            </div>
          </details>
        ))}
      </div>
    </main>
  );
}
