document.addEventListener('DOMContentLoaded', function() {
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.min-hand');
    const secondHand = document.querySelector('.second-hand');
    const digitalClock = document.getElementById('digital-clock');

    function setDate() {
        const now = new Date();

        const seconds = now.getSeconds();
        const secondsDegrees = ((seconds / 60) * 360) + 90;
        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
        
        const minutes = now.getMinutes();
        const minutesDegrees = ((minutes / 60) * 360) + ((seconds/60)*6) + 90;
        minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
        
        const hours = now.getHours();
        const hoursDegrees = ((hours / 12) * 360) + ((minutes/60)*30) + 90;
        hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

        const timeString = now.toLocaleTimeString();
        digitalClock.textContent = timeString;

        if (seconds === 0) {
            secondHand.style.transition = 'none';
            minuteHand.style.transition = 'none';
            hourHand.style.transition = 'none';
        } else if (seconds === 1) {
            secondHand.style.transition = 'all 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)';
            minuteHand.style.transition = 'all 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)';
            hourHand.style.transition = 'all 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)';
        }
    }

    const clockFace = document.querySelector('.clock-face');
    for (let i = 1; i <= 12; i++) {
        const mark = document.createElement('div');
        mark.className = 'hour-mark';
        clockFace.appendChild(mark);
    }

    setInterval(setDate, 1000);
    setDate(); 
});