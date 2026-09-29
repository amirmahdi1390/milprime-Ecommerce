import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { SEED_PRODUCTS } from '../data/seedProducts';

const LOCAL_PRODUCTS_KEY = 'milprime_local_products';

function getLocalProducts() {
  if (typeof window === 'undefined') return SEED_PRODUCTS;
  try {
    const stored = localStorage.getItem(LOCAL_PRODUCTS_KEY);
    if (!stored) {
      localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(SEED_PRODUCTS));
      return SEED_PRODUCTS;
    }
    return JSON.parse(stored);
  } catch (err) {
    console.error('Error reading local products fallback:', err);
    return SEED_PRODUCTS;
  }
}

function saveLocalProducts(products) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
  } catch (err) {
    console.error('Error saving local products fallback:', err);
  }
}

export const productService = {
  /**
   * Fetch all active products
   */
  async getActiveProducts() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('active', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase query failed, falling back to local dataset:', err.message);
      }
    }
    return getLocalProducts().filter((p) => p.active !== false);
  },

  /**
   * Fetch all products (including inactive, for Admin)
   */
  async getAllProducts() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase query failed, falling back to local dataset:', err.message);
      }
    }
    return getLocalProducts();
  },

  /**
   * Fetch featured products for homepage
   */
  async getFeaturedProducts() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('active', true)
          .eq('featured', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase query failed for featured products:', err.message);
      }
    }
    return getLocalProducts().filter((p) => p.active !== false && p.featured === true);
  },

  /**
   * Fetch single product by slug
   */
  async getProductBySlug(slug) {
    if (!slug) return null;
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        if (data) return data;
      } catch (err) {
        console.warn(`Supabase getProductBySlug failed for ${slug}:`, err.message);
      }
    }
    return getLocalProducts().find((p) => p.slug === slug) || null;
  },

  /**
   * Create a new product (Admin)
   */
  async createProduct(productData) {
    const newProduct = {
      ...productData,
      id: productData.id || `prod-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      active: productData.active !== undefined ? productData.active : true,
      featured: Boolean(productData.featured),
      price: parseFloat(productData.price) || 0,
      compare_at_price: productData.compare_at_price ? parseFloat(productData.compare_at_price) : null,
      images: Array.isArray(productData.images) && productData.images.length > 0 
        ? productData.images 
        : [productData.image_url],
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .insert([newProduct])
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (err) {
        console.warn('Supabase createProduct failed, saving to local store:', err.message);
      }
    }

    const current = getLocalProducts();
    const updated = [newProduct, ...current];
    saveLocalProducts(updated);
    return newProduct;
  },

  /**
   * Update an existing product (Admin)
   */
  async updateProduct(id, productData) {
    const payload = {
      ...productData,
      updated_at: new Date().toISOString(),
      price: parseFloat(productData.price) || 0,
      compare_at_price: productData.compare_at_price ? parseFloat(productData.compare_at_price) : null,
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .update(payload)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (err) {
        console.warn('Supabase updateProduct failed, updating local store:', err.message);
      }
    }

    const current = getLocalProducts();
    const index = current.findIndex((p) => p.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...payload };
      saveLocalProducts(current);
      return current[index];
    }
    return null;
  },

  /**
   * Delete a product (Admin)
   */
  async deleteProduct(id) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);

        if (error) throw error;
      } catch (err) {
        console.warn('Supabase deleteProduct failed, deleting from local store:', err.message);
      }
    }

    const current = getLocalProducts();
    const filtered = current.filter((p) => p.id !== id);
    saveLocalProducts(filtered);
    return true;
  },
};
