import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vitrin artık Vercel üzerinde Next.js API route'ları kullandığı için
  // statik export kullanılmaz. /api/orders ve /api/payments sunucuda çalışır.
  images: {
    unoptimized: true,
  },

  // iyzipay çalışma anında kendi resource dosyalarını dinamik require ile yükler.
  // Next.js'in bu paketi server bundle'ına dahil etmesi resource çözümlemesini bozar;
  // Node.js runtime'ında doğrudan node_modules üzerinden çalıştırılır.
  serverExternalPackages: ["iyzipay"],

  // iyzipay bazı resource modüllerini çalışma anında dinamik require ile açar.
  // Vercel/Next.js dosya izleme bu dinamik bağımlılıkların tamamını otomatik
  // keşfedemediği için SDK dosyalarını API function çıktısına açıkça dahil ederiz.
  // Bu ayar Preview runtime'ında görülen "Cannot find module ../IyzipayResource"
  // hatasını önlemek içindir; SDK yine Node.js tarafında external olarak çalışır.
  outputFileTracingIncludes: {
    "/api/**/*": ["./node_modules/iyzipay/**/*"],
  },

  env: {
    NEXT_PUBLIC_BASE_PATH: "",
  },
};

export default nextConfig;
