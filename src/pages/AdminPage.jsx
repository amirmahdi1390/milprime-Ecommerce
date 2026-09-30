import React, { useState, useEffect } from 'react';
import { Plus, Database, RefreshCw, Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { productService } from '../services/productService';
import { isSupabaseConfigured, checkSupabaseHealth } from '../lib/supabaseClient';
import { ProductTable } from '../features/admin/ProductTable';
import { ProductModal } from '../features/admin/ProductModal';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { SEO } from '../components/common/SEO';

export function AdminPage() {
  const { user, isAuthenticated, login } = useAuthStore();
  const isAdmin = isAuthenticated && user?.role === 'admin';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [dbHealth, setDbHealth] = useState({ ok: true, message: 'Checking connection...' });
  const { addToast } = useUIStore();

  // Admin login form state
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const loadProducts = async () => {
    setLoading(true);
    try {
      const health = await checkSupabaseHealth();
      if (health.ok) {
        setDbHealth({ ok: true, message: 'Supabase Live Connected' });
      } else {
        setDbHealth({ ok: false, message: health.error || 'Database error' });
      }

      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setDbHealth({ ok: false, message: err.message || 'Database error' });
      addToast(`Database error: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadProducts();
    }
  }, [isAdmin]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!adminEmail.trim() || !adminPassword) {
      setAuthError('Please enter your administrator credentials');
      return;
    }

    try {
      setAuthLoading(true);
      setAuthError('');
      const loggedInUser = await login(adminEmail.trim(), adminPassword);
      if (loggedInUser?.role !== 'admin') {
        setAuthError('Access restricted to studio administrators');
        return;
      }
      addToast('Administrator authenticated.', 'success');
    } catch (err) {
      setAuthError(err.message || 'Invalid administrator credentials');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, productData);
        addToast(`Updated "${productData.name}" in Supabase`, 'success');
      } else {
        await productService.createProduct(productData);
        addToast(`Created "${productData.name}" in Supabase`, 'success');
      }
      await loadProducts();
    } catch (err) {
      addToast(err.message || 'Database operation failed', 'error');
      throw err;
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await productService.deleteProduct(id);
      addToast('Product permanently deleted from Supabase', 'success');
      await loadProducts();
    } catch (err) {
      addToast(`Failed to delete product: ${err.message}`, 'error');
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 text-left">
        <SEO title="Studio Administration — Milprime" url="/admin" noindex={true} />
        
        <div className="w-full max-w-md space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-[#e4e4e7] shadow-sm">
          <div className="text-center space-y-2">
            <div className="mx-auto h-12 w-12 rounded-full bg-[#f4f4f5] flex items-center justify-center text-[#09090b] mb-3">
              <Lock className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#09090b]">
              Studio Administration
            </h2>
            <p className="text-xs text-[#71717a]">
              Please authenticate to access product inventory and catalog management.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              {authError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={authLoading}
              className="w-full font-semibold mt-2"
            >
              Sign In to Studio <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-left">
      <SEO title="Admin Catalog Studio — Milprime" url="/admin" noindex={true} />
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#e4e4e7] mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-black text-white">
              Catalog Management
            </span>
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-0.5 rounded-full border ${
                dbHealth.ok
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}
            >
              <Database className="h-3 w-3" />
              {dbHealth.ok ? `Supabase Live Connected (${products.length} items)` : dbHealth.message}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#09090b]">
            Product Catalog Studio
          </h1>
          <p className="text-xs text-[#71717a] mt-1">
            Create, calibrate pricing, manage images, and update live inventory in Supabase database.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={loadProducts}
            className="flex items-center gap-1.5"
            disabled={loading}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Button>
        </div>
      </div>

      {/* Main Table */}
      <ProductTable
        products={products}
        onEdit={handleOpenEdit}
        onDelete={handleDeleteProduct}
        loading={loading}
      />

      {/* Add / Edit Product Modal */}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={editingProduct}
        onSave={handleSaveProduct}
      />

    </div>
  );
}
