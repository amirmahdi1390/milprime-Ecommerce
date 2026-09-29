import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, RefreshCw, Truck, ArrowUpRight } from 'lucide-react';
import { productService } from '../services/productService';
import { ProductCard } from '../features/products/ProductCard';
import { Button } from '../components/common/Button';
import { useUIStore } from '../store/uiStore';

export function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useUIStore();

  useEffect(() => {
    let mounted = true;
    productService.getFeaturedProducts().then((data) => {
      if (mounted) {
        setFeaturedProducts(Array.isArray(data) ? data.slice(0, 6) : []);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    addToast('Thank you for subscribing to Milprime dispatches.', 'success');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 text-left">
      
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#f4f4f5] border border-[#e4e4e7] min-h-[460px] sm:min-h-[520px] flex items-center">
          
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10 w-full sm:w-2/3" />
          
          {/* Hero Image */}
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80"
            alt="Milprime Storefront Collection"
            className="absolute right-0 inset-y-0 w-full sm:w-2/3 h-full object-cover object-center"
          />

          {/* Hero Content */}
          <div className="relative z-20 max-w-xl p-8 sm:p-12 lg:p-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black text-white mb-6">
              Spring / Summer Edition
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#09090b] leading-[1.1]">
              Engineered with restraint.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#71717a] leading-relaxed max-w-md">
              Milprime curates exceptional leather carryalls, precision timepieces, and apparel defined by architectural discipline.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/shop">
                <Button variant="primary" size="lg" className="rounded-full px-8 shadow-sm">
                  Explore Collection <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="rounded-full px-7">
                  Our Philosophy
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#09090b]">
              Featured Products
            </h2>
            <p className="mt-1 text-sm text-[#71717a]">
              A handpicked shelf straight from our permanent archive.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#09090b] hover:underline"
          >
            <span>View all</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square w-full rounded-xl bg-[#f4f4f5] animate-pulse border border-[#e4e4e7]" />
                <div className="h-4 w-1/3 bg-[#f4f4f5] rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-[#f4f4f5] rounded animate-pulse" />
              </div>
            ))
          ) : (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>

      {/* 3. Shop by Collection (Editorial 2-Card Banner) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#09090b]">
            Shop by Collection
          </h2>
          <p className="mt-1 text-sm text-[#71717a]">
            Curated ensembles created for how they are worn and lived in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Daily Utility */}
          <Link
            to="/shop/bags"
            className="group relative overflow-hidden rounded-2xl bg-[#f4f4f5] border border-[#e4e4e7] aspect-[4/3] flex flex-col justify-end p-8 transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80"
              alt="Bags and Carryalls"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative z-10 text-white">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-300">
                Studio Leather
              </span>
              <h3 className="text-2xl font-bold mt-1">Carry & Transit</h3>
              <p className="text-xs text-zinc-300 mt-1 max-w-xs">
                Handcrafted Italian hides structured for commuting and travel.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:underline">
                Explore Carryalls <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </Link>

          {/* Card 2: Horology & Precision */}
          <Link
            to="/shop/watches"
            className="group relative overflow-hidden rounded-2xl bg-[#f4f4f5] border border-[#e4e4e7] aspect-[4/3] flex flex-col justify-end p-8 transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80"
              alt="Watches & Precision Instruments"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative z-10 text-white">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-300">
                Mechanical Purity
              </span>
              <h3 className="text-2xl font-bold mt-1">Precision Time</h3>
              <p className="text-xs text-zinc-300 mt-1 max-w-xs">
                Titanium calibers and scratch-resistant sapphire chronometers.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:underline">
                Explore Watches <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Brand Philosophy / Architectural Quality Section */}
      <section className="border-y border-[#e4e4e7] bg-[#fafafa] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-[#e4e4e7] text-[#09090b]">
                <Truck className="h-5 w-5 stroke-[1.75]" />
              </div>
              <h3 className="text-base font-semibold text-[#09090b]">Complimentary Shipping</h3>
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
              <h3 className="text-base font-semibold text-[#09090b]">Architectural Longevity</h3>
              <p className="text-xs text-[#71717a] leading-relaxed">
                Every component is vetted for stress points, wear resistance, and graceful patina over years of continuous ownership.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Stay in the Loop (Newsletter Banner) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-black text-white p-8 sm:p-14 lg:p-16 text-center">
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
                    placeholder="your@email.com"
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
