let board;
let ctx;

let boardHeight = 500;
let boardWidth = 300;


//images
let birdImg;
let topPipe;
let bottomPipe;

let pipes = [];


const bird = {
    x: 30,
    y: boardHeight/2,
    width: 40,
    height: 30
}

//Pipe attributes
let pipeY = 0;
let pipeX = boardWidth;
let pipeHeight = 350;
let pipeWidth = 50;
let pipeVelocity = -3;

//Bird Jumping Attributes
let birdVelocity = 0;
let gravity = 0.4;
let jumpPower = -6;


let isGameover = false;
let score = 0;

window.onload = () => {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    ctx = board.getContext("2d");


    birdImg = new Image();
    birdImg.src = "./images/bird.png";
    
    topPipe = new Image();
    topPipe.src = "./images/top-pipe.png";

    bottomPipe = new Image();
    bottomPipe.src = "./images/bottom-pipe.png"

    document.addEventListener('keydown', jump);
    setInterval(generatePipe,1300);
    requestAnimationFrame(update);
}    


const update = () => {
    if(isGameover) return;

    requestAnimationFrame(update)
    ctx.clearRect(0,0,boardWidth,boardHeight);

    //Draw Image
    birdVelocity += gravity;
    bird.y += birdVelocity;
    
    if(bird.y <= 0 || bird.y + bird.height > boardHeight) {
        isGameover = true;
    }

    ctx.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);

    
    for(let i = 0; i < pipes.length; i++){
        const currentPipe = pipes[i];
        currentPipe.x += pipeVelocity;
        
        if(checkCollision(bird,currentPipe)){
            isGameover = true;
        }
        
        ctx.drawImage(currentPipe.img, currentPipe.x,currentPipe.y,currentPipe.width,currentPipe.height);
    }

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(score, 10,35)
}


// Place Pipes
const generatePipe = () => {
    if( isGameover) return;    

    const randomY = pipeY - pipeHeight/3 - (Math.random() * (pipeHeight/2))
    const gap = pipeHeight/3;

    const top = {
        img: topPipe,
        x: pipeX,
        y: randomY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    const bottom = {
        img: bottomPipe,
        x: pipeX,
        y: randomY + pipeHeight + gap,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }   
    
    pipes.push(top);
    pipes.push(bottom);


    if(pipes[0].x + pipes[0].width < 0){
        pipes.splice(0,2);
        score++;
    }
}

// Jump Function
const jump = (e) => {
    if(e.code === "Space"){
        birdVelocity = jumpPower;
    }
}


const checkCollision = (a,b) => {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}