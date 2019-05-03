
// implement stop rendering
// add responsiveness
import Simulation from "./abstract/Simulation";
import Bullet from "../objects/Bullet";
import app from "../App";
import UiEvents from "../ui/UiEvents";
import {renderAxes} from "../helpers/drawAxes";
import drawV0 from "../helpers/drawV0";
import drawArrow from "../helpers/drawArrow";
import StartVector from "../objects/StartVector";
import {consts} from "../helpers/Consts";

/**
 * Horizontal throw
 */
export default class ProjectileSimulation extends Simulation {

    bullets: Bullet[] = [];
    startVector: StartVector;

    constructor() {
        super();

        // UiEvents.arrowUpPress$.subscribe(() => this.angle += Math.PI / 360 * 4);
        // UiEvents.arrowDownPress$.subscribe(() => this.angle -= Math.PI / 360 * 4);
        UiEvents.spaceDowns.subscribe(this.fire);

        this.startVector = new StartVector();
        this.bullets.push(new Bullet(50, 200, 100, this.startVector.angle, this.t));
    }

    fire = () => {
        // console.log('fire');
        this.bullets.push(
            new Bullet(
                consts.axis.startX,
                consts.axis.startY,
                this.startVector.vectorValue,
                this.startVector.angle,
                this.t
            )
        )
    };

    render = (): void => {

        // console.log(this.angle);


        this.clear();

        this.incrementTime();

        this.bullets.forEach(bullet => bullet.update(this.t));
        this.startVector.render(app.ctx);

        // app.ctx.strokeStyle = 'rgba(0,0,0, 0.8)';
        renderAxes(app.ctx, app.clientWidth - 100, app.clientHeight - 100);
        app.ctx.strokeStyle = 'rgba(0,0,0, 1)';

        window.requestAnimationFrame(this.render);
    };
}
