"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { GorselArt, type Scene } from "@/components/art";
import { Icon } from "@/components/icons";
import { MockPhone, MockSite, BrowserFrame } from "@/components/mock-site";
import { SAMPLE_SITES, type ArtKind } from "@/data/products";

/* ================= ETKİLEŞİMLİ DEMOLAR =================
   Tümü tarayıcıda, örnek veriyle çalışır; hiçbir istek atılmaz, hiçbir şey kaydedilmez.
   Sıfırlama, demoyu yeni bir anahtarla yeniden kurarak yapılır. */

const HELP = "Bu ekrandaki tüm kayıtlar gösterim amaçlıdır. Demo sırasında yaptığınız değişiklikler oturum sonunda sıfırlanır.";

export function DemoFrame({
  kind,
  title,
  intro,
  productHref,
}: {
  kind: ArtKind;
  title: string;
  intro?: string;
  productHref?: string;
}) {
  const [key, setKey] = useState(0);
  const [note, setNote] = useState("");
  const [canFs, setCanFs] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const Demo = DEMOS[kind];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- tam ekran desteği yalnızca tarayıcıda bilinir
    setCanFs(typeof document !== "undefined" && !!document.documentElement.requestFullscreen);
  }, []);

  const reset = () => {
    setKey((k) => k + 1);
    setNote("Demo başlangıç durumuna döndürüldü.");
    window.setTimeout(() => setNote(""), 3200);
  };
  const fullscreen = () => {
    const el = ref.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen().catch(() => undefined);
  };

  if (!Demo) {
    return (
      <div className="dm-frame">
        <p className="dm-empty">Demo şu anda açılamıyor. Dilerseniz örnek ekranı inceleyebilirsiniz.</p>
      </div>
    );
  }

  return (
    <div className="dm-frame" ref={ref}>
      <div className="dm-top">
        <div className="dm-top-l">
          <span className="tag tag-sample">Örnek veri</span>
          <h3 className="h-3">{title}</h3>
          {intro && <p className="fine">{intro}</p>}
        </div>
        <div className="dm-tools">
          <button type="button" className="btn btn-line btn-sm" onClick={reset}>
            <Icon n="refresh" size={15} /> Demoyu Sıfırlayın
          </button>
          {canFs && (
            <button type="button" className="btn btn-line btn-sm" onClick={fullscreen}>
              <Icon n="expand" size={15} /> Tam Ekran
            </button>
          )}
          {productHref && (
            <Link className="btn btn-primary btn-sm" href={productHref}>
              Ürün Sayfasına Geçin
            </Link>
          )}
        </div>
      </div>
      <div className="dm-body">
        <Demo key={key} />
      </div>
      <p className="dm-help fine">
        <Icon n="info" size={14} /> {HELP}
      </p>
      <p className="sr-only" role="status" aria-live="polite">
        {note}
      </p>
      {note && <p className="dm-toast">{note}</p>}
    </div>
  );
}

function Seg<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { v: T; l: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="dm-seg" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          role="radio"
          aria-checked={value === o.v}
          className={value === o.v ? "on" : ""}
          onClick={() => onChange(o.v)}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}

function Select({ id, label, value, onChange, children }: { id: string; label: string; value: string; onChange: (v: string) => void; children: ReactNode }) {
  return (
    <label className="dm-field" htmlFor={id}>
      <span>{label}</span>
      <select id={id} className="input" value={value} onChange={(e) => onChange(e.target.value)}>
        {children}
      </select>
    </label>
  );
}

const fmt = (n: number) => n.toLocaleString("tr-TR");

/* ---------------- 1. Ürün Görsel Stüdyosu ---------------- */
export function StudioDemo({ compact = false }: { compact?: boolean }) {
  const uid = useId().replace(/[^a-z0-9]/gi, "");
  const [scene, setScene] = useState<Scene>("studyo");
  const [pos, setPos] = useState(0.5);
  return (
    <div className="dm-studio">
      {!compact && (
        <div className="dm-row">
          <Seg
            label="Sahne seçin"
            value={scene}
            onChange={setScene}
            options={[
              { v: "beyaz", l: "Beyaz Arka Plan" },
              { v: "studyo", l: "Stüdyo" },
              { v: "sahne", l: "Kullanım Sahnesi" },
            ]}
          />
        </div>
      )}
      <div className="ps-compare">
        <GorselArt uid={uid} pos={pos} scene={scene} />
        <input
          className="ps-range"
          type="range"
          min={0}
          max={100}
          value={Math.round(pos * 100)}
          onChange={(e) => setPos(Number(e.target.value) / 100)}
          aria-label="Orijinal ve işlenmiş ürün fotoğrafını karşılaştırın"
          aria-valuetext={`İşlenmiş görselin yüzde ${Math.round(pos * 100)} kadarı görünüyor`}
        />
      </div>
      <div className="dm-row dm-row-sb">
        <span className="tag">Örnek çalışma</span>
        <div className="dm-btns">
          <button type="button" className="btn btn-line btn-sm" onClick={() => setPos(0)} aria-pressed={pos === 0}>
            Orijinali Göster
          </button>
          <button type="button" className="btn btn-line btn-sm" onClick={() => setPos(1)} aria-pressed={pos === 1}>
            İşlenmiş Görseli Göster
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- 2. Meta Reklam Paneli ---------------- */
type Range = "7" | "30";
const CAMPAIGNS = [
  { id: "tumu", name: "Tüm kampanyalar" },
  { id: "sezon", name: "Yeni sezon" },
  { id: "randevu", name: "Randevu" },
  { id: "hikaye", name: "Hikâye reklamı" },
  { id: "kis", name: "Kış kampanyası (durduruldu)" },
];
/* Kampanya başına son 60 günün günlük harcaması (TL) ve mesaj sayısı; karşılaştırma için önceki dönem de bu diziden okunur. */
const DAYS = 60;
const SERIES: Record<string, { spend: number[]; res: number[] }> = (() => {
  const gen = (base: number, amp: number, resRate: number, seed: number, off = 0) => {
    const spend: number[] = [];
    const res: number[] = [];
    for (let i = 0; i < DAYS; i++) {
      const s = i < off ? 0 : Math.round(base + amp * Math.sin((i + seed) * 0.8) + amp * 0.4 * Math.cos(i * 1.7));
      spend.push(s);
      res.push(s ? Math.max(0, Math.round((s / resRate) * (1 + 0.25 * Math.sin(i * 1.3 + seed)))) : 0);
    }
    return { spend, res };
  };
  const sezon = gen(262, 70, 128, 1);
  const randevu = gen(204, 50, 130, 3);
  const hikaye = gen(112, 30, 150, 5);
  const kis = { spend: Array.from({ length: DAYS }, (_, i) => (i < 42 ? 140 : 0)), res: Array.from({ length: DAYS }, (_, i) => (i < 42 ? 1 : 0)) };
  const sum = (k: "spend" | "res") => Array.from({ length: DAYS }, (_, i) => sezon[k][i] + randevu[k][i] + hikaye[k][i] + kis[k][i]);
  return { sezon, randevu, hikaye, kis, tumu: { spend: sum("spend"), res: sum("res") } };
})();

export function MetaDemo() {
  const [range, setRange] = useState<Range>("7");
  const [camp, setCamp] = useState("tumu");
  const sid = useId();
  const n = Number(range);
  const s = SERIES[camp];
  const cur = { spend: s.spend.slice(DAYS - n), res: s.res.slice(DAYS - n) };
  const prev = { res: s.res.slice(DAYS - 2 * n, DAYS - n) };
  const total = (a: number[]) => a.reduce((x, y) => x + y, 0);
  const spend = total(cur.spend);
  const res = total(cur.res);
  const prevRes = total(prev.res);
  const cpr = res ? Math.round(spend / res) : 0;
  const delta = res - prevRes;
  const max = Math.max(...cur.spend, 1);
  const empty = res === 0;
  const days = n === 7 ? ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"] : null;

  return (
    <div className="dm-meta">
      <div className="dm-row">
        <div className="dm-field">
          <span>Tarih Aralığı</span>
          <Seg
            label="Tarih aralığı"
            value={range}
            onChange={setRange}
            options={[
              { v: "7", l: "Son 7 Gün" },
              { v: "30", l: "Son 30 Gün" },
            ]}
          />
        </div>
        <Select id={`${sid}-c`} label="Kampanya Seçin" value={camp} onChange={setCamp}>
          {CAMPAIGNS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </div>
      {empty ? (
        <div className="dm-state">
          <Icon n="info" size={18} />
          <p>Bu tarih aralığında görüntülenecek sonuç bulunamadı. Farklı bir aralık seçin.</p>
        </div>
      ) : (
        <>
          <div className="dm-kpis" aria-live="polite">
            <div>
              <span>Harcama</span>
              <b>{fmt(spend)} TL</b>
              <small>Son {n} gün</small>
            </div>
            <div>
              <span>Sonuçlar</span>
              <b>{fmt(res)} mesaj</b>
              <small className={delta >= 0 ? "up" : "down"}>
                Önceki döneme göre {delta >= 0 ? "+" : "−"}
                {Math.abs(delta)} mesaj
              </small>
            </div>
            <div>
              <span>Sonuç Başına Maliyet</span>
              <b>{fmt(cpr)} TL</b>
              <small>Mesaj başına</small>
            </div>
          </div>
          <div className="dm-chart" role="img" aria-label={`Son ${n} günün günlük harcama grafiği`}>
            {cur.spend.map((v, i) => (
              <div key={i} className="dm-bar-w">
                <i style={{ height: `${Math.max(3, (v / max) * 100)}%` }} className={i === cur.spend.length - 1 ? "on" : ""}></i>
                {days && <small>{days[i]}</small>}
              </div>
            ))}
          </div>
        </>
      )}
      <details className="dm-more">
        <summary>Panelde görebileceğiniz uyarılar</summary>
        <ul>
          <li>Sonuç verisi alınamıyor. Kampanya ölçüm ayarlarını ve tarih aralığını kontrol edin.</li>
          <li>Reklam hesabı bağlantısı aktif değil. Hesap erişim izinlerini yeniden kontrol edin.</li>
        </ul>
      </details>
    </div>
  );
}

/* ---------------- 3. Depo Takibi ---------------- */
const STOCK_START = [
  { code: "K-104", barcode: "8690000104", name: "Kutu Ambalaj", stock: 12, critical: 10 },
  { code: "E-220", barcode: "8690000220", name: "Etiket Rulosu", stock: 14, critical: 12 },
  { code: "B-310", barcode: "8690000310", name: "Koli Bandı", stock: 48, critical: 20 },
];

export function DepoDemo() {
  const sid = useId();
  const [items, setItems] = useState(STOCK_START);
  const [code, setCode] = useState("K-104");
  const [qty, setQty] = useState("3");
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState<{ tone: "ok" | "bad" | "warn"; text: string } | null>(null);
  const [log, setLog] = useState<{ t: string; name: string; q: number; left: number }[]>([]);
  const item = items.find((i) => i.code === code) ?? items[0];

  const find = () => {
    const q = search.trim().toLocaleUpperCase("tr");
    const hit = items.find((i) => i.code === q || i.barcode === q);
    if (!hit) {
      setMsg({ tone: "warn", text: "Barkodla eşleşen ürün bulunamadı. Ürün kodunu yazarak arayabilirsiniz." });
      return;
    }
    setCode(hit.code);
    setMsg(null);
  };
  const out = () => {
    const n = Number(qty);
    if (!Number.isInteger(n) || n < 1) {
      setMsg({ tone: "bad", text: "Çıkış adedi en az 1 olmalıdır." });
      return;
    }
    if (n > item.stock) {
      setMsg({ tone: "bad", text: `Stokta yalnızca ${item.stock} adet bulunuyor.` });
      return;
    }
    const left = item.stock - n;
    setItems((xs) => xs.map((x) => (x.code === item.code ? { ...x, stock: left } : x)));
    const crit = left <= item.critical;
    setMsg({
      tone: crit ? "warn" : "ok",
      text: `${n} adet çıkış kaydedildi. Kalan stok: ${left} adet.${crit ? " Ürün kritik stok seviyesinde." : ""}`,
    });
    const d = new Date();
    setLog((l) => [{ t: d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }), name: item.name, q: n, left }, ...l].slice(0, 5));
  };
  const critical = items.filter((i) => i.stock <= i.critical);

  return (
    <div className="dm-depo">
      <div className="dm-phone">
        <div className="dm-phone-in">
          <div className="dm-scan">
            <label className="dm-field" htmlFor={`${sid}-s`}>
              <span>Barkod veya ürün kodu</span>
              <span className="dm-inline">
                <input
                  id={`${sid}-s`}
                  className="input"
                  inputMode="numeric"
                  placeholder="Örn. K-104"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && find()}
                />
                <button type="button" className="btn btn-line btn-sm" onClick={find}>
                  Ara
                </button>
              </span>
            </label>
            <button
              type="button"
              className="dm-linkbtn"
              onClick={() => setMsg({ tone: "warn", text: "Kamera erişimi sağlanamadı. Barkod numarasını elle girebilirsiniz." })}
            >
              <Icon n="scan" size={15} /> Kamerayla okutun
            </button>
          </div>
          <Select id={`${sid}-p`} label="Ürün Seçin" value={item.code} onChange={(v) => { setCode(v); setMsg(null); }}>
            {items.map((i) => (
              <option key={i.code} value={i.code}>
                {i.name} ({i.code})
              </option>
            ))}
          </Select>
          <div className="dm-stock">
            <span>Mevcut Stok</span>
            <b>{item.stock} adet</b>
            <small>Kritik seviye {item.critical}</small>
          </div>
          <label className="dm-field" htmlFor={`${sid}-q`}>
            <span>Çıkış Adedi</span>
            <input
              id={`${sid}-q`}
              className="input"
              type="number"
              inputMode="numeric"
              min={1}
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </label>
          <button type="button" className="btn btn-primary btn-block" onClick={out}>
            Stoktan Çıkarın
          </button>
          <div aria-live="polite">{msg && <p className={`dm-msg ${msg.tone}`}>{msg.text}</p>}</div>
        </div>
      </div>
      <div className="dm-side">
        <h4>Kritik stok</h4>
        {critical.length === 0 ? (
          <p className="fine">Kritik seviyede ürün yok.</p>
        ) : (
          <ul className="dm-list">
            {critical.map((i) => (
              <li key={i.code}>
                <b>{i.name}</b>
                <span className="tag tag-bad">
                  {i.stock} / {i.critical}
                </span>
              </li>
            ))}
          </ul>
        )}
        <h4>Hareket geçmişi</h4>
        {log.length === 0 ? (
          <p className="fine">Henüz hareket kaydı yok. Bir çıkış yapın.</p>
        ) : (
          <ul className="dm-list">
            {log.map((l, i) => (
              <li key={i}>
                <span>
                  <b>{l.name}</b>
                  <small>
                    Çıkış · {l.t} · kalan {l.left}
                  </small>
                </span>
                <span className="dm-neg">−{l.q}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="tag">Örnek veri</p>
      </div>
    </div>
  );
}

/* ---------------- 4. Google Haritalar Karnesi ---------------- */
const KARNE_PLACES = ["Nilüfer", "Osmangazi", "Kadıköy"];
const KARNE_CATS = [
  { id: "firin", label: "Fırın", name: "Çınar Fırın" },
  { id: "kuafor", label: "Kuaför", name: "Lina Salon" },
  { id: "kafe", label: "Kafe", name: "Köşe Üstü" },
];
type Tone = "ok" | "warn" | "bad";
const KARNE_BASE: { t: string; note: Record<Tone, string> }[] = [
  {
    t: "Ana ve ek kategoriler",
    note: { ok: "Ana kategori hizmetlerle uyumlu.", warn: "Ek kategori eklenmesi önerilir.", bad: "Kategori seçilmemiş." },
  },
  {
    t: "Çalışma saatleri",
    note: {
      ok: "Haftalık saatler girilmiş.",
      warn: "Hafta sonu saatlerinin işletme tarafından doğrulanması önerilir.",
      bad: "Çalışma saati bilgisi yok.",
    },
  },
  {
    t: "Telefon",
    note: { ok: "Numara web sitesiyle tutarlı.", warn: "Profildeki numara web sitesindekinden farklı.", bad: "Telefon eklenmemiş." },
  },
  {
    t: "Web sitesi bağlantısı",
    note: { ok: "Bağlantı çalışıyor.", warn: "Bağlantı ana sayfa yerine sosyal medyaya gidiyor.", bad: "Web sitesi bağlantısı eklenmemiş." },
  },
  {
    t: "Profil görselleri",
    note: { ok: "Güncel iç ve dış mekân fotoğrafları var.", warn: "Fotoğraflar bir yıldan eski görünüyor.", bad: "Kapak fotoğrafı yok." },
  },
  {
    t: "Yorum temaları",
    note: { ok: "Yorumlarda öne çıkan tema: hızlı servis.", warn: "Yanıtlanmamış yorumlar bulunuyor.", bad: "Yorum yanıtı hiç verilmemiş." },
  },
];
const PATTERNS: Tone[][] = [
  ["ok", "warn", "ok", "bad", "warn", "ok"],
  ["ok", "ok", "warn", "ok", "bad", "warn"],
  ["warn", "warn", "ok", "ok", "ok", "bad"],
];
const TONE_LABEL: Record<Tone, string> = { ok: "Güncel", warn: "Kontrol Gerekli", bad: "Eksik Bilgi" };

export function KarneDemo() {
  const sid = useId();
  const [place, setPlace] = useState(KARNE_PLACES[0]);
  const [cat, setCat] = useState(KARNE_CATS[0].id);
  const [open, setOpen] = useState<{ place: string; cat: string } | null>({ place: KARNE_PLACES[0], cat: KARNE_CATS[0].id });
  const shown = open ? KARNE_CATS.find((c) => c.id === open.cat)! : null;
  const pattern = open ? PATTERNS[(KARNE_PLACES.indexOf(open.place) + KARNE_CATS.findIndex((c) => c.id === open.cat)) % 3] : [];
  const okCount = pattern.filter((t) => t === "ok").length;
  return (
    <div className="dm-karne">
      <div className="dm-row">
        <Select id={`${sid}-p`} label="İlçe Seçin" value={place} onChange={setPlace}>
          {KARNE_PLACES.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </Select>
        <Select id={`${sid}-c`} label="Kategori Seçin" value={cat} onChange={setCat}>
          {KARNE_CATS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </Select>
        <button type="button" className="btn btn-primary btn-sm dm-end" onClick={() => setOpen({ place, cat })}>
          Örnek Karneyi Açın
        </button>
      </div>
      <p className="fine">İlçe ve kategori seçimi, gösterim amaçlı kurgusal örnekleri değiştirir.</p>
      {open && shown && (
        <div className="dm-karne-card" aria-live="polite">
          <div className="dm-karne-h">
            <div>
              <b>{shown.name}</b>
              <span>
                {shown.label} · {open.place} · Kurgusal işletme
              </span>
            </div>
            <div className="dm-score">
              <b>
                {okCount}/{pattern.length}
              </b>
              <span>alan güncel</span>
            </div>
          </div>
          <ul className="dm-checks">
            {KARNE_BASE.map((r, i) => (
              <li key={r.t} className={pattern[i]}>
                <i aria-hidden="true"></i>
                <span>
                  <b>{r.t}</b>
                  <small>{r.note[pattern[i]]}</small>
                </span>
                <span className={`tag tag-${pattern[i]}`}>{TONE_LABEL[pattern[i]]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ---------------- 5. Görüşme Özeti ---------------- */
const TRANSCRIPT: [string, string][] = [
  ["Müşteri", "Ürün listemizi her hafta elle güncelliyoruz, bu çok vakit alıyor."],
  ["Satış", "Listeyi hangi gün güncel görmek istersiniz?"],
  ["Müşteri", "Pazartesi sabahları ekip toplantısından önce olsa iyi olur."],
  ["Satış", "Peki listeyi sizin tarafta kim onaylayacak?"],
  ["Müşteri", "Bunu ekipte konuşup size döneceğim."],
  ["Satış", "O hâlde örnek bir liste hazırlayıp incelemenize gönderelim."],
];
const SUMMARY = {
  ozet: "Müşteri, ürün listesinin haftalık ve pazartesi sabahı güncel olmasını istiyor. Onay sorumlusu henüz belli değil.",
  talepler: ["Ürün listesi haftalık güncellensin."],
  kararlar: ["Liste pazartesi sabahı ekip toplantısından önce paylaşılacak."],
  sorular: ["Listeyi kim onaylayacak?"],
  aksiyonlar: ["Örnek listeyi ekip incelemesine gönderin. Sorumlu: Satış ekibi."],
};
const summaryText = () =>
  [
    "Görüşme özeti (örnek)",
    SUMMARY.ozet,
    "",
    "Müşteri talepleri: " + SUMMARY.talepler.join(" "),
    "Alınan kararlar: " + SUMMARY.kararlar.join(" "),
    "Açık sorular: " + SUMMARY.sorular.join(" "),
    "Sonraki aksiyonlar: " + SUMMARY.aksiyonlar.join(" "),
  ].join("\n");

export function GorusmeDemo() {
  const [phase, setPhase] = useState<"idle" | "busy" | "ready">("idle");
  const [tab, setTab] = useState<"dokum" | "ozet" | "aksiyon">("ozet");
  const [copied, setCopied] = useState("");
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const run = () => {
    setPhase("busy");
    timer.current = window.setTimeout(() => setPhase("ready"), 900);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText());
      setCopied("Özet panoya kopyalandı.");
    } catch {
      setCopied("Kopyalanamadı. Metni seçerek kopyalayabilirsiniz.");
    }
    window.setTimeout(() => setCopied(""), 3000);
  };

  if (phase !== "ready") {
    return (
      <div className="dm-gorusme">
        <div className="dm-audio">
          <Icon n="mic" size={22} />
          <div>
            <b>Örnek görüşme kaydı</b>
            <span>Satış görüşmesi · 4 dk 12 sn · Katılımcılar bilgilendirildi</span>
          </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={run} disabled={phase === "busy"}>
          {phase === "busy" ? "Kayıt işleniyor…" : "Özeti Oluşturun"}
        </button>
        <p className="fine" aria-live="polite">
          {phase === "busy" ? "Kayıt işleniyor…" : "Ses kalitesi yetersizse sistem şu uyarıyı verir: Ses kalitesi yetersiz. Daha net bir kayıtla tekrar deneyin."}
        </p>
      </div>
    );
  }

  return (
    <div className="dm-gorusme">
      <div className="dm-row dm-row-sb">
        <Seg
          label="Görünüm"
          value={tab}
          onChange={setTab}
          options={[
            { v: "dokum", l: "Konuşma Dökümü" },
            { v: "ozet", l: "Özeti Göster" },
            { v: "aksiyon", l: "Aksiyonları Göster" },
          ]}
        />
        <span className="tag tag-warn">İnceleme Gerekli</span>
      </div>
      <p className="dm-msg ok">Özet hazır. Paylaşmadan önce kontrol edin.</p>
      {tab === "dokum" && (
        <ol className="dm-transcript">
          {TRANSCRIPT.map(([who, t], i) => (
            <li key={i} className={who === "Satış" ? "me" : ""}>
              <small>{who}</small>
              <p>{t}</p>
            </li>
          ))}
        </ol>
      )}
      {tab === "ozet" && (
        <div className="dm-summary">
          <p>{SUMMARY.ozet}</p>
          <dl>
            <dt>Müşteri talepleri</dt>
            <dd>{SUMMARY.talepler.join(" ")}</dd>
            <dt>Alınan kararlar</dt>
            <dd>{SUMMARY.kararlar.join(" ")}</dd>
            <dt className="warn">Açık sorular</dt>
            <dd>{SUMMARY.sorular.join(" ")}</dd>
          </dl>
        </div>
      )}
      {tab === "aksiyon" && (
        <ul className="dm-actions">
          {SUMMARY.aksiyonlar.map((a) => (
            <li key={a}>
              <Icon n="check" size={16} sw={2.4} />
              {a}
            </li>
          ))}
          <li>
            <Icon n="info" size={16} />
            Açık soru yanıtlandığında onay sorumlusunu özete ekleyin.
          </li>
        </ul>
      )}
      <div className="dm-row">
        <button type="button" className="btn btn-line btn-sm" onClick={copy}>
          <Icon n="copy" size={15} /> Özeti Kopyalayın
        </button>
        <span className="fine" aria-live="polite">
          {copied}
        </span>
      </div>
    </div>
  );
}

/* ---------------- 6. Belge Okuma ---------------- */
const DOCS = {
  irsaliye: {
    label: "İrsaliye",
    title: "İRSALİYE",
    no: "IR-2611",
    meta: [
      ["Tarih", "14 Kasım"],
      ["Gönderen", "Atlas Ambalaj"],
    ],
    rows: [
      ["K-104", "Kutu Ambalaj", "12"],
      ["E-220", "Etiket Rulosu", "6"],
    ],
    fields: [
      { k: "Ürün kodu", v: "K-104" },
      { k: "Miktar", v: "12", check: true },
      { k: "Tarih", v: "14 Kasım" },
    ],
  },
  fatura: {
    label: "Fatura",
    title: "FATURA",
    no: "FT-0482",
    meta: [
      ["Tarih", "12 Kasım"],
      ["Satıcı", "Kuzey Kırtasiye"],
    ],
    rows: [
      ["Hizmet", "Baskı işi", "1"],
      ["Ürün", "Kartvizit", "500"],
    ],
    fields: [
      { k: "Belge numarası", v: "FT-0482" },
      { k: "Tarih", v: "12 Kasım", check: true },
      { k: "Satıcı", v: "Kuzey Kırtasiye" },
    ],
  },
  form: {
    label: "Başvuru formu",
    title: "BAŞVURU FORMU",
    no: "BF-117",
    meta: [
      ["Tarih", "10 Kasım"],
      ["Talep", "Bayilik başvurusu"],
    ],
    rows: [
      ["Ad", "Selin Kaya", ""],
      ["Şehir", "Bursa", ""],
    ],
    fields: [
      { k: "Başvuran", v: "Selin Kaya" },
      { k: "Talep türü", v: "Bayilik başvurusu" },
      { k: "Şehir", v: "Bursa", check: true },
    ],
  },
} as const;
type DocId = keyof typeof DOCS;

export function BelgeDemo() {
  const [doc, setDoc] = useState<DocId>("irsaliye");
  const [busy, setBusy] = useState(false);
  const D = DOCS[doc];
  const [vals, setVals] = useState<string[]>(D.fields.map((f) => f.v));
  const [checked, setChecked] = useState<boolean[]>(D.fields.map((f) => !("check" in f && f.check)));
  const [editing, setEditing] = useState<number | null>(null);
  const [approved, setApproved] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const pick = (d: DocId) => {
    setDoc(d);
    setBusy(true);
    setApproved(false);
    setEditing(null);
    setVals(DOCS[d].fields.map((f) => f.v));
    setChecked(DOCS[d].fields.map((f) => !("check" in f && f.check)));
    timer.current = window.setTimeout(() => setBusy(false), 600);
  };
  const pending = checked.some((c) => !c);

  return (
    <div className="dm-belge">
      <div className="dm-row">
        <Seg
          label="Örnek Belgeyi Seçin"
          value={doc}
          onChange={pick}
          options={(Object.keys(DOCS) as DocId[]).map((k) => ({ v: k, l: DOCS[k].label }))}
        />
      </div>
      <div className="dm-belge-grid">
        <figure className="dm-paper" aria-label="Kaynak Belge">
          <figcaption className="fine">Kaynak Belge</figcaption>
          <div className="dm-paper-in">
            <div className="dm-paper-h">
              <b>{D.title}</b>
              <span>No: {D.no}</span>
            </div>
            {D.meta.map(([k, v]) => (
              <p key={k}>
                <span>{k}:</span> {v}
              </p>
            ))}
            <table>
              <tbody>
                {D.rows.map((r) => (
                  <tr key={r[0]}>
                    {r.map((c, i) => (
                      <td key={i}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="dm-sign" aria-hidden="true"></div>
          </div>
        </figure>
        <div className="dm-fields">
          <h4>Çıkarılan Alanlar</h4>
          {busy ? (
            <p className="fine" aria-live="polite">
              Belge okunuyor…
            </p>
          ) : (
            <>
              <ul>
                {D.fields.map((f, i) => (
                  <li key={f.k} className={!checked[i] ? "warn" : ""}>
                    <span className="dm-fk">{f.k}</span>
                    {editing === i ? (
                      <span className="dm-inline">
                        <input
                          className="input"
                          aria-label={`${f.k} alanını düzeltin`}
                          value={vals[i]}
                          onChange={(e) => setVals((v) => v.map((x, j) => (j === i ? e.target.value : x)))}
                        />
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            setEditing(null);
                            setChecked((c) => c.map((x, j) => (j === i ? true : x)));
                          }}
                        >
                          Kaydet
                        </button>
                      </span>
                    ) : (
                      <span className="dm-fv">
                        <b>{vals[i]}</b>
                        {!checked[i] ? (
                          <span className="tag tag-warn">Kontrol Gerekli</span>
                        ) : (
                          <Icon n="check" size={16} sw={2.4} className="okc" />
                        )}
                      </span>
                    )}
                    {!checked[i] && editing !== i && (
                      <span className="dm-fnote">
                        Bu alanı kaynak belgeden doğrulayın.
                        <button type="button" className="dm-linkbtn" onClick={() => setEditing(i)}>
                          Alanı Düzeltin
                        </button>
                        <button
                          type="button"
                          className="dm-linkbtn"
                          onClick={() => setChecked((c) => c.map((x, j) => (j === i ? true : x)))}
                        >
                          Doğru
                        </button>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <button type="button" className="btn btn-primary btn-block" disabled={pending || approved} onClick={() => setApproved(true)}>
                Kaydı Onaylayın
              </button>
              <p className="fine" aria-live="polite">
                {approved
                  ? "Onaylanan kayıt aktarıma hazır."
                  : pending
                    ? "Onaylamadan önce işaretli alanı kontrol edin."
                    : "Tüm alanlar doğrulandı."}
              </p>
              {approved && <p className="dm-msg ok">Onaylanan kayıt aktarıma hazır.</p>}
            </>
          )}
          <p className="fine dm-fine">Okunamayan belgede: Belge okunamadı. Daha net bir kopya yükleyin.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- 7. Müşteri Asistanı ---------------- */
type Msg = { who: "bot" | "me"; text: string; source?: string; handoff?: boolean };
const PROMPTS = ["Cumartesi açık mısınız?", "Kargo ne zaman çıkar?", "Ekibinizle görüşebilir miyim?"];
const KB: { keys: string[]; text: string; source?: string; handoff?: boolean }[] = [
  { keys: ["cumartesi", "açık", "saat", "pazar", "hafta sonu"], text: "Cumartesi 10.00 – 18.00 arası açığız. Pazar günü kapalıyız.", source: "Çalışma saatleri" },
  {
    keys: ["kargo", "teslimat", "gönderi", "ne zaman çıkar"],
    text: "Hafta içi saat 14.00’e kadar verilen siparişler aynı gün kargoya verilir. Sonrasındaki siparişler ertesi iş günü çıkar.",
    source: "Teslimat koşulları",
  },
  { keys: ["ekip", "görüş", "temsilci", "insan", "yetkili"], text: "Elbette. Talebinizi ekibimize aktarabilirim.", handoff: true },
];
const NOT_FOUND = "Bu konuda doğrulanmış bir bilgi bulamadım. Sizi ekibimize aktarmamı ister misiniz?";

export function AsistanDemo() {
  const sid = useId();
  const [msgs, setMsgs] = useState<Msg[]>([{ who: "bot", text: "Merhaba, size nasıl yardımcı olabilirim?" }]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [handed, setHanded] = useState(false);
  const list = useRef<HTMLOListElement>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    list.current?.lastElementChild?.scrollIntoView({ block: "nearest" });
  }, [msgs, typing]);

  const ask = (q: string) => {
    const t = q.trim();
    if (!t || typing) return;
    setText("");
    setMsgs((m) => [...m, { who: "me", text: t }]);
    setTyping(true);
    const low = t.toLocaleLowerCase("tr");
    const hit = KB.find((k) => k.keys.some((w) => low.includes(w)));
    timer.current = window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, hit ? { who: "bot", text: hit.text, source: hit.source, handoff: hit.handoff } : { who: "bot", text: NOT_FOUND, handoff: true }]);
    }, 650);
  };
  const handoff = () => {
    setHanded(true);
    setMsgs((m) => [...m, { who: "bot", text: "Talebiniz ekibimize aktarıldı. Ekibimiz çalışma saatleri içinde size dönüş yapacak." }]);
  };

  return (
    <div className="dm-chat">
      <div className="dm-chat-h">
        <span className="dm-avatar" aria-hidden="true">
          <Icon n="chat" size={18} />
        </span>
        <div>
          <b>Müşteri Asistanı</b>
          <span className="tag">Örnek konuşma</span>
        </div>
      </div>
      <ol className="dm-chat-list" ref={list} aria-live="polite">
        {msgs.map((m, i) => (
          <li key={i} className={m.who}>
            <p>{m.text}</p>
            {m.source && <small>Kaynak: {m.source}</small>}
            {m.handoff && !handed && (
              <button type="button" className="btn btn-primary btn-sm" onClick={handoff}>
                Ekibe Aktar
              </button>
            )}
          </li>
        ))}
        {typing && (
          <li className="bot typing">
            <p>Yanıt hazırlanıyor…</p>
          </li>
        )}
      </ol>
      <div className="dm-prompts">
        {PROMPTS.map((p) => (
          <button key={p} type="button" onClick={() => ask(p)} disabled={typing}>
            {p}
          </button>
        ))}
      </div>
      <form
        className="dm-chat-f"
        onSubmit={(e) => {
          e.preventDefault();
          ask(text);
        }}
      >
        <label htmlFor={`${sid}-q`} className="sr-only">
          Sorunuzu yazın
        </label>
        <input id={`${sid}-q`} className="input" placeholder="Sorunuzu yazın…" maxLength={200} value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit" className="btn btn-primary btn-sm" disabled={!text.trim() || typing}>
          Gönderin
        </button>
      </form>
      <p className="fine dm-fine">Asistana ulaşılamadığında: Şu anda yanıt veremiyorum. İletişim sayfamız üzerinden ekibimize ulaşabilirsiniz.</p>
    </div>
  );
}

/* ---------------- 8. Müşteri Bulma ---------------- */
type LeadStatus = "İncelenecek" | "Takibe Alındı" | "Tamamlandı";
const LEADS: { n: string; sector: string; region: string; source: string; priority: "Yüksek" | "Orta" | "Düşük"; owner: string; next: string }[] = [
  { n: "Ege Mobilya", sector: "Üretim", region: "Bursa", source: "Kendi listeniz", priority: "Yüksek", owner: "Ayşe", next: "Teklif sunumu" },
  { n: "Kuzey Matbaa", sector: "Hizmet", region: "İzmir", source: "Fuar katılımcı listesi", priority: "Yüksek", owner: "Mert", next: "İlk arama" },
  { n: "Atlas Gıda", sector: "Toptan", region: "Bursa", source: "Web sitesi formu", priority: "Orta", owner: "Ayşe", next: "Katalog paylaşımı" },
  { n: "Mavi Tekstil", sector: "Üretim", region: "İstanbul", source: "Kendi listeniz", priority: "Orta", owner: "Selin", next: "Numune gönderimi" },
  { n: "Ada Lojistik", sector: "Hizmet", region: "İstanbul", source: "Fuar katılımcı listesi", priority: "Düşük", owner: "Mert", next: "Bilgi e-postası" },
  { n: "Defne Kozmetik", sector: "Toptan", region: "İzmir", source: "Web sitesi formu", priority: "Yüksek", owner: "Selin", next: "Toplantı planı" },
];
const NEXT_STATUS: Record<LeadStatus, LeadStatus> = { İncelenecek: "Takibe Alındı", "Takibe Alındı": "Tamamlandı", Tamamlandı: "İncelenecek" };

export function MusteriDemo() {
  const sid = useId();
  const [f, setF] = useState({ sector: "", region: "", priority: "" });
  const [st, setSt] = useState<Record<string, LeadStatus>>({ "Ege Mobilya": "Takibe Alındı" });
  const rows = useMemo(
    () => LEADS.filter((l) => (!f.sector || l.sector === f.sector) && (!f.region || l.region === f.region) && (!f.priority || l.priority === f.priority)),
    [f],
  );
  const opt = (k: "sector" | "region" | "priority") => [...new Set(LEADS.map((l) => l[k]))];
  const labels = { sector: "Sektör", region: "Bölge", priority: "Öncelik" } as const;
  return (
    <div className="dm-leads">
      <div className="dm-row">
        {(["sector", "region", "priority"] as const).map((k) => (
          <Select key={k} id={`${sid}-${k}`} label={labels[k]} value={f[k]} onChange={(v) => setF((x) => ({ ...x, [k]: v }))}>
            <option value="">Tümü</option>
            {opt(k).map((o) => (
              <option key={o}>{o}</option>
            ))}
          </Select>
        ))}
        <button type="button" className="btn btn-line btn-sm dm-end" onClick={() => setF({ sector: "", region: "", priority: "" })}>
          Filtreleri Temizleyin
        </button>
      </div>
      {rows.length === 0 ? (
        <div className="dm-state">
          <Icon n="search" size={18} />
          <p>Bu kriterlerle eşleşen örnek bulunamadı. Filtreleri güncelleyin.</p>
        </div>
      ) : (
        <div className="dm-table-w">
          <table className="dm-table">
            <thead>
              <tr>
                <th scope="col">İşletme</th>
                <th scope="col">Sektör</th>
                <th scope="col">Bölge</th>
                <th scope="col">Kaynak</th>
                <th scope="col">Öncelik</th>
                <th scope="col">Sorumlu</th>
                <th scope="col">Sonraki Adım</th>
                <th scope="col">Durum</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((l) => {
                const s = st[l.n] || "İncelenecek";
                return (
                  <tr key={l.n}>
                    <th scope="row">{l.n}</th>
                    <td>{l.sector}</td>
                    <td>{l.region}</td>
                    <td>{l.source}</td>
                    <td>{l.priority}</td>
                    <td>{l.owner}</td>
                    <td>{l.next}</td>
                    <td>
                      <button
                        type="button"
                        className={`tag tag-btn ${s === "Takibe Alındı" ? "tag-ok" : s === "Tamamlandı" ? "tag-ink" : ""}`}
                        onClick={() => setSt((x) => ({ ...x, [l.n]: NEXT_STATUS[s] }))}
                        aria-label={`${l.n} durumu: ${s}. Değiştirmek için seçin.`}
                      >
                        {s}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <p className="fine">Kurgusal işletmeler · Örnek veri. Durum etiketine dokunarak takip adımını değiştirin.</p>
    </div>
  );
}

/* ---------------- 9. Web Sitesi Paketi ---------------- */
export function WebDemo() {
  const [open, setOpen] = useState<string | null>(null);
  const [view, setView] = useState<"mobil" | "masaustu">("masaustu");
  const site = SAMPLE_SITES.find((s) => s.id === open);
  if (site) {
    return (
      <div className="dm-web-view">
        <div className="dm-row dm-row-sb">
          <div>
            <b>{site.label}</b>
            <p className="fine">Örnek tasarım · Bu ön izlemedeki işletme ve içerikler gösterim amacıyla hazırlanmıştır.</p>
          </div>
          <div className="dm-btns">
            <Seg
              label="Görünüm"
              value={view}
              onChange={setView}
              options={[
                { v: "mobil", l: "Mobil Görünüm" },
                { v: "masaustu", l: "Masaüstü Görünüm" },
              ]}
            />
            <button type="button" className="btn btn-line btn-sm" onClick={() => setOpen(null)}>
              Örnek Siteyi Kapatın
            </button>
          </div>
        </div>
        <div className={`dm-web-stage ${view}`}>
          {view === "masaustu" ? (
            <BrowserFrame url={site.url}>
              <MockSite d={site} />
            </BrowserFrame>
          ) : (
            <div className="dm-web-phone">
              <MockPhone d={site} />
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <ul className="dm-web-grid">
      {SAMPLE_SITES.map((s) => (
        <li key={s.id}>
          <div className="dm-web-thumb">
            <BrowserFrame url={s.url}>
              <MockSite d={s} />
            </BrowserFrame>
          </div>
          <b>{s.label}</b>
          <span className="tag">Örnek tasarım</span>
          <button
            type="button"
            className="btn btn-line btn-sm"
            onClick={() => {
              setOpen(s.id);
              setView("masaustu");
            }}
          >
            Örnek Siteyi Açın
          </button>
        </li>
      ))}
    </ul>
  );
}

/* ---------------- 10. Kulüp Takip ---------------- */
type Role = "yonetici" | "antrenor" | "veli";
type Att = "geldi" | "gelmedi" | "izinli";
const SQUAD: { no: string; n: string; pos: string }[] = [
  { no: "0007", n: "Emre Kaya", pos: "Orta saha" },
  { no: "0012", n: "Baran Tunç", pos: "Defans" },
  { no: "0015", n: "Deniz Acar", pos: "Forvet" },
  { no: "0021", n: "Kerem Sarı", pos: "Kaleci" },
  { no: "0024", n: "Arda Yılmaz", pos: "Kanat" },
];
const ATT_LABEL: Record<Att, string> = { geldi: "Geldi", gelmedi: "Gelmedi", izinli: "İzinli" };

export function KulupDemo() {
  const [role, setRole] = useState<Role>("yonetici");
  const [att, setAtt] = useState<Record<string, Att>>({});
  const [saved, setSaved] = useState(false);
  const marked = SQUAD.filter((p) => att[p.no]).length;
  const count = (a: Att) => SQUAD.filter((p) => att[p.no] === a).length;
  return (
    <div className="dm-kulup">
      <div className="dm-row dm-row-sb">
        <Seg
          label="Rol seçin"
          value={role}
          onChange={(r) => {
            setRole(r);
            setSaved(false);
          }}
          options={[
            { v: "yonetici", l: "Yönetici" },
            { v: "antrenor", l: "Antrenör" },
            { v: "veli", l: "Veli" },
          ]}
        />
        <span className="fine">Yıldıztepe SK · Kurgusal kulüp</span>
      </div>

      {role === "yonetici" && (
        <div className="dm-k-grid" aria-live="polite">
          <div className="dm-kpis dm-kpis-4">
            <div>
              <span>Aktif oyuncu</span>
              <b>128</b>
              <small>5 takım</small>
            </div>
            <div>
              <span>Kasım aidatı</span>
              <b>42/48</b>
              <small>6 oyuncu bekliyor</small>
            </div>
            <div>
              <span>Bu ay net</span>
              <b>25.150 TL</b>
              <small className="up">Gelir 86.400 · Gider 61.250</small>
            </div>
            <div>
              <span>Kritik malzeme</span>
              <b>2</b>
              <small className="down">Forma (M), top</small>
            </div>
          </div>
          <div className="dm-table-w">
            <table className="dm-table dm-table-sm">
              <thead>
                <tr>
                  <th scope="col">Takım</th>
                  <th scope="col">Antrenör</th>
                  <th scope="col">Oyuncu</th>
                  <th scope="col">Sıradaki</th>
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ["A Takım", "Selim Hoca", "26", "Pazar · Lig maçı"],
                    ["U17", "Mert Hoca", "24", "Cumartesi · Deplasman"],
                    ["U15", "Mert Hoca", "22", "Salı · İdman"],
                    ["U13", "Ece Hoca", "28", "Çarşamba · İdman"],
                    ["Futbol okulu", "Ece Hoca", "28", "Cumartesi · İdman"],
                  ] as const
                ).map((r) => (
                  <tr key={r[0]}>
                    <th scope="row">{r[0]}</th>
                    <td>{r[1]}</td>
                    <td>{r[2]}</td>
                    <td>{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="fine">
            <Icon n="lock" size={13} /> Maaşlar, gelir-gider ve değişiklik kayıtları yalnızca yönetici ekranında görünür.
          </p>
        </div>
      )}

      {role === "antrenor" && (
        <div className="dm-k-grid">
          <div className="dm-k-head">
            <div>
              <b>Salı idmanı · U17</b>
              <span>Mert Hoca · Yalnızca atandığınız U17 ve U15 takımlarını görüyorsunuz.</span>
            </div>
            <span className="fine" aria-live="polite">
              {marked}/{SQUAD.length} işaretlendi
            </span>
          </div>
          <ul className="dm-roll">
            {SQUAD.map((p) => (
              <li key={p.no}>
                <span className="dm-roll-p">
                  <small>{p.no}</small>
                  <b>{p.n}</b>
                  <span>{p.pos}</span>
                </span>
                <span className="dm-roll-b" role="radiogroup" aria-label={`${p.n} yoklaması`}>
                  {(["geldi", "izinli", "gelmedi"] as Att[]).map((a) => (
                    <button
                      key={a}
                      type="button"
                      role="radio"
                      aria-checked={att[p.no] === a}
                      className={att[p.no] === a ? `on ${a}` : ""}
                      onClick={() => {
                        setAtt((x) => ({ ...x, [p.no]: a }));
                        setSaved(false);
                      }}
                    >
                      {ATT_LABEL[a]}
                    </button>
                  ))}
                </span>
              </li>
            ))}
          </ul>
          <div className="dm-row">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setSaved(true)}
              disabled={marked < SQUAD.length}
            >
              Yoklamayı Kaydedin
            </button>
            <button type="button" className="btn btn-line btn-sm" onClick={() => setAtt(Object.fromEntries(SQUAD.map((p) => [p.no, "geldi" as Att])))}>
              Hepsi Geldi
            </button>
          </div>
          <div aria-live="polite">
            {saved ? (
              <p className="dm-msg ok">
                Yoklama kaydedildi: {count("geldi")} geldi, {count("izinli")} izinli, {count("gelmedi")} gelmedi. Veliler yalnızca kendi çocuğunun
                durumunu görür.
              </p>
            ) : (
              marked < SQUAD.length && <p className="fine">Kaydetmek için her oyuncuyu işaretleyin.</p>
            )}
          </div>
        </div>
      )}

      {role === "veli" && (
        <div className="dm-k-grid">
          <div className="dm-k-head">
            <div>
              <b>Deniz Acar · U17</b>
              <span>Veli ekranı · Yalnızca kendi çocuğunuzun bilgileri</span>
            </div>
          </div>
          <div className="dm-kpis dm-kpis-4">
            <div>
              <span>İdman katılımı</span>
              <b>%92</b>
              <small>Son 12 idmanda 11</small>
            </div>
            <div>
              <span>Sezon</span>
              <b>6 gol</b>
              <small>3 asist · 540 dk</small>
            </div>
            <div>
              <span>30 m sprint</span>
              <b>4,6 sn</b>
              <small className="up">Önceki test 4,8 sn</small>
            </div>
            <div>
              <span>Aidat</span>
              <b>Kasım ödendi</b>
              <small>Aralık bekliyor</small>
            </div>
          </div>
          <div className="dm-k-two">
            <div className="dm-side">
              <h4>Zimmet</h4>
              <ul className="dm-list">
                <li>
                  <b>Maç forması</b>
                  <span className="tag">Beden M</span>
                </li>
                <li>
                  <b>Antrenman şortu</b>
                  <span className="tag">Beden M</span>
                </li>
              </ul>
              <h4>Karne</h4>
              <p className="fine">Antrenör dönem karnesini henüz sizinle paylaşmadı.</p>
            </div>
            <div className="dm-side">
              <h4>Veliye kapalı bilgiler</h4>
              <ul className="dm-locked">
                {["İdman performans puanları", "Karne iç notları", "Diğer oyuncuların bilgileri", "Maaşlar ve kulüp kasası", "Rakip analizi"].map((t) => (
                  <li key={t}>
                    <Icon n="lock" size={14} /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const DEMOS: Partial<Record<ArtKind, () => React.ReactElement>> = {
  gorsel: () => <StudioDemo />,
  meta: MetaDemo,
  depo: DepoDemo,
  karne: KarneDemo,
  gorusme: GorusmeDemo,
  belge: BelgeDemo,
  asistan: AsistanDemo,
  musteri: MusteriDemo,
  kulup: KulupDemo,
  web: WebDemo,
};
