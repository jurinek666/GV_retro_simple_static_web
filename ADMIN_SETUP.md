# Admin Panel - Nastavení a použití

## 📋 Přehled

Admin panel umožňuje správu článků a playlistů přes webové rozhraní. Je chráněn autentizací pomocí Supabase Auth.

**Soubor:** `admin.html`

---

## 🚀 Rychlý start

### Krok 1: Aktualizujte databázové schéma

1. Otevřete Supabase Dashboard → **SQL Editor**
2. Spusťte aktualizovaný `database/schema.sql` (obsahuje nové policies pro autentizaci)
3. Nebo spusťte pouze nové policies:

```sql
-- Policies pro autentizované uživatele
CREATE POLICY "Authenticated users can read all articles"
    ON articles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert articles"
    ON articles FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles"
    ON articles FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete articles"
    ON articles FOR DELETE TO authenticated USING (true);

-- Stejné pro playlists...
```

### Krok 2: Otevřete admin panel

1. Otevřete `admin.html` v prohlížeči
2. Nebo nasaďte na hosting a přistupujte přes URL

### Krok 3: Vytvořte admin účet

1. Klikněte na **"Registrovat se"**
2. Zadejte email a heslo (min. 6 znaků)
3. Po registraci se automaticky přihlaste

### Krok 4: Začněte používat

- Přidávejte, upravujte a mažte články
- Spravujte playlisty
- Všechny změny se okamžitě projeví na hlavním webu

---

## 🔐 Autentizace

### Registrace nového uživatele

1. V admin panelu klikněte na **"Registrovat se"**
2. Vyplňte email a heslo
3. Po úspěšné registraci se můžete přihlásit

**Poznámka:** První registrovaný uživatel se stane administrátorem.

### Přihlášení

1. Zadejte email a heslo
2. Klikněte na **"Přihlásit se"**

### Odhlášení

Klikněte na tlačítko **"Odhlásit se"** v pravém horním rohu.

---

## 📝 Správa článků

### Přidání nového článku

1. Přejděte na záložku **"Články"**
2. Klikněte na **"+ Přidat článek"**
3. Vyplňte formulář:
   - **Název** * (povinné)
   - **Perex** * (povinné)
   - **URL obrázku** (volitelné)
   - **Kategorie** * (povinné)
   - **Sekce** * (Hudba nebo Gaming)
   - **Datum publikace** * (povinné)
   - **Pořadí** (číslo pro řazení)
   - **Publikováno** (checkbox)
4. Klikněte na **"Uložit"**

### Úprava článku

1. V seznamu článků klikněte na **"Upravit"**
2. Upravte potřebná pole
3. Klikněte na **"Uložit"**

### Smazání článku

1. V seznamu článků klikněte na **"Smazat"**
2. Potvrďte smazání

---

## 🎵 Správa playlistů

### Přidání nového playlistu

1. Přejděte na záložku **"Playlisty"**
2. Klikněte na **"+ Přidat playlist"**
3. Vyplňte formulář:
   - **Název** * (povinné)
   - **Popis** (volitelné)
   - **Spotify Playlist ID** * (povinné)
     - Najdete v URL: `spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd`
     - ID je část za `/playlist/`
   - **Embed URL** * (povinné)
     - Formát: `https://open.spotify.com/embed/playlist/[SPOTIFY_ID]`
     - Automaticky se vygeneruje při zadání Spotify ID
   - **Pořadí** (číslo pro řazení)
   - **Publikováno** (checkbox)
4. Klikněte na **"Uložit"**

### Jak získat Spotify Playlist ID

1. Otevřete playlist na Spotify
2. Klikněte na **"..."** → **"Share"** → **"Copy link to playlist"**
3. URL vypadá takto: `https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd`
4. ID je část za `/playlist/`: `37i9dQZF1DX0XUsuxWHRQd`

### Úprava playlistu

1. V seznamu playlistů klikněte na **"Upravit"**
2. Upravte potřebná pole
3. Klikněte na **"Uložit"**

### Smazání playlistu

1. V seznamu playlistů klikněte na **"Smazat"**
2. Potvrďte smazání

---

## 🎨 Funkce

### Tabs (Záložky)

- **Články** - správa hudebních a gaming článků
- **Playlisty** - správa Spotify playlistů

### Filtrování a řazení

- Články jsou řazeny podle `order_index` a `published_date`
- Playlisty jsou řazeny podle `order_index`
- Použijte pole **"Pořadí"** pro vlastní řazení

### Publikace

- **Publikováno** = článek/playlist je viditelný na hlavním webu
- **Nepublikováno** = článek/playlist je skrytý (pouze v admin panelu)

### Validace

- Všechna povinná pole jsou označena *
- Formuláře kontrolují správnost dat před uložením
- Chybové zprávy se zobrazují pod formulářem

---

## 🔧 Technické detaily

### Autentizace

- Používá Supabase Auth
- Session je uložena v localStorage
- Automatické přihlášení při obnovení stránky

### CRUD operace

- **Create** - přidání nového záznamu
- **Read** - načtení seznamu záznamů
- **Update** - úprava existujícího záznamu
- **Delete** - smazání záznamu

### Row Level Security (RLS)

- Veřejní uživatelé mohou číst pouze publikované záznamy
- Autentizovaní uživatelé mají plný přístup (CRUD)

---

## 🐛 Troubleshooting

### "Chyba při přihlašování"

- Zkontrolujte, že máte správný email a heslo
- Ujistěte se, že je účet zaregistrován
- Zkontrolujte Console v prohlížeči (F12) pro detailní chybu

### "Nepodařilo se načíst články"

- Zkontrolujte, že jste přihlášeni
- Ověřte, že jsou nastavené správné RLS policies
- Zkontrolujte Console pro chybové hlášky

### "Nepodařilo se uložit"

- Zkontrolujte, že jsou vyplněna všechna povinná pole
- Ověřte, že máte oprávnění k zápisu (jste přihlášeni)
- Zkontrolujte Console pro detailní chybu

### Data se nezobrazují

- Obnovte stránku (F5)
- Zkontrolujte, že jsou záznamy publikované
- Ověřte připojení k Supabase

---

## 🔒 Bezpečnost

### Doporučení

1. **Silné heslo** - použijte silné heslo pro admin účet
2. **HTTPS** - v produkci používejte HTTPS
3. **Omezení přístupu** - zvažte omezení přístupu k `admin.html` (např. přes .htaccess)
4. **Pravidelné zálohy** - zálohujte databázi pravidelně

### RLS Policies

- Veřejní uživatelé nemohou upravovat ani mazat data
- Pouze autentizovaní uživatelé mají plný přístup
- Policies jsou nastaveny v `database/schema.sql`

---

## 📚 Další informace

- **Hlavní web:** `index.html`
- **Admin panel:** `admin.html`
- **Konfigurace:** `js/config.js`
- **Databázové schéma:** `database/schema.sql`

---

## 💡 Tipy

1. **Pořadí záznamů** - použijte pole "Pořadí" pro kontrolu řazení na hlavním webu
2. **Nepublikované záznamy** - můžete vytvářet záznamy a publikovat je později
3. **URL obrázků** - můžete použít externí URL nebo nahrát obrázky na Supabase Storage
4. **Spotify ID** - při zadání Spotify ID se automaticky vygeneruje Embed URL

---

**Potřebujete pomoc?** Zkontrolujte Console v prohlížeči (F12) pro detailní chybové hlášky.

