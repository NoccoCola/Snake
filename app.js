const gameCanvas = document.querySelector("#gameCanvas")
const context = gameCanvas.getContext("2d");
const scoreText = document.querySelector("#score")
const reset = document.querySelector('#reset')
const gameWidth = gameCanvas.width
const gameHeight = gameCanvas.height
const boardBackground = "rgb(171 183 138)"
const snakeBorder = "black";
const foodColor = "red"
const unitSize = 25
let running = false
let xVelocity = unitSize
let yVelocity = 0
let foodX
let foodY
let score = 0
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
]

window.addEventListener('keydown', changeDirection)
reset.addEventListener('click', resetGame)


function gameStart() {
    running = true
    scoreText.textContent = score
    createFood()
    drawFood()
    nextTick()

}


function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard()
            drawFood()
            moveSnake()
            drawSnake()
            checkGameOver()
            nextTick()

        }, 75)
    }
    else {
        displayGameOver()
    }

}
function clearBoard() {
    context.fillStyle = boardBackground
    context.fillRect(0, 0, gameWidth, gameHeight)

}


function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize
        return randNum
    }
    foodX = randomFood(0, gameWidth - unitSize)
    foodY = randomFood(0, gameWidth - unitSize)
}

function drawFood() {
    context.fillStyle = foodColor
    context.fillRect(foodX, foodY, unitSize, unitSize)

}
function moveSnake() {
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity }

    snake.unshift(head)
    if (snake[0].x == foodX && snake[0].y == foodY) {        //Om mat äten

        score += 1
        scoreText.textContent = score
        createFood()

    } else {
        snake.pop()
    }
}


function drawSnake() {

    context.strokeStyle = snakeBorder
    context.fillStyle = "rgb(0 153 255)"

    snake.forEach(snakePart => {
        context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize)
        context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
    })

}

function changeDirection(event) {
    const keyPressed = event.keyCode
    const left = 37
    const right = 39
    const up = 38
    const down = 40
    const restart = 82 //r = 82

    if (keyPressed == restart) {
        displayGameOver()
    }

    const goingUp = (yVelocity == -unitSize)
    const goingDown = (yVelocity == unitSize)
    const goingRight = (xVelocity == unitSize)
    const goingLeft = (xVelocity == -unitSize)

    switch (true) {
        case (keyPressed == left && !goingRight):
            xVelocity = -unitSize
            yVelocity = 0
            break

        case (keyPressed == up && !goingDown):
            yVelocity = -unitSize
            xVelocity = 0
            break

        case (keyPressed == right && !goingLeft):
            xVelocity = unitSize
            yVelocity = 0
            break

        case (keyPressed == down && !goingUp):
            xVelocity = 0
            yVelocity = unitSize
            break
    }

}

function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false
            break

        case (snake[0].x >= gameWidth):
            running = false
            break
        case (snake[0].y >= gameHeight):
            running = false
            break

        case (snake[0].y < 0):
            running = false
            break
    }
    for (let i = 1; i < snake.length; i += 1) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y)
            running = false
    }
}

function displayGameOver() {
    context.font = "7vh VT323"
    context.fillStyle = "black"
    context.textAlign = "center"
    context.fillText("Game Over", gameWidth / 2, gameHeight / 2)
    running = false

}

function resetGame() {
    score = 0
    xVelocity = unitSize
    yVelocity = 0

    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ]
    reset.textContent="Reset"
    gameStart()
}
