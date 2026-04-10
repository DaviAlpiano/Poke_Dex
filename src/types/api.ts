export type PokeContextType = {
  pokemonList: Pokemon[];
  loading: boolean;
  pokemonListFavorite: number[];
  setPokemonList: (list: Pokemon[]) => void;
  setPokemonListFavorite: (list: number[]) => void;
  setLoading: (value: boolean) => void;
  loadMore: () => void;
};

export type Pokemon = {
  name: string;
  url: string;
  id: number;
  types: string[];
};
