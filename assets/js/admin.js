/**
 * ADMIN.JS - Logika CRUD & Autentikasi untuk Halaman Admin
 */

document.addEventListener("DOMContentLoaded", async () => {
    // Referensi Elemen UI
    const loginSection = document.getElementById("login-section");
    const adminSection = document.getElementById("admin-section");
    const loginBtn = document.getElementById("btn-login");
    const logoutBtn = document.getElementById("btn-logout");
    const saveProjectBtn = document.getElementById("btn-save-project");
    
    // Cek Status Login Saat Halaman Dimuat
    checkUserStatus();

    // ==========================================
    // 1. AUTENTIKASI (LOGIN & LOGOUT)
    // ==========================================
    async function checkUserStatus() {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session) {
            // Jika sudah login, tampilkan dashboard
            loginSection.style.display = "none";
            adminSection.style.display = "block";
            document.body.style.justifyContent = "flex-start"; // Perbaiki layout
            loadAdminProjects(); // Muat data tabel
        } else {
            // Jika belum login, tampilkan form login
            loginSection.style.display = "block";
            adminSection.style.display = "none";
            document.body.style.justifyContent = "center";
        }
    }

    loginBtn.addEventListener("click", async () => {
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        const errorMsg = document.getElementById("login-error");

        loginBtn.innerText = "Loading...";
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });

        loginBtn.innerText = "Masuk";

        if (error) {
            errorMsg.style.display = "block";
            errorMsg.innerText = "Error: " + error.message;
        } else {
            errorMsg.style.display = "none";
            checkUserStatus();
        }
    });

    logoutBtn.addEventListener("click", async () => {
        await supabaseClient.auth.signOut();
        checkUserStatus();
    });

    // ==========================================
    // 2. CRUD: READ (Menampilkan Data di Tabel)
    // ==========================================
    async function loadAdminProjects() {
        const { data: projects, error } = await supabaseClient
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Gagal memuat data:", error);
            return;
        }

        const tableBody = document.getElementById("admin-projects-table");
        tableBody.innerHTML = ""; // Bersihkan tabel

        projects.forEach(project => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${project.title}</strong></td>
                <td>${project.description ? project.description.substring(0, 50) + "..." : "-"}</td>
                <td>
                    <button class="action-btn btn-edit" onclick="editProject('${project.id}')">Edit</button>
                    <button class="action-btn btn-delete" onclick="deleteProject('${project.id}')">Hapus</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    // ==========================================
    // 3. CRUD: CREATE & UPDATE (Simpan Data)
    // ==========================================
    saveProjectBtn.addEventListener("click", async () => {
        const id = document.getElementById("project-id").value; // Jika ada ID, berarti mode EDIT
        const title = document.getElementById("project-title").value;
        const description = document.getElementById("project-desc").value;
        const imageUrl = document.getElementById("project-img").value;
        const link = document.getElementById("project-link").value;

        if (!title || !imageUrl) {
            alert("Judul dan URL Gambar wajib diisi!");
            return;
        }

        saveProjectBtn.innerText = "Menyimpan...";

        if (id) {
            // Mode UPDATE (Edit)
            const { error } = await supabaseClient
                .from('projects')
                .update({ title, description, image_url: imageUrl, link })
                .eq('id', id);
            
            if (!error) alert("Berhasil diubah!");
        } else {
            // Mode CREATE (Tambah Baru)
            const { error } = await supabaseClient
                .from('projects')
                .insert([{ title, description, image_url: imageUrl, link, project_date: new Date() }]);
            
            if (!error) alert("Berhasil ditambahkan!");
        }

        saveProjectBtn.innerText = "Simpan Projek";
        closeModal();
        loadAdminProjects(); // Refresh tabel
    });

    // ==========================================
    // 4. CRUD: DELETE (Hapus Data)
    // ==========================================
    window.deleteProject = async function(id) {
        const confirmDelete = confirm("Apakah kamu yakin ingin menghapus projek ini?");
        if (!confirmDelete) return;

        const { error } = await supabaseClient
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) {
            alert("Gagal menghapus: " + error.message);
        } else {
            loadAdminProjects(); // Refresh tabel
        }
    }

    // ==========================================
    // 5. MODAL CONTROL (Fungsi Buka/Tutup Pop-up)
    // ==========================================
    window.openModal = function(mode = 'project') {
        // Kosongkan form
        document.getElementById("project-id").value = "";
        document.getElementById("project-title").value = "";
        document.getElementById("project-desc").value = "";
        document.getElementById("project-img").value = "";
        document.getElementById("project-link").value = "";
        
        document.getElementById("modal-title").innerText = "Tambah Projek Baru";
        document.getElementById("project-modal").style.display = "flex";
    }

    window.closeModal = function() {
        document.getElementById("project-modal").style.display = "none";
    }

    // Fungsi untuk mengisi form saat tombol EDIT diklik
    window.editProject = async function(id) {
        // Ambil data spesifik dari Supabase
        const { data, error } = await supabaseClient
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();
            
        if (error || !data) return;

        // Isi form dengan data lama
        document.getElementById("project-id").value = data.id;
        document.getElementById("project-title").value = data.title;
        document.getElementById("project-desc").value = data.description;
        document.getElementById("project-img").value = data.image_url;
        document.getElementById("project-link").value = data.link || "";

        document.getElementById("modal-title").innerText = "Edit Projek";
        document.getElementById("project-modal").style.display = "flex";
    }

});
