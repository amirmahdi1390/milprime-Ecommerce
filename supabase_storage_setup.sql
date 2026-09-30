-- ==============================================================================
-- MILPRIME SUPABASE STORAGE SETUP FOR 'product-images'
-- ==============================================================================
-- Run this script in your Supabase Dashboard SQL Editor to configure the
-- 'product-images' bucket and grant required anonymous upload/read permissions.
-- ==============================================================================

-- 1. Create or update the storage bucket 'product-images' as a public bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
    'product-images', 
    'product-images', 
    true, 
    10485760, -- 10MB limit
    ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET 
    public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/svg+xml'];

-- 2. Drop any existing overlapping policies on storage.objects for product-images
DROP POLICY IF EXISTS "Public Access to product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon upload to product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon update in product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon delete from product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public insert product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public delete product-images" ON storage.objects;

-- 3. Enable Row Level Security (RLS) on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 4. Create scoped policies for the 'product-images' bucket:

-- SELECT: Public can view and download product images
CREATE POLICY "Allow public read product-images" 
ON storage.objects 
FOR SELECT 
TO public 
USING (bucket_id = 'product-images');

-- INSERT: Allow uploading product images
CREATE POLICY "Allow public insert product-images" 
ON storage.objects 
FOR INSERT 
TO public 
WITH CHECK (bucket_id = 'product-images');

-- UPDATE: Allow updating / replacing existing product images
CREATE POLICY "Allow public update product-images" 
ON storage.objects 
FOR UPDATE 
TO public 
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

-- DELETE: Allow removing product images
CREATE POLICY "Allow public delete product-images" 
ON storage.objects 
FOR DELETE 
TO public 
USING (bucket_id = 'product-images');
