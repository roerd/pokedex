import { createInterface, type Interface } from "readline";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { PokeAPI } from "./pokeapi.js";



export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  interface: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
};

export function initState(): State {
    return {
        interface: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'Pokedex > '
        }),
        commands: getCommands(),
        pokeapi: new PokeAPI(),
    };
}

export function getCommands(): Record<string, CLICommand> {
  return {
    map: {
      name: "map",
      description: "Displays the next page of location areas from the PokeAPI",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous page of location areas from the PokeAPI",
      callback: commandMapB,
    },
    explore: {
      name: "explore",
      description: "Explore a location area to find Pokemon encounters",
      callback: commandExplore,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
  };
}
