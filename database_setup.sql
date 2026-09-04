-- SQL SCRIPT UNTUK MEMBUAT TABEL DI SUPABASE
-- Buka dashboard Supabase -> SQL Editor -> New Query -> Paste kode di bawah ini lalu klik RUN.

-- 1. Tabel Projects
CREATE TABLE public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    project_date DATE,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabel Activities Gallery
CREATE TABLE public.activities_gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert Data Dummy untuk Test (Opsional, boleh dihapus jika ingin input dari UI)
INSERT INTO public.projects (title, description, image_url) VALUES 
('Desain Poster Kesehatan', 'Desain penyuluhan kesehatan masyarakat berbasis vektor.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80'),
('UI/UX Landing Page', 'Eksplorasi desain website modern dengan figma.', 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&q=80');

INSERT INTO public.activities_gallery (title, image_url) VALUES 
('Mendaki Gunung Gede', 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=500&q=80'),
('Praktik Keperawatan Dasar', 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=500&q=80');

-- Izinkan Public Read Access (Policy RLS) agar website bisa membaca data tanpa perlu login user
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Izinkan semua orang membaca projects" ON public.projects FOR SELECT USING (true);

ALTER TABLE public.activities_gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Izinkan semua orang membaca activities_gallery" ON public.activities_gallery FOR SELECT USING (true);
