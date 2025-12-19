/**
 * Good Vibe Gear & Gaming - Main JavaScript
 * Vanilla JS pro interaktivitu a dynamické plnění obsahu
 * Integrace s Supabase databází
 */

// ============================================
// SUPABASE INITIALIZATION
// ============================================

let supabaseClient = null;

/**
 * Inicializuje Supabase klienta
 */
function initSupabase() {
    // Kontrola, zda je Supabase SDK načten
    if (typeof supabase === 'undefined') {
        console.error('Supabase SDK není načten. Zkontrolujte, že je přidán do HTML.');
        return null;
    }
    
    // Kontrola konfigurace
    if (!SUPABASE_CONFIG || !SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) {
        console.error('Supabase konfigurace není nastavena. Zkontrolujte js/config.js');
        return null;
    }
    
    // Kontrola, zda nejsou placeholder hodnoty
    if (SUPABASE_CONFIG.url === 'YOUR_SUPABASE_URL' || 
        SUPABASE_CONFIG.anonKey === 'YOUR_SUPABASE_ANON_KEY') {
        console.warn('Supabase konfigurace obsahuje placeholder hodnoty. Použijí se mock data.');
        return null;
    }
    
    try {
        supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
        console.log('Supabase klient inicializován');
        return supabaseClient;
    } catch (error) {
        console.error('Chyba při inicializaci Supabase:', error);
        return null;
    }
}

// ============================================
// LOADING STATES
// ============================================

/**
 * Zobrazí loading stav v kontejneru
 */
function showLoading(containerId, message = 'Načítám...') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <div class="loading-state" style="
            text-align: center;
            padding: 3rem;
            color: var(--color-text-secondary);
        ">
            <div style="
                display: inline-block;
                width: 40px;
                height: 40px;
                border: 4px solid var(--color-border);
                border-top-color: var(--color-accent-primary);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
            <p style="margin-top: 1rem;">${message}</p>
        </div>
    `;
}

/**
 * Zobrazí chybový stav
 */
function showError(containerId, message = 'Chyba při načítání dat') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <div class="error-state" style="
            text-align: center;
            padding: 3rem;
            color: var(--color-accent-primary);
        ">
            <p style="font-size: 1.25rem; margin-bottom: 0.5rem;">⚠️</p>
            <p>${message}</p>
            <p style="font-size: 0.875rem; color: var(--color-text-secondary); margin-top: 0.5rem;">
                Zkontrolujte konzoli pro více informací.
            </p>
        </div>
    `;
}

/**
 * Zobrazí prázdný stav
 */
function showEmpty(containerId, message = 'Žádná data k zobrazení') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <div class="empty-state" style="
            text-align: center;
            padding: 3rem;
            color: var(--color-text-secondary);
        ">
            <p>${message}</p>
        </div>
    `;
}

// Přidáme CSS animaci pro loading spinner
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Formátuje datum pro zobrazení
 */
function formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    return date.toLocaleDateString('cs-CZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Mapuje data z databáze na formát pro renderování
 */
function mapArticleFromDB(dbArticle) {
    return {
        id: dbArticle.id,
        title: dbArticle.title,
        perex: dbArticle.perex,
        image: dbArticle.image_url || null,
        date: dbArticle.published_date,
        category: dbArticle.category
    };
}

function mapPlaylistFromDB(dbPlaylist) {
    return {
        id: dbPlaylist.id,
        title: dbPlaylist.title,
        description: dbPlaylist.description || '',
        spotifyId: dbPlaylist.spotify_id,
        embedUrl: dbPlaylist.embed_url
    };
}

// ============================================
// DYNAMIC CONTENT RENDERING
// ============================================

/**
 * Vykreslí články do gridu
 */
function renderArticles(articles, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (!articles || articles.length === 0) {
        showEmpty(containerId, 'Žádné články k zobrazení');
        return;
    }
    
    container.innerHTML = '';
    
    articles.forEach(article => {
        const card = document.createElement('article');
        card.className = 'article-card';
        
        // Obrázek nebo placeholder
        const imageHtml = article.image 
            ? `<img src="${article.image}" alt="${article.title}" class="article-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
            : '';
        
        const placeholderHtml = `<div class="article-image-placeholder" style="display: ${article.image ? 'none' : 'flex'};">${article.title ? article.title.substring(0, 1).toUpperCase() : '?'}</div>`;
        
        card.innerHTML = `
            ${imageHtml}
            ${placeholderHtml}
            <div class="article-content">
                <h3 class="article-title">${article.title || 'Bez názvu'}</h3>
                <p class="article-perex">${article.perex || ''}</p>
                <div class="article-meta">
                    <span>${article.category || 'Obecné'}</span> • <span>${formatDate(article.date)}</span>
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
    
    if (!playlists || playlists.length === 0) {
        showEmpty('playlists-container', 'Žádné playlisty k zobrazení');
        return;
    }
    
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
                <h3 class="playlist-title">${playlist.title || 'Bez názvu'}</h3>
                <p class="playlist-description">${playlist.description || ''}</p>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// ============================================
// SUPABASE DATA FETCHING
// ============================================

/**
 * Načte hudební články z Supabase
 */
async function fetchMusicArticles() {
    if (!supabaseClient) {
        console.warn('Supabase není inicializován, používám mock data');
        return getMockMusicArticles();
    }
    
    try {
        showLoading('music-articles', 'Načítám články o hudbě...');
        
        const { data, error } = await supabaseClient
            .from('articles')
            .select('*')
            .eq('section', 'music')
            .eq('published', true)
            .order('order_index', { ascending: true })
            .order('published_date', { ascending: false });
        
        if (error) {
            console.error('Chyba při načítání hudebních článků:', error);
            showError('music-articles', 'Nepodařilo se načíst články o hudbě');
            return getMockMusicArticles();
        }
        
        if (!data || data.length === 0) {
            console.warn('Žádné hudební články v databázi');
            return getMockMusicArticles();
        }
        
        return data.map(mapArticleFromDB);
        
    } catch (error) {
        console.error('Neočekávaná chyba při načítání hudebních článků:', error);
        showError('music-articles', 'Chyba při načítání dat');
        return getMockMusicArticles();
    }
}

/**
 * Načte gaming články z Supabase
 */
async function fetchGamingArticles() {
    if (!supabaseClient) {
        console.warn('Supabase není inicializován, používám mock data');
        return getMockGamingArticles();
    }
    
    try {
        showLoading('gaming-articles', 'Načítám gaming články...');
        
        const { data, error } = await supabaseClient
            .from('articles')
            .select('*')
            .eq('section', 'gaming')
            .eq('published', true)
            .order('order_index', { ascending: true })
            .order('published_date', { ascending: false });
        
        if (error) {
            console.error('Chyba při načítání gaming článků:', error);
            showError('gaming-articles', 'Nepodařilo se načíst gaming články');
            return getMockGamingArticles();
        }
        
        if (!data || data.length === 0) {
            console.warn('Žádné gaming články v databázi');
            return getMockGamingArticles();
        }
        
        return data.map(mapArticleFromDB);
        
    } catch (error) {
        console.error('Neočekávaná chyba při načítání gaming článků:', error);
        showError('gaming-articles', 'Chyba při načítání dat');
        return getMockGamingArticles();
    }
}

/**
 * Načte playlisty z Supabase
 */
async function fetchPlaylists() {
    if (!supabaseClient) {
        console.warn('Supabase není inicializován, používám mock data');
        return getMockPlaylists();
    }
    
    try {
        showLoading('playlists-container', 'Načítám playlisty...');
        
        const { data, error } = await supabaseClient
            .from('playlists')
            .select('*')
            .eq('published', true)
            .order('order_index', { ascending: true });
        
        if (error) {
            console.error('Chyba při načítání playlistů:', error);
            showError('playlists-container', 'Nepodařilo se načíst playlisty');
            return getMockPlaylists();
        }
        
        if (!data || data.length === 0) {
            console.warn('Žádné playlisty v databázi');
            return getMockPlaylists();
        }
        
        return data.map(mapPlaylistFromDB);
        
    } catch (error) {
        console.error('Neočekávaná chyba při načítání playlistů:', error);
        showError('playlists-container', 'Chyba při načítání dat');
        return getMockPlaylists();
    }
}

// ============================================
// MOCK DATA (fallback)
// ============================================

function getMockMusicArticles() {
    return [
        {
            id: 1,
            title: "Historie House Music",
            perex: "House music se zrodil v Chicagu v 80. letech jako reakce na disco. Zjistěte, jak tento žánr ovlivnil celosvětovou klubovou scénu a proč je stále relevantní.",
            image: null,
            date: "2024-01-15",
            category: "Historie"
        },
        {
            id: 2,
            title: "Disco 70. let: Zlatá éra taneční hudby",
            perex: "Sedmdesátá léta přinesla disco revoluci. Od Studio 54 po Saturday Night Fever - prozkoumejte éru, která navždy změnila způsob, jakým tančíme.",
            image: null,
            date: "2024-01-10",
            category: "Historie"
        }
    ];
}

function getMockGamingArticles() {
    return [
        {
            id: 1,
            title: "Retro Gaming Revival: Proč se vracíme k klasice",
            perex: "Retro hry zažívají renesanci. Zjistěte, proč hráči stále milují pixely, jednoduchou mechaniku a nostalgii 8-bitové éry.",
            image: null,
            date: "2024-01-12",
            category: "Retro"
        }
    ];
}

function getMockPlaylists() {
    return [
        {
            id: 1,
            title: "House Classics",
            description: "Nejlepší house tracky všech dob - od Chicaga po současnost",
            spotifyId: "37i9dQZF1DX0XUsuxWHRQd",
            embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd"
        }
    ];
}

// ============================================
// HEADER SCROLL BEHAVIOR
// ============================================

/**
 * Přidá shadow efekt na header při scrollu
 */
function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.6)';
        } else {
            header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.4)';
        }
    });
}

// ============================================
// SMOOTH SCROLL & ANCHOR NAVIGATION
// ============================================

/**
 * Zajistí plynulý scroll na anchor odkazy
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#home') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// FOOTER DYNAMIC CONTENT
// ============================================

/**
 * Naplní footer aktuálními daty
 */
function initFooter() {
    const currentYear = new Date().getFullYear();
    const creationYear = 2024;
    const lastUpdate = new Date().toLocaleDateString('cs-CZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const yearElement = document.getElementById('current-year');
    const creationElement = document.getElementById('creation-year');
    const updateElement = document.getElementById('last-update');
    
    if (yearElement) yearElement.textContent = currentYear;
    if (creationElement) creationElement.textContent = creationYear;
    if (updateElement) updateElement.textContent = lastUpdate;
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Inicializace aplikace po načtení DOM
 */
async function init() {
    // Počkáme na načtení DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    // Inicializujeme Supabase
    initSupabase();
    
    // Inicializujeme interaktivitu (nezávisle na databázi)
    initSmoothScroll();
    handleHeaderScroll();
    initFooter();
    
    // Načteme obsah z databáze (nebo mock data)
    try {
        const [musicArticles, gamingArticles, playlists] = await Promise.all([
            fetchMusicArticles(),
            fetchGamingArticles(),
            fetchPlaylists()
        ]);
        
        renderArticles(musicArticles, 'music-articles');
        renderArticles(gamingArticles, 'gaming-articles');
        renderPlaylists(playlists);
        
        console.log('✅ Good Vibe Gear & Gaming - Web initialized');
        console.log(`📊 Načteno: ${musicArticles.length} hudebních článků, ${gamingArticles.length} gaming článků, ${playlists.length} playlistů`);
        
    } catch (error) {
        console.error('❌ Chyba při inicializaci:', error);
    }
}

// Spustíme inicializaci
init();
