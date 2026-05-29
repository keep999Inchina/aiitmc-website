-- Migration: 001_initial_schema.sql
-- Run this in Supabase SQL Editor to set up the database schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- User profiles (extends Supabase auth.users)
-- ==========================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'registered' CHECK (role IN ('registered', 'vip', 'admin')),
  vip_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NULL)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- Articles
-- ==========================================
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  is_premium BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  read_time TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==========================================
-- Courses
-- ==========================================
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  cover_image TEXT,
  level TEXT,
  icon TEXT DEFAULT '🎓',
  color TEXT DEFAULT 'from-blue-500 to-blue-700',
  is_premium BOOLEAN NOT NULL DEFAULT false,
  price DECIMAL(10,2) DEFAULT 0,
  lessons INTEGER DEFAULT 0,
  duration TEXT,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'coming_soon')),
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==========================================
-- Course chapters
-- ==========================================
CREATE TABLE public.course_chapters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  video_url TEXT,
  content TEXT,
  is_free BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==========================================
-- Products (DIY kits)
-- ==========================================
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  price TEXT,
  price_note TEXT,
  image TEXT,
  icon TEXT DEFAULT '🛒',
  color TEXT DEFAULT 'from-blue-500 to-blue-700',
  tags TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  buy_url TEXT,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'inquiry')),
  category TEXT DEFAULT 'diy-kit',
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==========================================
-- Lab items (DT Station, SmartMFG Lab)
-- ==========================================
CREATE TABLE public.lab_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  subtitle TEXT,
  badge TEXT,
  badge_color TEXT,
  price TEXT,
  description TEXT,
  icon TEXT DEFAULT '🏆',
  color TEXT DEFAULT 'from-primary-600 to-primary-800',
  modules JSONB DEFAULT '[]',
  specs JSONB DEFAULT '[]',
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==========================================
-- VIP orders (payment records)
-- ==========================================
CREATE TABLE public.vip_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('wechat', 'alipay')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  transaction_id TEXT,
  vip_duration_days INTEGER NOT NULL DEFAULT 365,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  paid_at TIMESTAMPTZ
);

-- ==========================================
-- Indexes
-- ==========================================
CREATE INDEX idx_articles_slug ON public.articles(slug);
CREATE INDEX idx_articles_category ON public.articles(category);
CREATE INDEX idx_articles_published ON public.articles(published);
CREATE INDEX idx_articles_featured ON public.articles(featured) WHERE featured = true;
CREATE INDEX idx_courses_slug ON public.courses(slug);
CREATE INDEX idx_course_chapters_course_id ON public.course_chapters(course_id);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_vip_orders_user_id ON public.vip_orders(user_id);
CREATE INDEX idx_vip_orders_status ON public.vip_orders(payment_status);

-- ==========================================
-- Row Level Security (RLS)
-- ==========================================

-- Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Articles
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published free articles visible to all"
  ON public.articles FOR SELECT
  USING (
    published = true AND is_premium = false
  );

CREATE POLICY "Published premium articles visible to VIP/admin"
  ON public.articles FOR SELECT
  USING (
    published = true AND is_premium = true
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('vip', 'admin'))
  );

CREATE POLICY "Admins can do everything with articles"
  ON public.articles FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Courses
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published free courses visible to all"
  ON public.courses FOR SELECT
  USING (
    published = true AND is_premium = false
  );

CREATE POLICY "Published premium courses visible to VIP/admin"
  ON public.courses FOR SELECT
  USING (
    published = true AND is_premium = true
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('vip', 'admin'))
  );

CREATE POLICY "Admins can do everything with courses"
  ON public.courses FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Course chapters
ALTER TABLE public.course_chapters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Free chapters visible to all"
  ON public.course_chapters FOR SELECT
  USING (
    is_free = true
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('vip', 'admin'))
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can do everything with chapters"
  ON public.course_chapters FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Products (all visible to everyone, admin manages)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published products visible to all"
  ON public.products FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can do everything with products"
  ON public.products FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Lab items (all visible to everyone, admin manages)
ALTER TABLE public.lab_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published lab items visible to all"
  ON public.lab_items FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can do everything with lab items"
  ON public.lab_items FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- VIP orders (users can see own, admin can see all)
ALTER TABLE public.vip_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON public.vip_orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders"
  ON public.vip_orders FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ==========================================
-- Updated_at trigger function
-- ==========================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lab_items_updated_at
  BEFORE UPDATE ON public.lab_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
