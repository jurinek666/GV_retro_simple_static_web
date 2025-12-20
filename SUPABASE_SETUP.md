# Supabase Setup Guide - Krok za krokem

## 📋 Krok 1: Vytvoření Supabase projektu

1. Jděte na [https://supabase.com](https://supabase.com)
2. Přihlaste se nebo vytvořte účet
3. Klikněte na **"New Project"**
4. Vyplňte:
   - **Name**: `good-vibe-gear-gaming` (nebo jakýkoliv název)
   - **Database Password**: Vytvořte silné heslo (uložte si ho!)
   - **Region**: Vyberte nejbližší region (např. `West EU` pro ČR)
5. Klikněte na **"Create new project"**
6. Počkejte ~2 minuty, než se projekt vytvoří

---

## 📋 Krok 2: Získání API klíčů

1. V Supabase Dashboard klikněte na **Settings** (⚙️ ikona vlevo)
2. Jděte do **API**
3. Zkopírujte tyto hodnoty:
   - **Project URL** (např. `https://xxxxx.supabase.co`)
   - **anon public** klíč (dlouhý řetězec začínající `eyJ...`)

---

## 📋 Krok 3: Nastavení konfigurace

1. Otevřete soubor `js/config.js`
2. Nahraďte:
   ```javascript
   url: 'YOUR_SUPABASE_URL',
   anonKey: 'YOUR_SUPABASE_ANON_KEY'
   ```
3. Vložte vaše hodnoty:
   ```javascript
   url: 'https://xxxxx.supabase.co',
   anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
   ```

---

## 📋 Krok 4: Vytvoření databázových tabulek

1. V Supabase Dashboard klikněte na **SQL Editor** (📝 ikona vlevo)
2. Klikněte na **"New query"**
3. Otevřete soubor `database/schema.sql` z tohoto projektu
4. Zkopírujte celý obsah
5. Vložte do SQL Editoru v Supabase
6. Klikněte na **"Run"** (nebo `Ctrl+Enter`)
7. Měli byste vidět zprávu o úspěchu

**Ověření:**
- Jděte do **Table Editor** (📊 ikona)
- Měli byste vidět tabulky: `articles` a `playlists`

---

## 📋 Krok 5: Vložení testovacích dat

### Přes Supabase Dashboard (doporučeno):

1. Jděte do **Table Editor**
2. Vyberte tabulku `articles`
3. Klikněte na **"Insert row"**
4. Vyplňte:
   - `title`: "Historie House Music"
   - `perex`: "House music se zrodil v Chicagu..."
   - `category`: "Historie"
   - `section`: "music" (musí být přesně "music" nebo "gaming")
   - `published_date`: vyberte datum
   - `published`: ✅ (zaškrtnuté)
   - `order_index`: 1
5. Klikněte na **"Save"**
6. Opakujte pro více článků

### Pro playlisty:

1. Vyberte tabulku `playlists`
2. Klikněte na **"Insert row"**
3. Vyplňte:
   - `title`: "House Classics"
   - `description`: "Nejlepší house tracky..."
   - `spotify_id`: "37i9dQZF1DX0XUsuxWHRQd" (ID z URL Spotify playlistu)
   - `embed_url`: "https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd"
   - `published`: ✅
   - `order_index`: 1
4. Klikněte na **"Save"**

---

## 📋 Krok 6: Testování

1. Otevřete `index.html` v prohlížeči
2. Otevřete Developer Tools (F12)
3. Jděte do záložky **Console**
4. Měli byste vidět:
   - Buď data načtená z Supabase
   - Nebo chybové hlášky (pokud není správně nastaveno)

---

## 🔧 Troubleshooting

### Chyba: "Invalid API key"
- Zkontrolujte, že jste zkopírovali správný `anon public` klíč
- Ujistěte se, že není mezera na začátku/konci

### Chyba: "Failed to fetch"
- Zkontrolujte, že URL je správně (musí začínat `https://`)
- Zkontrolujte, že projekt je aktivní v Supabase Dashboard

### Data se nenačítají
- Zkontrolujte, že máte vložená data v tabulkách
- Zkontrolujte, že `published = true` u všech záznamů
- Zkontrolujte Console v prohlížeči pro chybové hlášky

### RLS (Row Level Security) blokuje data
- Zkontrolujte, že jste spustili SQL skript se správnými policies
- V Supabase Dashboard: Settings > API > Row Level Security

---

## 📝 Poznámky

- **Anon key** je veřejný a bezpečný pro frontend (má jen read práva)
- Pro zápis dat budete potřebovat **service_role key** (pouze pro backend!)
- Data můžete spravovat přes Supabase Dashboard nebo API

---

## 🚀 Další kroky

Po úspěšném nastavení můžete:
- Přidat více článků přes Dashboard
- Upravit data přes API
- Přidat autentizaci pro admin panel (volitelné)
- Nastavit automatické zálohy

