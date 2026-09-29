import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { formatCurrency } from '../utils/currency';
import { Button } from '../components/common/Button';

export function CartPage() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const estimatedTax = parseFloat((subtotal * 0.08).toFixed(2));
  const finalTotal = subtotal + shipping + estimatedTax;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="h-16 w-16 mx-auto rounded-full bg-[#f4f4f5] flex items-center justify-center text-[#71717a]">
            <ShoppingBag className="h-8 w-8 stroke-[1.5]" />
          </div>
          <h1 className="text-2xl font-bold text-[#09090b]">Your shopping bag is empty</h1>
          <p className="text-sm text-[#71717a]">
            You have not added any pieces to your bag yet. Explore our latest arrivals to begin.
          </p>
          <div className="pt-4">
            <Link to="/shop">
              <Button variant="primary" size="lg" className="rounded-full px-8">
                Explore Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-left">
      <div className="flex items-center justify-between pb-6 border-b border-[#e4e4e7] mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#09090b]">
            Shopping Bag
          </h1>
          <p className="text-xs text-[#71717a] mt-1">
            Review your selected items ({totalCount} {totalCount === 1 ? 'item' : 'items'})
          </p>
        </div>
        <Link
          to="/shop"
          className="text-xs font-semibold text-[#09090b] hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Cart Items Table */}
        <div className="lg:col-span-8 space-y-6">
          <div className="divide-y divide-[#e4e4e7] border-b border-[#e4e4e7]">
            {items.map((item) => (
              <div key={item.id} className="py-6 first:pt-0 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                
                {/* Thumbnail & Title */}
                <div className="flex items-center gap-4 min-w-0">
                  <Link
                    to={`/product/${item.slug}`}
                    className="h-24 w-24 rounded-xl bg-[#f4f4f5] border border-[#e4e4e7] overflow-hidden shrink-0 block"
                  >
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </Link>

                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#71717a]">
                      {item.category}
                    </span>
                    <h3 className="text-base font-semibold text-[#09090b] truncate max-w-xs">
                      <Link to={`/product/${item.slug}`} className="hover:underline">
                        {item.name}
                      </Link>
                    </h3>
                    <p className="text-xs font-medium text-[#71717a]">
                      {formatCurrency(item.price)} each
                    </p>
                  </div>
                </div>

                {/* Quantity Stepper & Price & Remove */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                  {/* Stepper */}
                  <div className="flex items-center rounded-full border border-[#e4e4e7] p-1 bg-white">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label="Decrease quantity"
                      className="h-7 w-7 rounded-full flex items-center justify-center text-[#71717a] hover:bg-[#f4f4f5] hover:text-[#09090b] transition-colors cursor-pointer"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold text-[#09090b]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      aria-label="Increase quantity"
                      className="h-7 w-7 rounded-full flex items-center justify-center text-[#71717a] hover:bg-[#f4f4f5] hover:text-[#09090b] transition-colors cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-[80px]">
                    <span className="text-base font-bold text-[#09090b]">
                      {formatCurrency(item.subtotal || item.price * item.quantity)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item from bag"
                    className="p-2 text-[#a1a1aa] hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <Link to="/shop">
              <Button variant="outline" size="sm">
                ← Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-[#fafafa] border border-[#e4e4e7] rounded-2xl p-6 sm:p-8 space-y-6 sticky top-24">
            <h3 className="text-lg font-bold text-[#09090b]">Order Summary</h3>

            <div className="space-y-3 text-xs text-[#71717a]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#09090b]">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-[#09090b]">
                  {shipping === 0 ? 'Complimentary' : formatCurrency(shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%)</span>
                <span className="font-semibold text-[#09090b]">{formatCurrency(estimatedTax)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-4 border-t border-[#e4e4e7] text-base font-extrabold text-[#09090b]">
                <span>Total</span>
                <span className="text-2xl">{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full text-sm font-semibold h-12 shadow-sm"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>

            <p className="text-[11px] text-[#a1a1aa] text-center leading-relaxed">
              Taxes and shipping are calculated according to your delivery destination. Guaranteed secure checkout.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
