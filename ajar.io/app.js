var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var x = 250;
var y = 250;
var mouseX = 250;
var mouseY = 250;
var velocity = 2;
var foodPositions = [
    [30, 20],
    [400, 90],
    [60, 317],
    [300, 268]
];

function drawUserCell() {
    context.beginPath();
    context.arc(x, y, 40, 0, 2 * 3.14159);
    context.fillStyle = "red";
    context.fill();
}

function clearCanvas() {
    context.beginPath();
    context.rect(0, 0, 500, 500);
    context.fillStyle = "black";
    context.fill();
}

function calculatePosition() {
    if (mouseX > x) {
        x = x + velocity;
    }
    else {
        x = x - velocity;
    }

    if (mouseY > y) {
        y = y + velocity;
    }
    else {
        y = y - velocity;
    }
}

function drawScreen() {
    clearCanvas();
    calculatePosition();
    drawCircle(x, y, 40);
    drawCircle(foodPositions[0][0], foodPositions[0][1], 10);
    drawCircle(foodPositions[1][0], foodPositions[1][1], 10);
    drawCircle(foodPositions[2][0], foodPositions[2][1], 10);
    drawCircle(foodPositions[3][0], foodPositions[3][1], 10);
    setTimeout(drawScreen, 1000 / 60);
}

function mouseMoved(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

function drawCircle(circleX, circleY, radius) {
    context.beginPath();
    context.arc(circleX, circleY, radius, 0, 2 * 3.14159);
    context.fillStyle = "red";
    context.fill();
}

canvas.addEventListener("mousemove", mouseMoved);
drawScreen();