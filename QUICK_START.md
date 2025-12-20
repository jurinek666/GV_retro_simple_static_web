# 🚀 Rychlý start - Supabase integrace

## Krok 1: Vytvořte Supabase projekt (5 minut)

1. Jděte na [supabase.com](https://supabase.com) a přihlaste se
2. Klikněte **"New Project"**
3. Vyplňte:
   - Name: `good-vibe-gear` (nebo jakýkoliv název)
   - Database Password: **ULOŽTE SI HESLO!**
   - Region: `West EU` (nebo nejbližší)
4. Klikněte **"Create new project"**
5. Počkejte ~2 minuty

---

## Krok 2: Získejte API klíče (1 minuta)

1. V Dashboard klikněte na **Settings** ⚙️ (vlevo)
2. Jděte do **API**
3. Zkopírujte:
   - **Project URL** (např. `https://xxxxx.supabase.co`)
   - **anon public** klíč (dlouhý řetězec)

---

## Krok 3: Nastavte konfiguraci (1 minuta)

1. Otevřete `js/config.js`
2. Nahraďte:
   ```javascript
   url: 'YOUR_SUPABASE_URL',
   anonKey: 'YOUR_SUPABASE_ANON_KEY'
   ```
3. Vložte vaše hodnoty z Krok 2

---

## Krok 4: Vytvořte databázové tabulky (2 minuty)

1. V Supabase Dashboard klikněte na **SQL Editor** 📝
2. Klikněte **"New query"**
3. Otevřete soubor `database/schema.sql` z tohoto projektu
4. Zkopírujte celý obsah a vložte do SQL Editoru
5. Klikněte **"Run"** (nebo `Ctrl+Enter`)
6. ✅ Měli byste vidět zprávu o úspěchu

**Ověření:** Jděte do **Table Editor** - měli byste vidět tabulky `articles` a `playlists`

---

## Krok 5: Vložte testovací data (3 minuty)

### Varianta A: Přes SQL (rychlejší)

1. V **SQL Editor** vytvořte nový query
2. Otevřete soubor `database/seed_data.sql`
3. Zkopírujte a spusťte

### Varianta B: Přes Dashboard (jednodušší)

1. Jděte do **Table Editor**
2. Vyberte tabulku `articles`
3. Klikněte **"Insert row"**
4. Vyplňte:
   - `title`: "Historie House Music"
   - `perex`: "House music se zrodil..."
   - `category`: "Historie"
   - `section`: **"music"** (musí být přesně "music" nebo "gaming")
   - `published_date`: vyberte datum
   - `published`: ✅ (zaškrtnuté)
   - `order_index`: 1
5. Klikněte **"Save"**
6. Opakujte pro více článků

**Pro playlisty:**
- Tabulka `playlists`
- `spotify_id`: ID z URL Spotify playlistu (část za `/playlist/`)
- `embed_url`: `https://open.spotify.com/embed/playlist/[SPOTIFY_ID]`

---

## Krok 6: Otestujte (1 minuta)

1. Otevřete `index.html` v prohlížeči
2. Otevřete **Developer Tools** (F12)
3. Jděte do záložky **Console**
4. Měli byste vidět:
   ```
   ✅ Good Vibe Gear & Gaming - Web initialized
   📊 Načteno: X hudebních článků, Y gaming článků, Z playlistů
   ```

---

## ✅ Hotovo!

Pokud vidíte data na webu, integrace funguje! 🎉

---

## 🔧 Problémy?

### "Supabase SDK není načten"
- Zkontrolujte, že `index.html` obsahuje `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>`

### "Supabase konfigurace není nastavena"
- Zkontrolujte `js/config.js` - musí obsahovat skutečné hodnoty, ne placeholdery

### "Chyba při načítání dat"
- Zkontrolujte Console pro detailní chybu
- Ověřte, že máte data v tabulkách
- Zkontrolujte, že `published = true` u všech záznamů

### Data se nenačítají
- Zkontrolujte RLS (Row Level Security) policies v Supabase
- Ujistěte se, že jste spustili `schema.sql` se správnými policies

---

## 📚 Další kroky

- Přidejte více článků přes Supabase Dashboard
- Přidejte obrázky (image_url) k článkům
- Vytvořte vlastní Spotify playlisty a přidejte je
- Upravte styling podle potřeby

---

**Potřebujete pomoc?** Podívejte se na `SUPABASE_SETUP.md` pro detailní návod.

