import {getPositionInTime} from "../helpers/getPositionInTime";
import {consts} from "../consts/consts";
import {Renderable} from "./interfaces/Renderable";
import app from "../App";

export default class Bullet implements Renderable {
    // set them in constructor
    // initialX: number = 50;
    // initialY: number = 200;

    x: number;
    y: number;
    isExterminable: boolean = false;

    constructor(
        private initialX: number = 50,
        private initialY: number = 200,
        private V0: number = 100,
        private angle: number,
        private timeStarted: number
    ) {}

    render(ctx: CanvasRenderingContext2D, time: number): void {
        const relativeTime = time - this.timeStarted;

        const lastX = this.x;
        const lastY = this.y;

        const {x, y} = getPositionInTime(this.V0, this.angle, relativeTime);
        this.x = x + consts.axis.startX;
        this.y = y + consts.axis.startY;

        const exceedsLimits: boolean = this.x > app.clientWidth || this.y < consts.axis.startY;
        !this.isExterminable && exceedsLimits && ctx.fillRect(this.x - 20, this.y, 20, 20);
        if(exceedsLimits) {
            this.isExterminable = true;
            return;
        }

        ctx.shadowColor = 'red';
        ctx.shadowBlur = 7;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);

        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        ctx.shadowBlur = 0;
    }
}