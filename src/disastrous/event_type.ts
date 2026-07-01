import { Some, None } from "../option";
import { Player } from "../entity/living/player";
import { Server } from "../world/server";
import { NormalizeIdentifier } from "../util/identifier";
import { Nominal } from "../util";

export type Dispatch = {
    [E in Join | Load | Tick as E["identifier"]]: E;
};

export type Lookup<Identifier extends string> =
    NormalizeIdentifier<Identifier> extends Some<
        infer Normalized extends string
    >
        ? Normalized extends keyof Dispatch
            ? Some<Dispatch[Normalized]>
            : None
        : None;

export type Join = NormalizedEventType<"join", (player: Player) => void>;
export type Load = NormalizedEventType<"load", (server: Server) => void>;
export type Tick = NormalizedEventType<"tick", (server: Server) => void>;

export type UnboundCallback = (...args: any) => any;

type NormalizedEventType<
    Identifier extends string,
    Callback extends UnboundCallback,
> =
    NormalizeIdentifier<Identifier> extends Some<
        infer Normalized extends string
    >
        ? EventType<Normalized, Callback>
        : never;

export type EventType<
    Identifier extends string,
    Callback extends UnboundCallback,
> = Nominal<
    "EventType",
    {
        identifier: Identifier;
        callback: Callback;
    }
>;
