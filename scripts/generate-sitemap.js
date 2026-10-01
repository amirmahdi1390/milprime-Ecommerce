import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to load .env file manually in Node
function loadEnv() {
  const envPath = path.join(rootDir, '.env');
  const env = {};
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        let value = (match[2] || '').trim();
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        env[match[1]] = value;
      }
    }
  }
  return { ...env, ...process.env };
}

async function fetchActiveProducts(supabaseUrl, supabaseKey) {
  if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Supabase credentials missing; checking fallback.');
    return [];
  }

  try {
    const client = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await client
      .from('products')
      .select('slug, category, updated_at, active')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('⚠️ Failed to fetch products from Supabase:', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.warn('⚠️ Error connecting to Supabase for sitemap:', err.message);
    return [];
  }
}

async function generateSitemap() {
  console.log('🗺️ Generating dynamic Milprime sitemap...');
  const env = loadEnv();
  const supabaseUrl = env.VITE_SUPABASE_URL;
  const supabaseKey = env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const baseUrl = 'https://milprime.shop';
  const currentDate = new Date().toISOString().split('T')[0];

  // 1. Static high-value routes
  const staticRoutes = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${baseUrl}/shop`, priority: '0.9', changefreq: 'daily' },
    { loc: `${baseUrl}/about`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${baseUrl}/blog`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${baseUrl}/contact`, priority: '0.6', changefreq: 'monthly' },
  ];

  // 2. Active Category routes
  const categorySlugs = ['watches', 'bags', 'clothing', 'accessories', 'home'];
  const categoryRoutes = categorySlugs.map((cat) => ({
    loc: `${baseUrl}/shop/${cat}`,
    priority: '0.8',
    changefreq: 'weekly',
  }));

  // 3. Blog articles
  const blogSlugs = [
    'art-of-modern-horology',
    'tactile-luxury-leather-craftsmanship',
  ];
  const blogRoutes = blogSlugs.map((slug) => ({
    loc: `${baseUrl}/blog/${slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  }));

  // 4. Dynamic Products from Supabase
  const products = await fetchActiveProducts(supabaseUrl, supabaseKey);
  console.log(`📦 Found ${products.length} active products in catalog.`);

  const seenUrls = new Set();
  const allEntries = [];

  function addEntry(entry) {
    if (!seenUrls.has(entry.loc)) {
      seenUrls.add(entry.loc);
      allEntries.push(entry);
    }
  }

  staticRoutes.forEach(addEntry);
  categoryRoutes.forEach(addEntry);
  blogRoutes.forEach(addEntry);

  products.forEach((prod) => {
    if (!prod.slug) return;
    const lastmod = prod.updated_at ? prod.updated_at.split('T')[0] : currentDate;
    addEntry({
      loc: `${baseUrl}/product/${prod.slug}`,
      lastmod,
      priority: '0.8',
      changefreq: 'weekly',
    });
  });

  const xmlUrls = allEntries
    .map((e) => {
      let xml = '  <url>\n';
      xml += `    <loc>${e.loc}</loc>\n`;
      if (e.lastmod) {
        xml += `    <lastmod>${e.lastmod}</lastmod>\n`;
      }
      xml += `    <changefreq>${e.changefreq}</changefreq>\n`;
      xml += `    <priority>${e.priority}</priority>\n`;
      xml += '  </url>';
      return xml;
    })
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>
`;

  const publicSitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, sitemapXml, 'utf8');
  console.log(`✅ Successfully generated sitemap with ${allEntries.length} verified URLs at ${publicSitemapPath}`);
}

generateSitemap().catch((err) => {
  console.error('❌ Sitemap generation failed:', err);
  process.exit(1);
});
