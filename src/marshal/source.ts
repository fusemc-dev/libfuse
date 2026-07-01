import { Entity } from "../entity/entity";
import { Player } from "../entity/living/player";
import { Vec3 } from "../math";
import { Text } from "../util/typography";
import { World } from "../world/world";

export abstract class Source {
    abstract position(): Vec3;
    abstract entity(): Entity | undefined;
    abstract player(): Player | undefined;
    abstract world(): World;

    abstract sendMessage(message: Text): void;
}

export abstract class Context {
    readonly source: string;
    readonly remainder: string;

    abstract matches(candidate: string): boolean;
    abstract matchesSensitive(candidate: string): boolean;
}
