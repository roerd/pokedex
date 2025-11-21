// repl.js actually refers to repl.ts
import { startREPL, cleanInput, getCommands } from "./repl.js";

function main() {
  const repl = startREPL();
  const commands = getCommands();

  repl.prompt();

  repl.on('line', (line: string) => {
    const words = cleanInput(line);
    if (words.length === 0) {
      repl.prompt();
      return;
    }
    
    const command = words[0].toLowerCase();

    if (commands[command]) {
      try {
        commands[command].callback(commands);
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
