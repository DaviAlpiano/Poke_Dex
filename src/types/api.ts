export type PokeContextType = {
  pokemonList: Pokemon[];
  loading: boolean;
  pokemonListFavorite: Pokemon[];
  setPokemonList: (list: Pokemon[]) => void;
  setPokemonListFavorite: (list: Pokemon[]) => void;
  setLoading: (value: boolean) => void;
  loadMore: () => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  typeFilterOn: boolean;
  setTypeFilterOn: (value: boolean) => void;
};

export type Pokemon = {
  name: string;
  url?: string;
  id: number;
  types: string[];
};

export type PokemonStat = {
  name: string;
  value: number;
};

export type FilteredPokemon = {
  id: number;
  name: string;
  types: string[];
  stats: PokemonStat[];
  weight: number;
  height: number;
  speciesUrl: string;
};

export type VariationData = {
  name: string;
  image: string;
  id: string;
};

export type EvolutionData = {
  name: string;
  image: string;
  id: string;
};
