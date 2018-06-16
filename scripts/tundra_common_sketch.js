var canvas;

var agent;
var environment;
var palette = [];

p5.disableFriendlyErrors = true;
const IDEAL_FRAME_RATE = 60;
let unitLength;
let unitSpeed;


function preload() {
    environment = loadImage("../assets/environment/tundra/maxresdefault.jpg");
    // agent = loadImage("../assets/agents/elemental/elemental_02.png");
}


function setup() {
  // here we extract some colors from environment
  image(environment, 0, 0);

  for(var i=0; i<5; i++){
    var color = get(random(0, width), random(0, height));
    // print('picked color is : :  ', i, color );
    palette.push(color);
  }
  canvas = createCanvas( 0.618 * window.innerHeight, window.innerHeight); // create a protrait frame with golden ratio
  ameobaSetup();

}


function ameobaSetup() {
    frameRate(IDEAL_FRAME_RATE);
    unitLength = Math.min(width, height) / 640;
    unitSpeed = unitLength / IDEAL_FRAME_RATE;
    strokeWeight(Math.max(1, 1 * unitLength));
    strokeJoin(BEVEL);
    FrameCounter.initializeStatic(IDEAL_FRAME_RATE);
    {
        const areaMargin = 60 * unitLength;
        const area = new RectangleArea(-areaMargin, -areaMargin, width + areaMargin, height + areaMargin);
        var index1 = floor(random(0, 5));
        var index2 = floor(random(0, 5));
        palette[index2][3] = 126
        const amoebaColor = new ShapeColor(palette[index1], palette[index2]);
        // const amoebaColor = new NoFillShapeColor(color(32, 128, 128));
        Amoeba.initializeStatic(amoebaColor, area);
    }
    Amoeba.shapeColor.apply();
    // backgroundColor = color(240, 255, 255);
    ameobaInitialize();
}



function draw() {

  // Step 1 Environment
  image(environment, 0,0);

  // Step 2 Imprint
  ameobaDraw();


  // Step 3 Agent
  // image(agent, width/2 - agent.width/2, height/2 - agent.height/2);
  // // rotate(radians(frameCount));
  // tint(255, 126); // Apply transparency without changing color
  // image(agent, width/2 - agent.width/2, height/2 - agent.height/2);

}


// ----------------------------ameoba Draw----------------------------

function ameobaDraw() {
    // background(backgroundColor);
    microbeArray.step();
    microbeArray.draw();
}

function ameobaInitialize() {
    microbeArray = new SpriteArray();
    const microbeCount = 24 * (1 + 0.5 * (Math.max(width, height) / Math.min(width, height) - 1));
    for (let i = 0; i < microbeCount; i += 1) {
        microbeArray.push(new Amoeba());
    }
}

function mousePressed(){
  ameobaInitialize()
}
