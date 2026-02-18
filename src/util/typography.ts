import { Color } from "../util";

export type Text = string | Component | Text[];

export type Component = (
    | Literal
    | Translatable
    | Score
    | Selector
    | Keybind
    | Object
) & {
    readonly color?: `#${string}` | Color;
    readonly font?: string;
    readonly bold?: boolean;
    readonly italic?: boolean;
    readonly underlined?: boolean;
    readonly strikethrough?: boolean;
    readonly obfuscated?: boolean;
    readonly shadow_color?: number | [number, number, number, number];
    readonly insertion?: string;
    readonly click_event?: ClickEvent;
    readonly hover_event?: HoverEvent;
    readonly extra?: Text[];
};

type Literal = {
    readonly type: "text";
    readonly text: string;
};

type Translatable = {
    readonly type: "translate";
    readonly translate: string;
    readonly fallback?: string;
    readonly with?: Text[];
};

type Score = {
    readonly type: "score";
    readonly score: {
        readonly name: string;
        readonly objective: string;
    };
};

type Selector = {
    readonly type: "selector";
    readonly selector: string;
    readonly separator?: Text;
};

type Keybind = {
    readonly type: "keybind";
    readonly keybind: string;
};

type Object = {
    readonly type: "object";
} & (
    | {
          readonly object: "atlas";
          readonly atlas?: string;
          readonly sprite: string;
      }
    | {
          readonly object: "player";
          // TODO: Same as 'minecraft:profile' component
          readonly player: any;
      }
);

type ClickEvent =
    | {
          readonly action: "open_url";
          readonly url: string;
      }
    | {
          readonly action: "run_command";
          readonly command: string;
      }
    | {
          readonly action: "suggest_command";
          readonly command: string;
      }
    | {
          readonly action: "change_page";
          readonly page: number;
      }
    | {
          readonly action: "copy_to_clipboard";
          readonly value: string;
      }
    | {
          readonly action: "show_dialog";
          readonly dialog: string;
      }
    | {
          readonly action: "custom";
          readonly id: string;
          readonly payload?: string;
      };
type HoverEvent = {
    readonly action: "show_text";
    readonly value: Text;
};
