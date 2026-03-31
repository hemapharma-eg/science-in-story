import Link from 'next/link';
import { fetchContent } from '@/lib/data';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const { categories } = await fetchContent();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const { categories } = await fetchContent();
  const category = categories.find(c => c.slug === p.slug);
  if (!category) return {};
  return { title: `تصنيف: ${category.name} - العلم في حكاية` };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const { articles, categories, subcategories } = await fetchContent();
  const foundCat = categories.find(c => c.slug === p.slug);

  const category = foundCat ? {
    ...foundCat,
    subcategories: (subcategories as any[]).filter(s => s.categoryId === foundCat.id),
    articles: articles.filter(a => a.categoryId === foundCat.id && a.isPublished).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } : null;

  if (!category) return notFound();

  return (
    <div className="animate-fade-in">
      {/* Back nav */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link href="/" style={{ color: 'var(--primary-light)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.3s' }}>
          → العودة للرئيسية
        </Link>
      </div>

      <header className="category-header glass-panel">
        <h1>{category.name}</h1>
        <p style={{ marginTop: '1rem', color: 'var(--foreground-muted)' }}>تعرض المقالات والفيديوهات ضمن هذا التصنيف</p>
      </header>

      {category.subcategories.length > 0 && (
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          {category.subcategories.map((sub: any) => (
            <span key={sub.id} className="subcategory-tag">{sub.name}</span>
          ))}
        </div>
      )}

      <div className="search-results-grid stagger-children">
        {category.articles.length === 0 ? (
          <div className="empty-state glass-panel">
            <p>لا توجد مقالات منشورة في هذا التصنيف حالياً.</p>
          </div>
        ) : (
          category.articles.map((article) => (
            <article key={article.id} className="article-card glass-panel animate-fade-in">
              <Link href={`/article/${article.slug}`}>
                <h4 className="article-card-title">{article.title}</h4>
              </Link>
              {article.youtubeUrl && (
                <span className="video-badge">🎥 يحتوي على فيديو</span>
              )}
              {article.body && (
                <p style={{ color: 'var(--foreground-muted)', fontSize: '0.95rem', marginTop: '0.8rem', lineHeight: '1.7' }}>
                  {article.body.replace(/<[^>]+>/g, '').substring(0, 120)}...
                </p>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  );
}
