import drawArrow from "./helpers/drawArrow";

class App {

    clientWidth: number;
    clientHeight: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor() {
        this.clientWidth = document.documentElement.clientWidth;
        this.clientHeight = document.documentElement.clientHeight;
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.setAttribute('width', this.clientWidth.toString());
        this.canvas.setAttribute('height', this.clientHeight.toString());
        this.ctx.transform(1, 0, 0, -1, 0, this.canvas.height); // rotate to match

        this.ctx.lineWidth = 2;
    }

    renderAxes = () => {
        drawArrow(this.ctx, 30, 25, 30, this.clientHeight - 100);
        drawArrow(this.ctx, 30, 25, this.clientWidth - 100, 30);
    };

    // getScaledX = (percentageValue: number) => {
    //     return percentageValue * this.clientWidth / 100;
    // };
    //
    // getScaledY = (percentageValue: number) => {
    //     return percentageValue * this.clientHeight / 100;
    // };
}

export default new App();