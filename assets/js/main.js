/**
 * MAIN.JS - Logika Interaksi UI Frontend
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Website Portofolio Rashya berhasil dimuat! 🚀");

    // 1. STICKY NAVBAR KETIKA SCROLL
    const navbar = document.getElementById("navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. EFEK ANIMASI MUNCUL (FADE IN UP) SAAT SCROLL (INTERSECTION OBSERVER)
    // Tambahkan class 'fade-in' ke elemen yang ingin dianimasikan
    const sectionsToAnimate = document.querySelectorAll(".section-title, .about-desc, .glass-card, .gallery-item");
    
    sectionsToAnimate.forEach(el => {
        el.classList.add("fade-in");
    });

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Hentikan observasi setelah muncul
            }
        });
    }, appearOptions);

    sectionsToAnimate.forEach(section => {
        appearOnScroll.observe(section);
    });

    // 3. INTEGRASI SUPABASE (Persiapan)
    // Nanti logika fetch data (Keahlian, Hobi, Projek) diletakkan di file supabase.js 
    // dan dipanggil ke sini.

    // 4. THEME TOGGLE (Light/Dark Mode)
    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "dark";
    if (currentTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        themeToggleBtn.innerText = "☀️";
    }

    themeToggleBtn.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");
        if (theme === "light") {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "dark");
            themeToggleBtn.innerText = "🌙";
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            themeToggleBtn.innerText = "☀️";
        }
    });

    // 5. LANGUAGE TOGGLE (ID/EN)
    const langToggleBtn = document.getElementById("lang-toggle");
    let currentLang = localStorage.getItem("lang") || "id";
    if (currentLang === "en") langToggleBtn.innerText = "EN";

    const translations = {
        id: {
            nav_home: "Beranda", nav_about: "Tentang", nav_projects: "Projek", nav_gallery: "Galeri", nav_contact: "Kontak",
            hero_greeting: "Halo, kenalkan nama saya", hero_role: "Siswa Komputer Desain Grafis & Kesehatan",
            hero_bio: "Saya berasal dari Cianjur, alumni SMK NURULFALAH, Cikalong Kulon. Senang bereksplorasi dengan desain dan alam.",
            btn_projects: "Lihat Projek", btn_contact: "Hubungi Saya",
            about_title_1: "Tentang", about_title_2: "Saya",
            about_subtitle: "Kenal Lebih Dekat", about_text: "Perkenalkan, nama saya Rashya Hazimulfikri Widyadhana. Saya memiliki minat besar di bidang komputer desain grafis dan juga latar belakang di bidang kesehatan. Saya selalu antusias mempelajari hal baru dan menghadapi tantangan.",
            skills_title: "Keahlian", skill_1: "Desain Grafis", skill_2: "Kesehatan",
            hobbies_title: "Hobi", hobby_1: "Masak", hobby_2: "Bermain / Menjelajahi Alam",
            projects_title_1: "Projek", projects_title_2: "Terbaru",
            gallery_title_1: "Galeri", gallery_title_2: "Kegiatan",
            contact_title_1: "Mari", contact_title_2: "Terhubung",
            contact_text: "Punya ide projek atau sekedar ingin menyapa? Jangan ragu untuk menghubungi saya!", contact_btn: "Kunjungi Instagram Saya",
            footer_text: "Dibuat dengan ❤️"
        },
        en: {
            nav_home: "Home", nav_about: "About", nav_projects: "Projects", nav_gallery: "Gallery", nav_contact: "Contact",
            hero_greeting: "Hello, my name is", hero_role: "Graphic Design Computer & Health Student",
            hero_bio: "I am from Cianjur, alumni of SMK NURULFALAH, Cikalong Kulon. I love exploring design and nature.",
            btn_projects: "View Projects", btn_contact: "Contact Me",
            about_title_1: "About", about_title_2: "Me",
            about_subtitle: "Get to Know Me", about_text: "Let me introduce myself, I am Rashya Hazimulfikri Widyadhana. I have a great interest in graphic design and also a background in health. I am always enthusiastic about learning new things and facing challenges.",
            skills_title: "Skills", skill_1: "Graphic Design", skill_2: "Health Care",
            hobbies_title: "Hobbies", hobby_1: "Cooking", hobby_2: "Exploring Nature",
            projects_title_1: "Latest", projects_title_2: "Projects",
            gallery_title_1: "Activity", gallery_title_2: "Gallery",
            contact_title_1: "Let's", contact_title_2: "Connect",
            contact_text: "Have a project idea or just want to say hi? Don't hesitate to reach out!", contact_btn: "Visit My Instagram",
            footer_text: "Made with ❤️"
        }
    };

    function updateLanguage(lang) {
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });
    }

    // Initialize Language
    if (currentLang === "en") updateLanguage("en");

    langToggleBtn.addEventListener("click", () => {
        currentLang = currentLang === "id" ? "en" : "id";
        localStorage.setItem("lang", currentLang);
        langToggleBtn.innerText = currentLang.toUpperCase();
        updateLanguage(currentLang);
    });

});
