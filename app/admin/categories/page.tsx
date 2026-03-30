import { prisma } from '@/lib/prisma';
import { createCategory, deleteCategory } from '@/app/actions';

export default async function AdminCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>إدارة التصنيفات</h1>
      
      <form action={async (formData) => {
        'use server';
        await createCategory(formData);
      }} className="glass-panel" style={{ padding: '1.5rem', marginBottom: '3rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <input 
          type="text" 
          name="name" 
          placeholder="اسم التصنيف" 
          required 
          style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)' }}
        />
        <input 
          type="text" 
          name="slug" 
          placeholder="الرابط اللطيف (Slug)" 
          required 
          style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)' }}
        />
        <button type="submit" style={{ padding: '0.8rem 2rem', borderRadius: '8px', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          إضافة التصنيف
        </button>
      </form>

      <div className="categories-list">
        <h2>التصنيفات الحالية</h2>
        {categories.length === 0 ? <p>لا توجد تصنيفات بعد.</p> : (
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {categories.map((cat) => (
              <li key={cat.id} className="glass-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{cat.name}</strong> <span style={{ color: 'gray', fontSize: '0.9rem', marginRight: '1rem' }}>/{cat.slug}</span>
                </div>
                <form action={async () => {
                  'use server';
                  await deleteCategory(cat.id);
                }}>
                  <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: '4px', background: 'deeppink', color: 'white', border: 'none', cursor: 'pointer' }}>حذف</button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
