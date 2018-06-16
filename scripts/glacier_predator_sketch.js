let levy;
var systems;
let softie;
var palette = [];

function preload() {
    environment = loadImage("../assets/environment/glacier/glacierr.jpg");
}
function setup() {

  createCanvas(windowWidth, windowHeight);
  // background(255);

  image(environment, 0, 0, width);
  for(var i=0; i<5; i++){
    var color = get(random(0, width), random(0, height));
    palette.push(color);
  }

  levy = new LevysFlight(width/2, height/2)
  levy.display();
  // softie = new SoftBody(width/2, height/2) // wherever levy started;
  // softie.setup();
  systems = [];
}

function draw() {

  for (i = 0; i < systems.length; i++) {
    var fillColor = random(palette)

     systems[i].run(fillColor);
     systems[i].addParticle();
   }


  levy.move();
  // softie.drawShape();
  // softie.moveShape();

  if(levy.leaped){

    var fillColor = random(palette)
    console.log("LEAPED AND NOW ~~~~ ", fillColor)
    fill(fillColor);
    ellipse(levy.pos.x,levy.pos.y, 55);
    systems.splice(0, systems.length);
    this.p = new ParticleSystem(createVector(levy.pos.x, levy.pos.y));
    systems.push(p);

    // softie.moveToX = levy.pos.x;
    // softie.moveToY = levy.pos.y;

  }
}
