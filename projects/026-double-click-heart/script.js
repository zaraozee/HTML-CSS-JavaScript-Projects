class HeartApp {
    constructor() {
        this.loveMe = document.getElementById('loveMe');
        this.counter = document.getElementById('counter');
        this.streakDisplay = document.getElementById('streak');
        this.resetBtn = document.getElementById('resetBtn');
        this.changeImgBtn = document.getElementById('changeImgBtn');
        this.image = document.querySelector('.clickable-image');
        
        this.clickTime = 0;
        this.timesClicked = 0;
        this.streak = 0;
        this.maxStreak = 0;
        
        this.init();
    }
    
    init() {
        this.loveMe.addEventListener('dblclick', this.createHeart.bind(this));
        this.resetBtn.addEventListener('click', this.resetCounter.bind(this));
        this.changeImgBtn.addEventListener('click', this.changeImage.bind(this));
        
        // Load saved data if available
        this.loadData();
    }
    
    createHeart(e) {
        // Prevent double-click text selection
        e.preventDefault();
        
        // Create heart element
        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart', 'heart');
        
        // Get click position relative to image
        const rect = this.loveMe.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Position heart
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        
        // Add to DOM
        this.loveMe.appendChild(heart);
        
        // Update counters
        this.timesClicked++;
        this.streak++;
        
        if (this.streak > this.maxStreak) {
            this.maxStreak = this.streak;
        }
        
        this.updateDisplay();
        this.saveData();
        
        // Remove heart after animation
        setTimeout(() => heart.remove(), 800);
    }
    
    updateDisplay() {
        this.counter.textContent = this.timesClicked;
        this.streakDisplay.textContent = `Current streak: ${this.streak}`;
        
        // Visual feedback for streaks
        if (this.streak >= 5) {
            this.streakDisplay.style.color = '#ff4757';
            this.streakDisplay.style.fontWeight = 'bold';
        }
    }
    
    resetCounter() {
        this.timesClicked = 0;
        this.streak = 0;
        this.updateDisplay();
        this.saveData();
    }
    
    async changeImage() {
        try {
            // Show loading state
            this.image.style.opacity = '0.5';
            
            // Fetch random image from Unsplash
            const response = await fetch('https://source.unsplash.com/random/800x600');
            this.image.src = response.url;
            
            // Reset loading state
            this.image.style.opacity = '1';
            
            // Reset streak when changing image
            this.streak = 0;
            this.updateDisplay();
        } catch (error) {
            console.error('Error changing image:', error);
            this.image.style.opacity = '1';
        }
    }
    
    saveData() {
        localStorage.setItem('heartAppData', JSON.stringify({
            count: this.timesClicked,
            maxStreak: this.maxStreak
        }));
    }
    
    loadData() {
        const savedData = localStorage.getItem('heartAppData');
        if (savedData) {
            const { count, maxStreak } = JSON.parse(savedData);
            this.timesClicked = count;
            this.maxStreak = maxStreak;
            this.updateDisplay();
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeartApp();
});