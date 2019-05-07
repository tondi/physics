import {TimeService} from "../services/TimeService";
import app from "../App";
import {Renderable} from "./interfaces/Renderable";
import {Exterminable} from "./interfaces/Exterminable";

export default class Tank implements Renderable, Exterminable {
    x: number = app.virtualWidth;
    y: number = 50;

    width = 50;
    height = 50;

    isExterminable: boolean = false;

    render(ctx: CanvasRenderingContext2D, time: number) {
        if(this.isExterminable) {
            return;
        }

        this.x -= 1;

        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}