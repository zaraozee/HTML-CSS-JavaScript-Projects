document.addEventListener('DOMContentLoaded', () => {
    const contents = document.querySelectorAll('.content');
    const listItems = document.querySelectorAll('nav ul li');
    
    // Initialize first content and nav item
    contents[0].classList.add('show');
    listItems[0].classList.add('active');
    
    listItems.forEach((item, idx) => {
        item.addEventListener('click', () => {
            // Don't do anything if already active
            if (item.classList.contains('active')) return;
            
            // Animation for content switch
            const currentActive = document.querySelector('.content.show');
            const nextActive = contents[idx];
            
            currentActive.classList.remove('show');
            nextActive.classList.add('show');
            
            // Update navigation
            listItems.forEach(li => li.classList.remove('active'));
            item.classList.add('active');
            
            // Add animation class for a moment
            item.classList.add('animate');
            setTimeout(() => {
                item.classList.remove('animate');
            }, 300);
        });
    });
    
    // Add swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const screen = document.querySelector('.screen');
    
    screen.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    screen.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const threshold = 50; // minimum swipe distance
        const currentIndex = Array.from(listItems).findIndex(item => 
            item.classList.contains('active')
        );
        
        if (touchEndX < touchStartX - threshold) {
            // Swipe left - go to next tab
            const nextIndex = (currentIndex + 1) % listItems.length;
            listItems[nextIndex].click();
        } else if (touchEndX > touchStartX + threshold) {
            // Swipe right - go to previous tab
            const prevIndex = (currentIndex - 1 + listItems.length) % listItems.length;
            listItems[prevIndex].click();
        }
    }
    
    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        const currentIndex = Array.from(listItems).findIndex(item => 
            item.classList.contains('active')
        );
        
        if (e.key === 'ArrowRight') {
            const nextIndex = (currentIndex + 1) % listItems.length;
            listItems[nextIndex].click();
        } else if (e.key === 'ArrowLeft') {
            const prevIndex = (currentIndex - 1 + listItems.length) % listItems.length;
            listItems[prevIndex].click();
        }
    });
});