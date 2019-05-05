import {getPositionInTime} from "../helpers/getPositionInTime";
import {consts} from "../consts/consts";
import {Renderable} from "./interfaces/Renderable";
import app from "../App";
import {Exterminable} from "./interfaces/Exterminable";

export default class Bullet implements Renderable, Exterminable {

    x: number;
    y: number;
    isExterminable: boolean = false;

    constructor(
        private initialX: number = consts.axis.startX,
        private initialY: number = consts.axis.startY,
        private V0: number,
        private angle: number,
        private timeStarted: number
    ) {}

    renderCollision = (ctx: CanvasRenderingContext2D) => {
        ctx.fillRect(this.x - 20, this.y + 10, 20, 20);
    };

    render(ctx: CanvasRenderingContext2D, time: number): void {
        const relativeTime = time - this.timeStarted;

        const lastX = this.x;
        const lastY = this.y;

        const {x, y} = getPositionInTime(this.V0, this.angle, relativeTime);
        this.x = x + consts.axis.startX;
        this.y = y + consts.axis.startY;

        const exceedsLimits: boolean = this.x > app.clientWidth || this.y < consts.axis.startY;

        if(exceedsLimits) {
            if(!this.isExterminable) {
                this.renderCollision(ctx);
            }
            this.isExterminable = true;

            return;
        }

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);

        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
}