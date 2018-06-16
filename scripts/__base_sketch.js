var canvas;

var agent;
var environment;

var palette = [];

function preload() {
    environment = loadImage("assets/environment/apline_meadow/64112719-shavlinskoe-lake-in-the-altai-mountains-ust-koksinsky-district-in-september.jpg");
    agent = loadImage("assets/agents/trans/trans_00.png");
}


function setup() {
  // here we extract some colors from environment
  image(environment, 0, 0);

  for(var i=0; i<5; i++){
    var color = get(random(0, width), random(0, height);
    print('picked color is : :  ', i, color );
    palette.push(color);
  }

  canvas = createCanvas( 0.618 * window.innerHeight, window.innerHeight); // create a protrait frame with golden ratio

}


function draw() {

  // Step 1 Environment
  image(environment, 0,0);

  // Step 2 Imprint



  // Step 3 Agent
  image(agent, width/2 - agent.width/2, height/2 - agent.height/2);
  // // rotate(radians(frameCount));
  // tint(255, 126); // Apply transparency without changing color
  image(agent, width/2 - agent.width/2, height/2 - agent.height/2);

}
