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
import TrajectoryPrediction from "../objects/TrajectoryPrediction";
import {getPositionInTime} from "../helpers/getPositionInTime";
import {Coords} from "../helpers/getXYfromAngleAndHypotenuse";
import {interval} from "rxjs";

/**
 * Horizontal throw
 */
export default class ProjectileSimulation extends Simulation {

    bullets: Bullet[] = [];
    tanks: Tank[] = [];
    startVector: StartVector;
    trajectoryPrediction: TrajectoryPrediction;

    constructor(
        private ctx: CanvasRenderingContext2D,
        private timeService: ITimeService,
        private hud: Hud
    ) {
        super();

        UiEvents.spaceEvents.subscribe(this.fire);
        UiEvents.pointerPresses.subscribe(this.fire);

        this.startVector = new StartVector();
        this.trajectoryPrediction = new TrajectoryPrediction(hud);
        interval(5000).subscribe(this.spawnTank);
    }

    spawnTank = () => {
        this.tanks.push(new Tank());
    };

    fire = () => {
        // extract calculateTimeToPeak to helper
        const timeToPeak = this.trajectoryPrediction.calculateTimeToPeak(this.startVector.angle, this.startVector.vectorValue);
        const coords: Coords = getPositionInTime(this.startVector.vectorValue, this.startVector.angle, timeToPeak);

        this.bullets.push(
            new Bullet(
                consts.axis.startX,
                consts.axis.startY,
                this.startVector.vectorValue,
                this.startVector.angle,
                this.timeService.absoluteTime,
                coords
            )
        );

        this.hud.resetTime();
    };

    checkTankCollision = () => {
        // make it O(n*logm) assuming that tank x positions are sorted
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

    checkWallCollision = () => {
        this.bullets.forEach(bullet => {
            if(bullet.crashedWith === 'wall') {
                const x = bullet.peakCoords.x - bullet.x;
                const y = bullet.peakCoords.y - bullet.y;

                let newAngle = Math.atan2(y, x);

                // TODO unhack handling peak not reached
                // peak not reached, peakCoords.x > bullet.x => x > 0
                if(bullet.peakCoords.x + bullet.initialX > app.virtualWidth) {
                    newAngle = Math.PI + newAngle;
                    const angleAbove90 = newAngle - Math.PI / 2;
                    newAngle = Math.PI - angleAbove90;
                }

                if(newAngle > 0 && newAngle < Math.PI / 4) {
                    return;
                }

                this.bullets.push(
                    new Bullet(
                        bullet.x - 10, // TODO more clear way
                        bullet.y,
                        bullet.V0 / 3,
                        newAngle,
                        this.timeService.absoluteTime,
                        bullet.peakCoords // bullet will never go higher after crash
                    )
                )
            }
        })
    };

    checkCollision = () => {
        this.checkTankCollision();
        this.checkWallCollision();
    };

    performGC = () => {
        const notExterminable = (object: Exterminable) => !object.isExterminable;
        this.tanks = this.tanks.filter(notExterminable);
        this.bullets = this.bullets.filter(notExterminable);

        // console.log(this.bullets)
    };

    render = (): void => {
        this.clear();
        this.timeService.incrementTime();

        renderAxes(app.ctx, app.virtualWidth - consts.axis.startX, app.virtualHeight - consts.axis.startY);
        this.startVector.render(app.ctx);
        this.trajectoryPrediction.render(this.ctx, this.startVector.angle, this.startVector.vectorValue);

        this.hud.render();

        this.bullets.forEach(bullet => bullet.render(app.ctx, this.timeService.absoluteTime));
        this.tanks.forEach(tank => tank.render(app.ctx, this.timeService.absoluteTime))

        this.checkCollision();
        this.performGC();

        window.requestAnimationFrame(this.render);
    };
}
