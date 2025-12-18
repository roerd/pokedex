import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    for (const pokemonName of args) {
        console.log(`Throwing a Pokeball at ${pokemonName}...`);
        const pokemon = await state.pokeapi.fetchPokemon(pokemonName);
        if (Math.random() >= (pokemon.base_experience / 256)) {
            console.log(`${pokemonName} was caught!`);
            state.pokedex[pokemonName] = pokemon;
            console.log("You may now inspect it with the inspect command.");
        } else {
            console.log(`${pokemonName} escaped!`);
        }
    }
}
