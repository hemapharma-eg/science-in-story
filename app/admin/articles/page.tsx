import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { deleteArticle } from '@/app/actions';

export default async function AdminArticles() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--primary)' }}>إدارة المقالات والفيديوهات</h1>
        <Link href="/admin/articles/new" style={{ padding: '0.8rem 1.5rem', background: 'var(--primary)', color: 'white', borderRadius: '8px', fontWeight: 'bold' }}>
          ➕ إضافة جديد
        </Link>
      </div>

      <div className="articles-list">
        {articles.length === 0 ? <p>لا توجد مقالات مضافة.</p> : (
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {articles.map((article) => (
              <li key={article.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>{article.title}</h3>
                  <div style={{ fontSize: '0.9rem', color: 'gray', display: 'flex', gap: '1rem' }}>
                    <span>{article.isPublished ? '🟢 منشور' : '⚪ مسودة'}</span>
                    {article.category && <span>📁 {article.category.name}</span>}
                    {article.youtubeUrl && <span>🎥 فيديو مرفق</span>}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link href={`/admin/articles/edit/${article.id}`} style={{ padding: '0.5rem 1rem', background: 'var(--surface)', color: 'var(--foreground)', borderRadius: '4px', textDecoration: 'none' }}>
                    تعديل
                  </Link>
                  <form action={async () => {
                    'use server';
                    await deleteArticle(article.id);
                  }}>
                    <button type="submit" style={{ padding: '0.5rem 1rem', background: 'deeppink', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>حذف</button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
