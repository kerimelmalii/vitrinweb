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

function StatusSelect({
  status,
  labels,
  onChange,
}: {
  status: string;
  labels: Record<string, string>;
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
      className={`admin-status-select admin-status-${status}`}
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
