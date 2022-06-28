//Initialization
let velocity = { x: 0, y: 0 }; //Snake is not moving
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/gameSound.mp3");
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 6, y: 7 };
let score = 0;


//Game Functions
function main(cTime) {
    window.requestAnimationFrame(main);
    // console.log(cTime);
    if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = cTime;
    gameEngine();
}

function isCollide(snakeArr) {
    //If snake bumps into itself
    for (let index = 1; index < snakeArr.length; index++) {
        if (snakeArr[index].x === snakeArr[0].x && snakeArr[index].y === snakeArr[0].y) {
            return true;
        }
    }

    //If snake bump into border
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    //Part 1: Updating the snake array

    //Game over Logic
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        velocity = { x: 0, y: 0 };
        alert("Game over! Press OK to continue.");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score: " + score;

    }

    //If snake has eaten the food, increment the score and regenerate the food

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > highScoreVal) {
            highScoreVal = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreVal));
            highScoreBox.innerHTML = "High Score: " + highScoreVal;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + velocity.x, y: snakeArr[0].y + velocity.y });

        let a = 2;
        let b = 16;

        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    //Moving the snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };

    }

    snakeArr[0].x += velocity.x;
    snakeArr[0].y += velocity.y;





    //Part 2: Display the snake and food

    //Display the snake
    let board = document.getElementById('board');
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });

    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}






//Main logic
let highScore = localStorage.getItem("highScore");
if (highScore === null) {
    highScoreVal = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreVal));
}
else {
    highScoreVal = JSON.parse(highScore);
    highScoreBox.innerHTML = "High Score: " + highScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    // console.log("Key pressed");
    musicSound.play() ;
    velocity = { x: 0, y: 1 } //Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log("Arrow Up");

            velocity.x = 0;
            velocity.y = -1;

            break;
        case "ArrowDown":
            // console.log("Arrow Down");

            velocity.x = 0;
            velocity.y = 1;

            break;
        case "ArrowLeft":
            // console.log("Arrow Left");

            velocity.x = -1;
            velocity.y = 0;

            break;
        case "ArrowRight":
            // console.log("Arrow Right")
            ;
            velocity.x = 1;
            velocity.y = 0;

            break;

        default:
            alert("Wrong Key Pressed!");
            break;
    }
});