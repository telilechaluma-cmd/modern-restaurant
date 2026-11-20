-- ==============================================================================
-- TALILE Restaurant & Online Food Ordering Database Schema (Supabase)
-- Target: PostgreSQL with Supabase RLS
-- ==============================================================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  phone_number TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'staff')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  amharic_name TEXT,
  description TEXT,
  image_url TEXT,
  icon TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are readable by all" 
ON public.categories FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories" 
ON public.categories FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- 3. Menu Items Table
CREATE TABLE IF NOT EXISTS public.menu_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  amharic_name TEXT,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  is_popular BOOLEAN DEFAULT false,
  is_chef_special BOOLEAN DEFAULT false,
  preparation_time TEXT,
  calories INT,
  dietary_tags TEXT[] DEFAULT '{}',
  spice_level TEXT DEFAULT 'Medium',
  portions JSONB DEFAULT '[]',
  ingredients TEXT[] DEFAULT '{}',
  rating NUMERIC(2, 1) DEFAULT 5.0,
  review_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Menu items are readable by all" 
ON public.menu_items FOR SELECT USING (true);

CREATE POLICY "Admins can manage menu items" 
ON public.menu_items FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  order_type TEXT NOT NULL CHECK (order_type IN ('Delivery', 'Pickup')),
  items JSONB NOT NULL,
  subtotal NUMERIC(10, 2) NOT NULL,
  delivery_fee NUMERIC(10, 2) DEFAULT 0,
  discount NUMERIC(10, 2) DEFAULT 0,
  tax NUMERIC(10, 2) DEFAULT 0,
  total NUMERIC(10, 2) NOT NULL,
  customer_full_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  sub_city TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  landmark TEXT,
  order_notes TEXT,
  payment_method TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'Pending',
  payment_reference TEXT,
  order_status TEXT NOT NULL DEFAULT 'Pending',
  estimated_delivery_time TEXT,
  driver_info JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders" 
ON public.orders FOR SELECT USING (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

CREATE POLICY "Anyone can create orders" 
ON public.orders FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update orders" 
ON public.orders FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- 5. Restaurant Settings Table
CREATE TABLE IF NOT EXISTS public.restaurant_settings (
  id INT PRIMARY KEY DEFAULT 1,
  name TEXT NOT NULL,
  tagline TEXT,
  phone1 TEXT,
  phone2 TEXT,
  whatsapp_number TEXT,
  email TEXT,
  address TEXT,
  sub_city TEXT,
  city TEXT,
  country TEXT,
  currency TEXT DEFAULT 'ETB',
  opening_hours_weekday TEXT,
  opening_hours_weekend TEXT,
  is_accepting_orders BOOLEAN DEFAULT true,
  base_delivery_fee NUMERIC(10, 2) DEFAULT 120,
  free_delivery_threshold NUMERIC(10, 2) DEFAULT 2000,
  estimated_delivery_minutes INT DEFAULT 35,
  telebirr_merchant_id TEXT,
  telebirr_account_name TEXT,
  cbe_account_number TEXT,
  cbe_account_name TEXT,
  announcement TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.restaurant_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Settings are viewable by everyone" 
ON public.restaurant_settings FOR SELECT USING (true);

CREATE POLICY "Only admins can update settings" 
ON public.restaurant_settings FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);
