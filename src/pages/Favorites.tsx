import PokeCard from '../components/PokeCard';
import { usePoke } from '../contexts/usePoke';
import type { Pokemon } from '../types/api';

export default function Favorites() {
  const { pokemonListFavorite } = usePoke();
  return (
    <main className="bg-[url('/fundo.png')] bg-cover bg-center bg-no-repeat bg-fixed min-h-screen p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonListFavorite.length > 0 ? (
          pokemonListFavorite.map((pokemon: Pokemon) => (
            <PokeCard pokemon={pokemon} key={pokemon.name} />
          ))
        ) : (
          <img
            src="/noFavorites.png"
            alt="Nenhum Pokémon favorito encontrado"
            className="mx-auto mt-20 w-64 opacity-75"
          />
        )}
      </div>
    </main>
  );
}
