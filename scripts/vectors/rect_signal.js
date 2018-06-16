/**
 * Rectangle Signal.
 * Website => https://www.fal-works.com/
 * @copyright 2018 FAL
 * @author FAL <falworks.contact@gmail.com>
 * @version 0.1.0
 * @license CC-BY-SA-3.0
 */

(function (p5ex) {
'use strict';

function createGradationRectangle(p, w, h, backgroundColor, fromColor, toColor, gradient = 1) {
    const g = p.createGraphics(w, h);
    g.background(backgroundColor);
    g.strokeWeight(2);
    for (let y = 0; y < h; y += 1) {
        const lerpRatio = Math.pow(y / (h - 1), gradient);
        g.stroke(p.lerpColor(fromColor, toColor, lerpRatio));
        g.line(0, y, w - 1, y);
    }
    return g;
}

p5.disableFriendlyErrors = true;
const SKETCH_NAME = 'RectangleSignal';
new p5();
class RectangleSignalUnit {
    constructor(p, topY, maxBottomY, appearanceDelayDuration = 0) {
        this.p = p;
        const r = Math.random();
        this.width = 5 + p.sq(r) * 600;
        this.height = Math.min(5 + p.sq(1 - r) * 100, maxBottomY - topY);
        this.position = p.createVector(0, topY + 0.5 * this.height);
        this.color = new p5ex.ShapeColor(p, null, p.color(40, 40, 40));
        this.appearanceDelayTimer = new p5ex.NonLoopedFrameCounter(appearanceDelayDuration, () => { this.appearanceTimer.on(); });
        this.appearanceTimer = new p5ex.NonLoopedFrameCounter(30, () => { this.disappearanceDelayTimer.on(); }).off();
        this.disappearanceDelayTimer = new p5ex.NonLoopedFrameCounter(60, () => { this.disappearanceTimer.on(); }).off();
        this.disappearanceTimer = new p5ex.NonLoopedFrameCounter(30).off();
        this.timers = new p5ex.SteppableArray(4);
        this.timers.pushRawArray([
            this.appearanceDelayTimer,
            this.appearanceTimer,
            this.disappearanceDelayTimer,
            this.disappearanceTimer,
        ]);
    }
    step() {
        this.timers.step();
    }
    draw() {
        if (this.appearanceDelayTimer.isOn)
            return;
        let widthFactor = 0;
        if (this.appearanceTimer.isOn) {
            widthFactor = p5ex.easeOutBack(this.appearanceTimer.getProgressRatio());
        }
        else if (this.disappearanceDelayTimer.isOn) {
            widthFactor = 1;
        }
        else {
            widthFactor = 1 - Math.pow(this.disappearanceTimer.getProgressRatio(), 4);
        }
        this.color.applyColor();
        this.p.rect(this.position.x, this.position.y, widthFactor * this.width, this.height, 2);
    }
}
const sketch = (p) => {
    // ---- constants
    let backgroundPixels;
    // ---- variables
    let signal;
    let timeoutId = -1;
    // ---- functions
    function createBackgroundPixels() {
        const g = createGradationRectangle(p, p.width, p.height, p.color(255, 255, 255), p.color(248, 248, 248), p.color(228, 224, 232), 4);
        p.image(g, 0, 0);
        p.loadPixels();
        return p.pixels;
    }
    function mouseIsInCanvas() {
        if (p.mouseX < 0)
            return false;
        if (p.mouseX > p.width)
            return false;
        if (p.mouseY < 0)
            return false;
        if (p.mouseY > p.height)
            return false;
        return true;
    }
    function createSignal(appearanceInterval = 0) {
        const signal = new p5ex.SpriteArray();
        let y = 10;
        let appearanceTiming = 0;
        while (y < p.nonScaledHeight - 15) {
            const unit = new RectangleSignalUnit(p, y, p.nonScaledHeight - 10, appearanceTiming);
            signal.push(unit);
            y += 10 + unit.height;
            appearanceTiming += appearanceInterval;
        }
        return signal;
    }
    function updateSignal() {
        if (p.frameCount % 180 !== 0)
            return;
        if (p.frameCount % 360 === 0)
            signal = createSignal(4);
        else
            signal = createSignal();
    }
    // ---- Setup & Draw etc.
    p.preload = () => {
    };
    p.setup = () => {
        window.noCanvas();
        p.createScalableCanvas(p5ex.ScalableCanvasTypes.FULL);
        backgroundPixels = createBackgroundPixels();
        p.rectMode(p.CENTER);
        signal = createSignal(4);
    };
    p.draw = () => {
        p.pixels = backgroundPixels;
        p.updatePixels();
        p.scalableCanvas.scale();
        updateSignal();
        signal.step();
        p.translate(0.5 * p.nonScaledWidth, 0);
        signal.draw();
        p.translate(-0.5 * p.nonScaledWidth, 0);
    };
    p.windowResized = () => {
        p.resizeScalableCanvas();
        if (timeoutId !== -1)
            clearTimeout(timeoutId);
        timeoutId = setTimeout(() => { backgroundPixels = createBackgroundPixels(); }, 200);
    };
    p.mousePressed = () => {
    };
    p.touchMoved = () => {
        if (!mouseIsInCanvas())
            return;
        return false;
    };
};
new p5ex.p5exClass(sketch, SKETCH_NAME);

}(p5ex));
