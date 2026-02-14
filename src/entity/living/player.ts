import { LivingEntity } from "./living_entity";

export abstract class Player extends LivingEntity {

    private constructor() {
        super();
    }

    abstract sendMessage(message: string): void;
}