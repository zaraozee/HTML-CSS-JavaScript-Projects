const quizData = [
    {
        question: "Apa ibukota Indonesia?",
        options: ["Jakarta", "Bandung", "Surabaya", "Medan"],
        correctAnswer: "Jakarta"
    },
    {
        question: "Pulau terbesar di Indonesia adalah?",
        options: ["Jawa", "Sumatera", "Kalimantan", "Papua"],
        correctAnswer: "Papua"
    },
    {
        question: "Siapa presiden pertama Indonesia?",
        options: ["Soeharto", "Joko Widodo", "Soekarno", "BJ Habibie"],
        correctAnswer: "Soekarno"
    },
    {
        question: "Gunung tertinggi di Indonesia adalah?",
        options: ["Semeru", "Rinjani", "Kerinci", "Jaya Wijaya"],
        correctAnswer: "Jaya Wijaya"
    },
    {
        question: "Batik berasal dari daerah?",
        options: ["Bali", "Jawa Tengah", "Yogyakarta", "Sumatera"],
        correctAnswer: "Jawa Tengah"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

const startScreen = document.getElementById('start-screen');
const quizContainer = document.getElementById('quiz-container');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const timeElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
const leaderboardElement = document.getElementById('leaderboard');

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    startScreen.style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        endQuiz();
        return;
    }

    const quiz = quizData[currentQuestion];
    questionElement.textContent = quiz.question;
    optionsContainer.innerHTML = '';

    quiz.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });

    feedbackElement.textContent = '';
    nextBtn.style.display = 'none';
}

function checkAnswer(selectedOption) {
    const quiz = quizData[currentQuestion];
    const options = document.querySelectorAll('.option-btn');

    options.forEach(option => {
        option.disabled = true;
        if (option.textContent === quiz.correctAnswer) {
            option.classList.add('correct');
        } else if (option.textContent === selectedOption && selectedOption !== quiz.correctAnswer) {
            option.classList.add('incorrect');
        }
    });

    if (selectedOption === quiz.correctAnswer) {
        feedbackElement.textContent = "Benar! 🎉";
        feedbackElement.style.color = "#2a9d8f";
        score += 20;
        scoreElement.textContent = score;
    } else {
        feedbackElement.textContent = `Salah! Jawaban benar: ${quiz.correctAnswer}`;
        feedbackElement.style.color = "#e63946";
    }

    nextBtn.style.display = 'block';
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    loadQuestion();
    resetTimer();
});

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            feedbackElement.textContent = "Waktu habis! ⏰";
            nextBtn.style.display = 'block';
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timeElement.textContent = timeLeft;
    startTimer();
}

function endQuiz() {
    clearInterval(timer);
    quizContainer.style.display = 'none';
    resultScreen.style.display = 'block';

    finalScoreElement.textContent = `Skor Akhir: ${score}`;

    leaderboard.push(score);
    leaderboard.sort((a, b) => b - a);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    leaderboardElement.innerHTML = '';
    leaderboard.slice(0, 5).forEach((score, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${score} poin`;
        leaderboardElement.appendChild(li);
    });
}

restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    timeLeft = 30;
    resultScreen.style.display = 'none';
    startQuiz();
});