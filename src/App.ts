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
        this.ctx = this.canvas.getContext('2d');

        this.canvas.setAttribute('width', this.clientWidth.toString());
        this.canvas.setAttribute('height', this.clientHeight.toString());
        // this.canvas.style.width = this.clientWidth.toString() + 'px';
        // this.canvas.style.height = this.clientHeight.toString() + 'px';


        //get DPI
        //
        // //get CSS height
        // //the + prefix casts it to an integer
        // //the slice method gets rid of "px"
        let style_height = +getComputedStyle(this.canvas).getPropertyValue("height").slice(0, -2);
        //
        // //get CSS width
        let style_width = +getComputedStyle(this.canvas).getPropertyValue("width").slice(0, -2);
        //
        // //scale the this.canvas
        this.canvas.setAttribute('height', style_height * dpi + '');
        this.canvas.setAttribute('width', style_width * dpi + '');
        // debugger;


        this.ctx.transform(1, 0, 0, -1, 0, this.clientHeight); // rotate to match

        this.ctx.lineWidth = consts.lineWidth;
        this.ctx.font = consts.font;
        this.ctx.lineCap = "round"


        // this.ctx.imageSmoothingQuality = 'medium';
        // this.ctx.imageSmoothingEnabled = false;
        // console.log(this.canvas, this.ctx)

    }

    // getScaledX = (percentageValue: number) => {
    //     return percentageValue * this.clientWidth / 100;
    // };
    //
    // getScaledY = (percentageValue: number) => {
    //     return percentageValue * this.clientHeight / 100;
    // };
}

const app = new App();
export default app;
