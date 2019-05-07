import {getPositionInTime} from "../helpers/getPositionInTime";
import {consts} from "../consts/consts";
import {Renderable} from "./interfaces/Renderable";
import app from "../App";
import {Exterminable} from "./interfaces/Exterminable";
import {Coords} from "../helpers/getXYfromAngleAndHypotenuse";

/**
 * Bullet knows he's relative position on the screen
 * Has the ability to handle impacts with walls and floor
 * However, the logic for checking collisions with other objects should be handled
 * by Bullet's owner
 */
export default class Bullet implements Renderable, Exterminable {

    x: number;
    y: number;

    crashedWith: 'wall' | 'floor' | null = null;
    isExterminable: boolean = false;
    numberOfCollisionMarksRendered: number = 0;

    constructor(
        public initialX: number,
        public initialY: number,
        public V0: number,
        private angle: number,
        public timeStarted: number,
        public peakCoords: Coords
    ) {
        this.x = initialX;
        this.y = initialY;
    }

    renderCollision = (ctx: CanvasRenderingContext2D) => {
        ctx.fillRect(
            this.x - 20 * Math.random(),
            consts.axis.startY + 10 * Math.random(),
            20 * Math.random(),
            20 * Math.random()
        );
    };

    handleFloorCrash = (ctx: CanvasRenderingContext2D) => {
        if(this.numberOfCollisionMarksRendered < 6) {
            this.renderCollision(ctx);
            this.numberOfCollisionMarksRendered++;
            return;
        }

        this.isExterminable = true;
        return;
    };

    render(ctx: CanvasRenderingContext2D, time: number): void {
        if(this.crashedWith === 'floor') {
           this.handleFloorCrash(ctx);
        }

        const relativeTime = time - this.timeStarted;

        const lastX = this.x;
        const lastY = this.y;

        const {x, y} = getPositionInTime(this.V0, this.angle, relativeTime);
        this.x = x + this.initialX;
        this.y = y + this.initialY;

        const crashedIntoWall = this.x > app.virtualWidth;
        const crashedIntoFloor = this.y < consts.axis.startY;
        const exceedsLimits: boolean =  crashedIntoWall || crashedIntoFloor;

        if(exceedsLimits) {
            if(crashedIntoWall) {
                this.crashedWith = 'wall';
                this.isExterminable = true;
            }
            if(crashedIntoFloor) {
                this.crashedWith = 'floor';
            }

            return;
        }

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);

        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
}