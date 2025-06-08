const words = [
    { word: "javascript", hint: "Programming language" },
    { word: "elephant", hint: "Large gray mammal with a trunk" },
    { word: "keyboard", hint: "Computer input device" },
    { word: "mountain", hint: "Very high natural place" },
    { word: "guitar", hint: "Musical instrument with strings" },
    { word: "rainbow", hint: "Colorful arc in the sky" },
    { word: "butterfly", hint: "Insect with colorful wings" },
    { word: "adventure", hint: "Exciting or unusual experience" },
    { word: "basketball", hint: "Sport played with a hoop" },
    { word: "chocolate", hint: "Sweet brown treat" }
];

let currentWord = '';
let scrambledWord = '';
let score = 0;
let timeLeft = 60;
let timer;
let gameActive = false;

const scrambledWordElement = document.getElementById('scrambled-word');
const hintText = document.getElementById('hint-text');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const userInput = document.getElementById('user-input');
const submitBtn = document.getElementById('submit-btn');
const hintBtn = document.getElementById('hint-btn');
const skipBtn = document.getElementById('skip-btn');
const resetBtn = document.getElementById('reset-btn');
const messageElement = document.getElementById('message');

function initGame() {
    score = 0;
    timeLeft = 60;
    gameActive = true;
    
    scoreElement.textContent = score;
    timeElement.textContent = timeLeft;
    messageElement.textContent = '';
    messageElement.className = 'message';
    
    startTimer();
    newWord();
    
    userInput.value = '';
    userInput.focus();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function newWord() {
    if (!gameActive) return;
    
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex].word.toLowerCase();
    hintText.textContent = words[randomIndex].hint;

    scrambledWord = scrambleWord(currentWord);
    scrambledWordElement.textContent = scrambledWord;
}

function scrambleWord(word) {
    const letters = word.split('');
    
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    
    if (letters.join('') === word) {
        return scrambleWord(word);
    }
    
    return letters.join('');
}

function checkAnswer() {
    if (!gameActive) return;
    
    const userAnswer = userInput.value.trim().toLowerCase();
    
    if (userAnswer === '') {
        showMessage('Please enter an answer!', 'incorrect');
        return;
    }
    
    if (userAnswer === currentWord) {
        score += 10;
        scoreElement.textContent = score;
        showMessage('Correct! +10 points', 'correct');
        newWord();
        userInput.value = '';
    } else {
        showMessage('Incorrect! Try again', 'incorrect');
    }
    
    userInput.focus();
}

function skipWord() {
    if (!gameActive) return;
    
    showMessage('Word skipped', 'incorrect');
    newWord();
    userInput.value = '';
    userInput.focus();
}

function useHint() {
    if (!gameActive || timeLeft <= 5) return;
    
    timeLeft -= 5;
    timeElement.textContent = timeLeft;

    const hiddenLetters = [];
    const scrambledLetters = scrambledWord.split('');

    for (let i = 0; i < scrambledLetters.length; i++) {
        if (scrambledLetters[i] !== currentWord[i]) {
            hiddenLetters.push(i);
        }
    }
    
    if (hiddenLetters.length > 0) {
        const revealIndex = hiddenLetters[Math.floor(Math.random() * hiddenLetters.length)];
        scrambledLetters[revealIndex] = currentWord[revealIndex];
        scrambledWord = scrambledLetters.join('');
        scrambledWordElement.textContent = scrambledWord;
    }
    
    userInput.focus();
}

function showMessage(msg, type) {
    messageElement.textContent = msg;
    messageElement.className = 'message ' + type;
    
    setTimeout(() => {
        messageElement.textContent = '';
        messageElement.className = 'message';
    }, 2000);
}

function endGame() {
    gameActive = false;
    clearInterval(timer);
    
    scrambledWordElement.textContent = 'Game Over!';
    hintText.textContent = '';
    userInput.disabled = true;
    submitBtn.disabled = true;
    hintBtn.disabled = true;
    skipBtn.disabled = true;
    
    showMessage(`Final Score: ${score}`, 'correct');
}

submitBtn.addEventListener('click', checkAnswer);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

hintBtn.addEventListener('click', useHint);
skipBtn.addEventListener('click', skipWord);
resetBtn.addEventListener('click', () => {
    userInput.disabled = false;
    submitBtn.disabled = false;
    hintBtn.disabled = false;
    skipBtn.disabled = false;
    initGame();
});

window.addEventListener('load', initGame);