import { Digit, LowerLetter } from "../common";
import { Some, None } from "../option";

export abstract class Identifier {
    declare readonly namespace: string;
    declare readonly path: string;

    private constructor() {}

    abstract toString(): string;
}

type Test = NormalizeIdentifier<"join">;

export type NormalizeIdentifier<
    S extends string,
    DefaultNamespace extends string = "minecraft",
> =
    ParseIdentifier<S, DefaultNamespace> extends Some<
        [infer Namespace extends string, infer Path extends string]
    >
        ? Some<`${Namespace}:${Path}`>
        : None;

export type ParseIdentifier<
    S extends string,
    DefaultNamespace extends string = "minecraft",
> =
    ParseNamespace<S, "", DefaultNamespace> extends Some<
        [infer Namespace, infer Path extends string]
    >
        ? ParsePath<Path> extends infer Result
            ? Result extends string
                ? Some<[Namespace, Path]>
                : None
            : None
        : None;

type ParseNamespace<
    S extends string,
    Namespace extends string = "",
    DefaultNamespace extends string = "minecraft",
> = S extends `${infer Head}${infer Rest}`
    ? Head extends ":"
        ? Some<[Namespace, Rest]>
        : Head extends "/"
          ? Some<[DefaultNamespace, `${Namespace}/${Rest}`]>
          : Head extends LowerLetter | Digit | "_" | "-"
            ? ParseNamespace<Rest, `${Namespace}${Head}`, DefaultNamespace>
            : None
    : Some<[DefaultNamespace, Namespace]>;

type ParsePath<
    S extends string,
    Path extends string = "",
    Segment extends string = "",
> = S extends `${infer Head}${infer Rest}`
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
