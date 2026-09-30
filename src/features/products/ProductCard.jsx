import React, { useState, memo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Plus, Check } from 'lucide-react';
import { calculatePricing } from '../../utils/discount';
import { formatCurrency } from '../../utils/currency';
import { getCategoryPlaceholderImage } from '../../utils/placeholderImages';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { Badge } from '../../components/common/Badge';

// Global memory cache of already-loaded image URLs to prevent re-flashing during scroll
const CACHED_IMAGE_SET = new Set();

function ProductCardComponent({ product, priority = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const addToCart = useCartStore((state) => state.addToCart);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { openCart, addToast } = useUIStore();
  
  const [added, setAdded] = useState(false);
  const initialUrl = product?.image_url || '';
  const [imageSrc, setImageSrc] = useState(initialUrl);
  const [imageLoaded, setImageLoaded] = useState(() => CACHED_IMAGE_SET.has(initialUrl));

  if (!product) return null;

  const { hasDiscount, discountAmount, finalPrice, originalPrice } = calculatePricing(product);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      addToast('Please sign in to add pieces to your shopping bag.', 'info');
      navigate('/login', {
        state: {
          returnUrl: `${location.pathname}${location.search}`,
          pendingProduct: product,
          pendingQty: 1,
        },
      });
      return;
    }

    addToCart(product, 1, finalPrice);
    setAdded(true);
    addToast(`Added "${product.name}" to bag`, 'success');
    openCart();

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  const handleImageLoad = () => {
    CACHED_IMAGE_SET.add(imageSrc);
    setImageLoaded(true);
  };

  const handleImageError = () => {
    const fallback = getCategoryPlaceholderImage(product.category);
    setImageSrc(fallback);
    CACHED_IMAGE_SET.add(fallback);
    setImageLoaded(true);
  };

  const imageAlt = `${product.name} — ${product.category || 'Luxury Essential'} by ${product.brand || 'Milprime'}`;

  return (
    <article className="group relative flex flex-col text-left">
      {/* Product Image Frame with fixed aspect ratio to eliminate layout shift */}
      <Link
        to={`/product/${product.slug}`}
        className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#f4f4f5] border border-[#e4e4e7]/60 block"
      >
        {/* Placeholder skeleton while initial image buffers */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#f4f4f5] animate-pulse" />
        )}

        <img
          src={imageSrc}
          alt={imageAlt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
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
          aria-label={`Add ${product.name} to shopping bag`}
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
    </article>
  );
}

export const ProductCard = memo(ProductCardComponent);
