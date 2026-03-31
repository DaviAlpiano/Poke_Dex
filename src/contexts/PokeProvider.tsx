import { useEffect, useState, type ReactNode } from 'react';
import PokeContext from './PokeContext';
import type { Pokemon } from '../types/api';

export function PokeProvider({ children }: { children: ReactNode }) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(() => {
    const cached = localStorage.getItem('@PokeSite:data');
    return cached ? JSON.parse(cached) : [];
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPokemonList = async () => {
      setLoading(true);
      if (pokemonList.length > 0) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=20',
        );
        const data = await response.json();
        setPokemonList(data.results);
        localStorage.setItem('@PokeSite:data', JSON.stringify(data.results));
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, [pokemonList.length]);

  return (
    <PokeContext.Provider
      value={{ pokemonList, loading, setPokemonList, setLoading }}
    >
      {children}
    </PokeContext.Provider>
  );
}
