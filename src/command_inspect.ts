import type { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    for (const pokemonName of args) {
        const pokemon = state.pokedex[pokemonName];
        if (!pokemon) {
            console.log("you have not caught that pokemon");
            continue;
        }
        console.log(`Name: ${pokemon.name}`);
        console.log(`Height: ${pokemon.height}`);
        console.log(`Weight: ${pokemon.weight}`);
        console.log("Stats:");
        for (const statInfo of pokemon.stats) {
            console.log(`  -${statInfo.stat.name}: ${statInfo.base_stat}`);
        }
        console.log("Types:");
        for (const typeInfo of pokemon.types) {
            console.log(` - ${typeInfo.type.name}`);
        }
    }
}
