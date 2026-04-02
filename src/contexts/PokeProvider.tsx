import { useEffect, useState, type ReactNode } from 'react';
import PokeContext from './PokeContext';
import type { Pokemon } from '../types/api';

export function PokeProvider({ children }: { children: ReactNode }) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(() => {
    const cached = localStorage.getItem('@PokeSite:detailed_data');
    return cached ? JSON.parse(cached) : [];
  });

  const [loading, setLoading] = useState(false);
  console.log(pokemonList);

  useEffect(() => {
    const fetchDetailedPokemonList = async () => {
      if (pokemonList.length > 0) return;

      setLoading(true);
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=20',
        );
        const data = await response.json();

        const detailedData = await Promise.all(
          data.results.map(async (pokemon: Pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();

            return {
              name: pokemon.name,
              url: pokemon.url,
              types: details.types.map(
                (typeInfo: { type: { name: string } }) => typeInfo.type.name,
              ),
            };
          }),
        );

        setPokemonList(detailedData);
        localStorage.setItem(
          '@PokeSite:detailed_data',
          JSON.stringify(detailedData),
        );
      } catch (error) {
        console.error('Error fetching detailed Pokémon list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailedPokemonList();
  }, [pokemonList.length]);

  return (
    <PokeContext.Provider
      value={{ pokemonList, loading, setPokemonList, setLoading }}
    >
      {children}
    </PokeContext.Provider>
  );
}
