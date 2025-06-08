function konversiSuhu() {
  const nilai = parseFloat(document.getElementById('inputValue').value);
  const dari = document.getElementById('fromUnit').value;
  const ke = document.getElementById('toUnit').value;
  const outputElement = document.getElementById('output');

  if (isNaN(nilai)) {
    outputElement.innerHTML = '<div class="result-value">Masukkan angka yang valid</div>';
    return;
  }

  let hasil;

  // Konversi suhu ke Celsius dulu sebagai titik tengah
  let suhuC;
  switch (dari) {
    case 'celsius': 
      suhuC = nilai; 
      break;
    case 'fahrenheit': 
      suhuC = (nilai - 32) * 5 / 9; 
      break;
    case 'kelvin': 
      suhuC = nilai - 273.15; 
      break;
  }

  // Dari Celsius ke satuan tujuan
  switch (ke) {
    case 'celsius': 
      hasil = suhuC; 
      break;
    case 'fahrenheit': 
      hasil = (suhuC * 9 / 5) + 32; 
      break;
    case 'kelvin': 
      hasil = suhuC + 273.15; 
      break;
  }

  const simbolAwal = getSimbol(dari);
  const simbolAkhir = getSimbol(ke);
  
  outputElement.innerHTML = `
    <div class="result-value">
      ${nilai.toFixed(2)} ${simbolAwal} = ${hasil.toFixed(2)} ${simbolAkhir}
    </div>
  `;
}

function getSimbol(satuan) {
  switch (satuan) {
    case 'celsius': return '°C';
    case 'fahrenheit': return '°F';
    case 'kelvin': return 'K';
    default: return '';
  }
}

// Add event listener for Enter key
document.getElementById('inputValue').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    konversiSuhu();
  }
});