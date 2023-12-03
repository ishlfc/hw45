var invisibleBlockGroup, invisibleBlock;
var slope,slopeImg;
var skierGif, skierRightImg;
var skier, skierImg;
var treeImg, tree;
var ground;
var flags, flagImg;
var skierRight, skierLeft;
var star,starsImg;
var treeGroup;
var gameState = "play"

function preload(){
  slopeImg = loadImage("skislope.jpg");
  skierLeft = loadAnimation("skicharacters2.png","skicharacters4.png","skicharacters5.png","skicharacters6.png");
  skierRight = loadAnimation("skicharacters.png", "skicharacters1.png","skicharacters3.png");
  skierImg = loadImage("skicharacters6.png");
  treeImg = loadImage("tree.png");
  flagImg = loadImage("flags.png");
  starsImg = loadImage("stars.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  skier = createSprite(width/2,height - 800);
  skier.addAnimation("skiRight",skierRight);
  skier.addAnimation("skiLeft",skierLeft);
  skier.addImage("skiImg",skierImg);

  star = createSprite(skier.x,skier.y - 60, 10,10);
  star.scale = 0.25;
  star.addImage("knockout",starsImg);
  star.visible = false;

  treeGroup = new Group();

  ground = createSprite(width/2,height - 600, 500,height + 700);
  ground.velocityY = -5;
  ground.shapeColor = "white";
  ground.depth = skier.depth;
  skier.depth += 1;

 // ground.visible = false;
}

function draw() {
  background("green");
  if(ground.y < height - 800){
      ground.y = height - 600;
    }

  drawSprites();

  if(gameState == "play") {
    spawnTrees();
    if (keyDown(LEFT_ARROW)) {
      skier.changeAnimation("skiLeft",skierLeft);
      skier.x -= 5;
      star.x = skier.x;
    }  
    
    if (keyDown(RIGHT_ARROW)) {
      skier.changeAnimation("skiRight",skierRight);
      skier.x += 5;
      star.x = skier.x;
    }
  
    if(skier.isTouching(treeGroup)) {
      gameState = "end";
      star.visible = true;
      star.x = skier.x - 10;
    }
    
  }
  else if(gameState == "end") {
    treeGroup.setVelocityYEach(0);
    treeGroup.destroyEach();
    skier.changeImage("skiImg",skierImg);
  }

  
console.log(gameState);



}



function spawnTrees() {

  if (frameCount % 80 == 0) {
    var x = Math.round(random(600, 1050));
    tree = createSprite(x,height + 200, 15,30);
    tree.scale = 0.3;
    tree.addImage("tree",treeImg);
    tree.velocityY = -7;
    console.log(tree.x);
    treeGroup.add(tree);
    tree.lifetime = 200;
  }
}
