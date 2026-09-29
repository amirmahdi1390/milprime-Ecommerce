import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export const storageService = {
  /**
   * Upload product image file to Supabase Storage bucket 'product-images'
   * @param {File} file 
   * @param {string} productId 
   * @returns {Promise<string>} Public URL of the uploaded image
   */
  async uploadProductImage(file, productId = 'temp') {
    if (!file) throw new Error('No file provided for upload');

    const fileExt = file.name ? file.name.split('.').pop() : 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `products/${productId}/${fileName}`;

    if (isSupabaseConfigured && supabase) {
      try {
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        if (data?.publicUrl) {
          return data.publicUrl;
        }
      } catch (err) {
        console.warn('Supabase storage upload failed:', err.message);
        throw err;
      }
    }

    // Fallback if Supabase storage is not configured: Create an object URL or simulated public URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }
};
