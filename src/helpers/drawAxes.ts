import drawArrow from "./drawArrow";
import {consts} from "./Consts";

const crossingXOffset = consts.axis.startX - 15;
const crossingYOffset = consts.axis.startY - 15;

export const renderAxes = (ctx: CanvasRenderingContext2D, toX: number, toY: number) => {

    ctx.lineWidth = 0.5;

    drawArrow(ctx, consts.axis.startX, consts.axis.startY - crossingYOffset, consts.axis.startX, toY);
    drawArrow(ctx, consts.axis.startX - crossingXOffset, consts.axis.startY, toX, consts.axis.startX);

    ctx.lineWidth = consts.lineWidth;
};