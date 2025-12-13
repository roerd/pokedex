export type CacheEntry<T> = {
    createdAt: number;
    val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();

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
