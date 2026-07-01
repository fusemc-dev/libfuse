import { Identifier } from "./util/identifier";

type Accessor<T extends Serializable> = () => T;
type Updater<T extends Serializable> = (value: T) => T;
type Mutator<T extends Serializable> = (value: T | Updater<T>) => void;

export type Property<T extends Serializable> = {
    name: Identifier;
} & Accessor<T> &
    Mutator<T>;

export declare const Serialize: unique symbol;

// This permits recursion, which is a huge concern
// in that, obviously, we cannot serialize a recursive
// structure, but the type permits them.
export type Serializable =
    | string
    | number /* Thanks to our format, [Iota](https://fusemc.dev/iota), NaN, Infinity and -Infinity work too */
    | boolean
    | null
    | undefined /* Thanks to our format, [Iota](https://fusemc.dev/iota), undefined works too */
    | Standardized /* Thanks to our format, [Iota](https://fusemc.dev/iota), select standardized objects work too */
    | Serializable[]
    | { [_: string]: Serializable }
    | Map<
          Serializable,
          Serializable
      > /* Thanks to our format, [Iota](https://fusemc.dev/iota), Maps work too */;

export interface Standardized {
    [Serialize](): never;
}
