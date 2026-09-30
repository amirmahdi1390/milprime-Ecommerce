-- ==============================================================================
-- MILPRIME SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Run this script in your Supabase Project SQL Editor to create the products
-- table and the storage bucket for product images.
-- ==============================================================================

-- 1. Create the products table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    short_description TEXT,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    compare_at_price NUMERIC(10, 2),
    category TEXT NOT NULL,
    brand TEXT,
    sku TEXT,
    image_url TEXT NOT NULL,
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    featured BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for fast queries
CREATE INDEX IF NOT EXISTS products_slug_idx ON public.products (slug);
CREATE INDEX IF NOT EXISTS products_category_idx ON public.products (category);
CREATE INDEX IF NOT EXISTS products_featured_idx ON public.products (featured);
CREATE INDEX IF NOT EXISTS products_active_idx ON public.products (active);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Allow anyone (public/anon) to read active products
CREATE POLICY "Allow public read access to active products" 
ON public.products 
FOR SELECT 
USING (true);

-- Allow anon key to insert products (frontend-only admin demo)
CREATE POLICY "Allow anon insert products" 
ON public.products 
FOR INSERT 
WITH CHECK (true);

-- Allow anon key to update products
CREATE POLICY "Allow anon update products" 
ON public.products 
FOR UPDATE 
USING (true);

-- Allow anon key to delete products
CREATE POLICY "Allow anon delete products" 
ON public.products 
FOR DELETE 
USING (true);

-- 4. Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
    'product-images', 
    'product-images', 
    true, 
    10485760, 
    ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET 
    public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/svg+xml'];

-- Storage policies for product-images bucket
DROP POLICY IF EXISTS "Public Access to product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon upload to product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon update in product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon delete from product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public insert product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public delete product-images" ON storage.objects;

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read product-images" 
ON storage.objects 
FOR SELECT 
TO public 
USING (bucket_id = 'product-images');

CREATE POLICY "Allow public insert product-images" 
ON storage.objects 
FOR INSERT 
TO public 
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow public update product-images" 
ON storage.objects 
FOR UPDATE 
TO public 
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow public delete product-images" 
ON storage.objects 
FOR DELETE 
TO public 
USING (bucket_id = 'product-images');

