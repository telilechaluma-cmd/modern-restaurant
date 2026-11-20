import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WhatsAppFloat } from './components/common/WhatsAppFloat';
import { CartDrawer } from './components/cart/CartDrawer';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { FoodDetailPage } from './pages/FoodDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AboutPage } from './pages/AboutPage';
import { ReservationPage } from './pages/ReservationPage';
import { ContactPage } from './pages/ContactPage';
import { AuthPage } from './pages/AuthPage';
import { AdminPage } from './pages/AdminPage';
import { Order } from './types';

export const App: React.FC = () => {
  // Simple state router synced with browser history
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path.split('?')[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Extract query params if any
  const getQueryParam = (name: string): string | null => {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  };

  // Route matching
  const renderCurrentPage = () => {
    // 1. Home
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage 
          navigate={navigate} 
          onSelectCategory={(catId) => setSelectedCategoryFilter(catId)} 
        />
      );
    }

    // 2. Food Menu
    if (currentPath === '/menu') {
      return (
        <MenuPage 
          initialCategory={selectedCategoryFilter} 
          navigate={navigate} 
        />
      );
    }

    // 3. Food Details (/menu/:id)
    if (currentPath.startsWith('/menu/')) {
      const itemId = currentPath.replace('/menu/', '');
      return <FoodDetailPage itemId={itemId} navigate={navigate} />;
    }

    // 4. Shopping Cart
    if (currentPath === '/cart') {
      return <CartPage navigate={navigate} />;
    }

    // 5. Checkout
    if (currentPath === '/checkout') {
      return (
        <CheckoutPage 
          navigate={navigate} 
          onOrderCompleted={(ord) => setLastPlacedOrder(ord)} 
        />
      );
    }

    // 6. Order Confirmation (/order-confirmation/:id)
    if (currentPath.startsWith('/order-confirmation')) {
      const parts = currentPath.split('/');
      const orderId = parts[2] || lastPlacedOrder?.id || 'TAL-89421';
      return <OrderConfirmationPage orderId={orderId} navigate={navigate} />;
    }

    // 7. Order Tracking
    if (currentPath === '/track-order') {
      const orderIdFromQuery = getQueryParam('id') || lastPlacedOrder?.orderNumber;
      return <OrderTrackingPage initialOrderId={orderIdFromQuery} navigate={navigate} />;
    }

    // 8. Table Reservation
    if (currentPath === '/reservation' || currentPath === '/reserve') {
      return <ReservationPage navigate={navigate} />;
    }

    // 9. About Us
    if (currentPath === '/about' || currentPath === '/gallery') {
      return <AboutPage navigate={navigate} />;
    }

    // 10. Contact Us
    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    // 11. Login & Register
    if (currentPath === '/login' || currentPath === '/register' || currentPath === '/account') {
      return <AuthPage navigate={navigate} />;
    }

    // 12. Admin Dashboard
    if (currentPath === '/admin') {
      return <AdminPage navigate={navigate} />;
    }

    // Default Fallback
    return (
      <HomePage 
        navigate={navigate} 
        onSelectCategory={(catId) => setSelectedCategoryFilter(catId)} 
      />
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream-50 font-sans selection:bg-berbere-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar currentPath={currentPath} navigate={navigate} />

      {/* Main Content View */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer navigate={navigate} />

      {/* Sliding Quick Cart Drawer */}
      <CartDrawer navigate={navigate} />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloat />
    </div>
  );
};
