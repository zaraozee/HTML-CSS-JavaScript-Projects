document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentActive = 0;
    
    // Initialize the first card as active
    cards[currentActive].classList.add('active');
    
    // Add click event to each card
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            // If clicking the already active card, do nothing
            if (index === currentActive) return;
            
            // Remove active class from all cards
            cards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            card.classList.add('active');
            currentActive = index;
        });
    });
    
    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        // Remove active class from current card
        cards[currentActive].classList.remove('active');
        
        // Decrement currentActive
        currentActive--;
        if (currentActive < 0) {
            currentActive = cards.length - 1;
        }
        
        // Add active class to new card
        cards[currentActive].classList.add('active');
    });
    
    nextBtn.addEventListener('click', () => {
        // Remove active class from current card
        cards[currentActive].classList.remove('active');
        
        // Increment currentActive
        currentActive++;
        if (currentActive > cards.length - 1) {
            currentActive = 0;
        }
        
        // Add active class to new card
        cards[currentActive].classList.add('active');
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextBtn.click();
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        }
    });
    
    // Auto-rotate functionality (optional)
    let autoRotateInterval;
    const startAutoRotate = () => {
        autoRotateInterval = setInterval(() => {
            nextBtn.click();
        }, 5000);
    };
    
    const stopAutoRotate = () => {
        clearInterval(autoRotateInterval);
    };
    
    // Start auto-rotate
    startAutoRotate();
    
    // Pause auto-rotate when hovering over cards
    document.querySelector('.cards-container').addEventListener('mouseenter', stopAutoRotate);
    document.querySelector('.cards-container').addEventListener('mouseleave', startAutoRotate);
    
    // Touch support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.querySelector('.cards-container').addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.querySelector('.cards-container').addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextBtn.click();
        }
        
        if (touchEndX > touchStartX + 50) {
            prevBtn.click();
        }
    }
});