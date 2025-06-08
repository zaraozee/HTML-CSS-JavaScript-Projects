 document.addEventListener('DOMContentLoaded', function() {
    const powerButton = document.getElementById('power-button');
    const lightBeam = document.getElementById('light-beam');
    let isOn = false;

    function toggleFlashlight() {
        isOn = !isOn;

        powerButton.setAttribute('aria-pressed', isOn);
        
        if (isOn) {
            lightBeam.classList.add('visible');
            document.body.style.backgroundColor = 'var(--dark-bg)';
        } else {
            lightBeam.classList.remove('visible');
            document.body.style.backgroundColor = 'var(--medium-bg)';
        }
    }

    powerButton.addEventListener('click', function(e) {
        e.preventDefault();
        toggleFlashlight();
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            toggleFlashlight();
        }
    });

    powerButton.addEventListener('keydown', (e) => {
        if (e.code === 'Enter' || e.code === 'Space') {
            e.preventDefault();
            toggleFlashlight();
        }
    });
});