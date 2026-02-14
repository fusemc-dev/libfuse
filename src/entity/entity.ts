import { Vector } from "../util/vector";

export abstract class Entity {

    protected constructor() {
    }

    abstract position(): Vector;
}