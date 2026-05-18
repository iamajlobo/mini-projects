let board;
let ctx;
let intervalId;
let gameOver = false;

let boardHeight = 250;
let boardWidth = 700;

// Dino
const dino = {
  height: 100,
  width: 70,
  jumpPower: -12,
  gravity: 0.6,
};

// Cactus
const cactus1 = {
  height: 90,
  width: 60,
  path: "./images/cactus_1.png",
};

const cactus2 = {
  height: 90,
  width: 90,
  path: "./images/cactus_2.png",
};

const cactus3 = {
  height: 90,
  width: 90,
  path: "./images/cactus_3.png",
};

let cactuses = [cactus1, cactus2, cactus3];

let cactus = 0;
let cactusX = boardWidth;
let cactusY = boardHeight - 90;

let cactusVelocity = -10;

let velocityY = 0;
let positionX = 100;
let positionY = boardHeight - dino.height;
let isJumping = false;

// Load images once
const dinoImage = new Image();
dinoImage.src = "./images/standing_still.png";

const cactusImage = new Image();

window.onload = () => {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;

  ctx = board.getContext("2d");

  drawCactus();

  document.addEventListener("keydown", jump);

  intervalId = setInterval(update, 1000 / 60);
};

const update = () => {
  if (gameOver) {
    return;
  }

  // Clear screen FIRST
  ctx.clearRect(0, 0, boardWidth, boardHeight);

  // Background
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, boardWidth, boardHeight);

  // Gravity
  velocityY += dino.gravity;
  positionY += velocityY;

  // Ground collision
  if (positionY >= boardHeight - dino.height) {
    positionY = boardHeight - dino.height;
    velocityY = 0;
    isJumping = false;
  }

  // Move cactus
  cactusX += cactusVelocity;

  // Respawn cactus
  if (cactusX < -100) {
    cactusX = boardWidth;
    drawCactus();
  }

  // Draw dino
  ctx.drawImage(dinoImage, positionX, positionY, dino.width, dino.height);

  // Draw cactus
  ctx.drawImage(
    cactusImage,
    cactusX,
    cactusY,
    cactuses[cactus].width,
    cactuses[cactus].height,
  );

  // Collision detection
  // Smaller hitboxes
  const dinoHitbox = {
    x: positionX + 15,
    y: positionY + 10,
    width: dino.width - 30,
    height: dino.height - 20,
  };

  const cactusHitbox = {
    x: cactusX + 10,
    y: cactusY + 10,
    width: cactuses[cactus].width - 20,
    height: cactuses[cactus].height - 10,
  };

  if (
    dinoHitbox.x < cactusHitbox.x + cactusHitbox.width &&
    dinoHitbox.x + dinoHitbox.width > cactusHitbox.x &&
    dinoHitbox.y < cactusHitbox.y + cactusHitbox.height &&
    dinoHitbox.y + dinoHitbox.height > cactusHitbox.y
  ) {
    gameOver = true;
    clearInterval(intervalId);

    ctx.fillStyle = "red";
    ctx.font = "40px Arial";
    ctx.fillText("GAME OVER", 220, 120);
  }
};

const jump = (e) => {
  if (gameOver) return;

  if (e.code === "Space" && !isJumping) {
    velocityY = dino.jumpPower;
    isJumping = true;
  }
};

const drawCactus = () => {
  const cactusNumber = Math.random();

  if (cactusNumber >= 0.9) {
    cactus = 2;
  } else if (cactusNumber >= 0.7) {
    cactus = 1;
  } else {
    cactus = 0;
  }

  cactusImage.src = cactuses[cactus].path;
};
