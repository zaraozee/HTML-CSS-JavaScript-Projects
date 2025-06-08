document.addEventListener('DOMContentLoaded', () => {
    const contents = document.querySelectorAll('.content');
    const listItems = document.querySelectorAll('nav ul li');

    contents[0].classList.add('show');
    listItems[0].classList.add('active');
    
    listItems.forEach((item, idx) => {
        item.addEventListener('click', () => {
            if (item.classList.contains('active')) return;

            const currentActive = document.querySelector('.content.show');
            const nextActive = contents[idx];
            
            currentActive.classList.remove('show');
            nextActive.classList.add('show');

            listItems.forEach(li => li.classList.remove('active'));
            item.classList.add('active');
 
            item.classList.add('animate');
            setTimeout(() => {
                item.classList.remove('animate');
            }, 300);
        });
    });

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
        const threshold = 50; 
        const currentIndex = Array.from(listItems).findIndex(item => 
            item.classList.contains('active')
        );
        
        if (touchEndX < touchStartX - threshold) {

            const nextIndex = (currentIndex + 1) % listItems.length;
            listItems[nextIndex].click();
        } else if (touchEndX > touchStartX + threshold) {

            const prevIndex = (currentIndex - 1 + listItems.length) % listItems.length;
            listItems[prevIndex].click();
        }
    }

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