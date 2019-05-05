import UiEvents from "../ui/UiEvents";
import {Subject} from "rxjs";
import {consts} from "../consts/consts";
import app from "../App";
import {getXYfromAngleAndHypotenuse} from "../helpers/getXYfromAngleAndHypotenuse";
import {getPositionInTime} from "../helpers/getPositionInTime";
import drawArrow from "../helpers/drawArrow";
import {appendText} from "../helpers/appendText";
import {Renderable} from "./interfaces/Renderable";
import Hud from "../ui/Hud";

export default class TrajectoryPrediction implements Renderable {

    constructor(private hud: Hud) {}

    calculateTimeToPeak = (angle: number, vectorValue: number) => {
        return vectorValue * Math.sin(angle) / consts.g;
    };

    renderPrediction = (ctx: CanvasRenderingContext2D, angle: number, vectorValue: number) => {
        const timeToPeak = this.calculateTimeToPeak(angle, vectorValue);
        const timeToFall = timeToPeak * 2;

        let {x, y} = getPositionInTime(vectorValue, angle, timeToPeak);
        x += consts.axis.startX;
        y += consts.axis.startY;

        const endCoords = getPositionInTime(vectorValue, angle, timeToFall);
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

    renderPeakPointProps = (ctx: CanvasRenderingContext2D, angle: number, vectorValue: number) => {
        const timeToPeak = this.calculateTimeToPeak(angle, vectorValue);
        let {x, y} = getPositionInTime(vectorValue, angle, timeToPeak);

        appendText(ctx, () => {
            ctx.translate(x, -y - consts.baseOffset);
            ctx.fillText('t = ' + timeToPeak.toFixed(2), 0, -40);
        })
    };

    renderEndPointProps = (ctx: CanvasRenderingContext2D, angle: number, vectorValue: number) => {
        const timeToPeak = this.calculateTimeToPeak(angle, vectorValue);
        const timeToFall = timeToPeak * 2;

        let {x, y} = getPositionInTime(vectorValue, angle, timeToFall);

        appendText(ctx, () => {
            ctx.translate(x, -y);
            ctx.fillText('t = ' + timeToFall.toFixed(2), 0, -14);
            ctx.globalAlpha = 0.08;
        })
    };

    render = (ctx: CanvasRenderingContext2D, angle: number, vectorValue: number) => {
        if(!this.hud.isTrajectoryEnabled) {
            return;
        }

        this.renderPeakPointProps(ctx, angle, vectorValue);
        this.renderPrediction(ctx, angle, vectorValue);
        this.renderEndPointProps(ctx, angle, vectorValue);
    };
}