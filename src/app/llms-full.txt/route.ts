import { CUSTOM_FAQS, CUSTOM_STEPS, CUSTOM_WORK_TYPES, HOME_FAQS, PRINCIPLES, WHAT_IS, WORK_STEPS } from "@/data/agency";
import { COMPANY, INSTAGRAM_URL, PHONE_DIGITS } from "@/data/company";
import { PRODUCTS } from "@/data/products";
import { SECTORS } from "@/data/sectors";
import { SERVICES } from "@/data/services";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/* llms.txt'in uzun hâli: yapay zekâ asistanlarının Vitrinweb'i tek istekte, sayfa sayfa gezmeden
   doğru anlatabilmesi için ürün, hizmet, sektör ve süreç metinlerinin tamamı. Veri dosyalarından
   üretilir; sitedeki metin değişince bu dosya da kendiliğinden güncellenir. */
function build(): string {
  const L: string[] = [];
  const qa = (items: { q: string; a: string }[]) => items.forEach((f) => L.push(`**${f.q}** ${f.a}`, ""));

  L.push("# Vitrinweb", "", `> ${WHAT_IS}`, "", `Site: ${SITE_URL}`, "");
  L.push("## Şirket", "");
  L.push(`- Marka: ${COMPANY.brand}`, `- Ticaret unvanı: ${COMPANY.title}`, `- Adres: ${COMPANY.address}`, `- E-posta: ${COMPANY.email}`);
  if (PHONE_DIGITS) L.push(`- Telefon ve WhatsApp: ${COMPANY.phone}`);
  L.push(`- Instagram: ${INSTAGRAM_URL}`, "");
  L.push("Bilgi almak için: " + `${SITE_URL}/bilgi-al` + " · Keşif görüşmesi: " + `${SITE_URL}/kesif-gorusmesi`, "");

  L.push("## Çalışma ilkeleri", "");
  PRINCIPLES.forEach((p) => L.push(`- **${p.t}** ${p.d}`));
  L.push("", "## Çalışma süreci", "");
  WORK_STEPS.forEach((s, i) => L.push(`${i + 1}. **${s.t}** ${s.d}`));
  L.push("");

  L.push("## Ürünler", "");
  for (const p of PRODUCTS) {
    L.push(`### ${p.name}`, "", `Adres: ${SITE_URL}/urunler/${p.slug}`, "", p.title, "", p.lead, "");
    L.push(`**${p.stepsTitle}**`, "");
    p.steps.forEach((s, i) => L.push(`${i + 1}. ${s.t} ${s.d}`));
    L.push("");
    if (p.features) {
      L.push(`**${p.features.title}**`, "");
      p.features.items.forEach((f) => L.push(`- ${f.t}: ${f.d}`));
      L.push("");
    }
    if (p.chips) {
      L.push(`**${p.chips.title}**`, "");
      if (p.chips.intro) L.push(p.chips.intro, "");
      p.chips.items.forEach((c) => L.push(`- ${c}`));
      L.push("");
    }
    L.push(`**Kimler için?** ${p.forWho}`, "", `**${p.setup.title}.** ${p.setup.text}`, "", "**Sık sorulan sorular**", "");
    qa(p.faqs);
  }

  L.push("## İşletmeye özel çözümler", "", `Adres: ${SITE_URL}/isletmeye-ozel`, "");
  CUSTOM_WORK_TYPES.forEach((w) => L.push(`- **${w.t}:** ${w.d}`));
  L.push("");
  CUSTOM_STEPS.forEach((s, i) => L.push(`${i + 1}. ${s.t} ${s.d}`));
  L.push("");
  qa(CUSTOM_FAQS);

  L.push("## Tamamlayıcı hizmetler", "");
  for (const s of SERVICES) {
    L.push(`### ${s.name}`, "", `Adres: ${SITE_URL}/hizmetler/${s.slug}`, "", s.title, "", s.text, "", "Kapsam: " + s.scope.join(", ") + ".", "");
    if (s.faq) qa([s.faq]);
  }

  L.push("## Sektörler", "");
  for (const s of SECTORS) {
    L.push(`### ${s.name}`, "", `Adres: ${SITE_URL}/sektorler/${s.slug}`, "", s.title, "", s.text, "");
    L.push("İlk adımlar: " + s.steps.join(" ") + "", "", "Önerilen çözümler: " + s.links.map((l) => l.label).join(", ") + ".", "");
  }

  L.push("## Girişim Destek Programı", "", `Adres: ${SITE_URL}/girisim-programi`, "");
  L.push(
    "Vitrinweb, seçtiği yeni girişimlere profesyonel web sitesi, 12 ay bakım ve SEO desteği sunar. Karşılığında nakit değil, 12 ay boyunca kademeli hak edilen toplam %2 pay alır: teslimde %0,5, 3. ayda %0,875, 6. ayda %1,25, 9. ayda %1,625, 12. ayda %2. Program erken biterse yalnızca hak edilmiş pay geçerli olur; tüm detaylar sözleşmede yer alır. E-ticaret altyapısı programa dahil değildir.",
    "",
  );

  L.push("## Sık sorulan sorular", "");
  qa(HOME_FAQS);
  return L.join("\n");
}

export function GET() {
  return new Response(build(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
