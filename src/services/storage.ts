import { FoodItem, Category, Order, RestaurantSettings, Review, TableReservation } from '../types';
import { 
  INITIAL_CATEGORIES, 
  INITIAL_FOOD_ITEMS, 
  INITIAL_SETTINGS, 
  INITIAL_REVIEWS, 
  INITIAL_ORDERS,
  INITIAL_RESERVATIONS 
} from '../data/initialData';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEYS = {
  MENU_ITEMS: 'talile_menu_items_v2',
  CATEGORIES: 'talile_categories_v2',
  ORDERS: 'talile_orders_v1',
  SETTINGS: 'talile_settings_v1',
  REVIEWS: 'talile_reviews_v1',
  RESERVATIONS: 'talile_reservations_v1',
  FAVORITES: 'talile_favorites_v1'
};

// Clean up any legacy tiocco or outdated storage keys if present
if (typeof window !== 'undefined') {
  try {
    [
      'tiocco_menu_items_v1', 'tiocco_categories_v1', 'tiocco_orders_v1', 
      'tiocco_settings_v1', 'tiocco_reviews_v1', 'tiocco_reservations_v1', 
      'tiocco_favorites_v1', 'tiocco_user_v1', 'tiocco_registered_users_v1', 
      'tiocco_cart_v1', 'tiocco_order_type_v1', 'tiocco_subcity_v1', 'tiocco_language_v1',
      'talile_menu_items_v1', 'talile_categories_v1'
    ].forEach(k => localStorage.removeItem(k));
  } catch (e) {}
}

class StorageService {
  // --- MENU ITEMS ---
  async getMenuItems(): Promise<FoodItem[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('menu_items').select('*');
        if (!error && data && data.length > 0) {
          return data.map((item: any) => ({
            id: item.id,
            name: item.name,
            amharicName: item.amharic_name,
            description: item.description,
            price: Number(item.price),
            category: item.category_id,
            imageUrl: item.image_url,
            isAvailable: item.is_available,
            isPopular: item.is_popular,
            isChefSpecial: item.is_chef_special,
            preparationTime: item.preparation_time,
            calories: item.calories,
            dietaryTags: item.dietary_tags || [],
            spiceLevel: item.spice_level,
            portions: item.portions || [],
            ingredients: item.ingredients || [],
            rating: item.rating,
            reviewCount: item.review_count
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local storage', err);
      }
    }

    const localData = localStorage.getItem(STORAGE_KEYS.MENU_ITEMS);
    if (localData) {
      try {
        const parsed: FoodItem[] = JSON.parse(localData);
        // Automatic dish image correction to ensure authentic presentation
        let changed = false;
        const normalized = parsed.map(item => {
          const initMatch = INITIAL_FOOD_ITEMS.find(i => i.id === item.id);
          if (initMatch && initMatch.imageUrl.startsWith('/images/dishes/')) {
            if (item.imageUrl !== initMatch.imageUrl) {
              changed = true;
              return { ...item, imageUrl: initMatch.imageUrl };
            }
          }
          return item;
        });
        if (changed) {
          localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(normalized));
        }
        return normalized;
      } catch (e) {
        console.error('Error parsing local menu items', e);
      }
    }
    // Seed initial data
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(INITIAL_FOOD_ITEMS));
    return INITIAL_FOOD_ITEMS;
  }

  async saveMenuItem(item: FoodItem): Promise<FoodItem> {
    const items = await this.getMenuItems();
    const existingIndex = items.findIndex(i => i.id === item.id);
    let updatedItems: FoodItem[];

    if (existingIndex >= 0) {
      updatedItems = [...items];
      updatedItems[existingIndex] = item;
    } else {
      updatedItems = [item, ...items];
    }

    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(updatedItems));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('menu_items').upsert({
          id: item.id,
          name: item.name,
          amharic_name: item.amharicName,
          description: item.description,
          price: item.price,
          category_id: item.category,
          image_url: item.imageUrl,
          is_available: item.isAvailable,
          is_popular: item.isPopular,
          is_chef_special: item.isChefSpecial,
          preparation_time: item.preparationTime,
          calories: item.calories,
          dietary_tags: item.dietaryTags,
          spice_level: item.spiceLevel,
          portions: item.portions,
          ingredients: item.ingredients,
          rating: item.rating,
          review_count: item.reviewCount
        });
      } catch (err) {
        console.error('Supabase upsert menu item error:', err);
      }
    }

    return item;
  }

  async deleteMenuItem(id: string): Promise<boolean> {
    const items = await this.getMenuItems();
    const filtered = items.filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(filtered));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('menu_items').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete error:', err);
      }
    }
    return true;
  }

  // --- CATEGORIES ---
  async getCategories(): Promise<Category[]> {
    const localData = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (localData) {
      try {
        const parsed: Category[] = JSON.parse(localData);
        let changed = false;
        const normalized = parsed.map(cat => {
          const initMatch = INITIAL_CATEGORIES.find(c => c.id === cat.id);
          if (initMatch && initMatch.imageUrl !== cat.imageUrl) {
            changed = true;
            return { ...cat, imageUrl: initMatch.imageUrl };
          }
          return cat;
        });
        if (changed) {
          localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(normalized));
        }
        return normalized;
      } catch (e) {
        console.error('Error parsing categories', e);
      }
    }
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    return INITIAL_CATEGORIES;
  }

  async saveCategory(cat: Category): Promise<Category> {
    const cats = await this.getCategories();
    const idx = cats.findIndex(c => c.id === cat.id);
    let updated: Category[];
    if (idx >= 0) {
      updated = [...cats];
      updated[idx] = cat;
    } else {
      updated = [...cats, cat];
    }
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
    return cat;
  }

  async deleteCategory(id: string): Promise<boolean> {
    const cats = await this.getCategories();
    const updated = cats.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
    return true;
  }

  // --- ORDERS ---
  async getOrders(): Promise<Order[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data.map((o: any) => ({
            id: o.id,
            orderNumber: o.order_number,
            createdAt: o.created_at,
            orderType: o.order_type,
            items: o.items,
            subtotal: Number(o.subtotal),
            deliveryFee: Number(o.delivery_fee),
            discount: Number(o.discount),
            tax: Number(o.tax),
            total: Number(o.total),
            customer: {
              fullName: o.customer_full_name,
              phoneNumber: o.customer_phone,
              email: o.customer_email,
              subCity: o.sub_city,
              deliveryAddress: o.delivery_address,
              landmark: o.landmark,
              orderNotes: o.order_notes
            },
            paymentMethod: o.payment_method,
            paymentStatus: o.payment_status,
            paymentReference: o.payment_reference,
            orderStatus: o.order_status,
            estimatedDeliveryTime: o.estimated_delivery_time,
            driverInfo: o.driver_info,
            userId: o.user_id
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch orders failed, using local', err);
      }
    }

    const localData = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (localData) {
      try {
        return JSON.parse(localData);
      } catch (e) {
        console.error('Error parsing orders', e);
      }
    }
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
    return INITIAL_ORDERS;
  }

  async createOrder(order: Order): Promise<Order> {
    const orders = await this.getOrders();
    const updated = [order, ...orders];
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('orders').insert({
          id: order.id,
          order_number: order.orderNumber,
          user_id: order.userId || null,
          order_type: order.orderType,
          items: order.items,
          subtotal: order.subtotal,
          delivery_fee: order.deliveryFee,
          discount: order.discount,
          tax: order.tax,
          total: order.total,
          customer_full_name: order.customer.fullName,
          customer_phone: order.customer.phoneNumber,
          customer_email: order.customer.email,
          sub_city: order.customer.subCity,
          delivery_address: order.customer.deliveryAddress,
          landmark: order.customer.landmark,
          order_notes: order.customer.orderNotes,
          payment_method: order.paymentMethod,
          payment_status: order.paymentStatus,
          payment_reference: order.paymentReference,
          order_status: order.orderStatus,
          estimated_delivery_time: order.estimatedDeliveryTime,
          driver_info: order.driverInfo
        });
      } catch (err) {
        console.error('Supabase create order error:', err);
      }
    }

    // Also sync to PHP Backend API if available
    try {
      fetch('/backend/api/orders.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: order.id,
          orderNumber: order.orderNumber,
          customerInfo: order.customer,
          orderType: order.orderType,
          paymentMethod: order.paymentMethod,
          paymentStatus: order.paymentStatus,
          subtotal: order.subtotal,
          deliveryFee: order.deliveryFee,
          discount: order.discount,
          totalAmount: order.total,
          notes: order.customer.orderNotes,
          items: order.items
        })
      }).catch(() => {});
    } catch {}

    return order;
  }

  async updateOrderStatus(orderId: string, status: Order['orderStatus']): Promise<Order | null> {
    const orders = await this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return null;

    order.orderStatus = status;
    if (status === 'Out for Delivery' && !order.driverInfo) {
      order.driverInfo = {
        name: 'Abebe Kebede',
        phone: '+251 911 889 900',
        vehicle: 'Yamaha Express (Plate AA 3-99120)'
      };
      order.estimatedDeliveryTime = '20-25 mins';
    } else if (status === 'Delivered') {
      order.estimatedDeliveryTime = 'Delivered';
      if (order.paymentMethod === 'Cash on Delivery') {
        order.paymentStatus = 'Paid';
      }
    }

    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('orders').update({
          order_status: status,
          driver_info: order.driverInfo,
          estimated_delivery_time: order.estimatedDeliveryTime,
          payment_status: order.paymentStatus
        }).eq('id', orderId);
      } catch (err) {
        console.error('Supabase update status error:', err);
      }
    }

    return order;
  }

  // --- SETTINGS ---
  async getSettings(): Promise<RestaurantSettings> {
    const local = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
    return INITIAL_SETTINGS;
  }

  async saveSettings(settings: RestaurantSettings): Promise<RestaurantSettings> {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    return settings;
  }

  // --- REVIEWS ---
  async getReviews(): Promise<Review[]> {
    const local = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
    return INITIAL_REVIEWS;
  }

  async addReview(review: Review): Promise<Review> {
    const reviews = await this.getReviews();
    const updated = [review, ...reviews];
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(updated));
    return review;
  }

  // --- RESERVATIONS ---
  async getReservations(): Promise<TableReservation[]> {
    const local = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(INITIAL_RESERVATIONS));
    return INITIAL_RESERVATIONS;
  }

  async createReservation(res: TableReservation): Promise<TableReservation> {
    const list = await this.getReservations();
    const updated = [res, ...list];
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(updated));

    // Also sync to PHP Backend API
    try {
      fetch('/backend/api/reservations.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(res)
      }).catch(() => {});
    } catch {}

    return res;
  }

  async updateReservationStatus(id: string, status: TableReservation['status']): Promise<void> {
    const list = await this.getReservations();
    const found = list.find(r => r.id === id);
    if (found) {
      found.status = status;
      localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(list));
    }

    // Also sync status update to PHP Backend API
    try {
      fetch('/backend/api/reservations.php', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      }).catch(() => {});
    } catch {}
  }

  // --- FAVORITES ---
  getFavorites(): string[] {
    try {
      const local = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return local ? JSON.parse(local) : ['eth-01', 'eth-02', 'drk-01'];
    } catch {
      return ['eth-01', 'eth-02', 'drk-01'];
    }
  }

  toggleFavorite(dishId: string): string[] {
    const favs = this.getFavorites();
    const updated = favs.includes(dishId)
      ? favs.filter(id => id !== dishId)
      : [...favs, dishId];
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    return updated;
  }

  // Reset to clean sample data
  resetAllData() {
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(INITIAL_FOOD_ITEMS));
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(INITIAL_RESERVATIONS));
  }
}

export const storage = new StorageService();
