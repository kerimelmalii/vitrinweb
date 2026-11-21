import { BlogBrowser, type PostLite } from "@/components/blog-browser";
import { BLOG, formatDate, readMin, type BlogPost } from "@/data/blog";

/* Blog kategorileri sayfada dört gruba toplanır; eski yazıların ayrıntılı kategorisi yazı içinde görünmeye devam eder. */
const GROUPS: Record<string, string> = {
  "Görsel ve İçerik": "Görsel ve İçerik",
  "Dijital Pazarlama": "Görsel ve İçerik",
  Reklam: "Reklam",
  "Stok ve Operasyon": "Stok ve Operasyon",
  Operasyon: "Stok ve Operasyon",
};
export const groupOf = (category: string): string => GROUPS[category] || "Web ve Görünürlük";

export const lite = (p: BlogPost): PostLite => ({
  slug: p.slug,
  title: p.title,
  description: p.description,
  coverAlt: p.coverAlt,
  category: p.category,
  group: groupOf(p.category),
  date: p.updated ?? p.date,
  dateText: formatDate(p.updated ?? p.date),
  mins: readMin(p),
});

export { PostCard } from "@/components/blog-browser";

export function BlogList() {
  return (
    <main id="main">
      <section className="sec page-top" style={{ paddingBottom: "96px" }}>
        <div className="container-x">
          <h1 className="h-1 page-h">İşletmeler için pratik dijital rehberler</h1>
          <p className="lead">
            Ürün çekimine başlamadan, haftalık reklam raporunu açmadan veya stok tablonuzu yenilemeden önce işinizi kolaylaştıracak sade rehberleri inceleyin.
          </p>
          <BlogBrowser posts={BLOG.map(lite)} />
        </div>
      </section>
    </main>
  );
}
