import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, Minus, ArrowRight, ShieldCheck, RefreshCw, Truck, Check, Heart, Share2 } from 'lucide-react';
import { productService } from '../services/productService';
import { ProductGallery } from '../features/products/ProductGallery';
import { ProductReviews } from '../features/products/ProductReviews';
import { ProductCard } from '../features/products/ProductCard';
import { calculatePricing } from '../utils/discount';
import { formatCurrency } from '../utils/currency';
import { useCartStore } from '../store/cartStore';
import { useUIStore } from '../store/uiStore';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const { openCart, addToast } = useUIStore();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setQuantity(1);

    productService.getProductBySlug(slug).then(async (prod) => {
      if (!mounted) return;
      setProduct(prod);

      if (prod) {
        // Fetch related products in the same category or all products
        const all = await productService.getActiveProducts();
        if (mounted) {
          const related = (Array.isArray(all) ? all : [])
            .filter((p) => p.slug !== prod.slug)
            .slice(0, 3);
          setRelatedProducts(related);
        }
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse text-left space-y-8">
        <div className="h-4 w-48 bg-[#f4f4f5] rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-[#f4f4f5] rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-[#f4f4f5] rounded" />
            <div className="h-6 w-1/4 bg-[#f4f4f5] rounded" />
            <div className="h-24 w-full bg-[#f4f4f5] rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-2xl font-bold text-[#09090b]">Product Not Found</h2>
        <p className="mt-2 text-sm text-[#71717a]">
          The piece you are looking for has been archived or does not exist.
        </p>
        <div className="mt-6">
          <Link to="/shop">
            <Button variant="primary">Return to Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { hasDiscount, discountAmount, finalPrice, originalPrice } = calculatePricing(product);

  const handleAddToCart = () => {
    addToCart(product, quantity, finalPrice);
    setAdded(true);
    addToast(`Added ${quantity} × "${product.name}" to cart`, 'success');
    openCart();

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-left">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#71717a] mb-8">
        <Link to="/" className="hover:text-[#09090b] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-[#09090b] transition-colors">
          Shop
        </Link>
        <span>/</span>
        <Link
          to={`/shop/${product.category?.toLowerCase()}`}
          className="hover:text-[#09090b] transition-colors"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-[#09090b] font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Gallery */}
        <div>
          <ProductGallery
            images={product.images && product.images.length > 0 ? product.images : [product.image_url]}
            name={product.name}
          />
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a]">
                {product.brand || 'Milprime Studio'}
              </span>
              <span className="text-xs text-[#a1a1aa] font-mono">
                {product.sku || 'MIL-ARCHIVE'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#09090b]">
              {product.name}
            </h1>
          </div>

          {/* Pricing & Discount */}
          <div className="flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-bold text-[#09090b]">
              {formatCurrency(finalPrice)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-base text-[#71717a] line-through font-normal">
                  {formatCurrency(originalPrice)}
                </span>
                <Badge variant="discount">
                  Save ${discountAmount}
                </Badge>
              </>
            )}
          </div>

          {/* In-Stock Pill */}
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-emerald-700">
              In Stock & Ready for Immediate Dispatch
            </span>
          </div>

          {/* Short & Full Description */}
          <p className="text-sm text-[#71717a] leading-relaxed pt-2">
            {product.description || product.short_description}
          </p>

          {/* Quantity Selector & Add to Cart */}
          <div className="space-y-4 pt-4 border-t border-[#e4e4e7]">
            <label className="block text-xs font-semibold text-[#71717a] uppercase tracking-wider">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-full border border-[#e4e4e7] p-1 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="h-8 w-8 rounded-full flex items-center justify-center text-[#71717a] hover:bg-[#f4f4f5] hover:text-[#09090b] transition-colors cursor-pointer"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-[#09090b]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="h-8 w-8 rounded-full flex items-center justify-center text-[#71717a] hover:bg-[#f4f4f5] hover:text-[#09090b] transition-colors cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                className="flex-1 font-semibold text-sm shadow-sm"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4 mr-1.5 text-emerald-400" />
                    Added to Bag
                  </>
                ) : (
                  `Add to Bag • ${formatCurrency(finalPrice * quantity)}`
                )}
              </Button>
            </div>
          </div>

          {/* Delivery & Warranty Trust Badges */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#e4e4e7] text-center">
            <div className="p-3 rounded-xl bg-[#fafafa] border border-[#e4e4e7]/60 space-y-1">
              <Truck className="h-4 w-4 mx-auto text-[#09090b]" />
              <p className="text-[11px] font-semibold text-[#09090b]">Free Shipping</p>
              <p className="text-[10px] text-[#71717a]">Orders over $100</p>
            </div>
            <div className="p-3 rounded-xl bg-[#fafafa] border border-[#e4e4e7]/60 space-y-1">
              <RefreshCw className="h-4 w-4 mx-auto text-[#09090b]" />
              <p className="text-[11px] font-semibold text-[#09090b]">Easy Returns</p>
              <p className="text-[10px] text-[#71717a]">30-day window</p>
            </div>
            <div className="p-3 rounded-xl bg-[#fafafa] border border-[#e4e4e7]/60 space-y-1">
              <ShieldCheck className="h-4 w-4 mx-auto text-[#09090b]" />
              <p className="text-[11px] font-semibold text-[#09090b]">Authenticity</p>
              <p className="text-[10px] text-[#71717a]">Studio verified</p>
            </div>
          </div>

        </div>

      </div>

      {/* Made to be worn section */}
      <div className="mt-16 sm:mt-24 pt-12 border-t border-[#e4e4e7]">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-[#09090b] mb-8">
          Made to be worn.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-[#09090b]">True to Form</h3>
            <p className="text-xs text-[#71717a] leading-relaxed">
              Every curve, seam, and stitch is calculated for ergonomic balance and unforced natural posture.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-[#09090b]">Fabrics that Endure</h3>
            <p className="text-xs text-[#71717a] leading-relaxed">
              Chosen for how they age — resisting friction, moisture, and wear across years of movement.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-[#09090b]">Effortless Maintenance</h3>
            <p className="text-xs text-[#71717a] leading-relaxed">
              Treated with natural water-repellency and easy-care finishes for low-impact cleaning.
            </p>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <ProductReviews productName={product.name} />

      {/* Related Products Recommendation Grid */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 sm:mt-24 pt-12 border-t border-[#e4e4e7]">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#09090b]">
                You might also like
              </h2>
              <p className="text-xs text-[#71717a] mt-1">
                Pieces that pair harmoniously with this selection.
              </p>
            </div>
            <Link to="/shop" className="text-xs font-semibold text-[#09090b] hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
