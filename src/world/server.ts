import { ValidateIdentifier } from "../util/identifier";
import { World } from "./world";

export abstract class Server {
    private constructor() {}

    abstract world<S extends string>(identifier: ValidateIdentifier<S>): World;
    abstract gamerule<S extends string>(
        type: ValidateIdentifier<S>,
    ): number | boolean;
    abstract gamerule<S extends string>(
        type: ValidateIdentifier<S>,
        value: number | boolean,
    ): void;
}
