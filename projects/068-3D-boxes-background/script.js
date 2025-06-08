document.addEventListener('DOMContentLoaded', () => {
    const boxesContainer = document.getElementById('boxes');
    const container = document.querySelector('.container');

    function createBoxes() {
        const boxSize = window.innerWidth < 768 ? 30 : 40;
        const margin = window.innerWidth < 768 ? 5 : 10;
        const boxesPerRow = Math.floor(window.innerWidth / (boxSize + margin * 2));
        const boxesPerCol = Math.floor(window.innerHeight / (boxSize + margin * 2));
        const totalBoxes = boxesPerRow * boxesPerCol;
        
        boxesContainer.innerHTML = '';
        
        for (let i = 0; i < totalBoxes; i++) {
            const box = document.createElement('div');
            box.classList.add('box');
            boxesContainer.appendChild(box);
        }
    }

    createBoxes();

    container.addEventListener('mousemove', (e) => {
        const boxes = document.querySelectorAll('.box');
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        boxes.forEach(box => {
            const boxRect = box.getBoundingClientRect();
            const boxCenterX = boxRect.left + boxRect.width / 2;
            const boxCenterY = boxRect.top + boxRect.height / 2;
            
            const distanceX = mouseX - boxCenterX;
            const distanceY = mouseY - boxCenterY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            const maxDistance = Math.sqrt(
                Math.pow(window.innerWidth / 2, 2) + 
                Math.pow(window.innerHeight / 2, 2)
            );
            
            const rotationX = (distanceY / window.innerHeight) * 45;
            const rotationY = (distanceX / window.innerWidth) * -45;
            const scale = 1 - (distance / maxDistance) * 0.5;
            
            box.style.transform = `
                rotateX(${rotationX}deg)
                rotateY(${rotationY}deg)
                scale(${Math.max(scale, 0.7)})
            `;
            
            const hue = (distance / maxDistance) * 120 + 200;
            box.style.background = `
                linear-gradient(45deg, 
                hsl(${hue}, 70%, 40%), 
                hsl(${hue + 20}, 70%, 50%))
            `;
        });
    });

    window.addEventListener('resize', () => {
        createBoxes();
    });

    container.addEventListener('mouseleave', () => {
        const boxes = document.querySelectorAll('.box');
        boxes.forEach(box => {
            box.style.transform = 'rotateX(0) rotateY(0) scale(1)';
            box.style.background = 'linear-gradient(45deg, #2c3e50, #4ca1af)';
        });
    });
});