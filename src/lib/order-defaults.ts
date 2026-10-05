import type { Invoice, OrderInfo } from "@/lib/types";

export const EMPTY_INFO: OrderInfo = {
  name: "",
  brand: "",
  phone: "",
  email: "",
  sector: "",
  site: "",
  instagram: "",
  whatsapp: "",
  wishes: "",
};

export const EMPTY_INVOICE: Invoice = {
  type: "bireysel",
  title: "",
  taxId: "",
  taxOffice: "",
  address: "",
  city: "",
};

export const DRAFT_TTL = 7 * 24 * 60 * 60 * 1000;
