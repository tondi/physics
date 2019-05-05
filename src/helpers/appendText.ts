export const appendText = (ctx: CanvasRenderingContext2D, callback: () => void) => {
    ctx.save();
    ctx.scale(1, -1);
    callback();
    ctx.stroke();
    ctx.restore();
};