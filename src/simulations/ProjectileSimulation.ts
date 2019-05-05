
// implement stop rendering
// add responsiveness
import Simulation from "./abstract/Simulation";
import Bullet from "../objects/Bullet";
import app from "../App";
import UiEvents from "../ui/UiEvents";
import {renderAxes} from "../helpers/drawAxes";
import StartVector from "../objects/StartVector";
import {consts} from "../consts/consts";
import {ITimeService} from "../services/TimeService";
import Hud from "../ui/Hud";
import Tank from "../objects/Tank";
import Ground from "../objects/Ground";

/**
 * Horizontal throw
 */
export default class ProjectileSimulation extends Simulation {

    bullets: Bullet[] = [];
    tanks: Tank[] = [];
    // ground: Ground;
    startVector: StartVector;

    constructor(private timeService: ITimeService, private hud: Hud) {
        super();

        UiEvents.spaceDowns.subscribe(this.fire);
        UiEvents.mouseClicks.subscribe(this.fire);

        this.startVector = new StartVector();
        // this.ground = new Ground();

        this.tanks.push(new Tank());
    }

    fire = () => {
        // console.log('fire');
        this.bullets.push(
            new Bullet(
                consts.axis.startX,
                consts.axis.startY,
                this.startVector.vectorValue,
                this.startVector.angle,
                this.timeService.absoluteTime
            )
        );

        this.hud.resetTime();
    };

    checkCollision = () => {
        this.bullets.forEach(bullet => {
            this.tanks.forEach(tank => {
                const right = tank.x + tank.width;
                const upper = tank.y + tank.height;

                if(
                    bullet.x > tank.x && bullet.x < right &&
                    bullet.y > tank.y && bullet.y < upper
                ) {
                    tank.isDead = true;
                }
            })
        })
    };

    render = (): void => {
        this.clear();
        this.timeService.incrementTime();

        renderAxes(app.ctx, app.clientWidth - consts.axis.startX, app.clientHeight - consts.axis.startY);
        this.startVector.render(app.ctx);
        this.bullets.forEach(bullet => bullet.render(app.ctx, this.timeService.absoluteTime));
        this.hud.render();

        // if(this.timeService.absoluteTime % 20 === 0) {
        //     this.tanks.push(new Tank());
        // }
        // this.bullets.length && console.log(this.bullets[0].y);

        this.checkCollision();
        this.tanks.forEach(tank => tank.render(app.ctx, this.timeService.absoluteTime))
        // this.ground.render(app.ctx);

        window.requestAnimationFrame(this.render);
    };
}
