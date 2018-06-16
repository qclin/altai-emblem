class Logo {
    constructor(size, x, y) {
        // this.p = p;
        this.size = size;
        this.position = createVector(x + 0.5 * size, y + 0.5 * size);
        this.reset();
        this.appearanceTimer = new p5ex.NonLoopedFrameCounter(30, () => {
            this.pauseTimer.resetCount().on();
        });
        this.pauseTimer = new p5ex.NonLoopedFrameCounter(p5ex.randomIntBetween(60, 180), () => {
            this.disappearanceTimer.resetCount().on();
        }).off();
        this.disappearanceTimer = new p5ex.NonLoopedFrameCounter(30, () => {
            this.appearanceTimer.resetCount().on();
            this.reset();
        }).off();
    }
    reset() {
        // const p = this.p;
        const size = this.size;
        this.color = new p5ex.ShapeColor(color(random(['#000d1a', '#003070', '#808080'])));
        const data = [];
        data.push({ x: 0, y: 0, w: random(0.3, 0.8) * size, h: random(0.05, 0.3) * size });
        data.push({
            x: random(-0.2, 0.2) * size,
            y: -0.25 * size,
            w: random(0.2, 0.5) * size,
            h: Math.min(random(0.05, 0.2) * size, (0.25 * size - (data[0].h / 2 + 0.05 * size)) * 2),
        });
        data.push({
            x: random(-0.2, 0.2) * size,
            y: 0.25 * size,
            w: random(0.2, 0.5) * size,
            h: Math.min(random(0.05, 0.2) * size, (0.25 * size - (data[0].h / 2 + 0.05 * size)) * 2),
        });
        this.data = data;
    }
    step() {
        this.appearanceTimer.step();
        this.pauseTimer.step();
        this.disappearanceTimer.step();
    }
    draw() {
        const p = this.p;
        this.color.applyColor();
        const scaleFactor = this.appearanceTimer.isOn ?
            p5ex.easeOutQuart(this.appearanceTimer.getProgressRatio()) :
            this.pauseTimer.isOn ? 1 : 1 - pow(this.disappearanceTimer.getProgressRatio(), 4);
        if (scaleFactor < 0.001)
            return;
        translate(this.position.x, this.position.y);
        scale(scaleFactor);
        rotate(-QUARTER_PI);
        for (let i = 0, len = this.data.length; i < len; i += 1) {
            rect(this.data[i].x, this.data[i].y, this.data[i].w, this.data[i].h);
        }
        rotate(QUARTER_PI);
        scale(1 / scaleFactor);
        translate(-this.position.x, -this.position.y);
    }
}
const sketch = (p) => {
    // ---- constants
    const columns = 5;
    const rows = 5;
    const backgroundColor = p.color(248);
    // ---- variables
    const logos = new p5ex.SpriteArray();
    // ---- Setup & Draw etc.
    p.preload = () => {
    };
    p.setup = () => {
        if (OPENPROCESSING)
            window.noCanvas();
        p.createScalableCanvas(p5ex.ScalableCanvasTypes.SQUARE640x640);
        p.noStroke();
        p.rectMode(p.CENTER);
        const logoAreaWidth = p.nonScaledWidth / columns;
        const logoAreaHeight = p.nonScaledHeight / rows;
        const logoSize = Math.min(logoAreaWidth, logoAreaHeight);
        for (let i = 0; i < columns; i += 1) {
            for (let k = 0; k < rows; k += 1) {
                logos.push(new Logo(p, logoSize, i * logoAreaWidth, k * logoAreaHeight));
            }
        }
    };
    p.draw = () => {
        p.background(backgroundColor);
        p.scalableCanvas.scale();
        logos.step();
        logos.draw();
        p.scalableCanvas.cancelScale();
    };
    p.windowResized = () => {
        p.resizeScalableCanvas();
    };
    p.mousePressed = () => {
    };
    p.touchMoved = () => {
        // return false;
    };
};
