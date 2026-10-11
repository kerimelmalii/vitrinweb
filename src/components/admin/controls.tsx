"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons";

const MESSAGE_STATUS_LABELS: Record<string, string> = {
  yeni: "Yeni",
  okundu: "Okundu",
  yanitlandi: "Yanıtlandı",
  arsivlendi: "Arşivlendi",
};

const ORDER_FORM_STATUS_LABELS: Record<string, string> = {
  yeni: "Yeni",
  incelendi: "İncelendi",
  tamamlandi: "Tamamlandı",
};

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  pending: "Beklemede",
  payment_started: "Ödeme Başlatıldı",
  paid: "Ödendi",
  cancelled: "İptal Edildi",
  refunded: "İade Edildi",
};

export const PROJECT_STATUS_LABELS: [string, string][] = [
  ["Yeni Sipariş", "yenisiparis"],
  ["Bilgiler Bekleniyor", "bilgilerbekleniyor"],
  ["Tasarım", "tasarim"],
  ["Geliştirme", "gelistirme"],
  ["Revizyon", "revizyon"],
  ["Yayına Hazır", "yayinahazir"],
  ["Yayında", "yayinda"],
];
const PROJECT_STATUS_SLUGS: Record<string, string> = Object.fromEntries(PROJECT_STATUS_LABELS.map(([v, s]) => [v, s]));

function StatusSelect({
  status,
  labels,
  slug,
  onChange,
}: {
  status: string;
  labels: Record<string, string>;
  slug?: (s: string) => string;
  onChange: (next: string) => Promise<void>;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const change = async (next: string) => {
    if (next === status) return;
    setSaving(true);
    try {
      await onChange(next);
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <select
      className={`admin-status-select admin-status-${slug ? slug(status) : status}`}
      value={status}
      disabled={saving}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => change(e.target.value)}
    >
      {Object.entries(labels).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

export function AdminStatusSelect({ id, status }: { id: string; status: string }) {
  return (
    <StatusSelect
      status={status}
      labels={MESSAGE_STATUS_LABELS}
      onChange={(next) =>
        fetch(`/api/admin/messages/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ adminStatus: next }),
        }).then(() => undefined)
      }
    />
  );
}

export function AdminOrderFormStatusSelect({ id, status }: { id: string; status: string }) {
  return (
    <StatusSelect
      status={status}
      labels={ORDER_FORM_STATUS_LABELS}
      onChange={(next) =>
        fetch(`/api/admin/orders/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contentFormStatus: next }),
        }).then(() => undefined)
      }
    />
  );
}

export function AdminProjectStatusSelect({ id, status }: { id: string; status: string }) {
  return (
    <StatusSelect
      status={status}
      labels={Object.fromEntries(PROJECT_STATUS_LABELS.map(([v]) => [v, v]))}
      slug={(s) => PROJECT_STATUS_SLUGS[s] || "yenisiparis"}
      onChange={(next) =>
        fetch(`/api/admin/orders/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectStatus: next }),
        }).then(() => undefined)
      }
    />
  );
}

export function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <button className="btn btn-line admin-logout" onClick={logout} disabled={loading}>
      <Icon n="x" size={16} />
      Çıkış Yap
    </button>
  );
}
