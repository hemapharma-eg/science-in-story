import Link from 'next/link';
import { fetchContent } from '@/lib/data';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const { articles } = await fetchContent();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const { articles, categories } = await fetchContent();
  const article = articles.find(a => a.slug === p.slug);
  if (!article) return {};
  const category = categories.find(c => c.id === article.categoryId);
  const plainBody = article.body.replace(/<[^>]+>/g, '').substring(0, 160);
  return {
    title: `${article.title} - العلم في حكاية`,
    description: plainBody || `${article.title} - مقال علمي من موقع العلم في حكاية`,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: plainBody || `${article.title} - العلم في حكاية`,
      type: 'article',
      ...(category && { section: category.name }),
    },
  };
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

        {article.externalLinks && (
          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary-light)' }}>روابط ومصادر إضافية 🔗</h3>
            <div 
              style={{ lineHeight: '1.8', color: 'var(--foreground-muted)' }}
              dangerouslySetInnerHTML={{ 
                __html: article.externalLinks
                  .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: var(--cyan); text-decoration: underline; word-break: break-all;">$1</a>')
                  .replace(/\r?\n/g, '<br />') 
              }} 
            />
          </div>
        )}

        {article.keywords && (
          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {article.keywords.split(/[,?\s]+/).map((kw, i) => {
              const keyword = kw.trim().replace(/^#/, '');
              if (!keyword) return null;
              return (
                <span key={i} style={{ 
                  background: 'rgba(124, 58, 237, 0.1)', 
                  border: '1px solid var(--border)', 
                  padding: '0.4rem 1rem', 
                  borderRadius: '20px', 
                  fontSize: '0.9rem',
                  color: 'var(--foreground)' 
                }}>
                  #{keyword}
                </span>
              );
            })}
          </div>
        )}
      </article>
    </div>
  );
}
