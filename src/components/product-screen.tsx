"use client";

import { useId, useState } from "react";
import type { ProductScreenKind } from "@/data/products";

/* Ürün ekranları: her ürünün temsilî arayüzü, tek bir SVG olarak çizilir.
   SVG seçildi çünkü aynı çizim hem küçük kartta hem büyük sayfada bozulmadan ölçeklenir.
   Tüm adlar ve rakamlar örnektir; gerçek müşteri verisi kullanılmaz. */

const C = {
  ink: "#111114",
  ink2: "#46464D",
  mute: "#8E8E96",
  line: "#E4E4E9",
  s2: "#F5F5F7",
  s3: "#ECECF0",
  bar: "#C9C9D0",
  ok: "#0F8A5F",
  warn: "#B7791F",
  bad: "#C8321E",
};

const W = 560;
const H = 400;
/* Önce/sonra tutamağı ürünün altında durur, ürünü örtmez. */
const HY = 350;

function Svg({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <svg className="psvg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} style={{ fontFamily: "var(--sans)" }}>
      {children}
    </svg>
  );
}

function WindowBar({ title, right }: { title: string; right?: string }) {
  return (
    <>
      <rect x="0.5" y="0.5" width={W - 1} height={H - 1} rx="20" fill="#fff" stroke={C.line} />
      {[22, 36, 50].map((x) => (
        <circle key={x} cx={x} cy="21" r="4" fill="#DADAE0" />
      ))}
      <text x="70" y="25" fontSize="13" fontWeight="700" fill={C.ink}>
        {title}
      </text>
      {right && (
        <text x={W - 22} y="25" fontSize="11.5" fill={C.mute} textAnchor="end">
          {right}
        </text>
      )}
      <line x1="0" x2={W} y1="42" y2="42" stroke={C.line} />
    </>
  );
}

function MetaScreen() {
  const kpis: [string, string][] = [
    ["Harcama", "4.200 TL"],
    ["Mesaj", "31"],
    ["Mesaj başına", "135 TL"],
    ["Tıklama", "1.284"],
  ];
  const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
  const vals = [480, 620, 550, 700, 820, 610, 420];
  const max = 820;
  const rows: [string, string, string, string][] = [
    ["Yeni sezon", "1.840 TL · 14 mesaj", "Aktif", C.ok],
    ["Randevu kampanyası", "1.520 TL · 11 mesaj", "Aktif", C.ok],
    ["Hikâye reklamı", "840 TL · 6 mesaj", "Bütçe %90", C.warn],
  ];
  return (
    <Svg label="Örnek reklam paneli: son 7 günde 4.200 TL harcama ve 31 mesaj">
      <WindowBar title="Reklam Paneli" right="Son 7 gün" />
      {kpis.map(([k, v], i) => (
        <g key={k}>
          <rect x={20 + i * 132} y="58" width="122" height="70" rx="12" fill={C.s2} />
          <text x={34 + i * 132} y="82" fontSize="11" fill={C.mute}>
            {k}
          </text>
          <text x={34 + i * 132} y="112" fontSize="21" fontWeight="700" fill={C.ink} letterSpacing="-0.5">
            {v}
          </text>
        </g>
      ))}
      <rect x="20" y="142" width="330" height="238" rx="12" fill={C.s2} />
      <text x="36" y="168" fontSize="12" fontWeight="700" fill={C.ink}>
        Günlük harcama
      </text>
      {vals.map((v, i) => {
        const h = (v / max) * 140;
        const x = 48 + i * 42;
        return (
          <g key={days[i]}>
            <rect x={x} y={344 - h} width="26" height={h} rx="6" fill={i === 4 ? C.ink : C.bar} />
            <text x={x + 13} y="364" fontSize="10" fill={C.mute} textAnchor="middle">
              {days[i]}
            </text>
          </g>
        );
      })}
      <rect x="362" y="142" width="178" height="238" rx="12" fill={C.s2} />
      <text x="376" y="168" fontSize="12" fontWeight="700" fill={C.ink}>
        Kampanyalar
      </text>
      {rows.map(([n, sub, st, col], i) => {
        const y = 186 + i * 64;
        return (
          <g key={n}>
            <rect x="372" y={y} width="158" height="54" rx="10" fill="#fff" />
            <text x="384" y={y + 20} fontSize="11.5" fontWeight="700" fill={C.ink}>
              {n}
            </text>
            <text x="384" y={y + 36} fontSize="10" fill={C.mute}>
              {sub}
            </text>
            <circle cx="387" cy={y + 46} r="3" fill={col} />
            <text x="395" y={y + 49} fontSize="9.5" fontWeight="600" fill={col}>
              {st}
            </text>
          </g>
        );
      })}
    </Svg>
  );
}

function DepoScreen() {
  const bars = [6, 3, 5, 2, 7, 3, 4, 6, 2, 5, 3, 7, 4, 2, 6, 3];
  const items: [string, string, number][] = [
    ["Kahve Çekirdeği 1 kg", "4 adet", 0.12],
    ["Kâğıt Bardak 8 oz", "120 adet", 0.3],
    ["Fincan Seti 6'lı", "48 adet", 0.62],
    ["Süt Köpürtücü", "15 adet", 0.5],
  ];
  const col = (l: number) => (l < 0.2 ? C.bad : l < 0.35 ? C.warn : C.ink);
  let bx = 128;
  return (
    <Svg label="Örnek stok ekranı: telefonla barkod okutma ve stok durumu listesi">
      <rect x="0.5" y="0.5" width={W - 1} height={H - 1} rx="20" fill={C.s2} stroke={C.line} />
      <rect x="70" y="22" width="200" height="356" rx="32" fill={C.ink} />
      <rect x="78" y="30" width="184" height="340" rx="25" fill="#fff" />
      <text x="94" y="62" fontSize="13" fontWeight="700" fill={C.ink}>
        Merkez Depo
      </text>
      <text x="94" y="78" fontSize="10" fill={C.mute}>
        Stok kaydı
      </text>
      <rect x="94" y="92" width="152" height="90" rx="12" fill={C.s2} />
      <path d="M104 108v-8h8M236 100h-8M246 108v-8M104 166v8h8M228 174h8v-8" stroke={C.ink} strokeWidth="2" fill="none" />
      {bars.map((w, i) => {
        const x = bx;
        bx += w / 2 + 3.2;
        return <rect key={i} x={x} y="112" width={w / 2} height="50" fill={C.ink} />;
      })}
      <line x1="112" x2="228" y1="137" y2="137" stroke={C.bad} strokeWidth="1.5" />
      <text x="94" y="206" fontSize="12" fontWeight="700" fill={C.ink}>
        Fincan Seti 6&apos;lı
      </text>
      <text x="94" y="222" fontSize="10.5" fill={C.mute}>
        Stokta 48 adet
      </text>
      <rect x="94.5" y="234.5" width="151" height="33" rx="16.5" fill="#fff" stroke={C.line} />
      <text x="114" y="256" fontSize="16" fill={C.ink2} textAnchor="middle">
        −
      </text>
      <text x="170" y="256" fontSize="14" fontWeight="700" fill={C.ink} textAnchor="middle">
        12
      </text>
      <text x="226" y="256" fontSize="16" fill={C.ink2} textAnchor="middle">
        +
      </text>
      <rect x="94.5" y="280.5" width="71" height="35" rx="17.5" fill="#fff" stroke={C.line} />
      <text x="130" y="302" fontSize="11.5" fontWeight="700" fill={C.ink} textAnchor="middle">
        Giriş
      </text>
      <rect x="174" y="280" width="72" height="36" rx="18" fill={C.ink} />
      <text x="210" y="302" fontSize="11.5" fontWeight="700" fill="#fff" textAnchor="middle">
        Çıkış
      </text>
      <text x="170" y="344" fontSize="9.5" fill={C.mute} textAnchor="middle">
        Son kayıt: Ayşe, 14:32
      </text>
      <rect x="300.5" y="60.5" width="236" height="280" rx="16" fill="#fff" stroke={C.line} />
      <text x="318" y="90" fontSize="13" fontWeight="700" fill={C.ink}>
        Stok durumu
      </text>
      <rect x="452" y="76" width="68" height="20" rx="10" fill="#FBEDEA" />
      <text x="486" y="90" fontSize="9.5" fontWeight="700" fill={C.bad} textAnchor="middle">
        1 kritik
      </text>
      {items.map(([n, q, l], i) => {
        const y = 124 + i * 52;
        return (
          <g key={n}>
            <text x="318" y={y} fontSize="11.5" fontWeight="700" fill={C.ink}>
              {n}
            </text>
            <text x="518" y={y} fontSize="11" fontWeight="600" fill={col(l)} textAnchor="end">
              {q}
            </text>
            <rect x="318" y={y + 10} width="200" height="6" rx="3" fill={C.s3} />
            <rect x="318" y={y + 10} width={200 * l} height="6" rx="3" fill={col(l)} />
          </g>
        );
      })}
    </Svg>
  );
}

function Product({ x = 0 }: { x?: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x="262" y="104" width="36" height="46" rx="12" fill="#1A1A1E" />
      <rect x="268" y="146" width="24" height="24" rx="3" fill="#2B2B30" />
      <rect x="244" y="168" width="72" height="132" rx="16" fill="#3A3633" />
      <rect x="250" y="176" width="6" height="110" rx="3" fill="#fff" opacity="0.12" />
      <rect x="254" y="206" width="52" height="60" rx="4" fill="#F4F0E8" />
      <text x="280" y="232" fontSize="12" fontWeight="800" fill={C.ink} textAnchor="middle" letterSpacing="1">
        NOVA
      </text>
      <text x="280" y="248" fontSize="7.5" fill={C.ink2} textAnchor="middle" letterSpacing="0.6">
        SERUM
      </text>
      <text x="280" y="258" fontSize="6.5" fill={C.mute} textAnchor="middle">
        30 ml
      </text>
    </g>
  );
}

/** Önce/sonra: `pos` 0–1 arası, "sonra" görselinin soldan ne kadarının görüneceği. */
function GorselScreen({ pos }: { pos: number }) {
  const uid = useId().replace(/:/g, "");
  const clip = `ps-clip-${uid}`;
  const grad = `ps-grad-${uid}`;
  const soft = `ps-soft-${uid}`;
  const cut = Math.round(W * pos);
  return (
    <Svg label="Örnek ürün görseli: telefonla çekilmiş fotoğraf ve stüdyo sahnesine yerleştirilmiş hâli">
      <defs>
        <clipPath id={clip}>
          <rect x={cut} y="0" width={W - cut} height={H} />
        </clipPath>
        <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EFE8DE" />
          <stop offset="1" stopColor="#DCD1C3" />
        </linearGradient>
        <filter id={soft} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <clipPath id={`${clip}-frame`}>
          <rect x="0" y="0" width={W} height={H} rx="20" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip}-frame)`}>
        <rect width={W} height={H} fill="#CFCBC3" />
        <polygon points={`0,288 ${W},262 ${W},${H} 0,${H}`} fill="#BDB6AA" />
        <rect x="40" y="52" width="120" height="12" rx="6" fill="#B4AEA3" transform="rotate(-8 100 58)" />
        <circle cx="470" cy="94" r="30" fill="#D9D5CE" />
        <path d="M300 300 L420 286 L380 300 Z" fill="#8F877B" opacity="0.7" />
        <Product />
        <g clipPath={`url(#${clip})`}>
          <rect width={W} height={H} fill={`url(#${grad})`} />
          <path d="M340 290c40-70 90-110 150-120-30 30-60 70-80 120z" fill="#9AA58A" opacity="0.55" />
          <path d="M210 296c-30-60-80-96-140-104 30 26 58 62 74 104z" fill="#AEB79E" opacity="0.55" />
          <rect x="0" y="300" width={W} height={H - 300} fill="#E9E1D6" />
          <rect x="0" y="300" width={W} height="2" fill="#F7F2EB" />
          <ellipse cx="280" cy="300" rx="96" ry="14" fill="#F7F2EB" />
          <ellipse cx="282" cy="300" rx="52" ry="7" fill="#7A6E60" opacity="0.35" filter={`url(#${soft})`} />
          <Product />
        </g>
        <line x1={cut} x2={cut} y1="0" y2={H} stroke="#fff" strokeWidth="3" />
        <circle cx={cut} cy={HY} r="17" fill="#fff" />
        <path
          d={`M${cut - 5} ${HY - 6}l-6 6 6 6M${cut + 5} ${HY - 6}l6 6-6 6`}
          stroke={C.ink}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="16" y="16" width="58" height="26" rx="13" fill="#fff" opacity="0.9" />
        <text x="45" y="33" fontSize="11" fontWeight="700" fill={C.ink} textAnchor="middle">
          Önce
        </text>
        <rect x={W - 74} y="16" width="58" height="26" rx="13" fill="#fff" opacity="0.9" />
        <text x={W - 45} y="33" fontSize="11" fontWeight="700" fill={C.ink} textAnchor="middle">
          Sonra
        </text>
      </g>
      <rect x="0.5" y="0.5" width={W - 1} height={H - 1} rx="20" fill="none" stroke={C.line} />
    </Svg>
  );
}

function MusteriScreen() {
  const pins: [number, number, number, boolean][] = [
    [120, 104, 1, true],
    [236, 182, 2, true],
    [158, 276, 3, true],
    [266, 96, 4, false],
    [64, 210, 5, false],
    [250, 330, 6, false],
  ];
  const cards: [string, string, number, string, string][] = [
    ["Kahve Durağı", "Kafe · Görükle", 92, "Görüşülecek", C.ink],
    ["Lina Pastanesi", "Pastane · Beşevler", 86, "Arandı", C.ok],
    ["Köşe Kafe", "Kafe · Özlüce", 78, "Teklif verildi", C.warn],
  ];
  return (
    <Svg label="Örnek müşteri bulma ekranı: harita üzerinde işletmeler ve öncelik sırası">
      <WindowBar title="Müşteri Bulma" right="Nilüfer · Kafe ve pastane" />
      <rect x="20" y="58" width="300" height="322" rx="12" fill="#F1F1F4" />
      <g stroke="#fff" strokeLinecap="round">
        <line x1="20" x2="320" y1="140" y2="128" strokeWidth="12" />
        <line x1="20" x2="320" y1="246" y2="250" strokeWidth="9" />
        <line x1="96" x2="84" y1="58" y2="380" strokeWidth="9" />
        <line x1="204" x2="214" y1="58" y2="380" strokeWidth="12" />
        <line x1="214" x2="320" y1="300" y2="360" strokeWidth="7" />
      </g>
      <rect x="226" y="148" width="70" height="80" rx="8" fill="#E3E8DE" />
      {pins.map(([x, y, n, on]) => (
        <g key={n}>
          <circle cx={x} cy={y} r="13" fill={on ? C.ink : "#fff"} stroke={on ? C.ink : C.mute} strokeWidth="1.5" />
          <text x={x} y={y + 4} fontSize="10.5" fontWeight="700" fill={on ? "#fff" : C.ink2} textAnchor="middle">
            {n}
          </text>
        </g>
      ))}
      <text x="336" y="76" fontSize="12" fontWeight="700" fill={C.ink}>
        Öncelikli işletmeler
      </text>
      {cards.map(([n, sub, score, st, col], i) => {
        const y = 92 + i * 96;
        return (
          <g key={n}>
            <rect x="336" y={y} width="204" height="84" rx="12" fill={C.s2} />
            <circle cx="358" cy={y + 22} r="11" fill={C.ink} />
            <text x="358" y={y + 26} fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle">
              {i + 1}
            </text>
            <text x="376" y={y + 22} fontSize="11.5" fontWeight="700" fill={C.ink}>
              {n}
            </text>
            <text x="376" y={y + 37} fontSize="9.5" fill={C.mute}>
              {sub}
            </text>
            <text x="350" y={y + 60} fontSize="9.5" fill={C.ink2}>
              Uygunluk
            </text>
            <rect x="398" y={y + 54} width="80" height="6" rx="3" fill={C.s3} />
            <rect x="398" y={y + 54} width={80 * (score / 100)} height="6" rx="3" fill={C.ink} />
            <text x="528" y={y + 61} fontSize="10" fontWeight="700" fill={C.ink} textAnchor="end">
              {score}
            </text>
            <circle cx="353" cy={y + 73} r="3" fill={col} />
            <text x="361" y={y + 76} fontSize="9.5" fontWeight="600" fill={col}>
              {st}
            </text>
          </g>
        );
      })}
    </Svg>
  );
}

function WebScreen() {
  return (
    <Svg label="Örnek web sitesi tasarımı: bilgisayar ve telefon görünümü">
      <rect x="0.5" y="0.5" width={W - 1} height={H - 1} rx="20" fill={C.s2} stroke={C.line} />
      <rect x="24.5" y="40.5" width="420" height="300" rx="14" fill="#fff" stroke={C.line} />
      {[42, 54, 66].map((x) => (
        <circle key={x} cx={x} cy="60" r="3.5" fill="#DADAE0" />
      ))}
      <rect x="150" y="51" width="170" height="18" rx="9" fill={C.s2} />
      <text x="235" y="64" fontSize="9.5" fill={C.mute} textAnchor="middle">
        kuzeydanismanlik.com
      </text>
      <line x1="24" x2="444" y1="80" y2="80" stroke={C.line} />
      <text x="46" y="106" fontSize="11" fontWeight="800" fill={C.ink}>
        Kuzey Danışmanlık
      </text>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={262 + i * 42} y="100" width="32" height="6" rx="3" fill="#D2D2D8" />
      ))}
      <rect x="384" y="94" width="44" height="18" rx="9" fill={C.ink} />
      <text x="46" y="160" fontSize="21" fontWeight="800" fill={C.ink} letterSpacing="-0.6">
        Büyümeniz için net
      </text>
      <text x="46" y="186" fontSize="21" fontWeight="800" fill={C.ink} letterSpacing="-0.6">
        bir yol haritası.
      </text>
      <rect x="46" y="202" width="200" height="7" rx="3.5" fill="#D2D2D8" />
      <rect x="46" y="216" width="160" height="7" rx="3.5" fill="#D2D2D8" />
      <rect x="46" y="236" width="92" height="26" rx="13" fill={C.ink} />
      <text x="92" y="253" fontSize="9.5" fontWeight="700" fill="#fff" textAnchor="middle">
        Görüşme Planla
      </text>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={46 + i * 124} y="280" width="112" height="44" rx="10" fill={C.s2} />
      ))}
      <rect x="396" y="128" width="140" height="252" rx="24" fill={C.ink} />
      <rect x="403" y="135" width="126" height="238" rx="18" fill="#fff" />
      <text x="416" y="162" fontSize="9" fontWeight="800" fill={C.ink}>
        Nova Güzellik
      </text>
      <text x="416" y="194" fontSize="14" fontWeight="800" fill={C.ink} letterSpacing="-0.4">
        Kendinize
      </text>
      <text x="416" y="212" fontSize="14" fontWeight="800" fill={C.ink} letterSpacing="-0.4">
        zaman ayırın.
      </text>
      <rect x="416" y="226" width="64" height="20" rx="10" fill={C.ink} />
      <text x="448" y="239" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">
        Randevu Al
      </text>
      <rect x="416" y="258" width="100" height="56" rx="8" fill="#EDE6E0" />
      <rect x="416" y="322" width="100" height="16" rx="5" fill={C.s2} />
      <rect x="416" y="344" width="100" height="16" rx="5" fill={C.s2} />
    </Svg>
  );
}

function OzelScreen() {
  const ins: [string, string][] = [
    ["WhatsApp talepleri", "her gün elle"],
    ["Excel tabloları", "ayrı ayrı dosya"],
    ["Muhasebe programı", "tekrar giriş"],
  ];
  const panel: [string, string][] = [
    ["Yeni talep", "12"],
    ["Bugünkü işler", "7"],
    ["Bekleyen", "3"],
    ["Tamamlanan", "28"],
  ];
  const outs = ["Otomatik bildirim", "Haftalık rapor"];
  return (
    <Svg label="Örnek özel çözüm: dağınık iş akışlarının tek panelde toplanması">
      <rect x="0.5" y="0.5" width={W - 1} height={H - 1} rx="20" fill={C.s2} stroke={C.line} />
      <defs>
        <marker id="ps-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={C.mute} />
        </marker>
      </defs>
      {ins.map(([t, s], i) => {
        const y = 92 + i * 84;
        return (
          <g key={t}>
            <rect x="22.5" y={y + 0.5} width="152" height="56" rx="12" fill="#fff" stroke={C.line} />
            <text x="38" y={y + 25} fontSize="11.5" fontWeight="700" fill={C.ink}>
              {t}
            </text>
            <text x="38" y={y + 41} fontSize="9.5" fill={C.mute}>
              {s}
            </text>
            <path d={`M176 ${y + 28} C196 ${y + 28} 196 200 212 200`} stroke={C.mute} strokeWidth="1.25" fill="none" markerEnd="url(#ps-arrow)" />
          </g>
        );
      })}
      <rect x="215" y="72" width="170" height="256" rx="16" fill="#fff" stroke={C.ink} strokeWidth="1.5" />
      <text x="232" y="102" fontSize="12.5" fontWeight="800" fill={C.ink}>
        Size özel panel
      </text>
      <line x1="232" x2="368" y1="116" y2="116" stroke={C.line} />
      {panel.map(([k, v], i) => {
        const y = 140 + i * 44;
        return (
          <g key={k}>
            <rect x="232" y={y - 16} width="136" height="34" rx="9" fill={C.s2} />
            <text x="244" y={y + 5} fontSize="10.5" fill={C.ink2}>
              {k}
            </text>
            <text x="356" y={y + 5} fontSize="12" fontWeight="800" fill={C.ink} textAnchor="end">
              {v}
            </text>
          </g>
        );
      })}
      {outs.map((t, i) => {
        const y = 132 + i * 100;
        return (
          <g key={t}>
            <path d={`M386 200 C396 200 396 ${y + 28} 404 ${y + 28}`} stroke={C.mute} strokeWidth="1.25" fill="none" markerEnd="url(#ps-arrow)" />
            <rect x="406.5" y={y + 0.5} width="132" height="56" rx="12" fill="#fff" stroke={C.line} />
            <text x="472" y={y + 33} fontSize="11.5" fontWeight="700" fill={C.ink} textAnchor="middle">
              {t}
            </text>
          </g>
        );
      })}
    </Svg>
  );
}

export function ProductScreen({ kind, interactive = false }: { kind: ProductScreenKind; interactive?: boolean }) {
  const [pos, setPos] = useState(0.5);
  if (kind === "gorsel") {
    return (
      <div className="pscreen ps-compare">
        <GorselScreen pos={pos} />
        {interactive && (
          <input
            className="ps-range"
            type="range"
            min={8}
            max={92}
            value={Math.round(pos * 100)}
            onChange={(e) => setPos(Number(e.target.value) / 100)}
            aria-label="Önce ve sonra görselini karşılaştırmak için kaydırın"
          />
        )}
      </div>
    );
  }
  return (
    <div className="pscreen">
      {kind === "meta" && <MetaScreen />}
      {kind === "depo" && <DepoScreen />}
      {kind === "musteri" && <MusteriScreen />}
      {kind === "web" && <WebScreen />}
      {kind === "ozel" && <OzelScreen />}
    </div>
  );
}
