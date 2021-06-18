var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground,groundImg;
var survivalTime,score;
var backImg,bgr;

function preload(){ 
  monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png"); 
  
  backImg= loadImage("jungle.jpg")
}



function setup() {
  createCanvas(600,400);
  bgr=createSprite(0,0,800,400);
  bgr.addImage(backImg);
  bgr.scale=1.5;
  bgr.x=bgr.width/2;
  bgr.velocityX=-4;
 survivalTime=0;
  score=0;
  
  monkey=createSprite(50,300,50,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.15;
  
  ground=createSprite(50,350,800,10);
  ground.velocityX=-3;
  ground.visible=false;
  ground.x=ground.width/2;
  score=0
  
  foodGroup=new Group();
  obstacleGroup=new Group();
}


function draw() {
  background(255);
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(bgr.x<100){
    bgr.x=bgr.width/2;
  }
  monkey.collide(ground);
  
  if(keyDown("space")&&monkey.y>120){
    monkey.velocityY=-10;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score = score + 2; }
  switch(score)
  { case 10: monkey.scale=0.12;
      break;
      case 20: monkey.scale=0.14;
      break;
      case 30: monkey.scale=0.16; 
      break;
      case 40: monkey.scale=0.18;
      break; 
      default: break;
  }
  food();
  spawnobstacle();
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale=0.08;
  }
  drawSprites();
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+ score, 400,50);  
  
}

function food(){
  if(frameCount%80===0){
    banana=createSprite(200,150,50,50);
    banana.addImage(bananaImage);
    banana.y=random(120,200);
    banana.velocityX=-3;
    banana.lifetime=500;
    banana.scale=0.1;
    monkey.depth=banana.depth+1;
    foodGroup.add(banana);
  }
}

function spawnobstacle(){
  if(frameCount%100===0){
    obstacle=createSprite(700,315,10,40);
    obstacle.addImage(obstacleImage);
    obstacleGroup.add(obstacle);
    obstacle.lifetime = 300;
    obstacle.scale=0.15;
    obstacle.velocityX=-6;
  }
}