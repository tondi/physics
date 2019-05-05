import {ITimeService} from "../services/TimeService";

export default class Hud {
    nativeElement: HTMLDivElement;
    timeElement: HTMLSpanElement;

    snapshotTime: number = 0;

    constructor(private timeService: ITimeService) {
        this.nativeElement = document.querySelector('#hud');
        this.timeElement = this.nativeElement.querySelector('.hud__time');
    }

    resetTime = () => {
        this.snapshotTime = this.timeService.absoluteTime;
    };

    render = () => {
        const timeToRender = this.timeService.absoluteTime - this.snapshotTime;

        this.timeElement.textContent = timeToRender.toFixed(2).toString();
    }
}