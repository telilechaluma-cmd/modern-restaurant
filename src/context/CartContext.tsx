import React, { createContext, useContext, useState, useEffect } from 'react';
import { FoodItem, CartItem, OrderType, SpiceLevel } from '../types';
import { ADDIS_SUB_CITIES } from '../data/initialData';

interface CartContextType {
  cart: CartItem[];
  addToCart: (foodItem: FoodItem, quantity?: number, portion?: string, spiceLevel?: SpiceLevel, notes?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  selectedSubCity: string;
  setSelectedSubCity: (subCity: string) => void;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode: string;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  total: number;
  itemCount: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'talile_cart_v1';
const ORDER_TYPE_KEY = 'talile_order_type_v1';
const SUBCITY_KEY = 'talile_subcity_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orderType, setOrderType] = useState<OrderType>(() => {
    return (localStorage.getItem(ORDER_TYPE_KEY) as OrderType) || 'Delivery';
  });

  const [selectedSubCity, setSelectedSubCity] = useState<string>(() => {
    return localStorage.getItem(SUBCITY_KEY) || ADDIS_SUB_CITIES[0].name;
  });

  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [flatDiscount, setFlatDiscount] = useState<number>(0);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(ORDER_TYPE_KEY, orderType);
  }, [orderType]);

  useEffect(() => {
    localStorage.setItem(SUBCITY_KEY, selectedSubCity);
  }, [selectedSubCity]);

  const addToCart = (
    foodItem: FoodItem, 
    quantity: number = 1, 
    portion?: string, 
    spiceLevel?: SpiceLevel, 
    notes?: string
  ) => {
    const selectedPortionName = portion || (foodItem.portions && foodItem.portions.length > 0 ? foodItem.portions[0].name : 'Standard');
    const selectedSpice = spiceLevel || foodItem.spiceLevel || 'Medium';

    // Calculate unit price based on portion
    let extra = 0;
    if (foodItem.portions) {
      const foundPortion = foodItem.portions.find(p => p.name === selectedPortionName);
      if (foundPortion?.priceDelta) extra = foundPortion.priceDelta;
    }
    const unitPrice = foodItem.price + extra;

    // Unique key for the combo
    const cartItemId = `${foodItem.id}-${selectedPortionName}-${selectedSpice}-${(notes || '').trim()}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item => 
          item.id === cartItemId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          foodItem,
          quantity,
          selectedPortion: selectedPortionName,
          selectedSpiceLevel: selectedSpice,
          unitPrice,
          specialInstructions: notes
        };
        return [...prev, newItem];
      }
    });

    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === cartItemId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscountPercent(0);
    setFlatDiscount(0);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'TALILE10' || clean === 'TIOCCO10') {
      setCouponCode('TALILE10');
      setDiscountPercent(10);
      setFlatDiscount(0);
      return { success: true, message: '🎉 10% discount applied to your order!' };
    } else if (clean === 'ETHIOPIA' || clean === 'HABESHA') {
      setCouponCode(clean);
      setDiscountPercent(15);
      setFlatDiscount(0);
      return { success: true, message: '🇪🇹 15% special Ethiopian cuisine discount applied!' };
    } else if (clean === 'WELCOME50') {
      setCouponCode('WELCOME50');
      setFlatDiscount(50);
      setDiscountPercent(0);
      return { success: true, message: '✨ ETB 50 welcome discount applied!' };
    }
    return { success: false, message: 'Invalid coupon code. Try TALILE10 or WELCOME50.' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
    setFlatDiscount(0);
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  
  let deliveryFee = 0;
  if (orderType === 'Delivery' && subtotal > 0) {
    const subCityObj = ADDIS_SUB_CITIES.find(c => c.name === selectedSubCity);
    const baseFee = subCityObj ? subCityObj.deliveryFee : 120;
    // Free delivery over ETB 2000
    deliveryFee = subtotal >= 2000 ? 0 : baseFee;
  }

  let calculatedDiscount = 0;
  if (discountPercent > 0) {
    calculatedDiscount = Math.round((subtotal * discountPercent) / 100);
  } else if (flatDiscount > 0) {
    calculatedDiscount = Math.min(flatDiscount, subtotal);
  }

  const total = Math.max(0, subtotal + deliveryFee - calculatedDiscount);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        orderType,
        setOrderType,
        selectedSubCity,
        setSelectedSubCity,
        subtotal,
        deliveryFee,
        discount: calculatedDiscount,
        couponCode,
        applyCoupon,
        removeCoupon,
        total,
        itemCount,
        isCartDrawerOpen,
        setIsCartDrawerOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
