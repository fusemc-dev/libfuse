import { IsLiteral, Nominal } from "../util";
import { None, Some } from "../option";
import { Text } from "../util/typography";
import { NormalizeIdentifier } from "../util/identifier";
import { Vec2, Vec3 } from "../math";

type Dispatch = {
    [V in
        | Air
        | Name
        | NameVisible
        | FallDistance
        | Fire
        | Glowing
        | HasVisualFire
        | Invulnerable
        | Velocity
        | Gravity
        | OnGround
        | PortalCooldown
        | Position
        | Rotation
        | Silent
        | Tags
        | TicksFrozen
        | UUID
        | Absorption as V["identifier"]]: V;
};

export type ValidateVaccine<V extends string> =
    IsLiteral<V> extends true
        ? Lookup<V> extends Some<infer _>
            ? V
            : never
        : string;

export type Lookup<Identifier extends string> =
    NormalizeIdentifier<Identifier> extends Some<
        infer Normalized extends string
    >
        ? Normalized extends keyof Dispatch
            ? Some<Dispatch[Normalized]>
            : None
        : None;

export type Air = NormalizedVaccine<"air", number>;
export type Name = NormalizedVaccine<"name", Text>;
export type NameVisible = NormalizedVaccine<"name_visible", boolean>;
export type FallDistance = NormalizedVaccine<"fall_distance", number>;
export type Fire = NormalizedVaccine<"fire", number>;
export type Glowing = NormalizedVaccine<"glowing", boolean>;
export type HasVisualFire = NormalizedVaccine<"has_visual_fire", boolean>;
export type Invulnerable = NormalizedVaccine<"invulnerable", boolean>;
export type Velocity = NormalizedVaccine<"velocity", Vec3>;
export type Gravity = NormalizedVaccine<"gravity", boolean>;
export type OnGround = NormalizedVaccine<"on_ground", boolean>;
export type PortalCooldown = NormalizedVaccine<"portal_cooldown", number>;
export type Position = NormalizedVaccine<"position", Vec3>;
export type Rotation = NormalizedVaccine<"rotation", Vec2>;
export type Silent = NormalizedVaccine<"silent", boolean>;
export type Tags = NormalizedVaccine<"tags", string[]>;
export type TicksFrozen = NormalizedVaccine<"ticks_frozen", number>;
export type UUID = NormalizedVaccine<"uuid", string>;

export type Absorption = NormalizedVaccine<"absorption", number>;

type NormalizedVaccine<Identifier extends string, T> =
    NormalizeIdentifier<Identifier> extends Some<
        infer Normalized extends string
    >
        ? Vaccine<Normalized, T>
        : never;

export type Vaccine<Identifier extends string, T> = Nominal<
    "Vaccine",
    {
        readonly identifier: Identifier;
        readonly payload: T;
    }
>;
