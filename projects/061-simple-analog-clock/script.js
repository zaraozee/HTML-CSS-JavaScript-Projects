document.addEventListener('DOMContentLoaded', function() {
    const clock = document.querySelector('.clock');
    
    // Create clock marks
    for (let i = 0; i < 60; i++) {
        const mark = document.createElement('div');
        mark.className = 'mark';
        
        // Make every 5th mark bolder (for hours)
        if (i % 5 === 0) {
            mark.classList.add('bold');
        }
        
        // Position each mark
        mark.style.transform = `rotate(${i * 6}deg)`;
        clock.appendChild(mark);
    }
    
    // Create clock hands
    const hourHand = document.createElement('div');
    hourHand.className = 'hand hour-hand';
    clock.appendChild(hourHand);
    
    const minuteHand = document.createElement('div');
    minuteHand.className = 'hand minute-hand';
    clock.appendChild(minuteHand);
    
    const secondHand = document.createElement('div');
    secondHand.className = 'hand second-hand';
    clock.appendChild(secondHand);
    
    function updateClock() {
        const now = new Date();
        const hours = now.getHours() % 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const milliseconds = now.getMilliseconds();
        
        // Calculate degrees with smooth movement
        const hourDegrees = (hours * 30) + (minutes * 0.5);
        const minuteDegrees = (minutes * 6) + (seconds * 0.1);
        const secondDegrees = (seconds * 6) + (milliseconds * 0.006);
        
        // Apply rotations
        hourHand.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
        minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
        secondHand.style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;
        
        requestAnimationFrame(updateClock);
    }
    
    // Start the clock
    updateClock();
});