var canvas;

var agent;
var environment;
var palette = [];

/// ------------------ random walk variables --------------
"use strict";
p5.disableFriendlyErrors = true;
const IDEAL_FRAME_RATE = 60;
let unitLength;
let currentPosition;
let previousPosition;
let displacementArray;
let displacementArrayLength;
let currentDirectionNumber;




function preload() {
    environment = loadImage("../assets/environment/swamp_forest/SwampForest3.jpg");
    agent = loadImage("../assets/agents/predator/lynx.png");
}





function setup() {
  // here we extract some colors from environment
  image(environment, 0, 0, width, height);

  for(var i=0; i<5; i++){
    var color = get(random(0, width), random(0, height));
    // print('picked color is : :  ', i, color );
    palette.push(color);
  }
  canvas = createCanvas( 0.618 * window.innerHeight, window.innerHeight); // create a protrait frame with golden ratio

  setupRandomWalk()
}

function setupRandomWalk(){
  frameRate(IDEAL_FRAME_RATE);
    unitLength = Math.min(width, height) / 640;
    strokeWeight(Math.max(1, 1 * unitLength));
    stroke(palette[2]);


    displacementArray = [];
    for (let angle = 0; angle < TWO_PI; angle += QUARTER_PI) {
        displacementArray.push(p5.Vector.fromAngle(angle).mult(12 * unitLength));
    }
    displacementArrayLength = displacementArray.length;
    initialize();
}


function draw() {

  // Step 1 Environment
  image(environment, 0,0, width, height);

  // Step 2 Imprint

  drawRandomWalk()
  // Step 3 Agent
  image(agent, width/2 - agent.width/2, height/2 - agent.height/2);
  // // rotate(radians(frameCount));
  // tint(255, 126); // Apply transparency without changing color
  image(agent, width/2 - agent.width/2, height/2 - agent.height/2);

}



function drawRandomWalk(){
  if (frameCount % 16 === 0)
    rect(0, 0, width, height);
  for (let i = 0; i < 60; i += 1) {
      addDirection(Math.floor(random(-0.5 * displacementArrayLength + 1, 0.5 * displacementArrayLength)));
      currentPosition.add(displacementArray[currentDirectionNumber]);
      if (currentPosition.x < 0 || currentPosition.x >= width ||
          currentPosition.y < 0 || currentPosition.y >= height) {
          addDirection(Math.floor(0.5 * displacementArrayLength));
          currentPosition.x = constrain(currentPosition.x, 0, width);
          currentPosition.y = constrain(currentPosition.y, 0, height);
      }
      line(previousPosition.x, previousPosition.y, currentPosition.x, currentPosition.y);
      previousPosition.set(currentPosition);
  }
}



function initialize() {
    // background(248);
    currentPosition = createVector(0.5 * width, 0.5 * height);
    previousPosition = createVector(0.5 * width, 0.5 * height);
    currentDirectionNumber = 0;
}
function addDirection(n) {
    currentDirectionNumber += n;
    if (currentDirectionNumber >= displacementArrayLength)
        currentDirectionNumber -= displacementArrayLength;
    if (currentDirectionNumber < 0)
        currentDirectionNumber += displacementArrayLength;
}
function mousePressed() {
    initialize();
}
function keyPressed() {
    if (keyCode === 80)
        noLoop(); // 80: 'P'
}
function keyReleased() {
    if (keyCode === 80)
        loop(); // 80: 'P'
}
