document.getElementById("btnHitung").addEventListener("click", function() {
    const jamMulai = parseInt(document.getElementById("jamMulai").value);
    const menitMulai = parseInt(document.getElementById("menitMulai").value);
    const jamSelesai = parseInt(document.getElementById("jamSelesai").value);
    const menitSelesai = parseInt(document.getElementById("menitSelesai").value);
    const hasil = document.getElementById("hasil");
    const errorMsg = document.getElementById("errorMsg");

    hasil.textContent = "Selisih waktu: -";
    errorMsg.textContent = "";

    if (
        (0 <= jamMulai && jamMulai < 24) &&
        (0 <= menitMulai && menitMulai < 60) &&
        (0 <= jamSelesai && jamSelesai < 24) &&
        (0 <= menitSelesai && menitSelesai < 60)
    ) {
        const totalMulai = jamMulai * 60 + menitMulai;
        const totalSelesai = jamSelesai * 60 + menitSelesai;
        let selisihMenit = totalSelesai - totalMulai;

        if (selisihMenit < 0) selisihMenit += 1440; // Menambahkan 24 jam dalam menit jika selisih negatif

        const selisihJam = Math.floor(selisihMenit / 60);
        const sisaMenit = selisihMenit % 60;

        hasil.textContent = `Selisih waktu: ${selisihJam} jam ${sisaMenit} menit`;
    } else {
        errorMsg.textContent = "Jam dan menit tidak valid. Silakan coba lagi.";
    }
});
