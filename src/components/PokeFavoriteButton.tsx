import { useContext } from 'react';
import PokeContext from '../contexts/PokeContext';

export function PokeFavoriteButton({ id }: { id: number }) {
  const { pokemonListFavorite, setPokemonListFavorite } =
    useContext(PokeContext);
  const isFavorite = pokemonListFavorite.includes(id);

  const handleChange = () => {
    let newFavorites: number[] = [];
    if (isFavorite) {
      newFavorites = pokemonListFavorite.filter((favId) => favId !== id);
    } else {
      newFavorites = [...pokemonListFavorite, id];
    }

    setPokemonListFavorite(newFavorites);
    localStorage.setItem(
      '@PokeSite:favorites_ids',
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
