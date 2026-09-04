-- ========================================================
-- SETUP KEAMANAN & ADMIN (Row Level Security)
-- Jalankan kode ini di fitur "SQL Editor" Supabase
-- ========================================================

-- 1. Mengaktifkan Row Level Security (jika belum)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities_gallery ENABLE ROW LEVEL SECURITY;

-- 2. Mengizinkan siapa saja melihat data (Membaca/SELECT)
-- (Kita drop kebijakan lama dulu agar tidak bentrok)
DROP POLICY IF EXISTS "Izinkan semua orang membaca projects" ON public.projects;
DROP POLICY IF EXISTS "Izinkan semua orang membaca activities_gallery" ON public.activities_gallery;

CREATE POLICY "Public Read Access" 
ON public.projects FOR SELECT USING (true);

CREATE POLICY "Public Read Access Gallery" 
ON public.activities_gallery FOR SELECT USING (true);

-- 3. Mengizinkan CRUD (Insert, Update, Delete) HANYA untuk User yang Login
-- A. Untuk Tabel Projects
CREATE POLICY "Auth Insert Projects" 
ON public.projects FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Auth Update Projects" 
ON public.projects FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Auth Delete Projects" 
ON public.projects FOR DELETE 
USING (auth.role() = 'authenticated');

-- B. Untuk Tabel Gallery
CREATE POLICY "Auth Insert Gallery" 
ON public.activities_gallery FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Auth Update Gallery" 
ON public.activities_gallery FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Auth Delete Gallery" 
ON public.activities_gallery FOR DELETE 
USING (auth.role() = 'authenticated');
