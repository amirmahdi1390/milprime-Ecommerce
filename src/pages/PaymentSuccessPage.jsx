import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Package, Calendar, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { formatCurrency } from '../utils/currency';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

export function PaymentSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Clear cart immediately upon landing on payment success
    clearCart();

    const stored = sessionStorage.getItem('milprime_latest_order');
    if (stored) {
      try {
        setOrder(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing order confirmation:', e);
      }
    }
  }, [clearCart]);

  const orderNum = order?.orderNumber || 'MIL-784291';
  const orderDate = order?.date || new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
      <SEO
        title="Order Confirmation"
        description="Your Milprime acquisition order receipt and transit confirmation."
        canonical="/payment-success"
        noindex={true}
      />
      
      {/* Success Badge & Headline */}
      <div className="space-y-4">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
          <CheckCircle2 className="h-8 w-8 stroke-[2]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#09090b]">
          Payment Successful
        </h1>
        <p className="text-sm text-[#71717a] max-w-md mx-auto leading-relaxed">
          Thank you for your purchase. Your order has been successfully received and our fulfillment studio is preparing your pieces.
        </p>
      </div>

      {/* Order Receipt Card */}
      <div className="mt-10 rounded-2xl bg-[#fafafa] border border-[#e4e4e7] p-6 sm:p-8 text-left space-y-6">
        
        {/* Order Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#e4e4e7]">
          <div>
            <span className="text-[11px] font-semibold text-[#71717a] uppercase tracking-wider">
              Order Reference
            </span>
            <p className="text-base font-mono font-bold text-[#09090b]">{orderNum}</p>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-semibold text-[#71717a] uppercase tracking-wider">
              Date Authorized
            </span>
            <p className="text-xs text-[#09090b] font-medium">{orderDate}</p>
          </div>
        </div>

        {/* Shipping Destination */}
        {order?.customer && (
          <div className="space-y-1 text-xs text-[#71717a] pb-6 border-b border-[#e4e4e7]">
            <p className="font-semibold text-[#09090b]">Shipping To:</p>
            <p className="text-[#09090b]">{order.customer.fullName}</p>
            <p>{order.customer.address} {order.customer.addressCont}</p>
            <p>{order.customer.city}, {order.customer.state} {order.customer.postalCode}</p>
            <p className="pt-1 text-[11px] text-[#a1a1aa]">Confirmation emailed to: {order.customer.email}</p>
          </div>
        )}

        {/* Purchased Items List */}
        {order?.items && order.items.length > 0 && (
          <div className="space-y-3 pb-6 border-b border-[#e4e4e7]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a]">
              Purchased Items ({order.items.length})
            </span>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-10 w-10 rounded-lg object-cover bg-white border border-[#e4e4e7]"
                    />
                    <div>
                      <p className="font-medium text-[#09090b] line-clamp-1">{item.name}</p>
                      <p className="text-[#71717a]">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-[#09090b]">
                    {formatCurrency(item.subtotal || item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Totals */}
        <div className="space-y-1.5 text-xs text-[#71717a]">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium text-[#09090b]">
              {formatCurrency(order?.subtotal || 0)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-medium text-[#09090b]">
              {order?.shipping === 0 ? 'Complimentary' : formatCurrency(order?.shipping || 0)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Taxes</span>
            <span className="font-medium text-[#09090b]">
              {formatCurrency(order?.tax || 0)}
            </span>
          </div>
          <div className="flex justify-between items-baseline pt-3 border-t border-[#e4e4e7] text-base font-bold text-[#09090b]">
            <span>Total Paid</span>
            <span className="text-xl">{formatCurrency(order?.total || 0)}</span>
          </div>
        </div>

      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/">
          <Button variant="primary" size="lg" className="rounded-full px-8">
            Continue Shopping <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </Link>
        <Link to="/shop">
          <Button variant="outline" size="lg" className="rounded-full px-7">
            Browse All Collections
          </Button>
        </Link>
      </div>

    </div>
  );
}
