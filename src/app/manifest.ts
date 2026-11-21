import type { MetadataRoute } from "next";
import { COMPANY } from "@/data/company";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY.brand,
    short_name: COMPANY.brand,
    description: "İşletmeler için kurumsal web sitesi, dijital ürünler ve özel yazılım çözümleri.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#FFFFFF",
    icons: [{ src: "/logo.png", sizes: "512x512", type: "image/png" }],
  };
}
