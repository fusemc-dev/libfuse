import { script, io } from "./libfuse";

script.on("join", (player) => {
    io.log(`${player} has joined the world.`);
})