"use client";

import { useApp } from "@/lib/order-context";

const pct = (v: number) => "%" + String(v).replace(".", ",");

function Trend({ rows, label }: { rows: [number, number][]; label: string }) {
  return (
    <div className="trend" role="list" aria-label={label}>
      {rows.map((r) => (
        <div role="listitem" key={r[0]}>
          <span>{r[0]}</span>
          <i aria-hidden="true">
            <b style={{ width: r[1] + "%" }}></b>
          </i>
          <span>{pct(r[1])}</span>
        </div>
      ))}
    </div>
  );
}

const WHY_MAP: [string, string][] = [
  [
    "Mobil uyumlu ve hızlı tasarım",
    "Mobil ziyaretlerin yarısından fazlası, sayfa 3 saniyede açılmazsa yarıda bırakılıyor (%53).",
  ],
  [
    "WhatsApp entegrasyonu",
    "İnternet kullananların %90'ı WhatsApp kullanıyor. Müşteri size zaten kullandığı uygulamadan tek dokunuşla yazar.",
  ],
  [
    "Google Maps ve temel SEO",
    "Yakınındaki bir şeyi telefondan arayanların %76'sı bir gün içinde ilgili bir işletmeyi ziyaret ediyor. Aramada ve haritada görünmek bu yüzden önemli.",
  ],
  [
    "Modern tasarım",
    "Güvenilirlik değerlendirmelerinde en sık bakılan şey sitenin görünüşü (%46,1). İlk kanı ise yarım saniyeden çok daha kısa sürede oluşuyor.",
  ],
];

const WHY_SOURCES: { t: string; u?: string }[] = [
  { t: "TÜİK, Hanehalkı Bilişim Teknolojileri (BT) Kullanım Araştırması, 2025 ve 2026 (16-74 yaş).", u: "https://data.tuik.gov.tr" },
  {
    t: "Cushman & Wakefield | TR International, 12. İstanbul Alışveriş Caddeleri Raporu, 2025 (İstiklal Caddesi ziyaretçi sayısı).",
    u: "https://www.nefes.com.tr/alisveris-caddelerinde-buyuk-ayrisma-istiklal-caddesi-zirvede-114589",
  },
  {
    t: "DataReportal, Digital 2025: Turkey, Ocak 2025 (internet kullanıcı sayısı).",
    u: "https://datareportal.com/reports/digital-2025-turkey",
  },
  {
    t: "Google, Mobile Search Trends: Consumers to Stores, 2016 (ABD, akıllı telefon kullanıcıları).",
    u: "https://www.thinkwithgoogle.com/_qs/documents/620/mobile-search-trends-consumers-to-stores.pdf",
  },
  {
    t: "Google, The Need for Mobile Speed / mobil sayfa yükleme süresi verileri, 2016.",
    u: "https://thinkwithgoogle.com/consumer-insights/consumer-trends/mobile-site-load-time-statistics/",
  },
  { t: "Fogg, B. J. vd., How Do People Evaluate a Web Site's Credibility?, Stanford Persuasive Technology Lab, 2002 (2.684 katılımcı)." },
  { t: "Lindgaard, G. vd., Attention web designers: You have 50 milliseconds to make a good first impression!, Behaviour & Information Technology, 2006." },
];

export function WhyPage() {
  const { startCheckout } = useApp();
  return (
    <main id="main">
      <section className="sec" style={{ paddingBottom: "24px" }}>
        <div className="container-x">
          <h1 className="h-1" style={{ maxWidth: "17ch" }}>
            Müşterileriniz sizi önce internette arar.
          </h1>
          <p className="lead" style={{ marginTop: "18px" }}>
            Adres bakmak, çalışma saatini öğrenmek, fiyat sormak: bunların çoğu artık telefondan, birkaç saniyede
            yapılıyor. Aşağıdaki araştırmalar, bir web sitesinin işletmeniz için neden bu kadar çok iş yaptığını
            gösteriyor.
          </p>
        </div>
      </section>

      <section className="sec-s" aria-labelledby="w1">
        <div className="container-x">
          <div className="why-h">
            <h2 className="h-2" id="w1">
              Türkiye&apos;de internet artık herkesin elinde.
            </h2>
            <p className="fine">Kaynak: TÜİK, Hanehalkı Bilişim Teknolojileri Kullanım Araştırması (16-74 yaş).</p>
          </div>
          <div className="stat-grid">
            <div className="stat">
              <div className="stat-n">%92,3</div>
              <p>İnternet kullanıyor. Oran her yıl artıyor.</p>
              <Trend
                label="İnternet kullanım oranı, yıllara göre"
                rows={[
                  [2024, 88.8],
                  [2025, 90.9],
                  [2026, 92.3],
                ]}
              />
            </div>
            <div className="stat">
              <div className="stat-n">%60</div>
              <p>Son bir yılda internetten ürün veya hizmet satın aldı ya da sipariş verdi.</p>
              <Trend
                label="İnternetten satın alma oranı, yıllara göre"
                rows={[
                  [2024, 51.7],
                  [2025, 55.7],
                  [2026, 60.0],
                ]}
              />
            </div>
            <div className="stat">
              <div className="stat-n">%90</div>
              <p>İnternet kullananların WhatsApp kullanma oranı. En yaygın uygulama WhatsApp.</p>
              <p className="src">TÜİK, 2026</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-s" aria-labelledby="w1b">
        <div className="container-x">
          <div className="why-h">
            <h2 className="h-2" id="w1b" style={{ maxWidth: "26ch" }}>
              İstiklal&apos;in en kalabalık gününden bile daha çok insan, her gün internette.
            </h2>
          </div>
          <div className="stat-grid two">
            <div className="stat">
              <div className="stat-n">240 bin</div>
              <p>
                İstiklal Caddesi&apos;nden (Taksim) hafta içi bir günde geçen tahmini ziyaretçi sayısı — Türkiye&apos;nin en
                çok ziyaret edilen caddesi.
              </p>
              <p className="src">Cushman &amp; Wakefield, 2025</p>
            </div>
            <div className="stat">
              <div className="stat-n">77,3 milyon</div>
              <p>Türkiye&apos;de internet kullanan kişi sayısı — nüfusun %88,3&apos;ü.</p>
              <p className="src">DataReportal, 2025</p>
            </div>
          </div>
          <p className="fine" style={{ marginTop: "14px", maxWidth: "70ch" }}>
            Yani İstiklal&apos;in en kalabalık hafta içi gününün 300&apos;den fazla katı insan, her gün internette.
            Dükkânınız Türkiye&apos;nin en işlek caddesinde olsa bile günde yüz binlerce kişiye görünür; bir web sitesi
            aynı anda milyonlarca kişiye, 7/24 açık kalır. (Cadde rakamı ziyaret sayısıdır, aynı kişi günde birden
            fazla kez geçebilir; internet kullanıcı sayısı ise kişi tahminidir — yöntemleri farklıdır, karşılaştırma
            büyüklüğü hissettirmek içindir.)
          </p>
        </div>
      </section>

      <section className="sec-s" aria-labelledby="w2">
        <div className="container-x">
          <div className="why-h">
            <h2 className="h-2" id="w2">
              Aramadan kapınıza giden yol kısa.
            </h2>
            <p className="fine">Kaynak: Google, 2016. Veriler ABD&apos;de ölçülmüştür.</p>
          </div>
          <div className="stat-grid two">
            <div className="stat">
              <div className="stat-n">%76</div>
              <p>Telefonundan yakınındaki bir şeyi arayanların bir gün içinde ilgili bir işletmeyi ziyaret etme oranı.</p>
            </div>
            <div className="stat">
              <div className="stat-n">%28</div>
              <p>Yakındaki bir şey için yapılan bu aramaların satın almayla sonuçlanma oranı.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-s" aria-labelledby="w3">
        <div className="container-x">
          <div className="why-h">
            <h2 className="h-2" id="w3">
              İlk izlenim saniyeler içinde oluşuyor.
            </h2>
          </div>
          <div className="stat-grid">
            <div className="stat">
              <div className="stat-n">
                0,05<small>sn</small>
              </div>
              <p>Ziyaretçinin bir sitenin görünüşü hakkında ilk kanısını oluşturduğu süre.</p>
              <p className="src">Lindgaard vd., 2006</p>
            </div>
            <div className="stat">
              <div className="stat-n">%46,1</div>
              <p>Bir sitenin güvenilirliğini değerlendirirken kısmen görsel tasarıma bakan katılımcıların oranı. En sık bakılan etken bu.</p>
              <p className="src">Stanford Web Credibility Project, 2002</p>
            </div>
            <div className="stat">
              <div className="stat-n">%53</div>
              <p>3 saniyeden uzun sürede açılan mobil sitelerde yarıda bırakılan ziyaretlerin oranı.</p>
              <p className="src">Google, 2016</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-s" aria-labelledby="w4">
        <div className="container-x">
          <div className="why-h">
            <h2 className="h-2" id="w4">
              Bu rakamlar sitenizde neye dönüşür?
            </h2>
          </div>
          <div>
            {WHY_MAP.map((r) => (
              <div className="maprow" key={r[0]}>
                <b>{r[0]}</b>
                <p>{r[1]}</p>
              </div>
            ))}
          </div>
          <div className="hero-cta" style={{ marginTop: "30px" }}>
            <button className="btn btn-primary btn-lg" onClick={() => startCheckout()}>
              Web Sitesi Edinin
            </button>
          </div>
        </div>
      </section>

      <section className="sec-s" aria-labelledby="w5" style={{ paddingBottom: "96px" }}>
        <div className="container-x">
          <h2 className="h-3" id="w5" style={{ marginBottom: "14px" }}>
            Kaynaklar
          </h2>
          <ol className="srcs">
            {WHY_SOURCES.map((x) => (
              <li key={x.t}>
                {x.u ? (
                  <a href={x.u} target="_blank" rel="noopener noreferrer">
                    {x.t}
                  </a>
                ) : (
                  x.t
                )}
              </li>
            ))}
          </ol>
          <p className="fine" style={{ marginTop: "14px", maxWidth: "70ch" }}>
            Google, Stanford ve Lindgaard araştırmaları Türkiye dışında yapılmıştır; Türkiye&apos;ye ait birebir
            oranlar değildir, genel eğilimi göstermek için verilmiştir.
          </p>
        </div>
      </section>
    </main>
  );
}
