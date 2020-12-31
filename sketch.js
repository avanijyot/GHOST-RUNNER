var PLAY = 1;
var END = 0;
var gameState = PLAY;

var tower, towerImage;

var door, doorImage, doorsGroup;

var climber, climberImage, climberGroup;

var ghost, ghostImage;

function preload(){
  
  towerImage = loadImage("tower.png");
  
  doorImage  =loadImage("door.png");
  
  climberImage = loadImage("climber.png");
  
  ghostImage = loadImage("ghost-standing.png");
  
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite(200, 200);
  ghost.addImage("ghost", ghostImage);
  ghost.scale = 0.5;
  
  doorsGroup = new Group();
  climberGroup = new Group();
  
}

function draw(){
  background("white");
  
 if(gameState === PLAY){ 
  if(tower.y >= 400){
    tower.y = 300;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -2;
  }
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(keyDown("left")){
    ghost.x = ghost.x -5;
  }
  
  if(keyDown("right")){
    ghost.x = ghost.x + 5;
  }
   
   spawnDoors();
   
   if(ghost.isTouching(climberGroup)||ghost.y > 600){
     gameState = END;
     ghost.destroy();
   }
  
  drawSprites();
 }
  
 else if (gameState===END){
   tower.velocityY = 0;
   
   textSize(30);
   fill("red");
   text("GAMEOVER", 200, 300);
   
 }
}

function spawnDoors(){
  if(frameCount%250===0){
  door = createSprite(Math.round(random(100,500)), 50);
  door.addImage("door", doorImage);
  door.velocityY = 1;
  door.lifetime = 600;
  doorsGroup.add(door);
    
  climber = createSprite(200, 100);
  climber.x = door.x;
  climber.addImage("climber", climberImage);
  climber.velocityY = 1;
  climber.lifetime = 600;
  climberGroup.add(climber);
}
}
