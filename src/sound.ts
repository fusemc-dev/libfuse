import { WithSuggestion } from "./libfuse";

export type Sound = {
    type: WithSuggestion<"minecraft:">;
    category:
        | "master"
        | "music"
        | "record"
        | "weather"
        | "block"
        | "hostile"
        | "neutral"
        | "player"
        | "ambient"
        | "voice"
        | "ui";
    playback?: {
        volume?: number;
        pitch?: number;
    };
};
