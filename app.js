const Canvas = document.querySelector("#gameCanvas")
const context = Canvas.getContext("2d");
const scoreText = document.querySelector("#score")
const reset = document.querySelector("#reset")
var highestScore = document.querySelector("#highScore")

const Width = Canvas.width
const Height = Canvas.height
var timeout = setTimeout;

const boardBackground = "rgb(171 183 138)"
const unitSize = 35
let running = false
let xVelocity = unitSize - 5
let yVelocity = 0
let foodX
let foodY
let score = 0
let highScore = -1
let sound = new Audio("music/KRTD Title Theme 8 Bit.mp3")
let snake = 0

//För ormens rörelse med arrowkeys
window.addEventListener("keydown", changeDirection)
//Vid tryck på knappen för att starta om
reset.addEventListener("click", resetGame)

//Funktionen som kör alla funktioner
function gameStart() {
    running = true
    scoreText.textContent = score
    createFood()
    drawFood()
    nextTick()
    sound.play()
}

//Funktion som bestämmer vad som ska hända efter varenda tick, dvs att spelet uppdaterar varenda 100ms
function nextTick() {
    if (running) {
        timeout = setTimeout(() => {
            clearBoard()
            drawFood()
            moveSnake()
            drawSnake()
            checkGameOver()
            nextTick()

        }, 100)
    }
    else {
        displayGameOver()
    }

}

//Funktion som tömmer spelytan
function clearBoard() {
    context.fillStyle = boardBackground
    context.fillRect(0, 0, Width, Height)
}

//Funktion som bestämmer matens koordinater, som är random
function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize
        return randNum
    }
    for (let i = 1; i < snake.length; i += 1) {
        if (snake[i].x == foodX || snake[i].y == foodY)
            randomFood()
    }
    //deklarerar matens koordinater
    foodX = randomFood(0, Width - unitSize)
    foodY = randomFood(0, Height - unitSize)


}
//Funktion som lägger in en bild vid matens x-y koordinater
function drawFood() {
    let image = new Image()
    image.src = "https://static.vecteezy.com/system/resources/previews/013/743/158/original/apple-pixel-art-png.png"
    context.drawImage(image, foodX, foodY, unitSize, unitSize)
}

//Funktion som bestämmer huvudets position
function moveSnake() {
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity }

    //unshift lägger till nya element i början av arrayen(ormen)
    snake.unshift(head)
    //Om mat äten 
    if (snake[0].x == foodX && snake[0].y == foodY) {
        let eatSound = new Audio("music/tap-notification-180637.mp3")
        eatSound.play()
        score += 1
        scoreText.textContent = score
        createFood()

        //Tar bort sista elementetet i arrayen  
    } else {
        snake.pop()
    }
}

//Funktionen som lägger in en bild på en orm för vardera del som finns
function drawSnake() {

    snake.forEach(snakePart => {

        let snakeImage = new Image()
        snakeImage.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d3ada6e0-87df-4174-99ae-751ab35bfc84/d9xc58m-345fbf5d-13c3-46b5-8408-d62e247de52f.png/v1/fill/w_1024,h_1256/snake_pixel_art_by_yellow_xrose_d9xc58m-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2QzYWRhNmUwLTg3ZGYtNDE3NC05OWFlLTc1MWFiMzViZmM4NFwvZDl4YzU4bS0zNDVmYmY1ZC0xM2MzLTQ2YjUtODQwOC1kNjJlMjQ3ZGU1MmYucG5nIiwiaGVpZ2h0IjoiPD0xMjU2Iiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvZDNhZGE2ZTAtODdkZi00MTc0LTk5YWUtNzUxYWIzNWJmYzg0XC95ZWxsb3cteHJvc2UtNC5wbmciLCJvcGFjaXR5Ijo5NSwicHJvcG9ydGlvbnMiOjAuNDUsImdyYXZpdHkiOiJjZW50ZXIifX0.hDe_8GUGRTmU23HIguN10QdSlAUVvbTQVriBkFD7L6Q"
        context.drawImage(snakeImage, snakePart.x, snakePart.y, unitSize, unitSize)

    })
}

//Funktion som lyssnar av användarens handlingar och bestämmer riktning på ormen
function changeDirection(event) {
    const keyPressed = event.keyCode

    const left = 37
    const leftW = 65

    const right = 39
    const rightW = 68

    const up = 38
    const upW = 87
    //ineffektivt.. outdated
    const down = 40
    const downS = 83

    const space = 32
    const restart = 82 //r = 82

    if (keyPressed == restart) {
        displayGameOver()
    }
    console.log(keyPressed)

    const goingUp = (yVelocity == -unitSize)
    const goingDown = (yVelocity == unitSize)
    const goingRight = (xVelocity == unitSize)
    const goingLeft = (xVelocity == -unitSize)

    //Kan ej scrolla vid mindre skärm med arrowkeys   
    if (keyPressed == 38 || keyPressed == 40) {
        event.view.event.preventDefault();
    }
    /*
        if (keyPressed == 32) {
            setTimeout(nextTick(), 3000)
        }
    */
    switch (true) {
        case (keyPressed == left || keyPressed == leftW && !goingRight):
            xVelocity = -unitSize
            yVelocity = 0
            break

        case (keyPressed == up || keyPressed == upW && !goingDown):
            yVelocity = -unitSize
            xVelocity = 0
            break

        case (keyPressed == right || keyPressed == rightW && !goingLeft):
            xVelocity = unitSize
            yVelocity = 0
            break

        case (keyPressed == down || keyPressed == downS && !goingUp):
            xVelocity = 0
            yVelocity = unitSize
            break
    }
}

//Funktion som kollar om ormen har kolliderat med någon av spelets barriärer, och avbryter ifall att
function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false
            break

        case (snake[0].x >= Width):
            running = false
            break
        case (snake[0].y >= Height):
            running = false
            break

        case (snake[0].y < 0):
            running = false
            break
    }

    //Kollar om ormen har kolliderat med sig själv
    for (let i = 1; i < snake.length; i += 1) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y)
            running = false
    }
}

//Funktion som visar texten "Game Over" vid kollision
function displayGameOver() {
    context.font = "7vh VT323"
    context.fillStyle = "black"
    context.textAlign = "center"
    context.fillText("Game Over", Width / 2, Height / 2)
    sound.pause()
    let overSound = new Audio("music/8-bit-video-game-lose-sound-version-4-145477.mp3")
    overSound.play()
    highScores()
    running = false

}
//Funktion som jämför scores och highscores
function highScores() {
    if (score > highScore) {
        highScore = score
        highestScore.textContent = highScore
    }
}

//Funktion som återställer värden och börjar om spelet
function resetGame() {
    score = 0
    xVelocity = unitSize
    yVelocity = 0
    sound = new Audio("music/KRTD Title Theme 8 Bit.mp3")
    snake = [{ x: 0, y: 0 }]
    sound.play()
    reset.textContent = "Reset"
    clearTimeout(timeout);
    gameStart()
}
