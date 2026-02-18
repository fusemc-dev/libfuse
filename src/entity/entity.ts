import { Some } from "../option";
import { Lookup, Vaccine, ValidateVaccine } from "../syringe/syringe";
import { IsLiteral } from "../util";
import { Vector } from "../util/vector";

export abstract class Entity {
    protected constructor() {}

    abstract sample<V extends string>(
        vaccine: ValidateVaccine<V>,
    ): IsLiteral<V> extends true
        ? Lookup<V> extends Some<Vaccine<infer _, infer Payload>>
            ? Payload
            : never
        : any;
    abstract inject<V extends string>(
        vaccine: ValidateVaccine<V>,
        payload: IsLiteral<V> extends true
            ? Lookup<V> extends Some<Vaccine<infer _, infer Payload>>
                ? Payload
                : never
            : any,
    ): void;
    abstract position(): Vector;
}
