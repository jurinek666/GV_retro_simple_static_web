# Budoucí rozšíření a poznámky

## Databázová integrace

### SupaPages / Maxwell integrace

V souboru `js/main.js` jsou připraveny funkce pro budoucí napojení na databázi:

```javascript
// Aktuálně vrací mock data
async function fetchMusicArticles() {
    // TODO: Nahradit skutečným API voláním
    // const response = await fetch('https://api.supapages.com/articles?category=music');
    // return await response.json();
    return mockMusicArticles;
}
```

**Kroky pro implementaci:**
1. Vytvořit SupaPages/Maxwell projekt
2. Nastavit databázové schéma pro články a playlisty
3. Vytvořit API endpointy
4. Nahradit mock data skutečnými API voláními
5. Přidat error handling a loading stavy

## Rozdělení na vícestránkový web

### Struktura pro budoucí rozdělení:

```
/
├── index.html          # Homepage
├── hudba/
│   └── index.html     # Sekce hudby
├── gaming/
│   └── index.html     # Sekce gaming
├── playlisty/
│   └── index.html     # Sekce playlistů
└── clanky/
    └── [slug].html    # Detail článku
```

**Poznámky:**
- Aktuální one-page struktura je připravena na snadné rozdělení
- Sekce jsou již oddělené a mohou být přesunuty do samostatných souborů
- Navigace může být rozšířena o více úrovní

## Filtrace článků

### Implementace filtru:

1. Přidat UI prvky pro filtry (kategorie, datum, tagy)
2. Implementovat filtrační logiku v JS
3. Přidat URL parametry pro shareable filtry
4. Integrovat s databázovým API

## Video sekce pro gaming

### Příprava:

- Sekce gaming je již připravena na rozšíření
- Můžeme přidat:
  - Video embedy (YouTube, Vimeo)
  - Gameplay sekce
  - Video playlisty

## Další vylepšení

- [ ] Search funkcionalita
- [ ] Tag systém
- [ ] Komentáře (disqus nebo vlastní)
- [ ] RSS feed
- [ ] Sitemap.xml
- [ ] SEO optimalizace
- [ ] Analytics integrace
- [ ] Dark/Light mode toggle
- [ ] Animace při scrollu (Intersection Observer)
- [ ] Lazy loading obrázků
- [ ] Service Worker pro offline podporu


