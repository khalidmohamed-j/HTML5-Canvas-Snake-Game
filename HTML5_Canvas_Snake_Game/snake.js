const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");
const box = 25;
const canvasSize = 23;

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";


// create the score var
let score = 0;

// create the snake
let snake = [];

snake[0] = {
    x : Math.floor((canvasSize/2)) * box,
    y : Math.floor((canvasSize/2)) * box
};

//set direction by arrow keys

let dir;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && dir != "RIGHT"){
        left.play();
        dir  = "LEFT";
    }else if(key == 38 && dir != "DOWN"){
        dir = "UP";
        up.play();
    }else if(key == 39 && dir != "LEFT"){
        dir = "RIGHT";
        right.play();
    }else if(key == 40 && dir != "UP"){
        dir = "DOWN";
        down.play();
    }
}


// create the food

let food = {
    x : Math.floor(1 + (Math.random()* (canvasSize - 1))) * box,
    y : Math.floor(1 + (Math.random()* (canvasSize - 1))) * box
}


//draw function
function draw(){
    
    ctx.fillStyle = 'green';
    ctx.fillRect(box, box, canvasSize*box - box, canvasSize*box - box);
    
    //draw the snake head and tail
    for( let i = 0; i < snake.length ; i++){
        //ctx.fillStyle = "green";
        ctx.fillStyle = ( i == 0 )? "green" : "pink";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    //move the snake head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction
    if( dir == "LEFT") snakeX -= box;
    if( dir == "UP") snakeY -= box;
    if( dir == "RIGHT") snakeX += box;
    if( dir == "DOWN") snakeY += box;
    
    //draw in food
    ctx.fillStyle = 'white';
    ctx.fillRect(food.x, food.y, box, box)
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(1 + (Math.random()* (canvasSize - 1))) * box,
            y : Math.floor(1 + (Math.random()* (canvasSize - 1))) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // check collision function
    function collision(head,array){
        for(let i = 0; i < array.length; i++){
            if(head.x == array[i].x && head.y == array[i].y){
                return true;
            }
        }
        return false;
    }
    
    // game over
    
    if(snakeX < box || snakeY < box || snakeX > (canvasSize - 1) * box || snakeY > (canvasSize - 1) * box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "orange";
    ctx.fillRect(food.x, food.y, box, box);
    
    //draw score
    ctx.fillStyle = "white";
    ctx.font = "23px Changa one";
    ctx.clearRect(0,0,50,25);
    ctx.fillText(score,box,0.8*box);
    
}

// call draw function every 100 ms
let game = setInterval(draw,100);
    
