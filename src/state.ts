import { createInterface, type Interface } from "readline";
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { PokeAPI } from "./pokeapi.js";


export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => State;
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
