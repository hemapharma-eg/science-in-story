import { prisma } from '@/lib/prisma';
import EditorClient from './EditorClient';

export default async function NewArticlePage() {
  const categories = await prisma.category.findMany();

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>إنشاء مقال/فيديو جديد</h1>
      <EditorClient categories={categories} />
    </div>
  );
}
