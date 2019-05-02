import app from "../App";
import {Consts} from "../helpers/Consts";

export default class Bullet {
    // set them in constructor
    // initialX: number = 50;
    // initialY: number = 200;

    x: number;
    y: number;

    constructor(
        private initialX: number = 50,
        private initialY: number = 200,
        private V0: number = 100,
        private angle: number,
        private timeStarted: number
    ) {}

    calculateX = (t: number): number =>
        this.initialX + (this.V0 * Math.cos(this.angle) * t);

    calculateY = (t: number): number =>
        this.initialY + this.V0 * Math.sin(this.angle) * t - (Consts.G * t ** 2 / 2);

    update(time: number) {
        // console.log(this.x);
        const relativeTime = time - this.timeStarted;

        app.ctx.beginPath();       // Start a new path
        app.ctx.moveTo(this.x, this.y);    // Move the pen to (30, 50)

        this.x = this.calculateX(relativeTime);
        this.y = this.calculateY(relativeTime);

        app.ctx.lineTo(this.x, this.y);
        app.ctx.stroke();
    }
}