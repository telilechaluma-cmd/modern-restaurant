export type SpiceLevel = 'Non-Spicy' | 'Mild' | 'Medium' | 'Hot Berbere';

export type DietaryTag = 'Vegetarian' | 'Vegan / Fasting (Tsom)' | 'Gluten-Free Teff' | 'Halal' | 'Chef Special' | 'Popular';

export interface PortionOption {
  name: string; // e.g. "Regular", "Large", "Family Feast"
  priceMultiplier?: number;
  priceDelta?: number; // extra ETB
}

export interface FoodItem {
  id: string;
  name: string;
  amharicName?: string;
  oromoName?: string;
  description: string;
  price: number; // in ETB
  category: string;
  imageUrl: string;
  isAvailable: boolean;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  preparationTime?: string; // e.g., "20-25 mins"
  calories?: number;
  dietaryTags: DietaryTag[];
  spiceLevel?: SpiceLevel;
  portions?: PortionOption[];
  ingredients?: string[];
  rating?: number;
  reviewCount?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  amharicName?: string;
  oromoName?: string;
  description: string;
  icon?: string;
  imageUrl?: string;
}

export interface TableReservation {
  id: string;
  fullName: string;
  phoneNumber: string;
  date: string;
  time: string;
  guests: string;
  specialNotes?: string;
  status: 'Pending' | 'Confirmed' | 'Seated' | 'Cancelled';
  createdAt: string;
}

export interface CartItemOption {
  portion?: string;
  extraPrice?: number;
  spiceLevel?: SpiceLevel;
  specialInstructions?: string;
}

export interface CartItem {
  id: string; // unique cart entry id
  foodItem: FoodItem;
  quantity: number;
  selectedPortion: string;
  selectedSpiceLevel: SpiceLevel;
  unitPrice: number; // base price + portion extra
  specialInstructions?: string;
}

export type OrderType = 'Delivery' | 'Pickup';

export type PaymentMethod = 'Cash on Delivery' | 'Telebirr' | 'CBE Birr' | 'Card';

export type PaymentStatus = 'Pending' | 'Paid' | 'Failed';

export type OrderStatus = 
  | 'Pending' 
  | 'Confirmed' 
  | 'Preparing' 
  | 'Ready' 
  | 'Out for Delivery' 
  | 'Delivered' 
  | 'Cancelled';

export interface CustomerInfo {
  fullName: string;
  phoneNumber: string;
  email?: string;
  subCity: string; // Addis sub-cities (Bole, Kazanchis, Piassa, etc.)
  deliveryAddress: string;
  landmark?: string;
  orderNotes?: string;
}

export interface Order {
  id: string; // e.g. TIO-84920
  orderNumber: string;
  createdAt: string;
  orderType: OrderType;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  tax: number;
  total: number;
  customer: CustomerInfo;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentReference?: string; // Telebirr / CBE reference code
  orderStatus: OrderStatus;
  estimatedDeliveryTime?: string; // e.g. "35 - 45 min"
  driverInfo?: {
    name: string;
    phone: string;
    vehicle: string;
  };
  userId?: string;
}

export interface RestaurantSettings {
  name: string;
  tagline: string;
  phone1: string;
  phone2: string;
  whatsappNumber: string;
  email: string;
  address: string;
  subCity: string;
  city: string;
  country: string;
  currency: string;
  openingHoursWeekday: string;
  openingHoursWeekend: string;
  isAcceptingOrders: boolean;
  baseDeliveryFee: number;
  freeDeliveryThreshold: number;
  estimatedDeliveryMinutes: number;
  telebirrMerchantId: string;
  telebirrAccountName: string;
  cbeAccountNumber: string;
  cbeAccountName: string;
  announcement?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: 'customer' | 'admin';
  savedAddresses?: Array<{
    title: string;
    subCity: string;
    address: string;
    landmark?: string;
  }>;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  dishName?: string;
  location?: string;
  verifiedOrder?: boolean;
}
