import {
    empty,
    fromEvent,
    interval,
    Observable,
    Subject,
    Subscribable,
    Subscription,
    timer
} from 'rxjs';
import {
    filter,
    flatMap,
    map, mapTo,
    startWith,
    switchMap,
    switchMapTo,
    takeUntil, takeWhile,
    tap, throttle
} from "rxjs/operators";

const filterArrowsUps =
    filter((e: KeyboardEvent) => e.code === 'ArrowUp');

export default class UiEvents {

    static keyDowns: Observable<Event> = fromEvent(document, 'keydown');
    static keyUps: Observable<Event> = fromEvent(document, 'keyup');

    // static isEmitting: boolean = false;

    // static arrowEvents$: Subject<any> = new Subject<any>();

    static filterArrowUps =
        filter((e: KeyboardEvent) => e.code === 'ArrowUp');

    static filterArrowDowns =
        filter((e: KeyboardEvent) => e.code === 'ArrowDown');


    static arrowUpPress$: Observable<any> = UiEvents.keyDowns.pipe(
        UiEvents.filterArrowUps,
        // tap(_ => UiEvents.isEmitting = true)
    );

    // static _arrowUpRelase$: Observable<any> = UiEvents.keyUps.pipe(
    //     filterArrowUps,
    //     // tap(_ => UiEvents.isEmitting = false)
    // );

    static arrowDownPress$: Observable<any> = UiEvents.keyDowns.pipe(
      UiEvents.filterArrowDowns
    );

    // static arrowDowns: Subscription = UiEvents.arrowUpPress$.subscribe(
    //     // tap(e => console.log(e)),
    //     // filter(_ => UiEvents.isEmitting),
    //     // takeUntil(UiEvents._arrowUp)
    //     () => {
    //         console.log('fire')
    //         interval(100).pipe(
    //             tap(_ => console.log(_)),
    //             tap(() => UiEvents.arrowEvents$.next()),
    //             takeUntil(UiEvents._arrowUpRelase$)
    //         )
    //     }
    // );
// ,
//     takeUntil<Event>(UiEvents.keyUps.pipe(
//         filter((e: KeyboardEvent) => e.code === 'ArrowUp'),
// )),
//     tap(e => console.log('done')),
//     flatMap(e => interval(10))

    static spaceDowns: Observable<Event> = UiEvents.keyDowns.pipe(
        filter((e: KeyboardEvent) => e.code === 'Space'),
        throttle(val => interval(300))
    );

    constructor() {

        // var keyDowns = fromEvent(document, "keydown")
        // var keyUps = fromEvent(document, "keyup");

        UiEvents.keyDowns.subscribe(this.handleKeydown);

        // var keyPresses = keyDowns
        //     .merge(keyUps)
            // .groupBy(e => e.keyCode)
            // .map(group => group.distinctUntilChanged(null, e => e.type))
            // .mergeAll()
    }

    handleKeydown = (e: KeyboardEvent) => {
        // e.preventDefault();
        console.log(e)
    }
}

