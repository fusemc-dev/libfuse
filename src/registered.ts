import { Identifier, ValidateIdentifier } from "./util/identifier";

export interface Registered {
    readonly type: Identifier;

    isOf<S extends string>(type: ValidateIdentifier<S>): boolean;
    isIn<S extends string>(type: ValidateIdentifier<S>): boolean;
}
