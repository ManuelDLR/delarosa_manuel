var groundSprites;
var GROUND_SPRITE_WIDTH = 239;
var GROUND_SPRITE_HEIGHT = 50;
var numGroundSprites;

var GRAVITY = 0.3;

var player;
var playerImage;
var jump = -5;

var obstacleSprites;
var obstacleImage;

var groundImage;

var isGameOver;
var score;

var ground;

function preload() {
    playerImage = loadImage("playermatch.png");
    obstacleImage = loadImage("obstacletnt.png");
    groundImage = loadImage("terrain.png");
}

function setup() {
    isGameOver = false;
    score = 0;

    createCanvas(1300, 650);
    background(100, 0, 0);

    groundSprites = new Group();

    numGroundSprites = width / GROUND_SPRITE_WIDTH;
    console.log(numGroundSprites)
    for (var n = 0; n < numGroundSprites + 100; n++) {
        var groundSprite = createSprite(n * 50, height - 25, GROUND_SPRITE_WIDTH, GROUND_SPRITE_HEIGHT);
        groundSprite.addImage(groundImage);
        groundSprites.add(groundSprite);

    }

    player = createSprite(50, height - 75, 50, 50);
    player.addImage(playerImage);
    obstacleSprites = new Group();

    ground = createSprite(50, height - 25, 50, 50);
    ground.addImage(groundImage);
}

function draw() {
    if (isGameOver) {
        background(0);
        fill(255);
        textAlign(CENTER);
        text("Your score was: " + score, camera.position.x, camera.position.y - 40);
        textSize(50);
        text("Game Over! Click anywheere to restart", camera.position.x, camera.position.y);
        textSize(50);
    }
    else {
        background(400, 0, 0);

        player.velocity.y = player.velocity.y + GRAVITY;


        if (groundSprites.overlap(player)) {
            player.velocity.y = 0;
            player.position.y = (height - 50) - (player.height / 2);
        }

        if (keyDown(UP_ARROW) && player.position.x > (playerImage.width / 2)) {
            player.velocity.y = jump;
        }

        if (player.position.y < 0) {
            player.position.y = 0;
            player.velocity.y = 0;
        }

        player.position.x = player.position.x + 5;
        camera.position.x = player.position.x + (width / 4);

        var firstGroundSprite = groundSprites[0];
        if (firstGroundSprite.position.x <= camera.position.x - (width / 2)) {
            groundSprites.remove(firstGroundSprite);
            firstGroundSprite.position.x = firstGroundSprite.position.x + numGroundSprites * firstGroundSprite.width;
            groundSprites.add(firstGroundSprite);
        }

        if (random() > 0.96) {
            var obstacle = createSprite(camera.position.x + width, random(0, (height - 50) - 15), 30, 30);
            obstacle
            obstacleSprites.add(obstacle);
            obstacle.addImage(obstacleImage);

        }

        var firstObstacle = obstacleSprites[0];
        if (obstacleSprites.length > 0 && firstObstacle.position.x <= camera.position.x - (width / 2 + firstObstacle.width / 2)) {
            removeSprite(firstObstacle);
        }

        obstacleSprites.overlap(player, endGame);


        // if (groundSprite.position.x > width) {
        //     console.log("ground position is greater than width");
        //     groundSprite.position.x = 0;
        // }
        drawSprites();
        score = score + 1;
        textAlign(CENTER);
        text(score, camera.position.x, 10);
    }

    function endGame() {
        isGameOver = true;
        var boom = new Audio("a_bomb.mp3");
        boom.play();
    }

}

function mouseClicked() {
    if (isGameOver) {
        for (var n = 0; n < numGroundSprites; n++) {
            var groundSprite = groundSprites[n];
            groundSprite.position.x = n * 50;
        }

        player.position.x = 100;
        player.position.y = height - 75;

        obstacleSprites.removeSprites();

        score = 0;
        isGameOver = false;
    }
}