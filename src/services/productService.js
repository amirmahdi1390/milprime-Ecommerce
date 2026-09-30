import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const isUuid = (str) =>
  typeof str === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);

function ensureSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured or credentials are missing from environment variables.');
  }
  return supabase;
}

export const productService = {
  /**
   * Fetch all active products for the storefront catalog
   */
  async getActiveProducts() {
    const client = ensureSupabase();
    const { data, error } = await client
      .from('products')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase getActiveProducts error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    return data || [];
  },

  /**
   * Fetch all products (including inactive items for the Admin Studio)
   */
  async getAllProducts() {
    const client = ensureSupabase();
    const { data, error } = await client
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase getAllProducts error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    return data || [];
  },

  /**
   * Fetch featured products for the storefront homepage
   */
  async getFeaturedProducts() {
    const client = ensureSupabase();
    const { data, error } = await client
      .from('products')
      .select('*')
      .eq('active', true)
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase getFeaturedProducts error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    return data || [];
  },

  /**
   * Fetch single product by unique slug
   * @param {string} slug 
   */
  async getProductBySlug(slug) {
    if (!slug) return null;
    const client = ensureSupabase();

    const { data, error } = await client
      .from('products')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error(`Supabase getProductBySlug error for "${slug}":`, error);
      throw new Error(`Database error: ${error.message}`);
    }

    return data || null;
  },

  /**
   * Create a new product in Supabase (Admin)
   * @param {object} productData 
   */
  async createProduct(productData) {
    const client = ensureSupabase();

    const payload = {
      name: productData.name.trim(),
      slug: productData.slug.trim(),
      description: productData.description || null,
      short_description: productData.short_description || null,
      price: parseFloat(productData.price) || 0,
      compare_at_price: productData.compare_at_price ? parseFloat(productData.compare_at_price) : null,
      category: productData.category || 'Accessories',
      brand: productData.brand || 'Milprime',
      sku: productData.sku || null,
      image_url: productData.image_url,
      images: Array.isArray(productData.images) && productData.images.length > 0
        ? productData.images
        : [productData.image_url],
      featured: Boolean(productData.featured),
      active: productData.active !== undefined ? Boolean(productData.active) : true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isUuid(productData.id)) {
      payload.id = productData.id;
    }

    const { data, error } = await client
      .from('products')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Supabase createProduct INSERT error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    return data;
  },

  /**
   * Update an existing product in Supabase (Admin)
   * @param {string} id 
   * @param {object} productData 
   */
  async updateProduct(id, productData) {
    const client = ensureSupabase();

    const payload = {
      name: productData.name.trim(),
      slug: productData.slug.trim(),
      description: productData.description || null,
      short_description: productData.short_description || null,
      price: parseFloat(productData.price) || 0,
      compare_at_price: productData.compare_at_price ? parseFloat(productData.compare_at_price) : null,
      category: productData.category,
      brand: productData.brand || 'Milprime',
      sku: productData.sku || null,
      image_url: productData.image_url,
      images: Array.isArray(productData.images) && productData.images.length > 0
        ? productData.images
        : [productData.image_url],
      featured: Boolean(productData.featured),
      active: productData.active !== undefined ? Boolean(productData.active) : true,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await client
      .from('products')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Supabase updateProduct UPDATE error for ID ${id}:`, error);
      throw new Error(`Database error: ${error.message}`);
    }

    return data;
  },

  /**
   * Delete a product permanently from Supabase (Admin)
   * @param {string} id 
   */
  async deleteProduct(id) {
    const client = ensureSupabase();

    const { error } = await client
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Supabase deleteProduct DELETE error for ID ${id}:`, error);
      throw new Error(`Database error: ${error.message}`);
    }

    return true;
  },
};
