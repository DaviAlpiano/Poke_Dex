import { useEffect, useState, type ReactNode } from 'react';
import PokeContext from './PokeContext';
import type { Pokemon } from '../types/api';

export function PokeProvider({ children }: { children: ReactNode }) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(() => {
    const cached = localStorage.getItem('@PokeSite:detailed_data');
    return cached ? JSON.parse(cached) : [];
  });
  const [pokemonListFavorite, setPokemonListFavorite] = useState<number[]>(
    () => {
      const cached = localStorage.getItem('@PokeSite:favorites_ids');
      return cached ? JSON.parse(cached) : [];
    },
  );
  const [offset, setOffset] = useState(0);

  const [loading, setLoading] = useState(false);

  const [typeFilter, setTypeFilter] = useState('');
  const [typeFilterOn, setTypeFilterOn] = useState(false);

  const fetchPokemonList = async (currentOffset: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${currentOffset}`,
      );
      const data = await response.json();
      console.log('fez fetch');

      const detailedData = await Promise.all(
        data.results.map(async (pokemon: Pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            url: pokemon.url,
            id: details.id,
            types: details.types.map(
              (t: { type: { name: string } }) => t.type.name,
            ),
          };
        }),
      );

      setPokemonList((prev) => {
        const onlyNewPokemons = detailedData.filter(
          (newPoke) => !prev.some((oldPoke) => oldPoke.id === newPoke.id),
        );

        const newList = [...prev, ...onlyNewPokemons];

        localStorage.setItem(
          '@PokeSite:detailed_data',
          JSON.stringify(newList),
        );
        return newList;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextOffset = offset + 20;
    setOffset(nextOffset);
    fetchPokemonList(nextOffset);
  };

  useEffect(() => {
    if (pokemonList.length === 0) {
      fetchPokemonList(0);
    } else {
      setOffset(pokemonList.length);
    }
  }, []);

  return (
    <PokeContext.Provider
      value={{
        pokemonList,
        loading,
        setPokemonList,
        setLoading,
        loadMore,
        pokemonListFavorite,
        setPokemonListFavorite,
        typeFilter,
        setTypeFilter,
        typeFilterOn,
        setTypeFilterOn,
      }}
    >
      {children}
    </PokeContext.Provider>
  );
}
