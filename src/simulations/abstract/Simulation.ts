import app from "../../app";

/**
 * Base simulation class
 */
export default abstract class Simulation {

    clear = () => {
        app.ctx.clearRect(0,0, app.clientWidth, app.clientHeight);
    };

    incrementTime = () => this.t += 0.1;

    t: number = 0;
}

