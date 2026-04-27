import { LoadMoreButton } from '../components/LoadMoreButton';
import PokeCard from '../components/PokeCard';
import TypeFilters from '../components/TypeFilters';
import { usePoke } from '../contexts/usePoke';
import type { Pokemon } from '../types/api';

export default function Home() {
  const { pokemonList } = usePoke();
  return (
    <main className="flex flex-col items-center p-8 w-full">
      <TypeFilters />
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonList.map((pokemon: Pokemon) => (
          <PokeCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
      <LoadMoreButton />
    </main>
  );
}
