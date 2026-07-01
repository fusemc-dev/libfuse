import { Item } from "../item/item";
import { WithSuggestion } from "../libfuse";
import { Vec3 } from "../math";
import { Some } from "../option";
import { Registered } from "../registered";
import { Lookup, Vaccine, ValidateVaccine } from "../syringe/syringe";
import { IsLiteral } from "../util";
import { Identifier, ValidateIdentifier } from "../util/identifier";
import { World } from "../world/world";

export abstract class Entity implements Registered {
    readonly type: Identifier;

    protected constructor() {}

    abstract isOf<S extends string>(type: ValidateIdentifier<S>): boolean;
    abstract isIn<S extends string>(type: ValidateIdentifier<S>): boolean;

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

    abstract slot(slot: string): Item;
    abstract insert(slot: string, candidate: Item): void;

    abstract hasTag(): boolean;
    abstract appendTag(tag: string): boolean;
    abstract removeTag(tag: string): boolean;

    abstract remove(): void;

    abstract isSneaking(): boolean;
    abstract position(): Vec3;
    abstract world(): World;
}

export type EntityDefinition =
    | {
          type: WithSuggestion<"minecraft:">;
          payload?: {
              [_: string]: any;
          };
      }
    | WithSuggestion<"minecraft:">;
