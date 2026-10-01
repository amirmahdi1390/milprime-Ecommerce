import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { ProductGrid } from '../features/products/ProductGrid';
import { ProductFilters } from '../features/products/ProductFilters';
import { ProductSort } from '../features/products/ProductSort';
import { calculatePricing } from '../utils/discount';
import { Filter, X, AlertTriangle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

export function ShopPage() {
  const { category: routeCategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter state
  const isSpecial = searchParams.get('special') === 'true';
  const selectedCategory = routeCategory || searchParams.get('cat') || 'all';
  const searchQuery = searchParams.get('q') || '';
  const [priceRange, setPriceRange] = useState(600);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [currentSort, setCurrentSort] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getActiveProducts();
      const productList = Array.isArray(data) ? data : [];
      setProducts(productList);

      // Preload initial view images so product cards don't pop in half-loaded
      const initialImages = productList.slice(0, 6).map((p) => p.image_url).filter(Boolean);
      if (initialImages.length > 0) {
        await Promise.race([
          Promise.all(
            initialImages.map(
              (src) =>
                new Promise((resolve) => {
                  const img = new Image();
                  img.src = src;
                  img.onload = () => resolve();
                  img.onerror = () => resolve();
                })
            )
          ),
          new Promise((resolve) => setTimeout(resolve, 600)),
        ]);
      }
    } catch (err) {
      console.error('Failed to load products from database:', err);
      setError(err.message || 'Database connection error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCategorySelect = (catSlug) => {
    if (catSlug === 'all') {
      navigate('/shop');
    } else {
      navigate(`/shop/${catSlug}`);
    }
  };

  const handleResetFilters = () => {
    setPriceRange(600);
    setInStockOnly(false);
    setCurrentSort('featured');
    if (searchQuery || isSpecial) {
      searchParams.delete('q');
      searchParams.delete('special');
      setSearchParams(searchParams);
    }
    navigate('/shop');
  };

  // Filter & Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    // Special products (featured or compare_at_price)
    if (isSpecial) {
      list = list.filter((p) => p.featured || (p.compare_at_price && p.compare_at_price > p.price));
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      list = list.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Text search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    // Price range filter
    list = list.filter((p) => {
      const { finalPrice } = calculatePricing(p);
      return finalPrice <= priceRange;
    });

    // In-stock filter
    if (inStockOnly) {
      list = list.filter((p) => p.active !== false);
    }

    // Sorting
    list.sort((a, b) => {
      const priceA = calculatePricing(a).finalPrice;
      const priceB = calculatePricing(b).finalPrice;

      if (currentSort === 'price-asc') return priceA - priceB;
      if (currentSort === 'price-desc') return priceB - priceA;
      if (currentSort === 'name-asc') return a.name.localeCompare(b.name);
      if (currentSort === 'newest') {
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

    return list;
  }, [products, selectedCategory, searchQuery, priceRange, inStockOnly, currentSort, isSpecial]);

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (isSpecial ? 1 : 0) +
    (priceRange < 600 ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const CATEGORY_META = {
    watches: {
      title: 'Precision Timepieces & Chronometers',
      description: 'Explore architectural mechanical timepieces, titanium chronometers, and minimalist dials engineered with surgical restraint.',
      heading: 'Precision Timepieces',
      intro: 'Architectural mechanical timepieces and titanium chronometers defined by reductionist geometry and high-beat Swiss movements.',
    },
    bags: {
      title: 'Full-Grain Leather Bags & Weekenders',
      description: 'Artisanal full-grain leather carryalls, weekenders, and briefcases sourced from Santa Croce tanneries in Tuscany.',
      heading: 'Leather Bags & Carryalls',
      intro: 'Handcrafted from vegetable-tanned full-grain leather that matures with rich patina over decades of journey.',
    },
    clothing: {
      title: 'Minimalist Apparel & Structured Overshirts',
      description: 'Heavyweight organic cotton staples, architectural overshirts, and enduring tailored silhouettes cut with modern discipline.',
      heading: 'Structured Apparel',
      intro: 'Structured everyday garments cut from heavyweight organic cottons and engineered for longevity.',
    },
    accessories: {
      title: 'Architectural Carry Goods & Optical Accessories',
      description: 'Curated wallets, thermal drinkware, polarized optical frames, and precision everyday carry accessories.',
      heading: 'Refined Accessories',
      intro: 'Refined utilitarian carry essentials crafted from titanium, vegetable-tanned leather, and surgical steel.',
    },
    home: {
      title: 'Home Objects & Tabletop Ceramics',
      description: 'Sculptural ceramic carafes, cast concrete lamps, and botanical candles crafted for mindful spaces.',
      heading: 'Objects & Ceramics',
      intro: 'Tactile tabletop objects and ambient illumination created for architectural living spaces.',
    },
  };

  const currentCategoryKey = (selectedCategory && selectedCategory !== 'all') ? selectedCategory.toLowerCase() : null;
  const categoryInfo = currentCategoryKey ? CATEGORY_META[currentCategoryKey] : null;

  let pageTitle = 'Shop All Products';
  let pageDescription = 'Explore the complete Milprime collection of precision timepieces, full-grain leather bags, minimalist apparel, and curated accessories.';
  let pageHeading = 'All Products';
  let pageIntro = 'Explore our complete catalog of precision-crafted essentials.';
  let canonicalPath = '/shop';

  if (isSpecial) {
    pageTitle = 'Special & Archival Products';
    pageDescription = 'Limited-allocation archival releases and studio prototypes curated for discerning collectors.';
    pageHeading = 'Special Products';
    pageIntro = 'Curated archival specials and limited-allocation studio pieces.';
    canonicalPath = '/shop/watches';
  } else if (categoryInfo) {
    pageTitle = categoryInfo.title;
    pageDescription = categoryInfo.description;
    pageHeading = categoryInfo.heading;
    pageIntro = categoryInfo.intro;
    canonicalPath = `/shop/${currentCategoryKey}`;
  } else if (searchQuery) {
    pageTitle = `Search: "${searchQuery}"`;
    pageDescription = `Search results for "${searchQuery}" across the Milprime catalog.`;
    pageHeading = `Search: ${searchQuery}`;
    pageIntro = `Showing search results for "${searchQuery}".`;
    canonicalPath = '/shop';
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-left">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalPath}
      />
      
      {/* Page Title & Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#09090b]">
          {pageHeading}
        </h1>
        <p className="mt-2 text-sm text-[#71717a] max-w-2xl leading-relaxed">
          {pageIntro}
        </p>
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden flex items-center justify-between pb-4 border-b border-[#e4e4e7] mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-1.5"
        >
          <Filter className="h-4 w-4" />
          <span>Filters ({activeFiltersCount})</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
        
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24">
            <ProductFilters
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              inStockOnly={inStockOnly}
              onToggleInStock={setInStockOnly}
              onReset={handleResetFilters}
              activeCount={activeFiltersCount}
            />
          </div>
        </div>

        {/* Main Products Area */}
        <div className="lg:col-span-3">
          <ProductSort
            currentSort={currentSort}
            onSortChange={setCurrentSort}
            totalCount={filteredAndSortedProducts.length}
          />

          {error ? (
            <div className="p-8 my-6 bg-red-50/80 border border-red-200 rounded-2xl text-center space-y-4">
              <div className="inline-flex p-3 bg-red-100 rounded-full text-red-700">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="text-base font-bold text-red-900">Database Connection Error</h3>
                <p className="text-xs text-red-700 mt-1 font-mono break-words">{error}</p>
              </div>
              <Button variant="primary" size="sm" onClick={loadProducts}>
                Retry Database Connection
              </Button>
            </div>
          ) : (
            <ProductGrid
              products={filteredAndSortedProducts}
              loading={loading}
              emptyTitle="No products match your criteria"
              emptyDescription="Try clearing some of your filters or resetting your search term."
              onResetFilters={handleResetFilters}
            />
          )}
        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#e4e4e7] mb-6">
                <span className="text-base font-semibold">Filter Catalog</span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-full text-[#71717a] hover:bg-[#f4f4f5] cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ProductFilters
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => {
                  handleCategorySelect(cat);
                  setIsMobileFilterOpen(false);
                }}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                inStockOnly={inStockOnly}
                onToggleInStock={setInStockOnly}
                onReset={() => {
                  handleResetFilters();
                  setIsMobileFilterOpen(false);
                }}
                activeCount={activeFiltersCount}
              />
            </div>

            <div className="pt-6 border-t border-[#e4e4e7] mt-8">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
