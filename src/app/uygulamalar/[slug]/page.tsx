import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CasePage } from "@/components/pages";
import { CASES, getCase } from "@/data/cases";
import { pageMeta } from "@/lib/page-meta";

/* Yalnızca cases.ts'teki izinli uygulamalar sayfa olarak üretilir; liste boşken her adres 404 döner. */
export const dynamicParams = false;

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  return c ? pageMeta(`/uygulamalar/${c.slug}`, c.seoTitle, c.description) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();
  return <CasePage c={c} />;
}
