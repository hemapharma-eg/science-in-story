import { articles, categories } from '@/lib/data';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const article = articles.find(a => a.slug === p.slug);
  if (!article) return {};
  return { title: article.title + ' - العلم في حكاية' };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  // Make sure we fetch the slug safely and wait for params logic (Next.js 15+ wait params)
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
    <article className="article-container glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>{article.title}</h1>
        {article.category && (
          <span style={{ fontSize: '1rem', background: 'var(--surface)', padding: '0.4rem 0.8rem', borderRadius: '8px' }}>
            التصنيف: {article.category.name}
          </span>
        )}
      </header>
      
      {embedUrl && (
        <div className="video-wrapper" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', marginBottom: '2rem', borderRadius: '12px' }}>
          <iframe 
            src={embedUrl} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          ></iframe>
        </div>
      )}

      <div 
        className="article-body" 
        style={{ lineHeight: '2', fontSize: '1.2rem', color: 'var(--foreground)' }}
        dangerouslySetInnerHTML={{ __html: article.body }} 
      />
    </article>
  );
}
