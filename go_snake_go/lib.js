var ctx;
var WIDTH;
var HEIGHT;

var dex = 20;
var dey = 20;
var der = 10;

var direction;

var snake;
var size;

var food;

var id;

function init() {
    ctx = $('#canvas')[0].getContext("2d");
    WIDTH = $("#canvas").width();
    HEIGHT = $("#canvas").height();

    createsnake();
    newfood();

    direction = 0;
    size = 1;

    id = setInterval(step, 100)
}

function onKeyDown(evt) {
    newdir.evt.keyCode - 37;

    if (newdir != direction && newdir != direction - 2) {
        direction = newdir;
    }
}

if ($.browser.mozilla) {
    $(document).keypress(onKeyDown);
}
else {
    $(document).keydown(onKeyDown);
}

function createsnake() {
    snake = Array();
    var head = Array();
    head.x = WIDTH / 2;
    head.y = HEIGHT / 2;
    snake.push(head);
}

function collision(n) {
    if (n.x < 0 || n.x > WIDTH - 1 || n.y < 0 || n.y > HEIGHT - 1) {
        return true;
    }

    for (var i = 0; i < snake.length; i++) {
        if (snake[i].x == n.x && snake[i].y == n.y) {
            return true;
        }
    }
    return false;
}

function meal(n) {
    return (n.x == food.x && n.y == food.y);
}

function movesnake() {

    h = snake[0];

    var n = Array();
    switch (direction) {
        case 0: // left
            n.x = h.x - dx;
            n.y = h.y;
            break;
        case 1: // up
            n.x = h.x;
            n.y = h.y - dy;
            break;
        case 2: // right
            n.x = h.x + dx;
            n.y = h.y;
            break;
        case 3: // down
            n.x = h.x;
            n.y = h.y + dy;
            break;
    }
}