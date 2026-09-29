import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { productService } from '../../services/productService';
import { formatCurrency } from '../../utils/currency';

export function SearchOverlay() {
  const navigate = useNavigate();
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      productService.getActiveProducts().then(setProducts);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase().trim();
    const filtered = products.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.short_description?.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 6));
  }, [query, products]);

  if (!isSearchOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    closeSearch();
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectProduct = (slug) => {
    closeSearch();
    navigate(`/product/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs p-4 sm:p-6 md:p-20">
      <div
        className="fixed inset-0"
        onClick={closeSearch}
      />
      <div className="relative mx-auto max-w-2xl bg-white rounded-2xl border border-[#e4e4e7] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="flex items-center border-b border-[#e4e4e7] px-4">
          <Search className="h-5 w-5 text-[#71717a] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search watches, bags, apparel, accessories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 bg-transparent px-3 text-base text-[#09090b] placeholder:text-[#a1a1aa] focus:outline-none"
          />
          <button
            type="button"
            onClick={closeSearch}
            className="p-1.5 rounded-full text-[#71717a] hover:bg-[#f4f4f5] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </form>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4">
          {query.trim() && results.length === 0 && (
            <div className="py-8 text-center text-sm text-[#71717a]">
              No products found matching "<span className="text-[#09090b] font-medium">{query}</span>"
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-1">
              <p className="text-[11px] font-semibold text-[#71717a] uppercase tracking-wider px-3 py-1">
                Products ({results.length})
              </p>
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.slug)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f4f4f5] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-12 w-12 rounded-lg object-cover bg-[#f4f4f5] border border-[#e4e4e7]"
                    />
                    <div>
                      <p className="text-sm font-medium text-[#09090b] group-hover:text-black">
                        {product.name}
                      </p>
                      <p className="text-xs text-[#71717a]">{product.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-[#09090b]">
                      {formatCurrency(product.price)}
                    </span>
                    <ArrowRight className="h-4 w-4 text-[#a1a1aa] group-hover:text-[#09090b] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Suggestions when empty */}
          {!query.trim() && (
            <div className="py-4 px-2 text-left">
              <p className="text-xs font-semibold text-[#71717a] uppercase tracking-wider mb-3">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {['Tote Bag', 'Supima T-Shirt', 'Chronometer', 'Thermal Vessel', 'Heavyweight Hoodie'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-3 py-1.5 rounded-full bg-[#f4f4f5] text-[#18181b] hover:bg-[#e4e4e7] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        {query.trim() && (
          <div className="border-t border-[#e4e4e7] px-4 py-2.5 bg-[#fafafa] flex justify-between items-center text-xs text-[#71717a]">
            <span>Press Enter to view all results</span>
            <button
              onClick={handleSubmit}
              className="font-medium text-[#09090b] hover:underline flex items-center gap-1"
            >
              See all in catalog <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
