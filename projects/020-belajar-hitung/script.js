const problemElement = document.getElementById('problem');
const visualization = document.getElementById('visualization');
const answerInput = document.getElementById('answer');
const checkBtn = document.getElementById('check-btn');
const resultElement = document.getElementById('result');

const operations = ["+", "-", "×"];
const images = [
  "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", 
  "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", 
  "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", 
  "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", 
  "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", 
];

let currentAnswer = 0;

function generateProblem() {
  const num1 = Math.floor(Math.random() * 5) + 1;
  const num2 = Math.floor(Math.random() * 5) + 1;
  const op = operations[Math.floor(Math.random() * operations.length)];

  let expression = `${num1} ${op} ${num2}`;
  let result = 0;

  switch (op) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "×":
      result = num1 * num2;
      break;
  }

  currentAnswer = result;
  problemElement.textContent = `Apa hasil dari ${expression}?`;
  visualizeProblem(num1, num2, op);

  answerInput.value = "";
  resultElement.textContent = "";
  resultElement.className = "result";
  answerInput.focus();
}

function visualizeProblem(num1, num2, op) {
  visualization.innerHTML = "";
  
  if (op === "+") {
    for (let i = 0; i < num1; i++) {
      addImage(images[i % images.length], "group1");
    }
    
    const plus = document.createElement('span');
    plus.textContent = " + ";
    plus.style.fontSize = "2rem";
    plus.style.margin = "0 10px";
    visualization.appendChild(plus);
    
    for (let i = 0; i < num2; i++) {
      addImage(images[i % images.length], "group2");
    }
  } 
  else if (op === "-") {
    const total = num1;
    const toRemove = num2;
    
    for (let i = 0; i < total; i++) {
      const img = addImage(images[i % images.length], i < (total - toRemove) ? "remaining" : "removed");
      if (i >= (total - toRemove)) {
        img.style.opacity = "0.5";
        img.style.filter = "grayscale(100%)";
      }
    }
  } 
  else if (op === "×") {
    for (let group = 0; group < num1; group++) {
      for (let i = 0; i < num2; i++) {
        addImage(images[i % images.length], `group${group}`);
      }
      
      if (group < num1 - 1) {
        const plus = document.createElement('span');
        plus.textContent = " + ";
        plus.style.fontSize = "2rem";
        plus.style.margin = "0 5px";
        visualization.appendChild(plus);
      }
    }
  }
}

function addImage(src, groupClass) {
  const img = document.createElement('img');
  img.src = src;
  img.classList.add(groupClass);
  visualization.appendChild(img);
  return img;
}

function checkAnswer() {
  const userAnswer = parseInt(answerInput.value);
  
  if (isNaN(userAnswer)) {
    resultElement.textContent = "Masukkan jawabanmu dulu!";
    resultElement.className = "result incorrect";
    return;
  }
  
  if (userAnswer === currentAnswer) {
    resultElement.textContent = "✅ Jawaban Benar!";
    resultElement.className = "result correct";
  } else {
    resultElement.textContent = `❌ Salah! Jawaban yang benar adalah ${currentAnswer}`;
    resultElement.className = "result incorrect";
  }
  
  setTimeout(generateProblem, 2000);
}

checkBtn.addEventListener('click', checkAnswer);
answerInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    checkAnswer();
  }
});

generateProblem();