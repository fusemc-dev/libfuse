import { ARGB, integer, RGB, WithSuggestion } from "../libfuse";
import { Vec3 } from "../math";
import { Lenient } from "./identifier";

export type Particle = (
    | {
          type:
              | Lenient<"minecraft:block">
              | Lenient<"minecraft:block_crumble">
              | Lenient<"minecraft:block_marker">
              | Lenient<"minecraft:dust_pillar">
              | Lenient<"minecraft:falling_dust">;
          options: {
              block_state:
                  | {
                        Name: string;
                        Properties: Record<string, string>;
                    }
                  | string;
          };
      }
    | {
          type: Lenient<"minecraft:dragon_breath">;
          options: {
              power: number;
          };
      }
    | {
          type: Lenient<"minecraft:dust">;
          options: {
              color: RGB;
              scale: number;
          };
      }
    | {
          type: Lenient<"minecraft:dust_color_transition">;
          options: {
              from_color: [number, number, number];
              to_color: [number, number, number];
              scale: number;
          };
      }
    | {
          type:
              Lenient<"minecraft:effect"> | Lenient<"minecraft:instant_effect">;
          options: {
              color: RGB;
              power?: number;
          };
      }
    | {
          type: Lenient<"minecraft:entity_effect"> | Lenient<"minecraft:flash">;
          options: {
              color: ARGB;
          };
      }
    | {
          type: Lenient<"minecraft:item">;
          options: {
              item:
                  | {
                        id: string;
                        components: Record<string, any>;
                    }
                  | string;
          };
      }
    | {
          type: Lenient<"minecraft:sculk_charge">;
          options: {
              roll: number;
          };
      }
    | {
          type: Lenient<"minecraft:shriek">;
          options: {
              delay: integer;
          };
      }
    | {
          type: Lenient<"minecraft:trail">;
          options: {
              target: [number, number, number];
              duration: integer;
              color: integer;
          };
      }
    | {
          type: Lenient<"minecraft:vibration">;
          options: {
              destination: {
                  // I'm pretty sure the Minecraft Wiki is utterly wrong on this.
                  type: "block";
                  pos: {
                      x: integer;
                      y: integer;
                      z: integer;
                  };
              };
              arrival_in_ticks: integer;
          };
      }
    | {
          type: WithSuggestion<"minecraft:">;
      }
) & {
    offset: Vec3 | [number, number, number];
    speed: number;
    count: integer;
};
