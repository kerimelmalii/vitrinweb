import { ImageResponse } from "next/og";
import { OG_COLORS, OG_SIZE, loadOgFonts } from "@/lib/og-image";

export const alt = "İşgale Hayır!";
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

const STRIPE = ["#0A0A0A", "#FFFFFF", "#007A3D", "#CE1126"];

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
        <div style={{ display: "flex", alignItems: "center", fontSize: 40, fontWeight: 800, color: OG_COLORS.mute }}>
          vitrin
          <span
            style={{
              display: "flex",
              width: 9,
              height: 9,
              marginLeft: 5,
              marginTop: 26,
              borderRadius: 999,
              background: OG_COLORS.accent,
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 64,
              height: 38,
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 0 0 3px #0F9BE0",
            }}
          >
            {STRIPE.map((c) => (
              <div key={c} style={{ display: "flex", flex: 1, background: c }} />
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 74, fontWeight: 800, color: OG_COLORS.ink, lineHeight: 1.1 }}>
            İşgale Hayır!
          </div>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: OG_COLORS.mute }}>
            Filistin ve Doğu Türkistan için farkındalık
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts }
  );
}
