const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

const scale = 20;
const row = canvas.height / scale;
const column = canvas.height / scale;

let snake = [];
let score = 0;
let scores = document.querySelector(".score");
scores.innerHTML = score;


snake[0] = {
    x: Math.floor(Math.random() * column) * scale,
    y: Math.floor(Math.random() * row) * scale
};

let food = {
    x: Math.floor(Math.random() * column) * scale,
    y: Math.floor(Math.random() * row) * scale
}

let d = "right";
document.onkeydown = direction;

function direction(event) {

    let key = event.keyCode;
    if (key == 37 && d != "right") {
        d = "left"
    }
    else if (key == 38 && d != "down") {
        d = "up"
    }
    else if (key == 39 && d != "left") {
        d = "right"
    }
    else if (key == 40 && d != "up") {
        d = "down"
    }
}

let playGame = setInterval(play, 100);

function play() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = "white";
        ctx.strokeStyle = "green";
        ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
        ctx.strokeRect(snake[i].x, snake[i].y, scale, scale)
    }



    // Food

    ctx.fillStyle = "green";
    ctx.strokeStyle = "green";
    ctx.fillRect(food.x, food.y, scale, scale);
    ctx.strokeRect(food.x, food.y, scale, scale)




    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    if (d == "left") {
        snakeX -= scale;
    }
    if (d == "right") {
        snakeX += scale;
    }
    if (d == "up") {
        snakeY -= scale;
    }
    if (d == "down") {
        snakeY += scale;
    }

    if (snakeX > canvas.width) {
        snakeX = 0;
    }
    if (snakeY > canvas.height) {
        snakeY = 0;
    }
    if (snakeX < 0) {
        snakeX = canvas.width;
    }
    if (snakeY < 0) {
        snakeY = canvas.height;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (eatSelf(newHead, snake)) {
        clearInterval(playGame);
        over();
    }


    if (snakeX == food.x && snakeY == food.y) {
        score++;
        scores.innerHTML = score;
        food = {
            x: Math.floor(Math.random() * column) * scale,
            y: Math.floor(Math.random() * row) * scale
        }
    }

    else {
        snake.pop();
    }
    snake.unshift(newHead);
}


function eatSelf(head, array) {
    for (var i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}
const res = document.querySelector(".result");
const games = document.querySelector(".game");
function over() {
    games.classList = "gameover";
    res.innerHTML = score;
    console.log(games);
}

function startGame() {
    games.classList = "game";
    location.reload();
    console.log(games);
    console.log(playGame)
}


function change() {
    const backs = document.querySelector(".blue");
    backs.classList = "green";
    console.log(backs)
}