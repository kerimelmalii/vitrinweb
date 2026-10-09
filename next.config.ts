import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // HTTP güvenlik başlıkları tek kaynak olarak vercel.json içinde tutulur.
  // Aynı CSP'yi burada da üretmek tarayıcıda iki ayrı politikanın birlikte
  // uygulanmasına ve iyzico izinlerinin eski politika tarafından engellenmesine yol açar.

  // Vitrin artık Vercel üzerinde Next.js API route'ları kullandığı için
  // statik export kullanılmaz. /api/orders ve /api/payments sunucuda çalışır.
  // next/image optimizasyonu (otomatik boyutlandırma + WebP/AVIF) artık devrede:
  // "unoptimized: true" statik export/GitHub Pages döneminden kalma bir kısıtlamaydı
  // (o dönem optimizasyon için sunucu yoktu), Vercel'de buna gerek yok ve ek kurulum
  // istemiyor — Vercel'in kendi altyapısı /_next/image üzerinden aynı origin'den sunuyor.

  // iyzipay çalışma anında kendi resource dosyalarını dinamik require ile yükler.
  // Next.js'in bu paketi server bundle'ına dahil etmesi resource çözümlemesini bozar;
  // Node.js runtime'ında doğrudan node_modules üzerinden çalıştırılır.
  serverExternalPackages: ["iyzipay"],

  // iyzipay external çalıştığı için Vercel dosya izleyicisi SDK'nın dinamik
  // require zincirini otomatik takip edemiyor. Yalnızca iyzipay klasörünü değil,
  // lockfile'daki çalışma zamanı bağımlılık ağını da function çıktısına dahil ederiz.
  // Böylece postman-request ve onun bağımlılıkları runtime'da eksik kalmaz.
  outputFileTracingIncludes: {
    "/api/**/*": [
      "./node_modules/@postman/form-data/**/*",
      "./node_modules/@postman/tough-cookie/**/*",
      "./node_modules/@postman/tunnel-agent/**/*",
      "./node_modules/agent-base/**/*",
      "./node_modules/asn1/**/*",
      "./node_modules/assert-plus/**/*",
      "./node_modules/asynckit/**/*",
      "./node_modules/aws-sign2/**/*",
      "./node_modules/aws4/**/*",
      "./node_modules/bcrypt-pbkdf/**/*",
      "./node_modules/bluebird/**/*",
      "./node_modules/call-bind-apply-helpers/**/*",
      "./node_modules/call-bound/**/*",
      "./node_modules/caseless/**/*",
      "./node_modules/combined-stream/**/*",
      "./node_modules/core-util-is/**/*",
      "./node_modules/dashdash/**/*",
      "./node_modules/debug/**/*",
      "./node_modules/delayed-stream/**/*",
      "./node_modules/dunder-proto/**/*",
      "./node_modules/ecc-jsbn/**/*",
      "./node_modules/es-define-property/**/*",
      "./node_modules/es-errors/**/*",
      "./node_modules/es-object-atoms/**/*",
      "./node_modules/extend/**/*",
      "./node_modules/extsprintf/**/*",
      "./node_modules/forever-agent/**/*",
      "./node_modules/function-bind/**/*",
      "./node_modules/get-intrinsic/**/*",
      "./node_modules/get-proto/**/*",
      "./node_modules/getpass/**/*",
      "./node_modules/gopd/**/*",
      "./node_modules/has-symbols/**/*",
      "./node_modules/hasown/**/*",
      "./node_modules/http-signature/**/*",
      "./node_modules/ip-address/**/*",
      "./node_modules/is-typedarray/**/*",
      "./node_modules/isstream/**/*",
      "./node_modules/iyzipay/**/*",
      "./node_modules/jsbn/**/*",
      "./node_modules/json-schema/**/*",
      "./node_modules/json-stringify-safe/**/*",
      "./node_modules/jsprim/**/*",
      "./node_modules/math-intrinsics/**/*",
      "./node_modules/mime-db/**/*",
      "./node_modules/mime-types/**/*",
      "./node_modules/ms/**/*",
      "./node_modules/oauth-sign/**/*",
      "./node_modules/object-inspect/**/*",
      "./node_modules/postman-request/**/*",
      "./node_modules/psl/**/*",
      "./node_modules/punycode/**/*",
      "./node_modules/qs/**/*",
      "./node_modules/querystringify/**/*",
      "./node_modules/requires-port/**/*",
      "./node_modules/safe-buffer/**/*",
      "./node_modules/safer-buffer/**/*",
      "./node_modules/side-channel/**/*",
      "./node_modules/side-channel-list/**/*",
      "./node_modules/side-channel-map/**/*",
      "./node_modules/side-channel-weakmap/**/*",
      "./node_modules/smart-buffer/**/*",
      "./node_modules/socks/**/*",
      "./node_modules/socks-proxy-agent/**/*",
      "./node_modules/sshpk/**/*",
      "./node_modules/stream-length/**/*",
      "./node_modules/tweetnacl/**/*",
      "./node_modules/universalify/**/*",
      "./node_modules/url-parse/**/*",
      "./node_modules/uuid/**/*",
      "./node_modules/verror/**/*",
    ],
  },

  env: {
    NEXT_PUBLIC_BASE_PATH: "",
  },
};

export default nextConfig;
