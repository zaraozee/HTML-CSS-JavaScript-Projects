const words = [
    { word: "javascript", hint: "Programming language" },
    { word: "hangman", hint: "Classic word guessing game" },
    { word: "developer", hint: "Person who writes code" },
    { word: "keyboard", hint: "Computer input device" },
    { word: "internet", hint: "Worldwide network" },
    { word: "algorithm", hint: "Step-by-step procedure" }
];

let selectedWord = '';
let guessedLetters = [];
let wrongLetters = [];
let remainingGuesses = 6;
let gameOver = false;

const wordDisplay = document.getElementById('word-display');
const hintText = document.getElementById('hint-text');
const guessesLeft = document.getElementById('guesses-left');
const wrongLettersElement = document.getElementById('wrong-letters');
const keyboard = document.getElementById('keyboard');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');

function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)].word.toLowerCase();
    guessedLetters = [];
    wrongLetters = [];
    remainingGuesses = 6;
    gameOver = false;

    updateWordDisplay();
    hintText.textContent = words.find(w => w.word === selectedWord).hint;
    guessesLeft.textContent = remainingGuesses;
    wrongLettersElement.textContent = '';
    message.textContent = '';
    resetBtn.style.display = 'none';

    createKeyboard();
}

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

function handleGuess(letter) {
    if (gameOver || guessedLetters.includes(letter) || wrongLetters.includes(letter)) return;
    
    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        updateWordDisplay();
        checkWin();
    } else {
        wrongLetters.push(letter);
        remainingGuesses--;
        updateGameStatus();
        checkLose();
    }

    document.getElementById(`key-${letter}`).disabled = true;
}

function updateWordDisplay() {
    wordDisplay.innerHTML = selectedWord
        .split('')
        .map(letter => guessedLetters.includes(letter) ? letter : '_')
        .join(' ');
}

function updateGameStatus() {
    guessesLeft.textContent = remainingGuesses;
    wrongLettersElement.textContent = wrongLetters.join(', ');
}

function checkWin() {
    if (selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
        gameOver = true;
        message.textContent = 'Congratulations! You won!';
        message.style.color = '#4CAF50';
        resetBtn.style.display = 'inline-block';
    }
}

function checkLose() {
    if (remainingGuesses <= 0) {
        gameOver = true;
        message.textContent = `Game over! The word was ${selectedWord}.`;
        message.style.color = '#d32f2f';
        resetBtn.style.display = 'inline-block';
    }
}

resetBtn.addEventListener('click', initGame);
window.addEventListener('load', initGame);
document.addEventListener('keydown', (e) => {
    if (/^[a-z]$/.test(e.key.toLowerCase())) {
        handleGuess(e.key.toLowerCase());
    }
});