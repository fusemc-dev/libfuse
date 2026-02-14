import { Nominal } from "../common";
import { Some, None } from "../option";
import { EventType, Join } from "./event_type";

export type LookupGuard<
    Type extends EventType<any, any>,
    Guard extends string,
> = Type extends Join
    ? Guard extends "player"
        ? Some<PlayerGuard>
        : None
    : None;

export type PlayerGuard = GuardType<"PlayerGuard">;

export type GuardType<Name extends string> = Nominal<Name, {}>;
