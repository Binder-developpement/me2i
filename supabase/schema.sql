-- ============================================================
-- MCI Admin - Supabase Schema
-- À exécuter dans Supabase Dashboard > SQL Editor
-- ============================================================

-- ─── Articles ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS articles (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  excerpt      TEXT,
  content      TEXT,
  cover_url    TEXT,
  category     TEXT,
  status       TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- ─── Services ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  description  TEXT,
  content      TEXT,
  icon_name    TEXT,
  cover_url    TEXT,
  category     TEXT,
  order_index  INTEGER DEFAULT 0,
  status       TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft')),
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- ─── Products ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  description  TEXT,
  price        NUMERIC(10,2),
  currency     TEXT DEFAULT 'XAF',
  cover_url    TEXT,
  images       TEXT[] DEFAULT '{}',
  category     TEXT,
  stock        INTEGER DEFAULT 0,
  status       TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft', 'out_of_stock')),
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- ─── Orders ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reference       TEXT UNIQUE NOT NULL,
  customer_name   TEXT NOT NULL,
  customer_email  TEXT NOT NULL,
  customer_phone  TEXT,
  items           JSONB NOT NULL DEFAULT '[]',
  total           NUMERIC(10,2),
  currency        TEXT DEFAULT 'XAF',
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ─── Contacts ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT,
  subject      TEXT,
  message      TEXT NOT NULL,
  status       TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- ─── Company Settings ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS company_settings (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key          TEXT UNIQUE NOT NULL,
  value        TEXT,
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- Insert default settings
INSERT INTO company_settings (key, value) VALUES
  ('company_name', 'MCI'),
  ('tagline', 'Maintenance Industrielle & Énergie sans Interruption'),
  ('email', 'contact@me2i.cm'),
  ('phone', '+237 000 000 000'),
  ('emergency_phone', '+237 000 000 001'),
  ('address', 'Cameroun - Afrique centrale'),
  ('linkedin_url', ''),
  ('facebook_url', ''),
  ('opening_hours', 'Lundi – Vendredi : 7h30 – 18h00'),
  ('logo_url', '')
ON CONFLICT (key) DO NOTHING;

-- ─── Auto-update updated_at ───────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE OR REPLACE TRIGGER services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE OR REPLACE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE OR REPLACE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

-- ─── Row Level Security ───────────────────────────────────────
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;

-- ─── Realisations ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS realisations (
  id           TEXT PRIMARY KEY,
  title        TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  category     TEXT,
  subtitle     TEXT,
  description  TEXT,
  content      TEXT,
  cover_url    TEXT,
  client       TEXT,
  location     TEXT,
  status       TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft', 'trash')),
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE realisations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public realisations read" ON realisations FOR SELECT USING (true);
CREATE POLICY "Public realisations insert" ON realisations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public realisations update" ON realisations FOR UPDATE USING (true);
CREATE POLICY "Public realisations delete" ON realisations FOR DELETE USING (true);

-- Public read for published articles, services, products
CREATE POLICY "Public read articles" ON articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public read services" ON services FOR SELECT USING (status = 'published');
CREATE POLICY "Public read products" ON products FOR SELECT USING (status = 'published');

-- Authenticated admin: full access
CREATE POLICY "Admin all articles" ON articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all orders" ON orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all contacts" ON contacts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all settings" ON company_settings FOR ALL USING (auth.role() = 'authenticated');

-- Public insert for orders and contacts (from the public site)
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert contacts" ON contacts FOR INSERT WITH CHECK (true);
