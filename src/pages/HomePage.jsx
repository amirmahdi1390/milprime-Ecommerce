import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Truck,
  ArrowUpRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Compass,
  Feather,
  Gem,
  Layers,
  AlertTriangle,
} from 'lucide-react';
import { productService } from '../services/productService';
import { ProductCard } from '../features/products/ProductCard';
import { Button } from '../components/common/Button';
import { useUIStore } from '../store/uiStore';
import { SEO } from '../components/common/SEO';
import { BLOG_POSTS } from '../data/blogPosts';

export function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useUIStore();
  const carouselRef = useRef(null);

  const [error, setError] = useState(null);

  const loadFeatured = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getFeaturedProducts();
      setFeaturedProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load featured products from Supabase:', err);
      setError(err.message || 'Database connection error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeatured();
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    addToast('Thank you for subscribing to Milprime dispatches.', 'success');
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const categories = ['All', 'Watches', 'Bags', 'Clothing', 'Accessories', 'Home'];

  const filteredProducts =
    activeCategory === 'All'
      ? featuredProducts
      : featuredProducts.filter(
          (p) => (p.category || '').toLowerCase() === activeCategory.toLowerCase()
        );

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Milprime',
    url: 'https://milprime.shop',
    description:
      'Milprime curates exceptional leather carryalls, precision timepieces, and apparel defined by architectural discipline.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://milprime.shop/shop?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 text-left overflow-x-hidden">
      <SEO
        title="Milprime — Engineered With Restraint | Curated Modern Goods"
        description="Exceptional leather carryalls, precision timepieces, and apparel defined by architectural discipline. Discover the permanent collection."
        url="/"
        schema={homeSchema}
      />

      {/* 1. Hero Section - Responsive Split Composition (No text overflow) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#f4f4f5] border border-[#e4e4e7] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px] lg:min-h-[540px]">
            
            {/* Left Column: Dedicated High-Contrast Card */}
            <div className="lg:col-span-6 xl:col-span-5 p-8 sm:p-12 lg:p-14 xl:p-16 flex flex-col justify-center bg-white z-10 border-b lg:border-b-0 lg:border-r border-[#e4e4e7]">
              <div className="max-w-md space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black text-white w-fit">
                  Spring / Summer Edition
                </span>
                
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#09090b] leading-[1.08]">
                  Engineered with restraint.
                </h1>
                
                <p className="text-sm sm:text-base text-[#71717a] leading-relaxed">
                  Milprime curates exceptional leather carryalls, precision timepieces, and apparel defined by architectural discipline.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link to="/shop">
                    <Button variant="primary" size="lg" className="rounded-full px-7 shadow-xs">
                      Explore Collection <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full px-6 bg-white hover:bg-[#f4f4f5] border border-[#e4e4e7] text-[#09090b]"
                    >
                      Our Philosophy
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Split Image Canvas */}
            <div className="lg:col-span-6 xl:col-span-7 relative min-h-[320px] sm:min-h-[420px] lg:min-h-full overflow-hidden bg-[#e4e4e7]">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80"
                alt="Milprime Storefront Collection"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent lg:hidden" />
            </div>

          </div>
        </div>
      </section>

      {/* 2. Brand Trust & Core Value Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-6 border-y border-[#e4e4e7] bg-[#fafafa]/60 rounded-2xl px-6">
          <div className="flex items-center gap-3">
            <Layers className="h-5 w-5 text-[#09090b] shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#09090b]">Carefully Selected</p>
              <p className="text-[11px] text-[#71717a]">Archival quality pieces</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Feather className="h-5 w-5 text-[#09090b] shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#09090b]">Everyday Luxury</p>
              <p className="text-[11px] text-[#71717a]">Functional elegance</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Gem className="h-5 w-5 text-[#09090b] shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#09090b]">Thoughtful Materials</p>
              <p className="text-[11px] text-[#71717a]">Full-grain and titanium</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="h-5 w-5 text-[#09090b] shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#09090b]">Complimentary Support</p>
              <p className="text-[11px] text-[#71717a]">Dedicated concierge</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Brand Introduction Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#71717a]">
              The Milprime Standard
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#09090b] leading-tight">
              Quiet forms, enduring materials, and purposeful reduction.
            </h2>
            <p className="text-sm text-[#71717a] leading-relaxed">
              We reject transient novelties in favor of pieces that integrate seamlessly into your day. From vegetable-tanned Tuscan hides to scratch-resistant sapphire crystals, every item is subjected to rigorous durability thresholds before admission to our collection.
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#09090b] hover:underline"
              >
                Read our full story & manifesto <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="aspect-4/5 rounded-2xl overflow-hidden bg-[#f4f4f5] border border-[#e4e4e7]">
              <img
                src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"
                alt="Horology Studio"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-4/5 rounded-2xl overflow-hidden bg-[#f4f4f5] border border-[#e4e4e7] mt-8">
              <img
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
                alt="Leather Crafting"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Products Carousel / Grid with Filter Chips */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a]">
              Permanent Archive
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#09090b] mt-1">
              Featured Products
            </h2>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel('left')}
              className="p-2 rounded-full border border-[#e4e4e7] hover:border-[#09090b] hover:bg-white text-[#71717a] hover:text-[#09090b] transition-all cursor-pointer"
              aria-label="Previous products"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="p-2 rounded-full border border-[#e4e4e7] hover:border-[#09090b] hover:bg-white text-[#71717a] hover:text-[#09090b] transition-all cursor-pointer"
              aria-label="Next products"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <Link
              to="/shop"
              className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-[#09090b] hover:underline"
            >
              View catalog <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#09090b] text-white shadow-xs'
                  : 'bg-[#f4f4f5] text-[#71717a] hover:text-[#09090b] hover:bg-[#e4e4e7]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel / Product Shelf */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
        >
          {error ? (
            <div className="w-full py-12 px-6 bg-red-50/80 border border-red-200 rounded-2xl text-center space-y-3">
              <div className="inline-flex p-2.5 bg-red-100 rounded-full text-red-700">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-red-900">Database Connection Error</h3>
              <p className="text-xs text-red-700 font-mono max-w-md mx-auto">{error}</p>
              <Button variant="primary" size="sm" onClick={loadFeatured}>
                Retry Loading
              </Button>
            </div>
          ) : loading ? (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="min-w-[280px] sm:min-w-[320px] space-y-3 shrink-0">
                <div className="aspect-square w-full rounded-2xl bg-[#f4f4f5] animate-pulse border border-[#e4e4e7]" />
                <div className="h-4 w-1/3 bg-[#f4f4f5] rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-[#f4f4f5] rounded animate-pulse" />
              </div>
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="min-w-[280px] sm:min-w-[320px] max-w-[320px] shrink-0 snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="py-12 text-center w-full text-xs text-[#71717a]">
              No products found in this category.
            </div>
          )}
        </div>
      </section>

      {/* 5. Shop by Category Highlights (Visual 3-Column Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a]">
            Curated Categories
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#09090b] mt-1">
            Explore by Discipline
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/shop/watches"
            className="group relative overflow-hidden rounded-2xl bg-[#f4f4f5] border border-[#e4e4e7] aspect-4/5 p-6 flex flex-col justify-end"
          >
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80"
              alt="Watches Category"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 text-white">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-300">
                Horology
              </span>
              <h3 className="text-xl font-bold mt-0.5">Precision Watches</h3>
              <p className="text-xs text-zinc-300 mt-1">Architectural dials and titanium cases</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:underline">
                Explore Watches <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>

          <Link
            to="/shop/bags"
            className="group relative overflow-hidden rounded-2xl bg-[#f4f4f5] border border-[#e4e4e7] aspect-4/5 p-6 flex flex-col justify-end"
          >
            <img
              src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80"
              alt="Leather Carryalls Category"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 text-white">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-300">
                Studio Leather
              </span>
              <h3 className="text-xl font-bold mt-0.5">Carry & Transit</h3>
              <p className="text-xs text-zinc-300 mt-1">Vegetable-tanned full grain carryalls</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:underline">
                Explore Bags <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>

          <Link
            to="/shop/accessories"
            className="group relative overflow-hidden rounded-2xl bg-[#f4f4f5] border border-[#e4e4e7] aspect-4/5 p-6 flex flex-col justify-end"
          >
            <img
              src="https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80"
              alt="Accessories Category"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 text-white">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-300">
                Daily Essentials
              </span>
              <h3 className="text-xl font-bold mt-0.5">Wallets & Hardware</h3>
              <p className="text-xs text-zinc-300 mt-1">Saddle-stitched everyday companions</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:underline">
                Explore Accessories <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 6. Editorial Journal Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a]">
              The Journal
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#09090b] mt-1">
              Editorial Dispatches
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#09090b] hover:underline"
          >
            View all essays <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.slice(0, 2).map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl border border-[#e4e4e7] overflow-hidden bg-white hover:border-[#09090b] transition-all flex flex-col justify-between"
            >
              <div>
                <Link to={`/blog/${post.slug}`} className="block aspect-16/9 overflow-hidden bg-[#f4f4f5]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                </Link>
                <div className="p-6 space-y-2">
                  <span className="text-[11px] font-semibold text-[#71717a] uppercase tracking-wider">
                    {post.category} • {post.readTime}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#09090b] group-hover:underline leading-snug">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-[#71717a] line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-0">
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-xs font-semibold text-[#09090b] group-hover:translate-x-1 transition-transform"
                >
                  Read Essay <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. Architectural Quality & Customer Experience Pillars */}
      <section className="border-y border-[#e4e4e7] bg-[#fafafa] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-[#e4e4e7] text-[#09090b]">
                <Truck className="h-5 w-5 stroke-[1.75]" />
              </div>
              <h3 className="text-base font-semibold text-[#09090b]">Considered Transit</h3>
              <p className="text-xs text-[#71717a] leading-relaxed">
                Enjoy complimentary express delivery on orders over $100. Dispatched in 100% recyclable fiber packaging.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-[#e4e4e7] text-[#09090b]">
                <RefreshCw className="h-5 w-5 stroke-[1.75]" />
              </div>
              <h3 className="text-base font-semibold text-[#09090b]">30-Day Guaranteed Trial</h3>
              <p className="text-xs text-[#71717a] leading-relaxed">
                Experience Milprime pieces in your daily routine. Complimentary prepaid returns and exchanges within 30 days.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-[#e4e4e7] text-[#09090b]">
                <ShieldCheck className="h-5 w-5 stroke-[1.75]" />
              </div>
              <h3 className="text-base font-semibold text-[#09090b]">Considered From Detail to Delivery</h3>
              <p className="text-xs text-[#71717a] leading-relaxed">
                Every component is vetted for stress points, wear resistance, and graceful patina over years of continuous ownership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Newsletter & Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-black text-white p-8 sm:p-14 lg:p-16 text-center shadow-lg">
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Stay in the loop.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              Be the first to hear about seasonal capsule releases, archival restocking, and behind-the-scenes engineering notes.
            </p>

            {subscribed ? (
              <div className="pt-4 text-emerald-400 text-sm font-semibold">
                You have been registered for Milprime private bulletins.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="pt-4 max-w-md mx-auto space-y-3">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 rounded-full border border-zinc-700 bg-zinc-900/90 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white"
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    size="md"
                    className="rounded-full bg-white text-black hover:bg-zinc-200 px-6 font-semibold"
                  >
                    Subscribe
                  </Button>
                </div>
                <p className="text-[11px] text-zinc-500 text-left sm:text-center">
                  By subscribing, you accept our Privacy Policy. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
