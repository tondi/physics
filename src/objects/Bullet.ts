import app from "../App";
import {getPositionInTime} from "../helpers/getPositionInTime";
import {consts} from "../helpers/Consts";

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

    update(time: number) {
        // console.log(this.x);
        const relativeTime = time - this.timeStarted;

        app.ctx.beginPath();       // Start a new path
        app.ctx.moveTo(this.x, this.y);    // Move the pen to (30, 50)

        // this.x = this.calculateX(relativeTime);
        // this.y = this.calculateY(relativeTime);

        const {x, y} = getPositionInTime(this.V0, this.angle, relativeTime);
        this.x = x + consts.axis.startX;
        this.y = y + consts.axis.startY;

        app.ctx.lineTo(this.x, this.y);
        app.ctx.stroke();
    }
}