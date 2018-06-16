var canvas;

var agent;
var agent2;

var environment;
var palette = [];


// lorenz attractor variables -------
var sigma = 15;
var rho = 28;
var beta = 8/3;

var lx = 1;
var ly = 1;
var lz = 1;
var px, py, pz;
var zoom = 2e1;
var dt = 5e-3;






function preload() {
    environment = loadImage("../assets/environment/highland_forest/sunset-mountain-lake-pink-calm-waters-altai-mountains-highland-nature-autumn-landscape-photo-beautiful-russian-wilderness-83127296.jpg");
    agent = loadImage("../assets/agents/couple/shepard_01.png");
    agent2 = loadImage("../assets/agents/couple/toy_shepard.png");
}


function setup() {
  // here we extract some colors from environment
  background(environment)
  image(environment, 0, 0);

  for(var i=0; i<5; i++){
    var color = get(random(0, width), random(0, height));
    palette.push(color);
  }
  canvas = createCanvas( 0.618 * window.innerHeight, window.innerHeight); // create a protrait frame with golden ratio

  // lorenz attractor
  zoom = zoom/1080 * height;
  // background(10,10,20);
}


function draw() {

  // Step 1 Environment
  image(environment, 0,0);

  // Step 2 Imprint


  // Step 3 Agent
  image(agent, agent.width/4, height/2 - agent.height/4, agent.width/2, agent.height/2);
  image(agent2, agent2.width/2, height/2 - agent2.height/4, agent2.width/2, agent2.height/2);


  drawLorenzAttractor();

}



function drawLorenzAttractor(){
      // do some math
    px = lx; py = ly; pz = lz;
    lorenz();
    // and draw pretty things
    var dxy = len(lx,ly);
    var dxz = len(lx,lz);
    var dyz = len(ly,lz);
    var x0 = width/2+px*zoom;
    var y0 = pz*zoom;
    var x1 = width/2+lx*zoom;
    var y1 = lz*zoom;
    strokeWeight(dxy/4);
    stroke(dxy*10,dxz*10,dyz*10);
    line(x0,y0,x1,y1);
}

function IX(x,y) {
	return (x + y*width) * 4;
}

function len(x,y) {
	return sqrt(x*x + y*y);
}

function lorenz() {
	var x=lx; var y=ly; var z=lz;
	lx = x + dt * sigma*(y-x);
	ly = y + dt * (rho*x - y - x*z);
	lz = z + dt * (x*y - beta*z);
}
