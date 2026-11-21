import type { ReactNode } from "react";
import type { ArtKind } from "@/data/products";

/* ================= ÇİZİMLER =================
   Ürün ekranları ve sektör çizimleri tek tek SVG olarak çizilir; aynı çizim kartta, ürün
   sayfasında ve paylaşım görselinde bozulmadan ölçeklenir. Kanca kullanılmaz (sunucuda da
   çalışır); kimlik gerektiren tanımlar `uid` ile ayrışır. Tüm adlar ve rakamlar örnektir. */

export const C = {
  ink: "#111114",
  ink2: "#46464D",
  mute: "#8E8E96",
  soft: "#B4B4BC",
  line: "#E4E4E9",
  s2: "#F5F5F7",
  s3: "#ECECF0",
  bar: "#C9C9D0",
  ok: "#0F8A5F",
  okBg: "#E6F4EE",
  warn: "#A86A12",
  warnBg: "#FBF1E1",
  bad: "#C8321E",
  badBg: "#FBEDEA",
};

export const W = 560;
export const H = 400;

export function Svg({ label, children, vb = `0 0 ${W} ${H}`, cls = "psvg" }: { label?: string; children: ReactNode; vb?: string; cls?: string }) {
  return (
    <svg
      className={cls}
      viewBox={vb}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ fontFamily: "var(--sans)" }}
    >
      {children}
    </svg>
  );
}

function Frame({ fill = "#fff" }: { fill?: string }) {
  return <rect x="0.5" y="0.5" width={W - 1} height={H - 1} rx="20" fill={fill} stroke={C.line} />;
}

function WindowBar({ title, right }: { title: string; right?: string }) {
  return (
    <>
      <Frame />
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

function Pill({ x, y, text, tone = "ink", anchor = "start" }: { x: number; y: number; text: string; tone?: "ok" | "warn" | "bad" | "ink" | "mute"; anchor?: "start" | "end" }) {
  const map = {
    ok: [C.okBg, C.ok],
    warn: [C.warnBg, C.warn],
    bad: [C.badBg, C.bad],
    ink: [C.ink, "#fff"],
    mute: [C.s3, C.ink2],
  } as const;
  const [bg, fg] = map[tone];
  const w = text.length * 5.6 + 18;
  const rx = anchor === "end" ? x - w : x;
  return (
    <g>
      <rect x={rx} y={y} width={w} height="18" rx="9" fill={bg} />
      <text x={rx + w / 2} y={y + 12.5} fontSize="9.5" fontWeight="700" fill={fg} textAnchor="middle">
        {text}
      </text>
    </g>
  );
}

const Bar = ({ x, y, w, h = 6, fill = C.s3 }: { x: number; y: number; w: number; h?: number; fill?: string }) => (
  <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />
);

/* ---------------- Meta Reklam Paneli ---------------- */
export function MetaArt() {
  const kpis: [string, string, string][] = [
    ["Harcama", "4.050 TL", "Plan 4.500 TL"],
    ["Sonuçlar", "30 mesaj", "+6 mesaj"],
    ["Sonuç başına", "135 TL", "−18 TL"],
  ];
  const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
  const vals = [3, 4, 5, 4, 6, 5, 3];
  const spend = [480, 620, 550, 700, 820, 520, 360];
  return (
    <Svg label="Örnek reklam paneli: son 7 günde 4.050 TL harcama, 30 mesaj ve mesaj başına 135 TL">
      <WindowBar title="Reklam Paneli" right="Son 7 gün · Örnek veri" />
      {kpis.map(([k, v, d], i) => (
        <g key={k}>
          <rect x={20 + i * 176} y="56" width="166" height="78" rx="12" fill={C.s2} />
          <text x={34 + i * 176} y="78" fontSize="11" fill={C.mute}>
            {k}
          </text>
          <text x={34 + i * 176} y="106" fontSize="22" fontWeight="700" fill={C.ink} letterSpacing="-0.5">
            {v}
          </text>
          <text x={34 + i * 176} y="124" fontSize="10" fontWeight="600" fill={i === 0 ? C.mute : C.ok}>
            {d}
          </text>
        </g>
      ))}
      <rect x="20" y="146" width="330" height="234" rx="12" fill={C.s2} />
      <text x="36" y="170" fontSize="12" fontWeight="700" fill={C.ink}>
        Günlük harcama ve sonuç
      </text>
      {[0, 1, 2].map((i) => (
        <line key={i} x1="40" x2="330" y1={206 + i * 44} y2={206 + i * 44} stroke={C.line} strokeDasharray="3 4" />
      ))}
      {spend.map((v, i) => {
        const h = (v / 820) * 130;
        const x = 50 + i * 40;
        return (
          <g key={days[i]}>
            <rect x={x} y={340 - h} width="24" height={h} rx="6" fill={i === 4 ? C.ink : C.bar} />
            <text x={x + 12} y="362" fontSize="10" fill={C.mute} textAnchor="middle">
              {days[i]}
            </text>
          </g>
        );
      })}
      <polyline
        points={vals.map((v, i) => `${62 + i * 40},${330 - v * 20}`).join(" ")}
        fill="none"
        stroke={C.ok}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {vals.map((v, i) => (
        <circle key={i} cx={62 + i * 40} cy={330 - v * 20} r="3.2" fill="#fff" stroke={C.ok} strokeWidth="2" />
      ))}
      <rect x="362" y="146" width="178" height="234" rx="12" fill={C.s2} />
      <text x="376" y="170" fontSize="12" fontWeight="700" fill={C.ink}>
        Kampanyalar
      </text>
      {(
        [
          ["Yeni sezon", "1.840 TL · 14 mesaj", "Aktif", "ok"],
          ["Randevu", "1.420 TL · 11 mesaj", "Aktif", "ok"],
          ["Hikâye", "790 TL · 5 mesaj", "Bütçe %90", "warn"],
        ] as const
      ).map(([n, sub, st, tone], i) => {
        const y = 184 + i * 64;
        return (
          <g key={n}>
            <rect x="372" y={y} width="158" height="54" rx="10" fill="#fff" />
            <text x="384" y={y + 20} fontSize="11.5" fontWeight="700" fill={C.ink}>
              {n}
            </text>
            <text x="384" y={y + 35} fontSize="9.5" fill={C.mute}>
              {sub}
            </text>
            <Pill x={384} y={y + 40} text={st} tone={tone} />
          </g>
        );
      })}
    </Svg>
  );
}

/* ---------------- Depo Takibi ---------------- */
export function DepoArt() {
  const bars = [6, 3, 5, 2, 7, 3, 4, 6, 2, 5, 3, 7, 4, 2, 6, 3];
  const items: [string, string, number, "bad" | "warn" | "ink"][] = [
    ["Kutu Ambalaj", "9 / 10", 0.18, "bad"],
    ["Etiket Rulosu", "14 / 12", 0.32, "warn"],
    ["Koli Bandı", "48 / 20", 0.62, "ink"],
    ["Kraft Kâğıt", "35 / 15", 0.5, "ink"],
  ];
  const col = (t: "bad" | "warn" | "ink") => (t === "bad" ? C.bad : t === "warn" ? C.warn : C.ink);
  let bx = 128;
  return (
    <Svg label="Örnek stok ekranı: telefonla barkod okutma, stok çıkışı ve kritik stok listesi">
      <Frame fill={C.s2} />
      <rect x="64" y="20" width="208" height="360" rx="34" fill={C.ink} />
      <rect x="72" y="28" width="192" height="344" rx="27" fill="#fff" />
      <rect x="146" y="36" width="44" height="6" rx="3" fill={C.s3} />
      <text x="90" y="66" fontSize="13" fontWeight="700" fill={C.ink}>
        Stok çıkışı
      </text>
      <text x="90" y="81" fontSize="10" fill={C.mute}>
        Merkez depo · Örnek veri
      </text>
      <rect x="90" y="92" width="156" height="82" rx="12" fill={C.s2} />
      <path d="M100 106v-8h8M228 98h8v8M100 160v8h8M236 160v8h-8" stroke={C.ink} strokeWidth="2" fill="none" />
      {bars.map((w, i) => {
        const x = bx;
        bx += w / 2 + 3.2;
        return <rect key={i} x={x} y="108" width={w / 2} height="48" fill={C.ink} />;
      })}
      <line x1="106" x2="230" y1="132" y2="132" stroke={C.bad} strokeWidth="1.5" />
      <text x="90" y="196" fontSize="12" fontWeight="700" fill={C.ink}>
        Kutu Ambalaj
      </text>
      <text x="90" y="211" fontSize="10" fill={C.mute}>
        K-104 · Mevcut stok 12 adet
      </text>
      <rect x="90.5" y="222.5" width="155" height="33" rx="16.5" fill="#fff" stroke={C.line} />
      <text x="110" y="244" fontSize="16" fill={C.ink2} textAnchor="middle">
        −
      </text>
      <text x="168" y="244" fontSize="14" fontWeight="700" fill={C.ink} textAnchor="middle">
        3
      </text>
      <text x="226" y="244" fontSize="16" fill={C.ink2} textAnchor="middle">
        +
      </text>
      <rect x="90" y="266" width="156" height="36" rx="18" fill={C.ink} />
      <text x="168" y="288" fontSize="11.5" fontWeight="700" fill="#fff" textAnchor="middle">
        Stoktan Çıkarın
      </text>
      <rect x="90" y="314" width="156" height="40" rx="10" fill={C.badBg} />
      <text x="102" y="331" fontSize="9.5" fontWeight="700" fill={C.bad}>
        Kalan stok: 9 adet
      </text>
      <text x="102" y="345" fontSize="9" fill={C.bad}>
        Ürün kritik stok seviyesinde.
      </text>
      <rect x="300.5" y="56.5" width="236" height="288" rx="16" fill="#fff" stroke={C.line} />
      <text x="318" y="86" fontSize="13" fontWeight="700" fill={C.ink}>
        Kritik stok
      </text>
      <Pill x={520} y={73} text="1 kritik" tone="bad" anchor="end" />
      <text x="318" y="106" fontSize="9.5" fill={C.mute}>
        Mevcut / kritik seviye
      </text>
      {items.map(([n, q, l, t], i) => {
        const y = 134 + i * 52;
        return (
          <g key={n}>
            <text x="318" y={y} fontSize="11.5" fontWeight="700" fill={C.ink}>
              {n}
            </text>
            <text x="518" y={y} fontSize="11" fontWeight="600" fill={col(t)} textAnchor="end">
              {q}
            </text>
            <Bar x={318} y={y + 10} w={200} />
            <Bar x={318} y={y + 10} w={200 * l} fill={col(t)} />
          </g>
        );
      })}
    </Svg>
  );
}

/* ---------------- Ürün Görsel Stüdyosu ---------------- */
export type Scene = "beyaz" | "studyo" | "sahne";

function Bottle({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-18" y="-196" width="36" height="46" rx="12" fill="#1A1A1E" />
      <rect x="-12" y="-154" width="24" height="24" rx="3" fill="#2B2B30" />
      <rect x="-36" y="-132" width="72" height="132" rx="16" fill="#3A3633" />
      <rect x="-30" y="-124" width="6" height="110" rx="3" fill="#fff" opacity="0.14" />
      <rect x="-26" y="-94" width="52" height="60" rx="4" fill="#F4F0E8" />
      <text x="0" y="-68" fontSize="12" fontWeight="800" fill={C.ink} textAnchor="middle" letterSpacing="1">
        NOVA
      </text>
      <text x="0" y="-52" fontSize="7.5" fill={C.ink2} textAnchor="middle" letterSpacing="0.6">
        SERUM
      </text>
      <text x="0" y="-42" fontSize="6.5" fill={C.mute} textAnchor="middle">
        30 ml
      </text>
    </g>
  );
}

function RawPhoto({ uid }: { uid: string }) {
  return (
    <g>
      <rect width={W} height={H} fill="#C9C4BB" />
      <rect width={W} height={H} fill={`url(#${uid}-vig)`} />
      <polygon points={`0,292 ${W},266 ${W},${H} 0,${H}`} fill="#B5AD9F" />
      <rect x="38" y="48" width="130" height="12" rx="6" fill="#ABA498" transform="rotate(-8 100 58)" />
      <rect x="420" y="70" width="70" height="90" rx="6" fill="#D6D1C8" transform="rotate(6 455 115)" />
      <circle cx="112" cy="318" r="22" fill="#9E968A" opacity="0.7" />
      <path d="M318 304 L430 288 L392 304 Z" fill="#857D71" opacity="0.7" />
      <Bottle x={280} y={302} />
      <rect width={W} height={H} fill="#F2E7C9" opacity="0.18" />
    </g>
  );
}

function Edited({ scene, uid }: { scene: Scene; uid: string }) {
  if (scene === "beyaz") {
    return (
      <g>
        <rect width={W} height={H} fill="#FFFFFF" />
        <ellipse cx="280" cy="304" rx="70" ry="9" fill="#000" opacity="0.10" filter={`url(#${uid}-soft)`} />
        <Bottle x={280} y={302} />
      </g>
    );
  }
  if (scene === "sahne") {
    return (
      <g>
        <rect width={W} height={H} fill="#EEF0EC" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={`v${i}`} x1={i * 84} x2={i * 84} y1="0" y2="262" stroke="#E1E5DF" strokeWidth="2" />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <line key={`h${i}`} x1="0" x2={W} y1={i * 66} y2={i * 66} stroke="#E1E5DF" strokeWidth="2" />
        ))}
        <rect x="0" y="262" width={W} height="46" fill="#D9CBB6" />
        <rect x="0" y="262" width={W} height="4" fill="#EADFCE" />
        <rect x="0" y="308" width={W} height={H - 308} fill="#C9B89F" />
        <rect x="70" y="180" width="64" height="82" rx="8" fill="#F7F7F5" stroke="#DADDD6" />
        <path d="M86 180c0-30 10-58 16-72 6 14 16 42 16 72z" fill="#8FA182" />
        <path d="M102 180c-4-26-20-44-34-50 10 16 18 34 20 50z" fill="#A6B697" />
        <path d="M102 180c6-24 22-40 36-44-10 14-18 30-22 44z" fill="#7F9373" />
        <rect x="410" y="214" width="96" height="48" rx="10" fill="#F2EFEA" />
        <rect x="418" y="222" width="80" height="6" rx="3" fill="#E2DDD5" />
        <rect x="418" y="234" width="80" height="6" rx="3" fill="#E2DDD5" />
        <ellipse cx="290" cy="268" rx="58" ry="7" fill="#6E5F4C" opacity="0.30" filter={`url(#${uid}-soft)`} />
        <Bottle x={290} y={268} s={0.84} />
      </g>
    );
  }
  return (
    <g>
      <rect width={W} height={H} fill={`url(#${uid}-grad)`} />
      <path d="M340 290c40-70 90-110 150-120-30 30-60 70-80 120z" fill="#9AA58A" opacity="0.5" />
      <path d="M210 296c-30-60-80-96-140-104 30 26 58 62 74 104z" fill="#AEB79E" opacity="0.5" />
      <rect x="0" y="300" width={W} height={H - 300} fill="#E9E1D6" />
      <rect x="0" y="300" width={W} height="2" fill="#F7F2EB" />
      <ellipse cx="280" cy="300" rx="104" ry="15" fill="#F7F2EB" />
      <ellipse cx="282" cy="300" rx="54" ry="7" fill="#7A6E60" opacity="0.35" filter={`url(#${uid}-soft)`} />
      <Bottle x={280} y={300} />
    </g>
  );
}

/** Önce/sonra: `pos` 0–1 arası, işlenmiş görselin soldan ne kadarının görüneceği. */
export function GorselArt({ uid, pos = 0.5, scene = "studyo", handle = true, labels = true }: { uid: string; pos?: number; scene?: Scene; handle?: boolean; labels?: boolean }) {
  const id = `g-${uid}`;
  const cut = Math.round(W * pos);
  const HY = 352;
  return (
    <Svg label="Aynı ürünün orijinal fotoğrafı ile arka planı ve ışığı düzenlenmiş satış görseli">
      <defs>
        <clipPath id={`${id}-clip`}>
          <rect x="0" y="0" width={cut} height={H} />
        </clipPath>
        <clipPath id={`${id}-frame`}>
          <rect x="0" y="0" width={W} height={H} rx="20" />
        </clipPath>
        <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EFE8DE" />
          <stop offset="1" stopColor="#DCD1C3" />
        </linearGradient>
        <radialGradient id={`${id}-vig`} cx="0.45" cy="0.4" r="0.8">
          <stop offset="0.5" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </radialGradient>
        <filter id={`${id}-soft`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <g clipPath={`url(#${id}-frame)`}>
        <RawPhoto uid={id} />
        <g clipPath={`url(#${id}-clip)`}>
          <Edited scene={scene} uid={id} />
        </g>
        {handle && (
          <>
            <line x1={cut} x2={cut} y1="0" y2={H} stroke="#fff" strokeWidth="3" />
            <circle cx={cut} cy={HY} r="17" fill="#fff" stroke={C.line} />
            <path
              d={`M${cut - 5} ${HY - 6}l-6 6 6 6M${cut + 5} ${HY - 6}l6 6-6 6`}
              stroke={C.ink}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
        {labels && (
          <>
            <rect x="16" y="16" width="74" height="26" rx="13" fill={C.ink} opacity="0.92" />
            <text x="53" y="33" fontSize="11" fontWeight="700" fill="#fff" textAnchor="middle">
              İşlenmiş
            </text>
            <rect x={W - 88} y="16" width="72" height="26" rx="13" fill="#fff" opacity="0.92" />
            <text x={W - 52} y="33" fontSize="11" fontWeight="700" fill={C.ink} textAnchor="middle">
              Orijinal
            </text>
          </>
        )}
      </g>
      <rect x="0.5" y="0.5" width={W - 1} height={H - 1} rx="20" fill="none" stroke={C.line} />
    </Svg>
  );
}

/* ---------------- Google Haritalar Karnesi ---------------- */
export const KARNE_ROWS: [string, "ok" | "warn" | "bad", string][] = [
  ["Ana kategori", "ok", "Güncel"],
  ["Çalışma saatleri", "warn", "Kontrol Gerekli"],
  ["Telefon", "ok", "Güncel"],
  ["Web sitesi bağlantısı", "bad", "Eksik Bilgi"],
  ["Profil görselleri", "warn", "Kontrol Gerekli"],
  ["Yorum temaları", "ok", "Güncel"],
];

export function KarneArt() {
  return (
    <Svg label="Örnek Google işletme profili karnesi: kategori, çalışma saatleri ve iletişim bilgisi kontrolleri">
      <WindowBar title="Profil Karnesi" right="Örnek veri" />
      <rect x="20" y="58" width="196" height="322" rx="14" fill={C.s2} />
      <rect x="20" y="58" width="196" height="96" rx="14" fill="#E3E6E0" />
      <rect x="20" y="130" width="196" height="24" fill="#E3E6E0" />
      <g stroke="#fff" strokeWidth="7" strokeLinecap="round">
        <line x1="20" x2="216" y1="104" y2="94" />
        <line x1="100" x2="92" y1="58" y2="154" />
      </g>
      <path d="M140 74c-10 0-17 7-17 16 0 12 17 26 17 26s17-14 17-26c0-9-7-16-17-16z" fill={C.ink} />
      <circle cx="140" cy="90" r="6" fill="#fff" />
      <text x="36" y="180" fontSize="13" fontWeight="800" fill={C.ink}>
        Çınar Fırın
      </text>
      <text x="36" y="196" fontSize="10" fill={C.mute}>
        Fırın · Nilüfer
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          transform={`translate(${36 + i * 15} 206) scale(0.5)`}
          d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={i < 4 ? C.ink : C.bar}
        />
      ))}
      {["Saatler", "Telefon", "Yol tarifi"].map((t, i) => (
        <g key={t}>
          <rect x={36 + i * 58} y="236" width="52" height="38" rx="9" fill="#fff" />
          <circle cx={62 + i * 58} cy="250" r="5" fill={C.ink2} />
          <text x={62 + i * 58} y="268" fontSize="8" fill={C.ink2} textAnchor="middle">
            {t}
          </text>
        </g>
      ))}
      <rect x="36" y="288" width="164" height="7" rx="3.5" fill={C.bar} />
      <rect x="36" y="302" width="130" height="7" rx="3.5" fill={C.bar} />
      <rect x="36" y="326" width="164" height="38" rx="9" fill="#fff" />
      <text x="48" y="343" fontSize="9" fontWeight="700" fill={C.ink}>
        Cumartesi
      </text>
      <text x="48" y="356" fontSize="9" fill={C.warn}>
        Saat bilgisi doğrulanmalı
      </text>
      <text x="236" y="76" fontSize="12" fontWeight="700" fill={C.ink}>
        Kontrol listesi
      </text>
      <circle cx="510" cy="72" r="16" fill="none" stroke={C.s3} strokeWidth="5" />
      <circle
        cx="510"
        cy="72"
        r="16"
        fill="none"
        stroke={C.ok}
        strokeWidth="5"
        strokeDasharray={`${(2 * Math.PI * 16 * 3) / 6} 200`}
        transform="rotate(-90 510 72)"
        strokeLinecap="round"
      />
      <text x="510" y="76" fontSize="9" fontWeight="800" fill={C.ink} textAnchor="middle">
        3/6
      </text>
      {KARNE_ROWS.map(([t, tone, st], i) => {
        const y = 98 + i * 47;
        return (
          <g key={t}>
            <rect x="232" y={y} width="308" height="39" rx="10" fill={i === 1 ? C.warnBg : C.s2} />
            <circle cx="250" cy={y + 19.5} r="7" fill={tone === "ok" ? C.ok : tone === "warn" ? C.warn : C.bad} />
            <path
              d={tone === "ok" ? `M246.5 ${y + 19.5}l2.5 2.5 4.5-5` : `M250 ${y + 15.5}v4.5M250 ${y + 22.5}v.5`}
              stroke="#fff"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            <text x="266" y={y + 23.5} fontSize="11" fontWeight="700" fill={C.ink}>
              {t}
            </text>
            <Pill x={530} y={y + 10.5} text={st} tone={tone} anchor="end" />
          </g>
        );
      })}
    </Svg>
  );
}

/* ---------------- Web Sitesi Paketi ---------------- */
export function WebArt() {
  return (
    <Svg label="Örnek web sitesi tasarımı: masaüstü ve mobil görünüm">
      <Frame fill={C.s2} />
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
        <rect key={i} x={250 + i * 42} y="100" width="32" height="6" rx="3" fill="#D2D2D8" />
      ))}
      <rect x="46" y="128" width="78" height="16" rx="8" fill={C.s2} />
      <text x="85" y="139.5" fontSize="7.5" fontWeight="700" fill={C.ink2} textAnchor="middle" letterSpacing="0.6">
        STRATEJİ
      </text>
      <text x="46" y="172" fontSize="21" fontWeight="800" fill={C.ink} letterSpacing="-0.6">
        Büyümeniz için net
      </text>
      <text x="46" y="198" fontSize="21" fontWeight="800" fill={C.ink} letterSpacing="-0.6">
        bir yol haritası.
      </text>
      <rect x="46" y="212" width="200" height="7" rx="3.5" fill="#D2D2D8" />
      <rect x="46" y="226" width="160" height="7" rx="3.5" fill="#D2D2D8" />
      <rect x="46" y="244" width="96" height="26" rx="13" fill={C.ink} />
      <text x="94" y="261" fontSize="9.5" fontWeight="700" fill="#fff" textAnchor="middle">
        Görüşme Planla
      </text>
      <rect x="148.5" y="244.5" width="66" height="25" rx="12.5" fill="#fff" stroke={C.line} />
      <text x="181.5" y="261" fontSize="9.5" fontWeight="700" fill={C.ink} textAnchor="middle">
        Hizmetler
      </text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={46 + i * 112} y="284" width="102" height="42" rx="10" fill={C.s2} />
          <rect x={58 + i * 112} y="298" width="50" height="6" rx="3" fill={C.bar} />
          <rect x={58 + i * 112} y="310" width="70" height="5" rx="2.5" fill={C.s3} />
        </g>
      ))}
      <rect x="396" y="128" width="140" height="252" rx="24" fill={C.ink} />
      <rect x="403" y="135" width="126" height="238" rx="18" fill="#fff" />
      <rect x="448" y="141" width="36" height="5" rx="2.5" fill={C.s3} />
      <text x="416" y="166" fontSize="9" fontWeight="800" fill={C.ink}>
        Lina Salon
      </text>
      <path d="M506 160h12M506 164h12M506 168h12" stroke={C.ink} strokeWidth="1.5" strokeLinecap="round" />
      <text x="416" y="196" fontSize="14" fontWeight="800" fill={C.ink} letterSpacing="-0.4">
        Kendinize
      </text>
      <text x="416" y="214" fontSize="14" fontWeight="800" fill={C.ink} letterSpacing="-0.4">
        zaman ayırın.
      </text>
      <rect x="416" y="226" width="66" height="20" rx="10" fill={C.ink} />
      <text x="449" y="239.5" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">
        Randevu Al
      </text>
      <rect x="416" y="256" width="100" height="58" rx="8" fill="#EDE6E0" />
      <circle cx="440" cy="280" r="9" fill="#DCCFC5" />
      <path d="M422 310l24-18 16 12 12-8 22 14z" fill="#D2C3B7" />
      <rect x="416" y="322" width="100" height="16" rx="5" fill={C.s2} />
      <rect x="416" y="344" width="100" height="16" rx="5" fill={C.s2} />
    </Svg>
  );
}

/* ---------------- Görüşme Özeti ---------------- */
export function GorusmeArt() {
  const wave = Array.from({ length: 46 }, (_, i) => 4 + Math.abs(Math.sin(i * 0.9) * 10 + Math.sin(i * 0.37) * 6));
  const lines: [string, string, number][] = [
    ["Müşteri", "Ürün listesini haftalık güncellemek istiyoruz.", 0],
    ["Siz", "Listeyi hangi gün paylaşalım?", 1],
    ["Müşteri", "Pazartesi sabahları uygun olur.", 0],
    ["Siz", "Onay kimde olacak?", 1],
  ];
  return (
    <Svg label="Örnek görüşme özeti: konuşma dökümü ile talepler, açık sorular ve sonraki adımlar">
      <WindowBar title="Görüşme Özeti" right="Örnek görüşme" />
      <rect x="20" y="56" width="258" height="48" rx="12" fill={C.s2} />
      <circle cx="44" cy="80" r="12" fill={C.ink} />
      <path d="M41 74.5v11l9-5.5z" fill="#fff" />
      {wave.map((h, i) => (
        <rect key={i} x={64 + i * 4.4} y={80 - h / 2} width="2.4" height={h} rx="1.2" fill={i < 18 ? C.ink : C.bar} />
      ))}
      <text x="20" y="128" fontSize="11" fontWeight="700" fill={C.ink}>
        Konuşma dökümü
      </text>
      {lines.map(([who, t, side], i) => {
        const y = 140 + i * 58;
        return (
          <g key={i}>
            <text x={side ? 276 : 22} y={y + 8} fontSize="9" fontWeight="700" fill={C.mute} textAnchor={side ? "end" : "start"}>
              {who}
            </text>
            <rect x={side ? 64 : 20} y={y + 14} width="214" height="32" rx="10" fill={side ? C.ink : C.s2} />
            <text x={side ? 76 : 32} y={y + 34} fontSize="9.5" fill={side ? "#fff" : C.ink}>
              {t}
            </text>
          </g>
        );
      })}
      <rect x="294.5" y="56.5" width="246" height="324" rx="14" fill="#fff" stroke={C.line} />
      <text x="312" y="82" fontSize="12" fontWeight="800" fill={C.ink}>
        Özet
      </text>
      <Pill x={526} y={69} text="İnceleme Gerekli" tone="warn" anchor="end" />
      {(
        [
          ["Talep", "Ürün listesi haftalık güncellensin."],
          ["Karar", "Liste pazartesi sabahı paylaşılacak."],
          ["Açık soru", "Listeyi kim onaylayacak?"],
          ["Sonraki adım", "Örnek listeyi ekip incelemesine gönderin."],
        ] as const
      ).map(([k, v], i) => {
        const y = 98 + i * 66;
        return (
          <g key={k}>
            <rect x="308" y={y} width="218" height="56" rx="10" fill={i === 2 ? C.warnBg : C.s2} />
            <text x="320" y={y + 20} fontSize="9" fontWeight="800" fill={i === 2 ? C.warn : C.mute} letterSpacing="0.4">
              {k.toLocaleUpperCase("tr")}
            </text>
            <text x="320" y={y + 39} fontSize="10" fontWeight="600" fill={C.ink}>
              {v}
            </text>
          </g>
        );
      })}
    </Svg>
  );
}

/* ---------------- Belge Okuma ---------------- */
export function BelgeArt() {
  return (
    <Svg label="Örnek irsaliye belgesi ile çıkarılan tarih, ürün kodu ve miktar alanları">
      <Frame fill={C.s2} />
      <g transform="rotate(-2 150 210)">
        <rect x="34" y="40" width="232" height="330" rx="6" fill="#fff" stroke={C.line} />
        <text x="54" y="74" fontSize="14" fontWeight="800" fill={C.ink} letterSpacing="1.5">
          İRSALİYE
        </text>
        <text x="246" y="74" fontSize="8.5" fill={C.mute} textAnchor="end">
          No: IR-2611
        </text>
        <rect x="54" y="88" width="90" height="5" rx="2.5" fill={C.s3} />
        <rect x="54" y="99" width="70" height="5" rx="2.5" fill={C.s3} />
        <text x="166" y="98" fontSize="9" fill={C.ink2}>
          Tarih: 14 Kasım
        </text>
        <rect x="160" y="85" width="88" height="20" rx="4" fill="none" stroke={C.ink} strokeWidth="1.4" />
        <line x1="54" x2="246" y1="124" y2="124" stroke={C.ink} />
        {["Kod", "Ürün", "Miktar"].map((h, i) => (
          <text key={h} x={[54, 104, 246][i]} y="140" fontSize="8.5" fontWeight="700" fill={C.ink} textAnchor={i === 2 ? "end" : "start"}>
            {h}
          </text>
        ))}
        <line x1="54" x2="246" y1="148" y2="148" stroke={C.line} />
        {(
          [
            ["K-104", "Kutu Ambalaj", "12"],
            ["E-220", "Etiket Rulosu", "6"],
            ["B-310", "Koli Bandı", "24"],
            ["P-118", "Kraft Kâğıt", "10"],
          ] as const
        ).map(([k, n, q], i) => {
          const y = 166 + i * 26;
          return (
            <g key={k}>
              {i === 0 && <rect x="48" y={y - 13} width="204" height="20" rx="4" fill="none" stroke={C.ink} strokeWidth="1.4" />}
              <text x="54" y={y} fontSize="9" fill={C.ink}>
                {k}
              </text>
              <text x="104" y={y} fontSize="9" fill={C.ink2}>
                {n}
              </text>
              <text x="246" y={y} fontSize="9" fontWeight="700" fill={C.ink} textAnchor="end">
                {q}
              </text>
            </g>
          );
        })}
        <line x1="54" x2="246" y1="280" y2="280" stroke={C.line} />
        <rect x="54" y="296" width="120" height="5" rx="2.5" fill={C.s3} />
        <rect x="54" y="308" width="90" height="5" rx="2.5" fill={C.s3} />
        <path d="M186 330c8-14 14-14 18-4s10 10 16-2 12-6 16 0" stroke={C.ink2} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </g>
      <path d="M254 96 C290 96 288 112 318 112" stroke={C.mute} strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
      <path d="M254 156 C290 156 288 176 318 176" stroke={C.mute} strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
      <rect x="306.5" y="48.5" width="230" height="304" rx="14" fill="#fff" stroke={C.line} />
      <text x="324" y="74" fontSize="12" fontWeight="800" fill={C.ink}>
        Çıkarılan alanlar
      </text>
      <text x="324" y="90" fontSize="9" fill={C.mute}>
        Örnek veri
      </text>
      {(
        [
          ["Tarih", "14 Kasım", "ok"],
          ["Ürün kodu", "K-104", "ok"],
          ["Miktar", "12", "warn"],
          ["Belge no", "IR-2611", "ok"],
        ] as const
      ).map(([k, v, tone], i) => {
        const y = 100 + i * 52;
        return (
          <g key={k}>
            <text x="324" y={y + 12} fontSize="9" fontWeight="700" fill={C.mute}>
              {k}
            </text>
            <rect x="324.5" y={y + 18.5} width="194" height="26" rx="8" fill={tone === "warn" ? C.warnBg : C.s2} stroke={tone === "warn" ? C.warn : "none"} />
            <text x="336" y={y + 35.5} fontSize="10.5" fontWeight="700" fill={C.ink}>
              {v}
            </text>
            {tone === "warn" ? (
              <Pill x={512} y={y + 22.5} text="Kontrol Gerekli" tone="warn" anchor="end" />
            ) : (
              <path d={`M500 ${y + 31.5}l3.5 3.5 6-7`} stroke={C.ok} strokeWidth="2" fill="none" strokeLinecap="round" />
            )}
          </g>
        );
      })}
      <rect x="324" y="310" width="194" height="30" rx="15" fill={C.ink} />
      <text x="421" y="329" fontSize="10.5" fontWeight="700" fill="#fff" textAnchor="middle">
        Kaydı Onaylayın
      </text>
    </Svg>
  );
}

/* ---------------- Müşteri Asistanı ---------------- */
export function AsistanArt() {
  return (
    <Svg label="Örnek müşteri asistanı sohbeti: çalışma saatleri yanıtı ve özel talebin ekibe aktarılması">
      <Frame fill={C.s2} />
      <rect x="24.5" y="24.5" width="330" height="352" rx="18" fill="#fff" stroke={C.line} />
      <circle cx="52" cy="54" r="14" fill={C.ink} />
      <path d="M46 52h12M46 57h8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <text x="74" y="51" fontSize="12" fontWeight="800" fill={C.ink}>
        Müşteri Asistanı
      </text>
      <circle cx="78" cy="63" r="3" fill={C.ok} />
      <text x="86" y="66" fontSize="9" fill={C.mute}>
        Örnek konuşma
      </text>
      <line x1="24" x2="354" y1="82" y2="82" stroke={C.line} />
      <rect x="40" y="96" width="196" height="30" rx="12" fill={C.s2} />
      <text x="52" y="115" fontSize="10" fill={C.ink}>
        Merhaba, size nasıl yardımcı olabilirim?
      </text>
      <rect x="194" y="138" width="144" height="30" rx="12" fill={C.ink} />
      <text x="206" y="157" fontSize="10" fill="#fff">
        Cumartesi açık mısınız?
      </text>
      <rect x="40" y="180" width="236" height="52" rx="12" fill={C.s2} />
      <text x="52" y="199" fontSize="10" fill={C.ink}>
        Evet, cumartesi 10.00 – 18.00 arası
      </text>
      <text x="52" y="213" fontSize="10" fill={C.ink}>
        açığız.
      </text>
      <rect x="52" y="219" width="118" height="9" rx="4.5" fill="#fff" />
      <text x="58" y="226" fontSize="7" fontWeight="700" fill={C.mute}>
        Kaynak: Çalışma saatleri
      </text>
      <rect x="128" y="244" width="210" height="30" rx="12" fill={C.ink} />
      <text x="140" y="263" fontSize="10" fill="#fff">
        Toplu siparişte özel fiyat var mı?
      </text>
      <rect x="40" y="286" width="246" height="52" rx="12" fill={C.warnBg} />
      <text x="52" y="305" fontSize="10" fill={C.ink}>
        Bu konuda ekibimiz yardımcı olur.
      </text>
      <rect x="52" y="314" width="76" height="17" rx="8.5" fill={C.ink} />
      <text x="90" y="326" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">
        Ekibe Aktar
      </text>
      <rect x="40.5" y="348.5" width="298" height="16" rx="8" fill="#fff" stroke={C.line} />
      <text x="52" y="360" fontSize="8.5" fill={C.mute}>
        Sorunuzu yazın…
      </text>
      <rect x="370.5" y="24.5" width="166" height="214" rx="16" fill="#fff" stroke={C.line} />
      <text x="386" y="52" fontSize="11" fontWeight="800" fill={C.ink}>
        Onaylı kaynaklar
      </text>
      {["Çalışma saatleri", "Teslimat koşulları", "Ürün kullanım rehberi", "Sık sorulan sorular"].map((t, i) => (
        <g key={t}>
          <rect x="384" y={66 + i * 40} width="138" height="30" rx="8" fill={C.s2} />
          <path d={`M396 ${76 + i * 40}h8v10h-8z`} fill="none" stroke={C.ink2} strokeWidth="1.3" />
          <text x="412" y={85 + i * 40} fontSize="9" fontWeight="600" fill={C.ink}>
            {t}
          </text>
        </g>
      ))}
      <rect x="370.5" y="252.5" width="166" height="124" rx="16" fill="#fff" stroke={C.line} />
      <text x="386" y="278" fontSize="11" fontWeight="800" fill={C.ink}>
        Ekibe devir
      </text>
      {["Özel fiyat", "İstisna talebi", "Şikâyet"].map((t, i) => (
        <g key={t}>
          <circle cx="392" cy={298 + i * 24} r="3.5" fill={C.warn} />
          <text x="402" y={301 + i * 24} fontSize="9.5" fill={C.ink2}>
            {t}
          </text>
        </g>
      ))}
    </Svg>
  );
}

/* ---------------- Müşteri Bulma ---------------- */
export function MusteriArt() {
  const rows: [string, string, string, string, "ok" | "warn" | "mute"][] = [
    ["Ege Mobilya", "Mobilya · Bursa", "Yüksek", "Takibe Alındı", "ok"],
    ["Kuzey Matbaa", "Matbaa · İzmir", "Yüksek", "İncelenecek", "mute"],
    ["Atlas Gıda", "Toptan · Bursa", "Orta", "İncelenecek", "mute"],
    ["Mavi Tekstil", "Tekstil · Bursa", "Orta", "Tamamlandı", "warn"],
  ];
  return (
    <Svg label="Örnek satış takip listesi: sektör ve bölgeye göre filtrelenmiş kurgusal işletmeler">
      <WindowBar title="Müşteri Bulma" right="Örnek veri" />
      {(["Sektör: Üretim", "Bölge: Bursa", "Öncelik: Yüksek"] as const).map((t, i) => (
        <g key={t}>
          <rect x={20 + i * 132} y="56" width="122" height="28" rx="14" fill={i === 0 ? C.ink : C.s2} />
          <text x={81 + i * 132} y="74" fontSize="10" fontWeight="700" fill={i === 0 ? "#fff" : C.ink} textAnchor="middle">
            {t}
          </text>
        </g>
      ))}
      <rect x="420.5" y="56.5" width="119" height="27" rx="13.5" fill="#fff" stroke={C.line} />
      <text x="480" y="74" fontSize="10" fontWeight="700" fill={C.ink2} textAnchor="middle">
        Filtreleri Temizleyin
      </text>
      <rect x="20" y="98" width="520" height="282" rx="12" fill={C.s2} />
      {["İşletme", "Öncelik", "Sorumlu", "Sonraki adım", "Durum"].map((h, i) => (
        <text key={h} x={[36, 222, 290, 360, 524][i]} y="122" fontSize="9" fontWeight="700" fill={C.mute} textAnchor={i === 4 ? "end" : "start"}>
          {h.toLocaleUpperCase("tr")}
        </text>
      ))}
      {rows.map(([n, sub, pr, st, tone], i) => {
        const y = 136 + i * 60;
        return (
          <g key={n}>
            <rect x="28" y={y} width="504" height="50" rx="10" fill="#fff" />
            <circle cx="52" cy={y + 25} r="13" fill={C.s3} />
            <text x="52" y={y + 29} fontSize="10" fontWeight="800" fill={C.ink2} textAnchor="middle">
              {n[0]}
            </text>
            <text x="74" y={y + 22} fontSize="11" fontWeight="700" fill={C.ink}>
              {n}
            </text>
            <text x="74" y={y + 37} fontSize="9" fill={C.mute}>
              {sub}
            </text>
            <text x="222" y={y + 29} fontSize="10" fontWeight="700" fill={pr === "Yüksek" ? C.ink : C.ink2}>
              {pr}
            </text>
            <circle cx="298" cy={y + 25} r="9" fill={C.ink} opacity={i % 2 ? 0.55 : 1} />
            <text x="298" y={y + 28.5} fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">
              {["AY", "MK", "AY", "SE"][i]}
            </text>
            <text x="360" y={y + 29} fontSize="9.5" fill={C.ink2}>
              {["Teklif sunumu", "İlk arama", "Katalog paylaşımı", "—"][i]}
            </text>
            <Pill x={524} y={y + 16} text={st} tone={tone === "mute" ? "mute" : tone === "ok" ? "ok" : "ink"} anchor="end" />
          </g>
        );
      })}
    </Svg>
  );
}

/* ---------------- İşletmeye Özel (süreç şeması) ---------------- */
export function OzelArt({ uid = "ozel" }: { uid?: string }) {
  const m = `${uid}-arrow`;
  return (
    <Svg label="Birden fazla dosyaya işlenen bir siparişin tek veri girişi ve kontrol adımına indirildiği örnek süreç şeması">
      <Frame fill={C.s2} />
      <defs>
        <marker id={m} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={C.mute} />
        </marker>
      </defs>
      <text x="28" y="44" fontSize="10" fontWeight="800" fill={C.mute} letterSpacing="0.6">
        BUGÜN
      </text>
      <text x="312" y="44" fontSize="10" fontWeight="800" fill={C.mute} letterSpacing="0.6">
        ÖZEL ÇÖZÜMDE
      </text>
      <line x1="280" x2="280" y1="30" y2="376" stroke={C.line} strokeDasharray="4 5" />
      <rect x="28" y="62" width="96" height="40" rx="10" fill={C.ink} />
      <text x="76" y="80" fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle">
        Yeni sipariş
      </text>
      <text x="76" y="93" fontSize="8.5" fill="#fff" opacity="0.7" textAnchor="middle">
        #2611
      </text>
      {(
        [
          ["Sipariş tablosu", "Excel"],
          ["Durum tablosu", "Excel"],
          ["Ekip mesajı", "WhatsApp"],
        ] as const
      ).map(([t, s], i) => {
        const y = 140 + i * 74;
        return (
          <g key={t}>
            <path d={`M76 102 C76 ${y - 10} 120 ${y + 24} 150 ${y + 24}`} stroke={C.mute} strokeWidth="1.2" fill="none" markerEnd={`url(#${m})`} />
            <rect x="152.5" y={y + 0.5} width="108" height="48" rx="10" fill="#fff" stroke={C.line} />
            <text x="166" y={y + 21} fontSize="10" fontWeight="700" fill={C.ink}>
              {t}
            </text>
            <text x="166" y={y + 36} fontSize="8.5" fill={C.mute}>
              {s} · elle giriş
            </text>
          </g>
        );
      })}
      <text x="28" y="370" fontSize="9" fill={C.bad} fontWeight="700">
        Aynı bilgi 3 kez yazılıyor
      </text>
      <rect x="312" y="62" width="96" height="40" rx="10" fill={C.ink} />
      <text x="360" y="80" fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle">
        Yeni sipariş
      </text>
      <text x="360" y="93" fontSize="8.5" fill="#fff" opacity="0.7" textAnchor="middle">
        #2611
      </text>
      <path d="M360 102 V128" stroke={C.mute} strokeWidth="1.2" markerEnd={`url(#${m})`} />
      <rect x="312.5" y="130.5" width="214" height="126" rx="14" fill="#fff" stroke={C.ink} strokeWidth="1.4" />
      <text x="328" y="154" fontSize="11" fontWeight="800" fill={C.ink}>
        Sipariş paneli
      </text>
      <text x="510" y="154" fontSize="8.5" fill={C.mute} textAnchor="end">
        tek veri girişi
      </text>
      {(
        [
          ["Onay bekliyor", "warn"],
          ["Hazırlanıyor", "mute"],
          ["Kargoda", "ok"],
        ] as const
      ).map(([t, tone], i) => (
        <g key={t}>
          <rect x="328" y={166 + i * 28} width="182" height="22" rx="7" fill={C.s2} />
          <text x="338" y={181 + i * 28} fontSize="9.5" fill={C.ink}>
            #{2611 - i * 3}
          </text>
          <Pill x={504} y={168 + i * 28} text={t} tone={tone} anchor="end" />
        </g>
      ))}
      <path d="M420 258 V284" stroke={C.mute} strokeWidth="1.2" markerEnd={`url(#${m})`} />
      <rect x="312.5" y="286.5" width="214" height="50" rx="12" fill="#fff" stroke={C.line} />
      <text x="328" y="307" fontSize="10" fontWeight="700" fill={C.ink}>
        Gün sonu özeti
      </text>
      <text x="328" y="322" fontSize="8.5" fill={C.mute}>
        Aynı veriden otomatik hazırlanır
      </text>
      <text x="312" y="370" fontSize="9" fill={C.ok} fontWeight="700">
        Kontrol adımı: ekip onayı
      </text>
    </Svg>
  );
}

export function ProductArt({ kind, uid = "x", pos = 0.5, scene = "studyo" }: { kind: ArtKind; uid?: string; pos?: number; scene?: Scene }) {
  switch (kind) {
    case "gorsel":
      return <GorselArt uid={uid} pos={pos} scene={scene} />;
    case "meta":
      return <MetaArt />;
    case "depo":
      return <DepoArt />;
    case "karne":
      return <KarneArt />;
    case "web":
      return <WebArt />;
    case "gorusme":
      return <GorusmeArt />;
    case "belge":
      return <BelgeArt />;
    case "asistan":
      return <AsistanArt />;
    case "musteri":
      return <MusteriArt />;
    default:
      return <OzelArt uid={uid} />;
  }
}

/* ---------------- Ana sayfa kompozisyonu (üç küçük ekran) ---------------- */
export function HeroStudioCard() {
  return (
    <Svg vb="0 0 300 250" cls="hsvg">
      <defs>
        <linearGradient id="hs-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EFE8DE" />
          <stop offset="1" stopColor="#DCD1C3" />
        </linearGradient>
        <clipPath id="hs-c">
          <rect width="300" height="250" rx="18" />
        </clipPath>
      </defs>
      <g clipPath="url(#hs-c)">
        <rect width="300" height="250" fill="url(#hs-g)" />
        <rect y="190" width="300" height="60" fill="#E9E1D6" />
        <ellipse cx="150" cy="190" rx="70" ry="11" fill="#F7F2EB" />
        <g transform="translate(150 190) scale(0.62)">
          <rect x="-18" y="-196" width="36" height="46" rx="12" fill="#1A1A1E" />
          <rect x="-12" y="-154" width="24" height="24" rx="3" fill="#2B2B30" />
          <rect x="-36" y="-132" width="72" height="132" rx="16" fill="#3A3633" />
          <rect x="-26" y="-94" width="52" height="60" rx="4" fill="#F4F0E8" />
          <text x="0" y="-62" fontSize="12" fontWeight="800" fill={C.ink} textAnchor="middle" letterSpacing="1">
            NOVA
          </text>
        </g>
        <path d="M200 192c22-40 50-60 84-66-16 16-34 38-44 66z" fill="#9AA58A" opacity="0.5" />
        <rect x="12" y="12" width="112" height="24" rx="12" fill="#fff" opacity="0.94" />
        <text x="68" y="28" fontSize="10.5" fontWeight="700" fill={C.ink} textAnchor="middle">
          Ürün Görsel Stüdyosu
        </text>
        <rect x="12" y="214" width="74" height="22" rx="11" fill={C.ink} />
        <text x="49" y="229" fontSize="9.5" fontWeight="700" fill="#fff" textAnchor="middle">
          İşlenmiş
        </text>
      </g>
      <rect x="0.5" y="0.5" width="299" height="249" rx="18" fill="none" stroke={C.line} />
    </Svg>
  );
}

export function HeroAdsCard() {
  const v = [5, 7, 6, 8, 11, 9, 6];
  return (
    <Svg vb="0 0 300 190" cls="hsvg">
      <rect x="0.5" y="0.5" width="299" height="189" rx="18" fill="#fff" stroke={C.line} />
      <text x="18" y="30" fontSize="11.5" fontWeight="800" fill={C.ink}>
        Reklam Performansı
      </text>
      <text x="282" y="30" fontSize="9" fill={C.mute} textAnchor="end">
        Son 7 gün
      </text>
      {(
        [
          ["Harcama", "4.050 TL"],
          ["Sonuç", "30 mesaj"],
          ["Birim", "135 TL"],
        ] as const
      ).map(([k, val], i) => (
        <g key={k}>
          <text x={18 + i * 94} y="56" fontSize="9" fill={C.mute}>
            {k}
          </text>
          <text x={18 + i * 94} y="76" fontSize="15" fontWeight="800" fill={C.ink} letterSpacing="-0.4">
            {val}
          </text>
        </g>
      ))}
      {v.map((h, i) => (
        <rect key={i} x={20 + i * 38} y={172 - h * 6} width="24" height={h * 6} rx="5" fill={i === 4 ? C.ink : C.bar} />
      ))}
      <rect x="112" y="84" width="70" height="17" rx="8.5" fill={C.okBg} />
      <text x="147" y="96" fontSize="9" fontWeight="700" fill={C.ok} textAnchor="middle">
        +6 mesaj
      </text>
    </Svg>
  );
}

export function HeroStockCard() {
  return (
    <Svg vb="0 0 170 300" cls="hsvg">
      <rect x="2" y="2" width="166" height="296" rx="28" fill={C.ink} />
      <rect x="9" y="9" width="152" height="282" rx="22" fill="#fff" />
      <rect x="64" y="16" width="42" height="5" rx="2.5" fill={C.s3} />
      <text x="22" y="46" fontSize="11" fontWeight="800" fill={C.ink}>
        Stok Hareketleri
      </text>
      {(
        [
          ["Kutu Ambalaj", "−3", "Çıkış", C.bad],
          ["Koli Bandı", "+24", "Giriş", C.ok],
          ["Etiket Rulosu", "−2", "Çıkış", C.bad],
          ["Kraft Kâğıt", "+10", "Giriş", C.ok],
        ] as const
      ).map(([n, q, t, col], i) => (
        <g key={n}>
          <rect x="20" y={60 + i * 46} width="130" height="38" rx="9" fill={C.s2} />
          <text x="30" y={76 + i * 46} fontSize="9" fontWeight="700" fill={C.ink}>
            {n}
          </text>
          <text x="30" y={89 + i * 46} fontSize="8" fill={C.mute}>
            {t} · 14:3{i}
          </text>
          <text x="142" y={84 + i * 46} fontSize="11" fontWeight="800" fill={col} textAnchor="end">
            {q}
          </text>
        </g>
      ))}
      <rect x="20" y="250" width="130" height="28" rx="14" fill={C.badBg} />
      <text x="85" y="268" fontSize="9" fontWeight="700" fill={C.bad} textAnchor="middle">
        1 ürün kritik seviyede
      </text>
    </Svg>
  );
}

/* ---------------- Sektör çizimleri ---------------- */
const L = { stroke: C.ink, strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const LN = { ...L, fill: "none" };

export function SectorArt({ slug }: { slug: string }) {
  const bg = (
    <>
      <rect x="0" y="0" width="320" height="200" rx="18" fill={C.s2} />
      <line x1="30" x2="290" y1="168" y2="168" stroke={C.bar} strokeWidth="2" strokeLinecap="round" />
    </>
  );
  let body: ReactNode = null;
  if (slug === "kuafor-ve-guzellik") {
    body = (
      <>
        <ellipse cx="112" cy="78" rx="38" ry="48" fill="#fff" {...L} />
        <ellipse cx="112" cy="78" rx="28" ry="38" fill={C.s3} stroke="none" />
        <path d="M112 126v20M92 168h40l-6-22h-28z" {...L} fill="#fff" />
        <path d="M188 168v-46h44v46M180 122h60M196 122c0-18 4-30 14-30s14 12 14 30" {...L} fill="#fff" />
        <circle cx="262" cy="70" r="8" {...LN} />
        <circle cx="262" cy="98" r="8" {...LN} />
        <path d="M268 76l22 -26M268 92l22 26" {...LN} />
        <path d="M58 40l4 8 8 2-8 3-4 8-3-8-8-3 8-2z" fill={C.ink} />
      </>
    );
  } else if (slug === "kafe-ve-restoran") {
    body = (
      <>
        <rect x="186" y="34" width="96" height="82" rx="8" fill={C.ink} />
        <text x="234" y="56" fontSize="11" fontWeight="800" fill="#fff" textAnchor="middle" letterSpacing="1">
          MENÜ
        </text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="198" y={68 + i * 14} width="44" height="4" rx="2" fill="#fff" opacity="0.7" />
            <rect x="254" y={68 + i * 14} width="16" height="4" rx="2" fill="#fff" opacity="0.7" />
          </g>
        ))}
        <path d="M234 116v52" {...LN} />
        <path d="M74 110h76v26a24 24 0 0 1-24 24h-28a24 24 0 0 1-24-24z" {...L} fill="#fff" />
        <path d="M150 118h10a12 12 0 0 1 0 24h-8" {...LN} />
        <path d="M60 168h104" {...LN} />
        <path d="M96 96c-6-8 6-14 0-24M114 96c-6-8 6-14 0-24" {...LN} stroke={C.mute} />
      </>
    );
  } else if (slug === "perakende") {
    body = (
      <>
        <path d="M70 168V82h180v86" {...L} fill="#fff" />
        <path d="M62 82l14-34h168l14 34z" fill={C.ink} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${62 + i * 33} 82q16 18 33 0`} fill={i % 2 ? "#fff" : C.ink} stroke={C.ink} strokeWidth="2" />
        ))}
        <rect x="88" y="112" width="70" height="56" rx="4" {...L} fill={C.s3} />
        <rect x="176" y="112" width="52" height="56" rx="4" {...L} fill="#fff" />
        <rect x="100" y="132" width="16" height="22" rx="3" fill={C.ink2} />
        <rect x="124" y="140" width="22" height="14" rx="3" fill={C.bar} />
        <circle cx="218" cy="142" r="3" fill={C.ink} />
      </>
    );
  } else if (slug === "e-ticaret") {
    body = (
      <>
        <rect x="150" y="30" width="134" height="96" rx="10" {...L} fill="#fff" />
        <path d="M150 50h134" {...LN} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={162 + i * 40} y="62" width="30" height="30" rx="5" fill={C.s3} />
            <rect x={162 + i * 40} y="98" width="22" height="4" rx="2" fill={C.bar} />
            <rect x={162 + i * 40} y="106" width="14" height="4" rx="2" fill={C.ink} />
          </g>
        ))}
        <path d="M44 74h16l14 62h56l12-44H70" {...LN} />
        <circle cx="82" cy="152" r="8" {...L} fill="#fff" />
        <circle cx="122" cy="152" r="8" {...L} fill="#fff" />
        <path d="M206 138l34-14 34 14-34 14z M206 138v26l34 14 34-14v-26M240 152v26" {...L} fill="#fff" />
      </>
    );
  } else if (slug === "toptanci-ve-depo") {
    body = (
      <>
        <path d="M40 168V48M150 168V48M40 92h110M40 132h110" {...LN} />
        {[
          [50, 62],
          [96, 62],
          [50, 102],
          [96, 102],
          [74, 142],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="40" height="28" rx="3" fill={i === 1 ? C.ink : "#fff"} {...(i === 1 ? {} : L)} />
        ))}
        <path d="M176 168v-66h62l26 30v36z" {...L} fill="#fff" />
        <path d="M238 102v30h26" {...LN} />
        <circle cx="196" cy="168" r="12" {...L} fill="#fff" />
        <circle cx="248" cy="168" r="12" {...L} fill="#fff" />
        <rect x="188" y="116" width="36" height="22" rx="3" fill={C.s3} />
      </>
    );
  } else {
    body = (
      <>
        <path d="M60 168V70h120v98" {...L} fill="#fff" />
        <path d="M52 70l68-36 68 36" {...LN} />
        <rect x="108" y="84" width="24" height="24" rx="4" fill={C.ink} />
        <path d="M120 89v14M113 96h14" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <rect x="104" y="128" width="32" height="40" rx="3" {...L} fill={C.s3} />
        <rect x="74" y="122" width="18" height="18" rx="3" {...LN} />
        <rect x="148" y="122" width="18" height="18" rx="3" {...LN} />
        <rect x="204" y="62" width="78" height="80" rx="10" {...L} fill="#fff" />
        <path d="M204 84h78M222 54v16M264 54v16" {...LN} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={214 + (i % 3) * 22} y={96 + Math.floor(i / 3) * 20} width="14" height="12" rx="3" fill={i === 4 ? C.ink : C.s3} />
        ))}
      </>
    );
  }
  return (
    <Svg vb="0 0 320 200" cls="ssvg">
      {bg}
      {body}
    </Svg>
  );
}

/* ---------------- Hizmet kartı çizimi ---------------- */
export function ServiceArt({ icon, title, items }: { icon: ReactNode; title: string; items: string[] }) {
  return (
    <div className="svc-art" aria-hidden="true">
      <div className="svc-art-head">
        <span className="svc-art-ic">{icon}</span>
        <b>{title}</b>
      </div>
      <ul>
        {items.map((t, i) => (
          <li key={t}>
            <i className={i === 0 ? "on" : ""}></i>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Girişim Destek Programı ---------------- */
export const VEST: [string, string][] = [
  ["Teslim", "%0,5"],
  ["3. ay", "%0,875"],
  ["6. ay", "%1,25"],
  ["9. ay", "%1,625"],
  ["12. ay", "%2"],
];

export function StartupArt() {
  const pts = VEST.map((_, i) => [250 + i * 66, 300 - i * 44] as const);
  return (
    <Svg label="Girişim destek programı: web sitesinin yayına alınmasından 12. aya kadar kademeli hak edilen pay">
      <Frame fill={C.s2} />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="232" x2="536" y1={120 + i * 52} y2={120 + i * 52} stroke={C.line} strokeDasharray="3 5" />
      ))}
      <rect x="24.5" y="94.5" width="196" height="232" rx="16" fill="#fff" stroke={C.line} />
      {[38, 48, 58].map((x) => (
        <circle key={x} cx={x} cy="110" r="3" fill="#DADAE0" />
      ))}
      <line x1="24" x2="220" y1="122" y2="122" stroke={C.line} />
      <text x="40" y="146" fontSize="10" fontWeight="800" fill={C.ink}>
        Nova Lojistik
      </text>
      <text x="40" y="176" fontSize="14" fontWeight="800" fill={C.ink} letterSpacing="-0.4">
        Yük takibini
      </text>
      <text x="40" y="194" fontSize="14" fontWeight="800" fill={C.ink} letterSpacing="-0.4">
        tek ekrana alın.
      </text>
      <rect x="40" y="206" width="130" height="6" rx="3" fill={C.bar} />
      <rect x="40" y="218" width="100" height="6" rx="3" fill={C.s3} />
      <rect x="40" y="236" width="76" height="22" rx="11" fill={C.ink} />
      <text x="78" y="251" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">
        Demo İsteyin
      </text>
      {[0, 1].map((i) => (
        <rect key={i} x={40 + i * 86} y="272" width="78" height="38" rx="9" fill={C.s2} />
      ))}
      <Pill x={40} y={64} text="Yayında" tone="ok" />
      <text x="232" y="64" fontSize="12" fontWeight="800" fill={C.ink}>
        Kademeli hak ediş
      </text>
      <text x="232" y="81" fontSize="9.5" fill={C.mute}>
        12 ay destek · toplam %2 pay
      </text>
      <polyline points={pts.map(([x, y]) => `${x},${y}`).join(" ")} fill="none" stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path d={`M${pts[0][0]} ${pts[0][1]} ${pts.map(([x, y]) => `L${x} ${y}`).join(" ")} L${pts[4][0]} 330 L${pts[0][0]} 330Z`} fill={C.ink} opacity="0.05" />
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 4 ? 9 : 6} fill={i === 4 ? C.ink : "#fff"} stroke={C.ink} strokeWidth="2.5" />
          <text x={x} y={y - 16} fontSize="10.5" fontWeight="800" fill={C.ink} textAnchor="middle">
            {VEST[i][1]}
          </text>
          <text x={x} y="352" fontSize="9.5" fill={C.mute} textAnchor="middle">
            {VEST[i][0]}
          </text>
        </g>
      ))}
      <line x1="232" x2="536" y1="334" y2="334" stroke={C.bar} />
    </Svg>
  );
}
