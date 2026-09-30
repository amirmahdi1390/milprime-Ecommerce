import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { ProductGrid } from '../features/products/ProductGrid';
import { ProductFilters } from '../features/products/ProductFilters';
import { ProductSort } from '../features/products/ProductSort';
import { calculatePricing } from '../utils/discount';
import { Filter, X } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

export function ShopPage() {
  const { category: routeCategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const isSpecial = searchParams.get('special') === 'true';
  const selectedCategory = routeCategory || searchParams.get('cat') || 'all';
  const searchQuery = searchParams.get('q') || '';
  const [priceRange, setPriceRange] = useState(600);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [currentSort, setCurrentSort] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    productService.getActiveProducts().then((data) => {
      if (mounted) {
        setProducts(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
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

  const pageTitle = isSpecial
    ? 'Special & Archival Products'
    : selectedCategory && selectedCategory !== 'all'
    ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`
    : 'All Products';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-left">
      <SEO
        title={`${pageTitle} — Milprime Storefront`}
        description={`Explore the ${pageTitle.toLowerCase()} collection at Milprime. Architectural timepieces, full-grain carryalls, and minimalist apparel.`}
        url={selectedCategory && selectedCategory !== 'all' ? `/shop/${selectedCategory}` : '/shop'}
      />
      
      {/* Page Title & Breadcrumb Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#09090b]">
          {pageTitle}
        </h1>
        <p className="mt-2 text-sm text-[#71717a]">
          {searchQuery
            ? `Search results for "${searchQuery}"`
            : isSpecial
            ? 'Curated archival specials and limited-allocation studio pieces.'
            : 'Explore our complete catalog of precision-crafted essentials.'}
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

          <ProductGrid
            products={filteredAndSortedProducts}
            loading={loading}
            emptyTitle="No products match your criteria"
            emptyDescription="Try clearing some of your filters or resetting your search term."
            onResetFilters={handleResetFilters}
          />
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
