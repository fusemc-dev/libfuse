import { Registered } from "../registered";
import { Identifier, ValidateIdentifier } from "../util/identifier";

export abstract class Block implements Registered {
    readonly type: Identifier;

    private constructor() {}

    abstract isOf<S extends string>(type: ValidateIdentifier<S>): boolean;
    abstract isIn<S extends string>(type: ValidateIdentifier<S>): boolean;

    abstract with(property: string, value: any): Block;
    abstract get(property: string): Block;
}

export type BlockDefinition =
    | {
          type: string;
          properties?: Record<string, any>;
      }
    | Block;
