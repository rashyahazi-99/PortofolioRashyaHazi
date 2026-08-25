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

    // 2. EFEK ANIMASI MUNCUL (FADE IN UP) SAAT SCROLL (INTERSECTION OBSERVER)
    window.initScrollAnimations = function() {
        // Tambahkan class 'fade-in' ke elemen yang belum memiliki class 'show'
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
    };

    // Inisialisasi awal animasi
    window.initScrollAnimations();

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

    // Fitur Bahasa telah dihapus sesuai permintaan.

});
