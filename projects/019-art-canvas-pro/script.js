
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearBtn = document.getElementById('clear-btn');
const brushBtn = document.getElementById('brush-btn');
const eraserBtn = document.getElementById('eraser-btn');
const saveBtn = document.getElementById('save-btn');
const loadBtn = document.getElementById('load-btn');

let size = 10;
let isPressed = false;
let color = colorEl.value;
let currentTool = 'brush';
let x, y;

function resizeCanvas() {
    const container = document.querySelector('.canvas-container');
    canvas.width = container.clientWidth - 40;
    canvas.height = container.clientHeight - 40;
       
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseout', stopDrawing);

canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchend', handleTouchEnd);
canvas.addEventListener('touchmove', handleTouchMove);

increaseBtn.addEventListener('click', increaseSize);
decreaseBtn.addEventListener('click', decreaseSize);
colorEl.addEventListener('change', updateColor);
clearBtn.addEventListener('click', clearCanvas);
brushBtn.addEventListener('click', () => setTool('brush'));
eraserBtn.addEventListener('click', () => setTool('eraser'));
saveBtn.addEventListener('click', saveCanvas);
loadBtn.addEventListener('click', loadCanvas);

document.querySelectorAll('.color-preset').forEach(preset => {
    preset.addEventListener('click', function() {
        color = this.style.backgroundColor;
        colorEl.value = rgbToHex(color);
        if (currentTool === 'eraser') {
            setTool('brush');
        }
    });
});

function startDrawing(e) {
    isPressed = true;
    [x, y] = getPosition(e);
    
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

function setTool(tool) {
    currentTool = tool;

    brushBtn.classList.toggle('active', tool === 'brush');
    eraserBtn.classList.toggle('active', tool === 'eraser');

    canvas.style.cursor = tool === 'eraser' ? 'cell' : 'crosshair';
}

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

function updateColor(e) {
    color = e.target.value;
    if (currentTool === 'eraser') {
        setTool('brush');
    }
}

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
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return rgb;
    
    const r = parseInt(match[1], 10).toString(16).padStart(2, '0');
    const g = parseInt(match[2], 10).toString(16).padStart(2, '0');
    const b = parseInt(match[3], 10).toString(16).padStart(2, '0');
    
    return `#${r}${g}${b}`;
}