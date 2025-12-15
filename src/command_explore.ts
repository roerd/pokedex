import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    for (const locationName of args) {
        console.log(`Exploring ${locationName}...`);
        const location = await state.pokeapi.fetchLocation(locationName);
        console.log("Found Pokemon:");
        for (const encounter of location.pokemon_encounters) {
            console.log(` - ${encounter.pokemon.name}`);
        }
    }
}
