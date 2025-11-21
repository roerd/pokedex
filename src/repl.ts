import { createInterface } from 'node:readline';
import { commandExit } from './command_exit.js';

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
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    // can add more commands here
  };
}
