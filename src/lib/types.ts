export interface OrderInfo {
  name: string;
  brand: string;
  phone: string;
  email: string;
  sector: string;
  site: string;
  instagram: string;
  whatsapp: string;
  wishes: string;
}

export type InvoiceType = "bireysel" | "kurumsal";

export interface Invoice {
  type: InvoiceType;
  title: string;
  taxId: string;
  taxOffice: string;
  address: string;
  city: string;
}

export interface Consents {
  kvkk: boolean;
  distance: boolean;
  terms: boolean;
  marketing: boolean;
  at: string;
}

export interface ContentFileMeta {
  name: string;
  size: number;
}

export interface ContentFormFiles {
  logo: ContentFileMeta[];
  business: ContentFileMeta[];
  product: ContentFileMeta[];
  team: ContentFileMeta[];
}

export interface ContentForm {
  brand: string;
  slogan: string;
  colors: string[];
  about: string;
  services: string;
  products: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  style: string;
  ref: string;
  files: ContentFormFiles;
  serviceStartConsentAt?: string;
}

export type PaymentStatus =
  | "pending"
  | "payment_started"
  | "paid"
  | "cancelled"
  | "refunded"
  | null;

export const PROJECT_STATUSES = [
  "Yeni Sipariş",
  "Bilgiler Bekleniyor",
  "Tasarım",
  "Geliştirme",
  "Revizyon",
  "Yayına Hazır",
  "Yayında",
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number] | null;

export interface Order {
  info: OrderInfo;
  addons: string[];
  quotes: string[];
  customRequest: string;
  step: 1 | 2 | 3 | 4;
  id: string | null;
  orderNo: string | null;
  accessToken: string | null;
  status: PaymentStatus;
  project: ProjectStatus;
  createdAt: string | null;
  invoice: Invoice;
  consents: Consents | null;
  content: ContentForm | null;
  paymentRef: string | null;
}

export interface AddonRecord {
  id: string;
  name: string;
  price: number;
}

export interface QuoteRequestRecord {
  id: string;
  name: string;
  note?: string;
}

/** Sunucuya kaydedilecek sipariş kaydı biçimi (bkz. DEVIR-BELGESI.md bölüm 8). */
export interface OrderRecord {
  id: string;
  orderNo: string;
  accessToken: string | null;
  pricingVersion: string;
  customer: { name: string; email: string; phone: string };
  business: {
    brand: string;
    sector: string;
    site: string;
    instagram: string;
    whatsapp: string;
    wishes: string;
  };
  package: "temel";
  addons: AddonRecord[];
  quoteRequests: QuoteRequestRecord[];
  total: number;
  firstYearService: number;
  yearlyService: number;
  invoice: Invoice;
  consents: Consents | null;
  paymentStatus: PaymentStatus;
  paymentRef: string | null;
  projectStatus: ProjectStatus;
  createdAt: string | null;
  contentForm: ContentForm | null;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
  d: string;
}

export interface QuoteAddon {
  id: string;
  name: string;
  d: string;
  custom?: boolean;
}

export interface IncludedFeature {
  icon: string;
  t: string;
  d: string;
}

export interface WhyItem {
  icon: string;
  t: string;
  d: string;
}

export interface ProcessStep {
  n: string;
  t: string;
  d: string;
}

export interface Faq {
  q: string;
  a: string;
  cat: string;
}

export interface MockData {
  variant: "split" | "center" | "full" | "grid";
  name: string;
  nav: string[];
  tag: string;
  h: string;
  p: string;
  cta: string;
  cta2: string;
  cards: string[];
  tiles?: [string, string][];
  bg: string;
  ink: string;
  ac: string;
  acink: string;
  card: string;
  g: [string, string, string];
  r: string;
  font: string;
  hfont?: string;
}

export interface HeroDemo {
  id: string;
  cat: string;
  desc: string;
  url: string;
  tags: string[];
  sector: string;
  addon: string;
  feat: string[];
  m: MockData;
}

export interface Reference {
  name: string;
  business: string;
  text: string;
}

export type LegalBlock =
  | ["h", string]
  | ["p", string]
  | ["ul", string[]]
  | ["order"];

export interface LegalDoc {
  t: string;
  b: () => LegalBlock[];
}

export type BlogBlock =
  | ["p", string]
  | ["h2", string]
  | ["ul", string[]]
  | ["ol", string[]];

export interface BlogPost {
  slug: string;
  cover: "browser" | "map" | "search";
  date: string;
  title: string;
  excerpt: string;
  body: BlogBlock[];
}

export interface NavItem {
  label: string;
  to?: string;
  sec?: string;
}
