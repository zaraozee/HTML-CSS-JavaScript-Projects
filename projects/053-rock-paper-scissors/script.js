document.addEventListener('DOMContentLoaded', () => {
    const playerSelectionDisplay = document.getElementById('player-selection');
    const computerSelectionDisplay = document.getElementById('computer-selection');
    const resultDisplay = document.getElementById('result');
    const playerScoreDisplay = document.getElementById('player-score');
    const computerScoreDisplay = document.getElementById('computer-score');
    const resetButton = document.getElementById('reset');
    
    const choices = ['rock', 'paper', 'scissors'];
    const emojis = {
        rock: '✊',
        paper: '✋',
        scissors: '✌️',
        thinking: '🤔',
        robot: '🤖'
    };
    
    let playerScore = 0;
    let computerScore = 0;
    
    // Event listeners for choice buttons
    document.getElementById('rock').addEventListener('click', () => playRound('rock'));
    document.getElementById('paper').addEventListener('click', () => playRound('paper'));
    document.getElementById('scissors').addEventListener('click', () => playRound('scissors'));
    
    resetButton.addEventListener('click', resetGame);
    
    function playRound(playerChoice) {
        const computerChoice = getComputerChoice();
        const result = getResult(playerChoice, computerChoice);
        
        // Update selections display
        playerSelectionDisplay.textContent = emojis[playerChoice];
        computerSelectionDisplay.textContent = emojis[computerChoice];
        
        // Update result and scores
        resultDisplay.textContent = result;
        
        if (result.includes('Win')) {
            playerScore++;
            playerScoreDisplay.textContent = playerScore;
        } else if (result.includes('Lose')) {
            computerScore++;
            computerScoreDisplay.textContent = computerScore;
        }
    }
    
    function getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }
    
    function getResult(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return "It's a Tie!";
        }
        
        switch (playerChoice) {
            case 'rock':
                return computerChoice === 'scissors' ? 'You Win! Rock beats Scissors' : 'You Lose! Paper beats Rock';
            case 'paper':
                return computerChoice === 'rock' ? 'You Win! Paper beats Rock' : 'You Lose! Scissors beat Paper';
            case 'scissors':
                return computerChoice === 'paper' ? 'You Win! Scissors beat Paper' : 'You Lose! Rock beats Scissors';
            default:
                return 'Invalid choice';
        }
    }
    
    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        playerScoreDisplay.textContent = playerScore;
        computerScoreDisplay.textContent = computerScore;
        resultDisplay.textContent = 'Choose your move!';
        playerSelectionDisplay.textContent = emojis.thinking;
        computerSelectionDisplay.textContent = emojis.robot;
    }
});