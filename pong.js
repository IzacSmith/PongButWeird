const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let playerY = 200;
let aiY = 200;
let ball = {
  x: 400,
  y: 250,
  vx: 5,
  vy: 3,
  radius: 10
};

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.fill();
}

function moveAI() {
  const target = ball.y - 30;
  aiY += (target - aiY) * 0.08;
}

function updateBall() {
  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.y <= 0 || ball.y >= canvas.height) ball.vy *= -1;

  // Player paddle collision
  if (ball.x <= 20 && ball.y > playerY && ball.y < playerY + 100) ball.vx *= -1;

  // AI paddle collision
  if (ball.x >= canvas.width - 30 && ball.y > aiY && ball.y < aiY + 100) ball.vx *= -1;

  // Quantum twist: teleport every 300 frames
  if (Math.random() < 0.002) {
    ball.x = Math.random() * canvas.width;
    ball.y = Math.random() * canvas.height;
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(10, playerY, 10, 100, "white");
  drawRect(canvas.width - 20, aiY, 10, 100, "white");
  drawCircle(ball.x, ball.y, ball.radius, "white");

  moveAI();
  updateBall();
  requestAnimationFrame(gameLoop);
}

document.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  playerY = e.clientY - rect.top - 50;
});

gameLoop();
