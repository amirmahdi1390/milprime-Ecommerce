import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, ShieldCheck, LogOut, ChevronDown } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { CATEGORIES } from '../../data/categories';

export function Navbar() {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const totalCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { openCart, openSearch, isMobileMenuOpen, openMobileMenu, closeMobileMenu } = useUIStore();
  
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e4e4e7] bg-white/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Mobile menu trigger & Brand */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openMobileMenu}
              aria-label="Open navigation menu"
              className="p-2 -ml-2 rounded-full text-[#71717a] hover:text-[#09090b] hover:bg-[#f4f4f5] lg:hidden transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link
              to="/"
              className="text-xl font-bold tracking-tight text-[#09090b] hover:opacity-90 transition-opacity"
            >
              Milprime
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavLink
              to="/shop"
              end
              className={({ isActive }) =>
                `text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive ? 'text-[#09090b] font-semibold' : 'text-[#71717a] hover:text-[#09090b]'
                }`
              }
            >
              All products
            </NavLink>
            {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
              <NavLink
                key={cat.id}
                to={`/shop/${cat.slug}`}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive ? 'text-[#09090b] font-semibold' : 'text-[#71717a] hover:text-[#09090b]'
                  }`
                }
              >
                {cat.name}
              </NavLink>
            ))}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive ? 'text-[#09090b] font-semibold' : 'text-[#71717a] hover:text-[#09090b]'
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive ? 'text-[#09090b] font-semibold' : 'text-[#71717a] hover:text-[#09090b]'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Right Action Icons: Search, Account, Bag */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={openSearch}
              aria-label="Search catalog"
              className="flex items-center gap-2.5 h-10 px-3 sm:px-4 rounded-full border border-[#e4e4e7] bg-[#fafafa] text-sm text-[#71717a] hover:bg-[#f4f4f5] hover:text-[#09090b] transition-all cursor-pointer"
            >
              <Search className="h-4 w-4 stroke-[1.75]" />
              <span className="hidden xl:inline text-xs font-normal">Search products</span>
            </button>

            {/* Account Menu */}
            <div className="relative">
              {isAuthenticated ? (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-label="User account"
                  className="flex items-center gap-1.5 p-1.5 sm:px-2.5 rounded-full hover:bg-[#f4f4f5] transition-colors border border-transparent hover:border-[#e4e4e7]"
                >
                  <img
                    src={user?.avatarUrl}
                    alt={user?.name}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <span className="hidden md:inline text-xs font-medium text-[#09090b] max-w-[100px] truncate">
                    {user?.name}
                  </span>
                  <ChevronDown className="h-3 w-3 text-[#71717a]" />
                </button>
              ) : (
                <Link
                  to="/login"
                  aria-label="Log in to account"
                  className="p-2 rounded-full text-[#71717a] hover:text-[#09090b] hover:bg-[#f4f4f5] transition-colors inline-flex"
                >
                  <User className="h-5 w-5 stroke-[1.75]" />
                </Link>
              )}

              {/* User Dropdown */}
              {isUserMenuOpen && isAuthenticated && (
                <div
                  className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-[#e4e4e7] shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-3.5 py-2 border-b border-[#e4e4e7] text-left">
                    <p className="text-xs font-semibold text-[#09090b] truncate">{user?.name}</p>
                    <p className="text-[11px] text-[#71717a] truncate">{user?.email}</p>
                  </div>
                  <Link
                    to="/admin"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#09090b] hover:bg-[#f4f4f5] transition-colors"
                  >
                    <ShieldCheck className="h-4 w-4 text-[#71717a]" />
                    Admin Catalog
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>

            {/* Shopping Bag Button */}
            <button
              onClick={openCart}
              aria-label={`Shopping bag with ${totalCount} items`}
              className="relative p-2 rounded-full text-[#09090b] hover:bg-[#f4f4f5] transition-colors cursor-pointer"
            >
              <ShoppingBag className="h-5 w-5 stroke-[1.75]" />
              {totalCount > 0 && (
                <span className="absolute 1 top-0.5 right-0.5 h-4 min-w-4 px-1 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center leading-none animate-in zoom-in duration-150">
                  {totalCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={closeMobileMenu}
          />
          <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-white border-r border-[#e4e4e7] p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#e4e4e7]">
                <span className="text-xl font-bold tracking-tight">Milprime</span>
                <button
                  onClick={closeMobileMenu}
                  className="p-1 rounded-full text-[#71717a] hover:bg-[#f4f4f5]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-4 text-left">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className="text-base font-medium text-[#09090b] hover:text-black py-1"
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  onClick={closeMobileMenu}
                  className="text-base font-medium text-[#09090b] hover:text-black py-1"
                >
                  All Products
                </Link>
                {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/shop/${cat.slug}`}
                    onClick={closeMobileMenu}
                    className="text-base text-[#71717a] hover:text-[#09090b] py-1"
                  >
                    {cat.name}
                  </Link>
                ))}
                <div className="my-2 border-t border-[#e4e4e7]" />
                <Link
                  to="/about"
                  onClick={closeMobileMenu}
                  className="text-base text-[#71717a] hover:text-[#09090b] py-1"
                >
                  About Milprime
                </Link>
                <Link
                  to="/contact"
                  onClick={closeMobileMenu}
                  className="text-base text-[#71717a] hover:text-[#09090b] py-1"
                >
                  Contact Concierge
                </Link>
                <Link
                  to="/admin"
                  onClick={closeMobileMenu}
                  className="text-base text-[#71717a] hover:text-[#09090b] py-1"
                >
                  Admin Catalog
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-[#e4e4e7]">
              {isAuthenticated ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={user?.avatarUrl} className="h-7 w-7 rounded-full object-cover" />
                    <span className="text-sm font-medium">{user?.name}</span>
                  </div>
                  <button onClick={handleLogout} className="text-xs text-red-600 font-medium">
                    Sign out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block w-full py-2.5 text-center text-sm font-medium bg-black text-white rounded-full"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
