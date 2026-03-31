export type PokeContextType = {
  pokemonList: Pokemons[];
  loading: boolean;
  setPokemonList: (list: Pokemons[]) => void;
  setLoading: (value: boolean) => void;
};

export type Pokemons = {
  name: string;
  url: string;
};
