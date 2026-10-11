import Link from "next/link";
import { AdminLogoutButton, AdminOrderFormStatusSelect } from "@/components/admin/controls";
import { AdminTabs } from "@/components/admin/tabs";
import { Icon } from "@/components/icons";
import { ADDONS } from "@/data/content";
import { TL } from "@/lib/config";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { ContentForm } from "@/lib/types";

export const dynamic = "force-dynamic";

interface OrderRow {
  id: string;
  order_no: string;
  customer: { name: string; email: string; phone: string };
  business: { brand: string; sector: string };
  total: number;
  payment_status: string | null;
  content_form: ContentForm | null;
  content_form_status: "yeni" | "incelendi" | "tamamlandi" | null;
  received_at: string | null;
}

const ADDON_NAMES: Record<string, string> = Object.fromEntries(ADDONS.map((a) => [a.id, a.name]));
const dateFmt = new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" });

function Line({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <p style={{ marginTop: "10px" }}>
      <strong>{label}:</strong>
      <br />
      {value}
    </p>
  );
}

function Flag({ label, on }: { label: string; on?: boolean }) {
  if (!on) return null;
  return (
    <p className="fine" style={{ marginTop: "6px" }}>
      <Icon n="check" size={13} /> {label}
    </p>
  );
}

function FileListLine({ label, files }: { label: string; files?: { name: string; size: number }[] }) {
  if (!files || files.length === 0) return null;
  return (
    <p style={{ marginTop: "10px" }}>
      <strong>{label}:</strong> {files.map((f) => f.name).join(", ")}
    </p>
  );
}

function ContentFormDetail({ content }: { content: ContentForm }) {
  const b = content.brief;
  return (
    <>
      <h3 className="admin-group-h">İşletmeniz</h3>
      <Line label="Marka adı" value={content.brand} />
      <Line label="Şahıs adı veya şirket unvanı" value={b?.legalName} />
      <Line label="Sektör" value={b?.sector} />
      <Line label="Hizmet bölgesi" value={b?.area} />
      <Line label="Kaç yıldır hizmet veriyor" value={b?.since} />
      <Line label="Slogan" value={content.slogan} />

      <h3 className="admin-group-h">İletişim</h3>
      <Line label="Telefon" value={content.phone} />
      <Line label="WhatsApp" value={b?.whatsapp} />
      <Line label="E-posta" value={content.email} />
      <Line label="Adres" value={content.address} />
      <Flag label="Adres sitede gizlensin" on={b?.hideAddress} />
      <Line label="Google Haritalar / İşletme Profili" value={b?.mapsUrl} />
      <Line label="Çalışma saatleri" value={content.hours} />
      <Line label="Sosyal medya" value={b?.social} />

      <h3 className="admin-group-h">Hedef</h3>
      <Line label="Ziyaretçi en çok ne yapsın" value={b?.mainAction} />
      <Line label="Müşteriler kimler" value={b?.audience} />
      <Line label="En önemli 3 hizmet/ürün" value={b?.topServices} />
      <Line label="Rakiplerden fark" value={b?.difference} />
      <Line label="Sık sorulan sorular" value={b?.faqs} />

      <h3 className="admin-group-h">İçerik bilgileri</h3>
      <Line label="Hakkımızda" value={content.about} />
      <Line label="Hizmet / ürün listesi" value={content.services} />
      <Line label="Ürünler" value={content.products} />
      <Line label="Fiyatlar sitede görünsün mü" value={b?.priceDisplay} />
      <Line label="Belge / sertifika / ödül" value={b?.credentials} />
      <Line label="Referanslar" value={b?.references} />
      <Flag label="Google yorumları sitede gösterilsin" on={b?.showReviews} />

      <h3 className="admin-group-h">Görseller</h3>
      <Line label="Logo tercihi" value={b?.logoChoice} />
      <Line label="Fotoğraf tercihi" value={b?.photoChoice} />
      <FileListLine label="Logo dosyası" files={content.files?.logo} />
      <FileListLine label="İşletme fotoğrafları" files={content.files?.business} />
      <FileListLine label="Ürün fotoğrafları" files={content.files?.product} />
      <FileListLine label="Ekip fotoğrafları" files={content.files?.team} />
      {(content.files?.logo?.length || content.files?.business?.length || content.files?.product?.length || content.files?.team?.length) ? null : (
        <p className="fine" style={{ marginTop: "10px" }}>
          Dosyalar bu formdan gönderilmedi — müşteri WhatsApp veya e-postayla gönderecek.
        </p>
      )}

      <h3 className="admin-group-h">Tasarım tercihi</h3>
      <Line label="Stil" value={content.style} />
      {content.colors && content.colors.length > 0 && (
        <p style={{ marginTop: "10px" }}>
          <strong>Marka renkleri:</strong>{" "}
          {content.colors.map((c) => (
            <span key={c} className="admin-swatch" style={{ background: c }} title={c} />
          ))}
        </p>
      )}
      <Line label="Beğenilen bir web sitesi" value={content.ref} />
      <Line label="Rakipler / örnek alınan işletmeler" value={b?.competitors} />
      <Line label="Görmek istemediği renk/stil" value={b?.dislikes} />

      <h3 className="admin-group-h">Alan adı</h3>
      <Line label="Hâlihazırda alan adı var mı" value={b?.hasDomain} />
      <Line label="Alan adı ve kayıtlı firma" value={b?.domainInfo} />
      <Line label="Bu alan adıyla e-posta kullanıyor mu" value={b?.domainEmail} />
      <Line label="İstenen alan adı seçenekleri" value={b?.domainChoices} />
      <Line label="Şu anki web sitesi" value={b?.currentSite} />

      {b?.addonInfo && Object.values(b.addonInfo).some(Boolean) && (
        <>
          <h3 className="admin-group-h">Ek özellikler</h3>
          {Object.entries(b.addonInfo).map(([id, value]) =>
            value ? <Line key={id} label={ADDON_NAMES[id] || id} value={value} /> : null,
          )}
        </>
      )}

      <h3 className="admin-group-h">Onaylar</h3>
      <Flag label="İçerik hakları beyanı onaylandı" on={content.consents?.contentRights} />
      <Flag label="Kişi fotoğrafları izni verildi" on={content.consents?.peoplePhotos} />
      <Flag label="Örnek iş olarak gösterilmesine izin verildi" on={content.consents?.portfolio} />
      <Flag label="Performans verisi paylaşım izni verildi" on={content.consents?.experienceData} />
      {content.serviceStartConsentAt && (
        <p className="fine" style={{ marginTop: "10px" }}>
          Tasarım başlatma onayı: {dateFmt.format(new Date(content.serviceStartConsentAt))}
        </p>
      )}
    </>
  );
}

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminOrdersPage({ searchParams }: PageProps) {
  const { status } = await searchParams;

  const supabase = getSupabaseAdmin();
  let rows: OrderRow[] = [];
  let loadError = false;

  if (!supabase) {
    loadError = true;
  } else {
    let query = supabase
      .from("orders")
      .select("id, order_no, customer, business, total, payment_status, content_form, content_form_status, received_at")
      .not("content_form", "is", null)
      .order("received_at", { ascending: false })
      .limit(200);
    if (status && ["yeni", "incelendi", "tamamlandi"].includes(status)) {
      query = query.eq("content_form_status", status);
    }
    const { data, error } = await query;
    if (error) loadError = true;
    else rows = (data || []) as OrderRow[];
  }

  const filterHref = (next?: string) => (next ? `/admin/siparisler?status=${next}` : "/admin/siparisler");

  return (
    <main className="admin-shell">
      <div className="admin-bar">
        <h1 className="h-3">Müşteri Formları</h1>
        <AdminLogoutButton />
      </div>

      <AdminTabs active="siparisler" />

      <div className="admin-filters">
        <span className="fine" style={{ marginRight: "4px" }}>
          Durum:
        </span>
        <Link className={`admin-filter${!status ? " active" : ""}`} href={filterHref()}>
          Tümü
        </Link>
        {(["yeni", "incelendi", "tamamlandi"] as const).map((s) => (
          <Link key={s} className={`admin-filter${status === s ? " active" : ""}`} href={filterHref(s)}>
            {{ yeni: "Yeni", incelendi: "İncelendi", tamamlandi: "Tamamlandı" }[s]}
          </Link>
        ))}
      </div>

      {loadError && (
        <div className="panel">
          <p className="err" role="alert">
            Sipariş formları yüklenemedi. Supabase yapılandırmasını kontrol edin.
          </p>
        </div>
      )}

      {!loadError && rows.length === 0 && (
        <div className="panel admin-empty">
          <p className="mute">Bu filtreyle eşleşen müşteri formu yok.</p>
        </div>
      )}

      <div className="admin-list">
        {rows.map((row) => (
          <details key={row.id} className="admin-row">
            <summary>
              <span className="admin-badge">#{row.order_no}</span>
              <span className="admin-row-name">{row.business?.brand || row.customer?.name}</span>
              <span className="admin-row-summary">{TL(row.total)}</span>
              <span className="fine admin-row-date">
                {row.received_at ? dateFmt.format(new Date(row.received_at)) : ""}
              </span>
              <AdminOrderFormStatusSelect id={row.id} status={row.content_form_status || "yeni"} />
              <Icon n="chev" size={16} className="admin-row-chev" />
            </summary>
            <div className="admin-row-body">
              <p className="fine">
                <strong>Müşteri:</strong> {row.customer?.name} —{" "}
                <a href={`mailto:${row.customer?.email}`}>{row.customer?.email}</a> — {row.customer?.phone}
              </p>
              {row.content_form && <ContentFormDetail content={row.content_form} />}
            </div>
          </details>
        ))}
      </div>
    </main>
  );
}
