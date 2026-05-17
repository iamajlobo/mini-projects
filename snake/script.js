let board;
let context;

let boxSize = 25;
let rows = 20;
let cols = 20;

let snakeX = boxSize * 5;
let snakeY = boxSize * 5;

let foodX;
let foodY;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

let gameOver = false;
let intervalId;
let score = 0;

let gameoverBanner = document.getElementById("gameover");
let scoreBanner = document.getElementById("score");

let speed = 10;

window.onload = () => {
  board = document.getElementById("board");
  board.height = rows * boxSize;
  board.width = cols * boxSize;
  context = board.getContext("2d");

  placeFood();

  document.addEventListener("keyup", changeDirection);
  //update();
  
  intervalId = setInterval(update, 1000 / speed);
};

const changeDirection = (e) => {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  }
};

//Update the board
const update = () => {
  //Board
  context.fillStyle = "white";
  context.fillRect(0, 0, board.width, board.height);

  //Food
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, boxSize, boxSize);

  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    score += 1;
    placeFood();
  }

  attachBody();

  // Snake
  context.fillStyle = "green";
  snakeX += velocityX * boxSize;
  snakeY += velocityY * boxSize;
  context.fillRect(snakeX, snakeY, boxSize, boxSize);

  checkCollision();

  // Draw the body
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], boxSize, boxSize);
  }
};

// Calculate the position of the food
const placeFood = () => {
  foodX = Math.floor(Math.random() * rows) * boxSize;
  foodY = Math.floor(Math.random() * cols) * boxSize;
};

//Check Collision
const checkCollision = () => {
  if (snakeX < 0) {
    gameOver = true;
  } else if (snakeX >= board.width) {
    gameOver = true;
  } else if (snakeY < 0) {
    gameOver = true;
  } else if (snakeY >= board.height) {
    gameOver = true;
  }

  for(let i = 0; i < snakeBody.length; i++){
    if(snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]){
        gameOver = true;
    }
  }

  if (gameOver) {
    snakeX = boxSize * 5;
    snakeY = boxSize * 5;
    snakeBody = [];
    velocityX = 0;
    velocityY = 0;
    gameoverBanner.style.display = "block";
    scoreBanner.textContent = score;    
    clearInterval(intervalId);
  }
};

//Position the Body
const attachBody = () => {
  // Shift the rest of the body
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  //Attach the first body
  if (snakeBody.length > 0) {
    snakeBody[0] = [snakeX, snakeY];
  }
};
