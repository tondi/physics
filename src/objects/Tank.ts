import {TimeService} from "../services/TimeService";
import app from "../App";
import {Renderable} from "./interfaces/Renderable";

export default class Tank implements Renderable{
    x: number = app.clientWidth;
    y: number = 50;

    width = 15;
    height = 15;

    isDead: boolean = false;

    render(ctx: CanvasRenderingContext2D, time: number) {
        if(this.isDead) {
            return;
        }

        this.x -= 0.4;

        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}