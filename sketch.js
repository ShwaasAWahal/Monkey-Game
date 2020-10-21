
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var ground
var score = 0
var bg;
var survivalTime = 0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400)
  
  bg = createSprite(200,200,400,400)
  bg.shapeColor = "white"
  
  monkey = createSprite(50,300,10,10)
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.2
  
  ground = createSprite(200,390,800,10)
  // ground.debug = true
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  
  if(keyDown("space")&& monkey.y >= 320) {
        monkey.velocityY = -12;
    }
  
  if(monkey.isTouching(foodGroup)){
    score = score+1
    foodGroup.destroyEach()
  }
  //  if(monkey.isTouching(obstacleGroup)){
  //   ground.velocityX = 0
  //   foodGroup.setVelocityEach(0)
  //   obstacleGroup.setVelocityEach(0)
  // }
  
  monkey.velocityY = monkey.velocityY + 0.5
  
  ground.velocityX = -4
  
   monkey.collide(ground)
  monkey.collide(obstacleGroup)
  
  if(ground.x < 0){
    ground.x = ground.width/2
  }
  
  food();
  
  obstacles();
    
  drawSprites();
  
  stroke("black")
  textSize(20)
  fill("black")
  text("score " + score,100,50)
  
  stroke("black")
  textSize(20)
  fill("black")
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time " + survivalTime,98,70);
}

function food(){
  if(frameCount % 80 === 0 ){
    banana = createSprite(410,200,10,10)
     banana.addImage(bananaImage);
    banana.scale = 0.1
    banana.y = Math.round(random(120,200))
    banana.velocityX = -8
    banana.lifetime = 60
    foodGroup.add(banana)
  }
  
}

function obstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(410,330,10,10)
 obstacle.addImage(obstacleImage);
    obstacle.scale = 0.3
    obstacle.velocityX = -6
    obstacle.lifetime = 80
    // obstacle.debug = true
     obstacle.setCollider("circle",0,0,150)
    obstacleGroup.add(obstacle)
  }
}