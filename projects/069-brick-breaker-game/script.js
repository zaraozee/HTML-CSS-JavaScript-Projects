document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');

  let gameRunning = false;
  let score = 0;
  let lives = 3;
  let animationId = null;

  const ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    radius: 10,
    dx: 4,
    dy: -4,
    color: '#f72585'
  };

  const paddle = {
    width: 100,
    height: 15,
    x: canvas.width / 2 - 50,
    speed: 8,
    isMoving: false,
    direction: 0,
    color: '#4cc9f0'
  };

  const brick = {
    rowCount: 5,
    colCount: 10,
    width: 65,          
    height: 20,
    padding: 10,
    offsetTop: 70,
    offsetLeft: 25,      
    colors: ['#4cc9f0', '#4895ef', '#4361ee', '#3f37c9', '#3a0ca3']
  };

  const bricks = [];
  for (let r = 0; r < brick.rowCount; r++) {
    bricks[r] = [];
    for (let c = 0; c < brick.colCount; c++) {
      bricks[r][c] = { x: 0, y: 0, status: 1 };
    }
  }

  startBtn.addEventListener('click', startGame);
  resetBtn.addEventListener('click', resetGame);
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);
  canvas.addEventListener('mousemove', mouseMoveHandler);

  function startGame() {
    if (!gameRunning) {
      gameRunning = true;
      draw();
    }
  }

  function resetGame() {
    cancelAnimationFrame(animationId);
    gameRunning = false;
    score = 0;
    lives = 3;
    ball.x = canvas.width / 2;
    ball.y = canvas.height - 30;
    ball.dx = 4;
    ball.dy = -4;
    paddle.x = canvas.width / 2 - 50;

    for (let r = 0; r < brick.rowCount; r++) {
      for (let c = 0; c < brick.colCount; c++) {
        bricks[r][c].status = 1;
      }
    }
    draw();
  }

  function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      paddle.isMoving = true;
      paddle.direction = 1;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      paddle.isMoving = true;
      paddle.direction = -1;
    }
  }

  function keyUpHandler(e) {
    if (
      e.key === 'Right' ||
      e.key === 'ArrowRight' ||
      e.key === 'Left' ||
      e.key === 'ArrowLeft'
    ) {
      paddle.isMoving = false;
    }
  }

  function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddle.x = relativeX - paddle.width / 2;
    }
  }

  function collisionDetection() {
    for (let r = 0; r < brick.rowCount; r++) {
      for (let c = 0; c < brick.colCount; c++) {
        const b = bricks[r][c];
        if (b.status === 1) {
          if (
            ball.x > b.x &&
            ball.x < b.x + brick.width &&
            ball.y > b.y &&
            ball.y < b.y + brick.height
          ) {
            ball.dy = -ball.dy;
            b.status = 0;
            score++;
            if (score === brick.rowCount * brick.colCount) {
              alert('YOU WIN!');
              resetGame();
            }
          }
        }
      }
    }
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.closePath();
  }

  function drawBricks() {
    for (let r = 0; r < brick.rowCount; r++) {
      for (let c = 0; c < brick.colCount; c++) {
        if (bricks[r][c].status === 1) {
          const brickX = c * (brick.width + brick.padding) + brick.offsetLeft;
          const brickY = r * (brick.height + brick.padding) + brick.offsetTop;
          bricks[r][c].x = brickX;
          bricks[r][c].y = brickY;
          
          ctx.beginPath();
          ctx.rect(brickX, brickY, brick.width, brick.height);
          ctx.fillStyle = brick.colors[r];
          ctx.fill();
          ctx.strokeStyle = '#1a1a2e';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }

  function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(`Score: ${score}`, 8, 20);
    ctx.fillText(`Lives: ${lives}`, canvas.width - 80, 20);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
      ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy < ball.radius) {
      ball.dy = -ball.dy;
    }

    if (
      ball.y + ball.dy > canvas.height - ball.radius - paddle.height &&
      ball.x > paddle.x &&
      ball.x < paddle.x + paddle.width
    ) {
      ball.dy = -ball.dy;
    }

    else if (ball.y + ball.dy > canvas.height - ball.radius) {
      lives--;
      if (lives <= 0) {
        alert('GAME OVER!');
        resetGame();
        return;
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 4;
        ball.dy = -4;
        paddle.x = canvas.width / 2 - 50;
      }
    }

    if (paddle.isMoving) {
      paddle.x += paddle.direction * paddle.speed;
      if (paddle.x < 0) paddle.x = 0;
      if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
    }

    animationId = requestAnimationFrame(draw);
  }

  resetGame();
});