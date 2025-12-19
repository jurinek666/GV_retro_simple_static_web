-- ============================================
-- Supabase Database Schema
-- Good Vibe Gear & Gaming
-- ============================================
-- 
-- INSTRUKCE:
-- 1. Otevřete Supabase Dashboard
-- 2. Jděte do SQL Editor
-- 3. Vytvořte nový query
-- 4. Zkopírujte a spusťte tento skript
-- ============================================

-- Tabulka pro články (hudba i gaming)
CREATE TABLE IF NOT EXISTS articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    perex TEXT NOT NULL,
    image_url TEXT,
    category TEXT NOT NULL,
    section TEXT NOT NULL CHECK (section IN ('music', 'gaming')),
    published_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0
);

-- Tabulka pro playlisty
CREATE TABLE IF NOT EXISTS playlists (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    spotify_id TEXT NOT NULL,
    embed_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0
);

-- Indexy pro rychlejší dotazy
CREATE INDEX IF NOT EXISTS idx_articles_section ON articles(section);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_order ON articles(order_index);
CREATE INDEX IF NOT EXISTS idx_playlists_published ON playlists(published);
CREATE INDEX IF NOT EXISTS idx_playlists_order ON playlists(order_index);

-- Funkce pro automatické aktualizování updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pro articles
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger pro playlists
CREATE TRIGGER update_playlists_updated_at BEFORE UPDATE ON playlists
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Povolíme veřejné čtení, ale zápis jen pro autentizované uživatele

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;

-- Politika: Všichni mohou číst publikované články
CREATE POLICY "Public can read published articles"
    ON articles FOR SELECT
    USING (published = true);

-- Politika: Všichni mohou číst publikované playlisty
CREATE POLICY "Public can read published playlists"
    ON playlists FOR SELECT
    USING (published = true);

-- ============================================
-- ADMIN POLICIES (pro autentizované uživatele)
-- ============================================

-- Politika: Autentizovaní uživatelé mohou číst všechny články (i nepublikované)
CREATE POLICY "Authenticated users can read all articles"
    ON articles FOR SELECT
    TO authenticated
    USING (true);

-- Politika: Autentizovaní uživatelé mohou vkládat články
CREATE POLICY "Authenticated users can insert articles"
    ON articles FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Politika: Autentizovaní uživatelé mohou upravovat články
CREATE POLICY "Authenticated users can update articles"
    ON articles FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Politika: Autentizovaní uživatelé mohou mazat články
CREATE POLICY "Authenticated users can delete articles"
    ON articles FOR DELETE
    TO authenticated
    USING (true);

-- Politika: Autentizovaní uživatelé mohou číst všechny playlisty (i nepublikované)
CREATE POLICY "Authenticated users can read all playlists"
    ON playlists FOR SELECT
    TO authenticated
    USING (true);

-- Politika: Autentizovaní uživatelé mohou vkládat playlisty
CREATE POLICY "Authenticated users can insert playlists"
    ON playlists FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Politika: Autentizovaní uživatelé mohou upravovat playlisty
CREATE POLICY "Authenticated users can update playlists"
    ON playlists FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Politika: Autentizovaní uživatelé mohou mazat playlisty
CREATE POLICY "Authenticated users can delete playlists"
    ON playlists FOR DELETE
    TO authenticated
    USING (true);

-- ============================================
-- VÝCHOZÍ DATA (OPTIONÁLNÍ)
-- ============================================
-- Můžete vložit testovací data nebo je přidat přes Supabase Dashboard

-- Příklad vložení článku:
-- INSERT INTO articles (title, perex, category, section, published_date, order_index)
-- VALUES (
--     'Historie House Music',
--     'House music se zrodil v Chicagu v 80. letech...',
--     'Historie',
--     'music',
--     '2024-01-15',
--     1
-- );

-- Příklad vložení playlistu:
-- INSERT INTO playlists (title, description, spotify_id, embed_url, order_index)
-- VALUES (
--     'House Classics',
--     'Nejlepší house tracky všech dob',
--     '37i9dQZF1DX0XUsuxWHRQd',
--     'https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd',
--     1
-- );

