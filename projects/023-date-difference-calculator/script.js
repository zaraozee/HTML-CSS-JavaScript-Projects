function hitungSelisih() {
  const h1 = parseInt(document.getElementById("hari1").value) || 0;
  const b1 = parseInt(document.getElementById("bulan1").value) || 0;
  const t1 = parseInt(document.getElementById("tahun1").value) || 0;

  const h2 = parseInt(document.getElementById("hari2").value) || 0;
  const b2 = parseInt(document.getElementById("bulan2").value) || 0;
  const t2 = parseInt(document.getElementById("tahun2").value) || 0;

  const total1 = t1 * 365 + b1 * 30 + h1;
  const total2 = t2 * 365 + b2 * 30 + h2;

  const selisih = Math.abs(total2 - total1);

  const tahun = Math.floor(selisih / 365);
  const sisaHari = selisih % 365;
  const bulan = Math.floor(sisaHari / 30);
  const hari = sisaHari % 30;

  document.getElementById("hasilSelisih").textContent =
    `The difference between the two dates is ${tahun} years, ${bulan} months, and ${hari} days.`;
}