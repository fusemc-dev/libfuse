import { EventType, UnboundCallback } from "./disastrous/event_type";
import { ParseSelector, ValidateSelector } from "./disastrous/selector";
import { Some } from "./option";
import { ValidateIdentifier } from "./util/identifier";

export declare const script: Entrypoint;

interface Entrypoint {
    on<S extends string>(
        selector: ValidateSelector<S>,
        callback: ParseSelector<S> extends Some<infer Result>
            ? Result extends EventType<infer _, infer Callback>
                ? Callback
                : UnboundCallback
            : never,
    ): void;

    dispatch<T extends string>(event: ValidateIdentifier<T>, ...args: any);
}
