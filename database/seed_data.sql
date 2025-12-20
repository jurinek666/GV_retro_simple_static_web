-- ============================================
-- Testovací data pro Good Vibe Gear & Gaming
-- ============================================
-- 
-- INSTRUKCE:
-- 1. Nejdříve spusťte schema.sql
-- 2. Pak spusťte tento skript pro vložení testovacích dat
-- 3. Nebo použijte Supabase Dashboard > Table Editor
-- ============================================

-- Vložení hudebních článků
INSERT INTO articles (title, perex, category, section, published_date, order_index, published) VALUES
(
    'Historie House Music',
    'House music se zrodil v Chicagu v 80. letech jako reakce na disco. Zjistěte, jak tento žánr ovlivnil celosvětovou klubovou scénu a proč je stále relevantní.',
    'Historie',
    'music',
    '2024-01-15',
    1,
    true
),
(
    'Disco 70. let: Zlatá éra taneční hudby',
    'Sedmdesátá léta přinesla disco revoluci. Od Studio 54 po Saturday Night Fever - prozkoumejte éru, která navždy změnila způsob, jakým tančíme.',
    'Historie',
    'music',
    '2024-01-10',
    2,
    true
),
(
    'Základy hudební teorie pro DJs',
    'Pochopení harmonie, rytmu a struktury skladeb je klíčové pro každého DJ. Tento článek vysvětluje základy srozumitelně a prakticky.',
    'Teorie',
    'music',
    '2024-01-05',
    3,
    true
),
(
    'Klubová scéna: Minulost vs. Současnost',
    'Jak se změnila klubová kultura od 90. let do současnosti? Analýza trendů, technologií a sociálních změn v taneční hudbě.',
    'Kultura',
    'music',
    '2023-12-28',
    4,
    true
),
(
    'Vývoj elektronické hudby: Od syntezátorů k AI',
    'Technologie vždy formovaly hudbu. Prozkoumejte cestu od prvních syntezátorů přes samplery až po současné AI nástroje.',
    'Technologie',
    'music',
    '2023-12-20',
    5,
    true
),
(
    'Směr vývoje: Budoucnost taneční hudby',
    'Kam se ubírá taneční hudba? Analýza současných trendů a predikce budoucího vývoje žánrů a technologií.',
    'Trendy',
    'music',
    '2023-12-15',
    6,
    true
);

-- Vložení gaming článků
INSERT INTO articles (title, perex, category, section, published_date, order_index, published) VALUES
(
    'Retro Gaming Revival: Proč se vracíme k klasice',
    'Retro hry zažívají renesanci. Zjistěte, proč hráči stále milují pixely, jednoduchou mechaniku a nostalgii 8-bitové éry.',
    'Retro',
    'gaming',
    '2024-01-12',
    1,
    true
),
(
    'Indie Games: Kreativita bez limitů',
    'Nezávislí vývojáři posouvají hranice herního designu. Objevte nejzajímavější indie tituly posledních let a jejich inovace.',
    'Indie',
    'gaming',
    '2024-01-08',
    2,
    true
),
(
    'Herní mechaniky: Co dělá hru zábavnou?',
    'Analýza herních mechanik, které vytvářejí závislost a zábavu. Od loopů přes progresi až po reward systémy.',
    'Design',
    'gaming',
    '2024-01-03',
    3,
    true
),
(
    'Pixel Art: Umění v herním designu',
    'Pixel art není jen nostalgie - je to plnohodnotný umělecký styl. Prozkoumejte moderní pixel art hry a jejich estetiku.',
    'Vizuál',
    'gaming',
    '2023-12-30',
    4,
    true
);

-- Vložení playlistů
-- POZOR: Spotify ID a embed URL musí být skutečné z vašich playlistů!
INSERT INTO playlists (title, description, spotify_id, embed_url, order_index, published) VALUES
(
    'House Classics',
    'Nejlepší house tracky všech dob - od Chicaga po současnost',
    '37i9dQZF1DX0XUsuxWHRQd',
    'https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd',
    1,
    true
),
(
    'Disco Fever',
    'Zlatá éra disco hudby - funky, groovy a taneční',
    '37i9dQZF1DXa8n42306eJB',
    'https://open.spotify.com/embed/playlist/37i9dQZF1DXa8n42306eJB',
    2,
    true
),
(
    'Gaming Vibes',
    'Hudba inspirovaná hrami a herními soundtracky',
    '37i9dQZF1DX8UebH9nCpFT',
    'https://open.spotify.com/embed/playlist/37i9dQZF1DX8UebH9nCpFT',
    3,
    true
);

-- ============================================
-- POZNÁMKY:
-- ============================================
-- 
-- 1. Spotify Playlist ID najdete v URL playlistu:
--    https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd
--    ID je část za "/playlist/"
--
-- 2. Embed URL má formát:
--    https://open.spotify.com/embed/playlist/[SPOTIFY_ID]
--
-- 3. Pro vlastní playlisty:
--    - Vytvořte playlist na Spotify
--    - Klikněte na "..." > "Share" > "Copy link to playlist"
--    - Zkopírujte ID z URL
--    - Vytvořte embed URL podle formátu výše
--
-- 4. image_url můžete přidat později přes Dashboard
--    nebo přidat do INSERT příkazů výše

