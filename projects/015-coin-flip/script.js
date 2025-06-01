document.addEventListener('DOMContentLoaded', () => {
    const coin = document.getElementById('coin');
    const flipBtn = document.getElementById('flip-btn');
    const headsCount = document.getElementById('heads-count');
    const tailsCount = document.getElementById('tails-count');
    const resultDisplay = document.getElementById('result');
    const flipSound = document.getElementById('flip-sound');
    const winSound = document.getElementById('win-sound');

    let heads = 0;
    let tails = 0;

    flipBtn.addEventListener('click', flipCoin);

    function flipCoin() {
        flipBtn.disabled = true;
        coin.classList.add('flipping');

        if (flipSound) flipSound.play();

        setTimeout(() => {
            const random = Math.random();
            const isHeads = random < 0.5;
            
            if (isHeads) {
                heads++;
                headsCount.textContent = heads;
                resultDisplay.textContent = "Heads! 🎉";
                resultDisplay.style.color = "#ffd700";
            } else {
                tails++;
                tailsCount.textContent = tails;
                resultDisplay.textContent = "Tails! 🎉";
                resultDisplay.style.color = "#333";
            }

            if (winSound) winSound.play();
            
            coin.classList.remove('flipping');
            flipBtn.disabled = false;
        }, 1500);
    }
});