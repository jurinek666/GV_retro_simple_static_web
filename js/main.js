/**
 * Good Vibe Gear & Gaming - Main JavaScript
 * Vanilla JS pro interaktivitu a dynamické plnění obsahu
 */

// ============================================
// MOCK DATA
// ============================================

const mockMusicArticles = [
    {
        id: 1,
        title: "Historie House Music",
        perex: "House music se zrodil v Chicagu v 80. letech jako reakce na disco. Zjistěte, jak tento žánr ovlivnil celosvětovou klubovou scénu a proč je stále relevantní.",
        image: "assets/images/music-house.jpg",
        date: "2024-01-15",
        category: "Historie"
    },
    {
        id: 2,
        title: "Disco 70. let: Zlatá éra taneční hudby",
        perex: "Sedmdesátá léta přinesla disco revoluci. Od Studio 54 po Saturday Night Fever - prozkoumejte éru, která navždy změnila způsob, jakým tančíme.",
        image: "assets/images/music-disco.jpg",
        date: "2024-01-10",
        category: "Historie"
    },
    {
        id: 3,
        title: "Základy hudební teorie pro DJs",
        perex: "Pochopení harmonie, rytmu a struktury skladeb je klíčové pro každého DJ. Tento článek vysvětluje základy srozumitelně a prakticky.",
        image: "assets/images/music-theory.jpg",
        date: "2024-01-05",
        category: "Teorie"
    },
    {
        id: 4,
        title: "Klubová scéna: Minulost vs. Současnost",
        perex: "Jak se změnila klubová kultura od 90. let do současnosti? Analýza trendů, technologií a sociálních změn v taneční hudbě.",
        image: "assets/images/music-club.jpg",
        date: "2023-12-28",
        category: "Kultura"
    },
    {
        id: 5,
        title: "Vývoj elektronické hudby: Od syntezátorů k AI",
        perex: "Technologie vždy formovaly hudbu. Prozkoumejte cestu od prvních syntezátorů přes samplery až po současné AI nástroje.",
        image: "assets/images/music-tech.jpg",
        date: "2023-12-20",
        category: "Technologie"
    },
    {
        id: 6,
        title: "Směr vývoje: Budoucnost taneční hudby",
        perex: "Kam se ubírá taneční hudba? Analýza současných trendů a predikce budoucího vývoje žánrů a technologií.",
        image: "assets/images/music-future.jpg",
        date: "2023-12-15",
        category: "Trendy"
    }
];

const mockGamingArticles = [
    {
        id: 1,
        title: "Retro Gaming Revival: Proč se vracíme k klasice",
        perex: "Retro hry zažívají renesanci. Zjistěte, proč hráči stále milují pixely, jednoduchou mechaniku a nostalgii 8-bitové éry.",
        image: "assets/images/gaming-retro.jpg",
        date: "2024-01-12",
        category: "Retro"
    },
    {
        id: 2,
        title: "Indie Games: Kreativita bez limitů",
        perex: "Nezávislí vývojáři posouvají hranice herního designu. Objevte nejzajímavější indie tituly posledních let a jejich inovace.",
        image: "assets/images/gaming-indie.jpg",
        date: "2024-01-08",
        category: "Indie"
    },
    {
        id: 3,
        title: "Herní mechaniky: Co dělá hru zábavnou?",
        perex: "Analýza herních mechanik, které vytvářejí závislost a zábavu. Od loopů přes progresi až po reward systémy.",
        image: "assets/images/gaming-mechanics.jpg",
        date: "2024-01-03",
        category: "Design"
    },
    {
        id: 4,
        title: "Pixel Art: Umění v herním designu",
        perex: "Pixel art není jen nostalgie - je to plnohodnotný umělecký styl. Prozkoumejte moderní pixel art hry a jejich estetiku.",
        image: "assets/images/gaming-pixel.jpg",
        date: "2023-12-30",
        category: "Vizuál"
    }
];

const mockPlaylists = [
    {
        id: 1,
        title: "House Classics",
        description: "Nejlepší house tracky všech dob - od Chicaga po současnost",
        spotifyId: "37i9dQZF1DX0XUsuxWHRQd",
        embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd"
    },
    {
        id: 2,
        title: "Disco Fever",
        description: "Zlatá éra disco hudby - funky, groovy a taneční",
        spotifyId: "37i9dQZF1DXa8n42306eJB",
        embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DXa8n42306eJB"
    },
    {
        id: 3,
        title: "Gaming Vibes",
        description: "Hudba inspirovaná hrami a herními soundtracky",
        spotifyId: "37i9dQZF1DX8UebH9nCpFT",
        embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX8UebH9nCpFT"
    }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('cs-CZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ============================================
// DYNAMIC CONTENT RENDERING
// ============================================

/**
 * Vykreslí články do gridu
 * UPRAVENO: Přidána podpora pro APP_ROOT (cesty v podadresářích)
 */
function renderArticles(articles, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Pokud jsme v podsložce, přidáme prefix k cestám (např. "../")
    const pathPrefix = window.APP_ROOT || '';
    
    container.innerHTML = '';
    
    articles.forEach(article => {
        const card = document.createElement('article');
        card.className = 'article-card';
        
        // Upravíme cestu k obrázku
        const imagePath = article.image ? pathPrefix + article.image : '';
        
        const imageHtml = imagePath 
            ? `<img src="${imagePath}" alt="${article.title}" class="article-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
            : '';
        
        const placeholderHtml = `<div class="article-image-placeholder" style="display: ${imagePath ? 'none' : 'flex'};">${article.title.substring(0, 1)}</div>`;
        
        card.innerHTML = `
            ${imageHtml}
            ${placeholderHtml}
            <div class="article-content">
                <h3 class="article-title">${article.title}</h3>
                <p class="article-perex">${article.perex}</p>
                <div class="article-meta">
                    <span>${article.category}</span> • <span>${formatDate(article.date)}</span>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

/**
 * Vykreslí playlisty do gridu
 */
function renderPlaylists(playlists) {
    const container = document.getElementById('playlists-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    playlists.forEach(playlist => {
        const card = document.createElement('div');
        card.className = 'playlist-card';
        
        card.innerHTML = `
            <iframe 
                class="playlist-embed"
                src="${playlist.embedUrl}?utm_source=generator&theme=0"
                width="100%"
                height="380"
                frameBorder="0"
                allowfullscreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy">
            </iframe>
            <div class="playlist-content">
                <h3 class="playlist-title">${playlist.title}</h3>
                <p class="playlist-description">${playlist.description}</p>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// ============================================
// HEADER & SCROLL BEHAVIOR
// ============================================

function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.6)';
        } else {
            header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.4)';
        }
    });
}

// ============================================
// FOOTER
// ============================================

function initFooter() {
    const currentYear = new Date().getFullYear();
    const creationYear = 2024;
    const lastUpdate = new Date().toLocaleDateString('cs-CZ', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    
    const yearElement = document.getElementById('current-year');
    const creationElement = document.getElementById('creation-year');
    const updateElement = document.getElementById('last-update');
    
    if (yearElement) yearElement.textContent = currentYear;
    if (creationElement) creationElement.textContent = creationYear;
    if (updateElement) updateElement.textContent = lastUpdate;
}

// ============================================
// DATA FETCHING
// ============================================

async function fetchMusicArticles() { return mockMusicArticles; }
async function fetchGamingArticles() { return mockGamingArticles; }
async function fetchPlaylists() { return mockPlaylists; }

// ============================================
// INITIALIZATION
// ============================================

async function init() {
    // Počkáme na DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    // Načteme data
    const musicArticles = await fetchMusicArticles();
    const gamingArticles = await fetchGamingArticles();
    const playlists = await fetchPlaylists();
    
    // Vykreslíme tam, kde existují příslušné kontejnery
    renderArticles(musicArticles, 'music-articles');
    renderArticles(gamingArticles, 'gaming-articles');
    renderPlaylists(playlists);
    
    handleHeaderScroll();
    initFooter();
}

init();