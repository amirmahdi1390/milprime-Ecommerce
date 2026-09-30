import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { CheckoutForm } from '../features/checkout/CheckoutForm';
import { OrderSummary } from '../features/checkout/OrderSummary';
import { ArrowLeft, Lock } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnUrl: '/checkout' }, replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const tax = parseFloat((subtotal * 0.08).toFixed(2));
  const total = subtotal + shipping + tax;

  const handleCheckoutSubmit = async (formData) => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const cardDigits = (formData.cardNumber || '').replace(/\D/g, '');
    const safeCustomer = {
      fullName: formData.fullName,
      email: formData.email,
      address: formData.address,
      addressCont: formData.addressCont || '',
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      country: formData.country,
      phone: formData.phone,
      cardLast4: cardDigits.length >= 4 ? cardDigits.slice(-4) : '••••',
    };

    const orderData = {
      orderNumber,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      customer: safeCustomer,
      items: [...items],
      subtotal,
      shipping,
      tax,
      total,
    };

    sessionStorage.setItem('milprime_latest_order', JSON.stringify(orderData));
    useCartStore.getState().clearCart();

    setLoading(false);
    navigate('/payment-success');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <SEO title="Checkout — Milprime" description="Complete your acquisition at Milprime." url="/checkout" />
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
      <SEO
        title="Secure Checkout — Milprime"
        description="Encrypted acquisition portal for Milprime patrons. Worldwide insured transit."
        url="/checkout"
      />
      
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
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
      </main>

    </div>
  );
}
