-- ============================================
-- LEARN FOR GROWTH - Database Schema
-- Complete Setup with Proper RLS Policies
-- ============================================

-- 1. Create 'speakers' table
CREATE TABLE IF NOT EXISTS public.speakers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT,
  company TEXT,
  bio TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create 'sponsors' table with 'type' column
CREATE TABLE IF NOT EXISTS public.sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT,
  logo_url TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create 'faqs' table
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create 'registrations' table with proper fields
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT,
  email TEXT,
  phone TEXT,
  organization TEXT,
  form_data JSONB,
  registered_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create 'settings' table for banner and form fields
CREATE TABLE IF NOT EXISTS public.settings (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Enable Row Level Security (RLS)
-- ============================================

-- Speakers RLS
ALTER TABLE public.speakers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "speakers_public_read" ON public.speakers;
DROP POLICY IF EXISTS "speakers_authenticated_all" ON public.speakers;
CREATE POLICY "speakers_public_read" ON public.speakers FOR SELECT USING (true);
CREATE POLICY "speakers_authenticated_all" ON public.speakers FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Sponsors RLS
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "sponsors_public_read" ON public.sponsors;
DROP POLICY IF EXISTS "sponsors_authenticated_all" ON public.sponsors;
CREATE POLICY "sponsors_public_read" ON public.sponsors FOR SELECT USING (true);
CREATE POLICY "sponsors_authenticated_all" ON public.sponsors FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- FAQs RLS
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "faqs_public_read" ON public.faqs;
DROP POLICY IF EXISTS "faqs_authenticated_all" ON public.faqs;
CREATE POLICY "faqs_public_read" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "faqs_authenticated_all" ON public.faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Registrations RLS
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "registrations_anon_insert" ON public.registrations;
DROP POLICY IF EXISTS "registrations_authenticated_all" ON public.registrations;
DROP POLICY IF EXISTS "registrations_public_read" ON public.registrations;
CREATE POLICY "registrations_anon_insert" ON public.registrations FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "registrations_authenticated_all" ON public.registrations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "registrations_public_read" ON public.registrations FOR SELECT USING (true);

-- Settings RLS
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "settings_public_read" ON public.settings;
DROP POLICY IF EXISTS "settings_authenticated_all" ON public.settings;
CREATE POLICY "settings_public_read" ON public.settings FOR SELECT USING (true);
CREATE POLICY "settings_authenticated_all" ON public.settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================
-- Create Storage Bucket for Images
-- ============================================
-- Note: Execute in Supabase dashboard:
-- 1. Go to Storage
-- 2. Create new bucket: "images"
-- 3. Make it public
-- 4. Add RLS policy to allow authenticated uploads and public reads

-- ============================================
-- Indexes for Performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_speakers_created_at ON public.speakers(created_at);
CREATE INDEX IF NOT EXISTS idx_sponsors_created_at ON public.sponsors(created_at);
CREATE INDEX IF NOT EXISTS idx_faqs_created_at ON public.faqs(created_at);
CREATE INDEX IF NOT EXISTS idx_registrations_registered_at ON public.registrations(registered_at);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);
CREATE INDEX IF NOT EXISTS idx_settings_key ON public.settings(key);
