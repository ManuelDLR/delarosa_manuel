var groundSprites;
var GROUND_SPRITE_WIDTH = 50;
var GROUND_SPRITE_HEIGHT = 50;
var numGroundSprites;

var GRAVITY = 0.3;

var player;
var playerImage;
var jump = -5;

var obstacleSprites;
var obstacleImage;

var isGameOver;
var score;

function preload() {
    playerImage = loadImage("playermatch.png");
    obstacleImage = loadImage("obstacletnt.png");
}

function setup(){
    isGameOver = false;
    score = 0;
    
    createCanvas(1300, 650);
    background(100,0,0);
    
    groundSprites = new Group();
    
    numGroundSprites = width/GROUND_SPRITE_WIDTH + 1;
    for (var n = 0; n < numGroundSprites; n++){
        var groundSprite = createSprite(n*50, height-25, GROUND_SPRITE_WIDTH, GROUND_SPRITE_HEIGHT);
        groundSprites.add(groundSprite);
    }
    
    player = createSprite(50, height-75, 50, 50);
    player.addImage(playerImage);
    obstacleSprites = new Group();
}

function draw(){
    if (isGameOver){
        background(0);
        fill(255);
        textAlign(CENTER);
        text("Your score was: " + score, camera.position.x, camera.position.y - 20);
        text("Game Over! Click anywheere to restart", camera.position.x, camera.position.y);
    } else {
    background(100, 0, 0);
    
    player.velocity.y = player.velocity.y + GRAVITY;
    if (groundSprites.overlap(player)){
        player.velocity.y = 0;
        player.position.y = (height -50) - (player.height/2);
    }
    
    if (keyDown(UP_ARROW) && player.position.x > (playerImage.width/2)){
        player.velocity.y = jump;
    }
    
    player.position.x = player.position.x + 5;
    camera.position.x = player.position.x + (width/4);
    
    var firstGroundSprite = groundSprites[0];
    if (firstGroundSprite.position.x <= camera.position.x - (width/2 + firstGroundSprite.width/2)) {
        groundSprites.remove(firstGroundSprite);
        firstGroundSprite.position.x = firstGroundSprite.position.x + numGroundSprites*firstGroundSprite.width;
        groundSprites.add(firstGroundSprite);
    }
    
    if (random() > 0.95){
        var obstacle = createSprite(camera.position.x + width, random(0, (height-50)-15), 30, 30);
        obstacle
        obstacleSprites.add(obstacle);
        obstacle.addImage(obstacleImage);
        
    }
    
    var firstObstacle = obstacleSprites[0];
    if (obstacleSprites.length > 0 && firstObstacle.position.x <= camera.position.x - (width/2 + firstObstacle.width/2)){
        removeSprite(firstObstacle);
    }
    
    obstacleSprites.overlap(player, endGame);
    
    drawSprites();
    score = score + 1;
    textAlign(CENTER);
    text(score, camera.position.x, 10);
}
    function endGame(){
    isGameOver = true;
}
}

function mouseClicked(){
    if (isGameOver){
        for (var n = 0; n < numGroundSprites; n++) {
            var groundSprite = groundSprites[n];
            groundSprite.position.x = n*50;
        }
        
        player.position.x = 100;
        player.position.y = height -75;
        
        obstacleSprites.removeSprites();
        
        score = 0;
        isGameOver = false;
    }
}