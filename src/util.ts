export declare const Name: unique symbol;
export type Nominal<Name extends string, T> = { readonly [Name]: Name } & T;

export type IsLiteral<A extends string> = string extends A ? false : true;

// prettier-ignore
export type Color =
    | "black"      | "dark_blue"
    | "dark_green" | "dark_aqua"
    | "dark_red"   | "dark_purple"
    | "gold"       | "gray"
    | "dark_gray"  | "blue"
    | "green"      | "aqua"
    | "red"        | "light_purple"
    | "yellow"     | "white";

export type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

// prettier-ignore
export type LowerLetter =
    | "a" | "b" | "c" | "d" | "e"
    | "f" | "g" | "h" | "i" | "j"
    | "k" | "l" | "m" | "n" | "o"
    | "p" | "q" | "r" | "s" | "t"
    | "u" | "v" | "w" | "x" | "y"
    | "z";

export type UpperLetter = Uppercase<LowerLetter>;
export type Letter = LowerLetter | UpperLetter;

export type Widen<T> = T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
        : T;
