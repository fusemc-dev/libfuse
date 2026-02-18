import { script } from "./libfuse";

script.on("join", (player) => {
    player.inject("position", player.sample("velocity"));
});
