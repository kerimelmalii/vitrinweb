import { ImageResponse } from "next/og";
import { BLOG } from "@/data/blog";
import { OG_COLORS, OG_SIZE, loadOgFonts } from "@/lib/og-image";

export const alt = "Vitrinweb blog";
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return BLOG.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG.find((p) => p.slug === slug);
  const fonts = await loadOgFonts();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: OG_COLORS.bg,
          fontFamily: "Manrope",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 42, fontWeight: 800, color: OG_COLORS.ink }}>
          vitrin<span style={{ color: OG_COLORS.accent }}>web</span>
          <span
            style={{
              display: "flex",
              width: 10,
              height: 10,
              marginLeft: 5,
              marginTop: 28,
              borderRadius: 999,
              background: OG_COLORS.ink,
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 22, fontWeight: 700, color: OG_COLORS.accent, textTransform: "uppercase", letterSpacing: 2 }}>
            Blog
          </div>
          <div style={{ display: "flex", fontSize: 54, fontWeight: 800, color: OG_COLORS.ink, lineHeight: 1.2 }}>
            {post?.title ?? "Vitrinweb"}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts }
  );
}
