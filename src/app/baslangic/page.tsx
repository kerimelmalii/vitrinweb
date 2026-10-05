import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ t?: string | string[] }>;
}

/**
 * Eski /baslangic adresini kırmadan yeni, kullanıcı dostu /icerik-formu
 * adresine taşır. Mevcut sipariş erişim token'ı korunur.
 */
export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = typeof params.t === "string" ? params.t : "";
  const target = token
    ? `/icerik-formu?t=${encodeURIComponent(token)}`
    : "/icerik-formu";

  redirect(target);
}
