# Milprime

> **Architectural minimalism for modern everyday utility.**

Milprime is an autonomous, high-performance React ecommerce storefront engineered with architectural discipline and minimalist refinement. Inspired by quiet luxury, Scandinavian restraint, and monozukuri craftsmanship, Milprime delivers a curated experience across precision horology, full-grain Italian leather carryalls, utilitarian apparel, and design objects.

---

## Features

- **Architectural Design System**: Clean typography, curated monochrome palettes, crisp borders, and zero AI-slop or gratuitous gradients.
- **Responsive Split Hero**: Calibrated foreground/background layering that preserves visual impact on desktop, tablet, and mobile without text clipping or horizontal overflow.
- **Supabase Integration**: Unified database architecture for store products and Supabase Storage for high-resolution product media.
- **Dynamic Catalog Studio (Admin)**: Full administrative CRUD with automated URL-safe slug generation, category-based fallback imagery, drag-and-drop file uploads, and search filtering.
- **Authentication Guarding**: Protected bag and checkout actions ensuring unauthenticated patrons are guided to sign in while preserving their intended acquisitions.
- **Comprehensive Format Validation**: Client-side card format validation utilizing the Luhn algorithm, expiry month/year verification, and 3-4 digit CVV checks without storing sensitive information.
- **Editorial Journal**: Dedicated longform publishing engine (`/blog` and `/blog/:slug`) examining horology metallurgy and vegetable-tanned leathercraft.
- **Luxury Typewriter Loading Experience**: Subtle progressive reveal and cycle of the Milprime insignia during data loading.
- **Production-Grade SEO**: Dynamic OpenGraph tags, Twitter cards, JSON-LD structured schemas (`Product`, `Organization`, `Article`, `WebSite`), `robots.txt`, and XML sitemaps mapped to `milprime.shop`.

---

## Technology Stack

- **Core**: React 19, JavaScript (ES2024), Vite 6
- **Styling**: Tailwind CSS v4, Modern Flexbox & CSS Grid, Lucide React
- **State Management**: Zustand with persistent storage
- **Backend / Storage**: Supabase Database (PostgreSQL) & Supabase Storage
- **SEO & Metadata**: `react-helmet-async`, Schema.org JSON-LD
- **Animations**: Framer Motion & CSS micro-interactions

---

## Project Structure

```
milprime/
├── public/
│   ├── favicon.ico
│   ├── robots.txt              # Production crawler rules
│   └── sitemap.xml             # XML sitemap for milprime.shop
├── src/
│   ├── components/
│   │   ├── common/             # Button, Input, Modal, SEO, LoadingScreen
│   │   └── layout/             # Navbar, Footer, CartDrawer, SearchOverlay, RootLayout
│   ├── data/
│   │   ├── blogPosts.js        # High-quality editorial articles
│   │   ├── categories.js       # Curated store categories
│   │   └── seedProducts.js     # 17 unified store products (deduplicated)
│   ├── features/
│   │   ├── admin/              # ProductTable, ProductModal, ImageUploader
│   │   ├── checkout/           # CheckoutForm, OrderSummary, PaymentIcons
│   │   └── products/           # ProductCard, ProductGrid, ProductFilters, ProductGallery
│   ├── lib/
│   │   └── supabaseClient.js   # Supabase client instance & connection state
│   ├── pages/                  # Home, Shop, ProductDetail, Cart, Checkout, Blog, About, Contact, Admin
│   ├── routes/
│   │   └── AppRoutes.jsx       # Route declarations
│   ├── services/
│   │   ├── productService.js   # Supabase query & CRUD operations with local fallback
│   │   └── storageService.js   # Supabase image bucket uploader
│   ├── store/
│   │   ├── authStore.js        # Authentication & credentials handling
│   │   ├── cartStore.js        # Shopping bag state & persistence
│   │   └── uiStore.js          # Cart drawer, search modal, toast notifications
│   ├── utils/
│   │   ├── currency.js         # USD currency formatter
│   │   ├── discount.js         # Daily product discount calculation
│   │   ├── placeholderImages.js# Category-specific packshot placeholders
│   │   └── validation.js       # Luhn card, expiry, CVV, and format validation
│   ├── main.jsx
│   └── index.css
├── supabase_products_seed.sql  # 17 products seed migration with ON CONFLICT handling
├── supabase_schema.sql         # DDL table creation and storage bucket configuration
├── vite.config.js              # Chunk optimization & proxy setup
└── package.json
```

---

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/milprime/milprime.git
cd milprime
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Studio Administrator Credentials
VITE_ADMIN_EMAIL=your_admin_email
VITE_ADMIN_PASSWORD=your_admin_password
```

> **Note**: Never expose secrets or passwords in client components. The application reads administrative credentials securely via environment variables.

---

## Supabase Setup

### Database Setup

1. Open your **Supabase Dashboard** -> **SQL Editor**.
2. Run `supabase_schema.sql` to initialize the `products` table and Row Level Security policies.
3. Run `supabase_products_seed.sql` to populate the initial catalog with all 17 deduplicated products.

### Storage Setup

The schema script automatically creates a public storage bucket named `product-images`. Ensure public read access is enabled under **Storage** -> **Policies**.

---

## Development & Production Build

To start the local Vite development server:

```bash
npm run dev
```

To create an optimized production bundle:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Available Routes

| Route | Description |
|---|---|
| `/` | Homepage with responsive split hero, category highlights, and permanent collection |
| `/shop` | Complete catalog with category tabs, price filters, and sorting |
| `/shop/:category` | Category-specific storefront view (`watches`, `bags`, `clothing`, etc.) |
| `/product/:slug` | High-res gallery, editorial copy, specifications, and related items |
| `/cart` | Bag overview, quantity management, and shipping calculations |
| `/checkout` | Encrypted 256-bit acquisition checkout with Luhn card verification (Protected) |
| `/payment-success` | Order receipt confirmation and bag clearance |
| `/blog` | Journal and editorial essays on horology and leathercraft |
| `/blog/:slug` | Longform editorial view with author credentials and structured data |
| `/about` | Complete studio manifesto, philosophy, provenance, and principles |
| `/contact` | Concierge direct dispatch, studio hours, and wholesale contacts |
| `/login` | Patron sign-in with return URL and pending cart addition preservation |
| `/register` | New patron profile creation |
| `/admin` | Studio administration portal for live inventory management (Protected) |

---

## Admin Setup

Access the administration dashboard by navigating to `/admin` or selecting **Admin Catalog** from the patron dropdown menu. Authenticate using the credentials configured in `VITE_ADMIN_EMAIL` and `VITE_ADMIN_PASSWORD`.

From the admin studio, administrators can:
- Create new catalog items with auto-slug generation and category-specific packshot image fallbacks.
- Upload high-resolution imagery directly to Supabase Storage.
- Calibrate pricing, mark items as featured, or toggle store visibility.
- Search and delete items with confirmation dialogs.

---

## SEO Implementation

The application adheres to strict SEO standards under `https://milprime.shop`:
- Route-specific meta titles, canonical links, and descriptions via `react-helmet-async`.
- Rich Schema.org JSON-LD structured data for `Product`, `Organization`, `WebSite`, and `Article`.
- Pre-configured `public/robots.txt` and XML sitemap covering all canonical store and journal routes.
- Semantic HTML (`<main>`, `<article>`, `<header>`, `<footer>`, `<section>`) with strict single-`<h1>` heading hierarchy.

---

## License

Private and proprietary. Designed and maintained by the Milprime Design Studio.
