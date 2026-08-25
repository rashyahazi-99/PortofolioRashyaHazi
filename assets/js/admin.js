/**
 * ADMIN.JS - Logika CRUD, UI Dashboard, & Autentikasi untuk Halaman Admin
 */

document.addEventListener("DOMContentLoaded", async () => {
    // Referensi Elemen UI Login & Admin
    const loginSection = document.getElementById("login-section");
    const adminSection = document.getElementById("admin-section");
    const loginBtn = document.getElementById("btn-login");
    const logoutBtn = document.getElementById("btn-logout");
    
    // Cek Status Login Saat Halaman Dimuat
    checkUserStatus();

    // ==========================================
    // 1. AUTENTIKASI (LOGIN & LOGOUT)
    // ==========================================
    async function checkUserStatus() {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session) {
            loginSection.style.display = "none";
            adminSection.style.display = "flex"; // Menggunakan flex karena layout dashboard
            loadAllData(); // Muat semua data ke dashboard
        } else {
            loginSection.style.display = "flex";
            adminSection.style.display = "none";
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
    // 2. NAVIGASI TAB SIDEBAR
    // ==========================================
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const pageTitle = document.getElementById('page-title');

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Hilangkan status aktif dari semua tab
            navTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Tambahkan status aktif ke tab yang diklik
            tab.classList.add('active');
            
            // Munculkan konten yang sesuai
            const target = tab.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
            
            // Ubah judul navbar
            pageTitle.innerText = tab.innerText.replace(/[^\w\s]/gi, '').trim();
        });
    });

    // ==========================================
    // 3. LOAD SEMUA DATA
    // ==========================================
    function loadAllData() {
        loadPersonalInfo();
        loadSkillsHobbies();
        loadProjects();
        loadGallery();
    }

    // --- A. TAB PROFIL ---
    async function loadPersonalInfo() {
        const { data, error } = await supabaseClient.from('personal_info').select('*').limit(1).single();
        if (data) {
            document.getElementById("prof-name").value = data.full_name || "";
            document.getElementById("prof-tagline").value = data.taglines || "";
            document.getElementById("prof-bio-short").value = data.bio_description || "";
            document.getElementById("prof-img").value = data.profile_image_url || "";
            document.getElementById("prof-ig").value = data.instagram_url || "";
        }
    }

    document.getElementById("btn-save-profil").addEventListener("click", async () => {
        const btn = document.getElementById("btn-save-profil");
        btn.innerText = "Menyimpan...";
        
        const updates = {
            full_name: document.getElementById("prof-name").value,
            taglines: document.getElementById("prof-tagline").value,
            bio_description: document.getElementById("prof-bio-short").value,
            profile_image_url: document.getElementById("prof-img").value,
            instagram_url: document.getElementById("prof-ig").value
        };

        // Asumsikan kita punya 1 baris di tabel dengan ID tertentu, kita bisa coba insert atau update
        // (Untuk kesederhanaan, kita bisa asumsikan baris pertama sudah ada, atau kita ambil ID-nya)
        const { data: existingData } = await supabaseClient.from('personal_info').select('id').limit(1).single();
        
        if (existingData) {
            await supabaseClient.from('personal_info').update(updates).eq('id', existingData.id);
        } else {
            await supabaseClient.from('personal_info').insert([updates]);
        }
        
        btn.innerText = "Simpan Profil";
        alert("Profil berhasil diperbarui!");
    });

    // --- B. TAB KEAHLIAN & HOBI ---
    async function loadSkillsHobbies() {
        const { data, error } = await supabaseClient.from('skills_and_hobbies').select('*');
        if (error || !data) return;

        const tableSkills = document.getElementById("table-skills");
        const tableHobbies = document.getElementById("table-hobbies");
        tableSkills.innerHTML = ""; tableHobbies.innerHTML = "";

        data.forEach(item => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${item.name}</td>
                <td style="text-align:right;"><button class="action-btn btn-delete" onclick="deleteItem('skills_and_hobbies', '${item.id}')">Hapus</button></td>
            `;
            if (item.type === 'skill') tableSkills.appendChild(tr);
            else tableHobbies.appendChild(tr);
        });
    }

    // --- C. TAB PROJEK ---
    async function loadProjects() {
        const { data, error } = await supabaseClient.from('projects').select('*').order('created_at', { ascending: false });
        if (error || !data) return;

        document.getElementById("count-projects").innerText = data.length;
        const tbody = document.getElementById("table-projects");
        tbody.innerHTML = "";

        data.forEach(project => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><img src="${project.image_url}" alt="Img" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;"></td>
                <td><strong>${project.title}</strong><br><small>${project.description ? project.description.substring(0, 30) + '...' : ''}</small></td>
                <td>
                    <button class="action-btn btn-edit" onclick="editItem('project', '${project.id}')">Edit</button>
                    <button class="action-btn btn-delete" onclick="deleteItem('projects', '${project.id}')">Hapus</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // --- D. TAB GALERI ---
    async function loadGallery() {
        const { data, error } = await supabaseClient.from('activities_gallery').select('*').order('created_at', { ascending: false });
        if (error || !data) return;

        document.getElementById("count-gallery").innerText = data.length;
        const tbody = document.getElementById("table-gallery");
        tbody.innerHTML = "";

        data.forEach(gal => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><img src="${gal.image_url}" alt="Img" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;"></td>
                <td>${gal.title}</td>
                <td>
                    <button class="action-btn btn-edit" onclick="editItem('gallery', '${gal.id}')">Edit</button>
                    <button class="action-btn btn-delete" onclick="deleteItem('activities_gallery', '${gal.id}')">Hapus</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // ==========================================
    // 4. MODAL DINAMIS & CREATE/DELETE UMUM
    // ==========================================
    const dynamicModal = document.getElementById("dynamic-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");
    const modalId = document.getElementById("modal-id");

    window.openModal = function(type) {
        modalId.value = ""; // Reset ID untuk mode Tambah
        if (type === 'skill') {
            modalTitle.innerText = "Tambah Keahlian / Hobi";
            modalBody.innerHTML = `
                <div class="form-group"><label>Tipe</label>
                    <select id="modal-type" class="form-control" style="background:#111;">
                        <option value="skill">Keahlian (Skill)</option><option value="hobby">Hobi (Hobby)</option>
                    </select>
                </div>
                <div class="form-group"><label>Nama</label><input type="text" id="modal-name" class="form-control"></div>
                <button class="btn btn-primary" style="width:100%" onclick="saveNewItem('skill')">Simpan</button>
            `;
        } else if (type === 'project') {
            modalTitle.innerText = "Tambah Projek Baru";
            modalBody.innerHTML = `
                <div class="form-group"><label>Judul</label><input type="text" id="modal-title-input" class="form-control"></div>
                <div class="form-group"><label>Deskripsi</label><textarea id="modal-desc" class="form-control" rows="3"></textarea></div>
                <div class="form-group"><label>Upload Gambar Baru (Kosongkan jika tidak diubah)</label><input type="file" id="modal-img-file" accept="image/*" class="form-control" style="background: rgba(0,0,0,0.4)"></div>
                <div class="form-group"><label>Link Projek (Opsional)</label><input type="text" id="modal-link" class="form-control"></div>
                <input type="hidden" id="modal-existing-img">
                <button id="btn-modal-save" class="btn btn-primary" style="width:100%" onclick="saveNewItem('project')">Simpan Projek</button>
            `;
        } else if (type === 'gallery') {
            modalTitle.innerText = "Tambah Foto Galeri";
            modalBody.innerHTML = `
                <div class="form-group"><label>Keterangan Foto</label><input type="text" id="modal-title-input" class="form-control"></div>
                <div class="form-group"><label>Upload Gambar Baru (Kosongkan jika tidak diubah)</label><input type="file" id="modal-img-file" accept="image/*" class="form-control" style="background: rgba(0,0,0,0.4)"></div>
                <input type="hidden" id="modal-existing-img">
                <button id="btn-modal-save" class="btn btn-primary" style="width:100%" onclick="saveNewItem('gallery')">Simpan Foto</button>
            `;
        }
        dynamicModal.style.display = "flex";
    };

    window.closeModal = function() {
        dynamicModal.style.display = "none";
    };

    async function uploadImage(file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { error } = await supabaseClient.storage.from('portfolio-images').upload(fileName, file);
        if (error) {
            alert("Upload gagal: " + error.message);
            return null;
        }
        const { data } = supabaseClient.storage.from('portfolio-images').getPublicUrl(fileName);
        return data.publicUrl;
    }

    window.saveNewItem = async function(type) {
        let errorMsg = null;
        const id = modalId.value; // Jika ada, berarti Edit Mode

        if (type === 'skill') {
            const name = document.getElementById("modal-name").value;
            const t = document.getElementById("modal-type").value;
            if(!name) return alert("Nama wajib diisi!");
            const { error } = id ? 
                await supabaseClient.from('skills_and_hobbies').update({ name, type: t }).eq('id', id) : 
                await supabaseClient.from('skills_and_hobbies').insert([{ name, type: t }]);
            errorMsg = error;
        } else if (type === 'project' || type === 'gallery') {
            const btnSave = document.getElementById("btn-modal-save");
            btnSave.innerText = "Sedang Mengunggah...";
            btnSave.disabled = true;

            let finalImgUrl = document.getElementById("modal-existing-img")?.value || "";
            const fileInput = document.getElementById("modal-img-file");

            if (fileInput && fileInput.files.length > 0) {
                const uploadedUrl = await uploadImage(fileInput.files[0]);
                if (!uploadedUrl) {
                    btnSave.innerText = "Simpan";
                    btnSave.disabled = false;
                    return; // Gagal upload
                }
                finalImgUrl = uploadedUrl;
            }

            if (!finalImgUrl) {
                btnSave.innerText = "Simpan";
                btnSave.disabled = false;
                return alert("Gambar wajib diisi/diupload!");
            }

            if (type === 'project') {
                const title = document.getElementById("modal-title-input").value;
                const desc = document.getElementById("modal-desc").value;
                const link = document.getElementById("modal-link").value;
                if(!title) { btnSave.innerText = "Simpan Projek"; btnSave.disabled = false; return alert("Judul wajib diisi!"); }
                
                const { error } = id ? 
                    await supabaseClient.from('projects').update({ title, description: desc, image_url: finalImgUrl, link }).eq('id', id) : 
                    await supabaseClient.from('projects').insert([{ title, description: desc, image_url: finalImgUrl, link }]);
                errorMsg = error;
            } else {
                const title = document.getElementById("modal-title-input").value;
                if(!title) { btnSave.innerText = "Simpan Foto"; btnSave.disabled = false; return alert("Keterangan foto wajib diisi!"); }
                
                const { error } = id ? 
                    await supabaseClient.from('activities_gallery').update({ title, image_url: finalImgUrl }).eq('id', id) : 
                    await supabaseClient.from('activities_gallery').insert([{ title, image_url: finalImgUrl }]);
                errorMsg = error;
            }
        }

        if(errorMsg) alert("Gagal menyimpan: " + errorMsg.message);
        else {
            closeModal();
            loadAllData(); // Refresh UI
        }
    };

    window.editItem = async function(type, id) {
        openModal(type);
        modalId.value = id;
        modalTitle.innerText = "Edit " + (type === 'project' ? "Projek" : type === 'gallery' ? "Galeri" : "Data");

        const tableName = type === 'project' ? 'projects' : type === 'gallery' ? 'activities_gallery' : 'skills_and_hobbies';
        const { data, error } = await supabaseClient.from(tableName).select('*').eq('id', id).single();
        
        if (data && !error) {
            if (type === 'project') {
                document.getElementById("modal-title-input").value = data.title;
                document.getElementById("modal-desc").value = data.description;
                document.getElementById("modal-existing-img").value = data.image_url;
                document.getElementById("modal-link").value = data.link || "";
            } else if (type === 'gallery') {
                document.getElementById("modal-title-input").value = data.title;
                document.getElementById("modal-existing-img").value = data.image_url;
            }
        }
    };

    window.deleteItem = async function(tableName, id) {
        if(!confirm("Yakin ingin menghapus item ini?")) return;
        const { error } = await supabaseClient.from(tableName).delete().eq('id', id);
        if(error) alert("Gagal menghapus!");
        else loadAllData();
    };

});
