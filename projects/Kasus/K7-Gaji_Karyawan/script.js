        document.getElementById("btnHitung").addEventListener("click", function() {
            const jumlahKaryawan = parseInt(document.getElementById("jumlahKaryawan").value);
            const gajiPerJam = 10000;
            const gajiKaryawanDiv = document.getElementById("gajiKaryawan");
            const totalGajiElement = document.getElementById("totalGaji");
            const errorMsg = document.getElementById("errorMsg");

            gajiKaryawanDiv.innerHTML = ""; // Reset output
            totalGajiElement.textContent = "Total gaji yang harus dibayarkan: Rp-";
            errorMsg.textContent = "";

            if (isNaN(jumlahKaryawan) || jumlahKaryawan < 1) {
                errorMsg.textContent = "Jumlah karyawan harus lebih dari 0.";
                return;
            }

            let totalGaji = 0;

            for (let i = 0; i < jumlahKaryawan; i++) {
                const jamKerja = parseInt(prompt(`Masukkan jumlah jam kerja untuk Karyawan ${i + 1}:`));

                let gaji;
                if (jamKerja <= 7) {
                    gaji = jamKerja * gajiPerJam;
                } else {
                    gaji = (7 * gajiPerJam) + ((jamKerja - 7) * (1.5 * gajiPerJam));
                }

                gajiKaryawanDiv.innerHTML += `Gaji Karyawan ${i + 1}: Rp${gaji.toLocaleString()}<br>`;
                totalGaji += gaji;
            }

            totalGajiElement.textContent = `Total gaji yang harus dibayarkan: Rp${totalGaji.toLocaleString()}`;
        });