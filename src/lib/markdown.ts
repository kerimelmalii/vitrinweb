/* Blog ve içerik sayfaları için küçük, bağımlılıksız bir Markdown alt kümesi.
   Çıktı HTML dizesi değil, React'in güvenle çizdiği bir ağaçtır (dangerouslySetInnerHTML yok).

   Desteklenenler:
   - Bloklar: "## " / "### " başlık, paragraf, "- " ve "1. " liste, "|" tablo, "---" ayraç,
     "![alt](/yol.webp "Altyazı|1600x900")" görsel, "[[cta]]" ara çağrı kutusu,
     "> [!vitrin] Başlık" / "> [!ozet] Başlık" / "> [!not] Başlık" bilgi kutusu (iç satırlar "> " ile).
   - Satır içi: [metin](adres), **kalın**. */

export type Inline =
  | { t: "text"; v: string }
  | { t: "strong"; c: Inline[] }
  | { t: "link"; href: string; c: Inline[] };

export type CalloutKind = "vitrin" | "ozet" | "not";

export type Block =
  | { t: "h2" | "h3"; id: string; text: string; c: Inline[] }
  | { t: "p"; c: Inline[] }
  | { t: "ul" | "ol"; items: Inline[][] }
  | { t: "table"; head: Inline[][]; rows: Inline[][][] }
  | { t: "callout"; kind: CalloutKind; title: string; blocks: Block[] }
  | { t: "img"; src: string; alt: string; caption: string; w: number; h: number }
  | { t: "cta" }
  | { t: "hr" };

const TR_ASCII: Record<string, string> = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u" };

export function slugify(s: string): string {
  return s
    .toLocaleLowerCase("tr")
    .replace(/[çğıöşüâîû]/g, (ch) => TR_ASCII[ch] ?? ch)
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const INLINE_RE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

export function parseInline(src: string): Inline[] {
  const out: Inline[] = [];
  let last = 0;
  for (const m of src.matchAll(INLINE_RE)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ t: "text", v: src.slice(last, i) });
    if (m[1] !== undefined) out.push({ t: "link", href: m[2], c: parseInline(m[1]) });
    else out.push({ t: "strong", c: parseInline(m[3]) });
    last = i + m[0].length;
  }
  if (last < src.length) out.push({ t: "text", v: src.slice(last) });
  return out;
}

export function inlineText(c: Inline[]): string {
  return c.map((x) => (x.t === "text" ? x.v : inlineText(x.c))).join("");
}

const cells = (row: string): string[] =>
  row
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((x) => x.trim());

const IMG_RE = /^!\[([^\]]*)\]\(([^)\s]+)\s+"([^"|]*)\|(\d+)x(\d+)"\)$/;
const CALLOUT_RE = /^\[!(vitrin|ozet|not)\]\s*(.*)$/;

export function parseBlocks(md: string, ids: Set<string> = new Set()): Block[] {
  const lines = md.replace(/\r\n?/g, "\n").split("\n");
  const blocks: Block[] = [];
  let para: string[] = [];
  const flush = () => {
    if (para.length) blocks.push({ t: "p", c: parseInline(para.join(" ")) });
    para = [];
  };
  const uniqueId = (text: string) => {
    const base = slugify(text) || "bolum";
    let id = base;
    for (let n = 2; ids.has(id); n++) id = `${base}-${n}`;
    ids.add(id);
    return id;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimEnd();
    const trimmed = line.trim();
    if (!trimmed) {
      flush();
      continue;
    }
    const h = /^(##|###)\s+(.+)$/.exec(trimmed);
    if (h) {
      flush();
      const c = parseInline(h[2]);
      const text = inlineText(c);
      blocks.push({ t: h[1] === "##" ? "h2" : "h3", id: uniqueId(text), text, c });
      continue;
    }
    if (trimmed === "---") {
      flush();
      blocks.push({ t: "hr" });
      continue;
    }
    if (trimmed === "[[cta]]") {
      flush();
      blocks.push({ t: "cta" });
      continue;
    }
    const img = IMG_RE.exec(trimmed);
    if (img) {
      flush();
      blocks.push({ t: "img", alt: img[1], src: img[2], caption: img[3], w: Number(img[4]), h: Number(img[5]) });
      continue;
    }
    if (trimmed.startsWith(">")) {
      flush();
      const inner: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        inner.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      i--;
      const head = CALLOUT_RE.exec(inner[0] ?? "");
      if (!head) throw new Error(`Tanınmayan alıntı/kutu: "${inner[0]}" — "> [!vitrin] Başlık" biçimi kullanın.`);
      blocks.push({
        t: "callout",
        kind: head[1] as CalloutKind,
        title: head[2],
        blocks: parseBlocks(inner.slice(1).join("\n"), ids),
      });
      continue;
    }
    if (/^- /.test(trimmed) || /^\d+\. /.test(trimmed)) {
      flush();
      const ordered = /^\d+\. /.test(trimmed);
      const re = ordered ? /^\d+\.\s+/ : /^-\s+/;
      const items: Inline[][] = [];
      while (i < lines.length && re.test(lines[i].trim())) {
        items.push(parseInline(lines[i].trim().replace(re, "")));
        i++;
      }
      i--;
      blocks.push({ t: ordered ? "ol" : "ul", items });
      continue;
    }
    if (trimmed.startsWith("|")) {
      flush();
      const rows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(lines[i].trim());
        i++;
      }
      i--;
      if (rows.length < 2 || !/^\|?\s*:?-{3,}/.test(rows[1])) throw new Error(`Tablonun ikinci satırı ayraç olmalı: "${rows[0]}"`);
      blocks.push({
        t: "table",
        head: cells(rows[0]).map(parseInline),
        rows: rows.slice(2).map((r) => cells(r).map(parseInline)),
      });
      continue;
    }
    para.push(trimmed);
  }
  flush();
  return blocks;
}

/** "---" ile ayrılmış basit "anahtar: değer" ön bilgisi. */
export function parseFrontMatter(src: string): { data: Record<string, string>; body: string } {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(src.replace(/\r\n?/g, "\n"));
  if (!m) throw new Error("Ön bilgi (---) bulunamadı.");
  const data: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    if (!line.trim()) continue;
    const kv = /^([A-Za-z][\w]*):\s*(.*)$/.exec(line);
    if (!kv) throw new Error(`Ön bilgi satırı okunamadı: "${line}"`);
    data[kv[1]] = kv[2].trim().replace(/^"(.*)"$/, "$1");
  }
  return { data, body: m[2] };
}

export function blocksText(blocks: Block[]): string {
  return blocks
    .map((b) => {
      switch (b.t) {
        case "h2":
        case "h3":
          return b.text;
        case "p":
          return inlineText(b.c);
        case "ul":
        case "ol":
          return b.items.map(inlineText).join(" ");
        case "table":
          return [...b.head, ...b.rows.flat()].map(inlineText).join(" ");
        case "callout":
          return b.title + " " + blocksText(b.blocks);
        case "img":
          return b.caption;
        default:
          return "";
      }
    })
    .join(" ");
}

export function collectLinks(blocks: Block[]): string[] {
  const fromInline = (c: Inline[]): string[] => c.flatMap((x) => (x.t === "link" ? [x.href, ...fromInline(x.c)] : x.t === "strong" ? fromInline(x.c) : []));
  return blocks.flatMap((b) => {
    switch (b.t) {
      case "h2":
      case "h3":
      case "p":
        return fromInline(b.c);
      case "ul":
      case "ol":
        return b.items.flatMap(fromInline);
      case "table":
        return [...b.head, ...b.rows.flat()].flatMap(fromInline);
      case "callout":
        return collectLinks(b.blocks);
      default:
        return [];
    }
  });
}

/** Koşulu sağlayan bağlantıları düz metne çevirir (ör. henüz yayınlanmamış bir yazıya giden bağlantılar). */
export function unlinkBlocks(blocks: Block[], drop: (href: string) => boolean): Block[] {
  const fix = (c: Inline[]): Inline[] =>
    c.flatMap((x): Inline[] => {
      if (x.t === "link") return drop(x.href) ? fix(x.c) : [{ ...x, c: fix(x.c) }];
      if (x.t === "strong") return [{ ...x, c: fix(x.c) }];
      return [x];
    });
  return blocks.map((b): Block => {
    switch (b.t) {
      case "h2":
      case "h3":
      case "p":
        return { ...b, c: fix(b.c) };
      case "ul":
      case "ol":
        return { ...b, items: b.items.map(fix) };
      case "table":
        return { ...b, head: b.head.map(fix), rows: b.rows.map((r) => r.map(fix)) };
      case "callout":
        return { ...b, blocks: unlinkBlocks(b.blocks, drop) };
      default:
        return b;
    }
  });
}
