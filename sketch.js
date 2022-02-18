var LOADING = 0;
var START = 1;
var PLAY = 2;
var END = 3;
var gameState = LOADING;
var ground,groundImg;
var sonic,sonicImg,jumpImg,deadImg;
var invisibleGround;
var monster,monsterImg;
var rock,rockImg;
var fire,fireImg;
var net,netImg;
var coin,coinImg;
var treasure=0;
var score=0;
var img,loadingImg,startImg;
var gameOver,gameOverImg;
var block,block2,block3;
var coinSound;
var startSound;
var playSound;

function preload(){
  groundImg=loadImage("forest.jpg");
  sonicImg=loadImage("sonic.gif");
  jumpImg=loadImage("sonic_jump.png");
  deadImg=loadImage("dead.png");
  rockImg=loadImage("rock.png");
  fireImg=loadImage("fire.gif");
  netImg=loadImage("net.png");
  loadingImg=loadImage("loading.jpg");
  startImg=loadImage("menu.jpg");
  coinImg=loadImage("coin.gif");
  coinSound = loadSound("WhatsApp Audio 2021-03-21 at 4.51.23 PM.aac");
  startSound=loadSound("Temple-Run-Running-Theme.mp3");
  monsterImg=loadImage("villian.gif");
  gameOverImg=loadImage("game over.png");
  playSound=loadSound("02 Green Hill Zone.mp3");
}

function setup(){
  createCanvas(900, 500);
  ground=createSprite(400,250);
  ground.addImage(groundImg);
  ground.scale=0.62;
  ground.velocityX=-(3 + score/100);
  
  sonic=createSprite(240,350);
  sonic.addImage(sonicImg);
  sonic.scale=0.18;
  sonic.debug=false;
  invisibleGround=createSprite(450,415,900,5);
  invisibleGround.visible=false;
  
  block=createSprite(450,325,150,150);
  block.visible=false;
  
  img=createSprite(450,250);
  img.scale=0.5;
  img.visible=false;
  
  monster=createSprite(100,320);
  monster.addImage(monsterImg);
  monster.scale=0.5;
  monster.visible=false;
  
  gameOver=createSprite(450,250);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.8;
  gameOver.visible=false;
  
  block2=createSprite(355,450,90,40);
  block2.visible=false;
  
  block3=createSprite(550,450,90,40);
  block3.visible=false;
  
  rockGroup = new Group();
  fireGroup = new Group();
  netGroup = new Group();
  coinGroup = new Group();
}

function draw(){
  background("grey");
  if(gameState==LOADING){
  img.addImage(loadingImg);  
  img.visible=true;
  if(frameCount % 200 === 0) {
  gameState=START;
  startSound.play();
  }
  }
  if(gameState==START){
  
  img.addImage(startImg);
  img.scale=0.47;  
  monster.visible=false;  
  if(mousePressedOver(block)) {
    gameState=PLAY;
    playSound.play();
  }  
  }
  if(gameState==PLAY){
  startSound.stop();
  img.visible=false;
  monster.visible=true;  
  if (ground.x < 310){
  ground.x = ground.x=400;
  }
  if(keyDown("space") && sonic.y>= 330) {
      sonic.velocityY = -16;
  }
  sonic.velocityY = sonic.velocityY + 0.8;
  sonic.collide(invisibleGround);
  score = score + Math.round(getFrameRate()/60);
   if(frameCount % 140 === 0) {
  var obstacle = Math.round(random(1,3));
    switch(obstacle) {
      case 1: spawnRock();
              break;
      case 2:spawnFire();
              break;
      case 3: spawnNet();
              break;

      default: break;
    }
   }
     spawnCoin(); 
  if(rockGroup.isTouching(sonic)){
    sonic.addImage(deadImg);
    gameState=END;
    rockGroup.setVelocityXEach(0);
    rockGroup.setLifetimeEach(-1);
    fireGroup.destroyEach();
    netGroup.destroyEach();
    coinGroup.destroyEach();
  }  
  if(fireGroup.isTouching(sonic)){
    sonic.addImage(deadImg);
    gameState=END;
    fireGroup.setVelocityXEach(0);
    fireGroup.setLifetimeEach(-1);
    rockGroup.destroyEach();
    netGroup.destroyEach();
    coinGroup.destroyEach();
  }  
  if(netGroup.isTouching(sonic)){
    sonic.addImage(deadImg);
    gameState=END;
    netGroup.setVelocityXEach(0);
    netGroup.setLifetimeEach(-1);
    rockGroup.destroyEach();
    fireGroup.destroyEach();
    coinGroup.destroyEach();
  }    
  }
  if(gameState==END){
    playSound.stop();
    ground.velocityX=0;
    sonic.velocityX=0;
    sonic.velocityY=0;
    sonic.scale=0.09;
    if(frameCount % 100 === 0) {
      gameOver.visible=true;
    }
      if(mousePressedOver(block2)){
        gameOver.visible=false;
        gameState=START;
        img.visible=true;
        rockGroup.destroyEach();
        fireGroup.destroyEach();
        netGroup.destroyEach();
        sonic.addImage(sonicImg);
        sonic.scale=0.18;
        ground.velocityX=-(3 + score/100);
        treasure=0
        score=0;
      }
     if(mousePressedOver(block3)){
       gameOver.visible=false;
     }
  }
  
  
  drawSprites();
  //text(mouseX+","+mouseY,mouseX,mouseY);
  textSize(20);
  fill("yellow");
  text("Score: "+ score, 750,40);
  textSize(20);
  fill("yellow");
  text("Ring: "+ treasure, 40,40);
}

function spawnRock(){
  rock=createSprite(1000,380);
  rock.addImage(rockImg);
  rock.scale=0.25;
  rock.velocityX=-(5 + score/100);
  rock.lifetime=280;
  rockGroup.add(rock);
  rock.debug=false;
  rock.setCollider("rectangle",0,0,400,200);
  gameOver.depth = rock.depth;
  gameOver.depth = gameOver.depth + 1;
}

function spawnFire(){
  fire=createSprite(1000,370);
  fire.addImage(fireImg);
  fire.scale=0.18;
  fire.velocityX=-(5 + score/100);
  fire.lifetime=285;
  fireGroup.add(fire);
  fire.debug=false;
  fire.setCollider("rectangle",0,0,300,380);
  gameOver.depth = fire.depth;
  gameOver.depth = gameOver.depth + 1;
  
}

function spawnNet(){
  net=createSprite(1000,380);
  net.addImage(netImg);
  net.scale=0.05;
  net.velocityX=-(5 + score/100); 
  net.lifetime=280;
  netGroup.add(net);
  net.debug=false;
  net.setCollider("circle",0,0,650);
  gameOver.depth = net.depth;
  gameOver.depth = gameOver.depth + 1;
}

function spawnCoin(){
  if(frameCount % 25 === 0){
  coin=createSprite(1000,380);
  coin.addImage(coinImg);
  coin.scale=0.2;
  coin.velocityX=-5;
  coin.lifetime=280;  
  coinGroup.add(coin);
  if(coinGroup.isTouching(sonic)){
    coinGroup.destroyEach();
    coinSound.play();
    treasure=treasure+1;
  }  
  }
}