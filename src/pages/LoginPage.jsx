import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useUIStore } from '../store/uiStore';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const addItem = useCartStore((state) => state.addItem);
  const { addToast } = useUIStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const returnUrl = location.state?.returnUrl;
  const pendingProduct = location.state?.pendingProduct;
  const pendingQty = location.state?.pendingQty || 1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please provide your email and password');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await login(email, password);
      addToast('Welcome back to Milprime.', 'success');

      if (pendingProduct) {
        addItem(pendingProduct, pendingQty);
        addToast(`${pendingProduct.name} added to your bag.`, 'success');
      }

      navigate(returnUrl || '/shop');
    } catch (err) {
      setError('Invalid credentials provided');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 text-left">
      <SEO
        title="Sign In — Milprime"
        description="Sign in to your Milprime account to access curated collections, orders, and private archives."
        url="/login"
      />

      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-[#e4e4e7] shadow-sm">
        
        {/* Header */}
        <div className="space-y-2 text-center">
          <Link to="/" className="text-2xl font-bold tracking-tight text-[#09090b]">
            Milprime
          </Link>
          <h2 className="text-xl font-bold tracking-tight text-[#09090b]">
            Sign in to your account
          </h2>
          <p className="text-xs text-[#71717a]">
            Access your archival orders, saved delivery addresses, and private previews.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                className="text-xs text-[#71717a] hover:text-[#09090b] underline cursor-pointer"
                onClick={() => addToast('Reset link has been prepared.', 'info')}
              >
                Forgot password?
              </button>
            </div>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full font-semibold mt-2"
          >
            Sign In <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </form>

        <div className="pt-2 text-center text-xs text-[#71717a]">
          New patron to Milprime?{' '}
          <Link
            to="/register"
            state={location.state}
            className="font-semibold text-[#09090b] underline"
          >
            Create an account
          </Link>
        </div>

      </div>
    </div>
  );
}
