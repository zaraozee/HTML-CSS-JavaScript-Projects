document.addEventListener('DOMContentLoaded', () => {
    const textEl = document.getElementById('text');
    const speedControl = document.getElementById('speed');
    const speedValue = document.getElementById('speed-value');
    const textInput = document.getElementById('text-input');
    const updateBtn = document.getElementById('update-text');
    const cursor = document.querySelector('.cursor');
    
    let text = textInput.value;
    let idx = 1;
    let speed = 300 / speedControl.value;
    let isTyping = true;
    let timeoutId;
    
    speedValue.textContent = speedControl.value;
    writeText();
    
    function writeText() {
        textEl.textContent = text.slice(0, idx);
        
        if (isTyping) {
            idx++;
            if (idx > text.length) {
                isTyping = false;
                timeoutId = setTimeout(() => {
                    isTyping = true;
                    idx = 1;
                    writeText();
                }, 2000); 
                return;
            }
        } else {
            idx--;
            if (idx <= 0) {
                isTyping = true;
                idx = 1;
            }
        }
        
        timeoutId = setTimeout(writeText, speed);
    }
    
    speedControl.addEventListener('input', (e) => {
        speed = 300 / e.target.value;
        speedValue.textContent = e.target.value;
        clearTimeout(timeoutId);
        writeText();
    });

    updateBtn.addEventListener('click', () => {
        if (textInput.value.trim() !== '') {
            text = textInput.value;
            idx = 1;
            isTyping = true;
            clearTimeout(timeoutId);
            writeText();
        }
    });

    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            updateBtn.click();
        }
    });

    function toggleCursor() {
        cursor.style.animation = 'none';
        setTimeout(() => {
            cursor.style.animation = 'blink 0.8s infinite';
        }, 10);
    }

    toggleCursor();
});