import {
    fromEvent,
    interval,
    Observable,
    Subject,
} from 'rxjs';
import {
    filter,
    takeUntil,
    tap,
} from "rxjs/operators";

export default class UiEvents {

    static keyDowns: Observable<Event> = fromEvent(document, 'keydown');
    static keyUps: Observable<Event> = fromEvent(document, 'keyup');

    static filterNonSpaces = filter((e: KeyboardEvent) => e.code === 'Space');
    static spaceDowns: Observable<Event> = UiEvents.keyDowns.pipe(
        UiEvents.filterNonSpaces
    );
    static spaceUps: Observable<Event> = UiEvents.keyUps.pipe(
        UiEvents.filterNonSpaces
    );

    static mouseDowns: Observable<Event> = fromEvent(document, 'mousedown');
    static mouseUps: Observable<Event> = fromEvent(document, 'mouseup');
    static mouseMoves: Observable<Event> = fromEvent(document, 'mousemove');
    static mouseEvents: Subject<Event> = new Subject<Event>();
    static spaceEvents: Subject<Event> = new Subject<Event>();

    static isSpacePressed: boolean = false;
    static readonly interval: number = 300;

    constructor() {
        UiEvents.mouseDowns.subscribe(
            () => {
                UiEvents.mouseEvents.next();
                interval(UiEvents.interval).pipe(
                    tap(() => UiEvents.mouseEvents.next()),
                    takeUntil(UiEvents.mouseUps)
                ).subscribe(null)
            }
        );

        UiEvents.spaceUps.subscribe(() => {
            UiEvents.isSpacePressed = false;
        });

        UiEvents.spaceDowns.subscribe(
            () => {

                if(UiEvents.isSpacePressed) {
                    return;
                }
                UiEvents.isSpacePressed = true;

                UiEvents.spaceEvents.next();
                interval(UiEvents.interval).pipe(
                    tap(() => UiEvents.spaceEvents.next()),
                    takeUntil(UiEvents.spaceUps)
                ).subscribe(null)
            }
        )

    }
}

