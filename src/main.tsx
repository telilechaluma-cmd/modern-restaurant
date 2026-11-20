import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { RestaurantProvider } from './context/RestaurantContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <RestaurantProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </RestaurantProvider>
    </LanguageProvider>
  </React.StrictMode>
);
