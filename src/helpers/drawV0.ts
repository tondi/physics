import drawArrow from "./drawArrow";
import {getXYfromAngleAndHypotenuse} from "./getXYfromAngleAndHypotenuse";

export default function drawV0(
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    angle: number,
    length: number
) {
    const {x, y} = getXYfromAngleAndHypotenuse(angle, length);

    drawArrow(ctx, fromX, fromY, x, y);
}