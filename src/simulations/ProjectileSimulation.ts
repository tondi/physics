
// implement stop rendering
// add responsiveness
import Simulation from "./abstract/Simulation";
import Bullet from "../objects/Bullet";
import app from "../app";

/**
 * Horizontal throw
 */
export default class ProjectileSimulation extends Simulation {

    bullet: Bullet;

    constructor() {
        super();

        this.bullet = new Bullet();
    }


    render = (): void => {
        this.clear();
        this.bullet.update(this.t);

        this.incrementTime();
        app.renderAxes();

        window.requestAnimationFrame(this.render);
    }
}
