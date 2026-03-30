'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SearchableArticle {
  id: string;
  title: string;
  slug: string;
  body: string;
  youtubeUrl?: string;
  categoryName?: string;
}

export default function SearchBar({ articles }: { articles: SearchableArticle[] }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const results = query.length >= 2
    ? articles.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.body.toLowerCase().includes(query.toLowerCase()) ||
        (a.categoryName && a.categoryName.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const showResults = query.length >= 2 && isFocused;

  return (
    <div className="search-container" style={{ position: 'relative' }}>
      <span className="search-icon">🔍</span>
      <input
        id="search-bar"
        type="text"
        className="search-input"
        placeholder="ابحث في المقالات والفيديوهات..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        autoComplete="off"
      />
      {showResults && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: 0,
          right: 0,
          background: 'rgba(10, 10, 30, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border-hover)',
          borderRadius: '16px',
          padding: '0.5rem',
          zIndex: 999,
          maxHeight: '400px',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px var(--primary-glow)',
        }}>
          {results.length === 0 ? (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--foreground-muted)' }}>
              لا توجد نتائج لـ &quot;{query}&quot;
            </div>
          ) : (
            results.map(article => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                style={{
                  display: 'block',
                  padding: '1rem 1.2rem',
                  borderRadius: '12px',
                  transition: 'all 0.2s ease',
                  borderBottom: '1px solid rgba(124, 58, 237, 0.1)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(124, 58, 237, 0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                <div style={{ fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.3rem' }}>
                  {article.title}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {article.categoryName && (
                    <span className="category-badge" style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem' }}>
                      {article.categoryName}
                    </span>
                  )}
                  {article.youtubeUrl && (
                    <span style={{ color: 'var(--cyan)', fontSize: '0.8rem' }}>🎥 فيديو</span>
                  )}
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
