# Milprime Quality Assurance (QA) & Test Plan

This QA Plan outlines the validation checklist, testing scenarios, user flows, and edge cases for the **Milprime** ecommerce storefront.

---

## 1. System Architecture & Standards Checklist

- [ ] **Zero TypeScript / TSX**: All files use `.jsx` and `.js`.
- [ ] **No "Demo/Mock/Fake/Sample/Prototype" Badges**: Storefront looks 100% production-grade.
- [ ] **Design Language Fidelity**: Matches `demo.yournextstore.com` styling (typography, spacing, borders `#e4e4e7`, cards `#f4f4f5`, pill buttons).
- [ ] **Currency Uniformity**: All prices displayed in USD (`$XX.XX`).
- [ ] **Console Cleanliness**: Zero uncaught runtime errors or React key warnings.

---

## 2. Component & Layout Testing

### Navigation Header
- [ ] Sticky positioning with backdrop blur (`backdrop-blur-md`).
- [ ] Milprime brand mark links to `/`.
- [ ] Main navigation links: Home, Shop, About, Contact.
- [ ] Search input trigger opens instant search popover/overlay.
- [ ] Account button reflects logged-in state (User name / Avatar or Login link).
- [ ] Shopping bag icon displays real-time item count badge. Clicking opens the Cart Drawer.
- [ ] Mobile responsive hamburger menu opens clean slide-in drawer on mobile/tablet.

### Footer
- [ ] Brand description and social links.
- [ ] Multi-column links (Shop, Support, Legal).
- [ ] Payment badges: Visa, Mastercard, Apple Pay, Google Pay, Klarna, BLIK.
- [ ] Copyright notice (Dynamic current year).

---

## 3. Product Catalog & Interaction Testing

### Product Card
- [ ] Neutral background (`#f4f4f5`) with aspect-square container.
- [ ] High-resolution product imagery with smooth hover zoom.
- [ ] Category label, product name, and formatted price.
- [ ] Strikethrough compare-at price or browser-generated discount pill badge when applicable.
- [ ] Direct link to `/product/:slug` and quick Add to Cart interaction.

### Shop Page (`/shop` and `/shop/:category`)
- [ ] Displays all active products on initial load without requiring a prior search.
- [ ] Left filter sidebar:
  - [ ] Filter by Category (Watches, Bags, Apparel, Home, Accessories).
  - [ ] Filter by Price Range slider or tiers.
  - [ ] Toggle In-Stock only.
- [ ] Sorting functionality:
  - [ ] Featured (default)
  - [ ] Price: Low to High
  - [ ] Price: High to Low
  - [ ] Newest
  - [ ] Name: A-Z
- [ ] Instant search filtering by name, brand, category, or description.
- [ ] Empty state when no products match filters, with a "Reset Filters" action.

### Product Detail Page (`/product/:slug`)
- [ ] Dynamic routing by slug.
- [ ] Breadcrumbs: `Home > Category > Product Name`.
- [ ] Image gallery with primary image and selectable thumbnails.
- [ ] Title, SKU, Category, and Pricing with Discount display.
- [ ] Quantity selector with `+` and `-` controls (bounds: min 1, max stock).
- [ ] Add to Cart button updates Zustand store and triggers Cart Drawer open or toast.
- [ ] Trust badges: Free shipping, 30-day returns, authentic guarantee.
- [ ] Customer reviews section with ratings, list of reviews, and "Write a Review" form.
- [ ] "You might also like" recommended products grid.

---

## 4. State Management & Persistent Features

### Discount System
- [ ] Random discount ($1–$20) generated once per product per browser.
- [ ] Stored in `localStorage` under `milprime_discounts`.
- [ ] **Crucial Test**: Page refresh does **NOT** regenerate or alter the discount amount.
- [ ] Discounted price is strictly positive and never exceeds original price.

### Cart & Cart Drawer
- [ ] Persistent in `localStorage` under `milprime_cart`.
- [ ] Adding same product increments quantity.
- [ ] Cart Drawer opens on add or clicking bag icon.
- [ ] Quantity adjustments (`+` / `-`) update subtotal and bag count instantaneously.
- [ ] Remove item button with smooth fade/removal.
- [ ] Promo code input with valid/invalid coupon simulation (e.g., `MILPRIME10`).
- [ ] Empty cart state with "Shop Now" call to action.

---

## 5. Checkout & Order Flow Testing

### Checkout Page (`/checkout`)
- [ ] Stripe-style 2-column layout.
- [ ] Left column:
  - [ ] Express Link button.
  - [ ] Contact email.
  - [ ] Shipping address fields with validation.
  - [ ] Credit card inputs: Card number formatting, Expiry date (`MM/YY`), CVV (`3-4` digits), Cardholder name.
  - [ ] Card brand icon updates dynamically (Visa/Mastercard).
- [ ] Right column:
  - [ ] Item list with thumbnails, titles, quantities, prices.
  - [ ] Subtotal, shipping ($0 free shipping or standard), estimated tax, and Total.
- [ ] Validation prevents submission on invalid fields with inline hints.
- [ ] "Pay now" button initiates animated processing state (1.5s delay).

### Payment Success Page (`/payment-success`)
- [ ] Clean receipt card showing generated order number (`#MIL-XXXXX`).
- [ ] Itemized order summary, shipping details, and delivery date estimate.
- [ ] Automatically clears the cart in Zustand and `localStorage`.
- [ ] "Continue Shopping" button safely redirects back to `/shop` or `/`.

---

## 6. Authentication Testing (Client-Side)

- [ ] `/login` and `/register` pages with form validation.
- [ ] User session stored in `localStorage` (`milprime_auth`).
- [ ] Navbar updates to show user avatar/name with dropdown menu (My Profile, Admin, Logout).
- [ ] Logout action clears session and updates UI immediately.

---

## 7. Admin Dashboard & Supabase Integration

### Admin Page (`/admin`)
- [ ] Styled in Milprime design language (clean cards, typography, action buttons).
- [ ] Product table with image thumbnail, title, category, price, SKU, featured badge, active badge.
- [ ] Search and filter products within admin table.
- [ ] "Add Product" opens modal with all fields:
  - [ ] Name, Slug, Description, Short Description.
  - [ ] Price, Compare at Price, Category, Brand, SKU.
  - [ ] Featured (checkbox), Active (checkbox).
  - [ ] Image file upload to Supabase Storage `product-images` or image URL.
- [ ] "Edit Product" populates existing data and saves changes.
- [ ] "Delete Product" displays confirmation dialog before removal.
- [ ] Real-time feedback via toast notifications.

### Supabase Resilience
- [ ] When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are not provided, gracefully falls back to local seed products.
- [ ] When credentials are provided, connects to Supabase database without crashes.

---

## 8. Cross-Device & Responsive Testing

- [ ] Mobile (375px – 480px): Mobile nav sheet, 1-column product cards, stacked checkout.
- [ ] Tablet (768px – 1024px): 2-column product grid, responsive drawer.
- [ ] Desktop (1280px+): 3-column or 4-column product grid, sticky checkout summary.
