/* Blog kapak görsellerini üretir: public/blog/<slug>/kapak.webp (16:9), kapak-4x3.webp, kapak-1x1.webp.
   Marka kimliği: monokrom, ince çizgili sade illüstrasyon; lacivert (#1F2F6B) yalnızca logoda kullanıldığı için burada yok.
   Ana çizim, 1:1 kırpımda da görünsün diye ortadaki 900 piksellik alanın içinde tutulur.
   Kullanım: node scripts/blog-kapaklari.mjs [slug ...]   (argümansız: hepsi) */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const W = 1600;
const H = 900;
const C = { bg: "#F5F5F7", ink: "#111114", ink2: "#46464D", mute: "#6B6B73", soft: "#8E8E96", line: "#E4E4E9", line2: "#D2D2D8", white: "#FFFFFF" };
const SW = 6;
const st = (w = SW, c = C.ink) => `stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;

/* ---------- yapı taşları ---------- */
const ground = (y = 760, x1 = 330, x2 = 1270) => `<path d="M${x1} ${y}H${x2}" ${st(5, C.line2)}/>`;
const shadow = (cx, cy, rx, ry = 14) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${C.line}"/>`;
const bar = (x, y, w, h = 14, fill = C.line) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}"/>`;
const textLines = (x, y, widths, gap = 28, h = 12, fill = C.line) => widths.map((w, i) => bar(x, y + i * gap, w, h, fill)).join("");

function imgBox(x, y, w, h, r = 14) {
  const sx = x + w * 0.28, sy = y + h * 0.32, sr = Math.min(w, h) * 0.09;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${C.line}"/>
  <circle cx="${sx}" cy="${sy}" r="${sr}" fill="${C.white}"/>
  <path d="M${x + w * 0.12} ${y + h * 0.82} L${x + w * 0.42} ${y + h * 0.5} L${x + w * 0.6} ${y + h * 0.68} L${x + w * 0.72} ${y + h * 0.56} L${x + w * 0.9} ${y + h * 0.82}Z" fill="${C.soft}"/>`;
}

function browser(x, y, w, h, inner = "") {
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${C.white}" ${st()}/>
  <path d="M${x} ${y + 52}H${x + w}" ${st()}/>
  <circle cx="${x + 30}" cy="${y + 26}" r="7" fill="${C.ink}"/><circle cx="${x + 54}" cy="${y + 26}" r="7" fill="${C.line2}"/><circle cx="${x + 78}" cy="${y + 26}" r="7" fill="${C.line2}"/>
  ${inner}</g>`;
}

function phone(x, y, w, h, inner = "") {
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="34" fill="${C.white}" ${st()}/>
  <path d="M${x + w / 2 - 26} ${y + 24}H${x + w / 2 + 26}" ${st(6)}/>
  ${inner}</g>`;
}

function tree(x, base, s = 1) {
  const r = 46 * s;
  return `<g><path d="M${x} ${base}V${base - 92 * s}" ${st(5, C.soft)}/>
  <circle cx="${x}" cy="${base - 92 * s - r * 0.6}" r="${r}" fill="${C.line}" ${st(5, C.soft)}/>
  <path d="M${x} ${base - 70 * s}l-16 -16M${x} ${base - 92 * s}l14 -14" ${st(4, C.soft)}/></g>`;
}

function pin(cx, cy, s = 1, fill = C.ink) {
  const r = 46 * s;
  return `<g><path d="M${cx} ${cy + r * 2.1} C${cx - r * 0.4} ${cy + r * 1.4} ${cx - r} ${cy + r * 0.8} ${cx - r} ${cy} A${r} ${r} 0 1 1 ${cx + r} ${cy} C${cx + r} ${cy + r * 0.8} ${cx + r * 0.4} ${cy + r * 1.4} ${cx} ${cy + r * 2.1}Z" fill="${fill}" ${st(SW, C.ink)}/>
  <circle cx="${cx}" cy="${cy}" r="${r * 0.38}" fill="${C.white}"/></g>`;
}

function star(cx, cy, r, filled = true) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.45 : r;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(" ")}" fill="${filled ? C.ink : C.white}" ${st(4, filled ? C.ink : C.soft)}/>`;
}
const stars = (x, y, r, n = 5, filled = 4, gap = 2.5) => Array.from({ length: n }, (_, i) => star(x + i * r * gap, y, r, i < filled)).join("");

function storefront(x, y, w, h) {
  const aw = 70, n = 6, sw = w / n;
  let awning = "";
  for (let i = 0; i < n; i++) {
    awning += `<path d="M${x + i * sw} ${y} h${sw} v${aw} a${sw / 2} ${sw / 2.4} 0 0 1 ${-sw} 0z" fill="${i % 2 ? C.white : C.ink}" ${st(5)}/>`;
  }
  return `<g><rect x="${x + 12}" y="${y + aw - 10}" width="${w - 24}" height="${h - aw + 10}" fill="${C.white}" ${st()}/>
  ${awning}
  <rect x="${x + 44}" y="${y + aw + 50}" width="${w * 0.34}" height="${h - aw - 50}" fill="${C.line}" ${st(5)}/>
  <circle cx="${x + 44 + w * 0.34 - 20}" cy="${y + aw + 50 + (h - aw - 50) / 2}" r="5" fill="${C.ink}"/>
  <rect x="${x + w * 0.52}" y="${y + aw + 50}" width="${w * 0.36}" height="${(h - aw) * 0.45}" fill="${C.white}" ${st(5)}/>
  <path d="M${x + w * 0.7} ${y + aw + 50}v${(h - aw) * 0.45}M${x + w * 0.52} ${y + aw + 50 + (h - aw) * 0.22}h${w * 0.36}" ${st(4)}/></g>`;
}

function magnifier(cx, cy, r) {
  return `<g><circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.white}" fill-opacity=".6" ${st(10)}/>
  <path d="M${cx + r * 0.72} ${cy + r * 0.72} L${cx + r * 1.45} ${cy + r * 1.45}" ${st(26)}/></g>`;
}

const checkBadge = (cx, cy, r) =>
  `<g><circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.ink}"/><path d="M${cx - r * 0.42} ${cy + 2} l${r * 0.3} ${r * 0.3} l${r * 0.55} ${-r * 0.6}" ${st(9, C.white)} fill="none"/></g>`;

function lira(cx, cy, s = 1, color = C.ink) {
  const P = (x, y) => `${cx + x * s} ${cy + y * s}`;
  return `<g ${st(10 * s, color)} fill="none"><path d="M${P(-10, -46)} V${cy + 40 * s} H${cx + 6 * s} C${P(28, 40)} ${P(40, 24)} ${P(40, -2)}"/>
  <path d="M${P(-38, -4)} L${P(18, -26)}"/><path d="M${P(-38, 18)} L${P(18, -4)}"/></g>`;
}

function bubble(x, y, w, h, side = "left", fill = C.white, strokeC = C.ink) {
  const tail = side === "left" ? `M${x + 30} ${y + h} l-6 30 l34 -30` : `M${x + w - 30} ${y + h} l6 30 l-34 -30`;
  return `<g><path d="${tail}" fill="${fill}" ${st(5, strokeC)}/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(28, h / 2)}" fill="${fill}" ${st(5, strokeC)}/>
  <path d="${tail.replace(/^M[^l]*/, (m) => m)}" fill="${fill}" stroke="none"/></g>`;
}

function calendarGrid(x, y, w, h, marked = [6, 11]) {
  let out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${C.white}" ${st(5)}/><path d="M${x} ${y + 44}H${x + w}" ${st(5)}/>
  <path d="M${x + w * 0.3} ${y - 12}v26M${x + w * 0.7} ${y - 12}v26" ${st(6)}/>`;
  const cols = 4, rows = 3, cw = (w - 40) / cols, ch = (h - 64) / rows;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      out += `<rect x="${x + 20 + c * cw + 6}" y="${y + 56 + r * ch + 6}" width="${cw - 12}" height="${ch - 12}" rx="8" fill="${marked.includes(i) ? C.ink : C.line}"/>`;
    }
  return out;
}

const plant = (x, base) => `<g><path d="M${x} ${base}v-60" ${st(5, C.soft)}/><path d="M${x} ${base - 30}c-30 -6 -40 -30 -38 -50c26 2 40 22 38 50zM${x} ${base - 48}c26 -4 38 -26 36 -46c-24 2 -38 20 -36 46z" fill="${C.line}" ${st(4, C.soft)}/></g>`;

/* ---------- kapaklar ---------- */
const COVERS = {
  "web-sitesi-fiyati-neye-bagli": () => `
    ${ground()}${tree(420, 760, 0.9)}
    ${browser(500, 240, 470, 420, `${imgBox(530, 322, 200, 150)}${textLines(760, 330, [170, 140, 160, 110])}${textLines(530, 510, [380, 330, 360])}${bar(530, 600, 120, 30, C.ink)}`)}
    <g transform="rotate(-14 1060 420)"><path d="M960 330 h170 a24 24 0 0 1 24 24 v200 a24 24 0 0 1 -24 24 h-170 l-70 -124z" fill="${C.white}" ${st()}/>
    <circle cx="935" cy="454" r="14" fill="${C.bg}" ${st(5)}/>${lira(1050, 454, 1.25)}</g>
    <path d="M935 454 C900 380 870 330 880 250" ${st(4, C.soft)} fill="none"/>
    ${shadow(1140, 742, 90)}<g>${[0, 1, 2, 3].map((i) => `<ellipse cx="1140" cy="${730 - i * 26}" rx="74" ry="20" fill="${i === 3 ? C.white : C.line}" ${st(5)}/>`).join("")}</g>`,

  "web-sitesi-mi-instagram-mi": () => `
    ${ground()}${plant(380, 760)}
    ${phone(430, 210, 250, 500, `${[0, 1, 2].map((r) => [0, 1, 2].map((c) => `<rect x="${458 + c * 66}" y="${300 + r * 66}" width="58" height="58" rx="10" fill="${(r + c) % 3 === 0 ? C.soft : C.line}"/>`).join("")).join("")}<circle cx="490" cy="262" r="20" fill="${C.line}"/>${bar(520, 254, 120, 14)}${textLines(458, 520, [190, 150, 170])}`)}
    <g ${st(7)} fill="none"><path d="M740 410 h120 m-30 -26 l30 26 l-30 26"/><path d="M860 490 h-120 m30 -26 l-30 26 l30 26"/></g>
    ${browser(910, 250, 300, 420, `${imgBox(936, 326, 248, 140)}${textLines(936, 492, [220, 180, 200])}${bar(936, 590, 110, 30, C.ink)}`)}`,

  "yerel-seo-rehberi": () => `
    ${ground()}${tree(430, 760, 1.1)}${tree(1180, 760, 0.95)}
    <path d="M520 800 Q700 770 800 800 T1080 800" ${st(5, C.line2)} stroke-dasharray="4 18" fill="none"/>
    ${storefront(620, 430, 360, 330)}
    ${shadow(800, 770, 210)}
    ${pin(800, 250, 1.35)}
    <path d="M760 360 q40 26 80 0" ${st(4, C.soft)} fill="none"/>`,

  "google-isletme-profili-rehberi": () => `
    <g opacity=".9">${[0, 1, 2, 3].map((i) => `<path d="M360 ${300 + i * 120} H760" ${st(4, C.line2)}/>`).join("")}${[0, 1, 2, 3].map((i) => `<path d="M${400 + i * 110} 260 V760" ${st(4, C.line2)}/>`).join("")}</g>
    ${pin(560, 430, 0.9)}
    <rect x="700" y="200" width="420" height="520" rx="28" fill="${C.white}" ${st()}/>
    ${imgBox(730, 230, 360, 150)}
    ${bar(730, 408, 240, 22, C.ink)}${stars(744, 470, 18, 5, 4, 2.6)}
    <g ${st(5)} fill="none"><circle cx="748" cy="540" r="16"/><path d="M748 530v10l7 5"/></g>${bar(782, 534, 200, 12)}
    <g ${st(5)} fill="none"><path d="M736 586c4 14 14 24 28 28l8-8-10-8-6 4c-4-2-8-6-10-10l4-6-8-10z"/></g>${bar(782, 594, 160, 12)}
    ${pin(748, 646, 0.28)}${bar(782, 654, 220, 12)}`,

  "kucuk-isletmeler-icin-temel-seo": () => `
    ${ground()}
    <rect x="440" y="200" width="620" height="76" rx="38" fill="${C.white}" ${st()}/>
    <circle cx="488" cy="238" r="14" ${st(5)} fill="none"/><path d="M498 248l12 12" ${st(5)}/>${bar(530, 232, 260, 14)}
    ${[0, 1, 2].map((i) => `<rect x="440" y="${320 + i * 130}" width="520" height="104" rx="20" fill="${C.white}" ${st(i === 0 ? SW : 4, i === 0 ? C.ink : C.soft)}/>${bar(470, 346 + i * 130, i === 0 ? 260 : 220, 18, i === 0 ? C.ink : C.soft)}${bar(470, 380 + i * 130, 400, 12)}`).join("")}
    ${magnifier(1030, 420, 110)}
    <g>${[0, 1, 2].map((i) => `<rect x="${1010 + i * 52}" y="${690 - (i + 1) * 46}" width="36" height="${(i + 1) * 46}" rx="8" fill="${i === 2 ? C.ink : C.soft}"/>`).join("")}</g>`,

  "sayfa-hizi-neden-onemli": () => `
    ${ground()}
    ${browser(420, 210, 520, 360, `${bar(450, 300, 460, 18, C.line)}${bar(450, 300, 330, 18, C.ink)}${imgBox(450, 350, 210, 180)}${textLines(690, 360, [210, 170, 190, 140])}`)}
    <g><path d="M820 700 A220 220 0 0 1 1260 700" fill="${C.white}" ${st(8)}/>
    ${Array.from({ length: 9 }, (_, i) => {
      const a = Math.PI + (i * Math.PI) / 8;
      const x1 = 1040 + 190 * Math.cos(a), y1 = 700 + 190 * Math.sin(a), x2 = 1040 + 165 * Math.cos(a), y2 = 700 + 165 * Math.sin(a);
      return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}" ${st(6, i > 5 ? C.ink : C.soft)}/>`;
    }).join("")}
    <path d="M1040 700 L1170 590" ${st(12)}/><circle cx="1040" cy="700" r="22" fill="${C.ink}"/></g>
    <path d="M820 700 H1260" ${st(8)}/>`,

  "web-tasarim-firmasi-nasil-secilir": () => `
    ${ground()}
    ${[0, 1, 2].map((i) => {
      const x = 430 + i * 260, y = i === 1 ? 250 : 330, sel = i === 1;
      return `${shadow(x + 110, 760, 100, 12)}<rect x="${x}" y="${y}" width="220" height="${sel ? 400 : 320}" rx="22" fill="${C.white}" ${st(sel ? 8 : 5, sel ? C.ink : C.soft)}/>
      <path d="M${x} ${y + 40}H${x + 220}" ${st(sel ? 6 : 4, sel ? C.ink : C.soft)}/>${imgBox(x + 22, y + 62, 176, 100, 10)}${textLines(x + 22, y + 188, [170, 130, 150], 26, 11)}${bar(x + 22, y + (sel ? 330 : 270), 90, 24, sel ? C.ink : C.soft)}`;
    }).join("")}
    ${checkBadge(870, 250, 46)}`,

  "web-sitem-neden-musteri-getirmiyor": () => `
    ${ground()}
    ${[[620, 200], [700, 170], [790, 200], [880, 175], [960, 205], [740, 245], [850, 250]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="20" fill="${C.soft}"/>`).join("")}
    <path d="M540 290 H1060 L870 520 V650 H730 V520 Z" fill="${C.white}" ${st()}/>
    <path d="M610 380 H990" ${st(4, C.line2)}/><path d="M690 460 H910" ${st(4, C.line2)}/>
    <circle cx="800" cy="700" r="20" fill="${C.ink}"/>
    ${[[470, 420], [430, 520], [1130, 410], [1170, 520], [1110, 610]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="18" fill="${C.line2}"/>`).join("")}
    <path d="M560 330 q-60 30 -80 80M1040 330 q60 30 80 70" ${st(4, C.line2)} stroke-dasharray="2 14" fill="none"/>`,

  "kuafor-guzellik-salonu-web-sitesi": () => `
    ${ground()}${plant(1210, 760)}
    ${phone(700, 190, 270, 540, `${bar(730, 250, 150, 18, C.ink)}${calendarGrid(728, 310, 214, 230)}${bar(728, 580, 214, 44, C.ink)}${textLines(728, 650, [180, 140], 24, 10)}`)}
    <g transform="rotate(-30 530 470)">
      <circle cx="470" cy="600" r="44" fill="${C.white}" ${st()}/><circle cx="590" cy="600" r="44" fill="${C.white}" ${st()}/>
      <path d="M492 562 L560 300 M568 562 L500 300" ${st(9)}/><circle cx="530" cy="452" r="8" fill="${C.ink}"/></g>
    <g transform="rotate(12 1090 450)"><rect x="1040" y="300" width="70" height="320" rx="16" fill="${C.white}" ${st()}/>
    ${Array.from({ length: 11 }, (_, i) => `<path d="M1040 ${330 + i * 26}h-44" ${st(5)}/>`).join("")}</g>`,

  "restoran-kafe-web-sitesi": () => `
    ${ground()}
    ${phone(430, 200, 250, 520, `${bar(460, 260, 140, 18, C.ink)}${[0, 1, 2, 3].map((i) => `${bar(460, 320 + i * 80, 120, 14, C.ink2)}${bar(460, 346 + i * 80, 150, 10)}${bar(616, 320 + i * 80, 34, 14, C.ink2)}`).join("")}`)}
    ${shadow(890, 712, 150, 16)}<circle cx="890" cy="560" r="150" fill="${C.white}" ${st()}/><circle cx="890" cy="560" r="96" fill="${C.line}" ${st(4, C.soft)}/>
    <path d="M700 420 V700 M680 420 v70 a20 20 0 0 0 40 0 v-70" ${st(7)} fill="none"/>
    <path d="M1080 420 c34 30 34 110 0 140 V700" ${st(7)} fill="none"/>
    <g><path d="M1110 360 h120 v70 a60 60 0 0 1 -120 0z" fill="${C.white}" ${st()}/><path d="M1230 375 a26 26 0 0 1 0 52" ${st(6)} fill="none"/>
    <path d="M1150 330 q-12 -20 0 -40 M1185 330 q-12 -20 0 -40" ${st(5, C.soft)} fill="none"/></g>`,

  "whatsapp-business-musteri-iletisimi": () => `
    ${ground()}
    ${phone(520, 190, 290, 560, `${bar(550, 250, 160, 18, C.ink)}
      <rect x="548" y="310" width="170" height="56" rx="20" fill="${C.line}"/>
      <rect x="610" y="386" width="170" height="56" rx="20" fill="${C.ink}"/>
      <rect x="548" y="462" width="200" height="56" rx="20" fill="${C.line}"/>
      <rect x="640" y="538" width="140" height="56" rx="20" fill="${C.ink}"/>
      <rect x="548" y="660" width="234" height="44" rx="22" fill="${C.white}" ${st(4, C.soft)}/>`)}
    ${bubble(880, 300, 300, 150, "left")}
    ${[0, 1, 2].map((i) => `<circle cx="${970 + i * 60}" cy="375" r="16" fill="${C.ink}"/>`).join("")}
    ${bubble(920, 520, 220, 110, "left", C.line, C.soft)}${textLines(950, 556, [150, 110], 30, 12, C.soft)}`,

  "web-sitesi-olmayan-isletme-ne-kaybeder": () => `
    ${ground()}${tree(400, 760, 0.9)}
    ${storefront(470, 430, 330, 330)}
    <rect x="510" y="560" width="110" height="46" rx="8" fill="${C.white}" ${st(5)}/><path d="M565 540 v20" ${st(5)}/>
    <rect x="890" y="250" width="320" height="400" rx="22" fill="none" ${st(6, C.soft)} stroke-dasharray="20 18"/>
    <path d="M1010 420 a40 40 0 1 1 52 38 c-12 6 -12 14 -12 30" ${st(10, C.soft)} fill="none"/><circle cx="1050" cy="540" r="9" fill="${C.soft}"/>`,

  "musteri-yorumlari-toplama-yonetme": () => `
    ${ground()}
    ${bubble(440, 220, 470, 200, "left")}${stars(500, 290, 24, 5, 5, 2.6)}${textLines(480, 342, [380, 300], 30, 13)}
    ${bubble(720, 470, 440, 180, "right", C.white, C.ink)}${stars(780, 530, 20, 5, 4, 2.6)}${textLines(760, 576, [340, 260], 30, 13)}
    <circle cx="470" cy="560" r="44" fill="${C.line}" ${st(5)}/><path d="M440 640 a40 40 0 0 1 60 0" ${st(5)} fill="none"/><circle cx="470" cy="548" r="16" fill="${C.white}" ${st(4)}/>`,

  "kucuk-isletmeler-icin-icerik-pazarlamasi": () => `
    ${ground()}
    <rect x="560" y="250" width="380" height="470" rx="20" fill="${C.white}" ${st(5, C.soft)} transform="rotate(-6 750 485)"/>
    <rect x="600" y="220" width="380" height="490" rx="20" fill="${C.white}" ${st()}/>
    ${bar(636, 262, 220, 22, C.ink)}${imgBox(636, 310, 308, 150)}${textLines(636, 490, [300, 260, 290, 210, 250], 32, 12)}
    <g transform="rotate(38 1100 470)"><rect x="1070" y="250" width="56" height="320" rx="10" fill="${C.white}" ${st()}/><path d="M1070 570 l28 64 l28 -64z" fill="${C.line}" ${st(5)}/><path d="M1070 300h56" ${st(5)}/></g>
    ${plant(470, 760)}`,

  "web-sitesi-tasariminda-sik-yapilan-hatalar": () => `
    ${ground()}
    ${browser(440, 210, 600, 460, `${bar(480, 300, 200, 22, C.ink)}<g transform="rotate(-5 590 420)">${imgBox(480, 350, 230, 150)}</g>${textLines(760, 340, [220, 140, 240, 100], 30, 13)}<g transform="rotate(4 800 560)">${bar(740, 540, 220, 40, C.soft)}</g>${textLines(480, 560, [160, 230], 30, 13)}`)}
    <path d="M1110 330 L1230 540 H990 Z" fill="${C.white}" ${st(8)}/>
    <path d="M1110 400 V470" ${st(12)}/><circle cx="1110" cy="505" r="9" fill="${C.ink}"/>`,

  "instagram-ve-web-sitesini-birlikte-kullanmak": () => `
    ${ground()}
    ${phone(420, 220, 240, 480, `${[0, 1].map((r) => [0, 1, 2].map((c) => `<rect x="${446 + c * 64}" y="${310 + r * 64}" width="56" height="56" rx="10" fill="${c === r ? C.soft : C.line}"/>`).join("")).join("")}<circle cx="476" cy="270" r="18" fill="${C.line}"/>${bar(504, 262, 110, 14)}${bar(446, 460, 188, 36, C.ink)}${textLines(446, 524, [170, 130], 26, 11)}`)}
    <path d="M660 460 C 760 380, 840 540, 940 460" ${st(5, C.soft)} stroke-dasharray="2 16" fill="none"/>
    <g transform="rotate(-35 800 460)"><rect x="740" y="436" width="74" height="48" rx="24" fill="${C.white}" ${st(8)}/><rect x="786" y="436" width="74" height="48" rx="24" fill="none" ${st(8)}/></g>
    ${browser(940, 240, 290, 420, `${imgBox(964, 314, 242, 130)}${textLines(964, 468, [210, 170, 190])}${bar(964, 568, 110, 30, C.ink)}`)}`,

  "kucuk-isletmeler-icin-ucretsiz-dijital-araclar": () => `
    ${ground()}
    ${shadow(800, 760, 260, 16)}
    <path d="M720 470 v-50 a20 20 0 0 1 20 -20 h120 a20 20 0 0 1 20 20 v50" ${st(8)} fill="none"/>
    <rect x="540" y="470" width="520" height="280" rx="26" fill="${C.white}" ${st()}/><path d="M540 560 H1060" ${st()}/><rect x="770" y="540" width="60" height="40" rx="8" fill="${C.ink}"/>
    ${[[470, 260, "search"], [640, 200, "pin"], [960, 200, "chart"], [1130, 270, "chat"]].map(([x, y, k]) => {
      const box = `<rect x="${x - 48}" y="${y - 48}" width="96" height="96" rx="24" fill="${C.white}" ${st(5)}/>`;
      const g = k === "search" ? `<circle cx="${x - 6}" cy="${y - 6}" r="20" ${st(6)} fill="none"/><path d="M${x + 9} ${y + 9}l14 14" ${st(6)}/>`
        : k === "pin" ? pin(x, y - 10, 0.36)
        : k === "chart" ? `${[0, 1, 2].map((i) => `<rect x="${x - 28 + i * 20}" y="${y + 24 - (i + 1) * 14}" width="14" height="${(i + 1) * 14}" rx="3" fill="${C.ink}"/>`).join("")}`
        : `<rect x="${x - 26}" y="${y - 22}" width="52" height="36" rx="12" fill="${C.ink}"/><path d="M${x - 14} ${y + 14} l-4 14 l18 -14" fill="${C.ink}"/>`;
      return box + g;
    }).join("")}`,
};

/* ---------- üretim ---------- */
/* Çizimler 1600x900 tuvalde tasarlandı; kartlarda okunur olsun diye ortadan %12 büyütülür. */
const svgOf = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${C.bg}"/><g transform="translate(800 470) scale(1.12) translate(-800 -470)">${body}</g></svg>`;

const outRoot = path.join(process.cwd(), "public/blog");
const only = process.argv.slice(2);
const slugs = only.length ? only : Object.keys(COVERS);
for (const slug of slugs) {
  const draw = COVERS[slug];
  if (!draw) throw new Error(`Kapak tanımı yok: ${slug}`);
  const dir = path.join(outRoot, slug);
  fs.mkdirSync(dir, { recursive: true });
  const buf = await sharp(Buffer.from(svgOf(draw()))).png().toBuffer();
  await sharp(buf).webp({ quality: 84 }).toFile(path.join(dir, "kapak.webp"));
  await sharp(buf).extract({ left: 200, top: 0, width: 1200, height: 900 }).webp({ quality: 84 }).toFile(path.join(dir, "kapak-4x3.webp"));
  await sharp(buf).extract({ left: 350, top: 0, width: 900, height: 900 }).webp({ quality: 84 }).toFile(path.join(dir, "kapak-1x1.webp"));
  console.log("✓", slug);
}
