import Papa from 'papaparse';

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

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1dM7zIfR0wsU2meX91XjYMnMlczJbbWWDxwnoOhwvc6w/export?format=csv';

interface SheetRow {
  Title: string;
  Slug: string;
  Category: string;
  YouTube: string;
  Content: string;
}

export async function fetchContent() {
  try {
    const res = await fetch(SHEET_URL, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.error('Failed to fetch from Google Sheets');
      return { articles: [], categories: [], subcategories: [] };
    }

    const csvText = await res.text();
    
    const parsed = Papa.parse<SheetRow>(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    const articles: Article[] = [];
    const categoriesMap = new Map<string, Category>();

    // Give a consistent timezone-agnostic date for ordering 
    // If you want dates, you would add a "Date" column to the sheet.
    // For now we just give everything "now" as a fallback, or better yet
    // just order them by the row index (newest first or last based on spreadsheet indexing).
    let datePointer = Date.now(); 

    for (const row of parsed.data) {
      if (!row.Title || !row.Slug) continue;

      const catName = row.Category ? row.Category.trim() : 'عام';
      const catSlug = encodeURIComponent(catName.toLowerCase().replace(/\s+/g, '-'));

      if (!categoriesMap.has(catSlug)) {
        categoriesMap.set(catSlug, {
          id: catSlug,
          name: catName,
          slug: catSlug,
        });
      }

      articles.push({
        id: row.Slug.trim(),
        title: row.Title.trim(),
        slug: row.Slug.trim(),
        body: row.Content || '',
        youtubeUrl: row.YouTube ? row.YouTube.trim() : undefined,
        categoryId: catSlug,
        isPublished: true,
        // Fake date decrementing for natural ordering by spreadsheet insertion order
        createdAt: new Date(datePointer -= 1000).toISOString()
      });
    }

    return {
      articles,
      categories: Array.from(categoriesMap.values()),
      subcategories: [] as Subcategory[]
    };
  } catch (error) {
    console.error('Error parsing Google Sheets data:', error);
    return { articles: [], categories: [], subcategories: [] as Subcategory[] };
  }
}
