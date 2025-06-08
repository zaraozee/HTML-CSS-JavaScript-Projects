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
        this.loadData();
    }
    
    createHeart(e) {
        e.preventDefault();

        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart', 'heart');

        const rect = this.loveMe.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;

        this.loveMe.appendChild(heart);
        this.timesClicked++;
        this.streak++;
        
        if (this.streak > this.maxStreak) {
            this.maxStreak = this.streak;
        }
        
        this.updateDisplay();
        this.saveData();

        setTimeout(() => heart.remove(), 800);
    }
    
    updateDisplay() {
        this.counter.textContent = this.timesClicked;
        this.streakDisplay.textContent = `Current streak: ${this.streak}`;

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

            this.image.style.opacity = '0.5';
            const response = await fetch('https://source.unsplash.com/random/800x600');
            this.image.src = response.url;
            this.image.style.opacity = '1';
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

document.addEventListener('DOMContentLoaded', () => {
    new HeartApp();
});