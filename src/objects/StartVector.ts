import UiEvents from "../ui/UiEvents";
import {Subject} from "rxjs";
import {consts} from "../consts/consts";
import app from "../App";
import {getXYfromAngleAndHypotenuse} from "../helpers/getXYfromAngleAndHypotenuse";
import {getPositionInTime} from "../helpers/getPositionInTime";
import drawArrow from "../helpers/drawArrow";
import {appendText} from "../helpers/appendText";
import {Renderable} from "./interfaces/Renderable";

export default class StartVector implements Renderable{

    angle: number = Math.PI / 4;
    angle$: Subject<number> = new Subject();

    vectorValue: number = 60;
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
        return Math.atan(y / x);
    };

    calculateVectorLength = (x: number, y: number) => {
        // pythagorean triangle
        const realVectorValue =  Math.sqrt(x **2 + y ** 2);

        // don'absoluteTime let vector raise enormous values
        const baseVectorLength = 10;
        return baseVectorLength + 1/10 * (realVectorValue);
    };

    showAngle = (ctx: CanvasRenderingContext2D) => {
        // get point on bisector, in the half of vector length
        const {x, y} = getXYfromAngleAndHypotenuse(this.angle / 2, this.vectorValue / 2);

        const pointX = x;

        // lower it a bit
        const pointY = y / 2;

        appendText(ctx, () => {
            ctx.fillText("α", (pointX - 20), -(pointY + 10));
        });
    };

    showValue = (ctx: CanvasRenderingContext2D) => {
        const {x, y} = getXYfromAngleAndHypotenuse(this.angle, this.vectorValue / 4);

        appendText(ctx, () => {
            ctx.translate(x, -y);
            ctx.rotate(-this.angle);
            ctx.fillText(this.vectorValue.toFixed(0).toString() + 'px/s', 0, -consts.baseOffset / 2);
        });
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

        ctx.globalAlpha = 0.08;

        // magic number ahead
        ctx.quadraticCurveTo(x, (y - 25) * 2, newX, newY);

        ctx.stroke();
        ctx.globalAlpha = 1;
    };

    renderPeakPointProps = (ctx: CanvasRenderingContext2D) => {
        const timeToPeak = this.calculateTimeToPeak();
        let {x, y} = getPositionInTime(this.vectorValue, this.angle, timeToPeak);

        appendText(ctx, () => {
            ctx.translate(x, -y - consts.baseOffset);
            ctx.fillText('t = ' + this.calculateTimeToPeak().toFixed(2) + 's', 0, -40);
        })
    };

    renderEndPointProps = (ctx: CanvasRenderingContext2D) => {
        const timeToPeak = this.calculateTimeToPeak();
        const timeToFall = timeToPeak * 2;

        let {x, y} = getPositionInTime(this.vectorValue, this.angle, timeToFall);

        appendText(ctx, () => {
            ctx.translate(x, -y);
            ctx.fillText('t = ' + timeToFall.toFixed(2) + 's', 0, -14);
        })
    };

    render = (ctx: CanvasRenderingContext2D) => {
        const {x, y} = getXYfromAngleAndHypotenuse(this.angle, this.vectorValue);
        drawArrow(ctx, consts.axis.startX, consts.axis.startY, x, y);

        // this.showAngle(ctx);
        this.showValue(ctx);
        this.renderPeakPointProps(ctx);
        this.renderPrediction(ctx);
        // this.renderEndPointProps(ctx);
    };
}