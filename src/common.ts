export declare const __brand: unique symbol;

export type Nominal<Name extends string, T> = { readonly [__brand]: Name } & T;

export type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type LowerLetter =
    | "a"
    | "b"
    | "c"
    | "d"
    | "e"
    | "f"
    | "g"
    | "h"
    | "i"
    | "j"
    | "k"
    | "l"
    | "m"
    | "n"
    | "o"
    | "p"
    | "q"
    | "r"
    | "s"
    | "t"
    | "u"
    | "v"
    | "w"
    | "x"
    | "y"
    | "z";
export type UpperLetter = Uppercase<LowerLetter>;
export type Letter = LowerLetter | UpperLetter;
