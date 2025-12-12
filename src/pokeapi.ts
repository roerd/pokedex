export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  public prevLocationsURL = null;
  public nextLocationsURL = null;

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const result = await fetch(
      pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`
    );
    const data = await result.json();
    this.prevLocationsURL = data.previous;
    this.nextLocationsURL = data.next;
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const result = await fetch(
      `${PokeAPI.baseURL}/location-area/${locationName}/`
    );
    const data = await result.json();
    return data;
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
};

export type Location = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: Array<unknown>;
  location: {
    name: string;
    url: string;
  };
  names: Array<{
    name: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  pokemon_encounters: Array<unknown>;
};
