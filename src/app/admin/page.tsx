import Link from "next/link";
import { AdminLogoutButton, AdminStatusSelect } from "@/components/admin/controls";
import { Icon } from "@/components/icons";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

interface ContactMessageRow {
  id: string;
  kind: "iletisim" | "girisim";
  name: string;
  email: string;
  summary: string;
  fields: Record<string, string>;
  file_name: string | null;
  file_type: string | null;
  email_sent: boolean;
  admin_status: "yeni" | "okundu" | "yanitlandi" | "arsivlendi";
  created_at: string;
}

const KIND_LABELS: Record<string, string> = { iletisim: "İletişim", girisim: "Girişim Programı" };
const FIELD_LABELS: Record<string, string> = {
  subject: "Konu",
  message: "Mesaj",
  founderName: "Kurucu",
  companyName: "Girişim / Şirket",
  phone: "Telefon",
  city: "Şehir",
  status: "Kuruluş durumu",
  description: "Açıklama",
};

const dateFmt = new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" });

interface PageProps {
  searchParams: Promise<{ kind?: string; status?: string }>;
}

export default async function AdminPage({ searchParams }: PageProps) {
  const { kind, status } = await searchParams;

  const supabase = getSupabaseAdmin();
  let rows: ContactMessageRow[] = [];
  let loadError = false;

  if (!supabase) {
    loadError = true;
  } else {
    let query = supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (kind === "iletisim" || kind === "girisim") query = query.eq("kind", kind);
    if (status && ["yeni", "okundu", "yanitlandi", "arsivlendi"].includes(status)) {
      query = query.eq("admin_status", status);
    }
    const { data, error } = await query;
    if (error) loadError = true;
    else rows = (data || []) as ContactMessageRow[];
  }

  const filterHref = (next: { kind?: string; status?: string }) => {
    const p = new URLSearchParams();
    const k = next.kind ?? kind;
    const s = next.status ?? status;
    if (k) p.set("kind", k);
    if (s) p.set("status", s);
    const q = p.toString();
    return q ? `/admin?${q}` : "/admin";
  };

  return (
    <main className="admin-shell">
      <div className="admin-bar">
        <h1 className="h-3">Form Mesajları</h1>
        <AdminLogoutButton />
      </div>

      <div className="admin-filters">
        <span className="fine" style={{ marginRight: "4px" }}>
          Tür:
        </span>
        <Link className={`admin-filter${!kind ? " active" : ""}`} href={filterHref({ kind: undefined })}>
          Tümü
        </Link>
        <Link className={`admin-filter${kind === "iletisim" ? " active" : ""}`} href={filterHref({ kind: "iletisim" })}>
          İletişim
        </Link>
        <Link className={`admin-filter${kind === "girisim" ? " active" : ""}`} href={filterHref({ kind: "girisim" })}>
          Girişim Programı
        </Link>
        <span className="fine" style={{ margin: "0 4px 0 14px" }}>
          Durum:
        </span>
        <Link className={`admin-filter${!status ? " active" : ""}`} href={filterHref({ status: undefined })}>
          Tümü
        </Link>
        {(["yeni", "okundu", "yanitlandi", "arsivlendi"] as const).map((s) => (
          <Link key={s} className={`admin-filter${status === s ? " active" : ""}`} href={filterHref({ status: s })}>
            {{ yeni: "Yeni", okundu: "Okundu", yanitlandi: "Yanıtlandı", arsivlendi: "Arşivlendi" }[s]}
          </Link>
        ))}
      </div>

      {loadError && (
        <div className="panel">
          <p className="err" role="alert">
            Mesajlar yüklenemedi. Supabase yapılandırmasını kontrol edin.
          </p>
        </div>
      )}

      {!loadError && rows.length === 0 && (
        <div className="panel admin-empty">
          <p className="mute">Bu filtreyle eşleşen mesaj yok.</p>
        </div>
      )}

      <div className="admin-list">
        {rows.map((row) => (
          <details key={row.id} className="admin-row">
            <summary>
              <span className={`admin-badge admin-badge-${row.kind}`}>{KIND_LABELS[row.kind] || row.kind}</span>
              <span className="admin-row-name">{row.name}</span>
              <span className="admin-row-summary">{row.summary}</span>
              {row.file_name && (
                <span className="admin-row-file" title={row.file_name}>
                  <Icon n="file" size={15} />
                </span>
              )}
              <span className="fine admin-row-date">{dateFmt.format(new Date(row.created_at))}</span>
              <AdminStatusSelect id={row.id} status={row.admin_status} />
              <Icon n="chev" size={16} className="admin-row-chev" />
            </summary>
            <div className="admin-row-body">
              <p className="fine">
                <strong>E-posta:</strong>{" "}
                <a href={`mailto:${row.email}`}>{row.email}</a>
              </p>
              {Object.entries(row.fields || {}).map(([key, value]) =>
                value ? (
                  <p key={key} style={{ marginTop: "10px" }}>
                    <strong>{FIELD_LABELS[key] || key}:</strong>
                    <br />
                    {value}
                  </p>
                ) : null,
              )}
              {row.file_name && (
                <p className="fine" style={{ marginTop: "10px" }}>
                  Ek dosya: {row.file_name} ({row.file_type}) — e-posta bildirimine eklendi.
                </p>
              )}
              <p className="fine" style={{ marginTop: "10px" }}>
                {row.email_sent ? "E-posta bildirimi gönderildi." : "E-posta bildirimi gönderilemedi (yalnızca panelde kayıtlı)."}
              </p>
            </div>
          </details>
        ))}
      </div>
    </main>
  );
}
