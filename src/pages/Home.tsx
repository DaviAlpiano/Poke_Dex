import PokeCard from '../components/PokeCard';
import { usePoke } from '../contexts/usePoke';
import type { Pokemon } from '../types/api';

export default function Home() {
  const { pokemonList } = usePoke();
  return (
    <main className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonList.map((pokemon: Pokemon) => (
          <PokeCard name={pokemon.name} url={pokemon.url} key={pokemon.name} />
        ))}
      </div>
    </main>
  );
}
