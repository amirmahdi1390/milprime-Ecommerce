import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { SearchOverlay } from './SearchOverlay';
import { ToastContainer } from '../common/Toast';

export function RootLayout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#09090b] antialiased">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <Footer />

      {/* Global Drawers, Modals & Toast notifications */}
      <CartDrawer />
      <SearchOverlay />
      <ToastContainer />
    </div>
  );
}
