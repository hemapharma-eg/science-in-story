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
  imageUrl?: string;
  youtubeUrl?: string;
  categoryId?: string;
  keywords?: string;
  externalLinks?: string;
  isPublished: boolean;
  createdAt: string;
}

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1dM7zIfR0wsU2meX91XjYMnMlczJbbWWDxwnoOhwvc6w/export?format=csv';

/**
 * Arabic-to-Latin transliteration map for SEO-friendly URL slugs.
 * Produces readable romanized slugs (e.g. تاريخ → tarikh, علم نفس → elm-nafs).
 */
const ARABIC_TO_LATIN: Record<string, string> = {
  'ا': 'a', 'أ': 'a', 'إ': 'e', 'آ': 'aa', 'ب': 'b', 'ت': 't', 'ث': 'th',
  'ج': 'j', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'dh', 'ر': 'r', 'ز': 'z',
  'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'd', 'ط': 't', 'ظ': 'z', 'ع': 'a',
  'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n',
  'ه': 'h', 'و': 'w', 'ي': 'y', 'ى': 'a', 'ة': 'a', 'ئ': 'e', 'ؤ': 'o',
  'ء': '', 'ﻻ': 'la', 'ﻷ': 'la', 'ﻹ': 'le', 'ﻵ': 'laa',
  // Diacritics (tashkeel) – strip them
  '\u064B': '', '\u064C': '', '\u064D': '', '\u064E': '', '\u064F': '',
  '\u0650': '', '\u0651': '', '\u0652': '',
};

/**
 * Generate an ASCII-safe, SEO-friendly slug from any text (including Arabic).
 * Arabic text is transliterated to Latin characters (e.g. تاريخ → tarikh).
 * This preserves keyword meaning for search engines while being URL-safe.
 */
function toSafeSlug(text: string): string {
  // First try: if it's already ASCII-safe, just clean it up
  const ascii = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (ascii.length > 0) return ascii;

  // Transliterate Arabic to Latin
  let result = '';
  for (const char of text) {
    if (char in ARABIC_TO_LATIN) {
      result += ARABIC_TO_LATIN[char];
    } else if (char === ' ' || char === '\t') {
      result += '-';
    } else if (/[a-zA-Z0-9]/.test(char)) {
      result += char.toLowerCase();
    }
    // Skip any other non-mapped characters
  }

  // Clean up: collapse multiple dashes, trim dashes from edges
  return result.replace(/-+/g, '-').replace(/^-|-$/g, '') || 'general';
}

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
    const res = await fetch(SHEET_URL);
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
      const catSlug = toSafeSlug(catName);

      if (!categoriesMap.has(catSlug)) {
        categoriesMap.set(catSlug, {
          id: catSlug,
          name: catName,
          slug: catSlug,
        });
      }

      const articleSlug = toSafeSlug(row['Slug'].trim());

      articles.push({
        id: articleSlug,
        title: row['Title'].trim(),
        slug: articleSlug,
        body: (row['Content'] || '').includes('<p>') 
          ? row['Content'] 
          : (row['Content'] || '')
              .split(/\r?\n\r?\n/)
              .filter(p => p.trim() !== '')
              .map(p => `<p>${p.replace(/\r?\n/g, '<br />')}</p>`)
              .join(''),
        imageUrl: row['Image URL'] ? row['Image URL'].trim() : undefined,
        youtubeUrl: row['YouTube'] ? row['YouTube'].trim() : undefined,
        categoryId: catSlug,
        keywords: row['Keywords'] ? row['Keywords'].trim() : undefined,
        externalLinks: row['External Links'] ? row['External Links'].trim() : undefined,
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
