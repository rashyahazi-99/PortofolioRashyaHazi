import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// ==========================================
// SUPABASE CONFIGURATION & DATA FETCHING
// ==========================================

const SUPABASE_URL = 'https://abdohhshnzhiwkbvbnzd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZG9oaHNobnpoaXdrYnZibnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1MzQ0NTIsImV4cCI6MjEwMjExMDQ1Mn0.wzoU84mEf0gywIqIXGK7PQ_7shHWkCg7I62RvZpHMJU';

let supabaseClient;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ==========================================
// MAIN LOGIC & DOM MANIPULATION
// ==========================================

document.addEventListener("DOMContentLoaded", async () => {
    console.log("Website Portofolio Rashya berhasil dimuat!");

    // 1. STICKY NAVBAR KETIKA SCROLL
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 1b. HAMBURGER MENU TOGGLE
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navLinks = document.querySelector(".nav-links");
    const navLinkItems = document.querySelectorAll(".nav-links li a");

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener("click", () => {
            hamburgerBtn.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        // Tutup menu otomatis jika link diklik
        navLinkItems.forEach(link => {
            link.addEventListener("click", () => {
                hamburgerBtn.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }

    // 2. EFEK ANIMASI MUNCUL (FADE IN UP) SAAT SCROLL
    window.initScrollAnimations = function() {
        const sectionsToAnimate = document.querySelectorAll(".section-title:not(.show), .about-desc:not(.show), .glass-card:not(.show), .gallery-item:not(.show)");
        
        sectionsToAnimate.forEach(el => {
            if (!el.classList.contains("fade-in")) {
                el.classList.add("fade-in");
            }
        });

        const appearOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const appearOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, appearOptions);

        sectionsToAnimate.forEach(section => {
            appearOnScroll.observe(section);
        });
    };

    window.initScrollAnimations();

    // 3. THEME TOGGLE (Light/Dark Mode)
    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "dark";
    if (currentTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        themeToggleBtn.innerText = "Light Mode";
    }

    themeToggleBtn.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");
        if (theme === "light") {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "dark");
            themeToggleBtn.innerText = "Dark Mode";
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            themeToggleBtn.innerText = "Light Mode";
        }
    });

    // 4. FORM VALIDATION
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Mencegah reload halaman
            
            const nameInput = document.getElementById("name").value.trim();
            const messageInput = document.getElementById("message").value.trim();
            
            // Validasi sederhana sesuai soal ujian
            if (nameInput === "" || messageInput === "") {
                alert("Peringatan: Kolom Nama dan Pesan tidak boleh kosong!");
            } else {
                alert("Pesan berhasil dikirim!");
                contactForm.reset();
            }
        });
    }

    // 5. FETCH DATA DARI SUPABASE
    if (supabaseClient) {
        console.log("Menghubungkan ke Supabase...");
        await fetchProjects();
        await fetchGallery();
        
        // Re-inisialisasi animasi untuk elemen baru
        if (typeof window.initScrollAnimations === "function") {
            window.initScrollAnimations();
        }
    } else {
        console.warn("⚠️ Supabase client tidak tersedia.");
    }
});

// Fungsi untuk mengambil data projek
async function fetchProjects() {
    try {
        // Asumsi nama tabel adalah 'projects' (sesuaikan jika berbeda di database)
        const { data: projects, error } = await supabaseClient
            .from('projects')
            .select('*');
            // Menghapus order 'project_date' untuk menghindari error jika kolom tidak ada
            // (karena di soal hanya diminta kolom: id, judul, deskripsi, gambar_url)

        if (error) throw error;

        const container = document.getElementById('projects-container');
        if (projects && projects.length > 0) {
            container.innerHTML = ''; // Kosongkan placeholder
            projects.forEach(project => {
                // Gunakan properti sesuai dengan kemungkinan di database (judul, deskripsi, dll)
                // Di sini menggunakan fallback antara properti bahasa inggris (default) atau bahasa indonesia
                const imgUrl = project.gambar_url || project.image_url || '';
                const title = project.judul || project.title || 'Proyek Tanpa Judul';
                const desc = project.deskripsi || project.description || '';
                
                const card = `
                    <div class="project-card glass-card fade-in">
                        ${imgUrl ? `<img src="${imgUrl}" alt="${title}" style="width: 100%; height: 200px; object-fit: cover; border-bottom: 1px solid rgba(255,255,255,0.1);">` : '<div class="project-img-placeholder"></div>'}
                        <div class="project-info">
                            <h3>${title}</h3>
                            <p>${desc}</p>
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
        const { data: gallery, error } = await supabaseClient
            .from('activities_gallery')
            .select('*');

        if (error) throw error;

        const container = document.getElementById('gallery-container');
        if (gallery && gallery.length > 0) {
            container.innerHTML = ''; // Kosongkan placeholder
            gallery.forEach(item => {
                const imgUrl = item.image_url || '';
                const title = item.title || '';
                
                const card = `
                    <div class="gallery-item glass-card fade-in">
                        ${imgUrl ? `<img src="${imgUrl}" alt="${title}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 12px; margin-bottom: 1rem;">` : '<div class="gallery-img-placeholder"></div>'}
                        <p>${title}</p>
                    </div>
                `;
                container.innerHTML += card;
            });
        }
    } catch (error) {
        console.error("Error fetching gallery:", error.message);
    }
}
