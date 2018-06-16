
class LevysFlight{

  constructor(x, y){
    this.startX = x;
    this.startY = y;
    this.leaped = false;
  }

  display(){
    this.pos = createVector(this.startX, this.startY);
    this.prev = this.pos.copy();
    console.log(this.pos);
  }

  move(){
    stroke(0);
    strokeWeight(1);
    //point(pos.x, pos.y);
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
    this.prev.set(this.pos);

    var step = p5.Vector.random2D();

    var r = random(100);
    if (r < 1) {
      this.leaped = true;

      step.mult(random(25, 100));

    } else {
      this.leaped = false;

      step.setMag(2);
    }
    //this.pos = this.pos + step;
    this.pos.add(step);
  }

};
