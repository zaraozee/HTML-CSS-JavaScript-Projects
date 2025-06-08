const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const newGameBtn = document.getElementById('newGameBtn');
const instruction = document.querySelector('.instruction');

let randomNumber;
let attempts = 0;

function startNewGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  attemptsDisplay.textContent = attempts;
  message.textContent = '';
  message.className = 'message';
  guessInput.value = '';
  guessInput.disabled = false;
  guessBtn.disabled = false;
  newGameBtn.classList.add('hidden');
  instruction.textContent = "Saya sedang memikirkan angka antara 1 dan 100. Bisakah kamu menebaknya?";
  guessInput.focus();
}

function checkGuess() {
  const userGuess = Number(guessInput.value);
  
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    message.textContent = 'Masukkan angka antara 1 dan 100!';
    message.className = 'message incorrect';
    return;
  }
  
  attempts++;
  attemptsDisplay.textContent = attempts;
  
  if (userGuess === randomNumber) {
    message.textContent = `Selamat! Kamu menebak angka ${randomNumber} dalam ${attempts} percobaan!`;
    message.className = 'message correct';
    guessInput.disabled = true;
    guessBtn.disabled = true;
    newGameBtn.classList.remove('hidden');
    instruction.textContent = "Kamu menang! Klik 'Main Lagi' untuk bermain kembali.";
  } else if (userGuess < randomNumber) {
    message.textContent = 'Terlalu rendah! Coba angka yang lebih besar.';
    message.className = 'message hint';
  } else {
    message.textContent = 'Terlalu tinggi! Coba angka yang lebih kecil.';
    message.className = 'message hint';
  }
  
  guessInput.value = '';
  guessInput.focus();
}

guessBtn.addEventListener('click', checkGuess);
newGameBtn.addEventListener('click', startNewGame);
guessInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    checkGuess();
  }
});

// Start the game
startNewGame();