// Game configuration
const config = {
    cellSize: 30,
    levels: [
        // Level 1
        [
            "WWWWWWWWWW",
            "W        W",
            "W WW WW WW",
            "W W  P  EW",
            "W WW WW WW",
            "W        W",
            "WWWWWWWWWW"
        ],
        // Level 2
        [
            "WWWWWWWWWW",
            "W   W    W",
            "W W W WW W",
            "W W W  W W",
            "W WWW W PW",
            "W     W  W",
            "WWWWWEWWWW"
        ],
        // Level 3 (more complex)
        [
            "WWWWWWWWWWWWW",
            "W     W     W",
            "W WWW W WWW W",
            "W W       W W",
            "W W WWWWW W W",
            "W W   W   W W",
            "W WWW W WWW W",
            "W   W W W   W",
            "WWW W W W WWW",
            "WP    W    EW",
            "WWWWWWWWWWWWW"
        ]
    ]
};

// Game state
let currentLevel = 0;
let playerPos = { x: 0, y: 0 };
let exitPos = { x: 0, y: 0 };
let moves = 0;
let timeLeft = 60;
let timer;
let gameActive = false;

// DOM elements
const mazeElement = document.getElementById('maze');
const levelElement = document.getElementById('level');
const timeElement = document.getElementById('time');
const movesElement = document.getElementById('moves');
const messageElement = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');

// Initialize the game
function initGame() {
    currentLevel = 0;
    loadLevel(currentLevel);
}

// Load a level
function loadLevel(levelIndex) {
    if (levelIndex >= config.levels.length) {
        showMessage("Congratulations! You beat all levels!");
        return;
    }

    const level = config.levels[levelIndex];
    const rows = level.length;
    const cols = level[0].length;

    // Set CSS variables for grid sizing
    mazeElement.style.setProperty('--rows', rows);
    mazeElement.style.setProperty('--cols', cols);
    
    mazeElement.innerHTML = '';
    moves = 0;
    movesElement.textContent = moves;
    levelElement.textContent = levelIndex + 1;
    messageElement.textContent = '';
    
    // Reset timer
    resetTimer();
    
    // Create maze grid
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            
            switch (level[y][x]) {
                case 'W': // Wall
                    cell.classList.add('wall');
                    break;
                case 'P': // Player
                    playerPos = { x, y };
                    const player = document.createElement('div');
                    player.className = 'player';
                    cell.appendChild(player);
                    break;
                case 'E': // Exit
                    exitPos = { x, y };
                    const exit = document.createElement('div');
                    exit.className = 'exit';
                    cell.appendChild(exit);
                    break;
                // Empty space needs no special class
            }
            
            mazeElement.appendChild(cell);
        }
    }
    
    gameActive = true;
}

// Move player
function movePlayer(dx, dy) {
    if (!gameActive) return;
    
    const level = config.levels[currentLevel];
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;
    
    // Check boundaries and walls
    if (newX < 0 || newY < 0 || newY >= level.length || newX >= level[0].length) {
        return;
    }
    
    if (level[newY][newX] === 'W') {
        return;
    }
    
    // Update player position
    const oldIndex = playerPos.y * level[0].length + playerPos.x;
    const newIndex = newY * level[0].length + newX;
    
    // Clear old position
    mazeElement.children[oldIndex].innerHTML = '';
    
    // Set new position
    const player = document.createElement('div');
    player.className = 'player';
    mazeElement.children[newIndex].appendChild(player);
    
    playerPos = { x: newX, y: newY };
    moves++;
    movesElement.textContent = moves;
    
    // Check if player reached exit
    if (newX === exitPos.x && newY === exitPos.y) {
        levelComplete();
    }
}

// Handle level completion
function levelComplete() {
    gameActive = false;
    clearInterval(timer);
    showMessage(`Level ${currentLevel + 1} complete!`);
    
    setTimeout(() => {
        currentLevel++;
        loadLevel(currentLevel);
    }, 1500);
}

// Timer functions
function startTimer() {
    clearInterval(timer);
    timeLeft = 60;
    timeElement.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            gameActive = false;
            showMessage("Time's up! Try again.");
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    startTimer();
}

// Show message
function showMessage(msg) {
    messageElement.textContent = msg;
}

// Event listeners
document.addEventListener('keydown', (e) => {
    if (!gameActive) return;
    
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            movePlayer(1, 0);
            break;
    }
});

resetBtn.addEventListener('click', () => {
    loadLevel(currentLevel);
});

// Start the game when page loads
window.addEventListener('load', initGame);