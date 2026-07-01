import { integer, WithSuggestion } from "../libfuse";
import { Registered } from "../registered";
import { Identifier, ValidateIdentifier } from "../util/identifier";

export abstract class Item implements Registered {
    readonly type: Identifier;
    readonly count: number;

    private constructor() {}

    abstract decrement(): this;
    abstract increment(): this;
    abstract isEmpty(): boolean;

    abstract get<S extends string>(component: ValidateIdentifier<S>): any;
    abstract set<S extends string>(
        component: ValidateIdentifier<S>,
        value: any,
    ): void;

    abstract isOf<S extends string>(type: ValidateIdentifier<S>): boolean;
    abstract isIn<S extends string>(type: ValidateIdentifier<S>): boolean;

    abstract toString(): string;
}

export type ItemDefinition = {
    type: WithSuggestion<"minecraft:">;
    count: integer;
    components?: {};
};
