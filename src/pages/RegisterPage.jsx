import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { ArrowRight } from 'lucide-react';

export function RegisterPage() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const { addToast } = useUIStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await register(name.trim(), email.trim(), password);
      addToast(`Account established for ${name}. Welcome to Milprime.`, 'success');
      navigate('/shop');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 text-left">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-[#e4e4e7] shadow-sm">
        
        {/* Header */}
        <div className="space-y-2 text-center">
          <Link to="/" className="text-2xl font-bold tracking-tight text-[#09090b]">
            Milprime
          </Link>
          <h2 className="text-xl font-bold tracking-tight text-[#09090b]">
            Create your account
          </h2>
          <p className="text-xs text-[#71717a]">
            Enjoy seamless checkout, priority dispatches, and archival tracking.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Julian Vance"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="julian@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Minimum 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full font-semibold mt-2"
          >
            Create Account <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </form>

        <div className="pt-2 text-center text-xs text-[#71717a]">
          Already have a Milprime profile?{' '}
          <Link to="/login" className="font-semibold text-[#09090b] underline">
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
}
