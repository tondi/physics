/**
 * IDEAS
 * draw coordinate axes
 * make point class
 *
 * add menu for other simulations
 * shot a bullet in interval
 * basing on an angle set by user
 * using up/down arrows
 */
enum Constants {
    G = 10
}


class App {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    clientWidth: number;
    clientHeight: number;

    constructor() {
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');

        this.ctx.fillRect(50, 100, 20, 20);
        this.ctx.fillStyle = 'red';

        this.clientWidth = document.documentElement.clientWidth;
        this.clientHeight = document.documentElement.clientHeight;

        this.canvas.setAttribute('width', this.clientWidth.toString());
        this.canvas.setAttribute('height', this.clientHeight.toString());
        this.ctx.transform(1, 0, 0, -1, 0, this.canvas.height); // rotate to match
    }

    getScaledX = (percentageValue: number) => {
        return percentageValue * this.clientWidth / 100;
    };

    getScaledY = (percentageValue: number) => {
        return percentageValue * this.clientHeight / 100;
    };
}
const app = new App();

/**
 * Base simulation class
 */
abstract class Simulation {
    t: number = 0;
}

// implement stop rendering
// add responsiveness
/**
 * Horizontal throw
 */
class Throw extends Simulation {

    bullet: Bullet;

    constructor() {
        super();
        this.bullet = new Bullet();
    }

    incrementTime = () => this.t += 0.1;

    clear = () => {
        app.ctx.clearRect(0,0, app.clientWidth, app.clientHeight);
    };

    render = (): void => {
        this.clear();
        this.bullet.update(this.t);
        app.ctx.fillStyle = 'red';

        this.incrementTime();

        window.requestAnimationFrame(this.render);
    }
}

class Bullet {
    // set them in constructor
    initialX: number = 50;
    initialY: number = 200;

    x: number;
    y: number;

    angle = Math.PI / 3;

    calculateX = (t: number): number =>
        this.initialX + (V0 * Math.cos(this.angle) * t);

    calculateY = (t: number): number =>
        this.initialY + V0 * Math.sin(this.angle) * t - (Constants.G * t**2 / 2);

    update(time: number) {

        app.ctx.lineWidth = 3;

        app.ctx.beginPath();       // Start a new path
        app.ctx.moveTo(this.x, this.y);    // Move the pen to (30, 50)

        this.x = this.calculateX(time);
        this.y = this.calculateY(time);

        app.ctx.lineTo(this.x, this.y);
        app.ctx.stroke();
    }
}

(new Throw).render();

let V0 = 120; // pixels/second
