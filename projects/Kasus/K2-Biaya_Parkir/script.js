document.getElementById("btnHitung").addEventListener("click", function() {
    const jamMasuk = parseInt(document.getElementById("jamMasuk").value);
    const jamKeluar = parseInt(document.getElementById("jamKeluar").value);
    const hasil = document.getElementById("hasil");
    const errorMsg = document.getElementById("errorMsg");

    hasil.textContent = "Biaya parkir: -";
    errorMsg.textContent = "";

    if (0 <= jamMasuk && jamMasuk < 24 && 0 <= jamKeluar && jamKeluar < 24 && jamKeluar > jamMasuk) {
        const lamaParkir = jamKeluar - jamMasuk;
        const biayaParkir = (lamaParkir <= 2) ? 2000 : 2000 + (lamaParkir - 2) * 500;
        hasil.textContent = `Biaya parkir: Rp${biayaParkir}`;
    } else {
        errorMsg.textContent = "Jam masuk dan jam keluar tidak valid. Silakan coba lagi.";
    }
});
