import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { X, Check } from 'lucide-react';

export function ProductFilters({
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceRangeChange,
  inStockOnly,
  onToggleInStock,
  onReset,
  activeCount = 0,
}) {
  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#e4e4e7]">
        <h3 className="text-sm font-semibold text-[#09090b]">Filters</h3>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="text-xs text-[#71717a] hover:text-[#09090b] underline flex items-center gap-1 cursor-pointer"
          >
            Reset all
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#71717a]">
          Categories
        </h4>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-sm transition-colors text-left cursor-pointer ${
                  isSelected
                    ? 'bg-[#f4f4f5] font-semibold text-[#09090b]'
                    : 'text-[#71717a] hover:bg-[#fafafa] hover:text-[#09090b]'
                }`}
              >
                <span>{cat.name}</span>
                {isSelected && <Check className="h-3.5 w-3.5 text-[#09090b]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Price Range Slider */}
      <div className="space-y-2.5 pt-2 border-t border-[#e4e4e7]">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold uppercase tracking-wider text-[#71717a]">Max Price</span>
          <span className="font-medium text-[#09090b]">${priceRange}</span>
        </div>
        <input
          type="range"
          min="50"
          max="600"
          step="10"
          value={priceRange}
          onChange={(e) => onPriceRangeChange(Number(e.target.value))}
          className="w-full h-1.5 bg-[#e4e4e7] rounded-lg appearance-none cursor-pointer accent-black"
        />
        <div className="flex justify-between text-[11px] text-[#a1a1aa]">
          <span>$50</span>
          <span>$600</span>
        </div>
      </div>

      {/* In-Stock Only Toggle */}
      <div className="pt-2 border-t border-[#e4e4e7]">
        <label className="flex items-center gap-2.5 text-sm text-[#09090b] cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onToggleInStock(e.target.checked)}
            className="h-4 w-4 rounded border-[#e4e4e7] text-black focus:ring-black cursor-pointer"
          />
          <span className="text-xs font-medium">In-stock items only</span>
        </label>
      </div>

    </div>
  );
}
