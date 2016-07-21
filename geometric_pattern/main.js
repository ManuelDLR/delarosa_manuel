var NUM_CIRCLES = 10;

var circleDiameter;
var circleRadius;

var rVal;
var gVal;
var bVal;

function setup() {
    createCanvas(500, 1000);
    
    frameRate(60);
    
    circleDiameter = width/NUM_CIRCLES;
    circleRadius = circleDiameter/10;
    
    rVal = 100;
    gVal = 200;
    bVal = 300;
}

function draw() {
    var isShifted = false;
    
    var y = height + 50;
    while (y >= -50) {
    
    var x;
    
    if (isShifted) {
        x = circleRadius + 25;
    } else {
     x = 5;   
    }
    
    while (x <= width) {
        fill(color(rVal,gVal,bVal))
        stroke(color(rVal,gVal,bVal))
        ellipse(x, y, circleDiameter, circleDiameter);
        x = x + circleDiameter;
    }
    
    y = y - circleRadius;
    isShifted = !isShifted;
    
    rVal = (rVal +300) % 256;
    gVal = (gVal + 200) % 256;
    bVal = (bVal + 100) % 256;
  }
}

function keyPressed() {
    if (keyCode === 115 || keyCode === 83) {
        saveCanvas('geometricPattern', 'png');
    }
    return false;
}