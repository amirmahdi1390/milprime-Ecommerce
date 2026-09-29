import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { CheckoutForm } from '../features/checkout/CheckoutForm';
import { OrderSummary } from '../features/checkout/OrderSummary';
import { ArrowLeft, Lock } from 'lucide-react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const [loading, setLoading] = useState(false);

  const subtotal = getSubtotal();
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const tax = parseFloat((subtotal * 0.08).toFixed(2));
  const total = subtotal + shipping + tax;

  const handleCheckoutSubmit = async (formData) => {
    setLoading(true);

    // Realistic processing state (1.5s delay)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate simulated order confirmation details
    const orderNumber = `MIL-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderData = {
      orderNumber,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      customer: formData,
      items: [...items],
      subtotal,
      shipping,
      tax,
      total,
    };

    sessionStorage.setItem('milprime_latest_order', JSON.stringify(orderData));

    setLoading(false);
    navigate('/payment-success');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#09090b]">Your Cart is Empty</h2>
        <p className="text-sm text-[#71717a]">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-black underline"
        >
          <ArrowLeft className="h-4 w-4" /> Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-left">
      
      {/* Checkout Minimal Header */}
      <header className="border-b border-[#e4e4e7] py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight text-[#09090b]">
            Milprime
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-[#71717a]">
            <Lock className="h-3.5 w-3.5 text-emerald-600" />
            <span>Secure 256-bit Checkout</span>
          </div>
        </div>
      </header>

      {/* Main 2-Column Checkout Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <CheckoutForm
              onSubmit={handleCheckoutSubmit}
              loading={loading}
              totalAmount={total}
            />
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-10">
              <OrderSummary
                items={items}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
              />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
