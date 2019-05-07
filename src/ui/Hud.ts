import {ITimeService} from "../services/TimeService";

export default class Hud {
    nativeElement: HTMLDivElement;
    timeElement: HTMLSpanElement;
    showTrajectoryCheckbox: HTMLInputElement;

    snapshotTime: number = 0;

    constructor(private timeService: ITimeService) {
        this.nativeElement = document.querySelector('#hud');
        this.timeElement = this.nativeElement.querySelector('.hud__time');
        this.showTrajectoryCheckbox = this.nativeElement.querySelector('.hud__show-trajectory-prediction')

        this.showTrajectoryCheckbox.addEventListener( 'change', (e: Event) => {
            e.stopPropagation();
            e.preventDefault();
            this.showTrajectoryCheckbox.blur();
        });

    }

    get isTrajectoryEnabled(): boolean {
        return this.showTrajectoryCheckbox.checked;
    }

    resetTime = () => {
        this.snapshotTime = this.timeService.absoluteTime;
    };

    render = () => {
        // const timeToRender = this.timeService.absoluteTime - this.snapshotTime;
        //
        // this.timeElement.textContent = timeToRender.toFixed(2).toString();
    }
}