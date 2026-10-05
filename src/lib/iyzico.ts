import "server-only";

const SANDBOX_BASE_URL = "https://sandbox-api.iyzipay.com";
const PRODUCTION_BASE_URL = "https://api.iyzipay.com";

export type IyzicoEnvironment = "sandbox" | "production";

export interface IyzicoServerConfig {
  apiKey: string;
  secretKey: string;
  baseUrl: string;
  environment: IyzicoEnvironment;
}

/**
 * iyzico kimlik bilgileri yalnızca sunucu tarafında okunur.
 *
 * Entegrasyon geliştirilirken varsayılan ortam sandbox'tır.
 * Canlıya geçiş bilinçli olarak IYZICO_ENVIRONMENT=production ile yapılır.
 * NEXT_PUBLIC_* değişkenleri burada kesinlikle kullanılmaz.
 */
export function getIyzicoServerConfig(): IyzicoServerConfig {
  const environment: IyzicoEnvironment =
    process.env.IYZICO_ENVIRONMENT === "production" ? "production" : "sandbox";

  const apiKey =
    environment === "production"
      ? process.env.IYZICO_API_KEY
      : process.env.IYZICO_SANDBOX_API_KEY;

  const secretKey =
    environment === "production"
      ? process.env.IYZICO_SECRET_KEY
      : process.env.IYZICO_SANDBOX_SECRET_KEY;

  if (!apiKey || !secretKey) {
    throw new Error(
      `iyzico ${environment} API anahtarları sunucu ortamında tanımlı değil.`,
    );
  }

  return {
    apiKey,
    secretKey,
    baseUrl:
      environment === "production" ? PRODUCTION_BASE_URL : SANDBOX_BASE_URL,
    environment,
  };
}
