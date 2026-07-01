import { Sound } from "../../sound";
import { Text } from "../../util/typography";
import { LivingEntity } from "./living_entity";

export abstract class Player extends LivingEntity {
    private constructor() {
        super();
    }

    abstract title(title: Text): void;
    abstract subtitle(subtitle: Text): void;
    abstract actionbar(actionbar: Text): void;

    abstract sendMessage(message: Text): void;
    abstract playSound(sound: Sound): void;
}
