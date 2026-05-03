import { useContext } from 'react';
import PokeContext from '../contexts/PokeContext';
import type { Pokemon } from '../types/api';

export function PokeFavoriteButton({ pokemon }: { pokemon: Pokemon }) {
  const { pokemonListFavorite, setPokemonListFavorite } =
    useContext(PokeContext);

  const isFavorite = pokemonListFavorite.some(
    (fav: Pokemon) => fav.id === pokemon.id,
  );

  const handleChange = () => {
    let newFavorites: Pokemon[] = [];

    if (isFavorite) {
      newFavorites = pokemonListFavorite.filter(
        (fav: Pokemon) => fav.id !== pokemon.id,
      );
    } else {
      newFavorites = [...pokemonListFavorite, pokemon];
    }

    setPokemonListFavorite(newFavorites);

    localStorage.setItem(
      '@PokeSite:favorites_data',
      JSON.stringify(newFavorites),
    );
  };

  return (
    <button onClick={handleChange} className="w-10 h-10">
      <img
        src={isFavorite ? '/pixelBallClose.webp' : '/pixelBallOpen.webp'}
        alt="Status Favorito"
        className={
          isFavorite
            ? 'opacity-100 cursor-pointer animate-pulse'
            : 'opacity-50 hover:opacity-100 cursor-pointer'
        }
      />
    </button>
  );
}
