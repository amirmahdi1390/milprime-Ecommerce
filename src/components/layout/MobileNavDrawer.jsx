import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { X, Search, ShieldCheck, LogOut, User, ArrowRight, Compass } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';

export function MobileNavDrawer() {
  const navigate = useNavigate();
  const { isMobileMenuOpen, closeMobileMenu, openSearch } = useUIStore();
  const { user, isAuthenticated, logout } = useAuthStore();

  // Close drawer on Escape key and lock body scroll while open
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  if (!isMobileMenuOpen) return null;

  const navLinks = [
    { label: 'Special Products', to: '/shop/watches' },
    { label: 'Shop All', to: '/shop' },
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contact', to: '/contact' },
  ];

  const categories = [
    { label: 'Leather Goods', to: '/shop/leather-goods' },
    { label: 'Watches', to: '/shop/watches' },
    { label: 'Apparel', to: '/shop/apparel' },
    { label: 'Footwear', to: '/shop/footwear' },
    { label: 'Eyewear', to: '/shop/eyewear' },
    { label: 'Accessories', to: '/shop/accessories' },
  ];

  const handleSearchClick = () => {
    closeMobileMenu();
    openSearch();
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  const drawerContent = (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Dark overlay backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Slide-out drawer panel */}
      <div className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white text-[#09090b] shadow-2xl flex flex-col h-full border-r border-[#e4e4e7] animate-in slide-in-from-left duration-300 z-[101]">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e4e4e7] bg-white">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="text-xl font-bold tracking-tight text-[#09090b]"
          >
            Milprime
          </Link>
          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Close navigation menu"
            className="p-2 -mr-2 rounded-full text-[#71717a] hover:text-[#09090b] hover:bg-[#f4f4f5] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          
          {/* Quick Search Button */}
          <button
            onClick={handleSearchClick}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa] hover:bg-[#f4f4f5] text-sm text-[#71717a] transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <Search className="h-4 w-4" />
              <span>Search products...</span>
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#a1a1aa]">Find</span>
          </button>

          {/* Primary Navigation Links */}
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#a1a1aa] mb-2">
              Navigation
            </p>
            {navLinks.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/' || item.to === '/shop'}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#09090b] text-white font-semibold'
                      : 'text-[#27272a] hover:bg-[#f4f4f5] hover:text-[#09090b]'
                  }`
                }
              >
                <span>{item.label}</span>
                <ArrowRight className="h-3.5 w-3.5 opacity-50" />
              </NavLink>
            ))}
          </div>

          {/* Catalog Categories */}
          <div className="space-y-2 pt-2 border-t border-[#f4f4f5]">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#a1a1aa] flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5" />
              Curated Categories
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {categories.map((cat) => (
                <Link
                  key={cat.label}
                  to={cat.to}
                  onClick={closeMobileMenu}
                  className="px-3 py-2 text-xs font-medium text-[#52525b] hover:text-[#09090b] bg-[#f4f4f5] hover:bg-[#e4e4e7] rounded-lg transition-colors truncate"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Admin Link if admin */}
          {user?.role === 'admin' && (
            <div className="pt-2 border-t border-[#f4f4f5]">
              <Link
                to="/admin"
                onClick={closeMobileMenu}
                className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Admin Catalog</span>
              </Link>
            </div>
          )}

        </div>

        {/* Drawer Footer: User Profile / Auth buttons */}
        <div className="p-6 border-t border-[#e4e4e7] bg-[#fafafa]">
          {isAuthenticated ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={user?.avatarUrl}
                  alt={user?.name || 'User'}
                  className="h-9 w-9 rounded-full object-cover border border-[#e4e4e7]"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#09090b] truncate">{user?.name}</p>
                  <p className="text-xs text-[#71717a] truncate">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="block w-full py-2.5 text-center text-sm font-medium bg-[#09090b] hover:bg-black text-white rounded-full transition-colors shadow-xs"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="block w-full py-2 text-center text-xs font-medium text-[#71717a] hover:text-[#09090b] transition-colors"
              >
                Don't have an account? Register
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(drawerContent, document.body)
    : drawerContent;
}
