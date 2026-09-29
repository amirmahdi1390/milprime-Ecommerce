import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check } from 'lucide-react';
import { calculatePricing } from '../../utils/discount';
import { formatCurrency } from '../../utils/currency';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import { Badge } from '../../components/common/Badge';

export function ProductCard({ product, priority = false }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const { openCart, addToast } = useUIStore();
  const [added, setAdded] = React.useState(false);

  if (!product) return null;

  const { hasDiscount, discountAmount, finalPrice, originalPrice } = calculatePricing(product);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product, 1, finalPrice);
    setAdded(true);
    addToast(`Added "${product.name}" to cart`, 'success');
    
    // Automatically open cart drawer for immediate confirmation feedback
    openCart();

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <div className="group relative flex flex-col text-left">
      {/* Product Image Frame */}
      <Link
        to={`/product/${product.slug}`}
        className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#f4f4f5] border border-[#e4e4e7]/60 block"
      >
        <img
          src={product.image_url}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="discount">
              Save ${discountAmount}
            </Badge>
          </div>
        )}

        {/* Quick Add Button Overlay */}
        <button
          onClick={handleQuickAdd}
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#09090b] shadow-md border border-[#e4e4e7] opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
        >
          {added ? (
            <Check className="h-4 w-4 text-emerald-600" />
          ) : (
            <Plus className="h-4 w-4 stroke-[2]" />
          )}
        </button>
      </Link>

      {/* Product Details Below Image */}
      <div className="mt-3.5 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium text-[#71717a] uppercase tracking-wider">
            {product.category}
          </span>
          {product.brand && (
            <span className="text-[11px] text-[#a1a1aa] truncate max-w-[120px]">
              {product.brand}
            </span>
          )}
        </div>

        <h3 className="text-sm font-medium text-[#09090b] line-clamp-1 group-hover:text-black transition-colors">
          <Link to={`/product/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        {/* Price & Discount Display */}
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-sm font-semibold text-[#09090b]">
            {formatCurrency(finalPrice)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-[#71717a] line-through font-normal">
              {formatCurrency(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
