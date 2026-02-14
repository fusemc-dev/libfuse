import { Digit, IsLiteral, LowerLetter } from "../util";
import { Some, None } from "../option";

export abstract class Identifier {
    declare readonly namespace: string;
    declare readonly path: string;

    private constructor() {}

    abstract toString(): string;
}

export type ValidateIdentifier<Source extends string> =
    IsLiteral<Source> extends true
        ? ParseIdentifier<Source> extends Some<infer _>
            ? Source
            : never
        : string;

export type NormalizeIdentifier<
    Source extends string,
    DefaultNamespace extends string = "minecraft",
> =
    ParseIdentifier<Source, DefaultNamespace> extends Some<
        [infer Namespace extends string, infer Path extends string]
    >
        ? Some<`${Namespace}:${Path}`>
        : None;

export type ParseIdentifier<
    Source extends string,
    DefaultNamespace extends string = "minecraft",
> =
    ParseNamespace<Source, "", DefaultNamespace> extends Some<
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
    DefaultNamespace extends string = "minecraft",
> = Source extends `${infer Head}${infer Rest}`
    ? Head extends ":"
        ? Some<[Namespace, Rest]>
        : Head extends "/"
          ? Some<[DefaultNamespace, `${Namespace}/${Rest}`]>
          : Head extends LowerLetter | Digit | "_" | "-"
            ? ParseNamespace<Rest, `${Namespace}${Head}`, DefaultNamespace>
            : None
    : Some<[DefaultNamespace, Namespace]>;

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
