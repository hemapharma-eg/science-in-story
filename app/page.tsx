import Link from 'next/link';
import { fetchContent } from '@/lib/data';
import './globals.css';
import SearchBar from './components/SearchBar';

export const revalidate = 60;

export default async function HomePage() {
  const { articles: fetchedArticles, categories: fetchedCategories, subcategories } = await fetchContent();

  const articles = fetchedArticles
    .filter(a => a.isPublished)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 20)
    .map(article => ({
      ...article,
      category: fetchedCategories.find(c => c.id === article.categoryId) || null
    }));

  const categories = fetchedCategories.map(cat => ({
    ...cat,
    subcategories: subcategories.filter(sub => sub.categoryId === cat.id)
  }));

  // Prepare search data for the client component
  const searchableArticles = articles.map(a => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    body: a.body.substring(0, 300),
    youtubeUrl: a.youtubeUrl,
    categoryName: a.category?.name,
  }));

  return (
    <div className="home-page animate-fade-in">
      {/* Hero */}
      <section className="hero-section glass-panel animate-pop-in" style={{ marginBottom: '2.5rem' }}>
        <h2 className="hero-title">العلم في حكاية</h2>
        <p className="hero-subtitle">
          اكتشف أعظم الحكايات العلمية، مقالات وفيديوهات مشوقة تأخذك في رحلة معرفية.
        </p>
      </section>

      {/* Search */}
      <SearchBar articles={searchableArticles} />

      {/* Content Grid */}
      <div className="content-grid" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
        {/* Main Feed */}
        <div className="feed" style={{ flex: '3', minWidth: '300px' }}>
          <h3 className="section-title">أحدث المقالات</h3>
          <div className="search-results-grid stagger-children">
            {articles.length === 0 ? (
              <div className="empty-state glass-panel">
                <p style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>📚</p>
                <p>لا توجد مقالات منشورة حالياً.</p>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>أضف محتوى في جدول البيانات وسيظهر هنا تلقائياً!</p>
              </div>
            ) : (
              articles.map((article) => (
                <article key={article.id} className="article-card glass-panel animate-fade-in">
                  <Link href={`/article/${article.slug}`}>
                    <h4 className="article-card-title">{article.title}</h4>
                  </Link>
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '0.5rem' }}>
                    {article.category && (
                      <span className="category-badge">{article.category.name}</span>
                    )}
                    {article.youtubeUrl && (
                      <span className="video-badge">🎥 يحتوي على فيديو</span>
                    )}
                  </div>
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

        {/* Sidebar */}
        <aside className="sidebar" style={{ flex: '1', minWidth: '260px' }}>
          <div className="glass-panel sidebar-panel">
            <h3 className="section-title">التصنيفات</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '1rem' }}>
              {categories.map((cat) => (
                <div key={cat.id}>
                  <Link href={`/category/${cat.slug}`} className="category-link">
                    {cat.name}
                  </Link>
                </div>
              ))}
              {categories.length === 0 && (
                <p style={{ color: 'var(--foreground-muted)', padding: '0.5rem' }}>لا توجد تصنيفات.</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
