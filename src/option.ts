import { Nominal } from "./util";

export type Option<T> = Some<T> | None;
export type Some<T> = Nominal<"Some", T>;
export type None = Nominal<"None", {}>;

export type Unwrap<O> = UnwrapOr<O, never>;
export type UnwrapOr<O, D> = O extends Option<infer T> ? T : D;
