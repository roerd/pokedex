import { createInterface } from 'node:readline';

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
