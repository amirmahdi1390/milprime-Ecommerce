import React from 'react';
import { ProductCard } from './ProductCard';
import { EmptyState } from '../../components/common/EmptyState';

export function ProductGrid({
  products = [],
  loading = false,
  emptyTitle = 'No products found',
  emptyDescription = 'Try adjusting your search query or filters.',
  onResetFilters,
  columns = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
}) {
  if (loading) {
    return (
      <div className={`grid ${columns} gap-6 sm:gap-8`}>
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div key={idx} className="space-y-3">
            <div className="aspect-square w-full rounded-xl bg-[#f4f4f5] animate-pulse border border-[#e4e4e7]" />
            <div className="h-4 w-1/3 bg-[#f4f4f5] rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-[#f4f4f5] rounded animate-pulse" />
            <div className="h-4 w-1/4 bg-[#f4f4f5] rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={onResetFilters ? 'Clear all filters' : undefined}
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className={`grid ${columns} gap-6 sm:gap-8`}>
      {products.map((product, idx) => (
        <ProductCard key={product.id} product={product} priority={idx < 6} />
      ))}
    </div>
  );
}
