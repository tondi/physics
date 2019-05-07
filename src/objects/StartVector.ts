import UiEvents from "../ui/UiEvents";
import {consts} from "../consts/consts";
import app from "../App";
import {getXYfromAngleAndHypotenuse} from "../helpers/getXYfromAngleAndHypotenuse";
import drawArrow from "../helpers/drawArrow";
import {appendText} from "../helpers/appendText";
import {Renderable} from "./interfaces/Renderable";
import {toDegrees} from "../helpers/toDegrees";

export default class StartVector implements Renderable {

    angle: number = Math.PI / 4;

    vectorValue: number = 60;

    constructor() {
        UiEvents.mouseMoves.subscribe(this.handleMouseMove);
        UiEvents.touchMoves.subscribe(this.handleTouchMove);
    }

    handleTouchMove = (e: TouchEvent) => {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        this.handleMove(x, y);
    };

    handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;
        this.handleMove(x, y);
    };

    handleMove = (eventX: number, eventY: number) => {
        const x = eventX * app.dpi;

        // our axes, for readability reasons
        // begin from left - bottom
        // e.clientY is calculated from top - left
        // therefore subtract to count from bottom
        const y = app.virtualHeight - eventY * app.dpi;

        const calculatedAngle = this.calculateAngleFromZeroZero(x, y);
        this.angle = calculatedAngle;

        const calculatedLength = this.calculateVectorLength(x, y);
        this.vectorValue = calculatedLength;

    };

    calculateAngleFromZeroZero = (x: number, y: number) => {
        return Math.atan(y / x);
    };

    calculateVectorLength = (x: number, y: number) => {
        // pythagorean triangle
        const realVectorValue =  Math.sqrt(x ** 2 + y ** 2);

        // don't let vector raise enormous values
        const baseVectorLength = 10;
        return baseVectorLength + 1/10 * realVectorValue;
    };

    showAngle = (ctx: CanvasRenderingContext2D) => {
        // get point on bisector, in the half of vector length
        const {x, y} = getXYfromAngleAndHypotenuse(this.angle / 2, this.vectorValue / 2);

        const pointX = x;

        // lower it a bit
        const pointY = y / 2;

        // convert to degrees
        const convertedAngle = toDegrees(this.angle).toFixed(0);

        appendText(ctx, () => {
            ctx.fillText("α = " + convertedAngle + '°', (pointX - 20), -(pointY + 30));
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

    render = (ctx: CanvasRenderingContext2D) => {
        const {x, y} = getXYfromAngleAndHypotenuse(this.angle, this.vectorValue);

        drawArrow(ctx, consts.axis.startX, consts.axis.startY, x, y);
        // this.showAngle(ctx);
        this.showValue(ctx);
    };
}