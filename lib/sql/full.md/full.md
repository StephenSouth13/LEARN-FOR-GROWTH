-- 1. Create 'speakers' table
CREATE TABLE IF NOT EXISTS public.speakers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT,
  company TEXT,
  bio TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create 'sponsors' table
CREATE TABLE IF NOT EXISTS public.sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create 'faqs' table
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create 'registrations' table
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  position TEXT,
  form_data JSONB, -- For any extra fields
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create 'settings' table for banner and form fields
CREATE TABLE IF NOT EXISTS public.settings (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Enable Row Level Security (RLS) and create policies for all tables

ALTER TABLE public.speakers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON public.speakers;
CREATE POLICY "Allow all for authenticated users" ON public.speakers FOR ALL TO authenticated USING (true) WITH CHECK (true);

ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON public.sponsors;
CREATE POLICY "Allow all for authenticated users" ON public.sponsors FOR ALL TO authenticated USING (true) WITH CHECK (true);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON public.faqs;
CREATE POLICY "Allow all for authenticated users" ON public.faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON public.registrations;
CREATE POLICY "Allow all for authenticated users" ON public.registrations FOR ALL TO authenticated USING (true) WITH CHECK (true);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON public.settings;
CREATE POLICY "Allow all for authenticated users" ON public.settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Cho phép mọi người đọc dữ liệu từ các bảng speakers, faqs, và settings
CREATE POLICY "Enable read access for all users" ON public.speakers FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.settings FOR SELECT USING (true);

-- Cho phép mọi người gửi (insert) dữ liệu vào bảng registrations
CREATE POLICY "Enable insert for anon users" ON public.registrations FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."sponsors"
AS PERMISSIVE FOR SELECT
TO public
USING (true);