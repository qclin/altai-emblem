/**
  * Bezier Fire.
  * Website => https://www.fal-works.com/
  * @copyright 2018 FAL
  * @author FAL <falworks.contact@gmail.com>
  * @version 0.1.0
  * @license CC-BY-SA-3.0
  */

new p5();

(function (p5ex) {
'use strict';

class FlowingBezierCurve {
    constructor(p, startPoint, endPoint, lineColor, duration, weight) {
        this.p = p;
        this.isToBeRemoved = false;
        this.startRatio = new p5ex.NumberContainer();
        this.endRatio = new p5ex.NumberContainer();
        this.frameCounter = new p5ex.NonLoopedFrameCounter(duration);
        this.lineColor = lineColor;
        this.weight = weight;
        const controlPoint = this.createControlPoint(p, startPoint, endPoint);
        this.curve = new p5ex.QuadraticBezierCurve(p, startPoint, controlPoint, endPoint, 36, this.startRatio, this.endRatio);
    }
    step() {
        this.frameCounter.step();
        const ratio = this.frameCounter.getProgressRatio();
        this.startRatio.value = ratio * ratio;
        this.endRatio.value = p5ex.easeOutQuart(ratio);
    }
    clean() {
        if (this.frameCounter.isCompleted)
            this.isToBeRemoved = true;
    }
    draw() {
        this.p.strokeWeight(this.weight);
        this.lineColor.applyColor();
        this.curve.draw();
    }
    createControlPoint(p, startPoint, endPoint) {
        const minAngle = p.radians(10);
        const maxAngle = p.radians(180);
        const minDistance = 50;
        let controlPoint;
        for (let i = 0; i < 1000; i += 1) {
            controlPoint = p.createVector(p.random(0, 640), p.random(240, 640));
            if (p5ex.QuadraticBezierCurve.checkControlPoint(controlPoint, startPoint, endPoint, minDistance, minAngle, maxAngle)) {
                return controlPoint;
            }
        }
        console.log('Could not set the valid control point.');
        return p.createVector();
    }
}

p5.disableFriendlyErrors = true;
const SKETCH_NAME = 'BezierFire';
const sketch = (p) => {
    // ---- variables
    let backgroundColor;
    let curves;
    let frameCounter;
    let randomColor;
    let bugColor;
    // ---- Setup & Draw etc.
    p.setup = () => {
			  window.noCanvas();
        p.createScalableCanvas(p5ex.ScalableCanvasTypes.SQUARE640x640);
        backgroundColor = p.color(244);
        bugColor = p.color(255);
        p.noFill();
        p.strokeJoin(p.ROUND);
        curves = new p5ex.CleanableSpriteArray(300);
        const white = p.color(255);
        randomColor = new p5ex.RandomShapeColor().pushCandidateFromFunction(() => {
            return new p5ex.ShapeColor(p, p5ex.subtractColor(white, p.color(p5ex.cielchColor(80, 115, Math.random() * p.TWO_PI))), undefined);
        }, 64);
        const startPoint = p.createVector(320, 520);
        const endPoint = p.createVector(320, 80);
        const createBezierCurves = () => {
            for (let i = 0; i < 4; i += 1) {
                curves.push(new FlowingBezierCurve(p, startPoint, endPoint, randomColor.get(), 30, 1 + 4 * Math.pow(Math.random(), 4)));
            }
        };
        frameCounter = new p5ex.LoopedFrameCounter(1, createBezierCurves);
    };
    p.draw = () => {
        p.blendMode(p.BLEND);
        p.background(backgroundColor);
        p.scalableCanvas.scale();
        frameCounter.step();
        p.blendMode(p.DIFFERENCE);
        curves.step();
        curves.clean();
        curves.draw();
    };
    p.windowResized = () => {
        p.resizeScalableCanvas();
    };
    p.mousePressed = () => {
        if (p5ex.mouseOnCanvas(p))
            p.fill(bugColor);
    };
    p.mouseReleased = () => {
        p.noFill();
    };
};
new p5ex.p5exClass(sketch, SKETCH_NAME);

}(p5ex));
