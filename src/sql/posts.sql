-- Blog posts schema

CREATE TABLE IF NOT EXISTS posts (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  cover_image TEXT,
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  excerpt_ar TEXT NOT NULL,
  excerpt_en TEXT NOT NULL,
  excerpt_fr TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_fr TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_posts_updated_at ON posts;
CREATE TRIGGER set_posts_updated_at
BEFORE UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts (slug);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts (published_at DESC);

-- RLS policies
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Public read only published posts
DROP POLICY IF EXISTS "Public read published posts" ON posts;
CREATE POLICY "Public read published posts"
  ON posts FOR SELECT
  USING (is_published = true);

-- Admins (JWT role/admin) can insert/update/delete
DROP POLICY IF EXISTS "Admins modify posts" ON posts;
CREATE POLICY "Admins modify posts"
  ON posts FOR ALL
  USING (
    COALESCE(
      auth.jwt() ->> 'role',
      (auth.jwt() -> 'user_metadata' ->> 'role')
    ) = 'admin'
  )
  WITH CHECK (
    COALESCE(
      auth.jwt() ->> 'role',
      (auth.jwt() -> 'user_metadata' ->> 'role')
    ) = 'admin'
  );
