const gameCanvas = document.querySelector("#gameCanvas")
const ctx = gameCanvas.getContext("2d");
const scoreText = document.querySelector("#score")
const reset = document.querySelector('#reset')
const gameWidth = gameCanvas.width
const gameHeight = gameCanvas.height
const boardBackground = "grey"
const snakeColor = "lightgreen"
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

gameStart()


function gameStart() {
    running = true
    score.textContent = score
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
function clearBoard() { }


function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize
        return randNum
    }
    foodX = randomFood(0, gameWidth - unitSize)
    foodY = randomFood(0, gameWidth - unitSize)
}

function drawFood() {
    ctx.fillStyle = foodColor
    ctx.fillRect(foodX, foodY, unitSize, unitSize)

}
function moveSnake() { }
function drawSnake() { }
function changeDirection() { }
function checkGameOver() { }
function displayGameOver() { }
function resetGame() { }