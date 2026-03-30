import Link from 'next/link';

export default function AdminIndex() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>لوحة التحكم - العلم في حكاية</h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--foreground)' }}>
        مرحباً بك في لوحة تحكم الموقع. من هنا يمكنك إضافة المقالات وتضمين الفيديوهات، وإدارة التصنيفات.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
        <Link href="/admin/articles/new" className="glass-panel" style={{ padding: '2rem', textAlign: 'center', transition: 'transform 0.2s' }}>
          <h3>➕ إضافة مقال/فيديو جديد</h3>
        </Link>
        <Link href="/admin/articles" className="glass-panel" style={{ padding: '2rem', textAlign: 'center', transition: 'transform 0.2s' }}>
          <h3>📋 إدارة المقالات</h3>
        </Link>
        <Link href="/admin/categories" className="glass-panel" style={{ padding: '2rem', textAlign: 'center', transition: 'transform 0.2s' }}>
          <h3>📂 إدارة التصنيفات</h3>
        </Link>
      </div>
    </div>
  );
}
