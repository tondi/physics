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
import app from "../App";

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

    static mouseMoves: Observable<Event> = fromEvent(app.canvas, 'mousemove');
    static mouseDowns: Observable<Event> = fromEvent(app.canvas, 'mousedown');
    static mouseUps: Observable<Event> = fromEvent(app.canvas, 'mouseup');

    static touchMoves: Observable<Event> = fromEvent(app.canvas, 'touchmove');
    static touchStarts: Observable<Event> = fromEvent(app.canvas, 'touchstart');
    static touchEnds: Observable<Event> = fromEvent(app.canvas, 'touchend');

    static pointerPresses: Subject<Event> = new Subject<Event>();
    static spaceEvents: Subject<Event> = new Subject<Event>();

    static isSpacePressed: boolean = false;
    static readonly interval: number = 200;

    constructor() {
        // UiEvents.mouseMoves.subscribe((e: MouseEvent) => UiEvents.pointerMoves.next(e));
        // UiEvents.touchMoves.subscribe((e: TouchEvent) => UiEvents.pointerMoves.next(e));

        UiEvents.mouseDowns.subscribe(
            () => {
                UiEvents.pointerPresses.next();
                interval(UiEvents.interval).pipe(
                    tap(() => UiEvents.pointerPresses.next()),
                    takeUntil(UiEvents.mouseUps)
                ).subscribe(null)
            }
        );

        // TODO extract common logic to handleStartStop method
        UiEvents.touchStarts.subscribe(
            () => {
                UiEvents.pointerPresses.next();
                interval(UiEvents.interval).pipe(
                    tap(() => UiEvents.pointerPresses.next()),
                    takeUntil(UiEvents.touchEnds)
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

