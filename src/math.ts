import { Serialize, Standardized } from "./serialization";

export abstract class Vec2 implements Iterable<number>, Standardized {
    readonly x: number;
    readonly y: number;

    private constructor() {}

    abstract add(other: Vec2 | [number, number]): Vec2;
    abstract sub(other: Vec2 | [number, number]): Vec2;
    abstract mul(other: Vec2 | [number, number]): Vec2;
    abstract div(other: Vec2 | [number, number]): Vec2;
    abstract scale(factor: number): Vec2;

    abstract floor(): Vec2;
    abstract ceil(): Vec2;

    abstract normalize(): Vec2;
    abstract length(): number;

    abstract squaredDistanceTo(other: Vec2 | [number, number]): number;
    abstract distanceTo(other: Vec2 | [number, number]): number;

    abstract toString(): "[object Vec2]";
    abstract [Symbol.iterator](): IterableIterator<number>;
    abstract [Serialize](): never;
}

export abstract class Vec3 implements Iterable<number>, Standardized {
    readonly x: number;
    readonly y: number;
    readonly z: number;

    private constructor() {}

    abstract add(other: Vec3 | [number, number, number]): Vec3;
    abstract sub(other: Vec3 | [number, number, number]): Vec3;
    abstract mul(other: Vec3 | [number, number, number]): Vec3;
    abstract div(other: Vec3 | [number, number, number]): Vec3;
    abstract scale(factor: number): Vec3;

    abstract floor(): Vec3;
    abstract ceil(): Vec3;

    abstract normalize(): Vec3;
    abstract length(): number;

    abstract squaredDistanceTo(other: Vec3 | [number, number, number]): number;
    abstract distanceTo(other: Vec3 | [number, number, number]): number;

    abstract toString(): "[object Vec3]";
    abstract [Symbol.iterator](): IterableIterator<number>;
    abstract [Serialize](): never;
}
