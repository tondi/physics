import UiEvents from "../ui/UiEvents";
import {Subject} from "rxjs";
import drawV0 from "../helpers/drawV0";
import {consts} from "../helpers/Consts";
import app from "../App";
import {getXYfromAngleAndHypotenuse} from "../helpers/getXYfromAngleAndHypotenuse";
import {getPositionInTime} from "../helpers/getPositionInTime";

export default class StartVector {

    angle: number;
    angle$: Subject<number> = new Subject();

    vectorValue: number = 1;
    vectorValue$: Subject<number> = new Subject();

    constructor() {
        UiEvents.mouseMoves.subscribe(this.handleMouseMove)
    }

    handleMouseMove = (e: MouseEvent) => {

        const x = e.clientX;

        // our axes, for readability reasons
        // begin from left - bottom
        // e.clientY is calculated from top - left
        // therefore subtract to count from bottom
        const y = app.clientHeight - e.clientY;

        const calculatedAngle = this.calculateAngleFromZeroZero(x, y);
        this.angle = calculatedAngle;
        this.angle$.next(calculatedAngle);

        const calculatedLength = this.calculateVectorLength(x, y);
        this.vectorValue = calculatedLength;
        this.vectorValue$.next(calculatedLength);

        // console.log(x, y);
    };

    calculateAngleFromZeroZero = (x: number, y: number) => {
        const realAngle = Math.atan(y / x);


        /// doesnt work
        // console.log(realAngle)
        // if(realAngle > Math.PI / 2) {
        //     return Math.PI / 2;
        // }
        // if(realAngle < 0) {
        //     return 0;
        // }

        return realAngle;
    };

    calculateVectorLength = (x: number, y: number) => {
        // pythagorean triangle
        const realVectorValue =  Math.sqrt(x **2 + y ** 2);

        // don't let vector raise enormous values
        const baseVectorLength = 60;
        return baseVectorLength + 1/10 * (realVectorValue);
    };

    // showAngle = (ctx: CanvasRenderingContext2D) => {
    //     //     //     ctx.save();
    //     //     //     ctx.scale(1, -1);
    //     //     //
    //     //     //     // get point on bisector, in the half of vector length
    //     //     //     const {x, y} = getXYfromAngleAndHypotenuse(this.angle / 2, this.vectorValue / 2);
    //     //     //
    //     //     //     const pointX = x;
    //     //     //
    //     //     //     // lower it a bit
    //     //     //     const pointY = y / 2;
    //     //     //
    //     //     //     ctx.fillText("α", (pointX - 20), -(pointY + 10));
    //     //     //     ctx.restore();
    //     //     // };

    showValue = (ctx: CanvasRenderingContext2D) => {
        ctx.save();
        ctx.scale(1, -1);

        const {x, y} = getXYfromAngleAndHypotenuse(this.angle, this.vectorValue / 3);
        ctx.translate(x, -y);
        ctx.rotate(-this.angle);
        ctx.fillText(this.vectorValue.toFixed(0).toString() + 'px/s', -10, -10);

        ctx.restore();
    };

    calculateTimeToPeak = () => {
        return this.vectorValue * Math.sin(this.angle) / consts.g;
    };

    renderPrediction = (ctx: CanvasRenderingContext2D) => {
        const timeToPeak = this.calculateTimeToPeak();
        const timeToFall = timeToPeak * 2;

        let {x, y} = getPositionInTime(this.vectorValue, this.angle, timeToPeak);
        x += consts.axis.startX;
        y += consts.axis.startY;

        const endCoords = getPositionInTime(this.vectorValue, this.angle, timeToFall);
        let newX = endCoords.x;
        let newY = endCoords.y;

        newX += consts.axis.startX;
        newY += consts.axis.startY;

        ctx.beginPath();
        ctx.moveTo(consts.axis.startX, consts.axis.startY);


        ctx.globalAlpha = 0.1;
        // wtf 12 means?
        ctx.quadraticCurveTo(x, (y - 12) * 2, newX, newY);

        ctx.stroke()
        ctx.globalAlpha = 1;
    };

    // fake length
    render = (ctx: CanvasRenderingContext2D) => {
        ctx.font = '17px "Source Sans Pro", sans-serif';
        // this.showAngle(ctx);
        this.showValue(ctx);
        this.renderPrediction(ctx);

        drawV0(ctx, consts.axis.startX, consts.axis.startY, this.angle, this.vectorValue);
    };
}