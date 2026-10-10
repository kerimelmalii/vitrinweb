import type { MetadataRoute } from "next";
import { COMPANY } from "@/data/company";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY.brand,
    short_name: COMPANY.brand,
    description: "İşletmenizin dijital vitrini. Modern, hızlı ve mobil uyumlu web sitesi.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#FFFFFF",
    icons: [{ src: "/logo.png", sizes: "512x512", type: "image/png" }],
  };
}
