var canvas;
var agent;
var environment;
var palette = [];

var n1 = 0.3;
var n2 = 0.3;
var n3 = 0.3;
var m = 5;
var a = 1;
var b = 1;

var osc = 0;




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
    environment = loadImage("../assets/environment/tundra/tundra.jpg");
}


function setup() {
  // here we extract some colors from environment
  image(environment, 0, 0);

  for(var i=0; i<5; i++){
    var color = get(random(0, width), random(0, height));
    palette.push(color);
  }
  canvas = createCanvas(  1920, 1080); // create a protrait frame with golden ratio
}


function draw() {
  // Step 1 Environment
  image(environment, 0,0, 1920, environment.height/2);

  // Step 2 Imprint
  for(var i = 0; i < 10; i++){
    var radius = height/4/(i+1);
    var col = palette[floor(random(0, palette.length))];

    drawSuperShape(radius, radius, col);

  }
  // drawSuperShape(width / 2, height / 2);
  // Step 3 Agent
  // image(agent, width/2 - agent.width/2, height/2 - agent.height/2);
  // // rotate(radians(frameCount));
  // tint(255, 126); // Apply transparency without changing color
  // image(agent, width/2 - agent.width/2, height/2 - agent.height/2);
  drawLorenz()
}

function drawSuperShape(x, y, col){
    m = map(sin(osc), -1, 1, 0, 10); //slider.value();
    osc += 0.02;
    translate(x, y);
    stroke(255);
    strokeWeight(2);
    noFill();

    var radius = 200;

    var total = 200;
    var increment = TWO_PI / total;

    beginShape();
    for (var angle = 0; angle < TWO_PI; angle += increment) {
      var r = supershape(angle);
      var x = radius * r * cos(angle);
      var y = radius * r * sin(angle);

      vertex(x+osc, y);
    }
    endShape(CLOSE);
}

function supershape(theta) {

  var part1 = (1 / a) * cos(theta * m / 4);
  part1 = abs(part1);
  part1 = pow(part1, n2);

  var part2 = (1 / b) * sin(theta * m / 4);
  part2 = abs(part2);
  part2 = pow(part2, n3);

  var part3 = pow(part1 + part2, 1 / n1);

  if (part3 === 0) {
    return 0;
  }

  return (1 / part3);
}



function drawLorenz() {
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
