import type { State } from "./state.js";

export async function commandMap(state: State) {
    const locations = await state.pokeapi.fetchLocations(state.pokeapi.nextLocationsURL);

    for (const location of locations.results) {
        console.log(location.name);
    }

    return state;
}
