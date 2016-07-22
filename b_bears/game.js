var player;
var playerImage;
var enemy;
var enemyImage;
var food;
var foodImage;

var backgroundImage;
var isGameOver;

var score;

function preload() {
    playerImage = loadImage("playerbear.png");
    enemyImage = loadImage("enemybait.png");
    foodImage = loadImage("foodbass.png")
    backgroundImage = loadImage("underwater.jpg");
}

function setup() {
  foodSprites = new Group();
    createCanvas(1350, 675);
    player = createSprite(width/2, height/2-(playerImage.height/2), 0, 0);
    player.addImage(playerImage);
    
    enemy = createSprite(width/1.5, 0, 0, 0);
    enemy.addImage(enemyImage);
    enemy.rotationSpeed = 0.0;
    
    food = createSprite(width/5, 0, 0, 0);
    food.addImage(foodImage);
    foodSprites.add(food);
    
    myScore = createSprite("30px", "Consolas", "black", 280, 40, "text");
    
    score = 0;
    
    isGameOver = false;
}

function draw() {
  background(backgroundImage);

  if(keyDown(RIGHT_ARROW) && player.position.x < (width - (playerImage.width/2))){
    player.position.x += 15;
  }

  if(keyDown(LEFT_ARROW) && player.position.x > (playerImage.width/2)){
    player.position.x -= 15;
  }
  
  if(keyDown(DOWN_ARROW) && player.position.y < (width - (playerImage.width/2))){
    player.position.y += 15;
  }
  
  if(keyDown(UP_ARROW) && player.position.y > (playerImage.width/2)){
    player.position.y -= 15;
  }
  
  enemy.position.y = enemy.position.y + 12;
  
  
  food.position.y = food.position.y + 12;
  
  if (enemy.position.y > height) {
      enemy.position.y = 0;
      enemy.position.x = random(5, width-5);
  }
  
  if (food.position.y > height) {
      food.position.y = 0;
      food.position.x = Math.floor((Math.random() * 1290 + 30));
  }
  
  if (enemy.overlap(player)) {
  gameOver();
  }
  
  if (food.overlap(player)) {
    score = score+1;
    removeSprite(food);
    food = createSprite(Math.floor((Math.random() * 1290 + 30)), 0, 25, 25);
    food.addImage(foodImage);
    foodSprites.add(food);
    console.log(foodSprites.length)
  }
  
  if (isGameOver) {
    gameOver();
  } else {
    if (enemy.overlap(player)) {
      isGameOver = true;
    }
  }
  drawSprites();
  text("Score:" + score, 1250, 50);
}

function gameOver() {
  background(0);
  textAlign(CENTER);
  fill("white");
  text("YOU'RE HOOKED!!! GAME OVER!!! YOU SUCK!!!", width/2, height/2);
  text("Click anywhere to GO again", width/2, 3*height/4);
}

function mouseClicked() {
    if (isGameOver) {
    isGameOver = false;
    player.position.x = width/2;
    player.position.y = height/2-(playerImage.height/2);
    enemy.position.x = width/2;
    enemy.position.y = 0;
    }
}