import app from "../../App";
import {consts} from "../../consts/consts";

/**
 * Base simulation class
 * Hopefully this project will have more than one simulation
 */
export default abstract class Simulation {

    clear = () => {
        // app.ctx.clearRect(0,0, app.virtualWidth, app.virtualHeight);
        app.ctx.fillStyle = "#FFF";
        app.ctx.fillRect(0, 0,  app.virtualWidth, app.virtualHeight);
        app.ctx.fillStyle = consts.black;
    };

}

