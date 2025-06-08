document.getElementById("btnHitung").addEventListener("click", function() {
    const jumlahPeserta = parseInt(document.getElementById("jumlahPeserta").value);
    const kapasitasMinibus = 7;
    const hasil = document.getElementById("hasil");

    if (isNaN(jumlahPeserta) || jumlahPeserta < 1) {
        hasil.textContent = "Silakan masukkan jumlah peserta yang valid.";
        return;
    }

    const jumlahMinibus = Math.ceil(jumlahPeserta / kapasitasMinibus);
    hasil.textContent = `Jumlah minibus yang diperlukan: ${jumlahMinibus}`;
});
