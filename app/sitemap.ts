import { MetadataRoute } from 'next';
import { fetchContent } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { articles, categories } = await fetchContent();
  const baseUrl = 'https://science-in-story.pages.dev';

  // Base pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // Article pages
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/article/${article.slug}/`,
    lastModified: new Date(article.createdAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticPages, ...articlePages, ...categoryPages];
}
