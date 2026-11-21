import Link from "next/link";
import { ProductArt } from "@/components/art";
import { ProductCard } from "@/components/catalog";
import { DemoFrame } from "@/components/demos";
import { Icon } from "@/components/icons";
import { Checklist, Closing, Crumbs, FaqList, SecHead, Steps } from "@/components/ui";
import {
  WEB_ADDONS,
  WEB_CUSTOM,
  getProduct,
  infoHref,
  whatsAppText,
  type Product,
} from "@/data/products";

export function ProductHeroFigure({ p }: { p: Product }) {
  return (
    <figure className="phero-shot">
      <div role="img" aria-label={p.alt} className="phero-art">
        <span aria-hidden="true">
          <ProductArt kind={p.art} uid={`hero-${p.slug}`} />
        </span>
      </div>
      {p.caption && <figcaption className="fine">{p.caption}</figcaption>}
    </figure>
  );
}

/** Kapanış metnini ilk cümle (başlık) ve kalanı (açıklama) olarak ayırır; noktalı virgülde de böler. */
function splitClosing(t: string): [string, string | undefined] {
  const m = /[.?;]\s/.exec(t) || (t.length > 80 ? /,\s/.exec(t) : null);
  if (!m) return [t, undefined];
  const head = t.slice(0, m.index) + (t[m.index] === ";" || t[m.index] === "," ? "." : t[m.index]);
  const rest = t.slice(m.index + 2);
  return [head, rest.charAt(0).toLocaleUpperCase("tr") + rest.slice(1)];
}

export function ProductPage({ p }: { p: Product }) {
  const cta = { label: "Bilgi Alın", href: infoHref(p.slug) };
  const related = p.related.map((s) => getProduct(s)).filter((x): x is Product => !!x);
  return (
    <main id="main">
      <section className="phero">
        <div className="container-x phero-grid">
          <div className="phero-copy">
            <Crumbs items={[{ label: "Ürünler", href: "/urunler" }, { label: p.name }]} />
            <p className="pname">
              <Icon n={p.icon} size={20} sw={1.8} />
              {p.name}
            </p>
            <h1 className="h-1">{p.title}</h1>
            <p className="lead">{p.lead}</p>
            <div className="hero-cta">
              <Link className="btn btn-primary btn-lg" href={cta.href}>
                {cta.label}
              </Link>
              <a className="btn btn-line btn-lg" href="#demo">
                {p.secondary}
              </a>
            </div>
          </div>
          <ProductHeroFigure p={p} />
        </div>
      </section>

      <section className="sec" aria-labelledby="adimlar">
        <div className="container-x">
          <SecHead id="adimlar" title={p.stepsTitle} />
          <Steps steps={p.steps} />
        </div>
      </section>

      {(p.features || p.chips) && (
        <section className="sec sec-tint" aria-labelledby="ozellik">
          <div className="container-x">
            {p.features && (
              <>
                <SecHead id="ozellik" title={p.features.title} />
                <dl className="ftable">
                  {p.features.items.map((f) => (
                    <div key={f.t}>
                      <dt>{f.t}</dt>
                      <dd>{f.d}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
            {p.chips && (
              <div className={p.features ? "chips-block mt" : "chips-block"}>
                <div>
                  <h2 className="h-2" id={p.features ? undefined : "ozellik"}>
                    {p.chips.title}
                  </h2>
                  {p.chips.intro && <p className="lead">{p.chips.intro}</p>}
                </div>
                <Checklist items={p.chips.items} cls="chk-grid" />
              </div>
            )}
            {p.sample && (
              <div className="sample">
                <span className="tag tag-sample">{p.sample.title}</span>
                <ul>
                  {p.sample.lines.map((l) => {
                    const [k, ...rest] = l.split(": ");
                    return (
                      <li key={l}>
                        <b>{k}:</b> {rest.join(": ")}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="sec" id="demo" aria-labelledby="demo-h">
        <div className="container-x">
          <SecHead id="demo-h" title={p.demoTitle} sub={p.demoIntro} />
          <DemoFrame kind={p.art} title={p.name} />
        </div>
      </section>

      {p.slug === "web-sitesi-paketi" && (
        <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="ek">
          <div className="container-x">
            <div className="addon-box">
              <div>
                <h2 className="h-2" id="ek">
                  Ek seçenekler
                </h2>
                <p className="lead">{p.setup.text}</p>
                <Link className="linkb" href="/neden-web-sitesi">
                  Kurumsal Bir Web Sitesi İşletmenize Ne Katar?
                </Link>
              </div>
              <div>
                <p className="mini-h">Ek seçenekler</p>
                <div className="chips static">
                  {WEB_ADDONS.map((a) => (
                    <span key={a} className="chip">
                      {a}
                    </span>
                  ))}
                </div>
                <p className="mini-h">Özel kapsam</p>
                <div className="chips static">
                  {WEB_CUSTOM.map((a) => (
                    <span key={a} className="chip ghost">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <div className="fitw">
            <div>
              <h2 className="h-3">Kimler için?</h2>
              <p>{p.forWho}</p>
            </div>
            {p.slug !== "web-sitesi-paketi" && (
              <div>
                <h2 className="h-3">{p.setup.title}</h2>
                <p>{p.setup.text}</p>
                <Link className="btn btn-primary" href={cta.href}>
                  {cta.label}
                </Link>
              </div>
            )}
            {p.slug === "web-sitesi-paketi" && (
              <div>
                <h2 className="h-3">Proje başlangıcı</h2>
                <p>
                  Çalışma onaylandığında size özel bir proje numarası iletiriz. Logo, görsel ve hizmet metinlerinizi proje başlangıç formundan
                  paylaşırsınız.
                </p>
                <Link className="linkb" href="/proje-baslangic">
                  Proje Başlangıç Formu
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="sss">
        <div className="container-x narrow">
          <SecHead id="sss" title="Sık sorulan sorular" />
          <FaqList items={p.faqs} idPrefix={`sss-${p.slug}`} />
        </div>
      </section>

      <Closing
        title={splitClosing(p.closing)[0]}
        text={splitClosing(p.closing)[1]}
        primary={cta}
        whatsapp={whatsAppText(p.name)}
      />

      {related.length > 0 && (
        <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="diger">
          <div className="container-x">
            <SecHead
              id="diger"
              title="Diğer ürünler"
              right={
                <Link className="btn btn-line" href="/urunler">
                  Tüm Ürünleri İnceleyin
                </Link>
              }
            />
            <div className="pgrid">
              {related.map((o) => (
                <ProductCard key={o.slug} p={o} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

