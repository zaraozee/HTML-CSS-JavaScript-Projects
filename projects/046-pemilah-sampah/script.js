const kategoriSampah = {
  organik: ["sisa makanan", "daun", "kulit buah", "nasi", "sayuran", "buah busuk", "tulang", "ampas kopi", "teh celup"],
  anorganik: ["plastik", "botol plastik", "kertas", "kaleng", "gelas", "kardus", "stereofoam", "bungkus makanan", "sedotan", "kresek"],
  b3: ["baterai", "lampu", "obat", "cat", "oli", "aerosol", "alkohol", "racun tikus", "pembersih lantai", "pestisida"]
};

function pilahSampah() {
  const input = document.getElementById("sampahInput").value.toLowerCase().trim();
  const hasilDiv = document.getElementById("hasil");

  hasilDiv.className = "result";
  
  if (!input) {
    hasilDiv.innerHTML = `
      <div class="result-content">
        <i class="fas fa-exclamation-circle"></i> Masukkan nama sampah terlebih dahulu
      </div>
    `;
    return;
  }

  let resultHTML, resultClass;
  
  if (kategoriSampah.organik.includes(input)) {
    resultHTML = `
      <div class="result-content">
        <i class="fas fa-leaf"></i>
        <h3>Sampah Organik</h3>
        <p>${input} termasuk sampah organik yang dapat terurai</p>
        <p class="tips"><i class="fas fa-lightbulb"></i> Tips: Bisa dijadikan kompos</p>
      </div>
    `;
    resultClass = "result-organic";
  } else if (kategoriSampah.anorganik.includes(input)) {
    resultHTML = `
      <div class="result-content">
        <i class="fas fa-recycle"></i>
        <h3>Sampah Anorganik</h3>
        <p>${input} termasuk sampah anorganik yang dapat didaur ulang</p>
        <p class="tips"><i class="fas fa-lightbulb"></i> Tips: Cuci bersih sebelum dibuang ke tempat daur ulang</p>
      </div>
    `;
    resultClass = "result-anorganic";
  } else if (kategoriSampah.b3.includes(input)) {
    resultHTML = `
      <div class="result-content">
        <i class="fas fa-skull-crossbones"></i>
        <h3>Sampah B3 (Berbahaya)</h3>
        <p>${input} termasuk bahan berbahaya dan beracun</p>
        <p class="tips"><i class="fas fa-lightbulb"></i> Tips: Jangan dibuang sembarangan, cari dropbox khusus B3</p>
      </div>
    `;
    resultClass = "result-b3";
  } else {
    resultHTML = `
      <div class="result-content">
        <i class="fas fa-question-circle"></i>
        <h3>Jenis Sampah Tidak Dikenali</h3>
        <p>Kami tidak mengenali jenis sampah "${input}"</p>
        <p class="tips"><i class="fas fa-lightbulb"></i> Tips: Coba gunakan istilah yang lebih umum</p>
      </div>
    `;
  }

  hasilDiv.innerHTML = resultHTML;
  if (resultClass) {
    hasilDiv.classList.add(resultClass);
  }
}

document.getElementById("sampahInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    pilahSampah();
  }
});