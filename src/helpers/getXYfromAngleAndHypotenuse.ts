import {consts} from "./Consts";

interface Coords {
    x: number,
    y: number
}

/**
 * Returns vertex coords basing on angle between OX and hypotenuse
 * and hypotenuse length
 * @param angle
 * @param length
 */
export function getXYfromAngleAndHypotenuse (angle: number, length: number): Coords {
    return {
        x: Math.cos(angle) * length + consts.axis.startX,
        y: Math.sin(angle) * length + consts.axis.startY
    }
}