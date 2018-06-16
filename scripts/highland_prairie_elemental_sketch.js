var canvas;

var agent;
var environment;
var palette = [];


/// orbit
var path = [];
var resolution = 50;
var sun;
var end;


function preload() {
    environment = loadImage("../assets/environment/highland_prairie/original_2776291e18e4334f8f2565a36638a551.jpg");
    agent = loadImage("../assets/agents/elemental/elemental_00.png");
}


function setup() {
  // here we extract some colors from environment
  image(environment, 0, 0);

  for(var i=0; i<5; i++){
    var color = get(random(0, width), random(0, height));
    palette.push(color);
  }
  canvas = createCanvas( 0.618 * window.innerHeight, window.innerHeight); // create a protrait frame with golden ratio

  orbitSetup();
}

function orbitSetup(){
  sun = new Orbit(width/2, height/2, width/4, 0);
  var next = sun;
  for (var i = 0; i < 10; i++) {
    next = next.addChild();
  }
  end = next;
}

function draw() {

  // Step 1 Environment
  image(environment, 0,0, width, height);

  // Step 2 Imprint
  drawFractal()

  // Step 3 Agent
  image(agent, width/2 - agent.width/4, height/2 - agent.height/4, agent.width/4, agent.height/4 );
  // // rotate(radians(frameCount));
  // tint(255, 126); // Apply transparency without changing color
  // image(agent, width/2 - agent.width/2, height/2 - agent.height/2);

}


function drawFractal(){
  for (var i = 0; i < resolution; i++) {
    var next = sun;
    while (next != null) {
      next.update();
      next = next.child;
    }
    path.push(createVector(end.x, end.y));
  }

  var next = sun;
  while (next != null) {
    next.show();
    next = next.child;
  }

  beginShape();
  stroke(255, 255, 255);
  strokeWeight(4);
  noFill();
  for (var pos of path) {
    vertex(pos.x, pos.y);
  }
  endShape();
}
