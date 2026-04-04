export type PokeContextType = {
  pokemonList: Pokemon[];
  loading: boolean;
  pokemonListFavorite: Pokemon[];
  setPokemonList: (list: Pokemon[]) => void;
  setPokemonListFavorite: (list: Pokemon[]) => void;
  setLoading: (value: boolean) => void;
  loadMore: () => void;
};

export type Pokemon = {
  name: string;
  url: string;
  types: string[];
};
