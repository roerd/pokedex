import { State } from "./state.js";

export async function commandExit(state: State) {
    console.log("Closing the Pokedex... Goodbye!");
    state.interface.close();
    process.exit(0);

    return state;
}
