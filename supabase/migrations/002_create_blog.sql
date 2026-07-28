-- Migration 002: Blog tables (no auth dependency)

-- Posts
CREATE TABLE IF NOT EXISTS public.posts (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT        NOT NULL,
  slug         TEXT        NOT NULL UNIQUE,
  excerpt      TEXT,
  content      TEXT,
  cover_url    TEXT,
  meta_title   TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  og_image     TEXT,
  reading_time INTEGER,
  featured     BOOLEAN     NOT NULL DEFAULT false,
  views        INTEGER     NOT NULL DEFAULT 0,
  status       TEXT        NOT NULL DEFAULT 'draft'
                           CHECK (status IN ('draft', 'published')),
  author       TEXT        NOT NULL DEFAULT 'Admin',
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tags
CREATE TABLE IF NOT EXISTS public.tags (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL UNIQUE,
  slug       TEXT        NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Categories
CREATE TABLE IF NOT EXISTS public.categories (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL UNIQUE,
  slug       TEXT        NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Junction: post ↔ tag
CREATE TABLE IF NOT EXISTS public.post_tags (
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  tag_id  UUID NOT NULL REFERENCES public.tags(id)  ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Junction: post ↔ category
CREATE TABLE IF NOT EXISTS public.post_categories (
  post_id     UUID NOT NULL REFERENCES public.posts(id)       ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id)  ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_posts_updated_at ON public.posts;
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Atomic view counter (avoids read-then-write race condition)
CREATE OR REPLACE FUNCTION increment_post_views(post_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  UPDATE public.posts SET views = views + 1 WHERE id = post_id;
END;
$$;

-- Indexes
CREATE INDEX IF NOT EXISTS posts_status_idx       ON public.posts(status);
CREATE INDEX IF NOT EXISTS posts_published_at_idx ON public.posts(published_at DESC);
CREATE INDEX IF NOT EXISTS posts_slug_idx         ON public.posts(slug);
CREATE INDEX IF NOT EXISTS posts_featured_idx     ON public.posts(featured) WHERE featured = true;

-- Row-Level Security
ALTER TABLE public.posts            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_categories  ENABLE ROW LEVEL SECURITY;

-- Public read policies
DROP POLICY IF EXISTS "Anyone can read published posts" ON public.posts;
CREATE POLICY "Anyone can read published posts"
  ON public.posts FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

DROP POLICY IF EXISTS "Anyone can read tags" ON public.tags;
CREATE POLICY "Anyone can read tags"
  ON public.tags FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Anyone can read categories" ON public.categories;
CREATE POLICY "Anyone can read categories"
  ON public.categories FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Anyone can read post_tags" ON public.post_tags;
CREATE POLICY "Anyone can read post_tags"
  ON public.post_tags FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Anyone can read post_categories" ON public.post_categories;
CREATE POLICY "Anyone can read post_categories"
  ON public.post_categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Service-role write policies (backend uses anon key + service-role bypass, or you
-- can switch the backend to service-role key for writes)
DROP POLICY IF EXISTS "Service role can manage posts" ON public.posts;
CREATE POLICY "Service role can manage posts"
  ON public.posts FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can manage tags" ON public.tags;
CREATE POLICY "Service role can manage tags"
  ON public.tags FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can manage categories" ON public.categories;
CREATE POLICY "Service role can manage categories"
  ON public.categories FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can manage post_tags" ON public.post_tags;
CREATE POLICY "Service role can manage post_tags"
  ON public.post_tags FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can manage post_categories" ON public.post_categories;
CREATE POLICY "Service role can manage post_categories"
  ON public.post_categories FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
