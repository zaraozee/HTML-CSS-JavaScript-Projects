// Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Elements
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearBtn = document.getElementById('clear-btn');
const brushBtn = document.getElementById('brush-btn');
const eraserBtn = document.getElementById('eraser-btn');
const saveBtn = document.getElementById('save-btn');
const loadBtn = document.getElementById('load-btn');

// State variables
let size = 10;
let isPressed = false;
let color = colorEl.value;
let currentTool = 'brush';
let x, y;

// Set canvas size to match container
function resizeCanvas() {
    const container = document.querySelector('.canvas-container');
    canvas.width = container.clientWidth - 40;
    canvas.height = container.clientHeight - 40;
    
    // Redraw canvas content if needed
    // (You might want to implement a way to preserve drawings on resize)
}

// Initialize canvas
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Event Listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseout', stopDrawing);

// Touch support for mobile devices
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchend', handleTouchEnd);
canvas.addEventListener('touchmove', handleTouchMove);

// Button events
increaseBtn.addEventListener('click', increaseSize);
decreaseBtn.addEventListener('click', decreaseSize);
colorEl.addEventListener('change', updateColor);
clearBtn.addEventListener('click', clearCanvas);
brushBtn.addEventListener('click', () => setTool('brush'));
eraserBtn.addEventListener('click', () => setTool('eraser'));
saveBtn.addEventListener('click', saveCanvas);
loadBtn.addEventListener('click', loadCanvas);

// Color presets
document.querySelectorAll('.color-preset').forEach(preset => {
    preset.addEventListener('click', function() {
        color = this.style.backgroundColor;
        colorEl.value = rgbToHex(color);
        if (currentTool === 'eraser') {
            setTool('brush');
        }
    });
});

// Drawing functions
function startDrawing(e) {
    isPressed = true;
    [x, y] = getPosition(e);
    
    // Draw a single dot when just clicking
    drawCircle(x, y);
}

function stopDrawing() {
    isPressed = false;
    x = undefined;
    y = undefined;
}

function draw(e) {
    if (!isPressed) return;
    
    const [x2, y2] = getPosition(e);
    
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    
    x = x2;
    y = y2;
}

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = currentTool === 'eraser' ? '#ffffff' : color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = currentTool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = size * 2;
    ctx.lineCap = 'round';
    ctx.stroke();
}

// Tool functions
function setTool(tool) {
    currentTool = tool;
    
    // Update active button state
    brushBtn.classList.toggle('active', tool === 'brush');
    eraserBtn.classList.toggle('active', tool === 'eraser');
    
    // Change cursor
    canvas.style.cursor = tool === 'eraser' ? 'cell' : 'crosshair';
}

// Size functions
function increaseSize() {
    size += 5;
    if (size > 50) size = 50;
    updateSizeDisplay();
}

function decreaseSize() {
    size -= 5;
    if (size < 5) size = 5;
    updateSizeDisplay();
}

function updateSizeDisplay() {
    sizeEl.textContent = size;
}

// Color functions
function updateColor(e) {
    color = e.target.value;
    if (currentTool === 'eraser') {
        setTool('brush');
    }
}

// Canvas functions
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function loadCanvas() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = event => {
            const img = new Image();
            img.onload = () => {
                clearCanvas();
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };
    
    input.click();
}

// Helper functions
function getPosition(e) {
    let posX, posY;
    
    if (e.type.includes('touch')) {
        const rect = canvas.getBoundingClientRect();
        posX = e.touches[0].clientX - rect.left;
        posY = e.touches[0].clientY - rect.top;
    } else {
        posX = e.offsetX;
        posY = e.offsetY;
    }
    
    return [posX, posY];
}

function handleTouchStart(e) {
    e.preventDefault();
    startDrawing(e.touches[0]);
}

function handleTouchEnd(e) {
    e.preventDefault();
    stopDrawing();
}

function handleTouchMove(e) {
    e.preventDefault();
    draw(e.touches[0]);
}

function rgbToHex(rgb) {
    // Convert rgb color string to hex
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return rgb;
    
    const r = parseInt(match[1], 10).toString(16).padStart(2, '0');
    const g = parseInt(match[2], 10).toString(16).padStart(2, '0');
    const b = parseInt(match[3], 10).toString(16).padStart(2, '0');
    
    return `#${r}${g}${b}`;
}