"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/icons";

/** Açık yönlendirmeyi (open redirect) önlemek için yalnızca /admin altındaki
    bağıl yollara izin verilir — dışarıdan gelen next parametresine güvenilmez. */
function safeNextPath(raw: string | null): string {
  if (raw && /^\/admin(\/[^/].*)?$/.test(raw) && !raw.startsWith("//")) return raw;
  return "/admin";
}

function LoginForm() {
  const router = useRouter();
  const next = safeNextPath(useSearchParams().get("next"));
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!password) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !result?.ok) {
        setError(result?.error || "Giriş yapılamadı.");
        setLoading(false);
        return;
      }
      router.replace(next);
      router.refresh();
    } catch {
      setError("Giriş yapılamadı, bağlantınızı kontrol edin.");
      setLoading(false);
    }
  };

  return (
    <div className="panel admin-login-panel">
      <div className="admin-login-icon">
        <Icon n="lock" size={22} />
      </div>
      <h1 className="h-3">Yönetim Paneli</h1>
      <p className="fine" style={{ marginTop: "6px" }}>
        Devam etmek için şifreyi girin.
      </p>
      <input
        className="input"
        type="password"
        placeholder="Şifre"
        autoFocus
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        style={{ marginTop: "20px" }}
      />
      {error && (
        <p className="err" role="alert" style={{ marginTop: "8px" }}>
          {error}
        </p>
      )}
      <button className="btn btn-primary btn-block" style={{ marginTop: "16px" }} onClick={submit} disabled={loading}>
        {loading ? "Giriş yapılıyor…" : "Giriş Yap"}
      </button>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="admin-login">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
