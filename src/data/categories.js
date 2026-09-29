export const CATEGORIES = [
  { id: 'all', name: 'All Products', slug: 'all' },
  { id: 'watches', name: 'Watches', slug: 'watches' },
  { id: 'bags', name: 'Bags', slug: 'bags' },
  { id: 'clothing', name: 'Clothing', slug: 'clothing' },
  { id: 'accessories', name: 'Accessories', slug: 'accessories' },
  { id: 'home', name: 'Home', slug: 'home' },
];

export const CATEGORY_NAMES = CATEGORIES.map((c) => c.name);

/**
 * Normalizes a category string to compare safely
 * @param {string} cat 
 * @returns {string}
 */
export function normalizeCategory(cat) {
  if (!cat) return '';
  return cat.toLowerCase().trim();
}
