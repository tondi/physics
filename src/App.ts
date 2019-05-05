import {consts} from "./consts/consts";
import {fromEvent, Observable} from "rxjs";

class App {

    clientWidth: number;
    clientHeight: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    dpi: number;

    screenResizes: Observable<Event> = fromEvent(window, 'resize');

    constructor() {
        this.init();

        this.screenResizes.subscribe(this.init);
    }

    init = () => {
        this.dpi = window.devicePixelRatio;

        this.clientWidth = document.documentElement.clientWidth * this.dpi;
        this.clientHeight = document.documentElement.clientHeight * this.dpi;
        this.canvas = document.querySelector('#canvas');

        this.ctx = this.canvas.getContext('2d', {
            alpha: false
        });

        this.canvas.setAttribute('width', this.clientWidth.toString());
        this.canvas.setAttribute('height', this.clientHeight.toString());

        let realHeight = +getComputedStyle(this.canvas).getPropertyValue("height").slice(0, -2);
        let realWidth = +getComputedStyle(this.canvas).getPropertyValue("width").slice(0, -2);

        // scale to assure sharpness on high this.dpi screens
        this.canvas.setAttribute('height', realHeight * this.dpi + '');
        this.canvas.setAttribute('width', realWidth * this.dpi + '');

        // rotate to match physical-like coordinate system
        this.ctx.transform(1, 0, 0, -1, 0, this.clientHeight);

        this.ctx.lineWidth = consts.lineWidth;
        this.ctx.font = consts.font;
        this.ctx.lineCap = "round";
    }
}

const app = new App();
export default app;
