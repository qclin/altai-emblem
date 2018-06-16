var pathPoints = []
var environment;

var particles = [];
var r;
var attractor;

function preload() {
    environment = loadImage("../assets/environment/apline_meadow/6.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  image(environment, 100, 0, width/2- 100, height);

  // background(0);
  attractor = createVector(width/2,height/2)

}

function draw() {
  //create the path
  // image(environment, 0, 0, width);

  pathPoints = circlePoints();

  for(var j=0;j<6;j++){
	pathPoints = complexifyPath(pathPoints);
  }

  //draw the path
  stroke('rgba(184, 193, 86, 0.2)');
  for(var i=0;i<pathPoints.length -1;i++){
    var v1 = pathPoints[i];
    var v2 = pathPoints[i+1];
    line(v1.x,v1.y,v2.x,v2.y);
  }
  noFill();
  stroke(255,0, 0);


  ellipse(width/2, height/2, width/2, width/2);

  // add particles
  particles.push(new Particle(random(width), random(height)));

  if (particles.length > 100) {
    particles.splice(0, 1);
  }

  for (var i = 0; i < particles.length; i++) {
  var particle = particles[i];

  particle.attracted(attractor);

  particle.update();
  particle.show();
}

}

function complexifyPath(pathPoints){
  //create a new path array from the old one by adding new points inbetween the old points
  var newPath = [];

  for(var i=0;i<pathPoints.length -1;i++){
    var v1 = pathPoints[i];
    var v2 = pathPoints[i+1];
    var midPoint = p5.Vector.add(v1, v2).mult(0.5);
    var distance =  v1.dist(v2);

    //the new point is halfway between the old points, with some gaussian variation
    var standardDeviation = 0.125*distance;
    var v = createVector(randomGaussian(midPoint.x,standardDeviation),randomGaussian(midPoint.y,standardDeviation))
   	append(newPath,v1);
    append(newPath,v);
  }

  //don't forget the last point!
  append(newPath,pathPoints[pathPoints.length-1]);
  return newPath;
}

function circlePoints() {
  //two points somewhere on a circle
  r = width/5;
  //var theta1 = random(TWO_PI);
  var theta1 = randomGaussian(0,PI/4);
  var theta2 = theta1 + randomGaussian(0,PI/3);
  var v1 = createVector(width/2 + r*cos(theta1),width/2 + r*sin(theta1));
  var v2 = createVector(width/2 + r*cos(theta2),width/2 + r*sin(theta2));
  return [v1,v2];
}
