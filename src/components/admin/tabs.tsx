import Link from "next/link";

export function AdminTabs({ active }: { active: "mesajlar" | "siparisler" }) {
  return (
    <div className="admin-tabs">
      <Link className={`admin-tab${active === "mesajlar" ? " active" : ""}`} href="/admin">
        Form Mesajları
      </Link>
      <Link className={`admin-tab${active === "siparisler" ? " active" : ""}`} href="/admin/siparisler">
        Müşteri Formları
      </Link>
    </div>
  );
}
