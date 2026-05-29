-- ============================================
-- aiitmc.online 数据库 Schema
-- 部署到 Supabase PostgreSQL
-- ============================================

-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 用户资料表 (关联 Supabase Auth Users)
-- ============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user', 'vip')),
  vip_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 新用户注册时自动创建 profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 文章表
-- ============================================
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  cover_image TEXT DEFAULT '',
  category TEXT DEFAULT 'PLC',
  tags TEXT[] DEFAULT '{}',
  is_premium BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  author_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 课程表
-- ============================================
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT DEFAULT '',
  cover_image TEXT DEFAULT '',
  level TEXT DEFAULT '入门' CHECK (level IN ('入门', '进阶', '高级')),
  is_premium BOOLEAN DEFAULT FALSE,
  price NUMERIC(10,2) DEFAULT 0,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 课程章节
-- ============================================
CREATE TABLE public.course_chapters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  video_url TEXT DEFAULT '',
  content TEXT DEFAULT '',
  is_free BOOLEAN DEFAULT FALSE,
  duration_min INT DEFAULT 0
);

-- ============================================
-- 商品表 (DIY 套件)
-- ============================================
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT DEFAULT '',
  price NUMERIC(10,2) DEFAULT 0,
  image TEXT DEFAULT '',
  buy_url TEXT DEFAULT '',
  category TEXT DEFAULT 'ESP32',
  specs JSONB DEFAULT '{}',
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 实训展品表
-- ============================================
CREATE TABLE public.lab_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT DEFAULT '',
  image TEXT DEFAULT '',
  video_url TEXT DEFAULT '',
  specs JSONB DEFAULT '{}',
  category TEXT DEFAULT '实训平台',
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 订单/支付记录表
-- ============================================
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id),
  type TEXT NOT NULL CHECK (type IN ('vip_monthly', 'vip_yearly', 'vip_lifetime', 'course')),
  reference_id UUID,
  amount NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT DEFAULT '',
  transaction_id TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

-- ============================================
-- RLS 策略
-- ============================================

-- Profiles: 用户只能读自己的，admin 能读所有
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Articles: 所有人能读已发布的，admin 能管理所有
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published articles are viewable by everyone"
  ON public.articles FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can do anything with articles"
  ON public.articles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Courses: 同上
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published courses are viewable by everyone"
  ON public.courses FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can do anything with courses"
  ON public.courses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

ALTER TABLE public.course_chapters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Chapters of published courses are viewable"
  ON public.course_chapters FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.courses
      WHERE id = course_chapters.course_id AND published = true
    )
  );

CREATE POLICY "Admins can manage chapters"
  ON public.course_chapters FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published products are viewable by everyone"
  ON public.products FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can manage products"
  ON public.products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Lab Items
ALTER TABLE public.lab_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published lab items are viewable by everyone"
  ON public.lab_items FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can manage lab items"
  ON public.lab_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Orders: 用户只能看自己的订单，admin 能看所有
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all orders"
  ON public.orders FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- 索引
-- ============================================
CREATE INDEX idx_articles_published ON public.articles(published, created_at DESC);
CREATE INDEX idx_articles_category ON public.articles(category);
CREATE INDEX idx_articles_slug ON public.articles(slug);
CREATE INDEX idx_courses_published ON public.courses(published, created_at DESC);
CREATE INDEX idx_courses_slug ON public.courses(slug);
CREATE INDEX idx_products_published ON public.products(published);
CREATE INDEX idx_lab_items_published ON public.lab_items(published);
CREATE INDEX idx_orders_user_id ON public.orders(user_id, created_at DESC);
