import PokeCard from '../components/PokeCard';
import { usePoke } from '../contexts/usePoke';
import type { Pokemon } from '../types/api';
import pikachuCry from '../assets/noFavorites.png';

export default function Favorites() {
  const { pokemonListFavorite } = usePoke();
  return (
    <div className="p-8">
      {pokemonListFavorite.length > 0 ? (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pokemonListFavorite.map((pokemon: Pokemon) => {
            return <PokeCard pokemon={pokemon} key={pokemon.id} />;
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh]  bg-black/40 rounded-lg">
          <img
            src={pikachuCry}
            alt="Nenhum Pokémon favorito encontrado"
            className="w-64 opacity-75 animate-pulse"
          />
          <p className="text-white font-bold mt-4 text-xl">
            Sua lista de favoritos está
            <span className="text-yellow-400"> vazia!</span>
          </p>
        </div>
      )}
    </div>
  );
}
