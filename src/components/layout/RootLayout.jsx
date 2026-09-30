import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { MobileNavDrawer } from './MobileNavDrawer';
import { SearchOverlay } from './SearchOverlay';
import { ToastContainer } from '../common/Toast';
import { LoadingScreen } from '../common/LoadingScreen';

export function RootLayout() {
  const { pathname } = useLocation();
  const [appLoading, setAppLoading] = useState(true);

  // Initial global website typewriter loading experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 950);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  if (appLoading) {
    return <LoadingScreen fullScreen={true} text="Milprime" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#09090b] antialiased">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <Footer />

      {/* Global Drawers, Modals & Toast notifications */}
      <MobileNavDrawer />
      <CartDrawer />
      <SearchOverlay />
      <ToastContainer />
    </div>
  );
}
