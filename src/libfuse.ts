import { EventType, UnboundCallback } from "./disastrous/event_type";
import { ParseSelector, Selector } from "./disastrous/selector";
import { Some } from "./option";

export declare const script: Entrypoint;

interface Entrypoint {
    on<S extends string>(
        selector: Selector<S>,
        callback: ParseSelector<S> extends Some<infer Result>
            ? Result extends EventType<infer _, infer Callback>
                ? Callback
                : UnboundCallback
            : never,
    ): void;
}
