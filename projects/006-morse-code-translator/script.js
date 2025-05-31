// Morse Code Dictionary
const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 
    'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--', 
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', 
    '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', 
    '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', 
    ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', 
    '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.', ' ': '/'
};

// Reverse dictionary for Morse to text
const reverseMorseCode = {};
for (const key in morseCode) {
    reverseMorseCode[morseCode[key]] = key;
}

// DOM Elements
const inputField = document.getElementById('input');
const outputField = document.getElementById('output');
const translateBtn = document.getElementById('translate');
const swapBtn = document.getElementById('swap');
const clearBtn = document.getElementById('clear');
const directionIndicator = document.getElementById('direction');
const cheatsheet = document.getElementById('cheatsheet');

// State
let translateDirection = 'textToMorse'; // or 'morseToText'

// Initialize
function init() {
    generateCheatsheet();
    setupEventListeners();
    updateDirectionIndicator();
}

// Generate cheatsheet
function generateCheatsheet() {
    const popularCharacters = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'E': '.', 'F': '..-.',
        'H': '....', 'I': '..', 'L': '.-..', 'M': '--', 'O': '---',
        'R': '.-.', 'S': '...', 'T': '-', '1': '.----', '2': '..---',
        '3': '...--', 'SOS': '... --- ...', ' ': '/'
    };

    for (const [char, code] of Object.entries(popularCharacters)) {
        const item = document.createElement('div');
        item.className = 'cheatsheet-item';
        item.textContent = `${char} = ${code}`;
        cheatsheet.appendChild(item);
    }
}

// Event Listeners
function setupEventListeners() {
    translateBtn.addEventListener('click', translate);
    swapBtn.addEventListener('click', swapDirection);
    clearBtn.addEventListener('click', clearFields);
    inputField.addEventListener('input', handleInput);
}

// Translation functions
function translate() {
    const inputText = inputField.value.trim();
    
    if (!inputText) {
        showError('Please enter some text or Morse code');
        return;
    }

    try {
        if (translateDirection === 'textToMorse') {
            outputField.textContent = textToMorse(inputText);
        } else {
            outputField.textContent = morseToText(inputText);
        }
    } catch (error) {
        showError(error.message);
    }
}

function textToMorse(text) {
    return text.toUpperCase().split('').map(char => {
        if (morseCode[char] !== undefined) {
            return morseCode[char];
        } else if (char === ' ') {
            return '/';
        } else {
            throw new Error(`Unsupported character: ${char}`);
        }
    }).join(' ');
}

function morseToText(morse) {
    return morse.split('/').map(word => {
        return word.trim().split(' ').map(code => {
            if (reverseMorseCode[code] !== undefined) {
                return reverseMorseCode[code];
            } else if (code === '') {
                return '';
            } else {
                throw new Error(`Invalid Morse code: ${code}`);
            }
        }).join('');
    }).join(' ').toLowerCase();
}

// UI Functions
function swapDirection() {
    translateDirection = translateDirection === 'textToMorse' ? 'morseToText' : 'textToMorse';
    updateDirectionIndicator();
    clearFields();
}

function updateDirectionIndicator() {
    const directionText = translateDirection === 'textToMorse' 
        ? 'Current: Text → Morse' 
        : 'Current: Morse → Text';
    directionIndicator.textContent = directionText;
}

function clearFields() {
    inputField.value = '';
    outputField.textContent = '';
}

function showError(message) {
    outputField.textContent = message;
    outputField.style.color = 'var(--error-color)';
    setTimeout(() => {
        outputField.style.color = '';
    }, 3000);
}

function handleInput() {
    if (translateDirection === 'morseToText') {
        // Auto-translate as user types in Morse mode
        const inputText = inputField.value.trim();
        if (inputText && (inputText.endsWith(' ') || inputText.endsWith('/'))) {
            translate();
        }
    }
}

// Initialize the app
init();