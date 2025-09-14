-- Drop existing tables if they exist
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id BIGSERIAL PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_fr TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  category TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  stock INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  customer_address TEXT NOT NULL,
  customer_city TEXT NOT NULL,
  notes TEXT,
  items JSONB NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insert sample categories
INSERT INTO categories (name_ar, name_en, name_fr, slug) VALUES
('أواني الطبخ', 'Cookware', 'Ustensiles de cuisine', 'cookware'),
('أطباق وصحون', 'Plates & Bowls', 'Assiettes et bols', 'plates-bowls'),
('أكواب وأقداح', 'Cups & Mugs', 'Tasses et gobelets', 'cups-mugs'),
('إكسسوارات', 'Accessories', 'Accessoires', 'accessories'),
('ديكورات', 'Decorative Items', 'Objets décoratifs', 'decorative')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (name_ar, name_en, name_fr, description_ar, description_en, description_fr, price, category, stock, is_featured, is_active) VALUES
('إبريق شاي تقليدي', 'Traditional Tea Pot', 'Théière traditionnelle', 'إبريق شاي مصنوع من الفخار التقليدي المغربي', 'Traditional Moroccan pottery tea pot', 'Théière en poterie traditionnelle marocaine', 120.00, 'cookware', 15, true, true),
('طبق تقديم كبير', 'Large Serving Plate', 'Grande assiette de service', 'طبق كبير لتقديم الطعام مزين بالنقوش التقليدية', 'Large plate for serving food decorated with traditional patterns', 'Grande assiette pour servir les aliments décorée de motifs traditionnels', 80.00, 'plates-bowls', 20, true, true),
('كوب قهوة مغربي', 'Moroccan Coffee Cup', 'Tasse à café marocaine', 'كوب قهوة صغير مصنوع من الفخار المغربي الأصيل', 'Small coffee cup made from authentic Moroccan pottery', 'Petite tasse à café en poterie marocaine authentique', 25.00, 'cups-mugs', 50, false, true),
('مزهرية ديكور', 'Decorative Vase', 'Vase décoratif', 'مزهرية جميلة للديكور مصنوعة يدوياً بالطريقة التقليدية', 'Beautiful decorative vase handmade in traditional style', 'Beau vase décoratif fait à la main dans un style traditionnel', 150.00, 'decorative', 8, true, true)
ON CONFLICT DO NOTHING;

-- Enable RLS (Row Level Security)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON categories FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON products FOR SELECT USING (true);

-- Create policies for products (allow insert and update)
CREATE POLICY "Enable insert access for all users" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON products FOR UPDATE USING (true);

-- Create policies for categories (allow insert and update)
CREATE POLICY "Enable insert access for all users" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON categories FOR UPDATE USING (true);

-- Create policies for orders (admin can read all, public can insert)
CREATE POLICY "Enable insert access for all users" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read access for admin users" ON orders FOR SELECT USING (true);
CREATE POLICY "Enable update access for admin users" ON orders FOR UPDATE USING (true);