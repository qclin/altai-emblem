// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Fractal Spirograph
// Video: https://youtu.be/0dwJ-bkJwDI
var canvas;

var angle = 0;

var agent;
var environment;


var color1;
var color2;
var color3;

//   *** shared variables with all FAL codes
p5.disableFriendlyErrors = true;
const IDEAL_FRAME_RATE = 60;
let unitLength;
let unitSpeed;




// ameoba settings ------------ Global variables ------------------------------
const UNIT_ANGLE_VELOCITY = (2 * Math.PI) / IDEAL_FRAME_RATE;

let microbeArray;
// ameoba settings   Setup & Draw etc. ---------------------------------------
//

// ------------ Setup & Draw etc. -
//
function preload() {
    environment = loadImage("assets/environment/apline_meadow/64112719-shavlinskoe-lake-in-the-altai-mountains-ust-koksinsky-district-in-september.jpg");
    agent = loadImage("assets/agents/trans/trans_00.png");
}



function setup() {
  // here we extract some colors from environment
  image(environment, 0, 0);
  color1 = get(50,50);
  color2 = get(100, 100);
  color3 = get(150, 150);
  color4 = get(200, 200);
  color5 = get(250, 250);
  print('The value of x is ', color1, color2, color3, color4, color5);


  canvas = createCanvas( 0.618 * window.innerHeight, window.innerHeight); // create a protrait frame with golden ratio

  // ameobaSetup();
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
        const amoebaColor = new ShapeColor(color4, color1);
        // const amoebaColor = new NoFillShapeColor(color(32, 128, 128));
        Amoeba.initializeStatic(amoebaColor, area);
    }
    Amoeba.shapeColor.apply();
    backgroundColor = color(240, 255, 255);
    ameobaInitialize();
}



function draw() {

  // Step 1 Environment
  image(environment, 0,0);

  // Step 2 Imprint
  // drawFractal();
  // Step 3 Agent
  image(agent, width/2 - agent.width/2, height/2 - agent.height/2);
  // // rotate(radians(frameCount));
  // tint(255, 126); // Apply transparency without changing color
  image(agent, width/2 - agent.width/2, height/2 - agent.height/2);

}


function keyPressed() {
  if (keyCode === 83) {
    saveCanvas(canvas, 'myCanvas'+millis(), 'jpg');

  }
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

// ---------------------------- rorschachDraw----------------------------
