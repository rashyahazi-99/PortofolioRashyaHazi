// ==========================================
// SUPABASE CONFIGURATION & DATA FETCHING
// ==========================================

// ⚠️ Ganti dengan URL dan ANON KEY dari project Supabase kamu
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';

// Inisialisasi Supabase Client (hanya jalan jika key sudah diisi)
let supabase;
if (SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

document.addEventListener("DOMContentLoaded", async () => {
    if (!supabase) {
        console.warn("⚠️ Supabase belum dikonfigurasi. Menampilkan data dummy untuk sementara.");
        return;
    }

    console.log("Menghubungkan ke Supabase...");
    await fetchProjects();
    await fetchGallery();
});

// Fungsi untuk mengambil data projek
async function fetchProjects() {
    try {
        const { data: projects, error } = await supabase
            .from('projects')
            .select('*')
            .order('project_date', { ascending: false });

        if (error) throw error;

        const container = document.getElementById('projects-container');
        if (projects.length > 0) {
            container.innerHTML = ''; // Kosongkan placeholder
            projects.forEach(project => {
                const card = `
                    <div class="project-card glass-card fade-in">
                        <img src="${project.image_url}" alt="${project.title}" style="width: 100%; height: 200px; object-fit: cover; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <div class="project-info">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            ${project.link ? `<a href="${project.link}" target="_blank" style="color: var(--accent-cyan); font-size: 0.9rem;">Lihat Projek &rarr;</a>` : ''}
                        </div>
                    </div>
                `;
                container.innerHTML += card;
            });
        }
    } catch (error) {
        console.error("Error fetching projects:", error.message);
    }
}

// Fungsi untuk mengambil data galeri foto
async function fetchGallery() {
    try {
        const { data: gallery, error } = await supabase
            .from('activities_gallery')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const container = document.getElementById('gallery-container');
        if (gallery.length > 0) {
            container.innerHTML = ''; // Kosongkan placeholder
            gallery.forEach(item => {
                const card = `
                    <div class="gallery-item glass-card fade-in">
                        <img src="${item.image_url}" alt="${item.title}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 12px; margin-bottom: 1rem;">
                        <p>${item.title}</p>
                    </div>
                `;
                container.innerHTML += card;
            });
        }
    } catch (error) {
        console.error("Error fetching gallery:", error.message);
    }
}
