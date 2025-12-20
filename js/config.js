/**
 * Supabase Configuration
 * 
 * INSTRUKCE:
 * 1. Vytvořte projekt na https://supabase.com
 * 2. Jděte do Settings > API
 * 3. Zkopírujte "Project URL" a "anon public" klíč
 * 4. Vložte je níže
 * 
 * POZOR: Tento soubor obsahuje veřejné klíče (anon key)
 * Pro produkci zvažte použití environment variables
 */

const SUPABASE_CONFIG = {
    // Nahraďte těmito hodnotami z vašeho Supabase projektu:
    url: 'https://xxmyqsqhkljowezesjkl.supabase.co',           // např. 'https://xxxxx.supabase.co'
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtbXFzcWhrbGpvd2V6ZXNqazFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3MjI1MjEsImV4cCI6MjA1MDMwODUyMX0.rQ3XnW1z3-nNc96t-wYqWdI6Tz8B59_427h1XsRwKQ'   // anon public key z API settings
};

// Export pro použití v main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPABASE_CONFIG;
}

