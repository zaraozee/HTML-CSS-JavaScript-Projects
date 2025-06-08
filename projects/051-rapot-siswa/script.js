document.addEventListener('DOMContentLoaded', function() {
    const tambahPelajaranBtn = document.getElementById('tambah-pelajaran');
    const mataPelajaranContainer = document.getElementById('mata-pelajaran-container');
    const hitungRapotBtn = document.getElementById('hitung-rapot');
    
    // Tambah mata pelajaran
    tambahPelajaranBtn.addEventListener('click', function() {
        const pelajaranDiv = document.createElement('div');
        pelajaranDiv.className = 'mata-pelajaran';
        pelajaranDiv.innerHTML = `
            <input type="text" class="nama-pelajaran" placeholder="Nama Pelajaran">
            <input type="number" class="nilai-pelajaran" placeholder="Nilai" min="0" max="100">
            <button class="hapus-pelajaran"><i class="fas fa-trash"></i></button>
        `;
        mataPelajaranContainer.appendChild(pelajaranDiv);
        
        // Tambah event listener untuk tombol hapus
        pelajaranDiv.querySelector('.hapus-pelajaran').addEventListener('click', function() {
            mataPelajaranContainer.removeChild(pelajaranDiv);
        });
    });
    
    // Hitung rapot
    hitungRapotBtn.addEventListener('click', function() {
        const namaSiswa = document.getElementById('nama-siswa').value;
        const kelas = document.getElementById('kelas').value;
        const semester = document.getElementById('semester').value;
        
        if (!namaSiswa) {
            alert('Silahkan masukkan nama siswa');
            return;
        }
        
        const pelajaranElements = document.querySelectorAll('.mata-pelajaran');
        if (pelajaranElements.length === 0) {
            alert('Silahkan tambahkan mata pelajaran');
            return;
        }
        
        const nilaiData = [];
        let totalNilai = 0;
        
        pelajaranElements.forEach(pelajaran => {
            const nama = pelajaran.querySelector('.nama-pelajaran').value;
            const nilai = parseFloat(pelajaran.querySelector('.nilai-pelajaran').value);
            
            if (!nama || isNaN(nilai)) {
                return;
            }
            
            nilaiData.push({ nama, nilai });
            totalNilai += nilai;
        });
        
        if (nilaiData.length === 0) {
            alert('Silahkan isi nilai untuk setidaknya satu mata pelajaran');
            return;
        }
        
        const rataRata = totalNilai / nilaiData.length;
        const predikat = getPredikat(rataRata);
        
        // Update output
        document.getElementById('output-nama').textContent = `Nama: ${namaSiswa}`;
        document.getElementById('output-kelas').textContent = `Kelas: ${kelas}`;
        document.getElementById('output-semester').textContent = `Semester: ${semester}`;
        
        const nilaiBody = document.getElementById('nilai-body');
        nilaiBody.innerHTML = '';
        
        nilaiData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.nama}</td>
                <td>${item.nilai}</td>
                <td>${getPredikat(item.nilai)}</td>
            `;
            nilaiBody.appendChild(row);
        });
        
        document.getElementById('rata-rata').textContent = rataRata.toFixed(2);
        document.getElementById('predikat').textContent = predikat;
    });
    
    function getPredikat(nilai) {
        if (nilai >= 90) return 'A (Sangat Baik)';
        if (nilai >= 80) return 'B (Baik)';
        if (nilai >= 70) return 'C (Cukup)';
        if (nilai >= 60) return 'D (Kurang)';
        return 'E (Sangat Kurang)';
    }
});