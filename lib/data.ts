export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  body: string;
  youtubeUrl?: string;
  categoryId?: string;
  isPublished: boolean;
  createdAt: string;
}

export const categories: Category[] = [
  { id: 'cat-1', name: 'الفيزياء', slug: 'physics' },
  { id: 'cat-2', name: 'الفضاء', slug: 'space' },
  { id: 'cat-3', name: 'التاريخ', slug: 'history' }
];

export const subcategories: Subcategory[] = [
  { id: 'sub-1', name: 'النسبية', slug: 'relativity', categoryId: 'cat-1' },
  { id: 'sub-2', name: 'النظام الشمسي', slug: 'solar-system', categoryId: 'cat-2' }
];

export const articles: Article[] = [
  {
    id: 'art-1',
    title: 'قصة الجاذبية ونيوتن',
    slug: 'newton-gravity',
    body: 'هذا المقال يشرح قصة الجاذبية وكيف اكتشفها السير إسحاق نيوتن...',
    categoryId: 'cat-1',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isPublished: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'art-2',
    title: 'رحلة أبولو 11 إلى القمر',
    slug: 'apollo-11',
    body: 'قصة أول هبوط للإنسان على سطح القمر في عام 1969 وكيف غير ذلك التاريخ.',
    categoryId: 'cat-2',
    isPublished: true,
    createdAt: new Date().toISOString()
  }
];
