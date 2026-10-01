const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

console.log('🔍 RUNNING MILPRIME TECHNICAL SEO & CANONICAL AUDIT...\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failCount++;
  }
}

// 1. Audit SEO.jsx implementation
console.log('1. Auditing src/components/common/SEO.jsx:');
const seoContent = fs.readFileSync(path.join(rootDir, 'src/components/common/SEO.jsx'), 'utf8');
assert(seoContent.includes('targetPath = canonical || url'), 'Supports both canonical and url props');
assert(!seoContent.includes('+1-800-842-9102'), 'Removed fake phone numbers from Organization schema');
assert(!seoContent.includes('twitter.com/milprime'), 'Removed fake Twitter profiles from Organization schema');
assert(!seoContent.includes('instagram.com/milprime'), 'Removed fake Instagram profiles from Organization schema');
assert(seoContent.includes('cleanTitle.includes(\'Milprime\')'), 'Prevents duplicate brand suffix');
assert(seoContent.includes('<link rel="canonical" href={canonicalUrl} />'), 'Emits self-referencing canonical URL');
assert(seoContent.includes('noindex ? ('), 'Emits conditional robots noindex / index meta tag');

// 2. Audit public pages canonicals & indexability
console.log('\n2. Auditing Public Pages:');
const homeContent = fs.readFileSync(path.join(rootDir, 'src/pages/HomePage.jsx'), 'utf8');
assert(homeContent.includes('canonical="/"'), 'HomePage has self canonical "/"');
assert(!homeContent.includes('noindex'), 'HomePage is indexable');
assert(homeContent.includes('WebSite') && homeContent.includes('Organization'), 'HomePage has WebSite and Organization schemas');

const shopContent = fs.readFileSync(path.join(rootDir, 'src/pages/ShopPage.jsx'), 'utf8');
assert(shopContent.includes('canonical={canonicalPath}'), 'ShopPage uses dynamic canonical for categories');
assert(shopContent.includes('CATEGORY_META'), 'ShopPage has distinct category metadata for watches, bags, clothing, accessories, home');
assert(shopContent.includes('<h1 className="text-3xl sm:text-4xl'), 'ShopPage renders semantic H1');

const productDetailContent = fs.readFileSync(path.join(rootDir, 'src/pages/ProductDetailPage.jsx'), 'utf8');
assert(productDetailContent.includes('canonical={`/product/${product.slug}`}'), 'ProductDetailPage has self canonical /product/:slug');
assert(productDetailContent.includes('itemCondition: \'https://schema.org/NewCondition\''), 'Product schema contains itemCondition');
assert(productDetailContent.includes('BreadcrumbList'), 'ProductDetailPage includes BreadcrumbList schema');
assert(!productDetailContent.includes('aggregateRating'), 'ProductDetailPage does not invent fake aggregateRating');

const aboutContent = fs.readFileSync(path.join(rootDir, 'src/pages/AboutPage.jsx'), 'utf8');
assert(aboutContent.includes('canonical="/about"'), 'AboutPage has canonical /about');

const contactContent = fs.readFileSync(path.join(rootDir, 'src/pages/ContactPage.jsx'), 'utf8');
assert(contactContent.includes('canonical="/contact"'), 'ContactPage has canonical /contact');

const blogContent = fs.readFileSync(path.join(rootDir, 'src/pages/BlogPage.jsx'), 'utf8');
assert(blogContent.includes('canonical="/blog"'), 'BlogPage has canonical /blog');

const blogArticleContent = fs.readFileSync(path.join(rootDir, 'src/pages/BlogArticlePage.jsx'), 'utf8');
assert(blogArticleContent.includes('canonical={`/blog/${post.slug}`}'), 'BlogArticlePage has canonical /blog/:slug');
assert(blogArticleContent.includes('BreadcrumbList'), 'BlogArticlePage includes BreadcrumbList schema');
assert(blogArticleContent.includes('isoDate'), 'BlogArticlePage derives date dynamically from post data');

// 3. Audit Private Pages (Noindex)
console.log('\n3. Auditing Private Pages (noindex):');
const loginContent = fs.readFileSync(path.join(rootDir, 'src/pages/LoginPage.jsx'), 'utf8');
assert(loginContent.includes('noindex={true}'), 'LoginPage has noindex={true}');

const registerContent = fs.readFileSync(path.join(rootDir, 'src/pages/RegisterPage.jsx'), 'utf8');
assert(registerContent.includes('noindex={true}'), 'RegisterPage has noindex={true}');

const cartContent = fs.readFileSync(path.join(rootDir, 'src/pages/CartPage.jsx'), 'utf8');
assert(cartContent.includes('noindex={true}'), 'CartPage has noindex={true}');

const checkoutContent = fs.readFileSync(path.join(rootDir, 'src/pages/CheckoutPage.jsx'), 'utf8');
assert(checkoutContent.includes('noindex={true}'), 'CheckoutPage has noindex={true}');

const paymentContent = fs.readFileSync(path.join(rootDir, 'src/pages/PaymentSuccessPage.jsx'), 'utf8');
assert(paymentContent.includes('noindex={true}'), 'PaymentSuccessPage has noindex={true}');

const adminContent = fs.readFileSync(path.join(rootDir, 'src/pages/AdminPage.jsx'), 'utf8');
assert(adminContent.includes('noindex={true}'), 'AdminPage has noindex={true}');

const notFoundContent = fs.readFileSync(path.join(rootDir, 'src/pages/NotFoundPage.jsx'), 'utf8');
assert(notFoundContent.includes('noindex={true}'), 'NotFoundPage has noindex={true}');

// 4. Audit Open Graph Image & Assets
console.log('\n4. Auditing OpenGraph & Robots Assets:');
assert(fs.existsSync(path.join(rootDir, 'public/og-image.jpg')), 'public/og-image.jpg exists');
const ogStat = fs.statSync(path.join(rootDir, 'public/og-image.jpg'));
assert(ogStat.size > 50000, `og-image.jpg has valid high-res file size (${Math.round(ogStat.size / 1024)} KB)`);

const robotsContent = fs.readFileSync(path.join(rootDir, 'public/robots.txt'), 'utf8');
assert(robotsContent.includes('Disallow: /admin'), 'robots.txt disallows /admin');
assert(robotsContent.includes('Disallow: /checkout'), 'robots.txt disallows /checkout');
assert(robotsContent.includes('Disallow: /cart'), 'robots.txt disallows /cart');
assert(robotsContent.includes('Disallow: /login'), 'robots.txt disallows /login');
assert(robotsContent.includes('Disallow: /register'), 'robots.txt disallows /register');
assert(robotsContent.includes('Sitemap: https://milprime.shop/sitemap.xml'), 'robots.txt points to correct sitemap.xml');

// 5. Audit Sitemap.xml
console.log('\n5. Auditing public/sitemap.xml:');
const sitemapContent = fs.readFileSync(path.join(rootDir, 'public/sitemap.xml'), 'utf8');
assert(sitemapContent.includes('https://milprime.shop/'), 'sitemap includes homepage');
assert(sitemapContent.includes('https://milprime.shop/shop'), 'sitemap includes shop');
assert(sitemapContent.includes('https://milprime.shop/shop/watches'), 'sitemap includes watches category');
assert(sitemapContent.includes('https://milprime.shop/shop/bags'), 'sitemap includes bags category');
assert(sitemapContent.includes('https://milprime.shop/product/aurelia-chronograph'), 'sitemap includes Aurelia Chronograph product');
assert(sitemapContent.includes('https://milprime.shop/product/noir-leather-weekender'), 'sitemap includes Noir Leather Weekender product');
assert(!sitemapContent.includes('/admin'), 'sitemap does not include /admin');
assert(!sitemapContent.includes('/cart'), 'sitemap does not include /cart');
assert(!sitemapContent.includes('/checkout'), 'sitemap does not include /checkout');
assert(!sitemapContent.includes('/login'), 'sitemap does not include /login');

// 6. Audit Database Schema and Seed Consistency
console.log('\n6. Auditing Database Schema & Seed Consistency:');
const schemaContent = fs.readFileSync(path.join(rootDir, 'supabase_schema.sql'), 'utf8');
const seedContent = fs.readFileSync(path.join(rootDir, 'supabase_products_seed.sql'), 'utf8');
assert(schemaContent.includes('images TEXT[]'), 'supabase_schema.sql defines images TEXT[]');
assert(!seedContent.includes('::jsonb'), 'supabase_products_seed.sql no longer casts images to ::jsonb');
assert(seedContent.includes('ARRAY['), 'supabase_products_seed.sql uses PostgreSQL ARRAY[] syntax matching TEXT[]');

console.log(`\n========================================`);
console.log(`TOTAL PASS: ${passCount} | TOTAL FAIL: ${failCount}`);
console.log(`========================================\n`);

if (failCount > 0) {
  process.exit(1);
}
