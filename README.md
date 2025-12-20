# Good Vibe Gear & Gaming

Statický one-page web s retro pixel-art stylem zaměřený na hudbu, gaming a playlisty.

## 🎯 Charakter projektu

- **Typ**: Statický one-page web
- **Hosting**: GitHub Pages / Netlify / obdobné statické hostingy
- **Technologie**: HTML5, CSS3, Vanilla JavaScript
- **Bez frameworků**: Žádný Bootstrap, Tailwind, React apod.
- **Bez build nástrojů**: Žádný Vite, Webpack apod.

## 📁 Struktura projektu

```
/
├── index.html          # Hlavní HTML struktura
├── admin.html          # Admin panel pro správu obsahu
├── css/
│   ├── style.css       # CSS pro hlavní web
│   └── admin.css      # CSS pro admin panel
├── js/
│   ├── main.js        # Vanilla JS pro hlavní web
│   ├── admin.js       # JS pro admin panel
│   └── config.js      # Supabase konfigurace
├── database/
│   ├── schema.sql     # Databázové schéma
│   └── seed_data.sql  # Testovací data
├── assets/
│   └── images/        # Obrázky (pixel-art)
└── README.md
```

## 🎨 Vizuální styl

- **Pixel-art estetika**: Jemnější pixel-art styl
- **Tmavé pozadí**: Kontrastní akcenty
- **Glassmorphism**: Efekt v headeru
- **Ironický/sarkastický vibe**: Hravý, komiksový tón

## 🚀 Funkce

### Header (Fixní/Sticky)
- Glassmorphism efekt s backdrop-filter
- Navigace s anchor odkazy
- CTA tlačítko "TOP / HOME"
- Zůstává viditelný při scrollu

### Sekce 1 - Hudba
- Grid karet s články
- Pixel-art obrázky
- Připraveno na napojení na databázi

### Sekce 2 - Gaming
- Velké redakční karty
- Znovupoužitelná komponenta
- Připraveno na budoucí rozšíření

### Sekce 3 - Playlisty
- 3 Spotify embedy
- Responzivní grid layout

### Footer
- Copyright informace
- Kontakt (mailto)
- Dynamické datum

## 🔧 Technické detaily

### CSS
- CSS Variables (design tokens)
- Flexbox + Grid
- Mobile-first responzivní design
- Glassmorphism efekty

### JavaScript
- Vanilla JS (bez frameworků)
- Dynamické plnění obsahu
- Smooth scroll navigace
- Připraveno na API integraci (SupaPages/Maxwell)

## 🔐 Admin Panel

Web obsahuje administrátorské rozhraní pro správu obsahu:

- **Soubor:** `admin.html`
- **Funkce:**
  - Autentizace (registrace/přihlášení)
  - Správa článků (přidat, upravit, smazat)
  - Správa playlistů (přidat, upravit, smazat)
  - Publikace/nepublikace záznamů

**Dokumentace:** Viz `ADMIN_SETUP.md`

## 📝 Budoucí rozšíření

- [x] Napojení na Supabase databázi
- [x] Admin panel pro správu obsahu
- [ ] Rozdělení na vícestránkový web
- [ ] Filtrace článků
- [ ] Video sekce pro gaming
- [ ] Další sekce dle potřeby

## 🌐 Hosting

Web je připraven pro statický hosting:
- GitHub Pages
- Netlify
- Vercel
- Jakýkoliv jiný statický hosting

## 📧 Kontakt

Email: info@goodvibegear.com
