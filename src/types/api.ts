export type PokeContextType = {
  pokemonList: Pokemon[];
  loading: boolean;
  setPokemonList: (list: Pokemon[]) => void;
  setLoading: (value: boolean) => void;
};

export type Pokemon = {
  name: string;
  url: string;
};
