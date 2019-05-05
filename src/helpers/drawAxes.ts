import drawArrow from "./drawArrow";
import {consts} from "../consts/consts";
import {appendText} from "./appendText";

const crossingXOffset = consts.axis.startX - 20;
const crossingYOffset = consts.axis.startY - 20;

export const renderAxes = (ctx: CanvasRenderingContext2D, toX: number, toY: number) => {

    drawArrow(ctx, consts.axis.startX, consts.axis.startY - crossingYOffset, consts.axis.startX, toY);
    drawArrow(ctx, consts.axis.startX - crossingXOffset, consts.axis.startY, toX, consts.axis.startY);

    appendText(ctx, () => {
        ctx.fillText('x', toX - crossingXOffset, -consts.axis.startY + crossingYOffset);
        ctx.fillText('y', consts.axis.startX - crossingXOffset, -toY + crossingYOffset);
    });

};