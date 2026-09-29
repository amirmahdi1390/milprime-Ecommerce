import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import { formatCurrency } from '../../utils/currency';
import { Button } from '../common/Button';

export function CartDrawer() {
  const navigate = useNavigate();
  const { isCartOpen, closeCart, addToast } = useUIStore();
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const finalTotal = Math.max(0, subtotal - discountApplied);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    if (promoCode.trim().toUpperCase() === 'MILPRIME10' || promoCode.trim().toUpperCase() === 'SAVE10') {
      const discount = parseFloat((subtotal * 0.1).toFixed(2));
      setDiscountApplied(discount);
      addToast(`Promo code applied: $${discount.toFixed(2)} off`, 'success');
    } else {
      addToast('Invalid promo code. Try MILPRIME10', 'error');
    }
  };

  const handleProceedToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#e4e4e7] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#e4e4e7]">
            <h2 className="text-base font-semibold text-[#09090b]">
              Your Cart {totalCount > 0 && <span className="text-[#71717a] font-normal">({totalCount} items)</span>}
            </h2>
            <button
              onClick={closeCart}
              aria-label="Close cart"
              className="p-1.5 rounded-full text-[#71717a] hover:text-[#09090b] hover:bg-[#f4f4f5] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#e4e4e7]">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f4f4f5] text-[#71717a] mb-4">
                  <ShoppingBag className="h-8 w-8 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-medium text-[#09090b]">Your cart is empty</h3>
                <p className="text-xs text-[#71717a] mt-1 max-w-xs mb-6">
                  Explore our curated collections and add your favorite pieces to the cart.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    closeCart();
                    navigate('/shop');
                  }}
                >
                  Explore Catalog
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 text-left">
                  {/* Item Image */}
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#f4f4f5] border border-[#e4e4e7]">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="text-sm font-medium text-[#09090b] hover:underline line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                          className="text-[#a1a1aa] hover:text-red-600 transition-colors p-1 -mr-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[#71717a] mt-0.5">
                        {formatCurrency(item.price)} × {item.quantity}
                      </p>
                    </div>

                    {/* Stepper & Subtotal */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center rounded-full border border-[#e4e4e7] p-0.5">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label="Decrease quantity"
                          className="h-6 w-6 rounded-full flex items-center justify-center text-[#71717a] hover:bg-[#f4f4f5] hover:text-[#09090b] transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-medium text-[#09090b]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          aria-label="Increase quantity"
                          className="h-6 w-6 rounded-full flex items-center justify-center text-[#71717a] hover:bg-[#f4f4f5] hover:text-[#09090b] transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-[#09090b]">
                        {formatCurrency(item.subtotal || item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {items.length > 0 && (
            <div className="border-t border-[#e4e4e7] px-6 py-5 bg-[#fafafa]">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Discount code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 rounded-full border border-[#e4e4e7] bg-white px-3.5 py-2 text-xs text-[#09090b] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#09090b]"
                />
                <Button type="submit" variant="secondary" size="sm" className="rounded-full px-4">
                  Apply
                </Button>
              </form>

              {/* Subtotal & Discount Row */}
              <div className="space-y-1.5 text-xs text-[#71717a]">
                <div className="flex justify-between text-sm text-[#09090b] font-medium">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {discountApplied > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount (MILPRIME10)</span>
                    <span>-{formatCurrency(discountApplied)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[11px]">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <div className="mt-5 space-y-2">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full font-medium"
                  onClick={handleProceedToCheckout}
                >
                  Checkout • {formatCurrency(finalTotal)}
                </Button>
                <div className="flex justify-center">
                  <button
                    onClick={closeCart}
                    className="text-xs text-[#71717a] hover:text-[#09090b] underline transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
