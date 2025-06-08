const symbols = ['🍎', '🐱', '🚗', '🏠', '🌳', '📚', '🌞', '🍕', '⚽', '🎸', '✈️', '🏆', '🎮', '🍦', '🎨'];
let cards = [];
let flippedCards = [];
let matchesFound = 0;
let mistakes = 0;
let timer = null;
let seconds = 0;
const gameElement = document.getElementById('game');
const matchesElement = document.getElementById('matches');
const mistakesElement = document.getElementById('mistakes');
const timeElement = document.getElementById('time');
const restartBtn = document.getElementById('restartBtn');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(symbol, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.dataset.index = index;

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.textContent = symbol;

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener('click', onCardClick);
    return card;
}

function startTimer() {
    clearInterval(timer);
    seconds = 0;
    updateTimer();
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    seconds++;
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    timeElement.textContent = `${mins}:${secs}`;
}

function initGame() {
    // Double the symbols for pairs
    cards = [...symbols, ...symbols];
    shuffle(cards);
    gameElement.innerHTML = '';
    matchesFound = 0;
    mistakes = 0;
    matchesElement.textContent = matchesFound;
    mistakesElement.textContent = mistakes;
    flippedCards = [];
    clearInterval(timer);
    startTimer();

    cards.forEach((symbol, index) => {
        const cardElement = createCard(symbol, index);
        gameElement.appendChild(cardElement);
    });
}

function onCardClick(e) {
    const clickedCard = e.currentTarget;
    if (
        flippedCards.length === 2 ||
        flippedCards.includes(clickedCard) ||
        clickedCard.classList.contains('flipped') ||
        clickedCard.classList.contains('matched')
    ) {
        return;
    }

    flipCard(clickedCard);
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function flipCard(card) {
    card.classList.add('flipped');
}

function unflipCards() {
    flippedCards.forEach(card => {
        card.classList.remove('flipped');
    });
    flippedCards = [];
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        matchesFound++;
        matchesElement.textContent = matchesFound;
        flippedCards.forEach(card => {
            card.classList.add('matched');
            card.classList.remove('flipped');
        });
        flippedCards = [];
        
        if (matchesFound === symbols.length) {
            clearInterval(timer);
            setTimeout(() => {
                const time = timeElement.textContent;
                alert(`Selamat! Anda menemukan semua pasangan dalam ${time} dengan ${mistakes} kesalahan!`);
            }, 500);
        }
    } else {
        mistakes++;
        mistakesElement.textContent = mistakes;
        setTimeout(() => unflipCards(), 1000);
    }
}

restartBtn.addEventListener('click', initGame);
window.addEventListener('load', initGame);