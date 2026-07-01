import { EventType, UnboundCallback } from "./disastrous/event_type";
import { ParseSelector, ValidateSelector } from "./disastrous/selector";
import { Io } from "./io";
import { Context, Source } from "./marshal/source";
import { Vec2, Vec3 } from "./math";
import { Some } from "./option";
import { Property, Serializable } from "./serialization";
import { Widen } from "./util";
import { ValidateIdentifier } from "./util/identifier";

export declare const script: Entrypoint;
export declare const io: Io;

interface Entrypoint {
    on<S extends string>(
        selector: ValidateSelector<S>,
        callback: ParseSelector<S> extends Some<infer Result>
            ? Result extends EventType<infer _, infer Callback>
                ? Callback
                : UnboundCallback
            : never,
    ): void;

    onCommand<S extends string>(
        path: S,
        command: (source: Source, args: Record<string, any>) => void,
    ): void;
    onSuggester<S extends string>(
        name: ValidateIdentifier<S>,
        suggester: (ctx: Context) => string[],
    ): void;

    onProperty<S extends string, T extends Serializable>(
        property: ValidateIdentifier<S>,
        initial: T,
    ): Property<Widen<T>>;

    dispatch<T extends string>(
        event: ValidateIdentifier<T>,
        ...args: any
    ): any[];

    vec2(definition: Vec2 | [number, number]): Vec2;
    vec3(definition: Vec3 | [number, number, number]): Vec3;
}

/**
 * Specifies an integer type.
 *
 * ---
 * Denotes that the number is expected to not have a fractional part.
 * Passing a floating-point number to a type annotated as `integer` may
 * and **will** lead to runtime errors.
 *
 * @since `0.1.0`
 */
export type integer = number;

export type WithSuggestion<T extends string> = (string & {}) | T;
export type RGB = integer | [number, number, number];
export type ARGB = integer | [number | number, number, number];
