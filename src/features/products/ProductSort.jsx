import React from 'react';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A–Z' },
];

export function ProductSort({ currentSort, onSortChange, totalCount }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#e4e4e7] mb-8 text-left">
      <p className="text-xs text-[#71717a]">
        Showing <span className="font-semibold text-[#09090b]">{totalCount}</span> results
      </p>

      {/* Sort Buttons / Dropdown */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        <span className="text-xs text-[#71717a] mr-1 hidden sm:inline">Sort by:</span>
        {SORT_OPTIONS.map((opt) => {
          const isActive = currentSort === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onSortChange(opt.value)}
              className={`px-3 py-1.5 rounded-full text-xs transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-black text-white font-medium'
                  : 'bg-[#f4f4f5] text-[#71717a] hover:bg-[#e4e4e7] hover:text-[#09090b]'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
