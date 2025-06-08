document.getElementById("btnHitung").addEventListener("click", function() {
    const currentMonth = parseInt(document.getElementById("currentMonth").value);
    const monthsAhead = parseInt(document.getElementById("monthsAhead").value);
    const hasil = document.getElementById("hasil");
    const errorMsg = document.getElementById("errorMsg");

    hasil.textContent = "Bulan pernikahan: -";
    errorMsg.textContent = "";

    if (currentMonth < 1 || currentMonth > 12) {
        errorMsg.textContent = "Bulan saat ini harus antara 1 dan 12.";
        return;
    }

    const weddingMonth = (currentMonth + monthsAhead) % 12;
    const finalMonth = weddingMonth === 0 ? 12 : weddingMonth;

    hasil.textContent = `Bulan pernikahan adalah bulan ke-${finalMonth}`;
    console.log(`Bulan saat ini: ${currentMonth}`);
    console.log(`Bulan ke depan: ${monthsAhead}`);
    console.log(`Bulan pernikahan: ${finalMonth}`);
});
