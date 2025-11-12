// repl.js actually refers to repl.ts
import { startREPL, cleanInput } from "./repl.js";

function main() {
  const repl = startREPL();
  repl.prompt();

  repl.on('line', (line: string) => {
    const words = cleanInput(line);
    if (words.length === 0) {
      repl.prompt();
      return;
    }
    
    const command = words[0].toLowerCase();

    console.log(`Your command was: ${command}\n`);
    repl.prompt();
  });
}

main();
