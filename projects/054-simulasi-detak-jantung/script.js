document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const heartIcon = document.getElementById('heart-icon');
    const heartRateDisplay = document.getElementById('heart-rate');
    const rateSlider = document.getElementById('rate-slider');
    const rateValue = document.getElementById('rate-value');
    const irregularCheckbox = document.getElementById('irregular');
    const stressLevel = document.getElementById('stress-level');
    const startStopBtn = document.getElementById('start-stop');
    const statusDisplay = document.getElementById('status');
    
    // Chart setup
    const ctx = document.getElementById('heartbeat-chart').getContext('2d');
    const heartbeatChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 30}, (_, i) => i + 1),
            datasets: [{
                label: 'Detak Jantung',
                data: Array(30).fill(0),
                borderColor: '#e74c3c',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 40,
                    max: 180,
                    title: {
                        display: true,
                        text: 'BPM'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Waktu (detik)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // App state
    let isRunning = false;
    let simulationInterval;
    let currentRate = 72;
    let baseRate = 72;
    let irregularityFactor = 0;
    let stressFactor = 1;
    
    // Initialize
    function init() {
        updateRateDisplay();
        setupEventListeners();
    }
    
    // Event listeners
    function setupEventListeners() {
        rateSlider.addEventListener('input', function() {
            baseRate = parseInt(this.value);
            rateValue.textContent = baseRate;
            if (isRunning) {
                updateHeartRate();
            }
        });
        
        irregularCheckbox.addEventListener('change', function() {
            irregularityFactor = this.checked ? 10 : 0;
            if (isRunning) {
                updateHeartRate();
            }
        });
        
        stressLevel.addEventListener('change', function() {
            switch(this.value) {
                case 'normal':
                    stressFactor = 1;
                    break;
                case 'medium':
                    stressFactor = 1.2;
                    break;
                case 'high':
                    stressFactor = 1.4;
                    break;
            }
            if (isRunning) {
                updateHeartRate();
            }
        });
        
        startStopBtn.addEventListener('click', toggleSimulation);
    }
    
    // Toggle simulation
    function toggleSimulation() {
        if (isRunning) {
            stopSimulation();
        } else {
            startSimulation();
        }
    }
    
    // Start simulation
    function startSimulation() {
        isRunning = true;
        startStopBtn.innerHTML = '<i class="fas fa-stop"></i> Berhenti';
        statusDisplay.textContent = 'Status: Aktif';
        statusDisplay.style.color = '#27ae60';
        
        // Start heartbeat animation
        heartIcon.style.animation = 'heartbeat ${calcBeatInterval()}ms infinite';
        
        // Start updating chart
        simulationInterval = setInterval(updateSimulation, 1000);
    }
    
    // Stop simulation
    function stopSimulation() {
        isRunning = false;
        startStopBtn.innerHTML = '<i class="fas fa-play"></i> Mulai';
        statusDisplay.textContent = 'Status: Tidak aktif';
        statusDisplay.style.color = '';
        
        // Stop heartbeat animation
        heartIcon.style.animation = 'none';
        
        // Clear interval
        clearInterval(simulationInterval);
    }
    
    // Calculate beat interval based on BPM
    function calcBeatInterval() {
        return (60 / currentRate) * 1000;
    }
    
    // Update heart rate with variability
    function updateHeartRate() {
        // Apply stress factor
        let adjustedRate = baseRate * stressFactor;
        
        // Add irregularity if enabled
        if (irregularityFactor > 0) {
            const variation = (Math.random() * irregularityFactor * 2) - irregularityFactor;
            adjustedRate += variation;
        }
        
        // Keep within reasonable bounds
        currentRate = Math.max(40, Math.min(180, Math.round(adjustedRate)));
        
        // Update display
        updateRateDisplay();
        
        // Update animation speed
        if (isRunning) {
            heartIcon.style.animationDuration = '${calcBeatInterval()}ms';
        }
    }
    
    // Update rate display
    function updateRateDisplay() {
        heartRateDisplay.textContent = currentRate;
        
        // Color coding based on rate
        if (currentRate < 60) {
            heartRateDisplay.style.color = '#3498db'; // Blue for bradycardia
        } else if (currentRate > 100) {
            heartRateDisplay.style.color = '#e74c3c'; // Red for tachycardia
        } else {
            heartRateDisplay.style.color = '#2ecc71'; // Green for normal
        }
    }
    
    // Update chart with new data
    function updateSimulation() {
        updateHeartRate();
        
        // Get current chart data
        const chartData = heartbeatChart.data.datasets[0].data;
        
        // Shift all data points left
        for (let i = 0; i < chartData.length - 1; i++) {
            chartData[i] = chartData[i + 1];
        }
        
        // Add new data point with some natural variability
        const variability = (Math.random() * 4) - 2; // +/- 2 BPM
        chartData[chartData.length - 1] = currentRate + variability;
        
        // Update chart
        heartbeatChart.update();
    }
    
    // Initialize the app
    init();
});