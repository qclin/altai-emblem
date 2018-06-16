// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/bqF9w9TTfeo

// var x;
// var y;
var pos;
var prev;
var environment;

function preload() {
    environment = loadImage("../assets/environment/highland_forest/forest.jpg");
}

function setup() {
  createCanvas(1920, 1080);
  // background(255);
  image(environment, 0, 0, 1920, 1080);

  pos = createVector(width/2, height/2);
  prev = pos.copy();
  console.log(pos);
}

function draw() {

  stroke(255, 0, 0 );
  strokeWeight(1);
  //point(pos.x, pos.y);
  line(pos.x, pos.y, prev.x, prev.y);
  prev.set(pos);

  var step = p5.Vector.random2D();

  var r = random(100);
  if (r < 1) {
    step.mult(random(25, 100));
  } else {
    step.setMag(2);
  }

  //pos = pos + step;
  pos.add(step);
  // image(environment, 0, 0, 1920, 1080);

}
