document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('converter-form');
  const resultDiv = document.getElementById('result');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    convertDistance();
  });
  
  function convertDistance() {
    const cmInput = document.getElementById('distance-cm');
    const totalCm = parseInt(cmInput.value);
    
    if (isNaN(totalCm) || totalCm < 0) {
      showResult('Please enter a valid positive number', true);
      return;
    }
    
    if (totalCm === 0) {
      showResult('The distance is: 0 km 0 m 0 cm');
      return;
    }
    
    const km = Math.floor(totalCm / 100000);
    const remainingCm = totalCm % 100000;
    const m = Math.floor(remainingCm / 100);
    const cm = remainingCm % 100;
    
    const resultText = formatResult(km, m, cm);
    showResult(resultText);
  }
  
  function formatResult(km, m, cm) {
    const parts = [];
    if (km > 0) parts.push(`${km} km`);
    if (m > 0 || km > 0) parts.push(`${m} m`);
    parts.push(`${cm} cm`);
    
    return `The distance is: ${parts.join(' ')}`;
  }
  
  function showResult(message, isError = false) {
    resultDiv.textContent = message;
    resultDiv.className = isError ? 'result visible error' : 'result visible';
    
    if (isError) {
      resultDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
      resultDiv.style.color = '#d32f2f';
    } else {
      resultDiv.style.backgroundColor = 'rgba(74, 111, 165, 0.1)';
      resultDiv.style.color = 'var(--primary-color)';
    }
  }
});