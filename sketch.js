var PLAY = 1;
var END = 0;
var gameState = PLAY;
 //Rex And Cloud
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
 //Background
var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
 //Score
var score;


function preload(){
  //Rex Running Animation
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  //Ground Image
  groundImage = loadImage("ground2.png");
  //Cloud Image
  cloudImage = loadImage("cloud.png");
  //Obstacles
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
}

function setup() {
  createCanvas(600, 200);
  //Creating rex
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  //Creating Ground
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  //Creating Invisible Ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //Creating Obstacles and Cloud groups
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  //Console log ("Hello5")
  console.log("Hello" + 5);
  
  score = 0;
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);
 
  //Game states
  if(gameState === PLAY){
   //move the ground
    ground.velocityX = -4;
   //Scores 
    score = score + Math.round(frameCount/60);
   //Rex movement 
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -13;
    }
   //Velocity of rex
    trex.velocityY = trex.velocityY + 0.8
   //Infinite Ground
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

   //Spawning the clouds
  spawnClouds();
  
   //Spawning obstacles on the ground
  spawnObstacles();
  }
  else if(gameState === END){
   //Stopping  the ground
    ground.velocityX = 0;
  
  }
  
  
   //Making rex collide ground
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}
   //Spawning Obstacles
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;

   
   //Generating random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
   //Assigning scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //Adding obstacles to the group
   obstaclesGroup.add(obstacle);
 }
}




function spawnClouds() {
   //Spawning the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
   //Assigning lifetime to the variable
    cloud.lifetime = 134;
    
   //Adjusting the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
   //Adding cloud to the group
   cloudsGroup.add(cloud);
  }
  
}