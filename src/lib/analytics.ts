/** Google Analytics 4 (GA4) isteğe bağlıdır. Ortam değişkeni tanımlı değilse
    (henüz kurulum yapılmadıysa) hem çerez onay şeridi hem de GA4 betiği hiç
    görünmez/yüklenmez — bkz. ANALYTICS-KURULUMU.md. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

export const COOKIE_CONSENT_KEY = "vitrin:cookie-consent";
export type CookieConsent = "accepted" | "rejected";
