import Link from 'next/link';

export const metadata = {
  title: 'Admin Dashboard - العلم في حكاية',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout" style={{ display: 'flex', gap: '2rem', minHeight: '80vh' }}>
      <aside className="admin-sidebar glass-panel" style={{ width: '250px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
          إدارة المحتوى
        </h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link href="/admin" style={{ padding: '0.8rem', background: 'var(--surface)', borderRadius: '8px', transition: 'background 0.2s' }}>
             الرئيسية
          </Link>
          <Link href="/admin/articles" style={{ padding: '0.8rem', background: 'var(--surface)', borderRadius: '8px', transition: 'background 0.2s' }}>
            المقالات / الفيديوهات
          </Link>
          <Link href="/admin/categories" style={{ padding: '0.8rem', background: 'var(--surface)', borderRadius: '8px', transition: 'background 0.2s' }}>
            التصنيفات
          </Link>
        </nav>
      </aside>
      <main className="admin-content glass-panel" style={{ flex: 1, padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
}
