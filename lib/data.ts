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

/**
 * Lightweight CSV parser that works on the Edge Runtime.
 * Handles quoted fields with commas and newlines inside them.
 */
function parseCSV(csv: string): Record<string, string>[] {
  const rows: string[][] = [];
  let current = '';
  let inQuotes = false;
  let row: string[] = [];

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const next = csv[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        current += '"';
        i++; // skip escaped quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(current.trim());
        current = '';
      } else if (char === '\n' || (char === '\r' && next === '\n')) {
        row.push(current.trim());
        current = '';
        if (row.length > 0) rows.push(row);
        row = [];
        if (char === '\r') i++; // skip \n after \r
      } else {
        current += char;
      }
    }
  }

  // Push last field and row
  if (current || row.length > 0) {
    row.push(current.trim());
    rows.push(row);
  }

  if (rows.length < 2) return [];

  const headers = rows[0];
  const result: Record<string, string>[] = [];

  for (let i = 1; i < rows.length; i++) {
    const obj: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = rows[i][j] || '';
    }
    result.push(obj);
  }

  return result;
}

export async function fetchContent() {
  try {
    const res = await fetch(SHEET_URL, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.error('Failed to fetch from Google Sheets');
      return { articles: [], categories: [], subcategories: [] };
    }

    const csvText = await res.text();
    const parsed = parseCSV(csvText);

    const articles: Article[] = [];
    const categoriesMap = new Map<string, Category>();

    // Give a consistent timezone-agnostic date for ordering
    let datePointer = Date.now();

    for (const row of parsed) {
      if (!row['Title'] || !row['Slug']) continue;

      const catName = row['Category'] ? row['Category'].trim() : 'عام';
      const catSlug = encodeURIComponent(catName.toLowerCase().replace(/\s+/g, '-'));

      if (!categoriesMap.has(catSlug)) {
        categoriesMap.set(catSlug, {
          id: catSlug,
          name: catName,
          slug: catSlug,
        });
      }

      articles.push({
        id: row['Slug'].trim(),
        title: row['Title'].trim(),
        slug: row['Slug'].trim(),
        body: row['Content'] || '',
        youtubeUrl: row['YouTube'] ? row['YouTube'].trim() : undefined,
        categoryId: catSlug,
        isPublished: true,
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
