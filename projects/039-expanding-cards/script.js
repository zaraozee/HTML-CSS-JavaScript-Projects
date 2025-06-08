document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentActive = 0;

    cards[currentActive].classList.add('active');
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (index === currentActive) return;

            cards.forEach(c => c.classList.remove('active'));

            card.classList.add('active');
            currentActive = index;
        });
    });
    
    prevBtn.addEventListener('click', () => {
        cards[currentActive].classList.remove('active');
        currentActive--;
        if (currentActive < 0) {
            currentActive = cards.length - 1;
        }
        
        cards[currentActive].classList.add('active');
    });
    
    nextBtn.addEventListener('click', () => {
        cards[currentActive].classList.remove('active');
        currentActive++;
        if (currentActive > cards.length - 1) {
            currentActive = 0;
        }
        
        cards[currentActive].classList.add('active');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextBtn.click();
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        }
    });

    let autoRotateInterval;
    const startAutoRotate = () => {
        autoRotateInterval = setInterval(() => {
            nextBtn.click();
        }, 5000);
    };
    
    const stopAutoRotate = () => {
        clearInterval(autoRotateInterval);
    };

    startAutoRotate();

    document.querySelector('.cards-container').addEventListener('mouseenter', stopAutoRotate);
    document.querySelector('.cards-container').addEventListener('mouseleave', startAutoRotate);

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