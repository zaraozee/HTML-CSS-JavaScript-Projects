 document.addEventListener('DOMContentLoaded', function() {
    const powerButton = document.getElementById('power-button');
    const lightBeam = document.getElementById('light-beam');
    let isOn = false;

    // Toggle flashlight function
    function toggleFlashlight() {
        isOn = !isOn;
        
        // Update ARIA attribute
        powerButton.setAttribute('aria-pressed', isOn);
        
        if (isOn) {
            lightBeam.classList.add('visible');
            document.body.style.backgroundColor = 'var(--dark-bg)';
        } else {
            lightBeam.classList.remove('visible');
            document.body.style.backgroundColor = 'var(--medium-bg)';
        }
    }

    // Button click event
    powerButton.addEventListener('click', function(e) {
        e.preventDefault();
        toggleFlashlight();
    });

    // Keyboard event
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            toggleFlashlight();
        }
    });

    // Add keyboard focus to button when tabbed to
    powerButton.addEventListener('keydown', (e) => {
        if (e.code === 'Enter' || e.code === 'Space') {
            e.preventDefault();
            toggleFlashlight();
        }
    });
});