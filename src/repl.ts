import { createInterface } from 'node:readline';
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';

export function cleanInput(input: string): string[] {
    return input.split(/\s+/).filter(s => s.length > 0);
}

export function startREPL() {
  return createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Pokedex > '
    });
}

export type CLICommand = {
  name: string;
  description: string;
  callback: (commands: Record<string, CLICommand>) => void;
};

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
