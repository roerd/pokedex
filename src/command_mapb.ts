import type { State } from "./state.js";

export async function commandMapB(state: State) {
    if (!state.pokeapi.prevLocationsURL) {
        console.log("you're on the first page");
        return;
    }
    const locations = await state.pokeapi.fetchLocations(state.pokeapi.prevLocationsURL);

    for (const location of locations.results) {
        console.log(location.name);
    }
}
