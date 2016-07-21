var player;
var playerImage;
var enemy;
var enemyImage;
var backgroundImage;
var isGameOver;

function preload() {
    playerImage = loadImage("obama.png");
    enemyImage = loadImage("trump.png");
    backgroundImage = loadImage("usflag.jpg");
}

function setup() {
    createCanvas(500, 500);
    player = createSprite(width/2, height-(playerImage.height/2), 0, 0);
    player.addImage(playerImage);
    enemy = createSprite(width/2, 0, 0, 0);
    enemy.addImage(enemyImage);
    enemy.rotationSpeed = 4.0;
    
    isGameOver = false;
}

function draw() {
  background(backgroundImage);

  if(keyDown(RIGHT_ARROW) && player.position.x < (width - (playerImage.width/2))){
    player.position.x += 10;
  }

  if(keyDown(LEFT_ARROW) && player.position.x > (playerImage.width/2)){
    player.position.x -= 10;
  }

  enemy.position.y = enemy.position.y + 12;
  
  if (enemy.position.y > height) {
      enemy.position.y = 0;
      enemy.position.x = random(5, width-5);
  }
  
  if (enemy.overlap(player)) {
  gameOver();
  }
  
  if (isGameOver) {
    gameOver();
  } else {
    if (enemy.overlap(player)) {
      isGameOver = true;
    }
  }
  drawSprites();
}

function gameOver() {
  background(0);
  textAlign(CENTER);
  fill("white");
  text("GAME OVER!!! YOU SUCK!!!", width/2, height/2);
  text("Click anywhere to try again", width/2, 3*height/4);
}

function mouseClicked() {
    if (isGameOver) {
    isGameOver = false;
    player.position.x = width/2;
    player.position.y = height-(playerImage.height/2);
    enemy.position.x = width/2;
    enemy.position.y = 0;
    }
}