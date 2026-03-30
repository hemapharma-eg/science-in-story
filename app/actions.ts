'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Category Actions
export async function createCategory(formData: FormData) {
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;

  if (!name || !slug) throw new Error('Missing fields');

  await prisma.category.create({
    data: { name, slug }
  });

  revalidatePath('/admin/categories');
  return { success: true };
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({ where: { id } });
  revalidatePath('/admin/categories');
  return { success: true };
}

// Subcategory Actions
export async function createSubcategory(formData: FormData) {
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const categoryId = formData.get('categoryId') as string;

  if (!name || !slug || !categoryId) throw new Error('Missing fields');

  await prisma.subcategory.create({
    data: { name, slug, categoryId }
  });

  revalidatePath('/admin/categories');
  return { success: true };
}

// Article Actions
export async function createArticle(data: {
  title: string;
  slug: string;
  body: string;
  youtubeUrl?: string;
  categoryId?: string;
  isPublished: boolean;
}) {
  await prisma.article.create({
    data
  });

  revalidatePath('/admin/articles');
  revalidatePath('/');
  return { success: true };
}

export async function updateArticle(id: string, data: {
  title: string;
  slug: string;
  body: string;
  youtubeUrl?: string;
  categoryId?: string;
  isPublished: boolean;
}) {
  await prisma.article.update({
    where: { id },
    data
  });

  revalidatePath('/admin/articles');
  revalidatePath(`/article/${data.slug}`);
  return { success: true };
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({ where: { id } });
  revalidatePath('/admin/articles');
  return { success: true };
}
