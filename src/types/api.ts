export type PokeContextType = {
  pokemonList: Pokemon[];
  loading: boolean;
  setPokemonList: (list: Pokemon[]) => void;
  setLoading: (value: boolean) => void;
  loadMore: () => void;
};

export type Pokemon = {
  name: string;
  url: string;
  types: string[];
};
