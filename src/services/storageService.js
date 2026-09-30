import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export const storageService = {
  /**
   * Upload product image file to Supabase Storage bucket 'product-images'
   * Expected path: product-images/products/{productId}/{filename}
   * @param {File} file 
   * @param {string} productId 
   * @returns {Promise<string>} Public URL of the uploaded image
   */
  async uploadProductImage(file, productId = 'general') {
    if (!file) throw new Error('No file provided for upload');

    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase client is not configured. Cannot upload image to Storage.');
    }

    const fileExt = file.name ? file.name.split('.').pop() : 'jpg';
    const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const cleanProductId = productId ? String(productId).replace(/[^a-zA-Z0-9_-]/g, '') : 'general';
    const filePath = `products/${cleanProductId}/${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.error('Supabase Storage upload error:', uploadError);
      throw new Error(`Storage error: ${uploadError.message}`);
    }

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    if (!data?.publicUrl) {
      throw new Error('Could not retrieve public URL for uploaded image.');
    }

    return data.publicUrl;
  },

  /**
   * Delete product image from Supabase Storage
   * @param {string} imageUrl 
   */
  async deleteProductImage(imageUrl) {
    if (!imageUrl || !isSupabaseConfigured || !supabase) return false;
    try {
      if (imageUrl.includes('product-images/')) {
        const parts = imageUrl.split('product-images/');
        if (parts[1]) {
          const path = parts[1].split('?')[0];
          await supabase.storage.from('product-images').remove([path]);
          return true;
        }
      }
      return false;
    } catch (e) {
      console.warn('Could not delete image from Supabase storage:', e);
      return false;
    }
  },
};
