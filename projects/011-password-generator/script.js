const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const lengthValueEl = document.getElementById('length-value');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const strengthBarEl = document.querySelector('.strength-bar');
const strengthTextEl = document.querySelector('.strength-text');
const historyListEl = document.getElementById('history-list');
const themeToggleEl = document.getElementById('theme-toggle');
const notificationEl = document.getElementById('notification');
const passwordDisplayEl = document.querySelector('.password-display');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

lengthValueEl.textContent = lengthEl.value;
let passwordHistory = JSON.parse(localStorage.getItem('passwordHistory')) || [];

lengthEl.addEventListener('input', (e) => {
    lengthValueEl.textContent = e.target.value;
});

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    
    const password = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
    
    if (password) {
        resultEl.innerText = password;
        updatePasswordStrength(password);
        addToHistory(password);
    }
});

clipboardEl.addEventListener('click', () => {
    const password = resultEl.innerText;
    
    if (!password) {
        showNotification('No password to copy!', 'warning');
        return;
    }
    
    const textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    
    showNotification('Password copied to clipboard!');
});

passwordDisplayEl.addEventListener('click', () => {
    const range = document.createRange();
    range.selectNodeContents(passwordDisplayEl);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
});

themeToggleEl.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggleEl.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleEl.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
    
    if (typesCount === 0) {
        showNotification('Please select at least one character type!', 'danger');
        return '';
    }
    
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }
    
    const finalPassword = shuffleString(generatedPassword.slice(0, length));
    return finalPassword;
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function updatePasswordStrength(password) {
    let strength = 0;
    const length = password.length;
    
    strength += Math.min(length / 50 * 50, 50);
    
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);
    
    const varietyCount = hasLower + hasUpper + hasNumber + hasSymbol;
    strength += (varietyCount / 4) * 50;
    
    strengthBarEl.style.width = `${strength}%`;
    
    if (strength < 40) {
        strengthBarEl.style.backgroundColor = 'var(--danger-color)';
        strengthTextEl.textContent = 'Strength: Weak';
    } else if (strength < 70) {
        strengthBarEl.style.backgroundColor = 'var(--warning-color)';
        strengthTextEl.textContent = 'Strength: Medium';
    } else {
        strengthBarEl.style.backgroundColor = 'var(--success-color)';
        strengthTextEl.textContent = 'Strength: Strong';
    }
}

function addToHistory(password) {
    passwordHistory.unshift({
        password,
        timestamp: new Date().toLocaleString()
    });
    
    if (passwordHistory.length > 5) {
        passwordHistory = passwordHistory.slice(0, 5);
    }
    
    localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    historyListEl.innerHTML = '';
    
    passwordHistory.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.password}</span>
            <span class="copy-history" title="Copy">
                <i class="far fa-copy"></i>
            </span>
        `;
        
        li.querySelector('.copy-history').addEventListener('click', (e) => {
            e.stopPropagation();
            copyToClipboard(item.password);
            showNotification('Password copied!');
        });
        
        li.addEventListener('click', () => {
            resultEl.innerText = item.password;
            updatePasswordStrength(item.password);
        });
        
        historyListEl.appendChild(li);
    });
}


function shuffleString(string) {
    const array = string.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function showNotification(message, type = 'success') {
    notificationEl.textContent = message;
    notificationEl.style.backgroundColor = `var(--${type}-color)`;
    notificationEl.classList.add('show');
    
    setTimeout(() => {
        notificationEl.classList.remove('show');
    }, 2000);
}

updateHistoryDisplay();