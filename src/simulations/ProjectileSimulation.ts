
// implement stop rendering
// add responsiveness
import Simulation from "./abstract/Simulation";
import Bullet from "../objects/Bullet";
import app from "../App";
import UiEvents from "../ui/UiEvents";

/**
 * Horizontal throw
 */
export default class ProjectileSimulation extends Simulation {

    bullets: Bullet[] = [];
    angle: number = Math.PI / 6;

    constructor() {
        super();

        // this.bullets.push(new Bullet(50, 200, 100, this.angle));
        UiEvents.arrowUpPress$.subscribe(() => this.angle += Math.PI / 360 * 4);
        UiEvents.arrowDownPress$.subscribe(() => this.angle -= Math.PI / 360 * 4);
        UiEvents.spaceDowns.subscribe(this.fire);
    }

    fire = () => {
        // console.log('fire');
        this.bullets.push(new Bullet(50, 200, 100, this.angle, this.t))
    };

    render = (): void => {
        this.clear();

        this.bullets.forEach(bullet => bullet.update(this.t));

        this.incrementTime();
        app.renderAxes();

        window.requestAnimationFrame(this.render);
    };
}
