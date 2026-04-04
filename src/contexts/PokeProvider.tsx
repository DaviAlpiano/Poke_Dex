import { useEffect, useState, type ReactNode } from 'react';
import PokeContext from './PokeContext';
import type { Pokemon } from '../types/api';

export function PokeProvider({ children }: { children: ReactNode }) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(() => {
    const cached = localStorage.getItem('@PokeSite:detailed_data');
    return cached ? JSON.parse(cached) : [];
  });
  const [pokemonListFavorite, setPokemonListFavorite] = useState<Pokemon[]>(
    () => {
      const cached = localStorage.getItem('@PokeSite:favorites');
      return cached ? JSON.parse(cached) : [];
    },
  );
  const [offset, setOffset] = useState(0);

  const [loading, setLoading] = useState(false);
  console.log(pokemonList);

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
            types: details.types.map(
              (t: { type: { name: string } }) => t.type.name,
            ),
          };
        }),
      );

      setPokemonList((prev) => {
        const newList = [...prev, ...detailedData];
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
      }}
    >
      {children}
    </PokeContext.Provider>
  );
}
