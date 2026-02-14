import { Nominal, Digit, Letter } from "../common";
import { Some, None } from "../option";
import { NormalizeIdentifier } from "../util/identifier";
import { EventType, Lookup } from "./event_type";
import { GuardType, LookupGuard, PlayerGuard } from "./guard";

export type Selector<S extends string> =
    ParseSelector<S> extends Some<infer _> ? S : never;

export type ParseSelector<S extends string> =
    Lex<S> extends [Separator<"#">, infer Rest extends string]
        ? ParseUnboundSelector<Rest>
        : ParseBoundSelector<S>;

type ParseBoundSelector<Source extends string> =
    Lex<Source> extends Some<
        [Identifier<infer Type>, infer Rest extends string]
    >
        ? Lookup<Type> extends Some<
              infer Event extends EventType<infer _, infer __>
          >
            ? Lex<Rest> extends Some<
                  [Separator<"[">, infer RestPrime extends string]
              >
                ? Lex<RestPrime> extends Some<[Separator<"]">, infer _]>
                    ? Some<Event>
                    : ParseBoundGuards<RestPrime, Event> extends Some<
                            infer RestPrimePrime extends string
                        >
                      ? Lex<RestPrimePrime> extends Some<
                            [
                                Separator<"]">,
                                infer RestPrimePrimePrime extends string,
                            ]
                        >
                          ? Lex<RestPrimePrimePrime> extends None
                              ? Some<Event>
                              : None
                          : None
                      : None
                : Some<Event>
            : None
        : None;

type ParseUnboundSelector<S extends string> =
    Lex<S> extends Some<[Identifier<infer Type>, infer Rest extends string]>
        ? Lex<Rest> extends None
            ? NormalizeIdentifier<Type>
            : None
        : None;

type ParseBoundGuards<S extends string, Type extends EventType<any, any>> =
    Lex<S> extends Some<[Identifier<infer Guard>, infer Rest extends string]>
        ? LookupGuard<Type, Guard> extends Some<
              infer Guard extends GuardType<infer _>
          >
            ? Lex<Rest> extends Some<
                  [Separator<"(">, infer RestPrime extends string]
              >
                ? ParseGuard<RestPrime, Guard> extends Some<
                      infer RestPrimePrime extends string
                  >
                    ? Lex<RestPrimePrime> extends Some<
                          [
                              Separator<")">,
                              infer RestPrimePrimePrime extends string,
                          ]
                      >
                        ? Lex<RestPrimePrimePrime> extends Some<
                              [Separator<"]">, infer _]
                          >
                            ? Some<RestPrimePrimePrime>
                            : Lex<RestPrimePrimePrime> extends Some<
                                    [
                                        Separator<"|">,
                                        infer RestPrimePrimePrimePrime extends
                                            string,
                                    ]
                                >
                              ? ParseBoundGuards<RestPrimePrimePrimePrime, Type>
                              : None
                        : None
                    : None
                : None
            : None
        : None;

type ParseGuard<
    Source extends string,
    Guard extends GuardType<any>,
> = Guard extends PlayerGuard
    ? Lex<Source> extends Some<[Literal<infer Name>, infer Rest extends string]>
        ? ValidatePlayerName<Name> extends Some<infer _>
            ? Some<Rest>
            : None
        : None
    : None;

type ValidatePlayerName<Source extends string> =
    Source extends `${infer Head}${infer Rest}`
        ? Head extends Letter | Digit | "_"
            ? ValidatePlayerName<Rest>
            : None
        : Some<{}>;

type Lex<S extends string> = S extends `${infer Head}${infer Rest}`
    ? Head extends Whitespace
        ? Lex<Rest>
        : Head extends Delimiter
          ? Some<[Separator<Head>, Rest]>
          : Head extends "'" | '"'
            ? ReadString<Rest, Head>
            : Head extends Digit
              ? ReadNumber<S>
              : ReadIdentifier<S>
    : None;

type Whitespace = " " | "\t" | "\n" | "\r";
type Delimiter = "(" | ")" | "[" | "]" | "," | "|" | "#";

type ReadIdentifier<
    S extends string,
    Acc extends string = "",
> = S extends `${infer Head}${infer Rest}`
    ? Head extends Delimiter | "'" | '"' | Whitespace
        ? Some<[Identifier<Acc>, S]>
        : ReadIdentifier<Rest, `${Acc}${Head}`>
    : Some<[Identifier<Acc>, S]>;

type ReadNumber<
    S extends string,
    Acc extends string = "",
    AllowDecimal extends boolean = true,
> = S extends `${infer Head}${infer Rest}`
    ? Head extends Digit
        ? ReadNumber<Rest, `${Acc}${Head}`, AllowDecimal>
        : Head extends "."
          ? Rest extends `${Digit}${string}`
              ? AllowDecimal extends true
                  ? ReadNumber<Rest, `${Acc}${Head}`, false>
                  : None
              : Some<[Number<Acc>, S]>
          : Some<[Number<Acc>, S]>
    : Some<[Number<Acc>, S]>;

type ReadString<
    S extends string,
    Quote extends string,
    Acc extends string = "",
> = S extends `${infer Head}${infer Rest}`
    ? Head extends Quote
        ? Some<[Literal<Acc>, Rest]>
        : Head extends "\\"
          ? Rest extends `${infer Escaped}${infer RestPrime}`
              ? Escaped extends Quote | "\\"
                  ? ReadString<RestPrime, Quote, `${Acc}${Escaped}`>
                  : None
              : None
          : ReadString<Rest, Quote, `${Acc}${Head}`>
    : None;

type Separator<S extends Delimiter> = Nominal<"Separator", S>;
type Identifier<S extends string> = Nominal<"Identifier", S>;
type Literal<S extends string> = Nominal<"Literal", S>;
type Number<S extends string> = Nominal<"Number", S>;
