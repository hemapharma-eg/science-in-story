import Link from 'next/link';
import { articles as localArticles, categories as localCategories, subcategories } from '@/lib/data';
import './globals.css';
import * as framerMotion from 'framer-motion';

// Mock framer-motion client wrapper to allow motion components without "use client" on the whole page,
// but actually, we need a client component for framer-motion. Since the home page is a server component,
// Framer Motion limits what animations you can do natively on Server Components. 
// A simple fade in is better left to CSS if we don't extract it to a Client wrapper.

export const revalidate = 60; // Revalidate every minute

export default async function HomePage() {
  const articles = localArticles
    .filter(a => a.isPublished)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10)
    .map(article => ({
      ...article,
      category: localCategories.find(c => c.id === article.categoryId) || null
    }));

  const categories = localCategories.map(cat => ({
    ...cat,
    subcategories: subcategories.filter(sub => sub.categoryId === cat.id)
  }));

  return (
    <div className="home-page" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-pop-in {
          animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <section className="hero-section glass-panel animate-pop-in" style={{ padding: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>مرحباً بك في العلم في حكاية</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--foreground)', opacity: 0.8 }}>
          اكتشف أعظم الحكايات العلمية، مقالات وفيديوهات مشوقة تأخذك في رحلة معرفية.
        </p>
      </section>

      <div className="content-grid" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Main Feed */}
        <div className="feed" style={{ flex: '3', minWidth: '300px' }}>
          <h3 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
            أحدث المقالات
          </h3>
          <div className="articles-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {articles.length === 0 ? (
              <p>لا توجد مقالات منشورة حالياً.</p>
            ) : (
              articles.map((article) => (
                <article key={article.id} className="article-card glass-panel" style={{ padding: '1.5rem', transition: 'transform 0.2s' }}>
                  <Link href={`/article/${article.slug}`}>
                    <h4 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                      {article.title}
                    </h4>
                  </Link>
                  {article.category && (
                    <span style={{ fontSize: '0.9rem', background: 'var(--primary)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                      {article.category.name}
                    </span>
                  )}
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

        {/* Sidebar */}
        <aside className="sidebar" style={{ flex: '1', minWidth: '250px' }}>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
              التصنيفات
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/category/${cat.slug}`} style={{ fontWeight: '600' }}>
                    {cat.name}
                  </Link>
                  {cat.subcategories.length > 0 && (
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.4rem', marginRight: '1rem', listStyle: 'circle' }}>
                      {cat.subcategories.map(sub => (
                        <li key={sub.id}>{sub.name}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              {categories.length === 0 && <p>لا توجد تصنيفات.</p>}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
