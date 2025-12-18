import { createInterface, type Interface } from "readline";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { PokeAPI, Pokemon } from "./pokeapi.js";



export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  interface: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  pokedex: Record<string, Pokemon>;
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
        pokedex: {},
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
    catch: {
      name: "catch",
      description: "Attempt to catch specified Pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Inspect details of specified Pokemon in your Pokedex",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "Displays all caught Pokemon in your Pokedex",
      callback: commandPokedex,
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
