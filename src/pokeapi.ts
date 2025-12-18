import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  public prevLocationsURL = undefined;
  public nextLocationsURL = undefined;
  private cache = new Cache(60000);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area/`;
    if (this.cache.get<ShallowLocations>(url)) {
      return this.cache.get<ShallowLocations>(url)!;
    }
    const result = await fetch(url);
    const data = await result.json();
    this.cache.add<ShallowLocations>(url, data);
    this.prevLocationsURL = data.previous ?? undefined;
    this.nextLocationsURL = data.next ?? undefined;
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    if (this.cache.get<Location>(locationName)) {
      return this.cache.get<Location>(locationName)!;
    }
    const result = await fetch(
      `${PokeAPI.baseURL}/location-area/${locationName}/`
    );
    const data = await result.json();
    this.cache.add<Location>(locationName, data);
    return data;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    if (this.cache.get<Pokemon>(pokemonName)) {
      return this.cache.get<Pokemon>(pokemonName)!;
    }
    const result = await fetch(
      `${PokeAPI.baseURL}/pokemon/${pokemonName}/`
    );
    const data = await result.json();
    this.cache.add<Pokemon>(pokemonName, data);
    return data;
  }
}

export type NamedAPIResource = {
  name: string;
  url: string;
};

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<NamedAPIResource>;
};

export type Location = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: Array<unknown>;
  location: NamedAPIResource;
  names: Array<{
    name: string;
    language: NamedAPIResource;
  }>;
  pokemon_encounters: Array<PokemonEncounter>;
};

export type PokemonEncounter = {
  pokemon: NamedAPIResource;
  version_details: Array<unknown>;
};

export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
};

export type PokemonType = {
  slot: number;
  type: NamedAPIResource;
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Array<unknown>;
  forms: Array<unknown>;
  game_indices: Array<unknown>;
  held_items: Array<unknown>;
  location_area_encounters: string;
  moves: Array<unknown>;
  sprites: Record<string, string | null>;
  cries: Record<string, string>;
  species: NamedAPIResource;
  stats: Array<PokemonStat>;
  types: Array<PokemonType>;
  past_types: Array<unknown>;
  past_abilities: Array<unknown>;
};