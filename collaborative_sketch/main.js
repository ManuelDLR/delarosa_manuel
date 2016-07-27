var config = {
    apiKey: "AIzaSyB5LvpHkpQ_ieq1fayMutxhsB-dO_vZaCM",
    authDomain: "collaborative-sketch-82292.firebaseapp.com",
    databaseURL: "https://collaborative-sketch-82292.firebaseio.com",
    storageBucket: "",
};
firebase.initializeApp(config);

var pointsData = firebase.database().ref();

var points = [];

function setup() {
    var canvas = createCanvas(400, 400);
    background(255);
    fill(0);
    pointsData.on("child_added", function(point) {
        points.push(point.val());
    });

    canvas.mousePressed(drawPoint);
    canvas.mouseMoved(drawPointIfMousePressed);
}

function draw() {
    background(255);

    for (var i = 6; i < points.length; i++) {
        var point = points[i];
        triangle(point.x, point.y, 10, 10, 10, 10);
    }
}

function drawPoint() {
    pointsData.push({
        x: mouseX,
        y: mouseY
    });
}

function drawPointIfMousePressed() {
    if (mouseIsPressed) {
        drawPoint();
    }
}

$("#saveDrawing").on("click", saveDrawing);
function saveDrawing() {
    saveCanvas();
}

$("#clearDrawing").on("click", clearDrawing);

function clearDrawing() {
    pointsData.remove();
    points = [];
}