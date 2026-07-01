import { Block, BlockDefinition } from "../block/block";
import { Entity, EntityDefinition as EntityDefinition } from "../entity/entity";
import { Vec3 } from "../math";
import { Registered } from "../registered";
import { Sound } from "../sound";
import { Identifier, ValidateIdentifier } from "../util/identifier";
import { Particle } from "../util/particle";
import { Server } from "./server";

export abstract class World implements Registered {
    readonly type: Identifier;
    readonly server: Server;

    private constructor() {}

    abstract isOf<S extends string>(
        identifier: ValidateIdentifier<S> | Identifier,
    ): boolean;
    abstract isIn<S extends string>(
        identifier: ValidateIdentifier<S> | Identifier,
    ): boolean;

    abstract block(position: Vec3 | [number, number, number]): Block;
    abstract block(
        position: Vec3 | [number, number, number],
        block:
            | Block
            | BlockDefinition
            | ((previous: Block) => Block | BlockDefinition),
    ): void;
    abstract insert<S extends string>(
        table: ValidateIdentifier<S> | Identifier,
        position: Vec3 | [number, number, number],
    ): void;

    abstract spawn(
        definition: EntityDefinition,
        position: Vec3 | [number, number, number],
    ): Entity;
    abstract select(predicate: (entity: Entity) => boolean): Entity[];
    abstract exists(predicate: (entity: Entity) => boolean): boolean;

    abstract particle(
        particle: Particle,
        position: Vec3 | [number, number, number],
    ): void;
    abstract playSound(
        sound: Sound,
        position: Vec3 | [number, number, number],
    ): void;
}
