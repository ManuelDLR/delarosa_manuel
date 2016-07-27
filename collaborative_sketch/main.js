var pointsData = firebase.database().ref();
var config = {
    apiKey: "AIxaSyGsAkHke9lXEU_97a8rYpMn7gOH3eWDxrM",
    authDomain: "collaborative-draw.firebaseapp.com",
    databaseURL: "https://collaborative-draw.firebaseio.com",
    storageBucket: "",
};
firebase.intializeApp(config);

var pointsData = firebase.database().ref();

var points = [];

function setup() {
    createCanvas(400, 400);
    background(255);
    fill(0);
    pointData.on("child_added", function (point) {
        points.push(point.val());
    });
}

function draw(){
    background(255);
    
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        ellipse(point.x, point.y, 5, 5);
    }
}