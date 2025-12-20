/**
 * Admin Panel - Good Vibe Gear & Gaming
 * Správa článků a playlistů přes Supabase
 */

// ============================================
// SUPABASE INITIALIZATION
// ============================================

let supabaseClient = null;

function initSupabase() {
    if (typeof supabase === 'undefined') {
        console.error('Supabase SDK není načten');
        return null;
    }
    
    if (!SUPABASE_CONFIG || !SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) {
        console.error('Supabase konfigurace není nastavena');
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
// AUTHENTICATION
// ============================================

async function checkAuth() {
    if (!supabaseClient) return false;
    
    const { data: { session } } = await supabaseClient.auth.getSession();
    return !!session;
}

async function handleLogin(email, password) {
    if (!supabaseClient) {
        showError('login-error', 'Supabase není inicializován');
        return false;
    }
    
    try {
        showLoading(true);
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) throw error;
        
        if (data.session) {
            showDashboard();
            return true;
        }
        
        return false;
    } catch (error) {
        showError('login-error', error.message || 'Chyba při přihlašování');
        return false;
    } finally {
        showLoading(false);
    }
}

async function handleSignup(email, password) {
    if (!supabaseClient) {
        showError('signup-error', 'Supabase není inicializován');
        return false;
    }
    
    try {
        showLoading(true);
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password
        });
        
        if (error) throw error;
        
        if (data.user) {
            showSuccess('signup-success', 'Účet vytvořen! Nyní se můžete přihlásit.');
            setTimeout(() => {
                document.getElementById('show-login').click();
            }, 2000);
            return true;
        }
        
        return false;
    } catch (error) {
        showError('signup-error', error.message || 'Chyba při registraci');
        return false;
    } finally {
        showLoading(false);
    }
}

async function handleLogout() {
    if (!supabaseClient) return;
    
    try {
        await supabaseClient.auth.signOut();
        showLoginScreen();
    } catch (error) {
        console.error('Chyba při odhlašování:', error);
    }
}

// ============================================
// UI STATE MANAGEMENT
// ============================================

function showLoginScreen() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('admin-dashboard').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('signup-container').style.display = 'none';
}

function showDashboard() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'flex';
    loadUserInfo();
    loadArticles();
    loadPlaylists();
}

function showLoading(show) {
    document.getElementById('loading-overlay').style.display = show ? 'flex' : 'none';
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
    }
}

function hideError(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
    }
}

function showSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
    }
}

async function loadUserInfo() {
    if (!supabaseClient) return;
    
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (user) {
        document.getElementById('user-email').textContent = user.email;
    }
}

// ============================================
// ARTICLES CRUD
// ============================================

async function loadArticles() {
    if (!supabaseClient) return;
    
    try {
        showLoading(true);
        const { data, error } = await supabaseClient
            .from('articles')
            .select('*')
            .order('order_index', { ascending: true })
            .order('published_date', { ascending: false });
        
        if (error) throw error;
        
        renderArticles(data || []);
    } catch (error) {
        console.error('Chyba při načítání článků:', error);
        showError('articles-list', 'Nepodařilo se načíst články');
    } finally {
        showLoading(false);
    }
}

function renderArticles(articles) {
    const container = document.getElementById('articles-list');
    if (!container) return;
    
    if (articles.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--admin-text-secondary); padding: 2rem;">Žádné články</p>';
        return;
    }
    
    container.innerHTML = articles.map(article => `
        <div class="item-card">
            <div class="item-content">
                <div class="item-title">${escapeHtml(article.title)}</div>
                <div class="item-meta">
                    <span>${article.section === 'music' ? '🎵 Hudba' : '🎮 Gaming'}</span>
                    <span>•</span>
                    <span>${article.category}</span>
                    <span>•</span>
                    <span>${formatDate(article.published_date)}</span>
                </div>
                <div class="item-description">${escapeHtml(article.perex)}</div>
                <div class="item-badges">
                    ${article.published ? '<span class="badge badge-success">Publikováno</span>' : '<span class="badge badge-warning">Nepublikováno</span>'}
                    <span class="badge badge-primary">Pořadí: ${article.order_index}</span>
                </div>
            </div>
            <div class="item-actions">
                <button class="btn btn-secondary btn-sm" onclick="editArticle('${article.id}')">Upravit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteArticle('${article.id}')">Smazat</button>
            </div>
        </div>
    `).join('');
}

function openArticleModal(articleId = null) {
    const modal = document.getElementById('article-modal');
    const form = document.getElementById('article-form');
    const title = document.getElementById('article-modal-title');
    
    form.reset();
    hideError('article-form-error');
    
    if (articleId) {
        title.textContent = 'Upravit článek';
        loadArticleForEdit(articleId);
    } else {
        title.textContent = 'Přidat článek';
        document.getElementById('article-date').value = new Date().toISOString().split('T')[0];
    }
    
    modal.style.display = 'flex';
}

async function loadArticleForEdit(articleId) {
    if (!supabaseClient) return;
    
    try {
        showLoading(true);
        const { data, error } = await supabaseClient
            .from('articles')
            .select('*')
            .eq('id', articleId)
            .single();
        
        if (error) throw error;
        
        if (data) {
            document.getElementById('article-id').value = data.id;
            document.getElementById('article-title').value = data.title;
            document.getElementById('article-perex').value = data.perex;
            document.getElementById('article-image-url').value = data.image_url || '';
            document.getElementById('article-category').value = data.category;
            document.getElementById('article-section').value = data.section;
            document.getElementById('article-date').value = data.published_date;
            document.getElementById('article-order').value = data.order_index || 0;
            document.getElementById('article-published').checked = data.published;
        }
    } catch (error) {
        console.error('Chyba při načítání článku:', error);
        showError('article-form-error', 'Nepodařilo se načíst článek');
    } finally {
        showLoading(false);
    }
}

async function saveArticle(event) {
    event.preventDefault();
    
    if (!supabaseClient) {
        showError('article-form-error', 'Supabase není inicializován');
        return;
    }
    
    const id = document.getElementById('article-id').value;
    const articleData = {
        title: document.getElementById('article-title').value.trim(),
        perex: document.getElementById('article-perex').value.trim(),
        image_url: document.getElementById('article-image-url').value.trim() || null,
        category: document.getElementById('article-category').value.trim(),
        section: document.getElementById('article-section').value,
        published_date: document.getElementById('article-date').value,
        order_index: parseInt(document.getElementById('article-order').value) || 0,
        published: document.getElementById('article-published').checked
    };
    
    // Validace
    if (!articleData.title || !articleData.perex || !articleData.category) {
        showError('article-form-error', 'Vyplňte všechna povinná pole');
        return;
    }
    
    try {
        showLoading(true);
        hideError('article-form-error');
        
        let result;
        if (id) {
            // Update
            const { data, error } = await supabaseClient
                .from('articles')
                .update(articleData)
                .eq('id', id)
                .select()
                .single();
            
            if (error) throw error;
            result = data;
        } else {
            // Insert
            const { data, error } = await supabaseClient
                .from('articles')
                .insert(articleData)
                .select()
                .single();
            
            if (error) throw error;
            result = data;
        }
        
        closeArticleModal();
        loadArticles();
        
    } catch (error) {
        console.error('Chyba při ukládání článku:', error);
        showError('article-form-error', error.message || 'Nepodařilo se uložit článek');
    } finally {
        showLoading(false);
    }
}

async function deleteArticle(articleId) {
    if (!supabaseClient) return;
    
    if (!confirm('Opravdu chcete smazat tento článek?')) return;
    
    try {
        showLoading(true);
        const { error } = await supabaseClient
            .from('articles')
            .delete()
            .eq('id', articleId);
        
        if (error) throw error;
        
        loadArticles();
    } catch (error) {
        console.error('Chyba při mazání článku:', error);
        alert('Nepodařilo se smazat článek: ' + error.message);
    } finally {
        showLoading(false);
    }
}

function closeArticleModal() {
    document.getElementById('article-modal').style.display = 'none';
    document.getElementById('article-form').reset();
    hideError('article-form-error');
}

// ============================================
// PLAYLISTS CRUD
// ============================================

async function loadPlaylists() {
    if (!supabaseClient) return;
    
    try {
        showLoading(true);
        const { data, error } = await supabaseClient
            .from('playlists')
            .select('*')
            .order('order_index', { ascending: true });
        
        if (error) throw error;
        
        renderPlaylists(data || []);
    } catch (error) {
        console.error('Chyba při načítání playlistů:', error);
        showError('playlists-list', 'Nepodařilo se načíst playlisty');
    } finally {
        showLoading(false);
    }
}

function renderPlaylists(playlists) {
    const container = document.getElementById('playlists-list');
    if (!container) return;
    
    if (playlists.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--admin-text-secondary); padding: 2rem;">Žádné playlisty</p>';
        return;
    }
    
    container.innerHTML = playlists.map(playlist => `
        <div class="item-card">
            <div class="item-content">
                <div class="item-title">${escapeHtml(playlist.title)}</div>
                <div class="item-meta">
                    <span>Spotify ID: ${playlist.spotify_id}</span>
                    <span>•</span>
                    <span>${formatDate(playlist.created_at)}</span>
                </div>
                <div class="item-description">${escapeHtml(playlist.description || '')}</div>
                <div class="item-badges">
                    ${playlist.published ? '<span class="badge badge-success">Publikováno</span>' : '<span class="badge badge-warning">Nepublikováno</span>'}
                    <span class="badge badge-primary">Pořadí: ${playlist.order_index}</span>
                </div>
            </div>
            <div class="item-actions">
                <button class="btn btn-secondary btn-sm" onclick="editPlaylist('${playlist.id}')">Upravit</button>
                <button class="btn btn-danger btn-sm" onclick="deletePlaylist('${playlist.id}')">Smazat</button>
            </div>
        </div>
    `).join('');
}

function openPlaylistModal(playlistId = null) {
    const modal = document.getElementById('playlist-modal');
    const form = document.getElementById('playlist-form');
    const title = document.getElementById('playlist-modal-title');
    
    form.reset();
    hideError('playlist-form-error');
    
    if (playlistId) {
        title.textContent = 'Upravit playlist';
        loadPlaylistForEdit(playlistId);
    } else {
        title.textContent = 'Přidat playlist';
    }
    
    modal.style.display = 'flex';
}

async function loadPlaylistForEdit(playlistId) {
    if (!supabaseClient) return;
    
    try {
        showLoading(true);
        const { data, error } = await supabaseClient
            .from('playlists')
            .select('*')
            .eq('id', playlistId)
            .single();
        
        if (error) throw error;
        
        if (data) {
            document.getElementById('playlist-id').value = data.id;
            document.getElementById('playlist-title').value = data.title;
            document.getElementById('playlist-description').value = data.description || '';
            document.getElementById('playlist-spotify-id').value = data.spotify_id;
            document.getElementById('playlist-embed-url').value = data.embed_url;
            document.getElementById('playlist-order').value = data.order_index || 0;
            document.getElementById('playlist-published').checked = data.published;
        }
    } catch (error) {
        console.error('Chyba při načítání playlistu:', error);
        showError('playlist-form-error', 'Nepodařilo se načíst playlist');
    } finally {
        showLoading(false);
    }
}

async function savePlaylist(event) {
    event.preventDefault();
    
    if (!supabaseClient) {
        showError('playlist-form-error', 'Supabase není inicializován');
        return;
    }
    
    const id = document.getElementById('playlist-id').value;
    const playlistData = {
        title: document.getElementById('playlist-title').value.trim(),
        description: document.getElementById('playlist-description').value.trim() || null,
        spotify_id: document.getElementById('playlist-spotify-id').value.trim(),
        embed_url: document.getElementById('playlist-embed-url').value.trim(),
        order_index: parseInt(document.getElementById('playlist-order').value) || 0,
        published: document.getElementById('playlist-published').checked
    };
    
    // Validace
    if (!playlistData.title || !playlistData.spotify_id || !playlistData.embed_url) {
        showError('playlist-form-error', 'Vyplňte všechna povinná pole');
        return;
    }
    
    try {
        showLoading(true);
        hideError('playlist-form-error');
        
        let result;
        if (id) {
            // Update
            const { data, error } = await supabaseClient
                .from('playlists')
                .update(playlistData)
                .eq('id', id)
                .select()
                .single();
            
            if (error) throw error;
            result = data;
        } else {
            // Insert
            const { data, error } = await supabaseClient
                .from('playlists')
                .insert(playlistData)
                .select()
                .single();
            
            if (error) throw error;
            result = data;
        }
        
        closePlaylistModal();
        loadPlaylists();
        
    } catch (error) {
        console.error('Chyba při ukládání playlistu:', error);
        showError('playlist-form-error', error.message || 'Nepodařilo se uložit playlist');
    } finally {
        showLoading(false);
    }
}

async function deletePlaylist(playlistId) {
    if (!supabaseClient) return;
    
    if (!confirm('Opravdu chcete smazat tento playlist?')) return;
    
    try {
        showLoading(true);
        const { error } = await supabaseClient
            .from('playlists')
            .delete()
            .eq('id', playlistId);
        
        if (error) throw error;
        
        loadPlaylists();
    } catch (error) {
        console.error('Chyba při mazání playlistu:', error);
        alert('Nepodařilo se smazat playlist: ' + error.message);
    } finally {
        showLoading(false);
    }
}

function closePlaylistModal() {
    document.getElementById('playlist-modal').style.display = 'none';
    document.getElementById('playlist-form').reset();
    hideError('playlist-form-error');
}

// ============================================
// HELPER FUNCTIONS
// ============================================

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

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
    // Inicializace Supabase
    initSupabase();
    
    // Kontrola autentizace
    const isAuthenticated = await checkAuth();
    if (isAuthenticated) {
        showDashboard();
    } else {
        showLoginScreen();
    }
    
    // Login form
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        await handleLogin(email, password);
    });
    
    // Signup form
    document.getElementById('signup-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        await handleSignup(email, password);
    });
    
    // Toggle login/signup
    document.getElementById('show-signup').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('signup-container').style.display = 'block';
    });
    
    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('signup-container').style.display = 'none';
        document.getElementById('login-container').style.display = 'block';
    });
    
    // Logout
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    
    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            
            // Update buttons
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update content
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(`${tab}-tab`).classList.add('active');
        });
    });
    
    // Article form
    document.getElementById('add-article-btn').addEventListener('click', () => openArticleModal());
    document.getElementById('article-form').addEventListener('submit', saveArticle);
    document.getElementById('close-article-modal').addEventListener('click', closeArticleModal);
    document.getElementById('cancel-article').addEventListener('click', closeArticleModal);
    
    // Playlist form
    document.getElementById('add-playlist-btn').addEventListener('click', () => openPlaylistModal());
    document.getElementById('playlist-form').addEventListener('submit', savePlaylist);
    document.getElementById('close-playlist-modal').addEventListener('click', closePlaylistModal);
    document.getElementById('cancel-playlist').addEventListener('click', closePlaylistModal);
    
    // Close modal on outside click
    document.getElementById('article-modal').addEventListener('click', (e) => {
        if (e.target.id === 'article-modal') closeArticleModal();
    });
    
    document.getElementById('playlist-modal').addEventListener('click', (e) => {
        if (e.target.id === 'playlist-modal') closePlaylistModal();
    });
    
    // Auto-generate embed URL from Spotify ID
    document.getElementById('playlist-spotify-id').addEventListener('blur', (e) => {
        const spotifyId = e.target.value.trim();
        if (spotifyId && !document.getElementById('playlist-embed-url').value) {
            document.getElementById('playlist-embed-url').value = 
                `https://open.spotify.com/embed/playlist/${spotifyId}`;
        }
    });
});

// Global functions for onclick handlers
window.editArticle = (id) => openArticleModal(id);
window.deleteArticle = deleteArticle;
window.editPlaylist = (id) => openPlaylistModal(id);
window.deletePlaylist = deletePlaylist;

