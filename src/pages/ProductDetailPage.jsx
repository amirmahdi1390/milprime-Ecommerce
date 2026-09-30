import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Plus, Minus, ArrowRight, ShieldCheck, RefreshCw, Truck, Check } from 'lucide-react';
import { productService } from '../services/productService';
import { ProductGallery } from '../features/products/ProductGallery';
import { ProductReviews } from '../features/products/ProductReviews';
import { ProductCard } from '../features/products/ProductCard';
import { calculatePricing } from '../utils/discount';
import { formatCurrency } from '../utils/currency';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SEO } from '../components/common/SEO';
import { LoadingScreen } from '../components/common/LoadingScreen';

export function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { openCart, addToast } = useUIStore();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setQuantity(1);

    productService.getProductBySlug(slug).then(async (prod) => {
      if (!mounted) return;
      setProduct(prod);

      if (prod) {
        const all = await productService.getActiveProducts();
        if (mounted) {
          const related = (Array.isArray(all) ? all : [])
            .filter((p) => p.slug !== prod.slug && (p.category === prod.category || true))
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
    return <LoadingScreen fullScreen={false} />;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <SEO title="Product Archived" noindex />
        <h1 className="text-2xl font-bold text-[#09090b]">Product Not Found</h1>
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
    if (!isAuthenticated) {
      addToast('Please sign in to add pieces to your shopping bag.', 'info');
      navigate('/login', {
        state: {
          returnUrl: location.pathname,
          pendingProduct: product,
          pendingQty: quantity,
        },
      });
      return;
    }

    addToCart(product, quantity, finalPrice);
    setAdded(true);
    addToast(`Added ${quantity} × "${product.name}" to bag`, 'success');
    openCart();

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.image_url,
    description: product.short_description || product.description,
    sku: product.sku || `MIL-${product.slug}`,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Milprime',
    },
    offers: {
      '@type': 'Offer',
      url: `https://milprime.shop/product/${product.slug}`,
      priceCurrency: 'USD',
      price: finalPrice,
      availability: product.active !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  const images = Array.isArray(product.images) && product.images.length > 0 
    ? product.images 
    : [product.image_url];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-left">
      <SEO
        title={product.name}
        description={product.short_description || product.description}
        canonical={`/product/${product.slug}`}
        image={product.image_url}
        schema={productSchema}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#71717a] mb-8">
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
        <section aria-label="Product Images">
          <ProductGallery
            images={images}
            name={product.name}
          />
        </section>

        {/* Product Information */}
        <section aria-label="Product Details" className="space-y-6">
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
                  aria-label="Decrease quantity"
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
                  aria-label="Increase quantity"
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
              <p className="text-[11px] font-semibold text-[#09090b]">Complimentary Shipping</p>
              <p className="text-[10px] text-[#71717a]">Orders over $100</p>
            </div>
            <div className="p-3 rounded-xl bg-[#fafafa] border border-[#e4e4e7]/60 space-y-1">
              <RefreshCw className="h-4 w-4 mx-auto text-[#09090b]" />
              <p className="text-[11px] font-semibold text-[#09090b]">Guaranteed Returns</p>
              <p className="text-[10px] text-[#71717a]">30-day window</p>
            </div>
            <div className="p-3 rounded-xl bg-[#fafafa] border border-[#e4e4e7]/60 space-y-1">
              <ShieldCheck className="h-4 w-4 mx-auto text-[#09090b]" />
              <p className="text-[11px] font-semibold text-[#09090b]">Studio Inspected</p>
              <p className="text-[10px] text-[#71717a]">Lifetime integrity</p>
            </div>
          </div>

        </section>

      </div>

      {/* Made to be worn section */}
      <section aria-label="Brand Guarantees" className="mt-16 sm:mt-24 pt-12 border-t border-[#e4e4e7]">
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
      </section>

      {/* Customer Reviews Section */}
      <ProductReviews productName={product.name} />

      {/* Related Products Recommendation Grid */}
      {relatedProducts.length > 0 && (
        <section aria-label="Related Products" className="mt-16 sm:mt-24 pt-12 border-t border-[#e4e4e7]">
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
        </section>
      )}

    </div>
  );
}
