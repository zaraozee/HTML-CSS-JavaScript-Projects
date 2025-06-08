// Game data
const words = [
    { word: "javascript", hint: "Programming language" },
    { word: "hangman", hint: "Classic word guessing game" },
    { word: "developer", hint: "Person who writes code" },
    { word: "keyboard", hint: "Computer input device" },
    { word: "internet", hint: "Worldwide network" },
    { word: "algorithm", hint: "Step-by-step procedure" }
];

// Game state
let selectedWord = '';
let guessedLetters = [];
let wrongLetters = [];
let remainingGuesses = 6;
let gameOver = false;

// Hangman parts to reveal
const hangmanParts = ["head", "body", "left-arm", "right-arm", "left-leg", "right-leg"];
let partsRevealed = 0;

// DOM elements
const wordDisplay = document.getElementById('word-display');
const hintText = document.getElementById('hint-text');
const wrongLettersElement = document.getElementById('wrong-letters');
const keyboard = document.getElementById('keyboard');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');

// Initialize the game
function initGame() {
    // Reset game state
    const randomWord = words[Math.floor(Math.random() * words.length)];
    selectedWord = randomWord.word.toLowerCase();
    guessedLetters = [];
    wrongLetters = [];
    remainingGuesses = 6;
    gameOver = false;
    partsRevealed = 0;
    
    // Hide all hangman parts
    hangmanParts.forEach(part => {
        document.getElementById(part).style.display = 'none';
    });
    
    // Update UI
    updateWordDisplay();
    hintText.textContent = randomWord.hint;
    wrongLettersElement.textContent = '';
    message.textContent = '';
    resetBtn.style.display = 'none';
    
    // Create keyboard buttons
    createKeyboard();
}

// Create keyboard buttons
function createKeyboard() {
    keyboard.innerHTML = '';
    for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');
        button.className = 'key';
        button.textContent = letter;
        button.id = `key-${letter}`;
        button.addEventListener('click', () => handleGuess(letter));
        keyboard.appendChild(button);
    }
}

// Handle letter guess
function handleGuess(letter) {
    if (gameOver || guessedLetters.includes(letter) || wrongLetters.includes(letter)) return;
    
    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        updateWordDisplay();
        checkWin();
    } else {
        wrongLetters.push(letter);
        remainingGuesses--;
        revealHangmanPart();
        updateWrongLetters();
        checkLose();
    }
    
    // Disable the guessed letter button
    document.getElementById(`key-${letter}`).disabled = true;
}

// Update the word display with guessed letters
function updateWordDisplay() {
    wordDisplay.innerHTML = selectedWord
        .split('')
        .map(letter => guessedLetters.includes(letter) ? letter : '_')
        .join(' ');
}

// Update wrong letters display
function updateWrongLetters() {
    wrongLettersElement.textContent = wrongLetters.join(', ');
}

// Reveal next hangman part
function revealHangmanPart() {
    if (partsRevealed < hangmanParts.length) {
        document.getElementById(hangmanParts[partsRevealed]).style.display = 'block';
        partsRevealed++;
    }
}

// Check if player won
function checkWin() {
    if (selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
        gameOver = true;
        message.textContent = 'Congratulations! You won!';
        message.style.color = '#4CAF50';
        resetBtn.style.display = 'inline-block';
    }
}

// Check if player lost
function checkLose() {
    if (remainingGuesses <= 0) {
        gameOver = true;
        message.textContent = `Game over! The word was "${selectedWord}".`;
        message.style.color = '#d32f2f';
        resetBtn.style.display = 'inline-block';
        
        // Reveal the full word
        wordDisplay.innerHTML = selectedWord.split('').join(' ');
    }
}

// Event listener for reset button
resetBtn.addEventListener('click', initGame);

// Initialize the game when page loads
window.addEventListener('load', initGame);

// Keyboard event listener for letter keys
document.addEventListener('keydown', (e) => {
    if (/^[a-z]$/.test(e.key.toLowerCase())) {
        handleGuess(e.key.toLowerCase());
    }
});