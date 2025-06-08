document.getElementById("convert-btn").addEventListener("click", function() {
    const secondsInput = document.getElementById("seconds").value;
    const errorEl = document.getElementById("error");

    errorEl.textContent = "";
    
    const seconds = parseInt(secondsInput);
    if (isNaN(seconds)) {
        errorEl.textContent = "Please enter a valid number";
        return;
    }
    if (seconds < 0) {
        errorEl.textContent = "Please enter a positive number";
        return;
    }

    const SECONDS_IN_MINUTE = 60;
    const SECONDS_IN_HOUR = 60 * 60;
    const SECONDS_IN_DAY = 60 * 60 * 24;

    const days = Math.floor(seconds / SECONDS_IN_DAY);
    const remainingAfterDays = seconds % SECONDS_IN_DAY;
    
    const hours = Math.floor(remainingAfterDays / SECONDS_IN_HOUR);
    const remainingAfterHours = remainingAfterDays % SECONDS_IN_HOUR;
    
    const minutes = Math.floor(remainingAfterHours / SECONDS_IN_MINUTE);
    const remainingSeconds = remainingAfterHours % SECONDS_IN_MINUTE;

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("remaining-seconds").textContent = remainingSeconds;
});