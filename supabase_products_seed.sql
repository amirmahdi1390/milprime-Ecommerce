-- ==============================================================================
-- MILPRIME — COMPLETE STORE PRODUCTS SEED MIGRATION (17 DEDUPLICATED PRODUCTS)
-- ==============================================================================
-- This script contains all 17 storefront products (5 reference products + 12
-- catalog items). It uses ON CONFLICT (slug) DO NOTHING to safely preserve
-- any existing products in your Supabase database.
-- ==============================================================================

INSERT INTO public.products (
  name,
  slug,
  description,
  short_description,
  price,
  compare_at_price,
  category,
  brand,
  sku,
  image_url,
  images,
  featured,
  active
)
VALUES
-- 1. Reference: Aurelia Chronograph
(
  'Aurelia Chronograph',
  'aurelia-chronograph',
  'A refined chronograph designed with a clean architectural dial, premium finishing and a timeless silhouette.',
  'A refined everyday chronograph with a sophisticated finish.',
  189.00,
  219.00,
  'Watches',
  'Milprime',
  'MIL-W001',
  'https://images.unsplash.com/photo-1524805444758-089113d48a6d',
  ARRAY['https://images.unsplash.com/photo-1524805444758-089113d48a6d']::TEXT[],
  true,
  true
),
-- 2. Reference: Noir Leather Weekender
(
  'Noir Leather Weekender',
  'noir-leather-weekender',
  'A spacious leather weekender crafted for short journeys, business travel and refined everyday use.',
  'A premium leather weekender for modern travel.',
  149.00,
  NULL,
  'Bags',
  'Milprime',
  'MIL-B001',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
  ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62']::TEXT[],
  true,
  true
),
-- 3. Reference: Essential Overshirt
(
  'Essential Overshirt',
  'essential-overshirt',
  'A versatile contemporary overshirt with a structured silhouette and understated detailing.',
  'A clean, versatile overshirt designed for everyday wear.',
  89.00,
  109.00,
  'Clothing',
  'Milprime',
  'MIL-C001',
  'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3',
  ARRAY['https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3']::TEXT[],
  false,
  true
),
-- 4. Reference: Sculptural Table Lamp
(
  'Sculptural Table Lamp',
  'sculptural-table-lamp',
  'A minimalist table lamp combining sculptural form with a warm ambient presence.',
  'A sculptural lamp for refined contemporary interiors.',
  119.00,
  NULL,
  'Home',
  'Milprime',
  'MIL-H001',
  'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
  ARRAY['https://images.unsplash.com/photo-1507473885765-e6ed057f782c']::TEXT[],
  true,
  true
),
-- 5. Reference: Minimal Leather Wallet
(
  'Minimal Leather Wallet',
  'minimal-leather-wallet',
  'A compact leather wallet designed around essential storage and a clean profile.',
  'A minimal leather wallet with a refined profile.',
  59.00,
  69.00,
  'Accessories',
  'Milprime',
  'MIL-A001',
  'https://images.unsplash.com/photo-1627123424574-724758594e93',
  ARRAY['https://images.unsplash.com/photo-1627123424574-724758594e93']::TEXT[],
  false,
  true
),
-- 6. Catalog: Ocean Bloom Carryall
(
  'Ocean Bloom Carryall',
  'ocean-bloom-carryall',
  'Ocean Bloom captures the spirit of coastal escapes — a wave-blue silhouette paired with sun-washed handles that feel straight out of a Mediterranean summer. Structured yet soft, it moves effortlessly from city streets to seaside aperitifs. Crafted with premium Italian pebbled leather and lined in organic cotton twill.',
  'A wave-blue structured silhouette paired with sun-washed handles that feel straight out of a Mediterranean summer.',
  320.00,
  380.00,
  'Bags',
  'Milprime Studio',
  'MIL-BAG-001',
  'https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/0196b1e1-bdf7-72bb-b729-1135a2543d54/test/Default_product_imag_of_a_yellow_bag_for_ecommerce_website_3-CcEwpnzNztUrPTdfCTDe06CKyd8o61.jpg',
  ARRAY['https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/0196b1e1-bdf7-72bb-b729-1135a2543d54/test/Default_product_imag_of_a_yellow_bag_for_ecommerce_website_3-CcEwpnzNztUrPTdfCTDe06CKyd8o61.jpg']::TEXT[],
  true,
  true
),
-- 7. Catalog: Sunbeam Leather Tote
(
  'Sunbeam Leather Tote',
  'sunbeam-leather-tote',
  'An everyday companion crafted from vegetable-tanned harness leather that patinas gracefully with age. Features an interior zip pocket, reinforced double-layer base, and hand-finished burnished edges for enduring luxury.',
  'Golden warm leather tote with reinforced stitching and an interior magnetic key clasp.',
  185.00,
  220.00,
  'Bags',
  'Milprime Studio',
  'MIL-BAG-002',
  'https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/0196b1e1-bdf7-72bb-b729-1135a2543d54/test/Default_product_imag_of_a_yellow_bag_for_ecommerce_website_0-OPBBr1ShXHAVNYJwN4k5KIcu6mMEG3.jpg',
  ARRAY['https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/0196b1e1-bdf7-72bb-b729-1135a2543d54/test/Default_product_imag_of_a_yellow_bag_for_ecommerce_website_0-OPBBr1ShXHAVNYJwN4k5KIcu6mMEG3.jpg']::TEXT[],
  true,
  true
),
-- 8. Catalog: Le Sac Autre
(
  'Le Sac Autre',
  'le-sac-autre',
  'With geometric contours and concealed magnetic closures, Le Sac Autre reimagines modern elegance. Lightweight yet impeccably sturdy, it houses all your everyday essentials without adding unnecessary volume.',
  'Architectural structured shoulder bag sculpted in rich espresso calfskin.',
  495.00,
  550.00,
  'Bags',
  'Atelier Milprime',
  'MIL-BAG-003',
  'https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/0196b1e1-bdf7-72bb-b729-1135a2543d54/test/Default_product_image_of_a_bag_for_ecommerce_website_1%20%281%29-BHMR9OOrV50zy2Wg0XeiKWDIKdVTNB.jpg',
  ARRAY['https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/0196b1e1-bdf7-72bb-b729-1135a2543d54/test/Default_product_image_of_a_bag_for_ecommerce_website_1%20%281%29-BHMR9OOrV50zy2Wg0XeiKWDIKdVTNB.jpg']::TEXT[],
  true,
  true
),
-- 9. Catalog: Cloud Nine Heavyweight Hoodie
(
  'Cloud Nine Heavyweight Hoodie',
  'cloud-nine-heavyweight-hoodie',
  'Constructed from custom-developed 100% organic cotton loopback French terry, the Cloud Nine Hoodie balances weight, warmth, and effortless drape. Features double-layered hood without drawstrings for an uncompromisingly clean aesthetic.',
  '500 GSM loopback French terry knit with a structured relaxed silhouette.',
  135.00,
  160.00,
  'Clothing',
  'Milprime Essentials',
  'MIL-CLO-001',
  'https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/0196b1e1-bdf7-72bb-b729-1135a2543d54/test/Default_product_image_of_a_hoodie_for_ecommerce_website_1-R3UTsUqqrEpZSAKXsUYe9IRDvqqZfs.jpg',
  ARRAY['https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/0196b1e1-bdf7-72bb-b729-1135a2543d54/test/Default_product_image_of_a_hoodie_for_ecommerce_website_1-R3UTsUqqrEpZSAKXsUYe9IRDvqqZfs.jpg']::TEXT[],
  true,
  true
),
-- 10. Catalog: Zebra Blend Supima T-Shirt
(
  'Zebra Blend Supima T-Shirt',
  'zebra-blend-supima-t-shirt',
  'The quintessential minimalist t-shirt. Woven from extra-long staple Supima cotton fibers that yield incredible softness, natural luster, and extraordinary pill resistance through countless wash cycles.',
  'Silky long-staple Supima cotton tee with a tailored crew neckline.',
  68.00,
  80.00,
  'Clothing',
  'Milprime Essentials',
  'MIL-CLO-002',
  'https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/0196b1e1-bdf7-72bb-b729-1135a2543d54/test/Default_product_image_of_a_tshirt_for_ecommerce_website_minim_3%20%281%29-JHMZe8xJ28tll9bGQINl0AXFfYByFc.jpg',
  ARRAY['https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/0196b1e1-bdf7-72bb-b729-1135a2543d54/test/Default_product_image_of_a_tshirt_for_ecommerce_website_minim_3%20%281%29-JHMZe8xJ28tll9bGQINl0AXFfYByFc.jpg']::TEXT[],
  false,
  true
),
-- 11. Catalog: Aero Precision Chronometer
(
  'Aero Precision Chronometer',
  'aero-precision-chronometer',
  'Engineered for clarity and discipline, the Aero Chronometer marries a surgical-grade 316L titanium case with an anti-reflective double-domed sapphire crystal. Water-resistant to 10 ATM, with an interchangeable horween leather strap.',
  '38mm brushed titanium case with sapphire crystal and automatic Japanese movement.',
  440.00,
  520.00,
  'Watches',
  'Milprime Horology',
  'MIL-WAT-001',
  'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=80',
  ARRAY['https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=80']::TEXT[],
  true,
  true
),
-- 12. Catalog: Monolith Minimalist Watch
(
  'Monolith Minimalist Watch',
  'monolith-minimalist-watch',
  'Inspired by brutalist architecture, the Monolith timepiece presents an uncluttered matte dial framed by a slim 7mm bezel. Driven by an ultra-precise Swiss quartz caliber for timeless dependability.',
  'Matte black dial with clean indices and Italian quick-release mesh strap.',
  295.00,
  340.00,
  'Watches',
  'Milprime Horology',
  'MIL-WAT-002',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
  ARRAY['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80']::TEXT[],
  false,
  true
),
-- 13. Catalog: Aqua Stride Thermal Vessel
(
  'Aqua Stride Thermal Vessel',
  'aqua-stride-thermal-vessel',
  'Designed for seamless hydration on the move. Keeps cold beverages icy for 24 hours and steaming liquids hot for 12 hours. Ergonomic silhouette fits standard cup holders and backpacks.',
  'Vacuum-insulated dual-wall steel bottle with copper accent and condensation-free coating.',
  65.00,
  75.00,
  'Accessories',
  'Milprime Studio',
  'MIL-ACC-001',
  'https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/0196b1e1-bdf7-72bb-b729-1135a2543d54/test/Default_product_image_of_a_bottle_for_ecommerce_website_minim_2-GOjCmiuwEPPLwzFxtjnHCNSJ7Zy5Ut.jpg',
  ARRAY['https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/0196b1e1-bdf7-72bb-b729-1135a2543d54/test/Default_product_image_of_a_bottle_for_ecommerce_website_minim_2-GOjCmiuwEPPLwzFxtjnHCNSJ7Zy5Ut.jpg']::TEXT[],
  true,
  true
),
-- 14. Catalog: Horizon Gaze Polarized Sunglasses
(
  'Horizon Gaze Polarized Sunglasses',
  'horizon-gaze-polarized-sunglasses',
  'Clean browline curves and custom steel core wire temples define the Horizon Gaze. 100% UVA/UVB protection with anti-reflective rear coating reduces glare while maximizing ocular comfort.',
  'Handcrafted Mazzucchelli acetate frames fitted with Category 3 CR-39 lenses.',
  145.00,
  175.00,
  'Accessories',
  'Milprime Optics',
  'MIL-ACC-002',
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
  ARRAY['https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80']::TEXT[],
  false,
  true
),
-- 15. Catalog: Ceramic Horizon Pour-Over & Carafe
(
  'Ceramic Horizon Pour-Over & Carafe',
  'ceramic-horizon-carafe',
  'Start each morning with mindful ritual. Crafted from locally sourced stoneware clay with an unglazed exterior texture and a food-grade glossy interior that ensures clean flavor extraction.',
  'Hand-thrown matte stoneware brewing set with heat-retaining thermal glaze.',
  92.00,
  110.00,
  'Home',
  'Milprime Living',
  'MIL-HOM-001',
  'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80',
  ARRAY['https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80']::TEXT[],
  false,
  true
),
-- 16. Catalog: Santal & Hinoki Mineral Candle
(
  'Santal & Hinoki Mineral Candle',
  'santal-hinoki-candle',
  'Top notes of Japanese cypress and Cardamom grounding into rich sandalwood and amber. Hand-poured in small batches with an approximate 65-hour clean burn duration.',
  'Soy and coconut wax blend poured into a reusable frosted glass vessel with crackling wooden wick.',
  48.00,
  55.00,
  'Home',
  'Milprime Living',
  'MIL-HOM-002',
  'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80',
  ARRAY['https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80']::TEXT[],
  false,
  true
),
-- 17. Catalog: The Monograph: Form & Space
(
  'The Monograph: Form & Space',
  'the-monograph-form-and-space',
  'Curated collection of 240 photographic essays highlighting sculptural architecture, tactile materiality, and quiet interior spaces around the world.',
  'Hardcover linen coffee table edition examining minimalist modern structures.',
  55.00,
  65.00,
  'Accessories',
  'Milprime Editions',
  'MIL-ACC-003',
  'https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/0196b1e1-bdf7-72bb-b729-1135a2543d54/test/Leonardo_Phoenix_product_image_of_a_book_cover_for_an_PDF_for_1-4XHf0tvsC3ySb4h5UYQRRM5gAOFVN0.jpg',
  ARRAY['https://fpvnqhp6jqce9ax6.public.blob.vercel-storage.com/images/0196b1e1-bdf7-72bb-b729-1135a2543d54/test/Leonardo_Phoenix_product_image_of_a_book_cover_for_an_PDF_for_1-4XHf0tvsC3ySb4h5UYQRRM5gAOFVN0.jpg']::TEXT[],
  true,
  true
)
ON CONFLICT (slug) DO NOTHING;
