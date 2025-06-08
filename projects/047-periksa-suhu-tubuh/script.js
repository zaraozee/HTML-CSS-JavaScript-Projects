function cekSuhu() {
  const suhu = parseFloat(document.getElementById('suhu').value);
  const output = document.getElementById('output');
  
  // Reset output
  output.className = 'result';
  
  if (isNaN(suhu)) {
    output.innerHTML = `
      <div class="result-content">
        <span><i class="fas fa-exclamation-triangle"></i> Masukkan suhu tubuh yang valid</span>
      </div>
    `;
    output.classList.add('status-mild');
    return;
  }

  let status, description, statusClass;
  
  if (suhu < 36.1) {
    status = "Hipotermia";
    description = "Suhu tubuh terlalu rendah";
    statusClass = "status-hypothermia";
  } else if (suhu >= 36.1 && suhu <= 37.2) {
    status = "Normal";
    description = "Suhu tubuh normal";
    statusClass = "status-normal";
  } else if (suhu > 37.2 && suhu <= 38.0) {
    status = "Demam Ringan";
    description = "Suhu tubuh sedikit tinggi";
    statusClass = "status-mild";
  } else if (suhu > 38.0 && suhu <= 39.0) {
    status = "Demam Sedang";
    description = "Suhu tubuh cukup tinggi";
    statusClass = "status-moderate";
  } else {
    status = "Demam Tinggi!";
    description = "Suhu tubuh sangat tinggi";
    statusClass = "status-high";
  }

  output.innerHTML = `
    <div class="result-content">
      <span class="result-value">${suhu.toFixed(1)}°C</span>
      <span>Status: ${status}</span>
      <span class="description">${description}</span>
    </div>
  `;
  output.classList.add(statusClass);
  
  // Add appropriate icon based on status
  let icon;
  if (statusClass === "status-hypothermia") icon = "fa-temperature-low";
  else if (statusClass === "status-normal") icon = "fa-temperature-empty";
  else if (statusClass === "status-mild") icon = "fa-temperature-quarter";
  else if (statusClass === "status-moderate") icon = "fa-temperature-half";
  else icon = "fa-temperature-full";
  
  const iconElement = document.createElement('i');
  iconElement.className = `fas ${icon} status-icon`;
  output.querySelector('.result-content').prepend(iconElement);
}

// Add event listener for Enter key
document.getElementById('suhu').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    cekSuhu();
  }
});