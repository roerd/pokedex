export function cleanInput(input: string): string[] {
    return input.split(/\s+/).filter(s => s.length > 0);
}
