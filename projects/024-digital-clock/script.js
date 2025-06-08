document.addEventListener('DOMContentLoaded', function() {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    const toggleFormatBtn = document.getElementById('toggle-format');
    const toggleThemeBtn = document.getElementById('toggle-theme');
    
    let is24HourFormat = true;
    let isDarkMode = false;
    
    // Update waktu setiap detik
    function updateTime() {
        const now = new Date();
        
        // Format waktu
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        
        let timeString;
        if (is24HourFormat) {
            timeString = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
        } else {
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // jam 0 menjadi 12
            timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
        }
        
        timeElement.textContent = timeString;
        
        // Format tanggal
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        
        const dayName = days[now.getDay()];
        const date = now.getDate();
        const monthName = months[now.getMonth()];
        const year = now.getFullYear();
        
        dateElement.textContent = `${dayName}, ${date} ${monthName} ${year}`;
    }
    
    // Toggle format 12/24 jam
    toggleFormatBtn.addEventListener('click', function() {
        is24HourFormat = !is24HourFormat;
        this.innerHTML = is24HourFormat ? 
            '<i class="fas fa-exchange-alt"></i> 12 Jam' : 
            '<i class="fas fa-exchange-alt"></i> 24 Jam';
        updateTime();
    });
    
    // Toggle dark mode
    toggleThemeBtn.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode', isDarkMode);
        this.innerHTML = isDarkMode ? 
            '<i class="fas fa-sun"></i> Mode Terang' : 
            '<i class="fas fa-moon"></i> Mode Gelap';
    });
    
    // Jalankan updateTime setiap detik
    updateTime();
    setInterval(updateTime, 1000);
});