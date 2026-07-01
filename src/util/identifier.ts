import { Digit, IsLiteral, LowerLetter } from "../util";
import { Some, None } from "../option";
import { Serialize, Standardized } from "../serialization";

export abstract class Identifier implements Iterable<string>, Standardized {
    readonly namespace: string;
    readonly path: string;

    private constructor() {}

    abstract matches(other: Identifier | string): boolean;
    abstract toString(): string;
    abstract [Symbol.iterator](): IterableIterator<string>;
    abstract [Serialize](): never;
}

export type ValidateIdentifier<Source extends string> =
    IsLiteral<Source> extends true
        ? ParseIdentifier<Source> extends Some<infer _>
            ? Source
            : never
        : string;

export type Lenient<
    Source extends string,
    Default extends string = "minecraft",
> =
    ParseIdentifier<Source, Default> extends Some<
        [infer Namespace extends string, infer Path extends string]
    >
        ? `${Namespace}:${Path}` | `${Path}`
        : never;

export type NormalizeIdentifier<
    Source extends string,
    Default extends string = "minecraft",
> =
    ParseIdentifier<Source, Default> extends Some<
        [infer Namespace extends string, infer Path extends string]
    >
        ? Some<`${Namespace}:${Path}`>
        : None;

export type ParseIdentifier<
    Source extends string,
    Default extends string = "minecraft",
> =
    ParseNamespace<Source, "", Default> extends Some<
        [infer Namespace, infer Path extends string]
    >
        ? ParsePath<Path> extends infer Result
            ? Result extends string
                ? Some<[Namespace, Path]>
                : None
            : None
        : None;

type ParseNamespace<
    Source extends string,
    Namespace extends string = "",
    Default extends string = "minecraft",
> = Source extends `${infer Head}${infer Rest}`
    ? Head extends ":"
        ? Some<[Namespace, Rest]>
        : Head extends "/"
          ? Some<[Default, `${Namespace}/${Rest}`]>
          : Head extends LowerLetter | Digit | "_" | "-"
            ? ParseNamespace<Rest, `${Namespace}${Head}`, Default>
            : None
    : Some<[Default, Namespace]>;

type ParsePath<
    Source extends string,
    Path extends string = "",
    Segment extends string = "",
> = Source extends `${infer Head}${infer Rest}`
    ? Head extends "/"
        ? Segment extends ""
            ? None
            : ParsePath<Rest, `${Path}${Head}`, "">
        : Head extends LowerLetter | Digit | "_" | "-"
          ? ParsePath<Rest, `${Path}${Head}`, `${Segment}${Head}`>
          : None
    : Segment extends ""
      ? None
      : Some<Path>;
