
export abstract class Vector {

    declare readonly x: number
    declare readonly y: number
    declare readonly z: number

    private constructor() {
    }

    abstract up(distance: number): Vector;
    abstract down(distance: number): Vector;
    abstract north(distance: number): Vector;
    abstract south(distance: number): Vector;
    abstract east(distance: number): Vector;
    abstract west(distance: number): Vector;

    abstract dot(other: Vector): number;
    abstract cross(other: Vector): Vector;
    abstract mul(other: Vector): Vector;

    abstract normalize(): Vector;
    abstract angleTo(other: Vector): number;
    abstract length(): number;

    abstract squaredDistanceTo(other: Vector): number;
    abstract distanceTo(other: Vector): number;

    abstract toString(): string;
}