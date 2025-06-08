const board = document.getElementById('board');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (cells[index] !== '' || gameOver) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());

  if (checkWinner()) {
    statusText.textContent = `Pemenang: ${currentPlayer}!`;
    gameOver = true;
    highlightWinningCells();
    return;
  }

  if (cells.every(cell => cell !== '')) {
    statusText.textContent = "Hasil: Seri!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Giliran: ${currentPlayer}`;
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // baris
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // kolom
    [0, 4, 8], [2, 4, 6]             // diagonal
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function highlightWinningCells() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
  ];

  const winningPattern = winPatterns.find(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });

  if (winningPattern) {
    winningPattern.forEach(index => {
      const cell = document.querySelector(`.cell[data-index="${index}"]`);
      cell.style.backgroundColor = currentPlayer === 'X' ? 'rgba(255, 107, 107, 0.2)' : 'rgba(78, 205, 196, 0.2)';
      cell.style.transform = 'scale(1.1)';
    });
  }
}

function restartGame() {
  cells = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  statusText.textContent = `Giliran: ${currentPlayer}`;
  createBoard();
}

// Inisialisasi
createBoard();