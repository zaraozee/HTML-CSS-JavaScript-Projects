document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const eventForm = document.getElementById('event-form');
    const eventsList = document.getElementById('events-list');
    const filterCategory = document.getElementById('filter-category');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-event-form');
    const closeModal = document.querySelector('.close');
    
    // Event Data (stored in memory - replace with localStorage/API in production)
    let events = JSON.parse(localStorage.getItem('events')) || [];
    let currentEditId = null;
    
    // Initialize
    renderEvents();
    
    // Event Listeners
    eventForm.addEventListener('submit', handleFormSubmit);
    filterCategory.addEventListener('change', filterEvents);
    clearFiltersBtn.addEventListener('click', clearFilters);
    closeModal.addEventListener('click', () => editModal.style.display = 'none');
    editForm.addEventListener('submit', handleEditSubmit);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });
    
    // Form Submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const newEvent = {
            id: Date.now().toString(),
            name: document.getElementById('event-name').value,
            date: document.getElementById('event-date').value,
            time: document.getElementById('event-time').value,
            location: document.getElementById('event-location').value,
            category: document.getElementById('event-category').value,
            description: document.getElementById('event-description').value
        };
        
        events.push(newEvent);
        saveEvents();
        renderEvents();
        eventForm.reset();
    }
    
    // Edit Event
    function openEditModal(eventId) {
        const event = events.find(e => e.id === eventId);
        if (!event) return;
        
        currentEditId = eventId;
        document.getElementById('edit-event-id').value = event.id;
        document.getElementById('edit-event-name').value = event.name;
        document.getElementById('edit-event-date').value = event.date;
        document.getElementById('edit-event-time').value = event.time;
        document.getElementById('edit-event-location').value = event.location;
        document.getElementById('edit-event-category').value = event.category;
        document.getElementById('edit-event-description').value = event.description;
        
        editModal.style.display = 'flex';
    }
    
    function handleEditSubmit(e) {
        e.preventDefault();
        
        const updatedEvent = {
            id: currentEditId,
            name: document.getElementById('edit-event-name').value,
            date: document.getElementById('edit-event-date').value,
            time: document.getElementById('edit-event-time').value,
            location: document.getElementById('edit-event-location').value,
            category: document.getElementById('edit-event-category').value,
            description: document.getElementById('edit-event-description').value
        };
        
        events = events.map(event => 
            event.id === currentEditId ? updatedEvent : event
        );
        
        saveEvents();
        renderEvents();
        editModal.style.display = 'none';
    }
    
    // Delete Event
    function deleteEvent(eventId) {
        if (confirm('Are you sure you want to delete this event?')) {
            events = events.filter(event => event.id !== eventId);
            saveEvents();
            renderEvents();
        }
    }
    
    // Filter Events
    function filterEvents() {
        const category = filterCategory.value;
        renderEvents(category);
    }
    
    function clearFilters() {
        filterCategory.value = 'all';
        renderEvents();
    }
    
    // Render Events
    function renderEvents(category = 'all') {
        const filteredEvents = category === 'all' 
            ? events 
            : events.filter(event => event.category === category);
        
        eventsList.innerHTML = filteredEvents.map(event => `
            <tr>
                <td>${event.name}</td>
                <td>${formatDate(event.date)}</td>
                <td>${event.time}</td>
                <td>${event.location}</td>
                <td>${capitalize(event.category)}</td>
                <td class="action-buttons">
                    <button class="edit-btn" onclick="openEditModal('${event.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="delete-btn" onclick="deleteEvent('${event.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `).join('');
    }
    
    // Helper Functions
    function saveEvents() {
        localStorage.setItem('events', JSON.stringify(events));
    }
    
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    // Make functions available globally for inline event handlers
    window.openEditModal = openEditModal;
    window.deleteEvent = deleteEvent;
});