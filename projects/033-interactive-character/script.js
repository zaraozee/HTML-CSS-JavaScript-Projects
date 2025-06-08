document.addEventListener('DOMContentLoaded', function() {
    const character = document.getElementById('character');
    const danceBtn = document.getElementById('dance-btn');
    const jumpBtn = document.getElementById('jump-btn');
    const resetBtn = document.getElementById('reset-btn');
    const moodDisplay = document.getElementById('mood');
    const leftArm = document.querySelector('.left-arm');
    const rightArm = document.querySelector('.right-arm');
    const leftLeg = document.querySelector('.left-leg');
    const rightLeg = document.querySelector('.right-leg');
    const mouth = document.querySelector('.mouth');
    const eyes = document.querySelectorAll('.eye');

    const states = {
        current: 'happy',
        happy: {
            mood: 'Happy',
            class: 'happy',
            armPosition: 'default',
            legPosition: 'default'
        },
        dancing: {
            mood: 'Dancing',
            class: 'dancing happy',
            armPosition: 'dancing',
            legPosition: 'dancing'
        },
        jumping: {
            mood: 'Jumping',
            class: 'jumping surprised',
            armPosition: 'jumping',
            legPosition: 'jumping'
        },
        sad: {
            mood: 'Sad',
            class: 'sad',
            armPosition: 'sad',
            legPosition: 'sad'
        }
    };

    danceBtn.addEventListener('click', function() {
        setState('dancing');
    });

    jumpBtn.addEventListener('click', function() {
        setState('jumping');
    });

    resetBtn.addEventListener('click', function() {
        setState('happy');
    });

    document.addEventListener('mousemove', function(e) {
        if (states.current !== 'dancing' && states.current !== 'jumping') {
            const x = e.clientX;
            const y = e.clientY;
            
            const characterRect = character.getBoundingClientRect();
            const characterX = characterRect.left + characterRect.width / 2;
            const characterY = characterRect.top + characterRect.height / 2;
            
            const angle = Math.atan2(y - characterY, x - characterX) * 180 / Math.PI;
            
            eyes.forEach(eye => {
                eye.style.transform = `rotate(${angle}deg)`;
            });
        }
    });

    character.addEventListener('click', function() {
        if (states.current === 'happy') {
            setState('sad');
        } else {
            setState('happy');
        }
    });

    function setState(state) {
        character.className = 'character';
        character.classList.add(states[state].class);
        states.current = state;
        moodDisplay.textContent = states[state].mood;

        setArmPosition(states[state].armPosition);
        setLegPosition(states[state].legPosition);
    }

    function setArmPosition(position) {
        switch(position) {
            case 'dancing':
                leftArm.style.transform = 'rotate(60deg)';
                rightArm.style.transform = 'rotate(-60deg)';
                break;
            case 'jumping':
                leftArm.style.transform = 'rotate(120deg)';
                rightArm.style.transform = 'rotate(-120deg)';
                break;
            case 'sad':
                leftArm.style.transform = 'rotate(30deg)';
                rightArm.style.transform = 'rotate(-30deg)';
                break;
            default:
                leftArm.style.transform = 'rotate(0)';
                rightArm.style.transform = 'rotate(0)';
        }
    }

    function setLegPosition(position) {
        switch(position) {
            case 'dancing':
                leftLeg.style.transform = 'rotate(20deg)';
                rightLeg.style.transform = 'rotate(-20deg)';
                break;
            case 'jumping':
                leftLeg.style.transform = 'rotate(-10deg)';
                rightLeg.style.transform = 'rotate(10deg)';
                break;
            default:
                leftLeg.style.transform = 'rotate(0)';
                rightLeg.style.transform = 'rotate(0)';
        }
    }
});