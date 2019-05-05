export interface ITimeService {
    absoluteTime: number;
    incrementTime: () => number;
}

export class TimeService implements ITimeService {
    absoluteTime: number = 0;

    incrementTime = () => this.absoluteTime += 1 / 6;
}
