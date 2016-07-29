var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var x = 250;
var y = 250;
var mouseX = 250;
var mouseY = 250;
var velocity = 2;

function drawUserCell() {
    context.beginPath();
    context.arc(x, y, 40, 0, 2 * 3.14159);
    context.fillStyle = "cyan";
    context.fill();
}

function clearCanvas() {
    context.beginPath();
    context.rect(0, 0, 500, 500);
    context.fillStyle = "white";
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
    drawUserCell();
    setTimeout(drawScreen, 1000 / 60);
}

function mouseMoved(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

canvas.addEventListener("mousemove", mouseMoved);
drawScreen();