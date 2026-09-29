import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ImageUploader } from './ImageUploader';
import { CATEGORIES } from '../../data/categories';

export function ProductModal({ isOpen, onClose, product, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    short_description: '',
    price: '',
    compare_at_price: '',
    category: 'Accessories',
    brand: 'Milprime Studio',
    sku: '',
    image_url: '',
    featured: false,
    active: true,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        slug: product.slug || '',
        description: product.description || '',
        short_description: product.short_description || '',
        price: product.price ? String(product.price) : '',
        compare_at_price: product.compare_at_price ? String(product.compare_at_price) : '',
        category: product.category || 'Accessories',
        brand: product.brand || 'Milprime Studio',
        sku: product.sku || '',
        image_url: product.image_url || '',
        featured: Boolean(product.featured),
        active: product.active !== undefined ? product.active : true,
      });
    } else {
      setFormData({
        name: '',
        slug: '',
        description: '',
        short_description: '',
        price: '',
        compare_at_price: '',
        category: 'Accessories',
        brand: 'Milprime Studio',
        sku: `MIL-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        image_url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=80',
        featured: false,
        active: true,
      });
    }
    setError('');
  }, [product, isOpen]);

  const handleNameChange = (e) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setFormData((prev) => ({
      ...prev,
      name,
      slug: product ? prev.slug : slug,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price || !formData.image_url) {
      setError('Please provide product name, price, and an image');
      return;
    }

    try {
      setSaving(true);
      await onSave({
        ...formData,
        price: parseFloat(formData.price),
        compare_at_price: formData.compare_at_price ? parseFloat(formData.compare_at_price) : null,
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? 'Edit Product' : 'Add New Product'}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5 text-left">
        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Product Name *"
            placeholder="e.g. Aero Chronometer"
            value={formData.name}
            onChange={handleNameChange}
            required
          />
          <Input
            label="Slug (URL identifier) *"
            placeholder="aero-chronometer"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Price (USD) *"
            type="number"
            step="0.01"
            placeholder="250.00"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
          <Input
            label="Compare-at Price (USD)"
            type="number"
            step="0.01"
            placeholder="300.00"
            value={formData.compare_at_price}
            onChange={(e) => setFormData({ ...formData, compare_at_price: e.target.value })}
          />
          <div>
            <label className="block text-xs font-semibold text-[#71717a] uppercase tracking-wider mb-1.5">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full rounded-lg border border-[#e4e4e7] bg-white px-3.5 py-2.5 text-sm text-[#09090b] focus:outline-none focus:border-[#09090b]"
            >
              {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Brand"
            placeholder="Milprime Studio"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          />
          <Input
            label="SKU"
            placeholder="MIL-ACC-099"
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#71717a] uppercase tracking-wider mb-1.5">
            Short Description
          </label>
          <input
            type="text"
            placeholder="Brief 1-sentence product summary"
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            className="w-full rounded-lg border border-[#e4e4e7] bg-white px-3.5 py-2.5 text-sm text-[#09090b] focus:outline-none focus:border-[#09090b]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#71717a] uppercase tracking-wider mb-1.5">
            Full Description
          </label>
          <textarea
            rows={3}
            placeholder="Detailed specifications, material origin, care instructions..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full rounded-lg border border-[#e4e4e7] bg-white p-3.5 text-sm text-[#09090b] focus:outline-none focus:border-[#09090b]"
          />
        </div>

        {/* Supabase Storage Image Upload */}
        <ImageUploader
          currentImageUrl={formData.image_url}
          onImageUploaded={(url) => setFormData((prev) => ({ ...prev, image_url: url }))}
        />

        {/* Checkboxes: Featured & Active */}
        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 text-sm text-[#09090b] cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="h-4 w-4 rounded border-[#e4e4e7] text-black focus:ring-black"
            />
            <span className="text-xs font-medium">Show in Featured Collection</span>
          </label>

          <label className="flex items-center gap-2 text-sm text-[#09090b] cursor-pointer">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="h-4 w-4 rounded border-[#e4e4e7] text-black focus:ring-black"
            />
            <span className="text-xs font-medium">Active (Visible in Store)</span>
          </label>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[#e4e4e7]">
          <Button type="button" variant="outline" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md" loading={saving}>
            {product ? 'Save Changes' : 'Create Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
