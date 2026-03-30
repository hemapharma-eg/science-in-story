import Link from 'next/link';
import { fetchContent } from '@/lib/data';
import { notFound } from 'next/navigation';

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
    <div className="category-page" style={{ padding: '2rem 0' }}>
      <header className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>{category.name}</h1>
        <p style={{ marginTop: '1rem', color: 'var(--foreground)' }}>تعرض المقالات والفيديوهات ضمن هذا التصنيف</p>
      </header>

      {category.subcategories.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3>التصنيفات الفرعية</h3>
          <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0, marginTop: '1rem' }}>
            {category.subcategories.map(sub => (
              <li key={sub.id} style={{ background: 'var(--surface)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                {sub.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="articles-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {category.articles.length === 0 ? (
          <p>لا توجد مقالات منشورة في هذا التصنيف حالياً.</p>
        ) : (
          category.articles.map((article) => (
            <article key={article.id} className="article-card glass-panel" style={{ padding: '1.5rem', transition: 'transform 0.2s' }}>
              <Link href={`/article/${article.slug}`}>
                <h4 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  {article.title}
                </h4>
              </Link>
              {article.youtubeUrl && (
                <div style={{ marginTop: '1rem', color: 'gray', fontSize: '0.9rem' }}>
                  🎥 يحتوي على فيديو
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  );
}
