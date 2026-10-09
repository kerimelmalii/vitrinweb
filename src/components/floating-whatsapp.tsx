import { Icon } from "@/components/icons";
import { PHONE_DIGITS, WHATSAPP_URL } from "@/data/company";

export function FloatingWhatsApp() {
  if (!PHONE_DIGITS) return null;
  return (
    <a className="wa-float" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp'tan bize yazın (yeni sekmede açılır)">
      <Icon n="whatsapp" size={28} />
    </a>
  );
}
