var canvas;

var agent;
var environment;
var palette = [];

function preload() {
    environment = loadImage("../assets/environment/lowland_prairie/large.jpg");
    agent = loadImage("../assets/agents/recognition/altay_tasbaba.png");
}


function setup() {
  // here we extract some colors from environment
  image(environment, 0, 0);

  for(var i=0; i<5; i++){
    var color = get(random(0, width), random(0, height));
    palette.push(color);
  }
  canvas = createCanvas( 0.618 * window.innerHeight, window.innerHeight); // create a protrait frame with golden ratio

}


function draw() {

  // Step 1 Environment
  image(environment, 0,0, width, height);
  image(environment, environment.width/2, environment.height/2);
  image(environment, environment.width/4, environment.height/4);

  for (var x = 5; x < 300; x = x+50){
		for (var y = 5; y < 200; y = y+50){
			push();
			translate(x, y);
        image(environment, environment.width/10, environment.height/10);
			pop();
		}
	}



  // Step 2 Imprint


  // Step 3 Agent
  // image(agent, width/2 - agent.width/2, height/2 - agent.height/2);
  // // rotate(radians(frameCount));
  tint(255, 126); // Apply transparency without changing color
  image(agent, width/2 - agent.width/2, height/2 - agent.height/2);
  image(agent, width/2 - agent.width/4, height/2 - agent.height/4);

  ambientLight(150);

}
