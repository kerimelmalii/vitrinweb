import { ImageResponse } from "next/og";
import { BASE_PRICE, money } from "@/lib/config";
import { OG_COLORS, OG_SIZE, loadOgFonts } from "@/lib/og-image";

export const alt = "Vitrinweb";
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function Image() {
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
        <div style={{ display: "flex", alignItems: "center", fontSize: 52, fontWeight: 800, color: OG_COLORS.ink }}>
          vitrin<span style={{ color: OG_COLORS.accent }}>web</span>
          <span
            style={{
              display: "flex",
              width: 12,
              height: 12,
              marginLeft: 6,
              marginTop: 34,
              borderRadius: 999,
              background: OG_COLORS.ink,
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 800, color: OG_COLORS.ink, lineHeight: 1.15 }}>
            {money(BASE_PRICE)} TL&apos;ye profesyonel web sitesi
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: OG_COLORS.mute }}>
            İlk yıl servis ve bakım ücretsiz · Taahhüt yok
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts }
  );
}
