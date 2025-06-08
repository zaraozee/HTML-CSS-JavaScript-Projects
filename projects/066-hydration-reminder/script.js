const water = document.querySelector('.water');
const filled = document.getElementById('filled');
const remaining = document.getElementById('remaining');
const liters = document.getElementById('liters');
const cups = document.querySelector('.cups');
const totalGlasses = document.getElementById('total-glasses');
const weeklyAvg = document.getElementById('weekly-avg');
const resetBtn = document.getElementById('reset-btn');
const reminderBtn = document.getElementById('reminder-btn');
const modal = document.getElementById('reminder-modal');
const closeBtn = document.querySelector('.close-btn');
const saveReminderBtn = document.getElementById('save-reminder');

const GLASS_CAPACITY = 0.25;
const TOTAL_CAPACITY = 1.5; 
const TOTAL_GLASSES = 8; 

let drunkGlasses = 0;
let dailyHistory = JSON.parse(localStorage.getItem('waterHistory')) || [];
let reminderInterval = null;

function init() {
    createCups();
    updateBigCup();
    loadHistory();

    const today = new Date().toDateString();
    const todayData = dailyHistory.find(day => day.date === today);
    
    if (todayData) {
        drunkGlasses = todayData.glasses;
        highlightCups();
        updateBigCup();
    }
}

function createCups() {
    cups.innerHTML = '';
    
    for (let i = 0; i < TOTAL_GLASSES; i++) {
        const cup = document.createElement('div');
        cup.classList.add('cup', 'cup-small');
        cup.textContent = `${GLASS_CAPACITY}L`;
        cup.addEventListener('click', () => selectCup(i));
        cups.appendChild(cup);
    }
}

function selectCup(index) {
   
    if (index === drunkGlasses - 1 && document.querySelectorAll('.cup')[index].classList.contains('full')) {
        drunkGlasses--;
    } 
    else {
        drunkGlasses = index + 1;
    }
    
    highlightCups();
    updateBigCup();
    saveDailyProgress();
}

function highlightCups() {
    const allCups = document.querySelectorAll('.cup');
    
    allCups.forEach((cup, idx) => {
        if (idx < drunkGlasses) {
            cup.classList.add('full');
        } else {
            cup.classList.remove('full');
        }
    });
}

function updateBigCup() {
    const percentage = (drunkGlasses / TOTAL_GLASSES) * 100;
    filled.style.height = `${percentage}%`;

    if (percentage === 0) {
        filled.textContent = '';
        remaining.style.visibility = 'visible';
        liters.textContent = `${TOTAL_CAPACITY}L`;
    } else if (percentage === 100) {
        filled.textContent = 'Goal Reached!';
        remaining.style.visibility = 'hidden';
    } else {
        filled.textContent = `${percentage}%`;
        remaining.style.visibility = 'visible';
        liters.textContent = `${(TOTAL_CAPACITY - (drunkGlasses * GLASS_CAPACITY)).toFixed(2)}L`;
    }

    totalGlasses.textContent = drunkGlasses;
    updateWeeklyAverage();
}

function saveDailyProgress() {
    const today = new Date().toDateString();
    const todayIndex = dailyHistory.findIndex(day => day.date === today);
    
    if (todayIndex !== -1) {
        dailyHistory[todayIndex].glasses = drunkGlasses;
    } else {
        dailyHistory.push({
            date: today,
            glasses: drunkGlasses
        });
    }

    if (dailyHistory.length > 7) {
        dailyHistory = dailyHistory.slice(-7);
    }
    
    localStorage.setItem('waterHistory', JSON.stringify(dailyHistory));
}

function loadHistory() {
    if (dailyHistory.length > 0) {
        const sum = dailyHistory.reduce((total, day) => total + day.glasses, 0);
        const avg = sum / dailyHistory.length;
        weeklyAvg.textContent = avg.toFixed(1);
    }
}

function updateWeeklyAverage() {
    const today = new Date().toDateString();
    let tempHistory = [...dailyHistory];

    const todayIndex = tempHistory.findIndex(day => day.date === today);
    if (todayIndex !== -1) {
        tempHistory[todayIndex].glasses = drunkGlasses;
    } else {
        tempHistory.push({
            date: today,
            glasses: drunkGlasses
        });
    }

    const sum = tempHistory.reduce((total, day) => total + day.glasses, 0);
    const avg = sum / tempHistory.length;
    weeklyAvg.textContent = avg.toFixed(1);
}

function resetProgress() {
    drunkGlasses = 0;
    highlightCups();
    updateBigCup();
    saveDailyProgress();
}

function setupReminder(interval, startTime, endTime) {

    if (reminderInterval) {
        clearInterval(reminderInterval);
    }

    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, 0, 0);
    
    const endDate = new Date();
    endDate.setHours(endHours, endMinutes, 0, 0);

    const now = new Date();
    if (now >= startDate && now <= endDate) {
        showNotification();
    }

    reminderInterval = setInterval(() => {
        const now = new Date();
        if (now >= startDate && now <= endDate) {
         
            if (now.getMinutes() % interval === 0 && now.getSeconds() === 0) {
                showNotification();
            }
        }
    }, 1000);
    
    showNotification('Reminder set successfully!');
}

function showNotification(message = "Time to drink water! 💧 Stay hydrated!") {

    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.classList.add('notification');
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}

resetBtn.addEventListener('click', resetProgress);

reminderBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

saveReminderBtn.addEventListener('click', () => {
    const interval = parseInt(document.getElementById('interval').value);
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    
    setupReminder(interval, startTime, endTime);
    modal.style.display = 'none';

    localStorage.setItem('waterReminder', JSON.stringify({
        interval,
        startTime,
        endTime
    }));
});

const savedReminder = localStorage.getItem('waterReminder');
if (savedReminder) {
    const { interval, startTime, endTime } = JSON.parse(savedReminder);
    document.getElementById('interval').value = interval;
    document.getElementById('start-time').value = startTime;
    document.getElementById('end-time').value = endTime;
}

init();