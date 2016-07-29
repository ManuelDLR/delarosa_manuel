var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var x = 250;
var y = 250;

function drawUserCell() {
context.beginPath();
context.arc(x, y, 40, 0, 2 * 3.14159);
context.fillStyle = "cyan";
context.fill();
}

function mouseMoved(mouse) {
    x = mouse.clientX;
    y = mousr.clientY;
}

canvas.addEventListener("mouseMove", mouseMoved);
drawUserCell();