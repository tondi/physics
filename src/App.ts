import {consts} from "./consts/consts";

class App {

    clientWidth: number;
    clientHeight: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor() {
        let dpi = window.devicePixelRatio;

        this.clientWidth = document.documentElement.clientWidth * dpi;
        this.clientHeight = document.documentElement.clientHeight * dpi;
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d', {
            alpha: false
        });

        this.canvas.setAttribute('width', this.clientWidth.toString());
        this.canvas.setAttribute('height', this.clientHeight.toString());

        let realHeight = +getComputedStyle(this.canvas).getPropertyValue("height").slice(0, -2);
        let realWidth = +getComputedStyle(this.canvas).getPropertyValue("width").slice(0, -2);

        // scale to assure sharpness on high dpi screens
        this.canvas.setAttribute('height', realHeight * dpi + '');
        this.canvas.setAttribute('width', realWidth * dpi + '');

        // rotate to match physical-like coordinate system
        this.ctx.transform(1, 0, 0, -1, 0, this.clientHeight);

        this.ctx.lineWidth = consts.lineWidth;
        this.ctx.font = consts.font;
        this.ctx.lineCap = "round";
    }
}

const app = new App();
export default app;
