import React, { useState } from 'react';
import { Edit2, Trash2, CheckCircle2, XCircle, Search, Star } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';

export function ProductTable({ products = [], onEdit, onDelete, loading = false }) {
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()) ||
      p.sku?.toLowerCase().includes(search.toLowerCase())
  );

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await onDelete(deleteTarget.id);
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4 text-left">
      {/* Search Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a1a1aa]" />
          <input
            type="text"
            placeholder="Search products by title, SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#e4e4e7] rounded-full text-xs text-[#09090b] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#09090b]"
          />
        </div>
        <p className="text-xs text-[#71717a] hidden sm:block">
          {filtered.length} total products
        </p>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-[#e4e4e7] bg-white shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e4e4e7] bg-[#fafafa] text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">
              <th className="py-3.5 px-4">Product</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">SKU</th>
              <th className="py-3.5 px-4">Price</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e4e4e7] text-xs text-[#09090b]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-sm text-[#71717a]">
                  No products found.
                </td>
              </tr>
            ) : (
              filtered.map((product) => (
                <tr key={product.id} className="hover:bg-[#fafafa] transition-colors">
                  {/* Thumbnail & Title */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-10 w-10 rounded-lg object-cover bg-[#f4f4f5] border border-[#e4e4e7] shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-[#09090b] truncate max-w-[200px] sm:max-w-xs">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-[#71717a] truncate">/{product.slug}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-[#71717a]">{product.category}</span>
                  </td>

                  {/* SKU */}
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#71717a]">
                    {product.sku || '—'}
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4 font-semibold">
                    {formatCurrency(product.price)}
                  </td>

                  {/* Badges */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {product.active !== false ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="h-3 w-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-100 text-zinc-600 border border-zinc-200">
                          <XCircle className="h-3 w-3" /> Hidden
                        </span>
                      )}
                      {product.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          <Star className="h-3 w-3 fill-amber-500" /> Featured
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEdit(product)}
                        aria-label={`Edit ${product.name}`}
                        className="p-1.5 rounded-lg text-[#71717a] hover:text-[#09090b] hover:bg-[#f4f4f5] transition-colors cursor-pointer"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(product)}
                        aria-label={`Delete ${product.name}`}
                        className="p-1.5 rounded-lg text-[#71717a] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Confirm Product Deletion"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-sm text-[#71717a]">
            Are you sure you want to permanently delete{' '}
            <strong className="text-[#09090b]">"{deleteTarget?.name}"</strong>? This will remove the item from the live storefront.
          </p>
          <div className="flex justify-end gap-3 pt-3">
            <Button
              variant="outline"
              size="md"
              onClick={() => setDeleteTarget(null)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="md"
              onClick={confirmDelete}
              loading={deleting}
            >
              Delete Product
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
