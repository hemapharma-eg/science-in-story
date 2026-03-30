import Link from 'next/link';
import { fetchContent } from '@/lib/data';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const { articles } = await fetchContent();
  const article = articles.find(a => a.slug === p.slug);
  if (!article) return {};
  return { title: article.title + ' - العلم في حكاية' };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const { articles, categories } = await fetchContent();
  const foundArticle = articles.find(a => a.slug === p.slug);
  
  const article = foundArticle ? {
    ...foundArticle,
    category: categories.find(c => c.id === foundArticle.categoryId) || null
  } : null;

  if (!article) return notFound();

  // Helper to convert watch?v= format to embed/ format safely
  let embedUrl = article.youtubeUrl;
  if (embedUrl && embedUrl.includes('watch?v=')) {
    const videoIdMatch = embedUrl.match(/v=([^&]+)/);
    if (videoIdMatch && videoIdMatch[1]) {
      embedUrl = `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
  } else if (embedUrl && embedUrl.includes('youtu.be/')) {
    const videoIdMatch = embedUrl.split('youtu.be/')[1];
    if (videoIdMatch) {
      embedUrl = `https://www.youtube.com/embed/${videoIdMatch.split('?')[0]}`;
    }
  }

  return (
    <div className="animate-fade-in">
      {/* Back nav */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link href="/" style={{ color: 'var(--primary-light)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.3s' }}>
          → العودة للرئيسية
        </Link>
      </div>

      <article className="article-container glass-panel">
        <header>
          <h1 className="article-title">{article.title}</h1>
          {article.category && (
            <span className="article-category-tag">
              التصنيف: {article.category.name}
            </span>
          )}
        </header>
        
        {embedUrl && (
          <div className="video-wrapper">
            <iframe 
              src={embedUrl} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div 
          className="article-body" 
          dangerouslySetInnerHTML={{ __html: article.body }} 
        />
      </article>
    </div>
  );
}
