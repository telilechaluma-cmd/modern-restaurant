import React, { createContext, useContext, useState, useEffect } from 'react';
import { FoodItem, Category, Order, RestaurantSettings, Review, TableReservation } from '../types';
import { storage } from '../services/storage';

interface RestaurantContextType {
  menuItems: FoodItem[];
  categories: Category[];
  settings: RestaurantSettings;
  reviews: Review[];
  orders: Order[];
  reservations: TableReservation[];
  favorites: string[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
  // Item actions
  saveMenuItem: (item: FoodItem) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
  toggleItemAvailability: (id: string) => Promise<void>;
  // Category actions
  saveCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  // Order actions
  placeOrder: (order: Order) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => Promise<void>;
  getOrderById: (orderId: string) => Order | undefined;
  // Reservation actions
  bookTable: (reservation: TableReservation) => Promise<TableReservation>;
  updateReservationStatus: (id: string, status: TableReservation['status']) => Promise<void>;
  // Reviews actions
  addCustomerReview: (review: Review) => Promise<void>;
  // Favorite actions
  toggleFavorite: (dishId: string) => void;
  isFavorite: (dishId: string) => boolean;
  // Settings actions
  updateSettings: (newSettings: RestaurantSettings) => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<FoodItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [settings, setSettings] = useState<RestaurantSettings>({} as RestaurantSettings);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<TableReservation[]>([]);
  const [favorites, setFavorites] = useState<string[]>(() => storage.getFavorites());
  const [isLoading, setIsLoading] = useState(true);

  const loadAll = async () => {
    try {
      setIsLoading(true);
      const [itemsData, catsData, settData, revsData, ordersData, resData] = await Promise.all([
        storage.getMenuItems(),
        storage.getCategories(),
        storage.getSettings(),
        storage.getReviews(),
        storage.getOrders(),
        storage.getReservations()
      ]);
      setMenuItems(itemsData);
      setCategories(catsData);
      setSettings(settData);
      setReviews(revsData);
      setOrders(ordersData);
      setReservations(resData);
    } catch (err) {
      console.error('Error loading restaurant data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const saveMenuItem = async (item: FoodItem) => {
    await storage.saveMenuItem(item);
    const updated = await storage.getMenuItems();
    setMenuItems(updated);
  };

  const deleteMenuItem = async (id: string) => {
    await storage.deleteMenuItem(id);
    const updated = await storage.getMenuItems();
    setMenuItems(updated);
  };

  const toggleItemAvailability = async (id: string) => {
    const item = menuItems.find(i => i.id === id);
    if (!item) return;
    const updatedItem = { ...item, isAvailable: !item.isAvailable };
    await saveMenuItem(updatedItem);
  };

  const saveCategory = async (category: Category) => {
    await storage.saveCategory(category);
    const updated = await storage.getCategories();
    setCategories(updated);
  };

  const deleteCategory = async (id: string) => {
    await storage.deleteCategory(id);
    const updated = await storage.getCategories();
    setCategories(updated);
  };

  const placeOrder = async (order: Order): Promise<Order> => {
    const saved = await storage.createOrder(order);
    const updated = await storage.getOrders();
    setOrders(updated);
    return saved;
  };

  const updateOrderStatus = async (orderId: string, status: Order['orderStatus']) => {
    await storage.updateOrderStatus(orderId, status);
    const updated = await storage.getOrders();
    setOrders(updated);
  };

  const getOrderById = (orderId: string) => {
    const cleanId = orderId.trim().toUpperCase();
    return orders.find(o => o.id.toUpperCase() === cleanId || o.orderNumber.toUpperCase() === cleanId);
  };

  const bookTable = async (reservation: TableReservation): Promise<TableReservation> => {
    const saved = await storage.createReservation(reservation);
    const updated = await storage.getReservations();
    setReservations(updated);
    return saved;
  };

  const updateReservationStatus = async (id: string, status: TableReservation['status']) => {
    await storage.updateReservationStatus(id, status);
    const updated = await storage.getReservations();
    setReservations(updated);
  };

  const addCustomerReview = async (review: Review) => {
    await storage.addReview(review);
    const updated = await storage.getReviews();
    setReviews(updated);
  };

  const toggleFavorite = (dishId: string) => {
    const updated = storage.toggleFavorite(dishId);
    setFavorites(updated);
  };

  const isFavorite = (dishId: string) => {
    return favorites.includes(dishId);
  };

  const updateSettings = async (newSettings: RestaurantSettings) => {
    await storage.saveSettings(newSettings);
    setSettings(newSettings);
  };

  const resetToDefaults = async () => {
    storage.resetAllData();
    await loadAll();
  };

  return (
    <RestaurantContext.Provider
      value={{
        menuItems,
        categories,
        settings,
        reviews,
        orders,
        reservations,
        favorites,
        isLoading,
        refreshData: loadAll,
        saveMenuItem,
        deleteMenuItem,
        toggleItemAvailability,
        saveCategory,
        deleteCategory,
        placeOrder,
        updateOrderStatus,
        getOrderById,
        bookTable,
        updateReservationStatus,
        addCustomerReview,
        toggleFavorite,
        isFavorite,
        updateSettings,
        resetToDefaults
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
