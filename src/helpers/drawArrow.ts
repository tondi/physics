export default function drawArrow(ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number){
    //variables to be used when creating the arrow
    var headlen = 15;
    var angle = Math.atan2(toY - fromY,toX - fromX);

    //starting path of the arrow from the start square to the end square and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    //starting a new path from the head of the arrow to one of the sides of the point
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.moveTo(toX-headlen*Math.cos(angle-Math.PI/7),toY-headlen*Math.sin(angle-Math.PI/7));

    //path from the side point of the arrow, to the other side point
    ctx.moveTo(toX-headlen*Math.cos(angle+Math.PI/7),toY-headlen*Math.sin(angle+Math.PI/7));

    //path from the side point back to the tip of the arrow, and then again to the opposite side point
    ctx.lineTo(toX, toY);
    ctx.lineTo(toX-headlen*Math.cos(angle-Math.PI/7),toY-headlen*Math.sin(angle-Math.PI/7));

    ctx.stroke();
}