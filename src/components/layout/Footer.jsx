import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e4e4e7] bg-white text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Links Grid */}
        <div className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="text-xl font-bold tracking-tight text-[#09090b]">
              Milprime
            </Link>
            <p className="text-sm text-[#71717a] leading-relaxed max-w-sm">
              Online commerce should be fast, simple, and modern. Milprime curates essential everyday goods designed with architectural discipline and premium durability.
            </p>
            <div className="pt-2 flex items-center gap-3 text-[#71717a]">
              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow Milprime on X"
                className="p-2 rounded-full hover:bg-[#f4f4f5] hover:text-[#09090b] transition-colors"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow Milprime on Instagram"
                className="p-2 rounded-full hover:bg-[#f4f4f5] hover:text-[#09090b] transition-colors"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="View Milprime codebase"
                className="p-2 rounded-full hover:bg-[#f4f4f5] hover:text-[#09090b] transition-colors"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="text-sm font-semibold text-[#09090b]">Shop</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link to="/shop" className="text-sm text-[#71717a] hover:text-[#09090b] transition-colors">
                  All Products
                </Link>
              </li>
              {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/shop/${cat.slug}`}
                    className="text-sm text-[#71717a] hover:text-[#09090b] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-sm font-semibold text-[#09090b]">Support</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link to="/about" className="text-sm text-[#71717a] hover:text-[#09090b] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-[#71717a] hover:text-[#09090b] transition-colors">
                  Journal & Editorial
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-[#71717a] hover:text-[#09090b] transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-sm text-[#71717a] hover:text-[#09090b] transition-colors">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-[#71717a] hover:text-[#09090b] transition-colors">
                  Shopping Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-sm font-semibold text-[#09090b]">Legal</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <span className="text-sm text-[#71717a] hover:text-[#09090b] cursor-pointer transition-colors">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-sm text-[#71717a] hover:text-[#09090b] cursor-pointer transition-colors">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-sm text-[#71717a] hover:text-[#09090b] cursor-pointer transition-colors">
                  Return Policy
                </span>
              </li>
              <li>
                <span className="text-sm text-[#71717a] hover:text-[#09090b] cursor-pointer transition-colors">
                  Shipping Standards
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Icons */}
        <div className="border-t border-[#e4e4e7] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#71717a]">
            © {currentYear} Milprime. All rights reserved. Architectural minimalism for everyday utility.
          </p>

          {/* Payment Badges */}
          <div className="flex items-center gap-2">
            {/* Visa */}
            <span className="px-2 py-1 bg-[#f4f4f5] border border-[#e4e4e7] rounded text-[10px] font-bold tracking-widest text-[#18181b]">
              VISA
            </span>
            {/* Mastercard */}
            <span className="px-2 py-1 bg-[#f4f4f5] border border-[#e4e4e7] rounded text-[10px] font-bold text-[#18181b] flex items-center gap-0.5">
              <span className="h-2 w-2 rounded-full bg-red-500 inline-block -mr-1"></span>
              <span className="h-2 w-2 rounded-full bg-amber-400 inline-block"></span>
            </span>
            {/* Apple Pay */}
            <span className="px-2 py-1 bg-[#f4f4f5] border border-[#e4e4e7] rounded text-[10px] font-semibold text-[#18181b]">
              Pay
            </span>
            {/* Google Pay */}
            <span className="px-2 py-1 bg-[#f4f4f5] border border-[#e4e4e7] rounded text-[10px] font-semibold text-[#18181b]">
              G Pay
            </span>
            {/* Stripe */}
            <span className="px-2 py-1 bg-[#f4f4f5] border border-[#e4e4e7] rounded text-[10px] font-semibold text-[#18181b]">
              stripe
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}
