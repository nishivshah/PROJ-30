const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
var zombie;
var zombie1, zombie2, zombie3, zombie4;
var breakButton,breakButton2;
var backgroundImage;

var stones = [];
var zombiesound; 
var buttonpresssound; 

function preload() {
  zombie1 = loadImage("./assets/zombie1.png");
  zombie2 = loadImage("./assets/zombie2.png");

  zombie3 = loadImage("./assets/zombie3.png");
  zombie4 = loadImage("./assets/zombie4.png");

  backgroundImage = loadImage("./assets/background.png");

  zombiesound = loadSound("zombiesound.mp3");
  buttonpresssound = loadSound("buttonpresssound.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width * 2, 20);
  leftWall = new Base(100, height - 300, 200, height / 2 + 100);
  rightWall = new Base(width - 100, height - 300, 200, height / 2 + 100);

  bridge = new Bridge(28.5, { x: 5, y: height / 2 - 70 });
  jointPoint = new Base(width - 250, height / 2 - 100, 40, 20);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-100, 100);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }

  zombie = createSprite(width / 2, height - 85);
  zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
  zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
  zombie.scale = 0.06;
  zombie.velocityX = 6;

  breakButton = createButton("");
  breakButton.position(width - 200, height / 2 - 50);
  breakButton.class("breakbutton");

  breakButton2 = createButton("");
  breakButton2.position(width - 1250, height / 2 - 90);
  breakButton2.class("breakbutton");
  breakButton2.mousePressed(handleButtonPress);

  breakButton.mouseClicked(handleButtonPress);
  //breakButton.mousePressed(handleButtonPress);
  //breakButton.mouse(handleButtonPress);
  //breakButton.mousePressed(ButtonPress);
 

}

function draw() {
  background(backgroundImage);
  Engine.update(engine);

  bridge.show();
  
  if(!zombiesound.isPlaying()){
    zombiesound.play()
    zombiesound.volume = 10
  }

  for (var stone of stones) {
    stone.show();
  }

  if (zombie.position.x >= width - 230) {
    zombie.velocityX = -5;
    zombie.changeAnimation("righttoleft");
  }

  if (zombie.position.x <= 230) {
    zombie.velocityX = 5;
    zombie.changeAnimation("lefttoright");
  }

  drawSprites();
}

function handleButtonPress() {
  buttonpresssound.play()
  /* jointLink=dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500); */

  /* jointLink.dettach();
  setTimeout(() => {
    break();
  }, 1500); */

  /* jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 5); */

   jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500); 
}

