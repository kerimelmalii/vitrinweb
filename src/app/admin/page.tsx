import Link from "next/link";
import { AdminLogoutButton, AdminStatusSelect } from "@/components/admin/controls";
import { AdminTabs } from "@/components/admin/tabs";
import { Icon } from "@/components/icons";
import { adminDateFmt } from "@/lib/format";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

interface ContactMessageRow {
  id: string;
  kind: string;
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

const KIND_LABELS: Record<string, string> = {
  bilgi: "Bilgi Talebi",
  kesif: "Keşif Görüşmesi",
  proje: "Proje Başlangıcı",
  iptal: "İptal ve İade",
  ileti: "İleti Tercihi",
  iletisim: "İletişim",
  girisim: "Girişim Programı",
};
const KINDS = Object.keys(KIND_LABELS);
/* Eski tablo kısıtı nedeniyle "iletisim" olarak kaydedilip gerçek türü alanlarda taşıyan satırlar. */
const rowKind = (r: ContactMessageRow) => (r.kind === "iletisim" && r.fields?.tur && KIND_LABELS[r.fields.tur] ? r.fields.tur : r.kind);
const FIELD_LABELS: Record<string, string> = {
  contact: "E-posta / Telefon",
  business: "İşletme",
  sector: "Sektör",
  product: "İlgilendiği ürün",
  meeting: "Keşif görüşmesi",
  addons: "Ek özellikler",
  service: "Hizmet",
  page: "Gönderildiği sayfa",
  project: "Proje numarası",
  person: "İletişim kişisi",
  address: "Adres",
  hours: "Çalışma saatleri",
  publish: "Sitede yayınlanacaklar",
  about: "İşletme tanıtımı",
  services: "Hizmetler",
  social: "Sosyal medya",
  missing: "Hazır olmayan içerikler",
  domain: "Alan adı",
  refs: "Örnek siteler",
  style: "Renk ve görsel tercih",
  cta: "Öncelikli çağrı",
  files: "Dosyalar",
  order: "Sipariş / proje no",
  action: "Talep",
  channels: "Kanallar",
  tur: "Form türü",
  subject: "Konu",
  message: "Mesaj",
  founderName: "Kurucu",
  companyName: "Girişim / Şirket",
  phone: "Telefon",
  city: "Şehir",
  status: "Kuruluş durumu",
  description: "Açıklama",
};

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
    if (kind && KINDS.includes(kind)) query = query.eq("kind", kind);
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

      <AdminTabs active="mesajlar" />

      <div className="admin-filters">
        <span className="fine" style={{ marginRight: "4px" }}>
          Tür:
        </span>
        <Link className={`admin-filter${!kind ? " active" : ""}`} href={filterHref({ kind: undefined })}>
          Tümü
        </Link>
        {KINDS.map((k) => (
          <Link key={k} className={`admin-filter${kind === k ? " active" : ""}`} href={filterHref({ kind: k })}>
            {KIND_LABELS[k]}
          </Link>
        ))}
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
              <span className={`admin-badge admin-badge-${rowKind(row)}`}>{KIND_LABELS[rowKind(row)] || row.kind}</span>
              <span className="admin-row-name">{row.name}</span>
              <span className="admin-row-summary">{row.summary}</span>
              {row.file_name && (
                <span className="admin-row-file" title={row.file_name}>
                  <Icon n="file" size={15} />
                </span>
              )}
              <span className="fine admin-row-date">{adminDateFmt.format(new Date(row.created_at))}</span>
              <AdminStatusSelect id={row.id} status={row.admin_status} />
              <Icon n="chev" size={16} className="admin-row-chev" />
            </summary>
            <div className="admin-row-body">
              {row.email && (
                <p className="fine">
                  <strong>E-posta:</strong> <a href={`mailto:${row.email}`}>{row.email}</a>
                </p>
              )}
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
                  Ek dosya: {row.file_name}
                  {row.file_type ? ` (${row.file_type})` : ""} — e-posta bildirimine eklendi.
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
