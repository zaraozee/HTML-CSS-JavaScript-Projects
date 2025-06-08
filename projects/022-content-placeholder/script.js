// Configuration
const config = {
    cards: [
        {
            headerImg: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=2102&q=80',
            title: 'Lorem ipsum dolor sit amet',
            excerpt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore perferendis enim architecto consequuntur libero',
            profileImg: 'https://randomuser.me/api/portraits/women/45.jpg',
            name: 'Jane Doe',
            date: 'Oct 08, 2020'
        },
        {
            headerImg: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
            title: 'Consectetur adipiscing elit',
            excerpt: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
            profileImg: 'https://randomuser.me/api/portraits/men/32.jpg',
            name: 'John Smith',
            date: 'Nov 15, 2020'
        }
    ]
};

// Initialize placeholders
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        const delay = parseInt(card.dataset.loadDelay) || 2000;
        
        // Set unique IDs for all placeholder elements
        const placeholders = card.querySelectorAll('[id]');
        placeholders.forEach(el => {
            el.id = `${el.id}_${index}`;
        });
        
        // Load data after delay
        setTimeout(() => loadCardData(card, index), delay);
    });
});

function loadCardData(card, index) {
    const data = config.cards[index] || config.cards[0];
    
    // Update card content
    const header = card.querySelector('.card-header');
    const title = card.querySelector('.card-title');
    const excerpt = card.querySelector('.card-excerpt');
    const profileImg = card.querySelector('.profile-img');
    const name = card.querySelector('.author-info strong');
    const date = card.querySelector('.author-info small');
    
    // Create elements
    const headerImg = document.createElement('img');
    headerImg.src = data.headerImg;
    headerImg.alt = '';
    
    const profileImgEl = document.createElement('img');
    profileImgEl.src = data.profileImg;
    profileImgEl.alt = '';
    
    // Replace placeholders with actual content
    header.innerHTML = '';
    header.appendChild(headerImg);
    
    title.textContent = data.title;
    excerpt.innerHTML = data.excerpt;
    
    profileImg.innerHTML = '';
    profileImg.appendChild(profileImgEl);
    
    name.textContent = data.name;
    date.textContent = data.date;
    
    // Remove placeholder classes
    const placeholders = card.querySelectorAll('.placeholder');
    placeholders.forEach(el => {
        el.classList.remove('placeholder', 'placeholder-text');
    });
    
    // Add fade-in animation
    card.style.animation = 'fadeIn 0.5s ease-out';
}

// Add fadeIn animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0.5; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);