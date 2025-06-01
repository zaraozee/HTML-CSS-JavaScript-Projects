document.addEventListener('DOMContentLoaded', function() {
    const monthYearElement = document.getElementById('month-year');
    const calendarDaysElement = document.getElementById('calendar-days');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const todayButton = document.getElementById('today-btn');
    const eventIndicator = document.getElementById('event-indicator');
    const eventText = document.getElementById('event-text');
    const eventModal = document.getElementById('event-modal');
    const modalDate = document.getElementById('modal-date');
    const eventInput = document.getElementById('event-input');
    const saveEventButton = document.getElementById('save-event');
    const cancelEventButton = document.getElementById('cancel-event');
    
    let currentDate = new Date();
    let selectedDate = new Date();
    let events = JSON.parse(localStorage.getItem('calendarEvents')) || {};
    
    renderCalendar();
    updateEventIndicator();
    
    prevMonthButton.addEventListener('click', goToPreviousMonth);
    nextMonthButton.addEventListener('click', goToNextMonth);
    todayButton.addEventListener('click', goToToday);
    saveEventButton.addEventListener('click', saveEvent);
    cancelEventButton.addEventListener('click', closeEventModal);
    
    function renderCalendar() {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December'];
        monthYearElement.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        calendarDaysElement.innerHTML = '';
        
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const startingDay = firstDayOfMonth.getDay();
        const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        
        for (let i = 0; i < startingDay; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day', 'other-month');
            dayElement.textContent = prevMonthDays - startingDay + i + 1;
            calendarDaysElement.appendChild(dayElement);
        }
        
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = i;
            
            if (i === today.getDate() && 
                currentDate.getMonth() === today.getMonth() && 
                currentDate.getFullYear() === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            if (i === selectedDate.getDate() && 
                currentDate.getMonth() === selectedDate.getMonth() && 
                currentDate.getFullYear() === selectedDate.getFullYear()) {
                dayElement.classList.add('selected');
            }
            
            const dateKey = formatDateKey(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
            if (events[dateKey] && events[dateKey].length > 0) {
                dayElement.classList.add('has-event');
            }
            
            dayElement.addEventListener('click', () => selectDay(i));
            
            calendarDaysElement.appendChild(dayElement);
        }
        
        const totalDaysShown = startingDay + daysInMonth;
        const remainingDays = totalDaysShown % 7 === 0 ? 0 : 7 - (totalDaysShown % 7);
        
        for (let i = 1; i <= remainingDays; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day', 'other-month');
            dayElement.textContent = i;
            calendarDaysElement.appendChild(dayElement);
        }
    }
    
    function goToPreviousMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    }
    
    function goToNextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    }
    
    function goToToday() {
        currentDate = new Date();
        selectedDate = new Date();
        renderCalendar();
        updateEventIndicator();
    }
    
    function selectDay(day) {
        selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        renderCalendar();
        updateEventIndicator();
        openEventModal();
    }
    
    function updateEventIndicator() {
        const dateKey = formatDateKey(selectedDate);
        if (events[dateKey] && events[dateKey].length > 0) {
            eventText.textContent = `${events[dateKey].length} event${events[dateKey].length > 1 ? 's' : ''} today`;
        } else {
            eventText.textContent = 'No events today';
        }
    }
    
    function openEventModal() {
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        modalDate.textContent = selectedDate.toLocaleDateString('en-US', dateOptions);
        
        const dateKey = formatDateKey(selectedDate);
        if (events[dateKey] && events[dateKey].length > 0) {
            eventInput.value = events[dateKey].join('\n');
        } else {
            eventInput.value = '';
        }
        
        eventModal.style.display = 'flex';
        eventInput.focus();
    }
    
    function closeEventModal() {
        eventModal.style.display = 'none';
    }
    
    function saveEvent() {
        const dateKey = formatDateKey(selectedDate);
        const eventText = eventInput.value.trim();
        
        if (eventText) {
            events[dateKey] = eventText.split('\n').filter(e => e.trim() !== '');
        } else {
            delete events[dateKey];
        }
        
        localStorage.setItem('calendarEvents', JSON.stringify(events));
        closeEventModal();
        renderCalendar();
        updateEventIndicator();
    }
    
    function formatDateKey(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === eventModal) {
            closeEventModal();
        }
    });
});