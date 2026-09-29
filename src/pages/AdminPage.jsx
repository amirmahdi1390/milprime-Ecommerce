import React, { useState, useEffect } from 'react';
import { Plus, Database, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { productService } from '../services/productService';
import { isSupabaseConfigured } from '../lib/supabaseClient';
import { ProductTable } from '../features/admin/ProductTable';
import { ProductModal } from '../features/admin/ProductModal';
import { Button } from '../components/common/Button';
import { useUIStore } from '../store/uiStore';

export function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { addToast } = useUIStore();

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      addToast('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

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
        addToast(`Updated "${productData.name}"`, 'success');
      } else {
        await productService.createProduct(productData);
        addToast(`Created product "${productData.name}"`, 'success');
      }
      await loadProducts();
    } catch (err) {
      addToast(err.message || 'Operation failed', 'error');
      throw err;
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await productService.deleteProduct(id);
      addToast('Product successfully removed', 'success');
      await loadProducts();
    } catch (err) {
      addToast('Failed to delete product', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-left">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#e4e4e7] mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-black text-white">
              Catalog Management
            </span>
            <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border ${
              isSupabaseConfigured
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-zinc-100 text-zinc-600 border-zinc-200'
            }`}>
              <Database className="h-3 w-3" />
              {isSupabaseConfigured ? 'Supabase Connected' : 'Local Archive Sync'}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#09090b]">
            Product Catalog Studio
          </h1>
          <p className="text-xs text-[#71717a] mt-1">
            Create, calibrate pricing, manage images, and update live inventory across storefront channels.
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
