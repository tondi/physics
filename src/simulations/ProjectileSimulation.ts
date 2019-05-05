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
import {Exterminable} from "../objects/interfaces/Exterminable";

/**
 * Horizontal throw
 */
export default class ProjectileSimulation extends Simulation {

    bullets: Bullet[] = [];
    tanks: Tank[] = [];
    startVector: StartVector;

    constructor(
        private ctx: CanvasRenderingContext2D,
        private timeService: ITimeService,
        private hud: Hud
    ) {
        super();

        UiEvents.spaceEvents.subscribe(this.fire);
        UiEvents.mouseEvents.subscribe(this.fire);

        this.startVector = new StartVector();
        // interval(5000).subscribe(this.spawnTank);
    }

    spawnTank = () => {
        this.tanks.push(new Tank());
    };

    fire = () => {
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
                    tank.isExterminable = true;
                }
            })
        })
    };

    performGC = () => {
        const notExterminable = (object: Exterminable) => !object.isExterminable;
        this.tanks = this.tanks.filter(notExterminable);
        this.bullets = this.bullets.filter(notExterminable);
    };

    render = (): void => {
        this.clear();
        this.timeService.incrementTime();

        renderAxes(app.ctx, app.clientWidth - consts.axis.startX, app.clientHeight - consts.axis.startY);
        this.startVector.render(app.ctx);
        this.bullets.forEach(bullet => bullet.render(app.ctx, this.timeService.absoluteTime));
        this.hud.render();

        this.checkCollision();
        this.tanks.forEach(tank => tank.render(app.ctx, this.timeService.absoluteTime))

        this.performGC();

        window.requestAnimationFrame(this.render);
    };
}
