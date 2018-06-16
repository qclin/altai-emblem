var canvas;

var agent;
var environment;
var palette = [];

//   *** shared variables with all FAL codes
p5.disableFriendlyErrors = true;
const IDEAL_FRAME_RATE = 60;
let unitLength;
let unitSpeed;


// 1. rorschach settings ------------------------------
// ------------ Global variables
//

const fontPath = '../assets/fonts/Bellefair-Regular.ttf';
let currentFont;
let currentFontSize;
let backgroundColor;
let frameCounter;
let rorschachShape;
let rorschachShapeColor;
let sign;
function getCurrentISODate() {
    const dateTime = new Date().toISOString();
    return dateTime.substring(0, dateTime.indexOf('T'));
}

// rorschach settings --------------------------------------
function preload() {
    currentFont = loadFont(fontPath);

    environment = loadImage("../assets/environment/glacier/p051x6gy.jpg");
    agent = loadImage("../assets/agents/isolation/isolation.png");
}


function setup() {
  // here we extract some colors from environment
  image(environment, 0, 0);

  for(var i=0; i<5; i++){
    var color = get(random(0, width), random(0, height));
    print('picked color is : :  ', i, color );
    palette.push(color);
  }
  canvas = createCanvas( 0.618 * window.innerHeight, window.innerHeight); // create a protrait frame with golden ratio
  rorschachSetup();

}


function rorschachSetup() {
  const canvasSideLength = Math.min(windowWidth, windowHeight);
  createCanvas(canvasSideLength, canvasSideLength);
  frameRate(IDEAL_FRAME_RATE);
  unitLength = Math.min(width, height) / 640;
  unitSpeed = unitLength / IDEAL_FRAME_RATE;
  strokeWeight(Math.max(1, 1 * unitLength));
  FrameCounter.initializeStatic(IDEAL_FRAME_RATE);
  backgroundColor = color(252);
  frameCounter = new TimedFrameCounter(true, 13 * IDEAL_FRAME_RATE, () => { noLoop(); });
  currentFontSize = 14 * unitLength;
  textFont(currentFont, currentFontSize);
  // sign = createSignFunction(200 * unitLength, 20 * unitLength, currentFontSize, new NoStrokeShapeColor(color(0)), new NoStrokeShapeColor(backgroundColor), () => { return 'Rorschach ' + getCurrentISODate() + '  -  FAL'; });
  rorschachInitialize();
}

function draw() {

  // Step 1 Environment
  image(environment, 0,0);

  // Step 2 Imprint

  rorschachDraw();

  // Step 3 Agent
  image(agent, width/2 - agent.width/2, height/2 - agent.height/2);
  // // rotate(radians(frameCount));
  // tint(255, 126); // Apply transparency without changing color
  image(agent, width/2 - agent.width/2, height/2 - agent.height/2);

}

// ---------------------------- rorschachDraw----------------------------
function rorschachDraw() {
    rorschachShape.step();
    rorschachShapeColor.apply();
    rorschachShape.draw();
    // sign();
    frameCounter.step();
}

function rorschachInitialize() {
    background(backgroundColor);
    const rorschachShapeSize = 480 * unitLength;
    rorschachShape = new RorschachShape({
        shapeSize: rorschachShapeSize,
        vertexCount: Math.floor(1.5 * rorschachShapeSize),
        noiseDistanceScale: random(0.005, 0.04),
        noiseMagnitudeFactor: random(1, 4),
        noiseTimeScale: 0.0005,
    });
    rorschachShape.centerPosition.set(0.5 * width, 0.48 * height);
    rorschachShape.rotationAngle = PI + HALF_PI;
    rorschachShapeColor = new NoFillShapeColor(color(0, random(8, 48)));
    frameCounter.reset();
    frameCounter.on();
    loop();
}

// ---------------------------- rorschachDraw----------------------------
