import {consts} from "./Consts";
import {Coords} from "./getXYfromAngleAndHypotenuse";

export const getPositionInTime = (V0: number, angle: number, t: number): Coords => ({
    x: (V0 * Math.cos(angle) * t),
    y: V0 * Math.sin(angle) * t - (consts.g * t ** 2 / 2)
});