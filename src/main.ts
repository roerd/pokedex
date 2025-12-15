// repl.js actually refers to repl.ts
import { cleanInput } from "./repl.js";
import { initState } from "./state.js";

function main() {
  const state = initState();
  const repl = state.interface;
  const commands = state.commands;

  repl.prompt();

  repl.on('line', async (line: string) => {
    const words = cleanInput(line);
    if (words.length === 0) {
      repl.prompt();
      return;
    }
    
    const command = words[0].toLowerCase();

    if (commands[command]) {
      try {
        await commands[command].callback(state, ...words.slice(1));
      } catch (error) {
        console.error(`Error executing command '${command}':`, error);
      }
    } else {
      console.log(`Unknown command: ${command}`);
    }

    
    repl.prompt();
  });
}

main();
