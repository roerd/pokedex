export type CacheEntry<T> = {
    createdAt: number;
    val: T;
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(reapIntervalMs: number = 60000) {
        this.#interval = reapIntervalMs;
        this.#startReapLoop();
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    #reap() {
        const cutOff = Date.now() - this.#interval;
        for (const [key, entry] of this.#cache.entries()) {
            if (entry.createdAt < cutOff) {
                this.#cache.delete(key);
            }
        }
    }

    stopReapLoop() {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }

    add<T>(key: string, val: T) { 
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val,
        };
        this.#cache.set(key, entry);
    }
  
    get<T>(key: string): T | undefined {
        return this.#cache.get(key)?.val;
    }
}
