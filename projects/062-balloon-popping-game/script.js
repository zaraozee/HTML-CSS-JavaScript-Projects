document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game-area');
    const scoreElement = document.getElementById('score');
    const timeElement = document.getElementById('time');
    const startBtn = document.getElementById('start-btn');
    
    let score = 0;
    let timeLeft = 60;
    let gameInterval;
    let timeInterval;
    let balloonSpeed = 3;
    let balloonInterval = 1500;
    let gameActive = false;
    
    const colors = ['#ff6b6b', '#ffa502', '#2ed573', '#1e90ff', '#a55eea', '#ff7f50'];
    
    startBtn.addEventListener('click', startGame);
    
    function startGame() {
        if (gameActive) return;
        
        gameActive = true;
        score = 0;
        timeLeft = 60;
        balloonSpeed = 3;
        balloonInterval = 1500;
        
        scoreElement.textContent = score;
        timeElement.textContent = timeLeft;
        gameArea.innerHTML = '';
        startBtn.disabled = true;
        
        // Create balloons at intervals
        gameInterval = setInterval(createBalloon, balloonInterval);
        
        // Countdown timer
        timeInterval = setInterval(() => {
            timeLeft--;
            timeElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
            
            // Increase difficulty every 10 seconds
            if (timeLeft % 10 === 0) {
                balloonSpeed += 0.5;
                balloonInterval = Math.max(500, balloonInterval - 200);
                clearInterval(gameInterval);
                gameInterval = setInterval(createBalloon, balloonInterval);
            }
        }, 1000);
    }
    
    function createBalloon() {
        if (!gameActive) return;
        
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        
        // Random position and color
        const leftPos = Math.random() * (gameArea.offsetWidth - 60);
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        balloon.style.left = `${leftPos}px`;
        balloon.style.backgroundColor = color;
        
        // Pop effect
        balloon.addEventListener('click', () => {
            if (!gameActive) return;
            
            balloon.style.transition = 'transform 0.1s';
            balloon.style.transform = 'scale(1.3)';
            balloon.style.opacity = '0';
            
            // Play pop sound (uncomment if you add a sound file)
            // const popSound = new Audio('pop.mp3');
            // popSound.play();
            
            setTimeout(() => {
                balloon.remove();
            }, 100);
            
            score++;
            scoreElement.textContent = score;
        });
        
        gameArea.appendChild(balloon);
        
        // Animate balloon rising
        let position = -100;
        const riseInterval = setInterval(() => {
            if (!gameActive) {
                clearInterval(riseInterval);
                return;
            }
            
            position += balloonSpeed;
            balloon.style.bottom = `${position}px`;
            
            // Remove balloon if it goes off screen
            if (position > gameArea.offsetHeight) {
                clearInterval(riseInterval);
                balloon.remove();
            }
        }, 20);
    }
    
    function endGame() {
        gameActive = false;
        clearInterval(gameInterval);
        clearInterval(timeInterval);
        startBtn.disabled = false;
        
        // Show game over message
        const gameOver = document.createElement('div');
        gameOver.className = 'game-over';
        gameOver.innerHTML = `
            <h2>Game Over!</h2>
            <p>Your score: ${score}</p>
            <button onclick="location.reload()">Play Again</button>
        `;
        gameArea.appendChild(gameOver);
        gameOver.style.display = 'block';
    }
});